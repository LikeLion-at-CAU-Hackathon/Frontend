import { useParams } from "react-router-dom";
import { Bookmark } from "lucide-react";
import Button from "../../components/common/Button";
import ActionButton from "../../components/product/ActionButton";
import ProductImage from "../../components/product/ProductImage";
import { getMockProductById, getProductSizesForProduct } from "../../mocks/products";
import useSavedProductsStore from "../../stores/useSavedProductsStore";

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

const colorPalette = {
  Black: "#0a0908",
  "Black / Silver": "linear-gradient(135deg, #f8f8f6 0 28%, #0a0908 28% 72%, #f8f8f6 72% 100%)",
  "Black / Matte Black": "#050505",
  Cognac: "#aa5a23",
  "Cognac / Gold": "linear-gradient(135deg, #aa5a23 0 70%, #d5a856 70% 100%)",
  "Dark Brown / Black": "linear-gradient(135deg, #241614 0 62%, #050505 62% 100%)",
  Egret: "#efebe4",
  "Misty Gray / Silver": "linear-gradient(135deg, #b8b6b0 0 70%, #ececea 70% 100%)",
  Pink: "#d7a3a4",
  "Powder Pink": "#dbaaaa",
};

const formatPrice = (price) => `₩${price.toLocaleString("ko-KR")}`;
const formatSpecValue = (value) => value.replaceAll(" x ", " × ").replaceAll(" / ", " · ");

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
  const { productId } = useParams();
  const product = getMockProductById(productId);
  const productSizes = getProductSizesForProduct(product);
  const currentSize = productSizes.find((item) => item.isCurrent) ?? productSizes[0];
  const sizeLabels = [...new Set(productSizes.map((item) => item.size))];
  const canCompareSizes = sizeLabels.length > 1;
  const collectionLabel = `${product.collectionName ?? product.collection} COLLECTION`;
  const productInfo = [
    { label: "STYLE NO.", value: `# ${product.styleNo}` },
    ...(product.specs ?? [])
      .filter((spec) => spec.label !== "STYLE NO.")
      .map((spec) => ({
        label: spec.label,
        value: formatSpecValue(spec.value),
      })),
  ].filter((item) => item.value);
  const colorOptions = product.colors?.length ? product.colors : [product.color];
  const getColorSwatch = (color) => colorPalette[color] ?? colorPalette[product.color] ?? "#d9d9d9";
  const addSavedProduct = useSavedProductsStore((state) => state.addSavedProduct);
  const removeSavedProduct = useSavedProductsStore((state) => state.removeSavedProduct);
  const isSaved = useSavedProductsStore((state) =>
    state.savedProducts.some((item) => String(item.id) === String(product.id)),
  );

  const handleToggleSavedProduct = () => {
    if (isSaved) {
      removeSavedProduct(product.id);
      return;
    }

    addSavedProduct({
      ...product,
      collection: collectionLabel,
      option: `${product.color} · ${currentSize.size}`,
      store: product.stocks?.[0]?.branch_name ?? "MCM 신세계 강남점",
      isSaved: true,
    });
  };

  return (
    <main className="overflow-x-hidden bg-[#faf8f5]">
      <section className="relative">
        <div className="h-[52px] bg-[#faf8f5]">
          <button
            type="button"
            onClick={handleToggleSavedProduct}
            aria-label={isSaved ? "My Selection에서 제거" : "My Selection에 저장"}
            aria-pressed={isSaved}
            className="absolute right-[22px] top-[18px] flex size-[26px] items-center justify-center"
          >
            <Bookmark
              size={18}
              strokeWidth={1.125}
              fill={isSaved ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>
        </div>

        <ProductImage image={product.image} alt={product.name} imageView={product.imageView} />

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
                style={{ background: getColorSwatch(color) }}
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

      <section className="bg-[#faf8f5] px-[clamp(16px,4.4vw,17px)] pb-0 pt-[14.5px]">
        <p className="px-[5px] text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#8a8078]">
          {labels.explore}
        </p>
        <div className="mt-[7px] flex gap-[11px] overflow-x-auto pb-1">
          <ActionButton
            title={labels.stockCheck}
            description={labels.liveStock}
            to={`/product/${product.id}/stock`}
          />
          <ActionButton
            title={labels.sizeCompare}
            description={canCompareSizes ? sizeLabels.join(" vs ") : "비교 가능한 사이즈 없음"}
            to={`/product/${product.id}/size-compare`}
            disabled={!canCompareSizes}
          />
        </div>
      </section>

      <section className="flex flex-col gap-[9px] bg-[#faf8f5] px-[clamp(16px,5.6vw,22px)] pb-[14px] pt-[18px]">
        <Button to={`/product/${product.id}/explore-more`} variant="outline" className="font-normal tracking-[0px]">
          Explore More
        </Button>
        <Button
          onClick={handleToggleSavedProduct}
          className="text-[12px] leading-[18px] tracking-[0.72px]"
        >
          {isSaved ? "My Selection에서 제거" : labels.addSelection}
        </Button>
      </section>
    </main>
  );
}

export default ProductDetailPage;
