import axiosInstance from "./axiosInstance";
import { getProductDetail } from "./productApi";

const resolveImageUrl = (image) => {
  if (!image || /^(?:https?:|data:|blob:)/.test(image)) return image ?? "";

  const baseUrl = axiosInstance.defaults.baseURL;
  if (!/^https?:/.test(baseUrl ?? "")) return image;

  return new URL(image, baseUrl).href;
};

const getProductPreview = async (productId) => {
  const product = await getProductDetail(productId);

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

export const createRecommendationSession = async () => {
  const { data } = await axiosInstance.post("recommendations/sessions/");
  return data?.session?.id ?? data?.session_id ?? data?.id ?? "current";
};

export const addRecommendationHistory = async (...args) => {
  const productId = args.length > 1 ? args[1] : args[0];
  const { data } = await axiosInstance.post("recommendations/sessions/history/", {
    product_id: Number(productId),
  });
  return data?.history;
};

export const getRecommendationHistory = async () => {
  const { data } = await axiosInstance.get("recommendations/sessions/history/");
  const histories = asHistoryArray(data).slice(-3);

  return Promise.all(
    histories.map(async (history) => {
      const productId = history.product ?? history.product_id ?? history.productId;
      if (!productId) return null;

      const product = await getProductPreview(productId);
      return {
        ...product,
        historyId: history.id,
        sequence: history.sequence,
        name: history.product_name ?? product.name,
        category: history.product_category ?? product.category,
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
  const look = data?.data;
  return look ? normalizeLook(look, look) : null;
};

export const getRecommendationResult = async () => {
  const [{ data }, history] = await Promise.all([
    axiosInstance.get("recommendations/sessions/result/"),
    getRecommendationHistory(),
  ]);
  const profile = data?.data;

  if (!profile) return null;

  const lookDetails = await Promise.all(
    (profile.looks ?? []).map(async (look) => {
      const detail = await getRecommendationLookDetail(look.id);
      return normalizeLook(look, detail);
    }),
  );

  return {
    id: profile.id,
    summary: profile.summary ?? "",
    keywords: (profile.style_chips ?? []).map((chip) => chip.label),
    looks: lookDetails,
    todayItems: history,
  };
};
