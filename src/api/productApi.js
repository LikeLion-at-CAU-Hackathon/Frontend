import axiosInstance, { resolveApiAssetUrl } from "./axiosInstance";

const DEFAULT_PRODUCT_ID = 1;
const PRODUCT_ID_RANGE = Array.from({ length: 16 }, (_, index) => index + 1);

const getApiData = async (path, config) => {
  const { data } = await axiosInstance.get(path, config);
  return data?.data ?? data?.product ?? data;
};

const postApiData = async (path, payload) => {
  const { data } = await axiosInstance.post(path, payload);
  return data?.data ?? data;
};

const asArray = (payload, keys = []) => {
  if (Array.isArray(payload)) return payload;

  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }

  return [];
};

const VALUE_SEPARATOR = ` ${String.fromCharCode(183)} `;

const joinDisplayValues = (values) => values.filter(Boolean).join(VALUE_SEPARATOR);

const isPlainObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);

const hasOnlyNumericKeys = (value) => {
  const keys = Object.keys(value ?? {});
  return keys.length > 0 && keys.every((key) => /^\d+$/.test(key));
};

const getSizeValue = (value, size) => {
  if (Array.isArray(value)) return joinDisplayValues(value.map((item) => formatSpecValue(item, size)));
  if (!value || typeof value !== "object") return value;

  return value[size] ?? value.default ?? Object.values(value).find(Boolean) ?? "";
};

const formatSpecValue = (value, size) => {
  const sizedValue = getSizeValue(value, size);

  if (sizedValue === null || sizedValue === undefined) return "";
  if (typeof sizedValue !== "object") return String(sizedValue);
  if (Array.isArray(sizedValue)) {
    return joinDisplayValues(sizedValue.map((item) => formatSpecValue(item, size)));
  }

  const entries = Object.entries(sizedValue)
    .filter(([, entryValue]) => entryValue !== null && entryValue !== undefined && entryValue !== "")
    .map(([key, entryValue]) => [key, formatSpecValue(entryValue, size)]);

  if (hasOnlyNumericKeys(sizedValue)) {
    return joinDisplayValues(entries.map(([, entryValue]) => entryValue));
  }

  return entries
    .map(([key, entryValue]) => `${key}: ${entryValue}`)
    .join(" / ");
};

const resolveImageUrl = resolveApiAssetUrl;

const toSpecLabel = (key) => key.replaceAll("_", " ").toUpperCase();

const toDisplayLabel = (value) => {
  return String(value ?? "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const normalizeSpecs = (specs, size) => {
  if (!specs || typeof specs !== "object") return [];

  return Object.entries(specs)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => ({
      label: toSpecLabel(key),
      value: formatSpecValue(value, size),
    }));
};

const normalizeImages = (source) => {
  const images = Array.isArray(source) ? source : source ? [source] : [];

  return images
    .map((image) => resolveImageUrl(image?.image ?? image?.url ?? image))
    .filter(Boolean);
};

const getStockQuantity = (stock) => {
  return Number(stock?.quantity ?? stock?.stock ?? stock?.count ?? 0);
};

const getExplicitCurrentStoreStock = (variant) => {
  const quantity =
    variant?.current_store_stock ??
    variant?.currentStoreStock ??
    variant?.current_branch_stock ??
    variant?.currentBranchStock;

  return quantity === undefined || quantity === null ? null : Number(quantity);
};

const normalizeDistance = (stock) => {
  return stock?.distance ?? stock?.distance_km ?? stock?.distanceKm ?? stock?.branch_distance;
};

const normalizeIsOpen = (stock) => {
  return stock?.is_open ?? stock?.isOpen ?? stock?.open;
};

const getCurrentStoreStock = (variant) => {
  const explicitStock = getExplicitCurrentStoreStock(variant);
  if (explicitStock !== null) return explicitStock;

  if (Array.isArray(variant?.stocks) && variant.stocks.length > 0) {
    return getStockQuantity(
      variant.stocks.find((stock) => Number(normalizeDistance(stock)) === 0) ?? variant.stocks[0],
    );
  }

  return getStockQuantity(variant);
};

