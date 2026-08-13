import { useState } from "react";
import advisorCheckIcon from "../../assets/images/figma/product-detail/advisor-check.svg";
import { products } from "../../mocks/products";
import Button from "./Button";

const options = ["다른 옵션", "착용 상담", "스타일링", "기타"];
const defaultProduct = products.find((item) => item.id === 8);

// Advisor 버튼을 눌렀을 때 뜨는 상담 요청창
function AdvisorSheet({ isOpen, onClose, product = defaultProduct }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setSelectedOption("");
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-y-0 left-1/2 z-[60] w-full max-w-[440px] -translate-x-1/2 bg-[rgba(10,9,8,0.42)] backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <section
        className={`absolute bottom-0 left-0 w-full rounded-t-[16px] bg-[#fcfbf9] ${
          isSubmitted ? "max-h-[calc(100dvh-84px)] overflow-y-auto" : "min-h-[467px]"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-center pt-3">
          <span className="h-1 w-9 rounded-[2px] bg-[#e5e0da]" />
        </div>

        {isSubmitted ? (
          <SubmittedContent onClose={handleClose} selectedOption={selectedOption || "재고 문의"} />
        ) : (
          <RequestContent
            product={product}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
            onSubmit={() => setIsSubmitted(true)}
          />
        )}
      </section>
    </div>
  );
}

function RequestContent({ product, selectedOption, onSelect, onSubmit }) {
  return (
    <div className="px-5 pb-7 pt-4">
      <p className="ml-2 text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#251a0f]">
        ADVISOR
      </p>
      <h2 className="ml-2 mt-[7px] text-[22px] font-medium leading-[31.5px] text-[#0a0908]">
        어드바이저 상담 요청
      </h2>

      <div className="mt-[18px] flex h-[66px] items-center overflow-hidden rounded-[3px]">
        <div className="h-[55px] w-[66px] shrink-0 rounded-[5px] bg-[#d9d9d9]">
          {product?.image && (
            <img src={product.image} alt="" className="size-full rounded-[5px] object-contain" />
          )}
        </div>
        <div className="ml-[13px] min-w-0">
          <p className="font-playfair truncate text-[20px] leading-[31.5px] text-black">
            Aren Hobo Mini
          </p>
          <p className="truncate text-[15px] leading-[31.5px] text-[#251a0f]">
            이 제품에 대한 정보가 함께 전달됩니다
          </p>
        </div>
      </div>

      <div className="mt-[14px] h-px bg-[#e5e0da]" />

      <div className="mt-[39px]">
        <p className="text-[15px] font-medium leading-[31.5px] text-black">
          어떤 도움이 필요하신가요?
        </p>
        <div className="mt-[6px] flex justify-between gap-[10px]">
          {options.map((option) => {
            const isSelected = selectedOption === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`flex h-10 w-20 items-center justify-center rounded-[5px] border-[1.5px] px-[10px] text-[15px] leading-[31.5px] text-black ${
                  isSelected
                    ? "border-[#a88f78] bg-[#e6dac9]"
                    : "border-[#bcbab6] bg-transparent"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <label className="mt-[7px] flex h-[57px] items-center rounded-[5px] border border-[#e8e6e2] px-[10px]">
        <span className="sr-only">추가 요청사항</span>
        <input
          type="text"
          className="w-full bg-transparent text-[15px] leading-[31.5px] text-[#0a0908] outline-none placeholder:text-[#bcbab6]"
          placeholder="추가 요청사항을 입력해주세요. (선택)"
        />
      </label>

      <Button
        variant="brown"
        onClick={onSubmit}
        className="mt-[26px] h-[67px] rounded-[5px] text-[15px] font-bold leading-[31.5px] tracking-[0px]"
      >
        바로 요청하기
      </Button>
    </div>
  );
}

function SubmittedContent({ onClose, selectedOption }) {
  return (
    <div className="px-6 pb-7 pt-9">
      <div className="flex justify-center pt-2">
        <div className="flex size-11 items-center justify-center rounded-full border border-[#e5e0da] bg-[#f2efeb]">
          <img src={advisorCheckIcon} alt="" className="size-5" />
        </div>
      </div>

      <h2 className="mt-[14px] text-center text-[20px] font-medium leading-[30px] text-[#0a0908]">
        상담 요청이 접수되었습니다
      </h2>

      <div className="mt-[17px] h-px bg-[#e5e0da]" />

      <section className="pt-[16px] text-center">
        <p className="font-playfair text-[16px] leading-[31.5px] text-black">
          REQUEST NO.
        </p>
        <p className="font-playfair mt-[10px] text-[96px] leading-[96px] text-black">
          17
        </p>
        <p className="mt-[30px] whitespace-pre-line text-[16px] leading-[31.5px] text-black">
          가까이 있는 어드바이저에게{"\n"}번호를 보여주세요
        </p>
      </section>

      <section className="mt-[22px] rounded-[3px] border border-[#e5e0da] bg-[#fafaf8] p-[17px]">
        <p className="text-[10px] leading-[15px] tracking-[1.4px] text-[#8a8078]">
          방문 안내
        </p>
        <p className="mt-2 text-[14px] font-semibold leading-[21px] text-[#0a0908]">
          MCM 신세계면세점 본점
        </p>
      </section>

      <section className="rounded-[3px] border-x border-b border-[#e5e0da] bg-white px-[15px] py-[13px]">
        <p className="text-[10px] font-medium leading-[15px] tracking-[1.6px] text-[#8a8078]">
          전달된 요청
        </p>
        <p className="mt-[10px] text-[13px] font-medium leading-[19.5px] text-[#0a0908]">
          {selectedOption}
        </p>
      </section>

      <Button onClick={onClose} className="mt-10 h-[50px]">
        확인
      </Button>
    </div>
  );
}

export default AdvisorSheet;
