import { products } from "./products";

export const mapAiAnalysisResponse = (response) => {
  if (!response) return null;

  const styleInterests =
    response.currentStyleInterests ??
    response.style_interests ??
    response.style_chips ??
    response.keywords ??
    [];
  const curatedLooks = response.curatedLooks ?? response.curated_looks ?? response.looks ?? [];

  return {
    currentStyleInterests: styleInterests.map((interest) => (
      interest?.label ?? interest?.name ?? interest
    )),
    description:
      response.description ??
      response.summary ??
      response.analysisSummary ??
      response.analysis_summary ??
      "",
    curatedLooks: curatedLooks.map((look) => ({
      id: look.id,
      name: look.name ?? look.title ?? "",
      image: look.image ?? look.imageUrl ?? look.image_url ?? "",
      detailPath: look.detailPath ?? look.detail_path,
    })),
  };
};

export const createProductProfile = (product) => {
  if (!product) return null;

  const mockProduct = products.find(
    (item) => String(item.id) === String(product.id),
  );
  const story = product.story ?? mockProduct?.story;
  const careGuide = product.careGuide ?? mockProduct?.careGuide ?? [];
  const designParagraphs = story?.design?.paragraphs?.length
    ? story.design.paragraphs
    : [
        story?.sections?.find((section) => section.title === "Design")?.content,
      ].filter(Boolean);

  return {
    ...product,
    aiAnalysis: mapAiAnalysisResponse(product.aiAnalysis),
    brandStory: {
      design: designParagraphs,
      material:
        product.materials?.[0]?.description ??
        product.story?.materials?.title ??
        "엄선된 소재로 완성했습니다.",
      care: careGuide.map((guide) => guide.content).filter(Boolean),
      aiDocent: product.aiDocentFaqs ?? [],
    },
  };
};