const normalizeStocks = (stocks) => {
  return (stocks ?? []).map((stock) => ({
    ...stock,
    branch_id: stock?.branch_id ?? stock?.branchId ?? stock?.store_id,
    branch_name: stock?.branch_name ?? stock?.branchName ?? stock?.store_name ?? stock?.name,
    distance: normalizeDistance(stock),
    is_open: normalizeIsOpen(stock),
    has_stock: stock?.has_stock ?? stock?.hasStock ?? getStockQuantity(stock) > 0,
    quantity: getStockQuantity(stock),
  }));
};

const normalizeVariant = (variant, product) => {
  const stocks = normalizeStocks(variant?.stocks);
  const images = normalizeImages(variant?.images ?? variant?.image);
  const specs = product?.specs ?? {};

  return {
    id: variant?.id,
    productId: product?.id,
    name: variant?.name ?? product?.name ?? "",
    color: variant?.color ?? "",
    size: variant?.size ?? "",
    image: images[0] ?? "",
    dimensions: formatSpecValue(variant?.dimensions ?? variant?.dimension ?? specs.dimensions, variant?.size),
    strap: formatSpecValue(variant?.strap ?? specs.strap, variant?.size),
    storage: formatSpecValue(variant?.storage ?? specs.storage, variant?.size),
    price: variant?.price ?? product?.price ?? 0,
    stock: getCurrentStoreStock({ ...variant, stocks }),
    stocks,
    specs: normalizeSpecs(specs, variant?.size),
  };
};

const normalizeBranchNameKey = (name) => {
  return String(name ?? "")
    .replace(/^MCM\s*/i, "")
    .replace(/\s+/g, "")
    .toLowerCase();
};

const getBranchKey = (stock) => {
  const branchNameKey = normalizeBranchNameKey(stock?.branch_name);

  return branchNameKey || String(stock?.branch_id ?? "");
};

const isSameStockBranch = (stock, branch) => {
  if (!stock || !branch) return false;

  if (stock.branch_id !== undefined && branch.branch_id !== undefined) {
    if (String(stock.branch_id) === String(branch.branch_id)) return true;
  }

  return normalizeBranchNameKey(stock.branch_name) === normalizeBranchNameKey(branch.branch_name);
};

const getStockForBranch = (variant, branch) => {
  return variant?.stocks?.find((stock) => isSameStockBranch(stock, branch));
};

const getVariantStockForBranch = (variant, branch) => {
  const branchStock = getStockForBranch(variant, branch);

  return branchStock ? getStockQuantity(branchStock) : variant?.stock;
};

const mergeStockEntries = (stocks) => {
  const stockMap = new Map();

  stocks.filter(Boolean).forEach((stock) => {
    const key = getBranchKey(stock);
    if (!key) return;

    const existingStock = stockMap.get(key) ?? {};

    stockMap.set(key, {
      ...existingStock,
      ...stock,
      branch_id: stock.branch_id ?? existingStock.branch_id,
      branch_name: stock.branch_name ?? existingStock.branch_name,
      distance: stock.distance ?? existingStock.distance,
      is_open: stock.is_open ?? existingStock.is_open,
      has_stock: stock.has_stock ?? existingStock.has_stock,
      quantity: stock.quantity || existingStock.quantity || 0,
    });
  });

  return [...stockMap.values()];
};

const normalizeStockPayload = (stockPayload) => {
  const stocks = asArray(stockPayload, [
    "stocks",
    "branches",
    "branch_stocks",
    "branchStocks",
    "stores",
    "nearby_stores",
    "nearbyStores",
    "items",
    "results",
    "value",
  ]);

  return normalizeStocks(stocks);
};

const getImageSource = (source) =>
  source?.image ??
  source?.image_url ??
  source?.imageUrl ??
  source?.thumbnail ??
  source?.thumbnail_url ??
  source?.thumbnailUrl ??
  source?.photo ??
  source?.photo_url ??
  source?.photoUrl;

const normalizeMaterialSection = (material) => ({
  title: material?.title ?? material?.name ?? "",
  description: material?.description ?? material?.content ?? "",
  image: resolveImageUrl(getImageSource(material)),
});

const normalizeGuideDescriptions = (descriptions) =>
  (descriptions ?? [])
    .map((description) => String(description ?? "").trim())
    .filter(Boolean);

