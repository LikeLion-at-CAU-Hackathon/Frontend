import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import Button from "../../components/common/Button";
import TopBar from "../../components/common/TopBar";
import ProductImage from "../../components/product/ProductImage";
import SizeOption from "../../components/product/SizeOption";
import useProduct from "../../hooks/useProduct";

const labels = {
  sizeCompare: "사이즈 비교",
  selectSize: "비교할 사이즈를 선택하세요",
  compare: "비교하기",
};

const formatPrice = (price) => {
  const numericPrice = Number(price);

  return Number.isFinite(numericPrice) ? `₩${numericPrice.toLocaleString("ko-KR")}` : "";
};

function ProductSizeComparePage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { product, productSizes, isLoading, errorMessage } = useProduct(productId);
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  if (isLoading) {
    return (
      <main className="min-h-[734px] bg-[#faf8f5] px-[22px] py-20 text-center text-[12px] text-[#8a8078]">
        Loading product...
      </main>
    );
  }

  if (errorMessage || !product) {
    return (
      <main className="min-h-[734px] bg-[#faf8f5] px-[22px] py-20 text-center text-[12px] text-[#8a3d2f]">
        {errorMessage || "Product not found."}
      </main>
    );
  }

  const currentSize = productSizes.find((item) => item.isCurrent) ?? productSizes[0] ?? {
    size: product.size,
    stock: product.stock,
  };
  const compareSizes = productSizes
    .filter((item) => item.size !== currentSize.size)
    .map((item) => item.size);
  const collectionLabel = `${product.collectionName ?? product.collection} COLLECTION`;
  const canCompare = Boolean(selectedSize);

  return (
    <main className="min-h-[734px] overflow-x-hidden bg-[#faf8f5]">
      <TopBar
        backTo={`/product/${product.id}`}
        centerTitle={labels.sizeCompare}
        className="bg-white"
      />

      <section className="px-[22px] pt-4">
        <ProductImage image={product.image} alt={product.name} imageView={product.imageView} />

        <div className="px-[22px] pt-[9px]">
          <p className="text-[10px] leading-[15px] tracking-[1.4px] text-[#8a8078]">
            {collectionLabel}
          </p>
          <h2 className="font-playfair mt-[5px] text-[23px] font-medium leading-[27.6px] text-[#0a0908]">
            {product.name}
          </h2>
          <span className="mt-2 inline-flex h-7 items-center rounded-[4px] border-[1.5px] border-[#d5b38b] px-[11px] text-[11px] leading-[16.5px] text-[#3d3530]">
            {currentSize.size}
          </span>
          <p className="mt-[9px] text-[15px] font-semibold leading-[22.5px] text-[#0a0908]">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="mt-8 h-px bg-[#d5d0ca]" />

        <div className="px-[22px] pt-[24px]">
          <p className="text-[16px] font-semibold leading-[19.5px] text-[#0a0908]">
            {labels.selectSize}
          </p>
          <div className="mt-[8px] flex gap-[9px]">
            {compareSizes.map((size) => (
              <SizeOption
                key={size}
                size={size}
                isSelected={selectedSize === size}
                onSelect={setSelectedSize}
              />
            ))}
          </div>
          <Button
            disabled={!canCompare}
            onClick={() => {
              if (canCompare) {
                navigate(`/product/${product.id}/size-compare/result?size=${selectedSize}`);
              }
            }}
            className="mt-[24px]"
          >
            {labels.compare}
          </Button>
        </div>
      </section>

      <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
      <AdvisorSheet
        isOpen={isAdvisorOpen}
        product={product}
        onClose={() => setIsAdvisorOpen(false)}
      />
    </main>
  );
}

export default ProductSizeComparePage;
