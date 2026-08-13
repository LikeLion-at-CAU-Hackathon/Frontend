import ErrorMessage from "./ErrorMessage";

// 화면 위에 어두운 배경과 같이 띄우는 공통 오류 모달
function ErrorModal({ isOpen, onClose, title, description, buttonText }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-y-0 left-1/2 z-[70] flex w-full max-w-[393px] -translate-x-1/2 items-center justify-center bg-[rgba(10,9,8,0.42)]"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()}>
        <ErrorMessage
          title={title}
          description={description}
          buttonText={buttonText}
          onConfirm={onClose}
        />
      </div>
    </div>
  );
}

export default ErrorModal;
