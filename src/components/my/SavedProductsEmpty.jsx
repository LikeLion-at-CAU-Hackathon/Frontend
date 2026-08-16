import emptyIcon from "../../assets/images/figma/my/saved-products-empty.svg";

function SavedProductsEmpty() {
  return (
    <section className="flex min-h-[calc(100dvh-124px)] items-center justify-center pb-16 text-center">
      <div className="flex w-[175px] flex-col items-center gap-[11px]">
        <img src={emptyIcon} alt="" className="size-[85px]" />
        <div className="flex w-full flex-col gap-[17px]">
          <h1 className="font-playfair text-[18px] font-medium leading-[27px] text-[#0a0908]">
            저장된 항목이 없습니다
          </h1>
          <p className="text-[13px] leading-[22.75px] text-[#8a8078]">
            제품을 탐색하고 저장하면
            <br />
            여기서 이어서 확인하고
            <br />
            어드바이저와 공유할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SavedProductsEmpty;
