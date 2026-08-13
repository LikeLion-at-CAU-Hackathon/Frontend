import errorWarningIcon from "../../assets/images/figma/common/error-warning.svg";

// 문제가 생겼을 때 보여주는 공통 오류 박스
function ErrorMessage({
  title = "잠시 문제가 발생했습니다",
  description = "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  buttonText = "확인",
  onConfirm,
}) {
  return (
    <section className="relative mx-auto h-[203px] w-[384px] max-w-full">
      <div className="absolute inset-[10px] rounded-[30px] bg-[#f6eee2]" />

      <img
        src={errorWarningIcon}
        alt=""
        className="absolute left-1/2 top-[34px] size-9 -translate-x-1/2"
      />

      <h2 className="absolute left-1/2 top-[76px] w-[330px] -translate-x-1/2 text-center text-[14px] font-medium leading-5 text-[#202020]">
        {title}
      </h2>
      <p className="absolute left-1/2 top-[106px] w-[330px] -translate-x-1/2 whitespace-nowrap text-center text-[12px] leading-5 text-[#382717]">
        {description}
      </p>

      <button
        type="button"
        onClick={onConfirm}
        className="absolute left-1/2 top-[142px] flex h-8 w-[257px] -translate-x-1/2 items-center justify-center rounded-[24px] bg-black text-center text-[13px] font-medium leading-[19.5px] tracking-[0.78px] text-white"
      >
        {buttonText}
      </button>
    </section>
  );
}

export default ErrorMessage;
