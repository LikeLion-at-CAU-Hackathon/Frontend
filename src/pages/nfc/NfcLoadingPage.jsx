import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import { addRecommendationHistory } from "../../api/recommendationApi";
import useAppStore from "../../stores/useAppStore";
import useRecommendationStore from "../../stores/useRecommendationStore";

const historyRequests = new Map();

const saveTaggedProduct = (getOrCreateSession, productId) => {
  const requestKey = String(productId);
  if (!historyRequests.has(requestKey)) {
    historyRequests.set(
      requestKey,
      getOrCreateSession()
        .then((sessionId) => addRecommendationHistory(sessionId, productId))
        .finally(() => historyRequests.delete(requestKey)),
    );
  }

  return historyRequests.get(requestKey);
};

// NFC 태그로 진입한 제품 정보를 불러오는 화면
function NfcLoadingPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const setCurrentProductId = useAppStore((state) => state.setCurrentProductId);
  const getOrCreateSession = useRecommendationStore((state) => state.getOrCreateSession);
  const clearResult = useRecommendationStore((state) => state.clearResult);

  useEffect(() => {
    let isCancelled = false;

    const loadTaggedProduct = async () => {
      const product = await getProductById(productId).catch(() => null);

      if (!product) {
        await new Promise((resolve) => window.setTimeout(resolve, 1600));
        if (!isCancelled) navigate("/nfc/failed", { replace: true });
        return;
      }

      await Promise.all([
        saveTaggedProduct(getOrCreateSession, productId).catch(() => null),
        new Promise((resolve) => window.setTimeout(resolve, 1600)),
      ]);
      if (isCancelled) return;

      clearResult();
      setCurrentProductId(productId);
      navigate(`/product/${productId}`, { replace: true });
    };

    loadTaggedProduct();

    return () => {
      isCancelled = true;
    };
  }, [clearResult, getOrCreateSession, navigate, productId, setCurrentProductId]);

  return (
    <main className="relative flex min-h-[calc(100dvh_-_env(safe-area-inset-bottom))] items-center justify-center overflow-hidden bg-white px-[22px]">
      <section className="flex w-[186px] -translate-y-[3px] flex-col items-center">
        <h1 className="font-playfair-semibold text-[24px] leading-[18px] text-black">
          MCM Tap Atelier
        </h1>

        <div className="mt-[34px] flex flex-col items-center">
          <div className="flex gap-[6px]">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="loading-dot size-[5px] rounded-full bg-[#6f6f6f]"
                style={{ animationDelay: `${dot * 160}ms` }}
              />
            ))}
          </div>

          <p className="mt-4 whitespace-nowrap text-center text-[10px] leading-[15px] tracking-[1.8px] text-[#6f6f6f]">
            CONNECTING TO YOUR PIECE
          </p>
          <p className="mt-[6px] whitespace-nowrap text-center text-[12px] leading-[18px] text-[#6f6f6f]">
            제품 정보를 불러오고 있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}

export default NfcLoadingPage;
