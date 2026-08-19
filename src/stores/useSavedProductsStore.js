import { create } from "zustand";
import {
  deleteSavedProduct,
  getSavedProducts,
  saveSavedProduct,
} from "../api/savedProductsApi";
import { products } from "../mocks/products";

const getSavedProductId = (item) => item?.product?.id ?? item?.product_id;

const toCardProduct = (item) => {
  const productId = getSavedProductId(item);
  const product = products.find((candidate) => String(candidate.id) === String(productId));

  return {
    ...product,
    ...item.product,
    id: productId,
    collection: product?.collection
      ? `${product.collection} COLLECTION`
      : item.product?.category ?? "",
    option: product ? `${product.color} · ${product.size}` : "",
    store: product?.stocks?.[0]?.branch_name ?? "MCM 신세계 강남점",
    isSaved: true,
    savedProductId: item.id,
    savedAt: item.saved_at,
  };
};

const useSavedProductsStore = create((set, get) => ({
  savedProducts: [],
  isLoading: false,
  error: null,
  fetchSavedProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getSavedProducts();
      const savedProducts = Array.isArray(response?.saved_products)
        ? response.saved_products.map(toCardProduct).filter((product) => product.id != null)
        : [];
      set({ savedProducts });
      return savedProducts;
    } catch (error) {
      console.error("Failed to fetch saved products", error);
      set({ error });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  saveProduct: async (productId) => {
    await saveSavedProduct(productId);
    return get().fetchSavedProducts();
  },
  removeProduct: async (productId) => {
    await deleteSavedProduct(productId);
    return get().fetchSavedProducts();
  },
  isProductSaved: (productId) => get().savedProducts.some(
    (item) => String(item.id) === String(productId),
  ),
}));

export { getSavedProductId };

export default useSavedProductsStore;
