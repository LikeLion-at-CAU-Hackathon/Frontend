import { Bookmark, ChevronRight } from "lucide-react";
import locationIcon from "../../assets/my-location.svg";

function SavedProductCard({ product, onClick, onRemove }) {
  const formattedPrice =
    typeof product.price === "number"
      ? `₩${product.price.toLocaleString("ko-KR")}`
      : product.price;

  const handleBookmarkClick = (event) => {
    event.stopPropagation();
    onRemove(product.id);
  };

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(product);
    }
  };

  return (
    <article
      onClick={() => onClick(product)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="flex h-[120px] w-full overflow-hidden rounded-[12px] border border-[#e5e0da] bg-[#faf8f5] text-left transition-all duration-200 hover:-translate-y-px hover:shadow-sm"
    >
      <div className="size-[120px] shrink-0 bg-[#ede8e2]">
        <img src={product.image} alt={product.name} className="size-full object-contain" />
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-[10px] px-3">
        <div className="min-w-0">
          <p className="truncate text-[9px] leading-[13.5px] tracking-[0.9px] text-[#8a8078]">
            {product.collection}
          </p>
          <h2 className="font-playfair-semibold mt-[2px] truncate text-[15px] leading-[19.5px] text-[#0a0908]">
            {product.name}
          </h2>
          <p className="truncate text-[11px] leading-[16.5px] text-[#8a8078]">{product.option}</p>
          <p className="mt-[5px] text-[11px] font-medium leading-[19.5px] text-[#0a0908]">
            {formattedPrice}
          </p>
        </div>

        <div className="flex items-center gap-1 text-[#8a8078]">
          <img src={locationIcon} alt="" className="size-4 shrink-0" aria-hidden="true" />
          <p className="truncate text-[11px] leading-[19.5px]">{product.store}</p>
        </div>

        <button
          type="button"
          onClick={handleBookmarkClick}
          aria-label={product.isSaved ? "My Selection에서 제거" : "My Selection에 저장"}
          className="absolute right-2 top-1 flex size-[22px] items-center justify-center text-[#0a0908]"
        >
          <Bookmark
            size={18}
            strokeWidth={1.8}
            fill={product.isSaved ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
        <ChevronRight
          size={17}
          strokeWidth={1.7}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-[#6b3f1f]"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

export default SavedProductCard;
