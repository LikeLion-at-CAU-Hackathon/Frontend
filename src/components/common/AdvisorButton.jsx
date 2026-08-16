import { MessageCircleMore } from "lucide-react";

// 화면 오른쪽 아래에 떠 있는 Advisor 버튼
function AdvisorButton({
  className = "",
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`fixed bottom-[71px] right-[max(16px,calc((100vw_-_440px)/2_+_16px))] z-40 flex h-[38px] w-[96px] items-center justify-center gap-2 rounded-[22px] bg-[#0a0908] font-['DM_Sans'] text-[12px] font-medium leading-[18px] tracking-[0.48px] text-white shadow-[0_4px_8px_rgba(10,9,8,0.22)] ${className}`}
    >
      <MessageCircleMore size={18} strokeWidth={1.8} aria-hidden="true" />
      Advisor
    </button>
  );
}

export default AdvisorButton;
