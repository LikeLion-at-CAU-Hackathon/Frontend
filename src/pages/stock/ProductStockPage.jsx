import { useState } from "react";
import { useParams } from "react-router-dom";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import Button from "../../components/common/Button";
import useProduct from "../../hooks/useProduct";

const labels = {
  stockCheck: "재고 확인",
  currentStoreStock: "현재 매장 재고",
  nearbyStore: "근처 매장",
  requestStock: "직원에게 재고 문의",
  backToProduct: "제품으로 돌아가기",
};

const formatStockCount = (quantity) => `${quantity}개`;
const formatStockBadge = (quantity) =>
  quantity > 0 ? formatStockCount(quantity) : "재고 없음";

function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#0a0908]">
      {children}
    </p>
  );
}

function StockBadge({ available, children }) {
  return (
    <span
      className={`flex min-w-[65px] shrink-0 items-center justify-center rounded-[4px] border-[1.5px] px-[9px] py-1 text-[12px] font-medium leading-[18px] ${
        available
          ? "border-[#6b3f1f] text-[#6b3f1f]"
          : "border-[#e5e0da] text-[#b0a89a]"
      }`}
    >
      {children}
    </span>
  );
}

function StoreStockRow({ name, option, stock, available }) {
  return (
    <li className="flex min-h-[61px] w-full items-center justify-between gap-4 border-b-[1.5px] border-[#e5e0da] py-[11px] last:border-b-0">
      <div className="min-w-0">
        <p className="text-[13px] font-medium leading-[19.5px] text-[#0a0908]">{name}</p>
        <p className="pt-[2px] text-[11px] leading-[16.5px] text-[#8a8078]">{option}</p>
      </div>
      <StockBadge available={available}>{stock}</StockBadge>
    </li>
  );
}

function NearbyStoreRow({ name, distance, stock }) {
  return (
    <li className="border-b-[1.5px] border-[#e5e0da] py-2 first:pt-0 last:border-b-0 last:pb-0">
      <p className="text-[13px] font-medium leading-[19.5px] text-[#0a0908]">{name}</p>
      <p className="flex items-center gap-[10px] pt-[2px] text-[11px] leading-[16.5px]">
        <span className="text-[#8a8078]">{distance}</span>
        <span className="text-[#8a8078]">·</span>
        <span className="text-[#6b3f1f]">영업 중</span>
        <span className="text-[#8a8078]">·</span>
        <span className="text-[#3d3530]">{stock}</span>
      </p>
    </li>
  );
}

function getStockForBranch(variant, branch) {
  const branchStock = variant.stocks?.find((stock) => {
    if (branch?.branch_id !== undefined && stock.branch_id !== undefined) {
      return String(stock.branch_id) === String(branch.branch_id);
    }

    return stock.branch_name === branch?.branch_name;
  });

  return branchStock?.quantity ?? 0;
}

function getCurrentStoreStocks(product, productStocks) {
  const currentBranch = productStocks[0];

  if (product.variants?.length > 1) {
    return product.variants.map((variant) => ({
      name: variant.name ?? product.name,
      option: [variant.color ?? product.color, variant.size].filter(Boolean).join(" · "),
      stock: formatStockBadge(getStockForBranch(variant, currentBranch)),
      available: getStockForBranch(variant, currentBranch) > 0,
    }));
  }

  return productStocks.map((stock) => ({
    name: product.name,
    option: product.color,
    stock: formatStockBadge(stock.quantity),
    available: stock.quantity > 0,
  }));
}

function getBranchName(product, productStocks) {
  return productStocks[0]?.branch_name ?? "";
}

function ProductStockPage() {
  const { productId } = useParams();
  const { product, isLoading, errorMessage } = useProduct(productId);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  if (isLoading) {
    return (
      <main className="min-h-[719px] bg-[#faf8f5] px-[22px] py-20 text-center text-[12px] text-[#8a8078]">
        Loading product...
      </main>
    );
  }

  if (errorMessage || !product) {
    return (
      <main className="min-h-[719px] bg-[#faf8f5] px-[22px] py-20 text-center text-[12px] text-[#8a3d2f]">
        {errorMessage || "Product not found."}
      </main>
    );
  }

  const productStocks = product.stocks?.length ? product.stocks : [];
  const currentStoreStocks = getCurrentStoreStocks(product, productStocks);
  const nearbyStores = productStocks.slice(1).map((stock) => ({
    name: stock.branch_name,
    distance: stock.distance ?? "-",
    stock: formatStockBadge(stock.quantity),
  }));

  return (
    <main className="min-h-[719px] overflow-x-hidden bg-[#faf8f5]">
      <section className="bg-[#faf8f5] px-[22px] pt-4">
        <p className="text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#b9824c]">
          {labels.stockCheck}
        </p>
        <h1 className="pt-[10px] text-[18px] font-medium leading-[27px] text-[#0a0908]">
          {getBranchName(product, productStocks)}
        </h1>
      </section>

      <div className="bg-[#faf8f5] pt-4">
        <div className="h-[1.5px] bg-[#e5e0da]" />
      </div>

      <section className="w-full bg-white px-[22px] py-[14px]">
        <SectionLabel>{labels.currentStoreStock}</SectionLabel>
        <ul className="pt-[10px]">
          {currentStoreStocks.map((item) => (
            <StoreStockRow key={`${item.name}-${item.option}`} {...item} />
          ))}
        </ul>
      </section>

      <div className="h-[1.5px] bg-[#e5e0da]" />

      <section className="bg-[#faf8f5] px-[22px] pb-[14px] pt-6">
        <SectionLabel>{labels.nearbyStore}</SectionLabel>
        <ul className="mt-2 rounded-[12px] bg-[rgba(232,230,226,0.5)] p-4">
          {nearbyStores.map((store) => (
            <NearbyStoreRow key={store.name} {...store} />
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-[8px] bg-[#faf8f5] px-[22px] pb-[22px] pt-6">
        <Button onClick={() => setIsAdvisorOpen(true)} className="!h-[49.5px] !rounded-[3px]">
          {labels.requestStock}
        </Button>
        <Button
          to={`/product/${product.id}`}
          variant="outline"
          className="!h-[49.5px] !rounded-[3px] !border-[1.5px] border-[#e8e6e2] font-normal tracking-[0px]"
        >
          {labels.backToProduct}
        </Button>
      </section>

      <AdvisorSheet
        isOpen={isAdvisorOpen}
        product={product}
        initialSubmitted
        initialRequest="재고 문의"
        onClose={() => setIsAdvisorOpen(false)}
      />
    </main>
  );
}

export default ProductStockPage;
