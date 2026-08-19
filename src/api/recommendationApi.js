import axiosInstance from "./axiosInstance";

const resolveImageUrl = (image) => {
  if (!image || /^(?:https?:|data:|blob:)/.test(image)) return image ?? "";

  const baseUrl = axiosInstance.defaults.baseURL;
  if (!/^https?:/.test(baseUrl ?? "")) return image;

  return new URL(image, baseUrl).href;
};

const getProductPreview = async (productId) => {
  const { data } = await axiosInstance.get(`products/${productId}/`);
  const detail = data?.details?.[0];

  return {
    id: data?.id ?? productId,
    name: data?.name ?? "",
    category: data?.category ?? "",
    image: resolveImageUrl(detail?.images?.[0]?.image),
    price: detail?.price ?? null,
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

export const createRecommendationSession = async () => {
  const { data } = await axiosInstance.post("recommendations/sessions/");
  return data?.session?.id;
};

export const addRecommendationHistory = async (sessionId, productId) => {
  const { data } = await axiosInstance.post(
    `recommendations/sessions/${sessionId}/history/`,
    { product_id: Number(productId) },
  );
  return data?.history;
};

export const getRecommendationHistory = async (sessionId) => {
  const { data } = await axiosInstance.get(`recommendations/sessions/${sessionId}/history/`);
  const histories = (data?.histories ?? []).slice(-3);

  return Promise.all(
    histories.map(async (history) => {
      const product = await getProductPreview(history.product);
      return {
        ...product,
        historyId: history.id,
        sequence: history.sequence,
        name: history.product_name ?? product.name,
        category: history.product_category ?? product.category,
      };
    }),
  );
};

export const analyzeRecommendationSession = async (sessionId) => {
  const { data } = await axiosInstance.post(
    `recommendations/sessions/${sessionId}/analyze/`,
  );
  return data;
};

export const getRecommendationLookDetail = async (lookId) => {
  const { data } = await axiosInstance.get(`recommendations/looks/${lookId}/`);
  const look = data?.data;
  return look ? normalizeLook(look, look) : null;
};

export const getRecommendationResult = async (sessionId) => {
  const [{ data }, history] = await Promise.all([
    axiosInstance.get(`recommendations/sessions/${sessionId}/result/`),
    getRecommendationHistory(sessionId),
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
