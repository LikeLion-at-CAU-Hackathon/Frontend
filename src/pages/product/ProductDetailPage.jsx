import bookmarkIcon from "../../assets/images/figma/product-detail/bookmark.svg";
import Button from "../../components/common/Button";
import ActionButton from "../../components/product/ActionButton";
import ProductImage from "../../components/product/ProductImage";
import { products } from "../../mocks/products";
import { getProductSizesByGroupId } from "../../mocks/productSizes";

const labels = {
  bookmark: "북마크",
  stock: "재고",
  count: "개",
  productInfo: "제품 정보",
  explore: "탐색하기",
  stockCheck: "재고 확인",
  liveStock: "현재 매장 실시간 재고",
  sizeCompare: "사이즈 비교",
  addSelection: "My Selection에 담기",
};

const product = products.find((item) => item.id === 8);
const productSizes = getProductSizesByGroupId(product.groupId);
const currentSize = productSizes.find((item) => item.isCurrent) ?? productSizes[0];

const colorOptions = ["#aa5a23", "#0a0908", "#d7a3a4"];

const formatPrice = (price) => `₩${price.toLocaleString("ko-KR")}`;
const collectionLabel = `${product.collectionName ?? product.collection} COLLECTION`;

const getSpecValue = (label) => {
  return product.specs.find((spec) => spec.label === label)?.value ?? "";
};

const productInfo = [
  { label: "STYLE NO.", value: `# ${product.styleNo}` },
  { label: "DIMENSIONS", value: getSpecValue("DIMENSIONS").replaceAll(" x ", " × ") },
  { label: "CLOSURE", value: getSpecValue("CLOSURE") },
  { label: "STRAP", value: getSpecValue("STRAP").replace(", ", ",\n") },
  { label: "STORAGE", value: getSpecValue("STORAGE").replaceAll(" / ", " · ") },
].filter((item) => item.value);

function InfoRow({ label, value }) {
  return (
    <div className="flex min-h-[42.5px] gap-4 border-b border-[#e5e0da] pb-3 pt-[11px]">
      <dt className="w-[72px] shrink-0 pt-px text-[10px] uppercase leading-[15px] tracking-[1px] text-[#8a8078]">
        {label}
      </dt>
      <dd className="whitespace-pre-line text-[13px] leading-[19.5px] text-[#3d3530]">
        {value}
      </dd>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-[2px] border border-[#e5e0da] px-[11px] py-[6px] text-[11px] leading-[16.5px] text-[#3d3530]">
      {children}
    </span>
  );
}

function ProductDetailPage() {
  return (
    <main className="overflow-x-hidden bg-[#faf8f5]">
      <section className="relative">
        <div className="h-[52px] bg-[#faf8f5]">
          <button
            type="button"
            aria-label={labels.bookmark}
            className="absolute right-[22px] top-[18px] flex size-[26px] items-center justify-center"
          >
            <img src={bookmarkIcon} alt="" className="size-[18px]" />
          </button>
        </div>

        <ProductImage image={product.image} alt={product.name} />

        <div className="relative bg-[#faf8f5] px-[clamp(16px,5.6vw,22px)] pb-[14px] pt-[18px]">
          <p className="text-[10px] leading-[15px] tracking-[1.4px] text-[#8a8078]">
            {collectionLabel}
          </p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h1 className="font-playfair text-[23px] font-medium leading-[27.6px] text-[#0a0908]">
              {product.name}
            </h1>
            <p className="shrink-0 pt-1 text-[15px] font-semibold leading-[22.5px] text-[#0a0908]">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="absolute right-[clamp(16px,5.6vw,22px)] top-[21px] flex gap-[5px]">
            {colorOptions.map((color) => (
              <span
                key={color}
                className="size-[18px] rounded-full border border-[#0e0d0d]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="mt-[10px] flex gap-[6px]">
            {[product.color, currentSize.size, `${labels.stock} ${product.stock}${labels.count}`].map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-[#e5e0da]" />

      <section className="bg-[#faf8f5] px-[clamp(16px,5.6vw,22px)] py-4">
        <p className="text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#8a8078]">
          {labels.productInfo}
        </p>
        <dl className="mt-[5px]">
          {productInfo.map((item) => (
            <InfoRow key={item.label} {...item} />
          ))}
        </dl>
      </section>

      <section className="bg-[#faf8f5] px-[clamp(16px,4.4vw,17px)] pb-8 pt-[14.5px]">
        <p className="px-[5px] text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#8a8078]">
          {labels.explore}
        </p>
        <div className="mt-[7px] flex gap-[11px] overflow-x-auto pb-1">
          <ActionButton
            title={labels.stockCheck}
            description={labels.liveStock}
            to="/product/stock"
          />
          <ActionButton
            title={labels.sizeCompare}
            description="Small vs Large"
            to="/product/size-compare"
          />
        </div>
      </section>

      <section className="flex flex-col gap-[9px] bg-[#faf8f5] px-[clamp(16px,5.6vw,22px)] pb-[14px] pt-[18px]">
        <Button to="/product/explore-more" variant="outline" className="font-normal tracking-[0px]">
          Explore More
        </Button>
        <Button className="text-[12px] leading-[18px] tracking-[0.72px]">
          {labels.addSelection}
        </Button>
      </section>
    </main>
  );
}

export default ProductDetailPage;
