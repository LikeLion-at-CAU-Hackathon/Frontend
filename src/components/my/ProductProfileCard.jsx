import { Bookmark } from "lucide-react";
import locationIcon from "../../assets/my-location.svg";

const formatPrice = (price) =>
  typeof price === "number" ? `₩${price.toLocaleString("ko-KR")}` : price;

const limitToSentences = (value, maxSentences = 2) => {
  const paragraphs = Array.isArray(value) ? value : [value];
  let remainingSentences = maxSentences;

  const limitedParagraphs = paragraphs.flatMap((paragraph) => {
    if (remainingSentences <= 0 || typeof paragraph !== "string") return [];

    const sentences = paragraph.match(/[^.!?。！？]+(?:[.!?。！？]+|$)/g) ?? [];
    const visibleSentences = sentences.slice(0, remainingSentences);
    remainingSentences -= visibleSentences.length;

    const limitedParagraph = visibleSentences.join("").trim();
    return limitedParagraph ? [limitedParagraph] : [];
  });

  return Array.isArray(value) ? limitedParagraphs : (limitedParagraphs[0] ?? "");
};

function ProductSummary({ product, onUnsave }) {
  const collection = product.collection?.endsWith("COLLECTION")
    ? product.collection
    : `${product.collection} COLLECTION`;
  const option = product.option ?? `${product.color} · ${product.size}`;
  const store = product.store ?? product.stocks?.[0]?.branch_name ?? "MCM 신세계 강남점";

  return (
    <section className="relative flex w-full items-center gap-[14px]">
      <div className="flex size-[112px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#ede8e2]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="size-full object-contain"
          />
        ) : (
          <span className="text-[12px] leading-[18px] text-[#8a8078]">Image</span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-[6px] pr-5">
        <div>
          <p className="truncate text-[9px] leading-[13.5px] tracking-[0.9px] text-[#8a8078]">
            {collection}
          </p>
          <h1 className="font-playfair-semibold mt-0.5 truncate text-[15px] leading-[19.5px] text-[#0a0908]">
            {product.name}
          </h1>
          <p className="truncate text-[11px] leading-[16.5px] text-[#8a8078]">{option}</p>
        </div>
        <p className="text-[11px] font-medium leading-[19.5px] text-[#0a0908]">
          {formatPrice(product.price)}
        </p>
        <div className="flex min-w-0 items-center gap-1 text-[#8a8078]">
          <img src={locationIcon} alt="" className="size-4 shrink-0" aria-hidden="true" />
          <p className="truncate text-[11px] leading-[19.5px]">{store}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onUnsave}
        className="absolute right-0 top-3 flex size-6 items-center justify-center text-[#0a0908]"
        aria-label="My Selection에서 제거"
      >
        <Bookmark size={16} strokeWidth={1.8} fill="currentColor" aria-hidden="true" />
      </button>
    </section>
  );
}

function AiAnalysis({ analysis }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-[14px] font-semibold leading-[18px] text-black">AI ANALYSIS</h2>
      {analysis ? (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-medium leading-[18px]">Current Style Interests</h3>
            <div className="flex w-full gap-1">
              {analysis.currentStyleInterests.map((interest) => (
                <span
                  key={interest}
                  className="flex h-[26px] min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-[12px] border border-[#e5e0da] bg-[#6b3f1f] px-1 text-[11px] leading-[18px] text-white"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <h3 className="text-[14px] font-medium leading-[18px]">AI Curated Looks</h3>
            <p className="w-full min-w-0 break-keep [overflow-wrap:break-word] text-[12px] leading-[19.5px] text-black">
              {analysis.description}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {analysis.curatedLooks.map((look) => (
                <div key={look.id} className="flex min-w-0 flex-col items-center gap-2">
                  {look.image ? (
                    <img
                      src={look.image}
                      alt={look.name}
                      className="h-20 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-full items-center justify-center bg-[#ede8e2] text-[12px] leading-[18px] text-[#8a8078]">
                      Image
                    </div>
                  )}
                  <p className="w-full break-keep [overflow-wrap:break-word] text-center text-[12px] font-medium leading-[18px] text-black">
                    {look.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="py-2 text-[12px] leading-[19.5px] text-[#8a8078]">
          아직 저장된 분석 결과가 없습니다.
          <br />
          하단 AI 탭에서 시작하세요.
        </p>
      )}
    </section>
  );
}

function BrandStory({ story }) {
  const items = [
    { label: "Design", value: limitToSentences(story.design) },
    { label: "Material", value: limitToSentences(story.material) },
    { label: "Care", value: limitToSentences(story.care) },
  ];

  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-[14px] font-semibold leading-[19.5px] text-black">Brand Story</h2>
      <div className="grid grid-cols-3 gap-[9px]">
        {items.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-col items-center gap-2">
            <h3 className="w-full border-b border-[#d5b38b] text-center text-[12px] font-medium leading-[21px]">
              {item.label}
            </h3>
            {Array.isArray(item.value) ? (
              item.value.map((paragraph, index) => (
                <p
                  key={`${item.label}-${index}`}
                  className="w-full min-w-0 break-keep [overflow-wrap:break-word] text-[12px] leading-[19.5px] text-black"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="w-full min-w-0 break-keep [overflow-wrap:break-word] text-[12px] leading-[19.5px] text-black">
                {item.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductProfileCard({ profile, captureRef, onUnsave }) {
  return (
    <article
      ref={captureRef}
      className="mx-5 flex flex-col items-center gap-6 rounded-[12px] border border-[rgba(42,33,26,0.05)] bg-[#fffdfb] p-4"
    >
      <ProductSummary product={profile} onUnsave={onUnsave} />
      <AiAnalysis analysis={profile.aiAnalysis} />
      <div className="h-px w-full bg-[#d9d9d9]" />
      <BrandStory story={profile.brandStory} />
    </article>
  );
}

export default ProductProfileCard;
