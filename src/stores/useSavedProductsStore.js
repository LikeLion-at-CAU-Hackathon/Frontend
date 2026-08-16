import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSavedProductsStore = create(
  persist(
    (set, get) => ({
      savedProducts: [],
      addSavedProduct: (product) => {
        if (get().savedProducts.some((item) => item.id === product.id)) return;

        set((state) => ({
          savedProducts: [{ ...product, isSaved: true }, ...state.savedProducts],
        }));
      },
      removeSavedProduct: (productId) => {
        set((state) => ({
          savedProducts: state.savedProducts.filter((item) => item.id !== productId),
        }));
      },
      isProductSaved: (productId) => {
        return get().savedProducts.some((item) => item.id === productId);
      },
    }),
    {
      name: "saved-products-storage",
    },
  ),
);

export default useSavedProductsStore;
