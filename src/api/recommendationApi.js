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

const normalizeLookProduct = (product) => ({
  id: product?.product_id ?? product?.id,
  name: product?.name ?? product?.product_name ?? "",
  category: product?.category ?? product?.product_category ?? product?.item_type ?? "",
  image: resolveImageUrl(product?.image),
  price: product?.price ?? null,
});

const normalizeLook = (look, detail) => {
  const products = (detail?.products ?? look?.products ?? []).map(normalizeLookProduct);

  return {
    id: look?.id,
    name: look?.title ?? "",
    subtitle: look?.subtitle ?? "",
    description: look?.description ?? "",
    reason: look?.reason ?? "",
    image: resolveImageUrl(look?.image) || products.find((product) => product.image)?.image || "",
    products,
  };
};

const asHistoryArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  return payload?.histories ?? payload?.history ?? payload?.results ?? payload?.items ?? [];
};

const getHistoryProductId = (history) => history?.product ?? history?.product_id ?? history?.productId;

const getUniqueRecentHistories = (histories, limit = 3) => {
  return histories.slice(-limit);
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

  const looks = profile.looks ?? [];

  return {
    id: profile.id,
    summary: profile.summary ?? profile.description ?? "",
    keywords: (profile.style_chips ?? []).map((chip) => chip.label ?? chip.name ?? chip),
    looks: looks.map((look) => normalizeLook(look)),
    todayItems: history,
  };
};
