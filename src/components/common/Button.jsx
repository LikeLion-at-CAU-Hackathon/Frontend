const variants = {
  primary: "bg-[#0a0908] text-white",
  brown: "bg-[#251a0f] text-white",
  outline: "border border-[#e5e0da] bg-[#faf8f5] text-[#0a0908]",
  outlineWhite: "border border-[#ccc6be] bg-white text-[#0a0908]",
  disabled: "bg-[#ececeb] text-[#939393]",
  disabledOutline: "border border-[#ccc6be] bg-[rgba(0,0,0,0.05)] text-[#6f6f6f]",
};

const fonts = {
  pretendard: "",
  playfair: "font-playfair",
};

// 페이지 이동이나 클릭 동작에 같이 쓰는 공통 버튼
function Button({
  children,
  className = "",
  disabled = false,
  font = "pretendard",
  to,
  type = "button",
  variant = "primary",
  ...props
}) {
  const variantName = disabled && variant !== "disabledOutline" ? "disabled" : variant;
  const buttonClassName = `flex h-[50px] w-full items-center justify-center rounded-[3px] text-center text-[13px] font-medium leading-[19.5px] tracking-[0.78px] no-underline ${
    variants[variantName]
  } ${fonts[font]} ${className}`;

  if (to && !disabled) {
    return (
      <a href={to} className={buttonClassName} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={buttonClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