const isNumericKey = (value) => /^\d+$/.test(String(value ?? ""));

const normalizeCareGuideEntry = (entry, fallbackSubtitle = "") => {
  const subtitleFallback = isNumericKey(fallbackSubtitle) ? "" : fallbackSubtitle;

  if (typeof entry === "string") {
    return {
      subtitle: subtitleFallback,
      description: entry.trim(),
    };
  }

  if (!isPlainObject(entry)) {
    return {
      subtitle: subtitleFallback,
      description: String(entry ?? "").trim(),
    };
  }

  return {
    subtitle: String(
      entry.subtitle ??
        entry.subTitle ??
        entry.heading ??
        entry.title ??
        entry.name ??
        entry.label ??
        subtitleFallback,
    ).trim(),
    description: String(
      entry.description ??
        entry.content ??
        entry.body ??
        entry.text ??
        entry.value ??
        "",
    ).trim(),
  };
};

const normalizeCareGuideEntries = (entries) =>
  (entries ?? [])
    .map((entry) => normalizeCareGuideEntry(entry))
    .filter((entry) => entry.subtitle || entry.description);

const normalizeGuide = (guide, fallbackTitle = "") => {
  const entryPayload = typeof guide === "string"
    ? []
    : asArray(guide, ["entries", "guideItems", "guide_items", "descriptions", "contents", "items"]);
  const items = normalizeCareGuideEntries(entryPayload);
  const description = typeof guide === "string"
    ? guide
    : guide?.description ?? guide?.content ?? guide?.body ?? "";
  const descriptions = items.length
    ? items.map((item) => item.description).filter(Boolean)
    : normalizeGuideDescriptions([description]);

  return {
    title: typeof guide === "string" ? fallbackTitle : guide?.title ?? guide?.name ?? fallbackTitle,
    description: descriptions.join(" "),
    descriptions,
    items: items.length
      ? items
      : descriptions.map((nextDescription) => ({
          subtitle: "",
          description: nextDescription,
        })),
  };
};

const normalizeMaterialSections = (sections) =>
  (sections ?? [])
    .map(normalizeMaterialSection)
    .filter((section) => section.title || section.description || section.image);

const normalizeDesignDetail = (key, value) => {
  const formattedValue = formatSpecValue(value);

  if (!formattedValue) return null;

  const [firstWord, ...restWords] = formattedValue.split(/\s+/);
  const label = /^\d+$/.test(key) && restWords.length > 0 ? firstWord : toDisplayLabel(key);
  const displayValue = /^\d+$/.test(key) && restWords.length > 0
    ? restWords.join(" ")
    : formattedValue;

  return {
    label: label.toUpperCase(),
    value: displayValue,
  };
};

const normalizeDesignHighlights = (background, productPayload) => {
  const highlights = [];
  const designDetails = isPlainObject(background.design_details)
    ? background.design_details
    : productPayload?.specs?.design_details;

  if (background.collection) {
    highlights.push({
      label: "COLLECTION",
      value: String(background.collection).replace(/\s+COLLECTION$/i, ""),
    });
  }

  if (isPlainObject(designDetails)) {
    Object.entries(designDetails).forEach(([key, value]) => {
      const detail = normalizeDesignDetail(key, value);
      if (detail) highlights.push(detail);
    });
  }

  Object.entries(background)
    .filter(([key, value]) => (
      ![
        "description",
        "design",
        "collection",
        "design_details",
        "designDetails",
        "material_details",
        "materialDetails",
        "materials",
      ].includes(key) &&
      value !== null &&
      value !== undefined &&
      value !== ""
    ))
    .forEach(([key, value]) => {
      highlights.push({
        label: toSpecLabel(key),
        value: formatSpecValue(value),
      });
    });

  return highlights.filter((highlight) => highlight.value);
};

