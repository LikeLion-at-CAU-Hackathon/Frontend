import { products } from "../mocks/products";

export const getProducts = async () => {
  return products;
};

export const getProductById = async (productId) => {
  return products.find((product) => product.id === Number(productId));
};