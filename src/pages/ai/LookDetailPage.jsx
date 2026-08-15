import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import LookDetailContent from "../../components/ai/LookDetailContent";
import backIcon from "../../assets/images/figma/product-detail/icon-back.svg";
import { lookDetailData } from "./styleProfileData";

function LookDetailPage({ lookKey }) {
  const navigate = useNavigate();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const detail = lookDetailData[lookKey];

  if (!detail) return <Navigate to="/ai/style-profile" replace />;

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
        <LookDetailContent
          detail={detail}
          onRequestAdvisor={() => setIsAdvisorOpen(true)}
        />
      </div>

      <AdvisorSheet isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
      </main>
    </div>
  );
}

export default LookDetailPage;
