import { useNavigate } from "react-router-dom";
import nfcFailedIcon from "../../assets/images/figma/nfc/nfc-failed.svg";
import { Button } from "../../components/common";

const guideItems = [
  "스마트폰 상단을 제품 태그 위에 대세요",
  "케이스를 벗기거나 얇은 케이스로 시도해 보세요",
  "천천히 위치를 조금씩 움직여 보세요",
];

// NFC 태그 인식 실패 화면
function NfcFailedPage({ isStaffCalled = false }) {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-[calc(100dvh_-_env(safe-area-inset-bottom))] overflow-hidden bg-[#faf8f5] px-[29px] pt-[170px]">
      <section className="flex flex-col items-center">
        <div className="flex size-[72px] items-center justify-center rounded-full border-[1.5px] border-[#ccc6be] bg-[#f2efeb]">
          <img src={nfcFailedIcon} alt="" className="size-[28px]" />
        </div>

        <p className="mt-[28px] pb-3 text-[10px] font-medium leading-[15px] tracking-[2px] text-[#6b3f1f]">
          NFC RECOGNITION FAILED
        </p>

        <h1 className="pb-[10px] text-center text-[22px] font-medium leading-[23.4px] text-black">
          NFC 태그를
          <br />
          다시 시도해 주세요
        </h1>
      </section>

      <section className="mt-[30px] flex h-[119px] flex-col justify-center gap-3 rounded-[4px] border border-[#e8e6e2] bg-white px-[18px] py-4">
        {guideItems.map((item) => (
          <div key={item} className="flex items-center gap-[10px]">
            <span className="size-1 shrink-0 rounded-full bg-[#8a8078]" />
            <p className="text-[13px] leading-[20.8px] text-[#3d3530]">{item}</p>
          </div>
        ))}
      </section>

      <section className="mt-[47px] flex flex-col gap-[9px]">
        <Button
          onClick={() => navigate("/nfc/loading")}
          className="h-[47px]"
        >
          다시 태그하기
        </Button>
        <Button
          variant={isStaffCalled ? "disabledOutline" : "outlineWhite"}
          onClick={() => navigate("/nfc/staff-called")}
          disabled={isStaffCalled}
          className="h-[47px] tracking-[0.52px]"
        >
          직원 호출
        </Button>
      </section>

      {isStaffCalled && (
        <section className="mt-[14px] rounded-[4px] border border-r border-t border-b border-l-2 border-[#6b3f1f] bg-[#fafaf8] px-4 py-[14px]">
          <p className="pl-6 text-[12px] font-semibold leading-[18px] text-[#0a0908]">
            직원 호출이 접수되었습니다
          </p>
          <p className="mt-[5px] whitespace-pre-line pl-6 text-[12px] leading-[19.8px] text-[#8a8078]">
            잠시만 기다려 주세요.{"\n"}담당 직원이 곧 도와드리겠습니다.
          </p>
        </section>
      )}
    </main>
  );
}

export default NfcFailedPage;
