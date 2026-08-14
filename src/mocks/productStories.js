import hoboBagImage from "../assets/images/products/hobobag.webp";
import materialCanvasImage from "../assets/images/figma/story/story-material-raw-1.png";

export const storyResponse = {
  sections: [
    {
      title: "Collection",
      content: "Visetos Collection",
    },
    {
      title: "Design",
      content: "클래식한 실루엣과 MCM의 시그니처 모노그램을 현대적으로 재해석한 디자인입니다.",
    },
    {
      title: "Signature",
      content: "Leather Hang Tag",
    },
    {
      title: "Heritage",
      content: "MCM Luggage",
    },
  ],
};

export const materialsResponse = [
  {
    id: 1,
    name: "Visetos Pattern",
    location: "Body",
    description: "MCM의 시그니처 Visetos 모노그램 캔버스를 바디에 사용했습니다.",
    image: null,
    order: 1,
  },
  {
    id: 2,
    name: "Natural Nappa Leather",
    location: "Trim",
    description: "천연 나파 가죽을 트림에 사용해 부드러운 질감과 고급스러운 마감을 더했습니다.",
    image: null,
    order: 2,
  },
  {
    id: 3,
    name: "24K Gold-Plated Brass",
    location: "Hardware",
    description: "브라스 하드웨어에 24K 골드 도금을 적용했습니다.",
    image: null,
    order: 3,
  },
  {
    id: 4,
    name: "Suede-Finish Microfiber",
    location: "Lining",
    description: "가방 내부에 스웨이드 마이크로파이버 안감을 사용했습니다.",
    image: null,
    order: 4,
  },
];

export const careGuideResponse = {
  contents: [
    {
      title: "일상 관리",
      content: "지속적인 마찰을 피하고 거친 표면에 제품이 닿지 않도록 주의해주세요.",
    },
    {
      title: "보관",
      content: "제품을 보관할 때는 직사광선과 높은 습도를 피해 서늘하고 건조한 곳에 보관해주세요.",
    },
    {
      title: "가죽 관리",
      content: "가죽 제품이 젖거나 얼룩이 생긴 경우 부드러운 천으로 가볍게 닦아주세요.",
    },
    {
      title: "주의사항",
      content: "비누 또는 솔벤트를 사용하지 마세요. 거친 표면과의 마찰을 피해주세요.",
    },
  ],
};

export const aiDocentRequest = {
  question: "이 가방은 어떤 소재로 만들어졌어?",
};

export const aiDocentResponse = {
  id: 1,
  question: aiDocentRequest.question,
  answer: "제품 정보를 확인했습니다.",
  created_at: "2026-08-12T07:48:38.865078Z",
};

export const aiDocentFaqs = [
  {
    question: "Visetos 소재는 무엇인가요?",
    answer:
      "Visetos는 MCM의 시그니처 모노그램 캔버스입니다. 이 제품에서는 바디에 사용되어 클래식한 패턴과 견고한 인상을 만들어 줍니다.",
  },
  {
    question: "비가 오는 날 사용해도 되나요?",
    answer:
      "가벼운 생활 습기에는 주의해서 사용할 수 있지만, 비에 장시간 노출되는 것은 피해주세요. 젖었을 때는 부드러운 천으로 가볍게 닦고 그늘에서 말려주세요.",
  },
  {
    question: "이 가방에는 무엇이 들어가나요?",
    answer:
      "Mini 사이즈에는 스마트폰, 태블릿, AirPods, AirPods Max 등의 소지품을 수납할 수 있습니다. 노트북은 수납하기 어렵습니다. 가벼운 외출이나 일상적인 약속에 적합한 사이즈입니다. 더 많은 수납이 필요하다면 Large 사이즈도 비교해 보세요.",
  },
  {
    question: "어떻게 관리하나요?",
    answer:
      "지속적인 마찰과 거친 표면 접촉을 피하고, 보관할 때는 직사광선과 높은 습도를 피해 서늘하고 건조한 곳에 두는 것이 좋습니다.",
  },
];

export const aiDocentProductContext = {
  name: "Aren Hobo In Visetos",
  color: "Cognac",
  size: "Small",
  specs: ["10 x 26 x 19 cm", "125-133 cm 스트랩", "Tablet / Mobile Phone / AirPods Max"],
  story: storyResponse.sections,
  materials: materialsResponse.map(({ name, location, description }) => ({
    name,
    location,
    description,
  })),
  care_guide: careGuideResponse.contents,
};

const sectionValue = (title) =>
  storyResponse.sections.find((section) => section.title === title)?.content ?? "";

