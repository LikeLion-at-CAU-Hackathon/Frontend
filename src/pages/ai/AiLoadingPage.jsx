import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import mcmLoadingLogo from "../../assets/images/figma/ai/mcm-loading-logo.png";

const loadingSteps = [
  { progress: 28, duration: 1300 },
  { progress: 52, duration: 1500 },
  { progress: 100, duration: 0 },
];

const messages = [
  "오늘 태그 및 저장한 제품 확인 중",
  "제품의 공통 컬러, 스타일 분석 중",
  "스타일 성향을 정리하고 있어요",
];

function AiLoadingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  useEffect(() => {
    if (step >= loadingSteps.length - 1) {
      const completionTimer = window.setTimeout(() => navigate("/ai/style-profile"), 1100);
      return () => window.clearTimeout(completionTimer);
    }

    const timer = window.setTimeout(
      () => setStep((currentStep) => currentStep + 1),
      loadingSteps[step].duration,
    );

    return () => window.clearTimeout(timer);
  }, [navigate, step]);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#faf8f5] text-[#1a1208]">
      <section
        className="absolute left-1/2 top-[233px] flex w-[250px] -translate-x-1/2 flex-col items-center"
        aria-live="polite"
        aria-label={`스타일 분석 ${loadingSteps[step].progress}% 완료`}
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
          aria-valuenow={loadingSteps[step].progress}
        >
          <div
            className="h-full rounded-full bg-[#6b3f1f] transition-[width] duration-700 ease-out"
            style={{ width: `${loadingSteps[step].progress}%` }}
          />
        </div>

        <div className="mt-6 flex w-[152px] flex-col items-center gap-3">
          {messages.map((message, index) => {
            const isComplete = index <= step;
            const isNext = index === step + 1;

            return (
              <p
                key={message}
                className={`whitespace-nowrap text-center text-[11px] font-normal leading-[16.5px] transition-colors duration-500 ${
                  isComplete
                    ? "text-[#1a1208]"
                    : isNext
                      ? "text-[#8b7355]"
                      : "text-[#8b7355]/30"
                }`}
              >
                {message}
              </p>
            );
          })}
        </div>
      </section>

      <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
      <AdvisorSheet isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
    </main>
  );
}

export default AiLoadingPage;
