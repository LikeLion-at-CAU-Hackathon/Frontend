import advisorPersonIcon from "../../assets/images/figma/product-detail/advisor-person.svg";

// 화면 오른쪽 아래에 떠 있는 Advisor 버튼
function AdvisorButton({ className = "" }) {
  return (
    <button
      type="button"
      className={`fixed bottom-[71px] right-[max(16px,calc((100vw_-_393px)/2_+_16px))] z-40 flex h-[37px] w-[91px] items-center justify-center gap-[6px] rounded-[22px] bg-[#0a0908] font-['DM_Sans'] text-[12px] font-medium leading-[18px] tracking-[0.48px] text-white shadow-[0_4px_8px_rgba(10,9,8,0.22)] ${className}`}
    >
      <img src={advisorPersonIcon} alt="" className="size-4" />
      Advisor
    </button>
  );
}

export default AdvisorButton;
