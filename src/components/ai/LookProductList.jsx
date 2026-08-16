function LookProductList({ products }) {
  return (
    <div className="flex w-[104px] flex-col gap-[6px] rounded-[20px] border border-white/45 bg-white/10 px-[15px] py-[11px] shadow-[0_10px_24px_rgba(28,18,10,0.08)] backdrop-blur-[8px]">
      {products.map((product) => (
        <img
          key={product.id}
          src={product.image}
          alt={product.name}
          className="h-[53px] w-[74px] rounded-[10px] object-cover"
        />
      ))}
    </div>
  );
}

export default LookProductList;
