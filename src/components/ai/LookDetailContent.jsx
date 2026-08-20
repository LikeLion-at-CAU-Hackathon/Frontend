import { ArrowRight } from "lucide-react";
import LookDetailProductCard from "./LookDetailProductCard";

function LookDetailContent({ detail, onRequestAdvisor }) {
  return (
    <>
      <section className="flex h-[118px] flex-col justify-center rounded-[16px] bg-[#28190e] px-8 text-left text-[14px] leading-[21px] text-white">
        <p className="w-full">{detail.description}</p>
        <div className="my-[7px] h-px bg-[#6d5944]" />
        <p className="w-full">{detail.reason}</p>
        <div className="mt-[7px] h-px bg-[#6d5944]" />
      </section>

      <section className="mt-[26px] flex flex-col gap-[5px]">
        {(detail.products ?? []).map((product) => (
          <LookDetailProductCard key={product.id} product={product} />
        ))}
      </section>

      <section className="mt-6 flex flex-col items-center gap-[14px] text-center text-[#6b3f1f]">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] leading-[18px]">제품에 대해 궁금하신 점이 있나요?</p>
          <p className="text-[10px] leading-[18px]">Advisor와 상담을 진행할 수 있습니다</p>
        </div>
        <button
          type="button"
          onClick={onRequestAdvisor}
          className="flex items-center gap-[10px] rounded-full bg-[#ece6d9] py-[7px] pl-[14px] pr-[13px] text-[14px] leading-[18px] text-black"
        >
          <span>상담 접수하기</span>
          <ArrowRight size={18} strokeWidth={1.8} />
        </button>
      </section>
    </>
  );
}

export default LookDetailContent;
