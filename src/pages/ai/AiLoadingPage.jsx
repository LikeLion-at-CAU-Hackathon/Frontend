import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import mcmLoadingLogo from "../../assets/images/figma/ai/mcm-loading-logo.png";
import {
  analyzeRecommendationSession,
  getRecommendationHistory,
  getRecommendationResult,
} from "../../api/recommendationApi";
import useRecommendationStore from "../../stores/useRecommendationStore";

const ANALYSIS_PROGRESS_DURATION_MS = 180000;
const MAX_PENDING_PROGRESS = 96;
const PROGRESS_TICK_MS = 250;
const MESSAGE_STEP_INTERVAL_MS = 1800;

const messages = [
  "오늘 태그 및 저장한 제품 확인 중",
  "제품의 공통 컬러, 스타일 분석 중",
  "스타일 성향을 정리하고 있어요",
  "스타일 분석에는 약 2~3분 정도 소요됩니다.",
];

const analysisRequests = new Map();

const runAnalysis = () => {
  const requestKey = "browser-session";

  if (!analysisRequests.has(requestKey)) {
    analysisRequests.set(
      requestKey,
      getRecommendationHistory()
        .then((history) => {
          if (!history.length) throw new Error("최근 탐색 제품이 없습니다.");
          return analyzeRecommendationSession();
        })
        .then(() => getRecommendationResult())
        .finally(() => analysisRequests.delete(requestKey)),
    );
  }

  return analysisRequests.get(requestKey);
};

function AiLoadingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const setResult = useRecommendationStore((state) => state.setResult);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsedTime = Date.now() - startedAt;
      const nextProgress = Math.min(
        MAX_PENDING_PROGRESS,
        Math.floor((elapsedTime / ANALYSIS_PROGRESS_DURATION_MS) * MAX_PENDING_PROGRESS),
      );

      setProgress(nextProgress);
    }, PROGRESS_TICK_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((currentStep) => (currentStep + 1) % messages.length);
    }, MESSAGE_STEP_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const analyze = async () => {
      try {
        const [result] = await Promise.all([
          runAnalysis(),
          new Promise((resolve) => window.setTimeout(resolve, 3900)),
        ]);

        if (!result) throw new Error("AI 스타일 분석 결과가 없습니다.");
        if (isCancelled) return;

        setProgress(100);
        setStep(messages.length - 1);
        setResult(result);
        await new Promise((resolve) => window.setTimeout(resolve, 450));
        if (isCancelled) return;

        navigate("/ai/style-profile", { replace: true });
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error?.response?.data?.message ?? error?.message ?? "AI 스타일 분석에 실패했습니다.",
          );
        }
      }
    };

    analyze();

    return () => {
      isCancelled = true;
    };
  }, [navigate, setResult]);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#faf8f5] text-[#1a1208]">
      <section
        className="absolute left-1/2 top-[233px] flex w-[250px] -translate-x-1/2 flex-col items-center"
        aria-live="polite"
        aria-label={`스타일 분석 ${progress}% 완료`}
      >
        <img
          src={mcmLoadingLogo}
          alt="MCM"
          className="size-[137px] object-cover"
        />

        <div
          className="mt-6 h-[6px] w-[185px] overflow-hidden rounded-full bg-[#d9d9d9]"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-[#6b3f1f] transition-[width] duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6 flex w-[152px] flex-col items-center gap-3">
          {messages.map((message, index) => {
            const isActive = index === step;

            return (
              <p
                key={message}
                className={`whitespace-nowrap text-center text-[11px] font-normal leading-[16.5px] transition-colors duration-500 ${
                  isActive
                    ? "text-[#1a1208]"
                    : "text-[#8b7355]/30"
                }`}
              >
                {message}
              </p>
            );
          })}
          {errorMessage && (
            <p className="mt-2 w-[240px] text-center text-[11px] leading-[16.5px] text-[#8a3d2f]">
              {errorMessage}
            </p>
          )}
        </div>
      </section>

      <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
      <AdvisorSheet isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
    </main>
  );
}

export default AiLoadingPage;
