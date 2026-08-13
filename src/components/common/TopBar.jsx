import { useNavigate } from "react-router-dom";
import iconBack from "../../assets/images/figma/product-detail/icon-back.svg";

// 뒤로가기와 가운데 제목을 보여주는 상단 바
function TopBar({ backTo = "/product", centerTitle, label = "Product", className = "" }) {
  const navigate = useNavigate();

  return (
    <header
      className={`sticky top-0 z-40 flex h-[52px] items-center border-b border-[#e5e0da] bg-[#faf8f5] px-5 ${className}`}
    >
      <button
        type="button"
        onClick={() => navigate(backTo)}
        className="flex items-center gap-1 py-1 text-[13px] font-normal leading-[19.5px] text-[#6b3f1f]"
      >
        <img src={iconBack} alt="" className="size-5" />
        {label}
      </button>
      {centerTitle && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[14px] font-bold leading-[21px] tracking-[3.92px] text-[#0a0908]">
          {centerTitle}
        </h1>
      )}
    </header>
  );
}

export default TopBar;
