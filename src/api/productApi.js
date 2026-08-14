import { getMockProductById, products, productStockResponse } from "../mocks/products";
import { getProductSizesForProduct, productSizesResponse } from "../mocks/productSizes";
import {
  aiDocentFaqs,
  aiDocentResponse,
  careGuideResponse,
  getAiDocentFaqsForProduct,
  getProductStoryForProduct,
  materialsResponse,
  storyResponse,
} from "../mocks/productStories";

export const getProducts = async () => {
  return products;
};

export const getProductById = async (productId) => {
  return products.find((product) => product.id === Number(productId));
};

export const getProductDetail = async (productId) => {
  return getMockProductById(productId);
};

export const getProductStory = async (productId) => {
  const product = getMockProductById(productId);

  return productId ? getProductStoryForProduct(product) : storyResponse;
};

export const getProductMaterials = async () => {
  return materialsResponse;
};

export const getProductCareGuide = async () => {
  return careGuideResponse;
};

export const getProductStock = async (productId) => {
  const product = getMockProductById(productId);

  return productId
    ? product.stocks ?? [{ branch_name: "MCM 신세계 본점", quantity: product.stock }]
    : productStockResponse;
};

export const getProductSizes = async (productId) => {
  const product = getMockProductById(productId);

  return productId ? getProductSizesForProduct(product) : productSizesResponse;
};

export const askAiDocent = async (productIdOrQuestion, maybeQuestion) => {
  const hasProductId = maybeQuestion !== undefined;
  const product = hasProductId ? getMockProductById(productIdOrQuestion) : null;
  const question = hasProductId ? maybeQuestion : productIdOrQuestion;
  const faqSource = product ? getAiDocentFaqsForProduct(product) : aiDocentFaqs;
  const faq = faqSource.find((item) => item.question === question);

  return {
    ...aiDocentResponse,
    question,
    answer: faq?.answer ?? aiDocentResponse.answer,
  };
};
