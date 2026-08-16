import SavedProductCard from "./SavedProductCard";

function SavedProductsList({ products, onProductClick, onRemoveProduct }) {
  return (
    <section className="flex flex-col gap-[10px] pb-6 pl-6 pr-5 pt-[71px]">
      {products.map((product) => (
        <SavedProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
          onRemove={onRemoveProduct}
        />
      ))}
    </section>
  );
}

export default SavedProductsList;
