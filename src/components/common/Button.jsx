import { Link } from "react-router-dom";

const variants = {
  primary: "bg-[#0a0908] text-white",
  outline: "border border-[#e5e0da] bg-[#faf8f5] text-[#0a0908]",
  disabled: "bg-[#ececeb] text-[#939393]",
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
  const buttonClassName = `flex h-[50px] w-full items-center justify-center rounded-[3px] text-center text-[13px] font-medium leading-[19.5px] tracking-[0.78px] no-underline ${
    disabled ? variants.disabled : variants[variant]
  } ${fonts[font]} ${className}`;

  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={buttonClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
