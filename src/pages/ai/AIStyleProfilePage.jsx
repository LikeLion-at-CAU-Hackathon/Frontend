import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import LookRecommendation from "../../components/ai/LookRecommendation";
import StyleKeywords from "../../components/ai/StyleKeywords";
import TodayItems from "../../components/ai/TodayItems";
import { getRecommendationResult } from "../../api/recommendationApi";
import useRecommendationStore from "../../stores/useRecommendationStore";

const getLatestTodayItem = (items) => {
  if (!items.length) return null;

  const sortedItems = [...items].sort(
    (first, second) => (Number(first.sequence) || 0) - (Number(second.sequence) || 0),
  );

  return sortedItems[sortedItems.length - 1] ?? items[items.length - 1];
};

function AIStyleProfilePage() {
  const navigate = useNavigate();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const result = useRecommendationStore((state) => state.result);
  const setResult = useRecommendationStore((state) => state.setResult);

  useEffect(() => {
    if (result) return undefined;

    let isCancelled = false;
    getRecommendationResult()
      .then((nextResult) => {
        if (!nextResult) throw new Error("AI 스타일 분석 결과가 없습니다.");
        if (!isCancelled) setResult(nextResult);
      })
      .catch((error) => {
        if (!isCancelled) {
          setErrorMessage(
            error?.response?.data?.message ?? error?.message ?? "AI 스타일 프로필을 불러오지 못했습니다.",
          );
        }
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [result, setResult]);

  const handleViewDetail = (selectedLook) => {
    navigate(`/ai/style-recommendation/${selectedLook.id}`);
  };

  const todayItems = result?.todayItems ?? [];
  const advisorProduct = getLatestTodayItem(todayItems);
  const styleKeywords = result?.keywords ?? [];
  const looks = result?.looks ?? [];

  return (
    <main className="min-h-full bg-[#faf8f4] text-[#0a0908]">
      <header className="flex items-end justify-between px-[25px] pb-[11px] pt-[46px]">
        <h1 className="font-playfair text-[20px] font-medium leading-[30px]">AI STYLE PROFILE</h1>
        <button type="button" aria-label="스타일 프로필 저장" className="p-1">
        </button>
      </header>

      <div className="px-5">
        <TodayItems items={todayItems} />
      </div>

      <section className="mt-[34px] bg-[#ede8e2] px-[25px] pb-6 pt-[14px] shadow-[0_100px_0_#ede8e2]">
        <p className="font-playfair text-[12px] leading-[18px] text-black">
          {result?.summary}
        </p>
        {isLoading && !result && (
          <p className="mt-4 text-[12px] text-[#8a8078]">스타일 프로필을 불러오고 있습니다.</p>
        )}
        {(errorMessage || (!isLoading && !result)) && (
          <p className="mt-4 text-[12px] text-[#8a3d2f]">
            {errorMessage || "먼저 AI 스타일 분석을 진행해 주세요."}
          </p>
        )}
        {result && (
          <>
            <div className="mt-[10px]">
              <StyleKeywords keywords={styleKeywords} />
            </div>
            <LookRecommendation looks={looks} onViewDetail={handleViewDetail} />
          </>
        )}
      </section>

      <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
      <AdvisorSheet
        isOpen={isAdvisorOpen}
        product={advisorProduct}
        onClose={() => setIsAdvisorOpen(false)}
      />
    </main>
  );
}

export default AIStyleProfilePage;
