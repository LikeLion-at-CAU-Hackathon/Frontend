import axiosInstance from "./axiosInstance";

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

const resolveImageUrl = (image) => {
  if (!image || /^(?:https?:|data:|blob:)/.test(image)) return image ?? "";

  const baseUrl = axiosInstance.defaults.baseURL;
  if (!/^https?:/.test(baseUrl ?? "")) return image;

  return new URL(image, baseUrl).href;
};

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

const getCurrentStoreStock = (variant) => {
  if (Array.isArray(variant?.stocks) && variant.stocks.length > 0) {
    return getStockQuantity(variant.stocks[0]);
  }

  return getStockQuantity(variant);
};

const normalizeStocks = (stocks) => {
  return (stocks ?? []).map((stock) => ({
    ...stock,
    branch_id: stock?.branch_id ?? stock?.branchId ?? stock?.store_id,
    branch_name: stock?.branch_name ?? stock?.branchName ?? stock?.store_name ?? stock?.name,
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
    name: product?.name ?? variant?.name ?? "",
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

const normalizeMaterialSection = (material) => ({
  title: material?.title ?? material?.name ?? "",
  description: material?.description ?? material?.content ?? "",
  image: resolveImageUrl(material?.image),
});

const normalizeGuide = (guide, fallbackTitle = "") => ({
  title: typeof guide === "string" ? fallbackTitle : guide?.title ?? guide?.name ?? fallbackTitle,
  description: typeof guide === "string" ? guide : guide?.description ?? guide?.content ?? "",
});

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
      !["description", "design", "collection", "design_details", "materials"].includes(key) &&
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

const normalizeNumberedGuideTitles = (guides) => {
  const hasOnlyNumberedTitles = guides.every((guide) => /^\d+$/.test(String(guide.title ?? "")));

  if (!hasOnlyNumberedTitles) return guides;

  return guides.map((guide, index) => ({
    ...guide,
    title: String(index + 1).padStart(2, "0"),
  }));
};

const CARE_CATEGORIES = ["STORAGE", "CLEANING", "LEATHER", "CAUTION"];

const getCareCategory = (guide) => {
  const text = `${guide.title ?? ""} ${guide.description ?? ""}`.toLowerCase();

  if (/leather|가죽/.test(text)) return "LEATHER";
  if (/clean|wipe|cloth|오염|젖|닦|천|관리/.test(text)) return "CLEANING";
  if (/storage|dust|sun|light|humidity|water|보관|더스트|직사광선|밝은 빛|습기|물/.test(text)) {
    return "STORAGE";
  }
  if (/caution|soap|solvent|rough|scratch|friction|주의|비누|솔벤트|거친|긁|마찰/.test(text)) {
    return "CAUTION";
  }

  return "CAUTION";
};

const shouldGroupCareGuides = (guides) => {
  const titles = guides.map((guide) => String(guide.title ?? ""));
  const hasCategoryTitles = titles.some((title) =>
    CARE_CATEGORIES.includes(title.toUpperCase()),
  );

  return guides.length > CARE_CATEGORIES.length || titles.every((title) => /^\d+$/.test(title)) || !hasCategoryTitles;
};

const groupCareGuidesByCategory = (guides) => {
  if (!shouldGroupCareGuides(guides)) return guides;

  const groupedGuides = new Map(CARE_CATEGORIES.map((category) => [category, []]));

  guides.forEach((guide) => {
    const description = String(guide.description ?? "").trim();
    if (!description) return;

    const category = getCareCategory(guide);
    const categoryGuides = groupedGuides.get(category) ?? [];

    if (!categoryGuides.includes(description)) {
      categoryGuides.push(description);
    }

    groupedGuides.set(category, categoryGuides);
  });

  return CARE_CATEGORIES
    .map((category) => ({
      title: category,
      description: groupedGuides.get(category)?.join(" ") ?? "",
    }))
    .filter((guide) => guide.description);
};

const normalizeCareItems = (items) =>
  removeDuplicateGuides(
    (items ?? []).flatMap((item) => {
      const keyedGuide = item?.careguide ?? item?.careGuide;

      if (keyedGuide) {
        return getKeyedGuides(keyedGuide);
      }

      return normalizeGuide(item);
    }),
  ).filter((guide) => guide.title || guide.description);

const getKeyedGuides = (guideMap) => {
  if (!isPlainObject(guideMap)) return [];

  return Object.entries(guideMap)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => normalizeGuide(value, key));
};

const normalizeMaterialsStory = (materials, fallbackMaterials) => {
  if (!materials) {
    return {
      eyebrow: "MATERIALS & CRAFT",
      title: "",
      image: "",
      sections: [],
    };
  }

  if (Array.isArray(materials)) {
    const sections = normalizeMaterialSections(materials);

    return {
      ...fallbackMaterials,
      title: fallbackMaterials?.title ?? sections[0]?.title ?? "",
      image: fallbackMaterials?.image ?? sections.find((section) => section.image)?.image ?? "",
      sections,
    };
  }

  const sections = asArray(materials, ["sections", "items"]);
  const normalizedSections = normalizeMaterialSections(sections);

  return {
    ...fallbackMaterials,
    ...materials,
    title: materials?.title ?? materials?.name ?? fallbackMaterials?.title ?? normalizedSections[0]?.title ?? "",
    image: resolveImageUrl(materials?.image) || fallbackMaterials?.image || "",
    sections: normalizedSections.length
      ? normalizedSections
      : fallbackMaterials?.sections ?? [],
  };
};

const normalizeCareStory = (care, fallbackCare) => {
  if (!care) {
    return {
      eyebrow: "CARE GUIDE",
      title: "",
      guides: [],
    };
  }

  if (Array.isArray(care)) {
    const guides = groupCareGuidesByCategory(normalizeNumberedGuideTitles(normalizeCareItems(care)));

    return {
      ...fallbackCare,
      guides,
    };
  }

  const guides = asArray(care, ["guides", "contents", "items"]);
  const normalizedGuides = groupCareGuidesByCategory(normalizeNumberedGuideTitles(
    removeDuplicateGuides(guides.length ? normalizeGuideList(guides) : getKeyedGuides(care)),
  ));

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

const normalizeStory = (materialsPayload, backgroundPayload, careGuidePayload, productPayload, currentVariant) => {
  const background =
    backgroundPayload?.background ??
    backgroundPayload?.value ??
    backgroundPayload ??
    productPayload?.background ??
    {};
  const materials = materialsPayload?.materials ?? materialsPayload;
  const fallbackMaterialsStory = {
    eyebrow: "MATERIALS & CRAFT",
    title: "",
    image: "",
    sections: [],
  };
  const fallbackCareStory = {
    eyebrow: "CARE GUIDE",
    title: "",
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
      title: background.design ?? productPayload?.name ?? "",
      image: currentVariant?.image ?? normalizeImages(productPayload?.images ?? productPayload?.image)[0] ?? "",
      paragraphs: background.description ? [background.description] : [],
      highlights: normalizeDesignHighlights(background, productPayload),
    },
    materials: normalizeMaterialsStory(materials, fallbackMaterialsStory),
    care: normalizeCareStory(careGuide, fallbackCareStory),
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

const normalizeProduct = (productPayload, sizesPayload, materialsPayload, backgroundPayload, careGuidePayload) => {
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
    stock: currentVariant?.stock ?? productPayload?.stock ?? 0,
    image: images[0] ?? currentVariant?.image ?? "",
    images,
    stocks: currentVariant?.stocks ?? [],
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
  const [sizesPayload, materialsPayload, backgroundPayload, careGuidePayload] = await Promise.all([
    fetchProductSizesPayload(id),
    fetchProductMaterialsPayload(id),
    fetchProductBackgroundPayload(id),
    fetchProductCareGuidePayload(id),
  ]);

  return normalizeProduct(
    productPayload,
    sizesPayload,
    materialsPayload,
    backgroundPayload,
    careGuidePayload,
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
