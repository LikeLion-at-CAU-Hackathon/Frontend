function LookDetailProductCard({ product }) {
  const price = typeof product.price === "number"
    ? `₩${product.price.toLocaleString("ko-KR")}`
    : product.price;

  return (
    <article className="flex h-20 w-full items-center gap-[15px] overflow-hidden rounded-[4px] bg-[#fffdfb] transition-all duration-200 hover:-translate-y-px hover:shadow-sm">
      <div className="size-20 shrink-0 bg-[#f0ece7]">
        <img src={product.image} alt={product.name} className="size-full object-contain" />
      </div>
      <div className="min-w-0 py-2">
        <p className="truncate text-[10.5px] leading-[16.5px] tracking-[1.3px] text-[#8a8078]">
          {product.category}
        </p>
        <h2 className="font-playfair truncate text-[16px] leading-[16.5px] text-[#1a1512]">
          {product.name}
        </h2>
        <p className="mt-2 text-[14px] font-semibold leading-[16.5px] text-[#1a1512]">
          {price}
        </p>
      </div>
    </article>
  );
}

export default LookDetailProductCard;
