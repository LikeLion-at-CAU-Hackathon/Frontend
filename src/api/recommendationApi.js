import axiosInstance, { resolveApiAssetUrl } from "./axiosInstance";
import { getProductDetail } from "./productApi";

const resolveImageUrl = resolveApiAssetUrl;

let sessionRequest = null;
let sessionInitialized = false;
let sessionResponse = null;

const ensureRecommendationSession = async () => {
  if (sessionInitialized) return sessionResponse;

  if (!sessionRequest) {
    sessionRequest = axiosInstance
      .post("recommendations/sessions/")
      .then((response) => {
        sessionInitialized = true;
        sessionResponse = response;
        return response;
      })
      .finally(() => {
        sessionRequest = null;
      });
  }

  return sessionRequest;
};

const getProductPreview = async (productId) => {
  const product = await getProductDetail(productId).catch(() => null);

  return {
    id: product?.id ?? productId,
    name: product?.name ?? "",
    category: product?.category ?? "",
    image: product?.image ?? "",
    price: product?.price ?? null,
  };
};

const firstArray = (...values) => values.find(Array.isArray) ?? [];

const normalizeLookProduct = (product) => {
  if (product === null || product === undefined || typeof product !== "object") {
    return {
      id: product,
      name: "",
      category: "",
      image: "",
      price: null,
    };
  }

  const nestedProduct = product.product && typeof product.product === "object" ? product.product : null;
  const productId = product.product_id
    ?? product.productId
    ?? nestedProduct?.id
    ?? product.id
    ?? product.product;

  return {
    id: productId,
    name: product.name ?? product.product_name ?? nestedProduct?.name ?? "",
    category: product.category ?? product.product_category ?? product.item_type ?? nestedProduct?.category ?? "",
    image: resolveImageUrl(
      product.image
        ?? product.image_url
        ?? product.product_image
        ?? product.thumbnail
        ?? product.thumbnail_url
        ?? nestedProduct?.image,
    ),
    price: product.price ?? nestedProduct?.price ?? null,
  };
};

const getLookProducts = (look, detail) => firstArray(
  detail?.products,
  detail?.matched_products,
  detail?.matchedProducts,
  detail?.recommended_products,
  detail?.recommendedProducts,
  detail?.recommendation_products,
  detail?.recommendationProducts,
  detail?.items,
  detail?.product_items,
  detail?.productItems,
  detail?.product_details,
  detail?.productDetails,
  detail?.product_ids,
  detail?.productIds,
  look?.products,
  look?.matched_products,
  look?.matchedProducts,
  look?.recommended_products,
  look?.recommendedProducts,
  look?.recommendation_products,
  look?.recommendationProducts,
  look?.items,
  look?.product_items,
  look?.productItems,
  look?.product_details,
  look?.productDetails,
  look?.product_ids,
  look?.productIds,
);

const hydrateLookProduct = async (product) => {
  const normalized = normalizeLookProduct(product);
  if (!normalized.id || normalized.image) return normalized;

  const preview = await getProductPreview(normalized.id);
  return {
    ...preview,
    ...normalized,
    name: normalized.name || preview.name,
    category: normalized.category || preview.category,
    image: normalized.image || preview.image,
    price: normalized.price ?? preview.price,
  };
};

const normalizeLook = async (look, detail) => {
  const products = await Promise.all(getLookProducts(look, detail).map(hydrateLookProduct));

  return {
    id: look?.id,
    name: look?.title ?? look?.name ?? look?.look_name ?? "",
    subtitle: look?.subtitle ?? "",
    description: look?.description ?? "",
    reason: look?.reason ?? "",
    image: resolveImageUrl(
      look?.image
        ?? look?.image_url
        ?? look?.look_image
        ?? look?.generated_image
        ?? look?.generated_image_url
        ?? look?.ai_image
        ?? look?.ai_image_url,
    ) || products.find((product) => product.image)?.image || "",
    products,
  };
};

const asHistoryArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  return payload?.histories ?? payload?.history ?? payload?.results ?? payload?.items ?? [];
};

const getHistoryProductId = (history) => history?.product ?? history?.product_id ?? history?.productId;

const getUniqueRecentHistories = (histories, limit = 3) => {
  const uniqueHistories = [];
  const seenProductIds = new Set();

  histories.forEach((history) => {
    const productId = getHistoryProductId(history);
    const productKey = String(productId);

    if (!productId || seenProductIds.has(productKey)) return;

    seenProductIds.add(productKey);
    uniqueHistories.push(history);
  });

  return uniqueHistories.slice(-limit);
};

export const createRecommendationSession = async () => {
  const { data } = await ensureRecommendationSession();
  return data;
};

export const addRecommendationHistory = async (...args) => {
  const productId = args.length > 1 ? args[1] : args[0];
  await ensureRecommendationSession();
  const { data } = await axiosInstance.post("recommendations/sessions/history/", {
    product_id: Number(productId),
  });
  return data?.history;
};

export const getRecommendationHistory = async () => {
  const { data } = await axiosInstance.get("recommendations/sessions/history/");
  const histories = getUniqueRecentHistories(asHistoryArray(data));

  return Promise.all(
    histories.map(async (history) => {
      const productId = getHistoryProductId(history);
      if (!productId) return null;

      const product = await getProductPreview(productId);
      return {
        ...product,
        historyId: history.id,
        sequence: history.sequence,
        name: history.product_name || product.name,
        category: history.product_category || product.category,
      };
    }),
  ).then((items) => items.filter(Boolean));
};

export const analyzeRecommendationSession = async () => {
  const { data } = await axiosInstance.post("recommendations/sessions/analyze/");
  return data;
};

export const saveRecommendationProduct = async (productId) => {
  await ensureRecommendationSession();
  const { data } = await axiosInstance.post(
    `recommendations/sessions/saved-products/${productId}/`,
  );
  return data;
};

export const deleteRecommendationProduct = async (productId) => {
  await ensureRecommendationSession();
  const { data } = await axiosInstance.delete(
    `recommendations/sessions/saved-products/${productId}/`,
  );
  return data;
};

export const getSavedProductAnalysis = async (productId) => {
  const { data } = await axiosInstance.get(
    `recommendations/sessions/saved-products/${productId}/analysis/`,
  );

  const payload = data?.data ?? data?.analysis ?? data?.result ?? data;
  return payload?.aiAnalysis ?? payload?.ai_analysis ?? payload;
};

export const getRecommendationLookDetail = async (lookId) => {
  const { data } = await axiosInstance.get(`recommendations/looks/${lookId}/`);
  const look = data?.data ?? data?.look ?? data;
  return look ? normalizeLook(look, look) : null;
};

export const getRecommendationResult = async () => {
  const [{ data }, history] = await Promise.all([
    axiosInstance.get("recommendations/sessions/result/"),
    getRecommendationHistory(),
  ]);
  const profile = data?.data ?? data?.result ?? (data?.success === undefined ? data : null);

  if (!profile) return null;

  const looks = profile.looks
    ?? profile.recommended_looks
    ?? profile.recommendedLooks
    ?? profile.recommendations
    ?? [];

  return {
    id: profile.id,
    summary: profile.summary ?? profile.description ?? "",
    keywords: (profile.style_chips ?? []).map((chip) => chip.label ?? chip.name ?? chip),
    looks: await Promise.all(looks.map((look) => normalizeLook(look))),
    todayItems: history,
  };
};
