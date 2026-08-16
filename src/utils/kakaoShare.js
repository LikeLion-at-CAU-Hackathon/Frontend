const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
const KAKAO_SDK_INTEGRITY =
  "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";

let sdkPromise;

export class KakaoShareError extends Error {
  constructor(code, message, cause) {
    super(message, { cause });
    this.name = "KakaoShareError";
    this.code = code;
  }
}

const loadKakaoSdk = () => {
  if (window.Kakao) return Promise.resolve(window.Kakao);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${KAKAO_SDK_URL}"]`);

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.Kakao), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new KakaoShareError("SDK_LOAD_FAILED", "카카오 SDK를 불러오지 못했습니다.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.integrity = KAKAO_SDK_INTEGRITY;
    script.onload = () => {
      if (window.Kakao) {
        resolve(window.Kakao);
        return;
      }
      reject(new KakaoShareError("SDK_LOAD_FAILED", "카카오 SDK가 준비되지 않았습니다."));
    };
    script.onerror = () =>
      reject(new KakaoShareError("SDK_LOAD_FAILED", "카카오 SDK를 불러오지 못했습니다."));
    document.head.appendChild(script);
  }).catch((error) => {
    sdkPromise = undefined;
    throw error;
  });

  return sdkPromise;
};

export const shareProductWithKakao = async (product) => {
  const javascriptKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY?.trim();
  if (!javascriptKey) {
    throw new KakaoShareError(
      "KEY_MISSING",
      "카카오 공유 설정이 필요합니다. VITE_KAKAO_JAVASCRIPT_KEY를 확인해 주세요.",
    );
  }

  const Kakao = await loadKakaoSdk();
  if (!Kakao) {
    throw new KakaoShareError("SDK_LOAD_FAILED", "카카오 SDK를 사용할 수 없습니다.");
  }

  try {
    if (!Kakao.isInitialized()) Kakao.init(javascriptKey);
  } catch (error) {
    throw new KakaoShareError(
      "SDK_INIT_FAILED",
      "카카오 공유를 초기화하지 못했습니다. JavaScript 키와 등록 도메인을 확인해 주세요.",
      error,
    );
  }

  if (!Kakao.Share?.sendDefault) {
    throw new KakaoShareError(
      "SHARE_API_UNAVAILABLE",
      "현재 카카오 SDK에서 공유 기능을 사용할 수 없습니다.",
    );
  }

  const pageUrl = `${window.location.origin}/my/saved-products/${product.id}`;
  const imageUrl = new URL(product.image, window.location.origin).href;
  const option = product.option ?? `${product.color ?? ""} · ${product.size ?? ""}`;
  const price =
    typeof product.price === "number"
      ? `₩${product.price.toLocaleString("ko-KR")}`
      : product.price;

  try {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: product.name,
        description: [option, price].filter(Boolean).join("\n"),
        imageUrl,
        link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
      },
      buttons: [
        {
          title: "제품 프로필 보기",
          link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
        },
      ],
    });
  } catch (error) {
    throw new KakaoShareError(
      "SHARE_REQUEST_FAILED",
      "카카오톡 공유를 실행하지 못했습니다. 등록 도메인과 제품 링크를 확인해 주세요.",
      error,
    );
  }
};
