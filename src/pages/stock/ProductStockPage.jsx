import { useState } from "react";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import Button from "../../components/common/Button";
import TopBar from "../../components/common/TopBar";
import { productStockResponse, products } from "../../mocks/products";

const product = products.find((item) => item.id === 8);
const currentStoreStocks = productStockResponse.map((stock) => ({
  name: product.name,
  color: product.color,
  stock: `${stock.quantity}개`,
  available: stock.quantity > 0,
}));

const nearbyStores = [
  { name: "MCM 롯데백화점 본점", distance: "0.6km", stock: "재고 있음" },
  { name: "MCM 롯데면세점 명동 본점", distance: "0.6km", stock: "재고 있음" },
  { name: "MCM 신라면세점 본점", distance: "2.9km", stock: "일부 재고" },
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
      className={`shrink-0 rounded-[2px] border px-[9px] py-1 text-[12px] font-medium leading-[18px] ${
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
    <li className="flex min-h-[61px] items-center justify-between gap-4 border-b border-[#e5e0da] py-[11px] last:border-b-0">
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
    <li className="border-b border-[#e5e0da] py-3 last:border-b-0">
      <p className="text-[13px] font-medium leading-[19.5px] text-[#0a0908]">{name}</p>
      <p className="flex items-center gap-[10px] pt-1 text-[11px] leading-[16.5px]">
        <span className="text-[#8a8078]">{distance}</span>
        <span className="text-[#8a8078]">·</span>
        <span className="text-[#6b3f1f]">영업 중</span>
        <span className="text-[#8a8078]">·</span>
        <span className="text-[#3d3530]">{stock}</span>
      </p>
    </li>
  );
}

function ProductStockPage() {
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  return (
    <main className="min-h-[719px] overflow-x-hidden bg-[#faf8f5]">
      <TopBar />

      <section className="bg-[#faf8f5] px-[22px] pt-4">
        <p className="text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#8a8078]">
          재고 확인
        </p>
        <h1 className="pt-[10px] text-[18px] font-medium leading-[27px] text-[#0a0908]">
          {productStockResponse[0]?.branch_name ?? "MCM 신세계 본점"}
        </h1>
      </section>

      <div className="bg-[#faf8f5] pt-4">
        <div className="h-px bg-[#e5e0da]" />
      </div>

      <section className="w-full border-[0.5px] border-[#6b3f1f] bg-white px-[22px] py-[14px]">
        <SectionLabel>현재 매장 재고</SectionLabel>
        <ul className="pt-[10px]">
          {currentStoreStocks.map((item) => (
            <StoreStockRow key={`${item.name}-${item.color}`} {...item} />
          ))}
        </ul>
      </section>

      <section className="border-t border-[#e5e0da] bg-[#faf8f5] px-[22px] py-[14px]">
        <SectionLabel>근처 매장</SectionLabel>
        <ul className="pt-[10px]">
          {nearbyStores.map((store) => (
            <NearbyStoreRow key={store.name} {...store} />
          ))}
        </ul>
      </section>

      <section className="bg-[#faf8f5] px-[22px] pb-[22px] pt-[29px]">
        <Button onClick={() => setIsAdvisorOpen(true)}>직원에게 재고 문의</Button>
      </section>

      <AdvisorSheet
        isOpen={isAdvisorOpen}
        product={product}
        onClose={() => setIsAdvisorOpen(false)}
      />
    </main>
  );
}

export default ProductStockPage;
