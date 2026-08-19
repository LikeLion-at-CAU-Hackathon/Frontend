import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import LookProductList from "./LookProductList";

function LookCard({ index, look, onViewDetail }) {
  return (
    <article className="relative h-[395px] min-w-full basis-full flex-none snap-center overflow-hidden rounded-[12px]">
      {look.image ? (
        <img src={look.image} alt={look.name} className="absolute inset-0 size-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-[#d8d1ca]" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

      <div className="absolute right-[10px] top-[10px]">
        <LookProductList products={look.products} />
        <button
          type="button"
          onClick={() => onViewDetail(look)}
          className="mt-[7px] flex h-[31px] w-full items-center justify-center gap-1 rounded-[4px] bg-[#faf8f5] text-[10px] text-black"
        >
          <span>상세 보기</span>
          <ChevronRight size={13} strokeWidth={1.25} />
        </button>
      </div>

      <div className="absolute bottom-[16px] left-[10px] text-white drop-shadow-sm">
        <p className="font-playfair text-[16px] leading-[18px]">Look {index + 1}.</p>
        <h2 className="font-playfair mt-1 text-[20px] leading-[20px]">{look.name}</h2>
      </div>
    </article>
  );
}

function LookRecommendation({ looks, onViewDetail }) {
  const carouselRef = useRef(null);
  const dragStateRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel?.clientWidth || looks.length <= 1) {
      setActiveIndex(0);
      return;
    }

    const pageWidth = carousel.scrollWidth > carousel.clientWidth
      ? (carousel.scrollWidth - carousel.clientWidth) / (looks.length - 1)
      : carousel.clientWidth;
    const nextIndex = Math.round(carousel.scrollLeft / pageWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), looks.length - 1));
  };

  const handlePointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.target.closest("button, a")) return;

    const carousel = carouselRef.current;
    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: carousel.scrollLeft,
    };
    carousel.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragStateRef.current.isDragging) return;

    event.preventDefault();
    carouselRef.current.scrollLeft =
      dragStateRef.current.scrollLeft - (event.clientX - dragStateRef.current.startX);
  };

  const handlePointerUp = (event) => {
    if (!dragStateRef.current.isDragging) return;

    dragStateRef.current.isDragging = false;
    carouselRef.current.releasePointerCapture(event.pointerId);
  };

  const handleIndicatorClick = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setActiveIndex(index);
    carousel.scrollTo({
      left: carousel.clientWidth * index,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-[22px] min-w-0 max-w-full overflow-hidden">
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="scrollbar-hidden flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-pan-x select-none cursor-grab active:cursor-grabbing"
        aria-label="추천 Look 캐러셀"
      >
        {looks.map((look, index) => (
          <LookCard key={look.id} index={index} look={look} onViewDetail={onViewDetail} />
        ))}
      </div>

      <div className="mt-6 flex h-[6px] items-center justify-center gap-[6px]" aria-label="Look 선택">
        {looks.map((look, index) => (
          <button
            key={look.id}
            type="button"
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Look ${index + 1} 보기`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-[6px] rounded-[3px] transition-[width,background-color] duration-200 ${
              activeIndex === index ? "w-4 bg-[#2a211a]" : "w-[6px] bg-[rgba(42,33,26,0.25)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default LookRecommendation;
