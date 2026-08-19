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
const hasKnownQuantity = (stock) => stock?.quantity !== undefined && stock?.quantity !== null;
const isStockAvailable = (stock) => {
  if (!stock) return false;
  if (hasKnownQuantity(stock)) return Number(stock.quantity) > 0;

  return Boolean(stock.has_stock);
};
const formatStockBadge = (stock) => {
  if (typeof stock === "number") return stock > 0 ? formatStockCount(stock) : "재고 없음";
  if (hasKnownQuantity(stock)) {
    return Number(stock.quantity) > 0 ? formatStockCount(Number(stock.quantity)) : "재고 없음";
  }

  return stock?.has_stock ? "재고 있음" : "재고 없음";
};
const formatDistance = (distance) => {
  if (distance === undefined || distance === null || distance === "") return "-";
  if (typeof distance === "number") return `${distance}km`;

  return String(distance);
};
const formatOpenStatus = (isOpen) => {
  if (isOpen === false) return "영업 종료";

  return "영업 중";
};
const formatBranchName = (name) => {
  const branchName = String(name ?? "")
    .trim()
    .replace(/신세계\s+면세점/g, "신세계면세점")
    .replace(/명동본점/g, "명동 본점");

  if (!branchName) return "";
  if (/^MCM\s/i.test(branchName)) return branchName;

  return `MCM ${branchName}`;
};

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

function NearbyStoreRow({ name, distance, status, stock }) {
  return (
    <li className="border-b-[1.5px] border-[#e5e0da] py-2 first:pt-0 last:border-b-0 last:pb-0">
      <p className="text-[13px] font-medium leading-[19.5px] text-[#0a0908]">{formatBranchName(name)}</p>
      <p className="flex items-center gap-[10px] pt-[2px] text-[11px] leading-[16.5px]">
        <span className="text-[#8a8078]">{distance}</span>
        <span className="text-[#8a8078]">·</span>
        <span className="text-[#6b3f1f]">{status}</span>
        <span className="text-[#8a8078]">·</span>
        <span className="text-[#3d3530]">{stock}</span>
      </p>
    </li>
  );
}

const normalizeBranchNameKey = (name) => {
  return String(name ?? "")
    .replace(/^MCM\s*/i, "")
    .replace(/\s+/g, "")
    .toLowerCase();
};

function isSameBranch(stock, branch) {
  if (!stock || !branch) return false;

  if (branch.branch_id !== undefined && stock.branch_id !== undefined) {
    if (String(stock.branch_id) === String(branch.branch_id)) return true;
  }

  return normalizeBranchNameKey(stock.branch_name) === normalizeBranchNameKey(branch.branch_name);
}

function getStockForBranch(variant, branch) {
  const branchStock = variant.stocks?.find((stock) => isSameBranch(stock, branch));

  return branchStock ?? { quantity: 0, has_stock: false };
}

function getCurrentStoreStocks(product, productStocks) {
  const currentBranch = getCurrentBranch(product, productStocks);

  if (product.variants?.length > 1) {
    return product.variants.map((variant) => {
      const branchStock = getStockForBranch(variant, currentBranch);

      return {
        name: variant.name ?? product.name,
        option: [variant.color ?? product.color, variant.size].filter(Boolean).join(" · "),
        stock: formatStockBadge(branchStock),
        available: isStockAvailable(branchStock),
      };
    });
  }

  return productStocks.map((stock) => ({
    name: product.name,
    option: product.color,
    stock: formatStockBadge(stock),
    available: isStockAvailable(stock),
  }));
}

function getCurrentBranch(product, productStocks) {
  if (product.currentBranch) return product.currentBranch;

  const distanceZeroBranch = productStocks.find((stock) => Number(stock.distance) === 0);

  return distanceZeroBranch ?? product.stocks?.[0] ?? productStocks[0];
}

function getBranchName(product, productStocks) {
  return formatBranchName(getCurrentBranch(product, productStocks)?.branch_name);
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

  const productStocks = product.stockLocations?.length
    ? product.stockLocations
    : product.stocks?.length
      ? product.stocks
      : [];
  const currentBranch = getCurrentBranch(product, productStocks);
  const currentStoreStocks = getCurrentStoreStocks(product, productStocks);
  const nearbyStores = productStocks.filter((stock) => !isSameBranch(stock, currentBranch)).map((stock) => ({
    name: stock.branch_name,
    distance: formatDistance(stock.distance),
    status: formatOpenStatus(stock.is_open),
    stock: formatStockBadge(stock),
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