const normalizeMaterialDetailItem = (item, index) => {
  if (typeof item === "string") {
    const detailKey = String(index + 1).padStart(2, "0");
    const detail = normalizeDesignDetail(detailKey, item);
    return detail ? { ...detail, order: detailKey } : null;
  }

  if (!isPlainObject(item)) return null;

  const label = item.label ?? item.title ?? item.name;
  const value = item.value ?? item.description ?? item.content ?? item.text;
  const order = item.order ?? item.number ?? item.index ?? String(index + 1).padStart(2, "0");
  const image = resolveImageUrl(getImageSource(item));
  const imageStyle = item.imageStyle ?? item.image_style;

  if (label && value) {
    return {
      label: String(label).toUpperCase(),
      value: formatSpecValue(value),
      order,
      image,
      imageStyle,
    };
  }

  const entries = Object.entries(item);
  if (entries.length !== 1) return null;

  const [key, itemValue] = entries[0];
  if (isPlainObject(itemValue)) {
    return normalizeMaterialDetailItem({ ...itemValue, order: key }, index);
  }

  const detail = normalizeDesignDetail(key, itemValue);
  return detail ? { ...detail, order: key } : null;
};

const normalizeMaterialDetails = (background) => {
  const materialDetails = background?.material_details ?? background?.materialDetails;

  if (isPlainObject(materialDetails)) {
    return Object.entries(materialDetails)
      .map(([key, value]) => {
        if (isPlainObject(value)) {
          return normalizeMaterialDetailItem({ ...value, order: key }, Number(key) - 1);
        }

        const detail = normalizeDesignDetail(key, value);
        return detail ? { ...detail, order: key } : null;
      })
      .filter(Boolean);
  }

  if (Array.isArray(materialDetails)) {
    return materialDetails
      .map((item, index) => normalizeMaterialDetailItem(item, index))
      .filter(Boolean);
  }

  return [];
};

const normalizeGuideList = (guides) =>
  (guides ?? [])
    .map((guide) => normalizeGuide(guide))
    .filter((guide) => guide.title || guide.description);

const removeDuplicateGuides = (guides) => {
  const seenGuides = new Set();

  return guides.filter((guide) => {
    const guideKey = String(guide.description || guide.title || "").trim();

    if (!guideKey || seenGuides.has(guideKey)) return false;

    seenGuides.add(guideKey);
    return true;
  });
};

const getCareGuideEntries = (guideMap) => {
  if (Array.isArray(guideMap)) return normalizeCareGuideEntries(guideMap);

  return Object.entries(guideMap ?? {})
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .sort(([firstKey], [secondKey]) => Number(firstKey) - Number(secondKey))
    .map(([key, value]) => normalizeCareGuideEntry(value, key))
    .filter((entry) => entry.subtitle || entry.description);
};

const normalizeBackendCareItem = (item) => {
  const keyedGuide = item?.careguide ?? item?.careGuide;
  const items = getCareGuideEntries(keyedGuide);
  const descriptions = items.map((entry) => entry.description).filter(Boolean);

  return {
    title: item?.title ?? item?.name ?? item?.subtitle ?? item?.heading ?? "",
    description: descriptions.join(" "),
    descriptions,
    items,
  };
};

const normalizeCareItems = (items) =>
  (items ?? [])
    .flatMap((item) => {
      const keyedGuide = item?.careguide ?? item?.careGuide;

      if (isPlainObject(keyedGuide) || Array.isArray(keyedGuide)) {
        return normalizeBackendCareItem(item);
      }

      return normalizeGuide(item);
    })
    .filter((guide) => guide.title || guide.description || guide.descriptions?.length);

const getKeyedGuides = (guideMap) => {
  if (!isPlainObject(guideMap)) return [];

  return Object.entries(guideMap)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => normalizeGuide(value, key));
};

const normalizeMaterialsStory = (materials, fallbackMaterials, background) => {
  const details = normalizeMaterialDetails(background);

  if (!materials) {
    return {
      eyebrow: "MATERIALS & CRAFT",
      title: "",
      image: "",
      sections: [],
      details,
    };
  }

  if (Array.isArray(materials)) {
    const sections = normalizeMaterialSections(materials);

    return {
      ...fallbackMaterials,
      title: fallbackMaterials?.title ?? sections[0]?.title ?? "",
      image: fallbackMaterials?.image ?? sections.find((section) => section.image)?.image ?? "",
      imageView: fallbackMaterials?.imageView,
      sections,
      details,
    };
  }

  const sections = asArray(materials, ["sections", "items"]);
  const normalizedSections = normalizeMaterialSections(sections);

  return {
    ...fallbackMaterials,
    ...materials,
    title: materials?.title ?? materials?.name ?? fallbackMaterials?.title ?? normalizedSections[0]?.title ?? "",
    image: fallbackMaterials?.image || resolveImageUrl(getImageSource(materials)) || "",
    imageView: fallbackMaterials?.imageView ?? materials?.imageView ?? materials?.image_view,
    sections: normalizedSections.length
      ? normalizedSections
      : fallbackMaterials?.sections ?? [],
    details,
  };
};

