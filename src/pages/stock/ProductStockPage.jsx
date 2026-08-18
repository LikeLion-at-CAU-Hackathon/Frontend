import { useState } from "react";
import { useParams } from "react-router-dom";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import Button from "../../components/common/Button";
import { getMockProductById, getMockProductStocks } from "../../mocks/products";

const labels = {
  stockCheck: "재고 확인",
  currentStoreStock: "현재 매장 재고",
  nearbyStore: "근처 매장",
  requestStock: "직원에게 재고 문의",
  backToProduct: "제품으로 돌아가기",
};

const nearbyStores = [
  { name: "MCM 롯데백화점 본점", distance: "0.6km", stock: "재고 있음" },
  { name: "MCM 롯데면세점 명동 본점", distance: "0.6km", stock: "재고 있음" },
  { name: "MCM 신라면세점 본점", distance: "2.9km", stock: "재고 있음" },
];

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

function StoreStockRow({ name, color, stock, available }) {
  return (
    <li className="flex min-h-[61px] w-full items-center justify-between gap-4 border-b-[1.5px] border-[#e5e0da] py-[11px] last:border-b-0">
      <div className="min-w-0">
        <p className="text-[13px] font-medium leading-[19.5px] text-[#0a0908]">{name}</p>
        <p className="pt-[2px] text-[11px] leading-[16.5px] text-[#8a8078]">{color}</p>
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

function getCurrentStoreStocks(product, productStocks) {
  if (product.groupName === "Aren Hobo" || product.group_name === "Aren Hobo") {
    return [
      { name: "Aren Hobo Mini", color: "Cognac", stock: "3개", available: true },
      { name: "Aren Hobo Mini", color: "Ivory White", stock: "재고 없음", available: false },
      { name: "Aren Hobo Medium", color: "Cognac", stock: "2개", available: true },
    ];
  }

  return productStocks.map((stock) => ({
    name: product.name,
    color: product.color,
    stock: `${stock.quantity}개`,
    available: stock.quantity > 0,
  }));
}

function getBranchName(product, productStocks) {
  if (product.groupName === "Aren Hobo" || product.group_name === "Aren Hobo") {
    return "MCM 신세계면세점 본점";
  }

  return productStocks[0]?.branch_name ?? "MCM 신세계 본점";
}

function ProductStockPage() {
  const { productId } = useParams();
  const product = getMockProductById(productId);
  const productStocks = getMockProductStocks(product.id);
  const currentStoreStocks = getCurrentStoreStocks(product, productStocks);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

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
            <StoreStockRow key={`${item.name}-${item.color}`} {...item} />
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
