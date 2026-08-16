import { useEffect } from "react";
import { Download, Link, MessageCircle } from "lucide-react";

const shareOptions = [
  { key: "copy", label: "링크 복사", Icon: Link },
  { key: "kakao", label: "카카오톡", Icon: MessageCircle },
  { key: "image", label: "이미지로 저장", Icon: Download },
];

function ProductProfileShareSheet({ isOpen, onClose, onSelect, status }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-y-0 left-1/2 z-[70] w-full max-w-[440px] -translate-x-1/2 bg-[rgba(10,9,8,0.42)]"
      role="presentation"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="결과 공유"
        className="absolute bottom-0 w-full animate-[share-sheet-up_220ms_ease-out] rounded-t-[18px] bg-[#fffdfb] px-5 pb-[calc(18px+env(safe-area-inset-bottom))] pt-3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto h-1 w-9 rounded-full bg-[#d9d4ce]" />
        <h2 className="pb-3 pt-4 text-center text-[16px] font-semibold text-[#0a0908]">
          결과 공유
        </h2>
        <div className="overflow-hidden rounded-[12px] border border-[#e5e0da] bg-white">
          {shareOptions.map(({ key, label, Icon }, index) => (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={`flex h-14 w-full items-center gap-3 px-5 text-[14px] text-[#0a0908] ${
                index ? "border-t border-[#e5e0da]" : ""
              }`}
            >
              <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
        {status && (
          <p className="pt-3 text-center text-[12px] leading-[18px] text-[#6b3f1f]" role="status">
            {status}
          </p>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-3 h-12 w-full rounded-[12px] bg-[#ede8e2] text-[14px] font-medium text-[#0a0908]"
        >
          취소
        </button>
      </section>
    </div>
  );
}

export default ProductProfileShareSheet;