const getVisibleCareItems = (care, productPayload) => {
  const productId = Number(productPayload?.id);

  if (productId === 9 && Array.isArray(care)) {
    return care.filter((item) => Number(item?.id) === 30);
  }

  return care;
};

const hideCareGroupTitle = (guide, productPayload) => {
  if (Number(productPayload?.id) !== 9) return guide;

  return {
    ...guide,
    title: "",
  };
};

const normalizeCareStory = (care, fallbackCare, productPayload) => {
  if (!care) {
    return {
      eyebrow: "CARE GUIDE",
      title: "",
      guides: [],
    };
  }

  if (Array.isArray(care)) {
    const guides = normalizeCareItems(getVisibleCareItems(care, productPayload))
      .map((guide) => hideCareGroupTitle(guide, productPayload));

    return {
      ...fallbackCare,
      guides,
    };
  }

  const guides = asArray(care, ["guides", "contents", "items"]);
  const normalizedGuides = removeDuplicateGuides(
    guides.length ? normalizeGuideList(guides) : getKeyedGuides(care),
  );

  return {
    ...fallbackCare,
    ...care,
    guides: normalizedGuides.length
      ? normalizedGuides
      : fallbackCare?.guides ?? [],
  };
};

const normalizeCarePayload = (carePayload) => {
  if (!carePayload) return null;

  if (Array.isArray(carePayload)) return carePayload;
  if (Array.isArray(carePayload.value)) return carePayload.value;
  if (carePayload.value) return carePayload.value;
  if (Array.isArray(carePayload.guides)) return carePayload.guides;
  if (Array.isArray(carePayload.contents)) return carePayload.contents;
  if (Array.isArray(carePayload.items)) return carePayload.items;

  return carePayload.careguide ?? carePayload.careGuide ?? carePayload.care_guide ?? carePayload;
};

const getMaterialHeroImageView = (productPayload) => {
  const category = String(productPayload?.category ?? "").toUpperCase();

  if (category.includes("BAG")) {
    return {
      fit: "cover",
      position: "center 82%",
      scale: 1.55,
    };
  }

  return {
    fit: "cover",
    position: "center",
    scale: 1.85,
  };
};

const normalizeStory = (materialsPayload, backgroundPayload, careGuidePayload, productPayload, currentVariant) => {
  const background =
    backgroundPayload?.background ??
    backgroundPayload?.value ??
    backgroundPayload ??
    productPayload?.background ??
    {};
  const materials = materialsPayload?.materials ?? materialsPayload;
  const productImage = currentVariant?.image ?? normalizeImages(productPayload?.images ?? productPayload?.image)[0] ?? "";
  const fallbackMaterialsStory = {
    eyebrow: "MATERIALS & CRAFT",
    title: "",
    image: productImage,
    imageView: getMaterialHeroImageView(productPayload),
    sections: [],
  };
  const fallbackCareStory = {
    eyebrow: "CARE GUIDE",
    title: "제품 관리 가이드",
    guides: [],
  };
  const careGuide = normalizeCarePayload(
    careGuidePayload ??
      productPayload?.care ??
      productPayload?.careguide ??
      productPayload?.careGuide,
  );

  return {
    sections: [],
    design: {
      eyebrow: "DESIGN & HERITAGE",
      title: productPayload?.name ?? "",
      image: productImage,
      paragraphs: background.description ? [background.description] : [],
      highlights: normalizeDesignHighlights(background, productPayload),
    },
    materials: normalizeMaterialsStory(materials, fallbackMaterialsStory, background),
    care: normalizeCareStory(careGuide, fallbackCareStory, productPayload),
  };
};

const normalizeProductMaterial = (section) => ({
  ...section,
  name: section?.name ?? section?.title ?? "",
  description: section?.description ?? section?.content ?? "",
});

