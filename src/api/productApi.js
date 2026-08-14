import { productDetailResponse, products, productStockResponse } from "../mocks/products";
import { productSizesResponse } from "../mocks/productSizes";
import {
  aiDocentFaqs,
  aiDocentResponse,
  careGuideResponse,
  materialsResponse,
  storyResponse,
} from "../mocks/productStories";

export const getProducts = async () => {
  return products;
};

export const getProductById = async (productId) => {
  return products.find((product) => product.id === Number(productId));
};

export const getProductDetail = async () => {
  return productDetailResponse;
};

export const getProductStory = async () => {
  return storyResponse;
};

export const getProductMaterials = async () => {
  return materialsResponse;
};

export const getProductCareGuide = async () => {
  return careGuideResponse;
};

export const getProductStock = async () => {
  return productStockResponse;
};

export const getProductSizes = async () => {
  return productSizesResponse;
};

export const askAiDocent = async (question) => {
  const faq = aiDocentFaqs.find((item) => item.question === question);

  return {
    ...aiDocentResponse,
    question,
    answer: faq?.answer ?? aiDocentResponse.answer,
  };
};
