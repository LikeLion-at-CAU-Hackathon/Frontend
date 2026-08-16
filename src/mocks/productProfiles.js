import { products } from "./products";

export const mapAiAnalysisResponse = (response) => {
  if (!response) return null;

  const curatedLooks = response.curatedLooks ?? response.curated_looks ?? [];

  return {
    currentStyleInterests:
      response.currentStyleInterests ?? response.style_interests ?? [],
    description:
      response.description ?? response.analysisSummary ?? response.analysis_summary ?? "",
    curatedLooks: curatedLooks.map((look) => ({
      id: look.id,
      name: look.name ?? look.title ?? "",
      image: look.image ?? look.imageUrl ?? look.image_url ?? "",
      detailPath: look.detailPath ?? look.detail_path,
    })),
  };
};

const getStorySection = (product, title) =>
  product.story?.sections?.find((section) => section.title === title)?.content;

export const createProductProfile = (product) => {
  if (!product) return null;

  const mockProduct = products.find(
    (item) => String(item.id) === String(product.id),
  );

  return {
    ...product,
    aiAnalysis: mapAiAnalysisResponse(
      product.aiAnalysis ?? mockProduct?.aiAnalysis,
    ),
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