const normalizeProductCareGuide = (guide) => ({
  ...guide,
  title: guide?.title ?? guide?.name ?? "",
  content: guide?.content ?? guide?.description ?? "",
  descriptions: guide?.descriptions ?? [],
  items: guide?.items ?? [],
});

const normalizeAiDocentFaqs = (productPayload) =>
  asArray(productPayload, ["aiDocentFaqs", "ai_docent_faqs", "faqs", "faq", "questions"])
    .map((faq) => ({
      question: typeof faq === "string" ? faq : faq?.question ?? faq?.title ?? "",
      answer: typeof faq === "string" ? "" : faq?.answer ?? faq?.response ?? "",
    }))
    .filter((faq) => faq.question);

const buildProductSizes = (product) => {
  const variants = product?.variants ?? [];
  const sizesByName = new Map();

  variants.forEach((variant) => {
    if (!variant.size) return;

    const existingVariant = sizesByName.get(variant.size);
    const shouldReplace =
      !existingVariant ||
      (variant.color === product.color && existingVariant.color !== product.color);

    if (shouldReplace) {
      sizesByName.set(variant.size, {
        ...variant,
        image: variant.image || product.image || "",
        stock: getVariantStockForBranch(variant, product.currentBranch),
        isCurrent: variant.size === product.size,
      });
    }
  });

  if (sizesByName.size > 0) return [...sizesByName.values()];

  return product?.size
    ? [
        {
          id: product.id,
          productId: product.id,
          name: product.name,
          color: product.color,
          size: product.size,
          image: product.image || "",
          price: product.price,
          stock: product.stock,
          isCurrent: true,
        },
      ]
    : [];
};

const normalizeProduct = (
  productPayload,
  sizesPayload,
  materialsPayload,
  backgroundPayload,
  careGuidePayload,
  stockPayload,
) => {
  const productVariants = asArray(sizesPayload, ["sizes", "variants", "details", "items", "results", "value"]);
  const embeddedVariants = asArray(productPayload?.details, ["variants", "details"]);
  const sourceVariants = embeddedVariants.length ? embeddedVariants : productVariants;
  const variants = sourceVariants.map((variant) => normalizeVariant(variant, productPayload));
  const currentVariant = variants[0];
  const colors = [...new Set(variants.map((variant) => variant.color).filter(Boolean))];
  const images = normalizeImages(productPayload?.images ?? productPayload?.image);
  const specs = normalizeSpecs(productPayload?.specs, currentVariant?.size ?? productPayload?.size);
  const story = normalizeStory(materialsPayload, backgroundPayload, careGuidePayload, productPayload, currentVariant);
  const background = backgroundPayload?.background ?? backgroundPayload?.value ?? backgroundPayload ?? productPayload?.background ?? {};
  const productMaterials = (story.materials?.sections ?? story.materials?.items ?? []).map(normalizeProductMaterial);
  const productCareGuide = (story.care?.guides ?? story.care?.contents ?? []).map(normalizeProductCareGuide);
  const stockLocations = mergeStockEntries([
    ...normalizeStockPayload(stockPayload),
    ...normalizeStockPayload(productPayload),
    ...variants.flatMap((variant) => variant.stocks ?? []),
  ]);
  const currentBranch =
    stockLocations.find((stock) => Number(stock.distance) === 0) ??
    currentVariant?.stocks?.[0] ??
    stockLocations[0];
  const currentStock = getVariantStockForBranch(currentVariant, currentBranch);

  return {
    id: productPayload?.id,
    category: productPayload?.category ?? "",
    collection: (background.collection ?? productPayload?.collection ?? "")
      ?.replace(/\s+COLLECTION$/i, ""),
    collectionName: (background.collection ?? productPayload?.collectionName ?? "")
      ?.replace(/\s+COLLECTION$/i, ""),
    name: productPayload?.name ?? "",
    price: currentVariant?.price ?? productPayload?.price ?? 0,
    color: currentVariant?.color ?? productPayload?.color ?? "",
    colors,
    size: currentVariant?.size ?? productPayload?.size ?? "",
    stock: currentStock ?? currentVariant?.stock ?? productPayload?.stock ?? 0,
    image: images[0] ?? currentVariant?.image ?? "",
    images,
    stocks: currentVariant?.stocks ?? [],
    stockLocations,
    currentBranch,
    variants,
    specs,
    materials: productMaterials,
    careGuide: productCareGuide,
    aiDocentFaqs: normalizeAiDocentFaqs(productPayload),
    story,
  };
};

