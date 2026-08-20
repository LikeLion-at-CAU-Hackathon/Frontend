import { useEffect, useRef, useState } from "react";
import advisorCheckIcon from "../../assets/images/figma/product-detail/advisor-check.svg";
import { DEFAULT_PRODUCT_ID, getMockProductById } from "../../mocks/products";
import useAppStore from "../../stores/useAppStore";
import Button from "./Button";

const options = ["다른 옵션", "착용 상담", "스타일링", "기타"];
// Advisor 버튼을 눌렀을 때 뜨는 상담 요청창
const SWIPE_CLOSE_DISTANCE = 72;
const SHEET_CLOSE_ANIMATION_MS = 180;
const DRAG_START_DISTANCE = 10;

function AdvisorSheet({
  isOpen,
  onClose,
  product,
  initialSubmitted = false,
  initialRequest = "재고 문의",
}) {
  const currentProductId = useAppStore((state) => state.currentProductId);
  const [selectedOption, setSelectedOption] = useState("");
  const [requestText, setRequestText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const overlayRef = useRef(null);
  const sheetRef = useRef(null);
  const submittedScrollRef = useRef(null);
  const closeTimerRef = useRef(null);
  const currentDragOffsetRef = useRef(0);
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    isDragging: false,
    hasMoved: false,
  });
  const touchDragStateRef = useRef({
    startX: 0,
    startY: 0,
    startScrollTop: 0,
    isDragging: false,
    hasMoved: false,
  });
  const displayProduct = product ?? getMockProductById(currentProductId ?? DEFAULT_PRODUCT_ID);

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    const previousBodyPosition = bodyStyle.position;
    const previousBodyTop = bodyStyle.top;
    const previousBodyWidth = bodyStyle.width;
    const previousBodyOverflow = bodyStyle.overflow;
    const previousBodyOverscrollBehavior = bodyStyle.overscrollBehavior;
    const previousHtmlOverflow = htmlStyle.overflow;
    const previousHtmlOverscrollBehavior = htmlStyle.overscrollBehavior;

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    bodyStyle.overscrollBehavior = "none";
    htmlStyle.overflow = "hidden";
    htmlStyle.overscrollBehavior = "none";

    const preventBackgroundTouchMove = (event) => {
      if (!overlayRef.current?.contains(event.target)) return;
      if (sheetRef.current?.contains(event.target)) return;
      event.preventDefault();
    };

    document.addEventListener("touchmove", preventBackgroundTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventBackgroundTouchMove);
      bodyStyle.position = previousBodyPosition;
      bodyStyle.top = previousBodyTop;
      bodyStyle.width = previousBodyWidth;
      bodyStyle.overflow = previousBodyOverflow;
      bodyStyle.overscrollBehavior = previousBodyOverscrollBehavior;
      htmlStyle.overflow = previousHtmlOverflow;
      htmlStyle.overscrollBehavior = previousHtmlOverscrollBehavior;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const hasSubmitted = initialSubmitted || isSubmitted;
  const submittedRequest = initialSubmitted
    ? initialRequest
    : requestText.trim() && (!selectedOption || selectedOption === "기타")
      ? requestText.trim()
      : selectedOption || requestText.trim() || "재고 문의";

  const handleClose = () => {
    if (isClosing) return;

    window.clearTimeout(closeTimerRef.current);
    setIsClosing(true);
    setDragOffset(window.innerHeight);

    closeTimerRef.current = window.setTimeout(() => {
      setSelectedOption("");
      setRequestText("");
      setIsSubmitted(false);
      setDragOffset(0);
      currentDragOffsetRef.current = 0;
      setIsClosing(false);
      onClose();
    }, SHEET_CLOSE_ANIMATION_MS);
  };

  const handlePointerDown = (event) => {
    if (!event.isPrimary) return;
    if (event.pointerType === "touch") return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      isDragging: true,
      hasMoved: false,
    };
  };

  const getSubmittedScrollTop = () => submittedScrollRef.current?.scrollTop ?? 0;

  const handlePointerMove = (event) => {
    const dragState = dragStateRef.current;
    if (event.pointerType === "touch") return;
    if (!dragState.isDragging || dragState.pointerId !== event.pointerId || isClosing) return;

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) || deltaY <= 0) {
      setDragOffset(0);
      currentDragOffsetRef.current = 0;
      return;
    }

    if (hasSubmitted && getSubmittedScrollTop() > 0) {
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
    if (isClosing) return;
    if (event.pointerType === "touch") return;

    if (dragStateRef.current.hasMoved) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }

    if (currentDragOffsetRef.current >= SWIPE_CLOSE_DISTANCE) {
      handleClose();
    } else {
      setDragOffset(0);
      currentDragOffsetRef.current = 0;
    }

    dragStateRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      isDragging: false,
      hasMoved: false,
    };
  };

  const resetTouchDragState = () => {
    touchDragStateRef.current = {
      startX: 0,
      startY: 0,
      startScrollTop: 0,
      isDragging: false,
      hasMoved: false,
    };
  };

  const handleTouchStart = (event) => {
    if (isClosing || event.touches.length !== 1) return;

    const touch = event.touches[0];
    touchDragStateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startScrollTop: hasSubmitted ? getSubmittedScrollTop() : 0,
      isDragging: true,
      hasMoved: false,
    };
  };

  const handleTouchMove = (event) => {
    const dragState = touchDragStateRef.current;
    if (!dragState.isDragging || isClosing || event.touches.length !== 1) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - dragState.startX;
    const deltaY = touch.clientY - dragState.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) || deltaY <= 0) {
      return;
    }

    const sheetScrollTop = hasSubmitted ? getSubmittedScrollTop() : 0;
    const canDragSheet = !hasSubmitted || (dragState.startScrollTop <= 0 && sheetScrollTop <= 0);

    if (!canDragSheet) {
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

    if (touchDragStateRef.current.hasMoved && currentDragOffsetRef.current >= SWIPE_CLOSE_DISTANCE) {
      handleClose();
    } else {
      setDragOffset(0);
      currentDragOffsetRef.current = 0;
    }

    resetTouchDragState();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-y-0 left-1/2 z-[60] w-full max-w-[440px] -translate-x-1/2 bg-[rgba(10,9,8,0.42)] backdrop-blur-[2px]"
      style={{ overscrollBehavior: "contain" }}
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <section
        ref={sheetRef}
        className={`absolute bottom-0 left-0 w-full rounded-t-[16px] bg-[#fcfbf9] ${
          hasSubmitted ? "flex max-h-[calc(100dvh-84px)] flex-col overflow-hidden" : "min-h-[467px]"
        }`}
        style={{
          overscrollBehavior: "contain",
          touchAction: hasSubmitted ? "pan-y" : "none",
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
        <div className="flex justify-center pt-3">
          <span className="h-1 w-9 rounded-[2px] bg-[#e5e0da]" />
        </div>

        {hasSubmitted ? (
          <div
            ref={submittedScrollRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            style={{
              WebkitOverflowScrolling: dragOffset ? "auto" : "touch",
              touchAction: "pan-y",
            }}
          >
            <SubmittedContent onClose={handleClose} selectedOption={submittedRequest} />
          </div>
        ) : (
          <RequestContent
            product={displayProduct}
            requestText={requestText}
            selectedOption={selectedOption}
            onRequestTextChange={setRequestText}
            onSelect={setSelectedOption}
            onSubmit={() => setIsSubmitted(true)}
          />
        )}
      </section>
    </div>
  );
}

function RequestContent({
  product,
  requestText,
  selectedOption,
  onRequestTextChange,
  onSelect,
  onSubmit,
}) {
  return (
    <div className="px-5 pb-7 pt-4">
      <p className="ml-2 text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#251a0f]">
        ADVISOR
      </p>
      <h2 className="ml-2 mt-[7px] text-[22px] font-medium leading-[31.5px] text-[#0a0908]">
        어드바이저 상담 요청
      </h2>

      <div className="mt-[18px] flex h-[66px] items-center overflow-hidden rounded-[3px]">
        <div className="h-[55px] w-[66px] shrink-0 overflow-hidden rounded-[5px] bg-[#d9d9d9]">
          {product?.image && (
            <img
              src={product.image}
              alt=""
              className="size-full scale-[1.3] rounded-[5px] object-contain"
            />
          )}
        </div>
        <div className="ml-[13px] min-w-0">
          <p className="font-playfair truncate text-[20px] leading-[31.5px] text-black">
            {product?.name ?? "제품"}
          </p>
          <p className="truncate text-[15px] leading-[31.5px] text-[#251a0f]">
            이 제품에 대한 정보가 함께 전달됩니다
          </p>
        </div>
      </div>

      <div className="mt-[14px] h-px bg-[#e5e0da]" />

      <div className="mt-[30px]">
        <p className="text-[15px] font-medium leading-[31.5px] text-black">
          어떤 도움이 필요하신가요?
        </p>
        <div className="mt-[8.5px] mb-[15px] grid grid-cols-4 gap-[7px]">
          {options.map((option) => {
            const isSelected = selectedOption === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`flex h-10 w-full min-w-0 items-center justify-center rounded-[5px] border-[1.5px] px-[4px] text-[13px] leading-[18px] whitespace-nowrap text-black ${
                  isSelected
                    ? "border-[#a88f78] bg-[#e6dac9]"
                    : "border-[#bcbab6] bg-transparent"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <label className="mt-[7px] flex h-[57px] items-center rounded-[5px] border border-[#e8e6e2] px-[10px]">
        <span className="sr-only">추가 요청사항</span>
        <input
          type="text"
          value={requestText}
          onChange={(event) => onRequestTextChange(event.target.value)}
          className="w-full bg-transparent text-[15px] leading-[31.5px] text-[#0a0908] outline-none placeholder:text-[#bcbab6]"
          placeholder="추가 요청사항을 입력해주세요. (선택)"
        />
      </label>

      <Button
        variant="brown"
        onClick={onSubmit}
        className="mt-[26px] h-[67px] rounded-[5px] text-[15px] font-bold leading-[31.5px] tracking-[0px]"
      >
        바로 요청하기
      </Button>
    </div>
  );
}

function SubmittedContent({ onClose, selectedOption }) {
  return (
    <div className="px-6 pb-7 pt-9">
      <div className="flex justify-center pt-2">
        <div className="flex size-11 items-center justify-center rounded-full border border-[#e5e0da] bg-[#f2efeb]">
          <img src={advisorCheckIcon} alt="" className="size-5" />
        </div>
      </div>

      <h2 className="mt-[14px] text-center text-[20px] font-medium leading-[30px] text-[#0a0908]">
        상담 요청이 접수되었습니다
      </h2>

      <div className="mt-[17px] h-px bg-[#e5e0da]" />

      <section className="pt-[16px] text-center">
        <p className="font-playfair text-[16px] leading-[31.5px] text-black">
          REQUEST NO.
        </p>
        <p className="font-playfair mt-[10px] text-[96px] leading-[96px] text-black">
          17
        </p>
        <p className="mt-[30px] whitespace-pre-line text-[16px] leading-[31.5px] text-black">
          가까이 있는 어드바이저에게{"\n"}번호를 보여주세요
        </p>
      </section>

      <section className="mt-[22px] rounded-[3px] border border-[#e5e0da] bg-[#fafaf8] p-[17px]">
        <p className="text-[10px] leading-[15px] tracking-[1.4px] text-[#8a8078]">
          방문 안내
        </p>
        <p className="mt-2 text-[14px] font-semibold leading-[21px] text-[#0a0908]">
          MCM 신세계면세점 본점
        </p>
      </section>

      <section className="rounded-[3px] border-x border-b border-[#e5e0da] bg-white px-[15px] py-[13px]">
        <p className="text-[10px] font-medium leading-[15px] tracking-[1.6px] text-[#8a8078]">
          전달된 요청
        </p>
        <p className="mt-[10px] text-[13px] font-medium leading-[19.5px] text-[#0a0908]">
          {selectedOption}
        </p>
      </section>

      <Button onClick={onClose} className="mt-10 h-[50px]">
        확인
      </Button>
    </div>
  );
}

export default AdvisorSheet;
