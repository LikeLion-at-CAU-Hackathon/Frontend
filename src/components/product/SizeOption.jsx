// 사이즈 선택 버튼
function SizeOption({ size, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(size)}
      className={`font-playfair flex h-[32px] min-w-[39px] items-center justify-center rounded-[16px] border px-[14px] text-[15px] leading-[31.5px] ${
        isSelected
          ? "border-black bg-black text-white"
          : "border-[#bcbab6] bg-transparent text-black"
      }`}
    >
      {size}
    </button>
  );
}

export default SizeOption;