const fetchProductPayload = (productId) => getApiData(`products/${productId}/`);

const fetchProductSizesPayload = async (productId) => {
  try {
    return await getApiData(`products/${productId}/sizes/`);
  } catch {
    return null;
  }
};

const fetchProductMaterialsPayload = async (productId) => {
  try {
    return await getApiData(`products/${productId}/materials/`);
  } catch {
    return null;
  }
};

const fetchProductBackgroundPayload = async (productId) => {
  try {
    return await getApiData(`products/${productId}/background/`);
  } catch {
    return null;
  }
};

const fetchProductCareGuidePayload = async (productId) => {
  try {
    return await getApiData(`products/${productId}/care-guide/`);
  } catch {
    return null;
  }
};

const fetchProductStockPayload = async (productId) => {
  try {
    return await getApiData(`products/${productId}/stock/`);
  } catch {
    return null;
  }
};

export const getProducts = async () => {
  try {
    return asArray(await getApiData("products/"), ["products", "items", "results"]);
  } catch {
    const products = await Promise.allSettled(
      PRODUCT_ID_RANGE.map((productId) => getProductDetail(productId)),
    );

    return products
      .filter((result) => result.status === "fulfilled" && result.value)
      .map((result) => result.value);
  }
};

export const getProductById = async (productId) => {
  return getProductDetail(productId);
};

export const getProductDetail = async (productId) => {
  const id = productId ?? DEFAULT_PRODUCT_ID;
  const productPayload = await fetchProductPayload(id);
  const [sizesPayload, materialsPayload, backgroundPayload, careGuidePayload, stockPayload] = await Promise.all([
    fetchProductSizesPayload(id),
    fetchProductMaterialsPayload(id),
    fetchProductBackgroundPayload(id),
    fetchProductCareGuidePayload(id),
    fetchProductStockPayload(id),
  ]);

  return normalizeProduct(
    productPayload,
    sizesPayload,
    materialsPayload,
    backgroundPayload,
    careGuidePayload,
    stockPayload,
  );
};

export const getProductStory = async (productId) => {
  const product = await getProductDetail(productId ?? DEFAULT_PRODUCT_ID);

  return product.story;
};

export const getProductMaterials = async (productId) => {
  const product = await getProductDetail(productId ?? DEFAULT_PRODUCT_ID);

  return product.materials ?? [];
};

export const getProductCareGuide = async (productId) => {
  const product = await getProductDetail(productId ?? DEFAULT_PRODUCT_ID);

  return { contents: product.careGuide ?? [] };
};

export const getProductStock = async (productId) => {
  const product = await getProductDetail(productId ?? DEFAULT_PRODUCT_ID);
  return product.stocks ?? [];
};

export const getProductSizes = async (productId) => {
  const product = await getProductDetail(productId ?? DEFAULT_PRODUCT_ID);

  return buildProductSizes(product);
};

export const getProductSizesForProduct = buildProductSizes;

const getAiDocentAnswer = (data) => {
  const answer =
    data?.answer ??
    data?.response ??
    data?.message ??
    data?.result ??
    data?.content ??
    data?.reply;

  if (answer === null || answer === undefined) return "";

  if (isPlainObject(answer)) {
    return answer.answer ?? answer.message ?? answer.content ?? answer.response ?? "";
  }

  return String(answer);
};

export const askAiDocent = async (productIdOrQuestion, maybeQuestion) => {
  const hasProductId = maybeQuestion !== undefined;
  const productId = hasProductId ? productIdOrQuestion : DEFAULT_PRODUCT_ID;
  const question = hasProductId ? maybeQuestion : productIdOrQuestion;

  const data = await postApiData(`products/${productId ?? DEFAULT_PRODUCT_ID}/ai-assistant/`, {
    question,
  });

  return {
    ...data,
    question: data?.question ?? question,
    answer: getAiDocentAnswer(data),
  };
};
