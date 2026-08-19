import { create } from "zustand";

const useRecommendationStore = create(
  (set) => ({
    result: null,
    setResult: (result) => set({ result }),
    clearResult: () => set({ result: null }),
  }),
);

export default useRecommendationStore;
