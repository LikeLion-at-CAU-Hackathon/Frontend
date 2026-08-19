import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createRecommendationSession } from "../api/recommendationApi";

let sessionRequest = null;

const useRecommendationStore = create(
  persist(
    (set, get) => ({
      sessionId: null,
      result: null,
      getOrCreateSession: async () => {
        if (get().sessionId) return get().sessionId;

        if (!sessionRequest) {
          sessionRequest = createRecommendationSession()
            .then((sessionId) => {
              if (!sessionId) throw new Error("AI 추천 세션을 생성하지 못했습니다.");
              set({ sessionId });
              return sessionId;
            })
            .finally(() => {
              sessionRequest = null;
            });
        }

        return sessionRequest;
      },
      setResult: (result) => set({ result }),
      clearResult: () => set({ result: null }),
      clearSession: () => set({ sessionId: null, result: null }),
    }),
    {
      name: "recommendation-session",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useRecommendationStore;
