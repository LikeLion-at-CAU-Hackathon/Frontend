import {
  DEFAULT_PRODUCT_ID,
  aiDocentResponse,
  getAiDocentFaqsForProduct,
  getMockProductById,
  getMockProductStocks,
  getProductSizesForProduct,
  getProductStoryForProduct,
  products,
} from "../mocks/products";

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
  const product = getMockProductById(productId ?? DEFAULT_PRODUCT_ID);

  return getProductStoryForProduct(product);
};

export const getProductMaterials = async (productId) => {
  const product = getMockProductById(productId ?? DEFAULT_PRODUCT_ID);

  return product.materials ?? [];
};

export const getProductCareGuide = async (productId) => {
  const product = getMockProductById(productId ?? DEFAULT_PRODUCT_ID);

  return { contents: product.careGuide ?? [] };
};

export const getProductStock = async (productId) => {
  return getMockProductStocks(productId ?? DEFAULT_PRODUCT_ID);
};

export const getProductSizes = async (productId) => {
  const product = getMockProductById(productId ?? DEFAULT_PRODUCT_ID);

  return getProductSizesForProduct(product);
};

export const askAiDocent = async (productIdOrQuestion, maybeQuestion) => {
  const hasProductId = maybeQuestion !== undefined;
  const product = hasProductId ? getMockProductById(productIdOrQuestion) : getMockProductById(DEFAULT_PRODUCT_ID);
  const question = hasProductId ? maybeQuestion : productIdOrQuestion;
  const faqSource = getAiDocentFaqsForProduct(product);
  const faq = faqSource.find((item) => item.question === question);

  return {
    ...aiDocentResponse,
    question,
    answer: faq?.answer ?? aiDocentResponse.answer,
  };
};
