import exploreCaseIcon from "../../assets/images/figma/product-detail/explore-case.svg";
import exploreDotIcon from "../../assets/images/figma/product-detail/explore-dot.svg";
import exploreHero from "../../assets/images/figma/product-detail/explore-hero.png";
import exploreStep1 from "../../assets/images/figma/product-detail/explore-step-1.png";
import exploreStep2 from "../../assets/images/figma/product-detail/explore-step-2.png";
import exploreStep3 from "../../assets/images/figma/product-detail/explore-step-3.png";
import { AdvisorButton } from "../../components/common";

const steps = [
  {
    number: "01",
    image: exploreStep1,
    imageClassName: "h-[60px]",
    text: "화면을 켠 상태로 둡니다",
  },
  {
    number: "02",
    image: exploreStep2,
    imageClassName: "h-[58px]",
    text: "제품의 NFC 태그 위치에 가까이 댑니다",
  },
  {
    number: "03",
    image: exploreStep3,
    imageClassName: "h-[60px]",
    text: "화면에 나타나는 알림을 탭합니다",
  },
];

function GuideStep({ number, image, imageClassName, text }) {
  return (
    <li className="flex items-center gap-[15px]">
      <div className="flex items-center gap-[5px]">
        <span className="w-[33px] text-center text-[12px] font-normal leading-[32px] text-black">
          {number}
        </span>
        <img src={image} alt="" className={`${imageClassName} w-[47px] object-cover`} />
      </div>
      <p className="whitespace-nowrap text-[14px] font-normal leading-[32px] text-black">
        {text}
      </p>
    </li>
  );
}

function ProductExploreMorePage() {
  return (
    <main className="relative min-h-[calc(100dvh_-_62px_-_env(safe-area-inset-bottom))] overflow-x-hidden bg-[#faf8f5] pb-8">
      <section className="flex flex-col items-center pt-[51px]">
        <img
          src={exploreHero}
          alt=""
          className="ml-[12px] h-[211px] w-[224px] object-cover"
        />

        <h1 className="mt-[18px] text-center text-[25px] font-normal leading-[32px] text-[#0a0908]">
          다른 제품의 NFC를
          <br />
          태그해 보세요
        </h1>
      </section>

      <ol className="ml-[42px] mt-[18px] flex flex-col gap-px">
        {steps.map((step) => (
          <GuideStep key={step.number} {...step} />
        ))}
      </ol>

      <section className="ml-[45px] mt-[10px] w-[315px] max-w-[calc(100%_-_90px)] rounded-[8px] bg-[rgba(148,104,61,0.08)] px-[10px] py-[5px]">
        <h2 className="text-[13px] font-medium leading-[32px] text-black">
          인식되지 않을 때
        </h2>
        <ul className="flex flex-col">
          <li className="flex items-center gap-[10px]">
            <img src={exploreDotIcon} alt="" className="ml-[10px] size-1 shrink-0" />
            <span className="min-w-0 text-[13px] font-normal leading-[32px] text-black">
              휴대폰 위치를 조금씩 움직여 다시 시도해 주세요
            </span>
          </li>
          <li className="flex items-center gap-1">
            <img src={exploreCaseIcon} alt="" className="size-6 shrink-0" />
            <span className="min-w-0 text-[13px] font-normal leading-[32px] text-black">
              두꺼운 케이스는 잠시 벗겨 주세요
            </span>
          </li>
        </ul>
      </section>

      <AdvisorButton />
    </main>
  );
}

export default ProductExploreMorePage;
