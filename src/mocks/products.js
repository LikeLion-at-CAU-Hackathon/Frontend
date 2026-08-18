import materialCanvasImage from "../assets/images/figma/story/story-material-raw-1.png";
import hoboGoldBrassMaterialImage from "../assets/images/figma/story/materials/hobo-gold-brass.png";
import hoboNappaLeatherMaterialImage from "../assets/images/figma/story/materials/hobo-nappa-leather.png";
import hoboSuedeMicrofiberMaterialImage from "../assets/images/figma/story/materials/hobo-suede-microfiber.png";
import beltImage from "../assets/images/products/belt.webp";
import eauDeParfumImage from "../assets/images/products/eau-de-parfum.webp";
import hoboBagImage from "../assets/images/products/hobobag.webp";
import hoboBagLargeImage from "../assets/images/products/hobobag_large.webp";
import scarfImage from "../assets/images/products/scarf.webp";
import sneakersImage from "../assets/images/products/sneakers.webp";
import sunglassesImage from "../assets/images/products/sunglasses.webp";
import tshirtImage from "../assets/images/products/tshirt.webp";
import walletImage from "../assets/images/products/wallet.webp";
import modernClassicLookImage from "../assets/images/lookbook/modernclassiclook.png";
import monogramDailyLookImage from "../assets/images/lookbook/monogramdailylook.png";
import sportyCasualLookImage from "../assets/images/lookbook/sportycasuallook.png";

