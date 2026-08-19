import axiosInstance from "./axiosInstance";

const SAVED_PRODUCTS_PATH = "recommendations/sessions/saved-products/";

export const getSavedProducts = async () => {
  const { data } = await axiosInstance.get(SAVED_PRODUCTS_PATH);
  return data;
};

export const saveSavedProduct = async (productId) => {
  const { data } = await axiosInstance.post(`${SAVED_PRODUCTS_PATH}${productId}/`);
  return data;
};

export const deleteSavedProduct = async (productId) => {
  const { data } = await axiosInstance.delete(`${SAVED_PRODUCTS_PATH}${productId}/`);
  return data;
};

export const getSavedProductAnalysis = async (productId) => {
  try {
    const { data } = await axiosInstance.get(`${SAVED_PRODUCTS_PATH}${productId}/analysis/`);
    return data?.analysis ?? data?.data ?? data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message ?? "";
    if (error?.response?.status === 404 && errorMessage.includes("분석 결과")) return null;
    throw error;
  }
};
