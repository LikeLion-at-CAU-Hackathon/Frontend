// 제품 상세 화면에서 다른 기능으로 이동하는 버튼
function ActionButton({ title, description, to, disabled = false }) {
  const className = `relative flex h-[68px] w-[146px] shrink-0 flex-col items-start justify-center gap-2 rounded-[14px] px-4 py-[5.6px] text-left no-underline ${
    disabled ? "bg-[#e8e6e2]" : "bg-[rgba(206,173,135,0.14)]"
  }`;

  const content = (
    <>
      <span
        className={`text-[13px] font-medium leading-[11.55px] ${
          disabled ? "text-[#bcbab6]" : "text-black"
        }`}
      >
        {title}
      </span>
      <span
        className={`text-[11px] font-normal leading-[11.55px] ${
          disabled ? "text-[#bcbab6]" : "text-[#6f6f6f]"
        }`}
      >
        {description}
      </span>
      <span className="absolute right-[11px] top-[18px] text-[18px] leading-[27px] text-[#b0a89a]">
        ›
      </span>
    </>
  );

  if (disabled) {
    return (
      <button type="button" disabled className={className}>
        {content}
      </button>
    );
  }

  return (
    <a href={to} className={className}>
      {content}
    </a>
  );
}

export default ActionButton;
