import { looks } from "../pages/ai/styleProfileData";

const aiAnalysisByProductId = {
  8: {
    currentStyleInterests: ["Warm Tones", "Compact Size", "Classic Styling"],
    description:
      "Cognac 톤 제품을 반복 탐색하신 성향을 바탕으로 Monogram Daily, Modern Classic, Sporty Casual 3가지 룩을 추천드려요.",
    curatedLooks: looks.map(({ id, name, image, detailPath }) => ({
      id,
      name,
      image,
      detailPath,
    })),
  },
};

const getStorySection = (product, title) =>
  product.story?.sections?.find((section) => section.title === title)?.content;

export const createProductProfile = (product) => {
  if (!product) return null;

  return {
    ...product,
    aiAnalysis: aiAnalysisByProductId[product.id] ?? null,
    brandStory: {
      design:
        getStorySection(product, "Design") ??
        product.story?.design?.paragraphs?.[0] ??
        "MCM의 헤리티지를 현대적으로 재해석한 디자인입니다.",
      material:
        product.materials?.[0]?.description ??
        product.story?.materials?.title ??
        "엄선된 소재로 완성했습니다.",
      care:
        product.careGuide?.[0]?.content ??
        "부드러운 천으로 가볍게 닦아 관리하세요.",
      aiDocent: product.aiDocentFaqs ?? [],
    },
  };
};