export const products = [
  {
    id: 1,
    category: "WALLET",
    collection: "VISETOS",
    name: "Aren 비세토스 3단 지갑",
    price: 450000,
    color: "Cognac",
    colors: ["Cognac"],
    size: "S",
    stock: 4,
    styleNo: "MYSFSTA02CO001",
    image: walletImage,
    images: [walletImage],
    imageView: { scale: 1.9, translateY: "-80px" },
    stocks: [{ branch_name: "MCM 신세계 본점", quantity: 4 }],
    variants: [
      {
        id: 101,
        productId: 1,
        name: "Aren 비세토스 3단 지갑",
        color: "Cognac",
        size: "S",
        image: walletImage,
        dimensions: "3 x 12 x 9 cm",
        strap: "-",
        storage: "Bill Sleeve / Zip Compartment / 6 Card Slots",
        price: 450000,
        stock: 4,
        stockLabel: "4개 (현재 매장)",
      },
    ],
    specs: [
      { label: "DIMENSIONS", value: "3 x 12 x 9 cm" },
      { label: "MATERIAL", value: "Visetos Monogram Canvas" },
      { label: "TRIM", value: "Natural Nappa Leather" },
      { label: "CLOSURE", value: "Snap Closure" },
      { label: "CARD SLOTS", value: "6" },
      { label: "STORAGE", value: "Bill Sleeve / Zip Compartment" },
    ],
    materials: [
      {
        id: 1,
        name: "Visetos Monogram Canvas",
        location: "Body",
        description: "비세토스 모노그램 캔버스를 바디에 사용했습니다.",
      },
      {
        id: 2,
        name: "Natural Leather",
        location: "Trim",
        description: "천연 가죽으로 트림을 마감했습니다.",
      },
      {
        id: 3,
        name: "Gold-Plated Metal Hardware",
        location: "HARDWARE",
        description: "로고 브라스 장식 플레이트와 스냅 클로저에골드 도금 메탈 하드웨어를 적용했습니다.",
      },
      {
        id: 4,
        name: "Fabric Lining",
        location: "HARDWARE",
        description: "카드 슬롯에 패브릭 안감을 적용했습니다.",
      },
    ],
    careGuide: [
      { title: "일상 관리", content: "지속적인 마찰을 피하고, 거친 표면에 제품이 긁히거나 마찰되지 않도록 주의해 주세요." },
      { title: "보관", content: "제품을 보호용 더스트 백에 넣어 직사광선과 밝은 빛을 피해 서늘하고 건조한 곳에 보관해 주세요." },
      { title: "가죽 관리", content: "가죽 제품이 젖거나 얼룩지지 않도록 주의하세요. 표면이 젖거나 오염되었을 경우, 보풀이 없는 밝은 색상의 흡수성 천으로 닦아 말려주세요. " },
      { title: "주의사항", content: "비누 또는 솔벤트는 사용하지 마세요. 거친 표면과의 마찰을 피하고, 제품이 긁히지 않도록 주의하세요. 적절히 관리하면 시간이 지나면서 가죽에 자연스러운 멋이 더해집니다." },
      { title: "제품 문의", content: "제품에 대한 문의 사항이 있으시면 MCM 매장이나 고객 서비스 팀에 언제든지 연락해 주세요."},
    ],
    aiDocentFaqs: [
      {
        question: "이 지갑은 어떤 소재인가요?",
        answer: "바디는 비세토스 모노그램 캔버스, 트림은 천연 나파 가죽으로 구성된 지갑입니다.",
      },
      {
        question: "카드는 얼마나 들어가나요?",
        answer: "카드 슬롯 6개와 지폐 수납부, 지퍼 수납부가 있어 일상 소지품을 정리하기 좋습니다.",
      },
      {
        question: "어떻게 관리하나요?",
        answer: "마찰과 습기를 피하고, 오염 시 부드러운 마른 천으로 가볍게 닦아주세요.",
      },
    ],
    story: {
      sections: [
        { title: "Collection", content: "Visetos Collection" },
        { title: "Design", content: "VISETOS MONOGRAM비세토스 모노그램 캔버스\nLOGO BRASS PLATEMCM 로고 브라스 장식 플레이트\nSNAP CLOSURE스냅 클로저TRI-FOLD트라이폴드 구조" },
        { title: "Signature", content: "Visetos Monogram" },
        { title: "Heritage", content: "MCM Leather Goods" },
      ],
      design: {
        title: "헤리티지 하드웨어로 완성한 모노그램 지갑",
        paragraphs: [
          "비세토스 모노그램 캔버스에MCM 로고 브라스 플레이트와 스냅 클로저를 더했습니다.",
          "트라이폴드 구조로 구성된 지갑으로,아이코닉한 MCM 로고와 헤리티지 하드웨어를 통해MCM의 디자인 아이덴티티를 보여줍니다.",
        ],
      },
      materials: { title: "Visetos Monogram Canvas" },
    },
  },
  {
    id: 2,
    category: "SCARF",
    collection: "VISETOS",
    name: "모노그램 프린트 쁘띠 실크 스카프",
    price: 175000,
    color: "Cognac",
    colors: ["Cognac"],
    size: "Free",
    stock: 7,
    styleNo: "MEFDAMM11CO001",
    image: scarfImage,
    images: [scarfImage],
    imageView: { scale: 1.2, translateY: "-10px" },
    stocks: [{ branch_name: "MCM 신세계 본점", quantity: 7 }],
    variants: [
      {
        id: 201,
        productId: 2,
        name: "모노그램 프린트 쁘띠 실크 스카프",
        color: "Cognac",
        size: "Free",
        image: scarfImage,
        dimensions: "8 x 120 cm",
        strap: "-",
        storage: "Reversible Silk Scarf",
        price: 175000,
        stock: 7,
        stockLabel: "7개 (현재 매장)",
      },
    ],
    specs: [
      { label: "DIMENSIONS", value: "8 x 120 cm" },
      { label: "MATERIAL", value: "100% Organic Silk" },
      { label: "DESIGN", value: "Reversible" },
      { label: "PATTERN", value: "Visetos Monogram" },
      { label: "CARE", value: "Dry Clean Only" },
      { label: "MADE IN", value: "Italy" },
    ],
    materials: [
      {
        id: 1,
        name: "Organic Silk 100%",
        location: "Material",
        description: "100%오가닉 이탈리안 실크 100%를 사용했습니다.",
      },
      {
        id: 2,
        name: "Hand-Sewn",
        location: "Construction",
        description: "수작업으로 봉제했습니다.",
      },
      {
        id: 3,
        name: "Visetos Monogram Print",
        location: "Print",
        description: "메인 측면에 비세토스 모노그램 프린트를 적용했습니다.",
      },
      {
        id: 4,
        name: "MCM Logo & Stripe Print",
        location: "Reverse",
        description: "반대쪽 면에 MCM 로고와 대비되는 스트라이프 프린트를 적용했습니다.",
      },
    ],
    careGuide: [
      { title: "드라이클리닝 전용", content: "스카프는 드라이클리닝으로만 관리해 주세요.물세탁은 피하고, 제품의 소재 특성에 맞는 방식으로 관리하는 것을 권장합니다." },
      { title: "더스트 백에 넣어 보관", content: "제공된 보호용 더스트 백에 넣어 직사광선이나 밝은 조명을 피해 서늘하고 건조한 곳에 보관해 주세요." },
      { title: "젖거나 오염되지 않도록 주의", content: "표면이 젖거나 오염되었을 경우보풀이 없는 밝은 색상의 흡수성 천으로 닦아 말려주세요." },
      { title: "비누·솔벤트 사용 금지", content: "비누 또는 솔벤트를 사용하지 마세요." },
      { title: "거친 표면과의 마찰 주의", content: "제품이 거친 표면에 긁히거나 마찰되지 않도록 주의해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "스카프 소재는 무엇인가요?",
        answer: "100% 오가닉 실크 소재이며, 비세토스 모노그램 프린트가 적용된 쁘띠 스카프입니다.",
      },
      {
        question: "어떻게 스타일링할 수 있나요?",
        answer: "목에 가볍게 두르거나 가방 핸들에 묶어 포인트 액세서리로 활용할 수 있습니다.",
      },
      {
        question: "세탁은 어떻게 하나요?",
        answer: "실크 소재이므로 드라이클리닝을 권장합니다.",
      },
    ],
    story: {
      sections: [
        { title: "Collection", content: "Visetos Collection" },
        { title: "Design", content: "비세토스 모노그램을 슬림한 실크 스카프에 담은 디자인입니다." },
        { title: "Signature", content: "Reversible Silk" },
        { title: "Heritage", content: "MCM Accessories" },
      ],
      design: {
        title: "두 가지 아이콘을 담은 리버서블 디자인",
        paragraphs: [
          "앞면에는 비세토스 모노그램 프린트,반대쪽 면에는 MCM 로고와 대비되는 스트라이프 컬러 블록 모티프를 적용했습니다.",
          "하나의 스카프로 두 가지 디자인을 즐길 수 있으며,스카프·리본 매듭·가방 핸들 등 다양한 방식으로 스타일링할 수 있습니다.",
        ],
      },
      materials: { title: "Organic Silk" },
    },
  },
  {
    id: 3,
    category: "CLOTHING",
    collection: "ESSENTIAL",
    name: "에센셜 로고 프린트 티셔츠",
    price: 270000,
    color: "Black",
    colors: ["Black"],
    size: "M",
    stock: 5,
    styleNo: "MHTESBC01BK00M",
    image: tshirtImage,
    images: [tshirtImage],
    imageView: { scale: 1.02 },
    stocks: [{ branch_name: "MCM 신세계 본점", quantity: 5 }],
    variants: ["S", "M", "L", "XL", "2XL", "3XL"].map((size, index) => ({
      id: 301 + index,
      productId: 3,
      name: "에센셜 로고 프린트 티셔츠",
      color: "Black",
      size,
      image: tshirtImage,
      dimensions: size,
      strap: "Regular Fit",
      storage: "100% Organic Cotton",
      price: 270000,
      stock: 5,
      stockLabel: "5개 (현재 매장)",
    })),
    specs: [
      { label: "MATERIAL", value: "100% Organic Cotton" },
      { label: "FIT", value: "Regular Fit" },
      { label: "GENDER", value: "Unisex" },
      { label: "NECKLINE", value: "Rib Knit Collar" },
      { label: "DETAIL", value: "Metallic Laurel Logo Print" },
      { label: "CARE", value: "Hand Wash / Dry Clean" },
    ],
    materials: [
      {
        id: 1,
        name: "Organic Cotton",
        location: "Body",
        description: "100% 오가닉 코튼 소재로 편안한 착용감을 제공합니다.",
      },
      {
        id: 2,
        name: "Metallic Laurel Logo Print",
        location: "Front",
        description: "전면에 메탈릭 로렐 로고 프린트를 적용했습니다.",
      },
    ],
    careGuide: [
      { title: "일상 관리", content: "프린트 부분이 거친 표면에 강하게 마찰되지 않도록 주의해주세요." },
      { title: "세탁", content: "손세탁 또는 드라이클리닝을 권장합니다." },
      { title: "건조", content: "직사광선을 피해 그늘에서 건조해주세요." },
      { title: "주의사항", content: "표백제와 고온 건조기 사용을 피해주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "티셔츠 소재는 무엇인가요?",
        answer: "100% 오가닉 코튼 소재의 유니섹스 레귤러 핏 티셔츠입니다.",
      },
      {
        question: "핏은 어떤가요?",
        answer: "남녀 모두 착용 가능한 레귤러 핏입니다.",
      },
      {
        question: "세탁은 어떻게 하나요?",
        answer: "프린트 보호를 위해 손세탁 또는 드라이클리닝을 권장합니다.",
      },
    ],
    story: {
      sections: [
        { title: "Collection", content: "Essential Collection" },
        { title: "Design", content: "미니멀한 실루엣에 MCM 로고 디테일을 더한 티셔츠입니다." },
        { title: "Signature", content: "Metallic Laurel Logo" },
        { title: "Heritage", content: "MCM Ready-to-Wear" },
      ],
      design: {
        paragraphs: [
          "에센셜 로고 프린트 티셔츠는 일상에서 쉽게 착용할 수 있는 기본 실루엣에 MCM의 로고 디테일을 더한 제품입니다.",
          "100% 오가닉 코튼 소재와 레귤러 핏으로 편안한 착용감을 제공합니다.",
          "메탈릭 로렐 로고 프린트가 심플한 스타일 안에서 브랜드의 존재감을 보여줍니다.",
        ],
      },
      materials: { title: "Organic Cotton" },
    },
  },
  {
    id: 4,
    category: "SUNGLASSES",
    collection: "EYEWEAR",
    name: "오발 선글라스",
    price: 260000,
    color: "Pink",
    colors: ["Pink", "Black"],
    size: "Free",
    stock: 3,
    styleNo: "MEGGSMM06PK001",
    image: sunglassesImage,
    images: [sunglassesImage],
    imageView: { scale: 1.38, translateY: "-30px" },
    stocks: [{ branch_name: "MCM 신세계 본점", quantity: 3 }],
    variants: [
      {
        id: 401,
        productId: 4,
        name: "오발 선글라스",
        color: "Pink",
        size: "Free",
        image: sunglassesImage,
        dimensions: "53 - 16 - 145 mm",
        strap: "-",
        storage: "Brown Pink Gradient Lens",
        price: 260000,
        stock: 3,
        stockLabel: "3개 (현재 매장)",
      },
    ],
    specs: [
      { label: "SIZE", value: "53 - 16 - 145 mm" },
      { label: "LENS", value: "Brown Pink Gradient" },
      { label: "FRAME", value: "Milky Light Pink" },
      { label: "MATERIAL", value: "Acetate" },
      { label: "DETAIL", value: "MCM Logo Temple" },
      { label: "MADE IN", value: "China" },
    ],
    materials: [
      {
        id: 1,
        name: "Acetate",
        location: "Frame",
        description: "아세테이트 프레임으로 가볍고 안정적인 착용감을 제공합니다.",
      },
      {
        id: 2,
        name: "Gradient Lens",
        location: "Lens",
        description: "브라운 핑크 그라데이션 렌즈를 적용했습니다.",
      },
    ],
    careGuide: [
      { title: "일상 관리", content: "렌즈 표면은 전용 클리너나 부드러운 천으로 닦아주세요." },
      { title: "보관", content: "사용하지 않을 때는 케이스에 넣어 보관해주세요." },
      { title: "프레임 관리", content: "고온 환경에 오래 두지 않도록 주의해주세요." },
      { title: "주의사항", content: "렌즈를 거친 천으로 문지르지 마세요." },
    ],
    aiDocentFaqs: [
      {
        question: "프레임 소재는 무엇인가요?",
        answer: "아세테이트 프레임과 브라운 핑크 그라데이션 렌즈가 적용된 선글라스입니다.",
      },
      {
        question: "사이즈는 어떻게 되나요?",
        answer: "렌즈-브릿지-템플 기준 53 - 16 - 145 mm 사이즈입니다.",
      },
      {
        question: "어떻게 보관하나요?",
        answer: "렌즈 보호를 위해 사용하지 않을 때는 케이스에 넣어 보관해주세요.",
      },
    ],
    story: {
      sections: [
        { title: "Collection", content: "Eyewear Collection" },
        { title: "Design", content: "부드러운 오발 프레임에 로고 템플 디테일을 더한 선글라스입니다." },
        { title: "Signature", content: "MCM Logo Temple" },
        { title: "Heritage", content: "MCM Eyewear" },
      ],
      design: {
        paragraphs: [
          "오발 선글라스는 부드러운 곡선형 프레임과 은은한 그라데이션 렌즈가 조화를 이루는 아이웨어입니다.",
          "템플의 MCM 로고 디테일이 브랜드의 시그니처를 간결하게 보여줍니다.",
          "밀키 라이트 핑크 프레임으로 얼굴에 산뜻한 포인트를 더할 수 있습니다.",
        ],
      },
      materials: { title: "Acetate Frame" },
    },
  },
  {
    id: 5,
    category: "FRAGRANCE",
    collection: "MCM FRAGRANCE",
    name: "MCM 오 드 퍼퓸",
    price: 141000,
    color: "Cognac",
    colors: ["Cognac"],
    size: "75ml",
    stock: 8,
    styleNo: "MPFBSMM03CO001",
    image: eauDeParfumImage,
    images: [eauDeParfumImage],
    imageView: { scale: 1.38, translateY: "-30px" },
    stocks: [{ branch_name: "MCM 신세계 본점", quantity: 8 }],
    variants: [
      {
        id: 501,
        productId: 5,
        name: "MCM 오 드 퍼퓸",
        color: "Cognac",
        size: "30ml",
        image: eauDeParfumImage,
        dimensions: "30 ml",
        strap: "-",
        storage: "Eau de Parfum",
        price: 94000,
        stock: 4,
        stockLabel: "4개 (현재 매장)",
      },
      {
        id: 502,
        productId: 5,
        name: "MCM 오 드 퍼퓸",
        color: "Cognac",
        size: "50ml",
        image: eauDeParfumImage,
        dimensions: "50 ml",
        strap: "-",
        storage: "Eau de Parfum",
        price: 118000,
        stock: 6,
        stockLabel: "6개 (현재 매장)",
      },
      {
        id: 503,
        productId: 5,
        name: "MCM 오 드 퍼퓸",
        color: "Cognac",
        size: "75ml",
        image: eauDeParfumImage,
        dimensions: "75 ml",
        strap: "-",
        storage: "Eau de Parfum",
        price: 141000,
        stock: 8,
        stockLabel: "8개 (현재 매장)",
      },
    ],
    specs: [
      { label: "TYPE", value: "Eau de Parfum / Unisex" },
      { label: "VOLUME", value: "75 ml" },
      { label: "TOP NOTES", value: "Raspberry / Apricot" },
      { label: "MIDDLE NOTES", value: "Jasmine / White Peony / Violet Leaf" },
      { label: "BASE NOTES", value: "White Moss / Vanilla / Sandalwood / Ambrox" },
      { label: "MADE IN", value: "France" },
    ],
    materials: [
      {
        id: 1,
        name: "Raspberry and Apricot",
        location: "Top Notes",
        description: "라즈베리와 애프리콧의 산뜻한 첫 향으로 시작합니다.",
      },
      {
        id: 2,
        name: "Jasmine, White Peony, Violet Leaf",
        location: "Middle Notes",
        description: "플로럴 노트가 중심을 이루며 부드러운 인상을 더합니다.",
      },
      {
        id: 3,
        name: "White Moss, Vanilla, Sandalwood, Ambrox",
        location: "Base Notes",
        description: "화이트 모스와 바닐라, 샌달우드가 따뜻한 잔향을 남깁니다.",
      },
    ],
    careGuide: [
      { title: "사용", content: "맥박이 뛰는 부위에 가볍게 분사해주세요." },
      { title: "보관", content: "직사광선과 고온을 피해 서늘한 곳에 보관해주세요." },
      { title: "주의사항", content: "눈가나 손상된 피부에 직접 분사하지 마세요." },
      { title: "향 유지", content: "분사 후 문지르지 않으면 향의 구조가 더 자연스럽게 유지됩니다." },
    ],
    aiDocentFaqs: [
      {
        question: "향은 어떤 느낌인가요?",
        answer: "라즈베리와 애프리콧의 산뜻함, 플로럴 미들 노트, 바닐라와 샌달우드의 따뜻한 잔향이 어우러진 향입니다.",
      },
      {
        question: "용량은 어떤 게 있나요?",
        answer: "목업 기준으로 30ml, 50ml, 75ml 옵션이 있으며 사이즈별 가격이 다릅니다.",
      },
      {
        question: "어떻게 보관하나요?",
        answer: "향 변질을 막기 위해 직사광선과 고온을 피해 보관해주세요.",
      },
    ],
    story: {
      sections: [
        { title: "Collection", content: "MCM Fragrance Collection" },
        { title: "Design", content: "MCM의 여행 감성을 향으로 풀어낸 유니섹스 오 드 퍼퓸입니다." },
        { title: "Signature", content: "Backpack Bottle Design" },
        { title: "Heritage", content: "MCM Travel Heritage" },
      ],
      design: {
        paragraphs: [
          "MCM 오 드 퍼퓸은 브랜드의 자유로운 여행 감성을 향으로 표현한 유니섹스 프래그런스입니다.",
          "과일과 플로럴 노트가 밝게 펼쳐지고, 따뜻한 베이스 노트가 부드러운 잔향을 남깁니다.",
          "백팩에서 영감을 받은 보틀 디자인은 MCM의 헤리티지를 감각적으로 보여줍니다.",
        ],
      },
      materials: { title: "Fragrance Notes" },
    },
  },
  {
    id: 6,
    category: "BELT",
    collection: "VISETOS",
    name: "클라우스 M 비세토스 리버서블 벨트 4.5cm",
    price: 450000,
    color: "Black / Matte Black",
    colors: ["Black / Silver", "Black / Matte Black", "Cognac / Gold", "Dark Brown / Black"],
    size: "Cut to Size",
    stock: 3,
    styleNo: "MXBAAVI03BK001",
    image: beltImage,
    images: [beltImage],
    imageView: { scale: 1.06 },
    stocks: [{ branch_name: "MCM 신세계 본점", quantity: 3 }],
    variants: [
      {
        id: 601,
        productId: 6,
        name: "클라우스 M 비세토스 리버서블 벨트 4.5cm",
        color: "Black / Matte Black",
        size: "Cut to Size",
        image: beltImage,
        dimensions: "Approx. 130 cm",
        strap: "4.5 cm",
        storage: "Reversible Belt",
        price: 450000,
        stock: 3,
        stockLabel: "3개 (현재 매장)",
      },
    ],
    specs: [
      { label: "LENGTH", value: "Approx. 130 cm" },
      { label: "WIDTH", value: "4.5 cm" },
      { label: "WAIST", value: "Up to 122 cm" },
      { label: "TRIM", value: "Nappa Leather" },
      { label: "BUCKLE", value: "Detachable M Buckle" },
      { label: "HARDWARE", value: "24K Gold-Plated Hardware" },
    ],
    materials: [
      {
        id: 1,
        name: "Visetos Canvas",
        location: "Front",
        description: "비세토스 캔버스 면으로 MCM의 시그니처 패턴을 보여줍니다.",
      },
      {
        id: 2,
        name: "Nappa Leather",
        location: "Reverse",
        description: "반대면에는 나파 가죽을 적용해 리버서블 착용이 가능합니다.",
      },
      {
        id: 3,
        name: "Detachable M Buckle",
        location: "Buckle",
        description: "탈부착 가능한 M 버클이 적용되었습니다.",
      },
    ],
    careGuide: [
      { title: "일상 관리", content: "버클과 가죽 표면이 거친 물체에 긁히지 않도록 주의해주세요." },
      { title: "보관", content: "말아서 보관할 때 과도하게 꺾이지 않도록 해주세요." },
      { title: "가죽 관리", content: "오염 시 부드러운 천으로 가볍게 닦아주세요." },
      { title: "주의사항", content: "물과 습기에 장시간 노출되지 않도록 주의해주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "리버서블인가요?",
        answer: "네, 비세토스 캔버스 면과 나파 가죽 면을 모두 활용할 수 있는 리버서블 벨트입니다.",
      },
      {
        question: "길이 조절이 가능한가요?",
        answer: "Cut to Size 형태로 허리에 맞게 길이를 조절할 수 있는 벨트입니다.",
      },
      {
        question: "버클 특징은 무엇인가요?",
        answer: "탈부착 가능한 M 버클과 24K 골드 도금 하드웨어가 특징입니다.",
      },
    ],
    story: {
      sections: [
        { title: "Collection", content: "Visetos Collection" },
        { title: "Design", content: "비세토스와 나파 가죽을 양면으로 활용할 수 있는 리버서블 벨트입니다." },
        { title: "Signature", content: "Detachable M Buckle" },
        { title: "Heritage", content: "MCM Leather Craft" },
      ],
      design: {
        paragraphs: [
          "클라우스 M 비세토스 리버서블 벨트는 비세토스 패턴과 나파 가죽 면을 모두 활용할 수 있는 실용적인 액세서리입니다.",
          "탈부착 가능한 M 버클이 중심 디테일로 적용되어 스타일에 따라 다양한 연출이 가능합니다.",
          "컷 투 사이즈 구조로 착용자에게 맞는 길이 조절이 가능합니다.",
        ],
      },
      materials: { title: "Visetos Canvas and Nappa Leather" },
    },
  },
  {
    id: 7,
    category: "SHOES",
    collection: "NEO TERRAIN",
    name: "네오 터레인 모노그램 레더 로우탑 스니커즈",
    price: 770000,
    color: "Egret",
    colors: ["Egret"],
    size: "38 IT / W",
    stock: 6,
    styleNo: "MESEAAJ02WG038",
    image: sneakersImage,
    images: [sneakersImage],
    imageView: { scale: 1.38, translateY: "-30px" },
    stocks: [{ branch_name: "MCM 신세계 본점", quantity: 6 }],
    variants: ["36 IT", "37 IT", "38 IT", "39 IT"].map((size, index) => ({
      id: 701 + index,
      productId: 7,
      name: "네오 터레인 모노그램 레더 로우탑 스니커즈",
      color: "Egret",
      size,
      image: sneakersImage,
      dimensions: size,
      strap: "Low-top",
      storage: "Italian Calf Leather",
      price: 770000,
      stock: 6,
      stockLabel: "6개 (현재 매장)",
    })),
    specs: [
      { label: "TYPE", value: "Low-top Sneakers" },
      { label: "UPPER", value: "Italian Calf Leather" },
      { label: "PATTERN", value: "Embossed Visetos Monogram" },
      { label: "LINING", value: "Mesh-infused Calf Leather" },
      { label: "INSOLE", value: "OrthoLite" },
      { label: "DETAIL", value: "Bavarian Diamond Heel Patch" },
    ],
    materials: [
      {
        id: 1,
        name: "UPPER100% Calf Leather",
        location: "Upper",
        description: "부드럽고 견고한 100% 송아지 가죽을 어퍼에 사용해 고급스러운 질감과 안정적인 착화감을 제공합니다.",
      },
      {
        id: 2,
        name: "TRIM100% Calf Leather",
        location: "Trim",
        description: "슈즈의 트림 부분에도 100% 송아지 가죽을 적용해 전체적인 완성도와 내구성을 높였습니다.",
      },
      {
        id: 3,
        name: "LININGLeather Lining with Mesh",
        location: "Lining",
        description: "가죽 라이닝과 메쉬 소재를 함께 사용해 발을 부드럽게 감싸면서도 쾌적한 착용감을 제공합니다.",
      },
      {
        id: 4,
        name: "INSOLERemovable OrthoLite® Memory Foam Insole",
        location: "Insole",
        description: "탈착 가능한 OrthoLite® 메모리폼 인솔이 적용되어 장시간 착용에도 편안한 쿠셔닝을 제공합니다.",
      },
      {
        id: 5,
        name: "HARDWAREGold-Tone Diamond Metal Eyelets",
        location: "Hardware",
        description: "골드 톤 다이아몬드 메탈 아일렛 디테일로 스니커즈에 세련된 포인트를 더했습니다.",
      },
    ],
    careGuide: [
      { title: "LIQUIDS", content: "알코올이 함유된 물질예: 향수, 화장품, 오일및 물과의 접촉을 피하십시오." },
      { title: "BEFORE CLEANING", content: "클리닝 전에 내부 삭스를 제거하세요." },
      { title: "DRYING", content: "클리닝 후 실내 온도에서 건조하세요." },
      { title: "OUTSOLE", content: "아웃솔은 부드러운 브러시를 사용해 세척하세요." },
      { title: "UPPER", content: "어퍼는 살짝 물에 적신 코튼 천을 사용해 세척하세요." },
    ],
    aiDocentFaqs: [
      {
        question: "어퍼 소재는 무엇인가요?",
        answer: "이탈리안 카프 레더 어퍼에 엠보싱 비세토스 모노그램이 적용된 로우탑 스니커즈입니다.",
      },
      {
        question: "착화감은 어떤가요?",
        answer: "OrthoLite 인솔과 메쉬 인퓨즈드 카프 레더 라이닝으로 편안한 착화감을 제공합니다.",
      },
      {
        question: "어떻게 관리하나요?",
        answer: "먼지는 부드럽게 제거하고, 비나 습기에 장시간 노출되지 않도록 관리해주세요.",
      },
    ],
    story: {
      sections: [
        { title: "Collection", content: "Neo Terrain Collection" },
        { title: "Design", content: "DESIGN DETAILS01 — MONOGRAMEmbossed Visetos Monogram\n02 — TONGUELaurel Logo Label\n03 — HEELLeather Diamond Patch\n04 — OUTSOLERubber Outsole · MCM Logo Motif" },
        { title: "Signature", content: "Bavarian Diamond Heel Patch" },
        { title: "Heritage", content: "MCM Footwear" },
      ],
      design: {
        paragraphs: [
          "클래식한 비세토스 모노그램이 새겨진이탈리안 송아지 가죽 어퍼로 완성한 로우탑 스니커즈입니다.",
          "바이에른 다이아몬드를 참고한 우븐 텅 라벨과가죽 힐 패치가 디자인에 포인트를 더합니다.",
        ],
      },
      materials: { title: "Italian Calf Leather" },
    },
  },
  {
    id: 8,
    category: "BAG",
    collection: "VISETOS",
    collectionName: "VISETOS",
    collection_name: "VISETOS",
    groupId: 8,
    group_id: 8,
    groupName: "Aren Hobo",
    group_name: "Aren Hobo",
    name: "Aren Hobo In Visetos",
    price: 1290000,
    color: "Cognac",
    colors: ["Cognac", "Black", "Powder Pink"],
    size: "Small",
    stock: 3,
    styleNo: "MWHESSTA01CO001",
    image: hoboBagImage,
    images: [hoboBagImage],
    imageView: { scale: 1.38, translateY: "-30px" },
    aiAnalysis: {
      currentStyleInterests: ["Warm Tones", "Compact Size", "Classic Styling"],
      description:
        "Cognac 톤 제품을 반복 탐색하신 성향을 바탕으로 Monogram Daily, Modern Classic, Sporty Casual 3가지 룩을 추천드려요.",
      curatedLooks: [
        {
          id: 1,
          name: "Monogram Daily",
          image: monogramDailyLookImage,
          detailPath: "/ai/style-recommendation/look1",
        },
        {
          id: 2,
          name: "Modern Classic",
          image: modernClassicLookImage,
          detailPath: "/ai/style-recommendation/look2",
        },
        {
          id: 3,
          name: "Sporty Casual",
          image: sportyCasualLookImage,
          detailPath: "/ai/style-recommendation/look3",
        },
      ],
    },
    stocks: [{ branch_name: "MCM 신세계 본점", quantity: 3 }],
    variants: [
      {
        id: 801,
        productId: 8,
        name: "Aren Hobo In Visetos",
        color: "Cognac",
        size: "Small",
        image: hoboBagImage,
        dimensions: "10 x 26 x 19 cm",
        strap: "125-133 cm",
        storage: "Tablet / Mobile Phone / AirPods Max",
        price: 1290000,
        stock: 3,
        stockLabel: "3개 (현재 매장)",
      },
      {
        id: 802,
        productId: 8,
        name: "Aren Hobo In Visetos",
        color: "Cognac",
        size: "Large",
        image: hoboBagLargeImage,
        dimensions: "11 x 34 x 33 cm",
        strap: "92.5cm ~ 116.5cm",
        storage: "Laptop / Tablet / AirPods Max / Tumbler",
        price: 1450000,
        stock: 2,
        stockLabel: "2개 (현재 매장)",
      },
    ],
    specs: [
      { label: "STYLE NO.", value: "MWHESSTA01CO001" },
      { label: "DIMENSIONS", value: "10 x 26 x 19 cm" },
      { label: "CLOSURE", value: "Zip Closure" },
      { label: "STRAP", value: "Adjustable Leather Shoulder Strap, 125-133 cm" },
      { label: "STORAGE", value: "Tablet / Mobile Phone / AirPods / AirPods Max" },
    ],
    materials: [
      {
        id: 1,
        name: "Visetos 패턴",
        location: "Body",
        description: "MCM의 시그니처 Visetos 모노그램 캔버스를 바디에 사용했습니다.\n제품의 주요 소재로, 클래식한 모노그램 패턴이 Aren Hobo의 전체적인 디자인을 완성합니다.",
      },
      {
        id: 2,
        name: "Natural Nappa Leather",
        location: "Trim",
        description: "천연 나파 가죽을 트림에 사용했습니다.\n가죽 행택과 패드락 주변에도 가죽 소재가 적용됩니다.",
        image: hoboNappaLeatherMaterialImage,
        imageStyle: { height: "702.83%", left: "-46.81%", top: "-409.21%", width: "187.23%" },
      },
      {
        id: 3,
        name: "24K Gold-Plated Brass",
        location: "Hardware",
        description: "브라스 하드웨어에 24K 골드 도금을 적용했습니다.\n패드락과 지퍼 등의 금속 장식에 사용됩니다.",
        image: hoboGoldBrassMaterialImage,
        imageStyle: { height: "735.55%", left: "-450.09%", top: "-499.07%", width: "709.62%" },
      },
      {
        id: 4,
        name: "Suede-Finish Microfiber",
        location: "Lining",
        description: "가방 내부에는 스웨이드 마감의\n마이크로파이버 안감을 사용했습니다. ",
        image: hoboSuedeMicrofiberMaterialImage,
        imageStyle: { height: "126.14%", left: "-28.26%", top: "-18.6%", width: "152.17%" },
      },
    ],
    careGuide: [
      { title: "일상 관리", content: "지속적인 마찰을 피하고, 거친 표면에 제품이 긁히거나 마찰되지 않도록 주의해 주세요." },
      { title: "보관", content: "제품을 보호용 더스트 백에 넣어 직사광선과 밝은 빛을 피해 서늘하고 건조한 곳에 보관해 주세요." },
      { title: "가죽 관리", content: "가죽 제품이 젖거나 얼룩지지 않도록 주의하세요. 표면이 젖거나 오염되었을 경우, 보풀이 없는 밝은 색상의 흡수성 천으로 닦아 말려주세요. " },
      { title: "주의사항", content: "비누 또는 솔벤트는 사용하지 마세요. 거친 표면과의 마찰을 피하고, 제품이 긁히지 않도록 주의하세요. 적절히 관리하면 시간이 지나면서 가죽에 자연스러운 멋이 더해집니다." },
      { title: "제품 문의", content: "제품에 대한 문의 사항이 있으시면 MCM 매장이나 고객 서비스 팀에 언제든지 연락해 주세요."},
    ],
    aiDocentFaqs: [
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
          "Small 사이즈에는 스마트폰, 태블릿, AirPods, AirPods Max 등의 소지품을 수납할 수 있습니다. 노트북은 수납하기 어렵습니다. 가벼운 외출이나 일상적인 약속에 적합한 사이즈입니다. 더 많은 수납이 필요하다면 Large 사이즈도 비교해 보세요.",
      },
      {
        question: "어떻게 관리하나요?",
        answer:
          "지속적인 마찰과 거친 표면 접촉을 피하고, 보관할 때는 직사광선과 높은 습도를 피해 서늘하고 건조한 곳에 두는 것이 좋습니다.",
      },
    ],
    story: {
      sections: [
        { title: "Collection", content: "Visetos Collection" },
        { title: "Design", content: "Softness & Structure" },
        { title: "Signature", content: "Leather Hang Tag" },
        { title: "Heritage", content: "MCM Luggage" },
      ],
      design: {
        paragraphs: [
          "클래식한 슬로치드 실루엣을 현대적으로 재해석한 Aren Hobo는 부드러움과 구조감의 이상적인 균형을 보여줍니다.",
          "MCM 헤리티지 러기지에서 가져온 디자인 요소인 탈부착 가능한 가죽 행택과 로고가 각인된 패드락이 더해져 Aren Hobo만의 디자인을 완성합니다.",
          "또한 조절 가능한 가죽 스트랩이 적용된 비세토스 호보백으로, 클래식한 실루엣과 MCM의 헤리티지 러기지 디테일을 현대적으로 담아낸 디자인입니다.",
        ],
      },
      materials: { title: "Visetos Monogram Canvas" },
    },
  },
];

