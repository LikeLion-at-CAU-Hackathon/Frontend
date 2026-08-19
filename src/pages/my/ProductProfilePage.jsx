import { useEffect, useRef, useState } from "react";
import { Share2 } from "lucide-react";
import { toPng } from "html-to-image";
import { useNavigate, useParams } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import ErrorMessage from "../../components/common/ErrorMessage";
import ProductProfileCard from "../../components/my/ProductProfileCard";
import ProductProfileShareSheet from "../../components/my/ProductProfileShareSheet";
import { getSavedProductAnalysis } from "../../api/savedProductsApi";
import { createProductProfile } from "../../mocks/productProfiles";
import useSavedProductsStore from "../../stores/useSavedProductsStore";
import { shareProductWithKakao } from "../../utils/kakaoShare";

function ProductProfilePage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const captureRef = useRef(null);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const isRemovingRef = useRef(false);
  const fetchSavedProducts = useSavedProductsStore((state) => state.fetchSavedProducts);
  const removeProduct = useSavedProductsStore((state) => state.removeProduct);
  const savedProduct = useSavedProductsStore((state) =>
    state.savedProducts.find((product) => String(product.id) === String(productId)),
  );
  const profile = createProductProfile(
    savedProduct ? { ...savedProduct, aiAnalysis: analysis } : null,
  );

  useEffect(() => {
    fetchSavedProducts().catch(() => null);
  }, [fetchSavedProducts]);

  useEffect(() => {
    let isCancelled = false;

    getSavedProductAnalysis(productId)
      .then((result) => {
        if (!isCancelled) setAnalysis(result);
      })
      .catch((error) => console.error("Failed to fetch saved product analysis", error));

    return () => {
      isCancelled = true;
    };
  }, [productId]);

  const handleUnsaveProduct = async () => {
    if (!profile || isRemovingRef.current) return;

    isRemovingRef.current = true;
    try {
      await removeProduct(profile.id);
      navigate("/my");
    } catch (error) {
      console.error("Failed to remove saved product", error);
      isRemovingRef.current = false;
    }
  };

  const handleShareSelect = async (action) => {
    setShareStatus("");
    try {
      if (action === "copy") {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("링크를 복사했습니다.");
        return;
      }

      if (action === "kakao") {
        await shareProductWithKakao(profile);
        setShareStatus("카카오톡 공유 창을 열었습니다.");
        return;
      }

      if (action === "image" && captureRef.current) {
        const dataUrl = await toPng(captureRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "#fffdfb",
        });
        const link = document.createElement("a");
        link.download = `mcm-${productId}-profile.png`;
        link.href = dataUrl;
        link.click();
        setShareStatus("이미지를 저장했습니다.");
      }
    } catch (error) {
      setShareStatus(error instanceof Error ? error.message : "공유를 완료하지 못했습니다.");
    }
  };

  return (
    <main className="relative min-h-[calc(100dvh-62px)] bg-[rgba(237,233,226,0.62)] pb-6 text-[#0a0908]">
      <header className="relative bg-white px-[22px] pb-3 pt-[18px]">
        <p className="text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#6b3f1f]">
          My Selection
        </p>
        <h1 className="pt-[10px] text-[22px] font-medium leading-[33px]">저장한 제품</h1>
      </header>

      {profile ? (
        <>
          <div className="pt-[18px]">
            <ProductProfileCard
              profile={profile}
              captureRef={captureRef}
              onUnsave={handleUnsaveProduct}
            />
          </div>
          <div className="px-5 pb-16 pt-4">
            <button
              type="button"
              onClick={() => {
                setShareStatus("");
                setIsShareOpen(true);
              }}
              className="flex h-[52px] w-full items-center justify-center gap-[6px] rounded-[12px] bg-[#2a241a] font-['DM_Sans'] text-[12px] font-medium leading-[18px] tracking-[0.48px] text-[#fbf9f5]"
            >
              <Share2 size={12} strokeWidth={1.5} aria-hidden="true" />
              결과 공유
            </button>
            <button
              type="button"
              onClick={() => navigate("/my")}
              className="mt-[10px] flex h-[52px] w-full items-center justify-center rounded-[12px] bg-[rgba(42,36,26,0.2)] font-['DM_Sans'] text-[12px] font-medium leading-[18px] tracking-[0.48px] text-[#2a241a]"
            >
              돌아가기
            </button>
          </div>
          <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
          <AdvisorSheet
            isOpen={isAdvisorOpen}
            onClose={() => setIsAdvisorOpen(false)}
            product={profile}
          />
          <ProductProfileShareSheet
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            onSelect={handleShareSelect}
            status={shareStatus}
          />
        </>
      ) : (
        <div className="px-1 pt-24">
          <ErrorMessage
            title="저장한 정보를 불러오지 못했습니다"
            description="잠시 후 다시 시도해 주세요."
            buttonText="저장한 제품으로 돌아가기"
            onConfirm={() => navigate("/my")}
          />
        </div>
      )}
    </main>
  );
}

export default ProductProfilePage;
