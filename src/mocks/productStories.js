import hoboBagImage from "../assets/images/products/hobobag.webp";
import materialCanvasImage from "../assets/images/figma/story/story-material-raw-1.png";

export const productStory = {
  productId: 8,
  design: {
    eyebrow: "DESIGN & HERITAGE",
    title: "Aren Hobo In Visetos",
    image: hoboBagImage,
    paragraphs: [
      "클래식한 슬로치드 실루엣을 현대적으로 재해석한 Aren Hobo는 부드러움과 구조감의 이상적인 균형을 보여줍니다.",
      "MCM 헤리티지 러기지에서 가져온 디자인 요소인 탈부착 가능한 가죽 행택과 로고가 각인된 패드락이 더해져 Aren Hobo만의 디자인을 완성합니다.",
      "또한 조절 가능한 가죽 스트랩이 적용된 비세토스 호보백으로, 클래식한 실루엣과 MCM의 헤리티지 러기지 디테일을 현대적으로 담아낸 디자인입니다.",
    ],
    highlights: [
      { label: "COLLECTION", value: "Visetos Collection" },
      { label: "DESIGN", value: "Softness & Structure" },
      { label: "SIGNATURE", value: "Leather Hang Tag" },
      { label: "HERITAGE", value: "MCM Luggage" },
    ],
  },
  materials: {
    eyebrow: "MATERIALS & CRAFT",
    title: "Visetos Monogram Canvas",
    image: materialCanvasImage,
    sections: [
      {
        title: "Visetos 패턴",
        description:
          "MCM의 시그니처 Visetos 모노그램 캔버스를 바디에 사용했습니다. 제품의 주요 소재로, 클래식한 모노그램 패턴이 Aren Hobo의 전체적인 디자인을 완성합니다.",
      },
      {
        title: "Natural Nappa Leather",
        description:
          "천연 나파 가죽을 트림에 사용했습니다. 가죽 행택과 패드락 주변의 디테일에도 가죽 소재가 적용됩니다.",
      },
      {
        title: "24K Gold-Plated Brass",
        description:
          "브라스 하드웨어에 24K 골드 도금을 적용했습니다. 패드락과 지퍼 등의 금속 장식에 사용됩니다.",
      },
      {
        title: "Suede-Finish Microfiber",
        description:
          "가방 내부에는 스웨이드 마감 마이크로파이버 안감을 사용했습니다. 부드러운 스웨이드 질감의 마감으로 내부를 구성합니다.",
      },
    ],
  },
  care: {
    eyebrow: "CARE GUIDE",
    title: "제품 관리 가이드",
    guides: [
      {
        title: "일상 관리",
        description:
          "지속적인 마찰을 피하고, 거친 표면에 제품이 긁히거나 마찰되지 않도록 주의해 주세요.",
      },
      {
        title: "보관",
        description:
          "제품을 보호용 더스트 백에 넣어 직사광선과 밝은 빛을 피해 서늘하고 건조한 곳에 보관해 주세요.",
      },
      {
        title: "가죽 관리",
        description:
          "가죽 제품이 젖거나 얼룩지지 않도록 주의하세요. 표면이 젖거나 오염되었을 경우, 보풀이 없는 밝은 색상의 흡수성 천으로 닦아 말려주세요.",
      },
      {
        title: "주의사항",
        description:
          "비누 또는 솔벤트는 사용하지 마세요. 거친 표면과의 마찰을 피하고, 제품이 긁히지 않도록 주의하세요. 적절히 관리하면 시간이 지나면서 가죽에 자연스러운 멋이 더해집니다.",
      },
      {
        title: "제품 문의",
        description:
          "제품에 대한 문의 사항이 있으시면 MCM 매장이나 고객 서비스 팀에 언제든지 연락해 주세요.",
      },
    ],
  },
};
