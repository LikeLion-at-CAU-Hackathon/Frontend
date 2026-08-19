import { products } from "./products";

export const mapAiAnalysisResponse = (response) => {
  if (!response) return null;

  const profile = response.profile ?? response;
  const styleInterests =
    profile.currentStyleInterests ??
    profile.style_interests ??
    profile.style_chips ??
    [];
  const curatedLooks =
    profile.curatedLooks ??
    profile.curated_looks ??
    profile.looks ??
    [];

  return {
    currentStyleInterests: styleInterests
      .map((interest) => interest?.label ?? interest?.name ?? interest)
      .filter(Boolean),
    description:
      profile.summary ??
      profile.description ??
      profile.analysisSummary ??
      profile.analysis_summary ??
      "",
    curatedLooks: curatedLooks.map((look) => ({
      id: look.id,
      name: look.name ?? look.title ?? "",
      image: look.image ?? look.imageUrl ?? look.image_url ?? "",
      detailPath:
        look.detailPath ??
        look.detail_path ??
        (look.id == null ? undefined : `/ai/style-recommendation/${look.id}`),
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
  const hasApiAnalysis = Object.prototype.hasOwnProperty.call(product, "aiAnalysis");

  return {
    ...product,
    aiAnalysis: mapAiAnalysisResponse(
      hasApiAnalysis ? product.aiAnalysis : mockProduct?.aiAnalysis,
    ),
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
