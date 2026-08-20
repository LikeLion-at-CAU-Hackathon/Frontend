function LookProductList({ products }) {
  const visibleProducts = (products ?? []).slice(0, 5);
  const slots = Array.from({ length: 5 }, (_, index) => visibleProducts[index] ?? null);

  return (
    <div className="flex w-[104px] flex-col gap-[6px] rounded-[20px] border border-white/45 bg-white/10 px-[15px] py-[11px] shadow-[0_10px_24px_rgba(28,18,10,0.08)] backdrop-blur-[8px]">
      {slots.map((product, index) => (
        product?.image ? (
          <img
            key={product.id ?? `look-product-${index}`}
            src={product.image}
            alt={product.name}
            className="h-[53px] w-[74px] rounded-[10px] bg-white/35 object-contain"
          />
        ) : (
          <div
            key={product?.id ?? `look-product-placeholder-${index}`}
            className="h-[53px] w-[74px] rounded-[10px] bg-white/35"
            aria-hidden="true"
          />
        )
      ))}
    </div>
  );
}

export default LookProductList;