export const DEFAULT_PRODUCT_ID = products[0].id;

export const aiDocentRequest = {
  question: "이 제품은 어떤 소재로 만들어졌어?",
};

export const aiDocentResponse = {
  id: 1,
  question: aiDocentRequest.question,
  answer: "제품 정보를 확인했습니다.",
  created_at: "2026-08-12T07:48:38.865078Z",
};

export const getMockProductById = (productId) => {
  return products.find((product) => product.id === Number(productId)) ?? products[0];
};

export const getMockProductStocks = (productId) => {
  const product = getMockProductById(productId);

  return product.stocks?.length
    ? product.stocks
    : [{ branch_name: "MCM 신세계 본점", quantity: product.stock }];
};

export const getProductSizesForProduct = (product) => {
  return (product.variants?.length ? product.variants : []).map((variant) => ({
    ...variant,
    isCurrent: variant.size === product.size,
  }));
};

export const getAiDocentFaqsForProduct = (product) => {
  return product.aiDocentFaqs ?? [];
};

export const getProductStoryForProduct = (product) => {
  const sections = product.story?.sections ?? [
    { title: "Collection", content: `${product.collection} Collection` },
    { title: "Design", content: `${product.name}의 제품 정보를 확인할 수 있습니다.` },
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
      title: product.story?.design?.title ?? product.name,
      image: product.image,
      imageView: product.imageView,
      paragraphs: product.story?.design?.paragraphs ?? [sections[1].content],
      highlights: sections.map((section) => ({
        label: section.title.toUpperCase(),
        value: section.content,
      })),
    },
    materials: {
      eyebrow: "MATERIALS & CRAFT",
      title: product.story?.materials?.title ?? product.materials?.[0]?.name ?? product.name,
      image: product.story?.materials?.image ?? materialCanvasImage,
      sections: (product.materials ?? []).map((material) => ({
        title: material.name,
        description: material.description,
        location: material.location,
        image: material.image,
        imageStyle: material.imageStyle,
      })),
    },
    care: {
      eyebrow: "CARE GUIDE",
      title: "제품 관리 가이드",
      guides: (product.careGuide ?? []).map((guide) => ({
        title: guide.title,
        description: guide.content,
      })),
    },
  };
};
