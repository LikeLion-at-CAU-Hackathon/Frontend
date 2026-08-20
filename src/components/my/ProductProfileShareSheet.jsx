import { useEffect, useRef, useState } from "react";
import { Download, Link, MessageCircle } from "lucide-react";

const SWIPE_CLOSE_DISTANCE = 72;
const SHEET_CLOSE_ANIMATION_MS = 180;
const DRAG_START_DISTANCE = 10;

const shareOptions = [
  { key: "copy", label: "링크 복사", Icon: Link },
  { key: "kakao", label: "카카오톡", Icon: MessageCircle },
  { key: "image", label: "이미지로 저장", Icon: Download },
];

function ProductProfileShareSheet({ isOpen, onClose, onSelect, isBusy = false, status }) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef(null);
  const currentDragOffsetRef = useRef(0);
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    isDragging: false,
    hasMoved: false,
  });

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const resetDragState = () => {
    currentDragOffsetRef.current = 0;
    dragStateRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      isDragging: false,
      hasMoved: false,
    };
  };

  const handleClose = () => {
    if (isClosing) return;

    window.clearTimeout(closeTimerRef.current);
    setIsClosing(true);
    setDragOffset(window.innerHeight);

    closeTimerRef.current = window.setTimeout(() => {
      setDragOffset(0);
      resetDragState();
      setIsClosing(false);
      onClose();
    }, SHEET_CLOSE_ANIMATION_MS);
  };

  const handlePointerDown = (event) => {
    if (!event.isPrimary || event.pointerType === "touch") return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      isDragging: true,
      hasMoved: false,
    };
  };

  const handlePointerMove = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState.isDragging || dragState.pointerId !== event.pointerId || isClosing) return;

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) || deltaY <= 0) {
      return;
    }

    if (!dragState.hasMoved && deltaY < DRAG_START_DISTANCE) {
      return;
    }

    if (!dragState.hasMoved) {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }

    event.preventDefault();
    dragState.hasMoved = true;

    const nextOffset = Math.min(deltaY, window.innerHeight * 0.6);
    currentDragOffsetRef.current = nextOffset;
    setDragOffset(nextOffset);
  };

  const handlePointerEnd = (event) => {
    if (isClosing || event.pointerType === "touch") return;

    if (dragStateRef.current.hasMoved) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }

    if (currentDragOffsetRef.current >= SWIPE_CLOSE_DISTANCE) {
      handleClose();
    } else {
      setDragOffset(0);
      resetDragState();
    }
  };

  const handleTouchStart = (event) => {
    if (isClosing || event.touches.length !== 1) return;

    const touch = event.touches[0];
    dragStateRef.current = {
      pointerId: null,
      startX: touch.clientX,
      startY: touch.clientY,
      isDragging: true,
      hasMoved: false,
    };
  };

  const handleTouchMove = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState.isDragging || isClosing || event.touches.length !== 1) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - dragState.startX;
    const deltaY = touch.clientY - dragState.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) || deltaY <= 0) {
      return;
    }

    event.preventDefault();

    if (!dragState.hasMoved && deltaY < DRAG_START_DISTANCE) {
      return;
    }

    dragState.hasMoved = true;

    const nextOffset = Math.min(deltaY, window.innerHeight * 0.6);
    currentDragOffsetRef.current = nextOffset;
    setDragOffset(nextOffset);
  };

  const handleTouchEnd = () => {
    if (isClosing) return;

    if (dragStateRef.current.hasMoved && currentDragOffsetRef.current >= SWIPE_CLOSE_DISTANCE) {
      handleClose();
    } else {
      setDragOffset(0);
      resetDragState();
    }
  };

  return (
    <div
      className="fixed inset-y-0 left-1/2 z-[70] w-full max-w-[440px] -translate-x-1/2 bg-[rgba(10,9,8,0.42)]"
      role="presentation"
      onClick={handleClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="결과 공유"
        className="absolute bottom-0 w-full animate-[share-sheet-up_220ms_ease-out] rounded-t-[18px] bg-[#fffdfb] px-5 pb-[calc(18px+env(safe-area-inset-bottom))] pt-3"
        style={{
          touchAction: "none",
          transform: dragOffset ? `translateY(${dragOffset}px)` : undefined,
          transition: dragOffset && !isClosing ? undefined : "transform 180ms ease-out",
          userSelect: dragOffset ? "none" : undefined,
        }}
        onClick={(event) => event.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
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
              onClick={() => {
                if (!isBusy) onSelect(key);
              }}
              disabled={isBusy}
              className={`flex h-14 w-full items-center gap-3 px-5 text-[14px] text-[#0a0908] disabled:cursor-wait disabled:opacity-55 ${
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
          onClick={handleClose}
          className="mt-3 h-12 w-full rounded-[12px] bg-[#ede8e2] text-[14px] font-medium text-[#0a0908]"
        >
          취소
        </button>
      </section>
    </div>
  );
}

export default ProductProfileShareSheet;

