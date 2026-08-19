import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import Button from "../../components/common/Button";
import { getMockProductById, getProductSizesForProduct } from "../../mocks/products";

const labels = {
  compareSizes: "Compare Sizes",
  current: "현재 선택",
  request: "두 제품 실물 비교 요청",
  backToProduct: "제품으로 돌아가기",
};

const defaultCompareFields = [
  { label: "크기", valueKey: "dimensions", format: "dimensions" },
  { label: "스트랩", valueKey: "strap", format: "dash" },
  { label: "수납", valueKey: "storage", format: "storage" },
  { label: "가격", valueKey: "price", format: "price" },
  { label: "재고", valueKey: "stock", format: "stock" },
];

const formatPrice = (price) => `₩${Number(price).toLocaleString("ko-KR")}`;
const formatStorage = (value) => value.replaceAll(" / ", " · ");
const formatStockCount = (quantity) => `${quantity}개`;
const formatCurrentStoreStock = (quantity) =>
  quantity > 0 ? `${formatStockCount(quantity)} (현재 매장)` : "재고 없음";
const formatStock = (value) => {
  const numericValue = Number(value);
  return Number.isNaN(numericValue) ? String(value) : formatCurrentStoreStock(numericValue);
};

const formatCompareValue = (value, field) => {
  if (value === undefined || value === null || value === "") return "-";

  switch (field.format) {
    case "dimensions":
      return String(value).replaceAll(" x ", " × ");
    case "dash":
      return String(value).replace("-", "–");
    case "storage":
      return formatStorage(String(value)).replace(" · AirPods", " ·\nAirPods");
    case "price":
      return formatPrice(value);
    case "stock":
      return formatStock(value);
    case "availability": {
      const numericValue = Number(value);
      return Number.isNaN(numericValue) ? String(value) : numericValue > 0 ? "유" : "무";
    }
    default:
      return String(value);
  }
};

function ProductCard({
  productName,
  productSize,
  isCurrent = false,
  isDropdownOpen,
  onToggleDropdown,
  onSelectSize,
  selectableSizes,
}) {
  return (
    <article
      className={`relative aspect-[159/160] min-h-[136px] w-full overflow-visible rounded-[12px] border px-[9px] py-[7px] ${
        isCurrent ? "border-[#6b3f1f]" : "border-[rgba(107,63,31,0.12)]"
      }`}
    >
      <div className="relative z-10">
        <p className="text-[11px] font-semibold leading-[16.5px] text-[#0a0908]">
          {productName}
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
                className="relative flex h-full w-full items-center rounded-[8px] border border-[#bcbab6] bg-[#faf8f5] pl-[5px] pr-[15px] text-left !text-[11px] !leading-[16.5px] text-black"
              >
                {productSize.size}
                <span className="absolute right-[5px] top-[4px] size-[9px]" aria-hidden="true">
                  <span className="absolute left-[1px] top-[1px] size-[6px] rotate-45 border-b border-r border-black" />
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 top-[18px] z-30 w-full overflow-hidden rounded-b-[8px] border-x border-b border-[#bcbab6] bg-white">
                  {selectableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => onSelectSize(size)}
                      className="block h-[17px] w-full border-b border-[#bcbab6] bg-white text-center !text-[11px] !leading-[16.5px] text-black last:border-b-0"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="absolute bottom-0 left-0 h-[64%] w-full overflow-hidden rounded-b-[12px] bg-[#f7f5f2]">
        <img
          src={productSize.image}
          alt={`${productName} ${productSize.size}`}
          className="size-full object-contain"
        />
      </div>
    </article>
  );
}

function CompareCell({ label, value, strong = false }) {
  return (
    <div className="flex flex-col items-center gap-0 text-center">
      <p className="text-[9px] leading-[13.5px] tracking-[1.26px] text-[#6f6f6f]">
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
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const product = getMockProductById(productId);
  const productSizes = getProductSizesForProduct(product);
  const currentProduct = productSizes.find((item) => item.isCurrent) ?? productSizes[0];
  const initialCompareProduct =
    productSizes.find((item) => item.size !== currentProduct.size) ?? currentProduct;
  const selectableSizes = productSizes.map((item) => item.size);
  const sizeInfoBySize = Object.fromEntries(productSizes.map((item) => [item.size, item]));
  const requestedSize = searchParams.get("size");
  const defaultCompareSize = selectableSizes.includes(requestedSize)
    ? requestedSize
    : initialCompareProduct.size;
  const [compareSize, setCompareSize] = useState(defaultCompareSize);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const compareProduct = sizeInfoBySize[compareSize] ?? initialCompareProduct;
  const compareFields = product.sizeCompareFields ?? defaultCompareFields;

  return (
    <main className="min-h-[734px] overflow-x-hidden bg-[#faf8f5] px-[22px] pt-4">
      <p className="text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#b9824c]">
        {labels.compareSizes}
      </p>

      <section className="mt-[49px] grid grid-cols-2 gap-5">
        <ProductCard
          productName={product.name}
          productSize={currentProduct}
          selectableSizes={selectableSizes}
          isCurrent
        />
        <ProductCard
          productName={product.name}
          productSize={compareProduct}
          selectableSizes={selectableSizes}
          isDropdownOpen={isDropdownOpen}
          onToggleDropdown={() => setIsDropdownOpen((prev) => !prev)}
          onSelectSize={(size) => {
            setCompareSize(size);
            setIsDropdownOpen(false);
          }}
        />
      </section>

      <section className="mt-[28px] flex flex-col gap-[24px]">
        {compareFields.map((field) => (
          <CompareRow
            key={`${field.label}-${field.valueKey}`}
            label={field.label}
            currentValue={formatCompareValue(currentProduct[field.valueKey], field)}
            compareValue={formatCompareValue(compareProduct[field.valueKey], field)}
          />
        ))}
      </section>

      <section className="mt-[29px] flex flex-col gap-[9px] pb-6">
        <Button onClick={() => setIsAdvisorOpen(true)}>{labels.request}</Button>
        <Button
          to={`/product/${product.id}`}
          variant="outline"
          className="!border-[1.5px] font-normal tracking-[0px]"
        >
          {labels.backToProduct}
        </Button>
      </section>

      <AdvisorSheet
        isOpen={isAdvisorOpen}
        product={product}
        initialSubmitted
        initialRequest="실물 비교 요청"
        onClose={() => setIsAdvisorOpen(false)}
      />
    </main>
  );
}

export default ProductSizeCompareResultPage;
