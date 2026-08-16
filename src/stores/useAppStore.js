import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set) => ({
      user: null,
      currentProductId: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setCurrentProductId: (productId) =>
        set({ currentProductId: String(productId) }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ currentProductId: state.currentProductId }),
    },
  ),
);

export default useAppStore;
