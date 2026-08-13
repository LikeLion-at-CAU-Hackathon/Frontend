import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// NFC 태깅 후 제품 정보를 불러오는 화면
function NfcLoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      navigate("/nfc/failed", { replace: true });
    }, 1600);

    return () => window.clearTimeout(timerId);
  }, [navigate]);

  return (
    <main className="relative flex min-h-[calc(100dvh_-_env(safe-area-inset-bottom))] items-center justify-center overflow-hidden bg-white px-[22px]">
      <section className="flex w-[186px] -translate-y-[3px] flex-col items-center">
        <h1 className="font-playfair-semibold text-[24px] leading-[18px] text-black">
          MCM Tap Atelier
        </h1>

        <div className="mt-[34px] flex flex-col items-center">
          <div className="flex gap-[6px]">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="loading-dot size-[5px] rounded-full bg-[#6f6f6f]"
                style={{ animationDelay: `${dot * 160}ms` }}
              />
            ))}
          </div>

          <p className="mt-4 whitespace-nowrap text-center text-[10px] leading-[15px] tracking-[1.8px] text-[#6f6f6f]">
            CONNECTING TO YOUR PIECE
          </p>
          <p className="mt-[6px] whitespace-nowrap text-center text-[12px] leading-[18px] text-[#6f6f6f]">
            제품 정보를 불러오고 있습니다.
          </p>
        </div>
      </section>
    </main>
  );
}

export default NfcLoadingPage;
