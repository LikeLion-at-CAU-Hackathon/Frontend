import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdvisorButton, AdvisorSheet, Button, TopBar } from "../../components/common";
import { ProductImage, SizeOption } from "../../components/product";
import { products } from "../../mocks/products";
import { getProductSizesByGroupId } from "../../mocks/productSizes";

const labels = {
  sizeCompare: "사이즈 비교",
  selectSize: "비교할 사이즈를 선택하세요",
  compare: "비교하기",
};

const product = products.find((item) => item.id === 8);
const productSizes = getProductSizesByGroupId(product.groupId);
const currentSize = productSizes.find((item) => item.isCurrent) ?? productSizes[0];

const compareSizes = productSizes
  .filter((item) => item.size !== currentSize.size)
  .map((item) => item.size);

const formatPrice = (price) => `₩${price.toLocaleString("ko-KR")}`;
const collectionLabel = `${product.collectionName ?? product.collection} COLLECTION`;

function ProductSizeComparePage() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const canCompare = Boolean(selectedSize);

  return (
    <main className="min-h-[734px] overflow-x-hidden bg-[#faf8f5]">
      <TopBar centerTitle={labels.sizeCompare} className="bg-white" />

      <section className="px-[22px] pt-4">
        <ProductImage image={product.image} alt={product.name} />

        <div className="px-[22px] pt-[9px]">
          <p className="text-[10px] leading-[15px] tracking-[1.4px] text-[#8a8078]">
            {collectionLabel}
          </p>
          <h2 className="font-playfair mt-[5px] text-[23px] font-medium leading-[27.6px] text-[#0a0908]">
            {product.name}
          </h2>
          <span className="mt-2 inline-flex h-7 items-center rounded-[2px] border border-[#d5b38b] px-[11px] text-[11px] leading-[16.5px] text-[#3d3530]">
            {currentSize.size}
          </span>
          <p className="mt-[9px] text-[15px] font-semibold leading-[22.5px] text-[#0a0908]">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="mt-8 h-px bg-[#d5d0ca]" />

        <div className="px-[22px] pt-[15px]">
          <p className="text-[16px] font-semibold leading-[19.5px] text-[#0a0908]">
            {labels.selectSize}
          </p>
          <div className="mt-[14px] flex gap-[9px]">
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
            font="playfair"
            onClick={() => {
              if (canCompare) {
                navigate(`/product/size-compare/result?size=${selectedSize}`);
              }
            }}
            className="mt-3"
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