export const productStory = {
  productId: 8,
  product: {
    name: aiDocentProductContext.name,
    color: aiDocentProductContext.color,
    size: aiDocentProductContext.size,
    price: "₩1,290,000",
    specs: aiDocentProductContext.specs,
  },
  design: {
    eyebrow: "DESIGN & HERITAGE",
    title: aiDocentProductContext.name,
    image: hoboBagImage,
    paragraphs: [
      sectionValue("Design"),
      `${sectionValue("Collection")}의 대표적인 무드와 ${sectionValue(
        "Heritage",
      )}에서 이어진 헤리티지를 함께 담았습니다.`,
      `${sectionValue("Signature")} 디테일이 더해져 MCM 특유의 아이덴티티를 완성합니다.`,
    ],
    highlights: storyResponse.sections.map((section) => ({
      label: section.title.toUpperCase(),
      value: section.content,
    })),
  },
  materials: {
    eyebrow: "MATERIALS & CRAFT",
    title: "Visetos Monogram Canvas",
    image: materialCanvasImage,
    sections: materialsResponse.map((material) => ({
      title: material.name,
      description: material.description,
      location: material.location,
    })),
  },
  care: {
    eyebrow: "CARE GUIDE",
    title: "제품 관리 가이드",
    guides: careGuideResponse.contents.map((guide) => ({
      title: guide.title,
      description: guide.content,
    })),
  },
};

const getSpecValue = (product, labels) => {
  return labels
    .map((label) => product.specs?.find((spec) => spec.label === label)?.value)
    .find(Boolean);
};

export const getAiDocentFaqsForProduct = (product) => [
  {
    question: "주요 소재는 무엇인가요?",
    answer:
      getSpecValue(product, ["MATERIAL", "UPPER", "TYPE"]) ??
      `${product.name}의 주요 소재 정보는 제품 상세 정보를 기준으로 안내해 드립니다.`,
  },
  {
    question: "비가 오는 날 사용해도 되나요?",
    answer:
      "비나 습기에 장시간 노출되는 것은 피해주세요. 젖었을 때는 부드러운 천으로 가볍게 닦고 그늘에서 말려주세요.",
  },
  {
    question: "이 제품의 주요 특징은 무엇인가요?",
    answer:
      getSpecValue(product, ["STORAGE", "DETAIL", "DESIGN", "PATTERN"]) ??
      `${product.collection} 컬렉션의 무드와 ${product.name}의 제품 정보를 함께 확인해 보세요.`,
  },
  {
    question: "어떻게 관리하나요?",
    answer:
      getSpecValue(product, ["CARE"]) ??
      "지속적인 마찰과 거친 표면 접촉을 피하고, 직사광선과 높은 습도를 피해 보관하는 것이 좋습니다.",
  },
];

export const getProductStoryForProduct = (product) => {
  const materialSections = (product.specs ?? [])
    .filter((spec) =>
      ["MATERIAL", "TRIM", "HARDWARE", "PATTERN", "UPPER", "LINING", "INSOLE", "LENS", "FRAME", "TYPE"].includes(
        spec.label,
      ),
    )
    .map((spec, index) => ({
      title: spec.label,
      description: `${spec.value} 정보를 바탕으로 ${product.name}의 소재와 디테일을 확인할 수 있습니다.`,
      location: index === 0 ? "Main" : "Detail",
    }));

  const sections = [
    { title: "Collection", content: `${product.collection} Collection` },
    {
      title: "Design",
      content: `${product.name}은 ${product.collection} 컬렉션의 무드를 담아 제품의 실루엣과 디테일을 보여줍니다.`,
    },
    { title: "Signature", content: product.styleNo },
    { title: "Heritage", content: "MCM Heritage" },
  ];

  return {
    productId: product.id,
    product: {
      name: product.name,
      color: product.color,
      size: product.size,
      price: `₩${product.price.toLocaleString("ko-KR")}`,
      specs: product.specs?.map((spec) => spec.value) ?? [],
    },
    design: {
      eyebrow: "DESIGN & HERITAGE",
      title: product.name,
      image: product.image,
      paragraphs: [
        sections[1].content,
        `${sections[0].content}의 대표적인 분위기와 ${product.category} 카테고리의 기능적 요소를 함께 담았습니다.`,
        `Style No. ${product.styleNo} 기준의 상세 정보를 통해 제품의 특징을 확인할 수 있습니다.`,
      ],
      highlights: sections.map((section) => ({
        label: section.title.toUpperCase(),
        value: section.content,
      })),
    },
    materials: {
      eyebrow: "MATERIALS & CRAFT",
      title: getSpecValue(product, ["MATERIAL", "UPPER", "TYPE"]) ?? product.name,
      image: materialCanvasImage,
      sections: materialSections.length
        ? materialSections
        : [
            {
              title: "Product Detail",
              description: `${product.name}의 상세 정보는 제품 스펙을 기준으로 제공됩니다.`,
              location: "Detail",
            },
          ],
    },
    care: {
      eyebrow: "CARE GUIDE",
      title: "제품 관리 가이드",
      guides: [
        {
          title: "일상 관리",
          description: "지속적인 마찰을 피하고 거친 표면에 제품이 닿지 않도록 주의해주세요.",
        },
        {
          title: "보관",
          description: "직사광선과 높은 습도를 피해 서늘하고 건조한 곳에 보관해주세요.",
        },
        {
          title: "제품별 관리",
          description:
            getSpecValue(product, ["CARE"]) ??
            "오염이나 물기가 생긴 경우 부드러운 천으로 가볍게 닦아주세요.",
        },
        {
          title: "주의사항",
          description: "비누 또는 솔벤트를 사용하지 마세요. 거친 표면과의 마찰을 피해주세요.",
        },
      ],
    },
  };
};
