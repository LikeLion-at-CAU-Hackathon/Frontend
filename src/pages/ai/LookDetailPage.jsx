import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import LookDetailContent from "../../components/ai/LookDetailContent";
import backIcon from "../../assets/images/figma/product-detail/icon-back.svg";
import { getRecommendationLookDetail } from "../../api/recommendationApi";

function LookDetailPage() {
  const navigate = useNavigate();
  const { lookId } = useParams();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isCancelled = false;

    queueMicrotask(() => {
      if (!isCancelled) {
        setIsLoading(true);
        setErrorMessage("");
        setDetail(null);
      }
    });

    getRecommendationLookDetail(lookId)
      .then((nextDetail) => {
        if (!nextDetail) throw new Error("선택한 Look 정보를 찾을 수 없습니다.");
        if (!isCancelled) setDetail(nextDetail);
      })
      .catch((error) => {
        if (!isCancelled) {
          setErrorMessage(
            error?.response?.data?.message ?? error?.message ?? "Look 정보를 불러오지 못했습니다.",
          );
        }
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [lookId]);

  return (
    <div className="min-h-full bg-white">
      <div className="h-[50px] bg-white" aria-hidden="true" />
      <main className="bg-[rgba(232,230,226,0.6)] px-[23px] pb-6 text-[#0a0908]">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="AI Style Profile로 돌아가기"
        className="flex size-8 items-center justify-start"
      >
        <img src={backIcon} alt="" className="size-5" />
      </button>

      <div className="mt-[10px]">
        {isLoading && <p className="py-10 text-center text-[12px] text-[#8a8078]">Look 정보를 불러오고 있습니다.</p>}
        {errorMessage && <p className="py-10 text-center text-[12px] text-[#8a3d2f]">{errorMessage}</p>}
        {detail && (
          <LookDetailContent
            detail={detail}
            onRequestAdvisor={() => setIsAdvisorOpen(true)}
          />
        )}
      </div>

      <AdvisorSheet isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
      </main>
    </div>
  );
}

export default LookDetailPage;
