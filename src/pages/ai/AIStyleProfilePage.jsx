import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import LookRecommendation from "../../components/ai/LookRecommendation";
import StyleKeywords from "../../components/ai/StyleKeywords";
import TodayItems from "../../components/ai/TodayItems";
import { looks, styleKeywords, todayItems } from "./styleProfileData";

function AIStyleProfilePage() {
  const navigate = useNavigate();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  const handleViewDetail = (selectedLook) => {
    navigate(selectedLook.detailPath, {
      state: { look: selectedLook },
    });
  };

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
          현재 관심사를 분석한 결과,
          <br />
          클래식한 무드와 감각적인 디테일을 선호하고 있습니다.
        </p>
        <div className="mt-[10px]">
          <StyleKeywords keywords={styleKeywords} />
        </div>
        <LookRecommendation looks={looks} onViewDetail={handleViewDetail} />
      </section>

      <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
      <AdvisorSheet isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
    </main>
  );
}

export default AIStyleProfilePage;
