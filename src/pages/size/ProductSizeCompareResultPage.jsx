import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/common";
import { products } from "../../mocks/products";
import { getProductSizesByGroupId } from "../../mocks/productSizes";

const product = products.find((item) => item.id === 8);
const productSizes = getProductSizesByGroupId(product.groupId);
const currentProduct = productSizes.find((item) => item.isCurrent) ?? productSizes[0];
const initialCompareProduct = productSizes.find((item) => item.size === "Large") ?? productSizes[1];

const labels = {
  compareSizes: "Compare Sizes",
  current: "현재 선택",
  color: "Cognac",
  dimension: "크기",
  strap: "스트랩",
  storage: "수납",
  price: "가격",
  stock: "재고",
  request: "두 제품 실물 비교 요청",
  backToProduct: "제품으로 돌아가기",
};

const selectableSizes = productSizes.map((item) => item.size);
const sizeInfoBySize = Object.fromEntries(productSizes.map((item) => [item.size, item]));

const formatPrice = (price) => `₩${price.toLocaleString("ko-KR")}`;
const formatStorage = (value) => value.replaceAll(" / ", " · ");

function ProductCard({
  productSize,
  isCurrent = false,
  isDropdownOpen,
  onToggleDropdown,
  onSelectSize,
}) {
  return (
    <article
      className={`relative aspect-[159/160] min-h-[136px] w-full overflow-visible border px-[9px] py-[7px] ${
        isCurrent ? "border-[#6b3f1f]" : "border-[rgba(107,63,31,0.12)]"
      }`}
    >
      <div className="relative z-10">
        <p className="text-[11px] font-semibold leading-[16.5px] text-[#0a0908]">
          {product.name}
        </p>
        {isCurrent ? (
          <>
            <p className="mt-[2px] text-[11px] leading-[16.5px] text-black">
              {productSize.size}
            </p>
            <p className="mt-[1px] text-[10px] leading-[15px] text-[#8a8078]">
              {labels.current}
            </p>
          </>
        ) : (
          <>
            <div className="relative mt-[2px] h-[18px] w-[54px]">
              <button
                type="button"
                onClick={onToggleDropdown}
                className="relative flex h-full w-full items-center border border-[#bcbab6] bg-[#faf8f5] pl-[5px] pr-[15px] text-left !text-[11px] !leading-[16.5px] text-black"
              >
                {productSize.size}
                <span className="absolute right-[5px] top-[4px] size-[9px]" aria-hidden="true">
                  <span className="absolute left-[1px] top-[1px] size-[6px] rotate-45 border-b border-r border-black" />
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 top-[18px] z-30 w-full border-x border-[#bcbab6] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  {selectableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => onSelectSize(size)}
                      className="block h-[17px] w-full border-b border-[#bcbab6] bg-white text-center !text-[11px] !leading-[16.5px] text-black"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-[2px] text-[10px] leading-[15px] text-[#8a8078]">
              {labels.color}
            </p>
          </>
        )}
      </div>
      <div className="absolute bottom-0 left-0 h-[64%] w-full overflow-hidden bg-[#f7f5f2]">
        <img
          src={productSize.image}
          alt={`${product.name} ${productSize.size}`}
          className="size-full object-contain"
        />
      </div>
    </article>
  );
}

function CompareCell({ label, value, strong = false }) {
  return (
    <div className="flex min-h-[51px] flex-col items-center justify-start gap-[6px] text-center">
      <p className="text-[9px] leading-[13.5px] tracking-[1.26px] text-black">
        {label}
      </p>
      <p
        className={`whitespace-pre-line text-[12px] leading-[18px] ${
          strong ? "font-medium text-[#0a0908]" : "text-[#3d3530]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function CompareRow({ label, currentValue, compareValue }) {
  return (
    <div className="grid grid-cols-2 gap-[10px]">
      <CompareCell label={label} value={currentValue} strong />
      <CompareCell label={label} value={compareValue} />
    </div>
  );
}

function ProductSizeCompareResultPage() {
  const [searchParams] = useSearchParams();
  const requestedSize = searchParams.get("size");
  const defaultCompareSize = selectableSizes.includes(requestedSize)
    ? requestedSize
    : initialCompareProduct.size;
  const [compareSize, setCompareSize] = useState(defaultCompareSize);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const compareProduct = sizeInfoBySize[compareSize] ?? initialCompareProduct;

  return (
    <main className="min-h-[734px] overflow-x-hidden bg-[#faf8f5] px-[22px] pt-4">
      <p className="text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#b9824c]">
        {labels.compareSizes}
      </p>

      <section className="mt-[49px] grid grid-cols-2 gap-5">
        <ProductCard productSize={currentProduct} isCurrent />
        <ProductCard
          productSize={compareProduct}
          isDropdownOpen={isDropdownOpen}
          onToggleDropdown={() => setIsDropdownOpen((prev) => !prev)}
          onSelectSize={(size) => {
            setCompareSize(size);
            setIsDropdownOpen(false);
          }}
        />
      </section>

      <section className="mt-[28px] flex flex-col gap-[22px]">
        <CompareRow
          label={labels.dimension}
          currentValue={currentProduct.dimensions.replaceAll(" x ", " × ")}
          compareValue={compareProduct.dimensions.replaceAll(" x ", " × ")}
        />
        <CompareRow
          label={labels.strap}
          currentValue={currentProduct.strap.replace("-", "–")}
          compareValue={compareProduct.strap.replace("-", "–")}
        />
        <CompareRow
          label={labels.storage}
          currentValue={formatStorage(currentProduct.storage).replace(" · AirPods", " ·\nAirPods")}
          compareValue={formatStorage(compareProduct.storage).replace(" · AirPods", " ·\nAirPods")}
        />
        <CompareRow
          label={labels.price}
          currentValue={formatPrice(currentProduct.price)}
          compareValue={formatPrice(compareProduct.price)}
        />
        <CompareRow
          label={labels.stock}
          currentValue={`${currentProduct.stock}개 (현재 매장)`}
          compareValue={`${compareProduct.stock}개 (현재 매장)`}
        />
      </section>

      <section className="mt-[29px] flex flex-col gap-[9px] pb-6">
        <Button>{labels.request}</Button>
        <Button to="/product" variant="outline" className="font-normal tracking-[0px]">
          {labels.backToProduct}
        </Button>
      </section>
    </main>
  );
}

export default ProductSizeCompareResultPage;
