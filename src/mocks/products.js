import materialCanvasImage from "../assets/images/figma/story/story-material-raw-1.png";
import hoboGoldBrassMaterialImage from "../assets/images/figma/story/materials/hobo-gold-brass.png";
import hoboNappaLeatherMaterialImage from "../assets/images/figma/story/materials/hobo-nappa-leather.png";
import hoboSuedeMicrofiberMaterialImage from "../assets/images/figma/story/materials/hobo-suede-microfiber.png";
import beltImage from "../assets/images/products/belt.webp";
import eauDeParfumImage from "../assets/images/products/eau-de-parfum.webp";
import hoboBagImage from "../assets/images/products/hobobag.webp";
import hoboBagLargeImage from "../assets/images/products/hobobag_large.webp";
import bouclePantsImage from "../assets/images/products/buclepants.png";
import denimPantsImage from "../assets/images/products/danimpants.png";
import basetonesSandalImage from "../assets/images/products/basetonessandal.png";
import roperImage from "../assets/images/products/roper.png";
import scarfImage from "../assets/images/products/scarf.webp";
import sneakersImage from "../assets/images/products/sneakers.webp";
import sunglassesImage from "../assets/images/products/sunglasses.webp";
import tshirtImage from "../assets/images/products/tshirt.webp";
import walletImage from "../assets/images/products/wallet.webp";
import modernClassicLookImage from "../assets/images/lookbook/modernclassiclook.png";
import womanMonogramSandalImage from "../assets/images/products/womanmonogramsandal.png";
import monogramCropTshirtImage from "../assets/images/products/monogramcroptshirt.png";
import monogramShirtsImage from "../assets/images/products/monogramshirts.png";
import monogramTriangleSilkScarfImage from "../assets/images/products/monogramsilkscarf.png";
import monogramDailyLookImage from "../assets/images/lookbook/monogramdailylook.png";
import sportyCasualLookImage from "../assets/images/lookbook/sportycasuallook.png";

export const mcmStores = [
  {
    branch_name: "신세계 면세점 본점",
    name: "신세계 면세점 본점",
    address: "서울 중구 퇴계로 77 9F 신세계면세점 본점",
    hours: "매일 11:00 - 18:00",
    coordinates: { latitude: 37.5603907, longitude: 126.9808854 },
  },
  {
    branch_name: "롯데백화점 본점",
    name: "롯데백화점 본점",
    address: "서울 중구 남대문로 81 롯데백화점본점 1층",
    hours: "10:30 - 20:00",
    distance: "0.6km",
    coordinates: { latitude: 37.5647299033135, longitude: 126.981730421825 },
  },
  {
    branch_name: "롯데면세점 명동본점",
    name: "롯데면세점 명동본점",
    address: "서울 중구 을지로 30",
    hours: "09:30 - 20:00",
    distance: "0.6km",
    coordinates: { latitude: 37.5653458904198, longitude: 126.9810075639 },
  },
  {
    branch_name: "신라면세점 본점",
    name: "신라면세점 본점",
    address: "서울 중구 동호로 249 1F 호텔신라면세점",
    hours: "09:30 - 17:30",
    distance: "2.9km",
    coordinates: { latitude: 37.5573514, longitude: 127.0075502 },
  },
];

const createMainStoreStock = (quantity) => [{ ...mcmStores[0], quantity }];

export const products = [
  {
    id: 1,
    category: "WALLET",
    collection: "VISETOS",
    name: "Aren 비세토스 3단 지갑",
    price: 490000,
    color: "Cognac",
    colors: ["Cognac", "Soft Pink"],
    size: "S",
    stock: 3,
    styleNo: "MYSFSTA02CO001",
    image: walletImage,
    images: [walletImage],
    imageView: { scale: 1.9, translateY: "-80px" },
    stocks: createMainStoreStock(3),
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
        price: 490000,
        stock: 3,
      },
    ],
    specs: [
      { label: "DIMENSIONS", value: "약 3 x 12 x 9 cm" },
      { label: "CLOSURE", value: "Snap Closure" },
      { label: "CARD SLOTS", value: "6 Slots" },
      { label: "STORAGE", value: "Bill Compartment · Zipper Pocket" },
    ],
    materials: [
      {
        id: 1,
        name: "Visetos 패턴",
        location: "Body",
        description:
          "MCM의 시그니처 비세토스 모노그램 캔버스를 바디에 사용했습니다. 클래식한 모노그램 패턴과 헤리티지 하드웨어가 조화를 이루며 MCM의 아이덴티티를 완성합니다.",
      },
      {
        id: 2,
        name: "Natural Leather",
        location: "Trim",
        description: "천연 가죽으로 트림을 마감했습니다. 카드 슬롯과 가장자리 디테일에 가죽 소재를 적용했습니다.",
      },
      {
        id: 3,
        name: "24K Gold-Plated Brass",
        location: "Hardware",
        description: "브라스 하드웨어에 24K 골드 도금을 적용했습니다. MCM 로고 장식 플레이트와 스냅 클로저에 사용됩니다.",
      },
      {
        id: 4,
        name: "Fabric Lining",
        location: "Lining",
        description: "카드 슬롯과 내부에 패브릭 안감을 적용했습니다.",
      },
    ],
    careGuide: [
      {
        title: "STORAGE",
        content: "더스트 백에 넣어 직사광선과 밝은 빛을 피해 서늘하고 건조한 곳에 보관해 주세요.",
      },
      {
        title: "CLEANING",
        content: "표면이 젖거나 오염되었을 경우 밝은색의 흡수성 천으로 닦아주세요.",
      },
      {
        title: "LEATHER",
        content: "가죽이 젖거나 얼룩지지 않도록 주의해 주세요.",
      },
      {
        title: "CAUTION",
        content: "비누나 솔벤트를 사용하지 말고 거친 표면과의 마찰을 피해주세요.",
      },
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
        { title: "VISETOS MONOGRAM", content: "비세토스 모노그램 캔버스" },
        { title: "LOGO BRASS PLATE", content: "MCM 로고 브라스 장식 플레이트" },
        { title: "SNAP CLOSURE", content: "스냅 클로저" },
        { title: "TRI-FOLD", content: "트라이폴드 구조" },
      ],
      design: {
        title: "헤리티지 하드웨어로 완성한 모노그램 지갑",
        paragraphs: [
          "비세토스 모노그램 캔버스에 MCM 로고 브라스 플레이트와 스냅 클로저를 더했습니다.",
          "트라이폴드 구조로 구성된 지갑으로, 아이코닉한 MCM 로고와 헤리티지 하드웨어를 통해 MCM의 디자인 아이덴티티를 보여줍니다.",
        ],
        highlights: [
          { label: "VISETOS MONOGRAM", value: "비세토스 모노그램 캔버스" },
          { label: "LOGO BRASS PLATE", value: "MCM 로고 브라스 장식 플레이트" },
          { label: "SNAP CLOSURE", value: "스냅 클로저" },
          { label: "TRI-FOLD", value: "트라이폴드 구조" },
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
    stock: 2,
    styleNo: "MEFDAMM11CO001",
    image: scarfImage,
    images: [scarfImage],
    imageView: { scale: 1.2, translateY: "-10px" },
    stocks: createMainStoreStock(2),
    variants: [
      {
        id: 201,
        productId: 2,
        name: "모노그램 프린트 쁘띠 실크 스카프",
        color: "Cognac",
        size: "Free",
        image: scarfImage,
        dimensions: "약 8 x 120 x 0 cm",
        strap: "-",
        storage: "Reversible Silk Scarf",
        price: 175000,
        stock: 2,
      },
    ],
    specs: [
      { label: "DESIGN", value: "Reversible" },
      { label: "CONSTRUCTION", value: "Hand-Sewn" },
      { label: "MATERIAL", value: "Organic Silk 100%" },
      { label: "DIMENSIONS", value: "약 8 x 120 x 0 cm" },
    ],
    materials: [
      {
        id: 1,
        name: "실크 소재",
        location: "Material",
        description:
          "오가닉 이탈리안 실크 100%를 사용해 가볍고 부드러운 촉감을 완성했습니다. 은은한 광택이 더해져 고급스러운 소재감을 보여줍니다.",
      },
      {
        id: 2,
        name: "Hand-Sewn Construction",
        location: "Construction",
        description: "가장자리와 마감 부분을 수작업으로 봉제해 섬세하게 완성했습니다.",
      },
      {
        id: 3,
        name: "Silk Finish",
        location: "Finish",
        description: "실크 특유의 매끄러운 표면감과 자연스러운 드레이프를 살렸습니다.",
      },
      {
        id: 4,
        name: "Lightweight Fabric",
        location: "Fabric",
        description: "가볍고 유연한 소재로 다양한 스타일링에 편안하게 활용할 수 있습니다.",
      },
    ],
    careGuide: [
      {
        title: "드라이클리닝 전용",
        content:
          "스카프는 드라이클리닝으로만 관리해 주세요. 물세탁은 피하고, 제품의 소재 특성에 맞는 방식으로 관리하는 것을 권장합니다.",
      },
      {
        title: "더스트 백에 넣어 보관",
        content:
          "제공된 보호용 더스트 백에 넣어 직사광선이나 밝은 조명을 피해 서늘하고 건조한 곳에 보관해 주세요.",
      },
      {
        title: "젖거나 오염되지 않도록 주의",
        content: "표면이 젖거나 오염되었을 경우 보풀이 없는 밝은 색상의 흡수성 천으로 닦아 말려주세요.",
      },
      { title: "비누·솔벤트 사용 금지", content: "비누 또는 솔벤트를 사용하지 마세요." },
      { title: "거친 표면과의 마찰 주의", content: "제품이 거친 표면에 긁히거나 마찰되지 않도록 주의해 주세요." },
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
        { title: "MAIN SIDE", content: "Visetos Monogram Print" },
        { title: "REVERSE SIDE", content: "MCM Logo & Contrast Stripe Print" },
        { title: "REVERSIBLE", content: "양면 디자인" },
        { title: "STYLING", content: "스카프 · 리본 매듭 · 가방 핸들" },
      ],
      design: {
        title: "두 가지 아이콘을 담은 리버서블 디자인",
        paragraphs: [
          "앞면에는 비세토스 모노그램 프린트, 반대쪽 면에는 MCM 로고와 대비되는 스트라이프 컬러 블록 모티프를 적용했습니다.",
          "하나의 스카프로 두 가지 디자인을 즐길 수 있으며, 스카프·리본 매듭·가방 핸들 등 다양한 방식으로 스타일링할 수 있습니다.",
        ],
        highlights: [
          { label: "MAIN SIDE", value: "Visetos Monogram Print" },
          { label: "REVERSE SIDE", value: "MCM Logo & Contrast Stripe Print" },
          { label: "REVERSIBLE", value: "양면 디자인" },
          { label: "STYLING", value: "스카프 · 리본 매듭 · 가방 핸들" },
        ],
      },
      materials: { title: "Organic Silk 100%" },
    },
  },
  {
    id: 3,
    category: "CLOTHING",
    collection: "ESSENTIAL",
    name: "에센셜 로고 프린트 티셔츠",
    price: 270000,
    color: "Black",
    colors: ["Black", "White"],
    size: "M",
    stock: 2,
    styleNo: "MHTESBC01BK00M",
    image: tshirtImage,
    images: [tshirtImage],
    imageView: { scale: 1.02 },
    stocks: createMainStoreStock(2),
    variants: [
      {
        size: "S",
        length: "67.0 cm",
        shoulder: "44.0 cm",
        sleeve: "22.1 cm",
        koreanSize: "95",
        height: "170 cm",
        chest: "96-98 cm",
        stock: 3,
      },
      {
        size: "M",
        length: "69.0 cm",
        shoulder: "46.0 cm",
        sleeve: "22.8 cm",
        koreanSize: "100",
        height: "175 cm",
        chest: "108-110 cm",
        stock: 2,
      },
      {
        size: "L",
        length: "71.0 cm",
        shoulder: "48.0 cm",
        sleeve: "23.5 cm",
        koreanSize: "105",
        height: "180 cm",
        chest: "118-122 cm",
        stock: 3,
      },
      {
        size: "XL",
        length: "73.0 cm",
        shoulder: "50.0 cm",
        sleeve: "24.2 cm",
        koreanSize: "110",
        height: "185 cm",
        chest: "126-130 cm",
        stock: 1,
      },
    ].map((variant, index) => ({
      id: 301 + index,
      productId: 3,
      name: "에센셜 로고 프린트 티셔츠",
      color: "Black",
      ...variant,
      image: tshirtImage,
      dimensions: `길이 ${variant.length} · 어깨 ${variant.shoulder} · 소매 ${variant.sleeve}`,
      strap: "Regular Fit",
      storage: "100% Organic Cotton",
      price: 270000,
    })),
    sizeCompareFields: [
      { label: "길이", valueKey: "length" },
      { label: "어깨", valueKey: "shoulder" },
      { label: "소매", valueKey: "sleeve" },
      { label: "한국 사이즈", valueKey: "koreanSize" },
      { label: "신장", valueKey: "height" },
      { label: "가슴둘레", valueKey: "chest" },
      { label: "재고", valueKey: "stock", format: "stock" },
    ],
    specs: [
      { label: "FIT", value: "Regular Fit" },
      { label: "DESIGN", value: "Short Sleeve" },
      { label: "NECKLINE", value: "Rib Knit Collar" },
      { label: "MATERIAL", value: "100% Organic Cotton" },
    ],
    materials: [
      {
        id: 1,
        name: "오가닉 코튼 소재",
        location: "Body",
        description: "100% 오가닉 코튼을 사용해 부드럽고 편안한 착용감을 완성했습니다.",
      },
      {
        id: 2,
        name: "Cotton Jersey",
        location: "Body",
        description: "일상적인 착용에 적합한 부드러운 코튼 저지 소재를 사용했습니다.",
      },
      {
        id: 3,
        name: "Rib Knit",
        location: "Neckline",
        description: "넥라인에 탄탄한 리브 니트 소재를 적용해 형태를 안정적으로 유지합니다.",
      },
      {
        id: 4,
        name: "Regular Construction",
        location: "Fit",
        description: "여유 있는 기본 구조로 제작해 편안한 데일리 착용감을 제공합니다.",
      },
    ],
    careGuide: [
      { title: "CLEANING", content: "손세탁 또는 드라이클리닝으로 관리해 주세요." },
      { title: "BLEACH", content: "표백제를 사용하지 마세요." },
      { title: "DRYING", content: "건조기 사용을 피해주세요." },
      { title: "IRONING", content: "다림질할 때는 천을 대고 다림질해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "티셔츠 소재는 무엇인가요?",
        answer: "100% 오가닉 코튼 저지 소재로 제작해 부드럽고 편안한 착용감을 제공합니다.",
      },
      {
        question: "핏은 어떤가요?",
        answer: "여유 있는 레귤러 핏의 쇼트 슬리브 티셔츠입니다.",
      },
      {
        question: "세탁은 어떻게 하나요?",
        answer: "손세탁 또는 드라이클리닝을 권장하며, 표백제와 건조기 사용은 피해주세요.",
      },
    ],
    story: {
      sections: [
        { title: "SIGNATURE", content: "Laurel Emblem" },
        { title: "LOGO DETAIL", content: "Metallic High-Frequency Print" },
        { title: "NECKLINE", content: "Rib Knit Neckline" },
        { title: "FIT", content: "Regular Fit" },
      ],
      design: {
        title: "메탈릭 로고로 완성한 미니멀한 시그니처",
        paragraphs: [
          "오가닉 코튼 저지에 시그니처 라우렐 엠블럼을 메탈릭 하이 프리퀀시 프린트로 담아냈습니다.",
          "심플한 실루엣 위에 MCM의 상징적인 로고를 더해 절제된 디자인에 감각적인 포인트를 완성합니다.",
        ],
        highlights: [
          { label: "SIGNATURE", value: "Laurel Emblem" },
          { label: "LOGO DETAIL", value: "Metallic High-Frequency Print" },
          { label: "NECKLINE", value: "Rib Knit Neckline" },
          { label: "FIT", value: "Regular Fit" },
        ],
      },
      materials: { title: "Organic Cotton 100%" },
    },
  },
  {
    id: 4,
    category: "SUNGLASSES",
    collection: "EYEWEAR",
    name: "프리 사이즈 오발 선글라스",
    price: 260000,
    color: "Pink",
    colors: ["Pink", "Black"],
    size: "Free",
    stock: 3,
    styleNo: "MEGGSMM06PK001",
    image: sunglassesImage,
    images: [sunglassesImage],
    imageView: { scale: 1.38, translateY: "-30px" },
    stocks: createMainStoreStock(3),
    variants: [
      {
        id: 401,
        productId: 4,
        name: "프리 사이즈 오발 선글라스",
        color: "Pink",
        size: "Free",
        image: sunglassesImage,
        dimensions: "53-16-145 mm",
        strap: "-",
        storage: "Solid Smoke Lens / Logo-Embossed Pouch Case",
        price: 260000,
        stock: 3,
      },
    ],
    specs: [
      { label: "SIZE", value: "53-16-145 mm" },
      { label: "LENS COLOR", value: "Solid Smoke" },
      { label: "FRAME COLOR", value: "Shiny Black" },
      { label: "CASE", value: "Logo-Embossed Pouch Case" },
    ],
    materials: [
      {
        id: 1,
        name: "아세테이트 프레임",
        location: "Frame",
        description: "내구성과 가벼운 착용감을 갖춘 아세테이트 소재로 프레임을 제작했습니다.",
      },
      {
        id: 2,
        name: "Solid Smoke Lens",
        location: "Lens",
        description: "솔리드 스모크 컬러의 렌즈를 적용해 차분한 시각적 인상을 완성합니다.",
      },
      {
        id: 3,
        name: "Metal Hardware",
        location: "Temple",
        description: "템플에 메탈 소재의 하드웨어 디테일을 적용했습니다.",
      },
      {
        id: 4,
        name: "Logo-Embossed Pouch Case",
        location: "Case",
        description: "제품 보관을 위한 로고 엠보싱 파우치 케이스가 함께 구성됩니다.",
      },
    ],
    careGuide: [
      { title: "보관", content: "제품을 함께 제공되는 더스트 백에 넣어 직사광선이나 밝은 빛을 피해 서늘하고 건조한 곳에 보관해 주세요." },
      { title: "표면 관리", content: "표면이 젖었을 경우 보풀이 없고 밝은색의 흡수성 천으로 물기를 닦아주세요." },
      { title: "비누·솔벤트 사용 금지", content: "제품 표면을 닦을 때 비누나 솔벤트를 사용하지 마세요." },
      { title: "긁힘 주의", content: "제품이 거친 표면에 긁히지 않도록 주의해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "프레임 소재는 무엇인가요?",
        answer: "가볍고 내구성 있는 아세테이트 프레임에 솔리드 스모크 렌즈를 적용한 선글라스입니다.",
      },
      {
        question: "사이즈는 어떻게 되나요?",
        answer: "렌즈-브릿지-템플 기준 53-16-145 mm 사이즈입니다.",
      },
      {
        question: "어떻게 보관하나요?",
        answer: "함께 제공되는 더스트 백이나 로고 엠보싱 파우치 케이스에 넣어 서늘하고 건조한 곳에 보관해 주세요.",
      },
    ],
    story: {
      sections: [
        { title: "SHAPE", content: "Oval" },
        { title: "TEMPLE", content: "MCM Logo" },
        { title: "TEMPLE TIP", content: "Bavarian Diamond Metal Stud" },
        { title: "STYLE", content: "Unisex" },
      ],
      design: {
        title: "부드러운 곡선으로 완성한 오벌 실루엣",
        paragraphs: [
          "부드러운 곡선이 특징인 타원형 디자인으로 깔끔하고 미니멀한 디자인을 보여줍니다.",
          "템플에는 클래식한 MCM 로고를 더하고, 템플 팁에는 바이에른 다이아몬드 메탈 스터드를 장식했습니다.",
        ],
        highlights: [
          { label: "SHAPE", value: "Oval" },
          { label: "TEMPLE", value: "MCM Logo" },
          { label: "TEMPLE TIP", value: "Bavarian Diamond Metal Stud" },
          { label: "STYLE", value: "Unisex" },
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
    stock: 1,
    styleNo: "MPFBSMM03CO001",
    image: eauDeParfumImage,
    images: [eauDeParfumImage],
    imageView: { scale: 1.38, translateY: "-30px" },
    stocks: createMainStoreStock(1),
    variants: [
      {
        id: 501,
        productId: 5,
        name: "MCM 오 드 퍼퓸",
        color: "Cognac",
        size: "10ml",
        image: eauDeParfumImage,
        dimensions: "10 ml",
        strap: "-",
        storage: "Eau de Parfum",
        price: 56000,
        stock: 2,
      },
      {
        id: 502,
        productId: 5,
        name: "MCM 오 드 퍼퓸",
        color: "Cognac",
        size: "30ml",
        image: eauDeParfumImage,
        dimensions: "30 ml",
        strap: "-",
        storage: "Eau de Parfum",
        price: 94000,
        stock: 1,
      },
      {
        id: 503,
        productId: 5,
        name: "MCM 오 드 퍼퓸",
        color: "Cognac",
        size: "50ml",
        image: eauDeParfumImage,
        dimensions: "50 ml",
        strap: "-",
        storage: "Eau de Parfum",
        price: 118000,
        stock: 0,
      },
      {
        id: 504,
        productId: 5,
        name: "MCM 오 드 퍼퓸",
        color: "Cognac",
        size: "75ml",
        image: eauDeParfumImage,
        dimensions: "75 ml",
        strap: "-",
        storage: "Eau de Parfum",
        price: 141000,
        stock: 1,
      },
    ],
    sizeCompareFields: [
      { label: "용량", valueKey: "dimensions" },
      { label: "가격", valueKey: "price", format: "price" },
      { label: "재고", valueKey: "stock", format: "stock" },
    ],
    specs: [
      { label: "PRODUCT TYPE", value: "Unisex Fragrance" },
      { label: "TOP NOTES", value: "Raspberry · Apricot" },
      { label: "HEART NOTES", value: "Hand-Picked Jasmine · White Peony · Violet Leaf" },
      { label: "BASE NOTES", value: "White Moss · Vanilla · Sandalwood · Sheer Ambrox" },
    ],
    materials: [
      {
        id: 1,
        name: "향료",
        location: "Fragrance / Parfum",
        description: "라즈베리, 애프리콧, 재스민, 화이트 피오니, 바이올렛 리프 등의 향료를 조합했습니다.",
      },
      {
        id: 2,
        name: "Alcohol Base",
        location: "Base",
        description: "SD Alcohol 40-B (Alcohol Denat.)를 베이스로 사용해 향이 자연스럽게 퍼지도록 구성했습니다.",
      },
      {
        id: 3,
        name: "Purified Water",
        location: "Base",
        description: "정제수를 사용해 향료와 베이스 성분의 균형을 맞췄습니다.",
      },
      {
        id: 4,
        name: "Additional Ingredients",
        location: "Formula",
        description: "Butylene Glycol, BHT, Ethylhexyl Methoxycinnamate, Ethylhexyl Salicylate, Butyl Methoxydibenzoylmethane 등을 포함합니다.",
      },
    ],
    careGuide: [
      { title: "USE", content: "피부에 바르는 용도로만 사용하세요." },
      { title: "ALCOHOL", content: "알코올이 포함되어 있습니다." },
      { title: "FIRE", content: "화기 근처에서 사용하지 마세요." },
      { title: "STORAGE", content: "제품을 함께 제공되는 더스트 백에 넣어 직사광선이나 밝은 빛을 피해 서늘하고 건조한 곳에 보관해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "향은 어떤 느낌인가요?",
        answer: "라즈베리와 애프리콧의 산뜻함, 재스민과 화이트 피오니의 플로럴 노트, 화이트 모스와 바닐라의 부드러운 잔향이 어우러진 향입니다.",
      },
      {
        question: "용량은 어떤 게 있나요?",
        answer: "목업 기준으로 10ml, 30ml, 50ml, 75ml 옵션이 있으며 사이즈별 가격과 재고가 다릅니다.",
      },
      {
        question: "어떻게 보관하나요?",
        answer: "직사광선이나 밝은 빛을 피해 서늘하고 건조한 곳에 보관해 주세요.",
      },
    ],
    story: {
      sections: [
        { title: "FORM", content: "Stark Backpack-inspired Bottle" },
        { title: "DETAIL", content: "Gold-Tone Metal Details" },
        { title: "IDENTITY", content: "MCM Travel DNA" },
        { title: "STYLE", content: "Unisex" },
      ],
      design: {
        title: "MCM의 여행 DNA를 담은 스타크 백팩 보틀",
        paragraphs: [
          "MCM의 여행 DNA를 표현한 향수 보틀은 전설적인 스타크 백팩을 모델로 정교하게 제작되었습니다.",
          "골드 톤 메탈 디테일과 백팩에서 영감을 받은 형태가 MCM의 헤리티지를 감각적으로 보여줍니다.",
        ],
        highlights: [
          { label: "FORM", value: "Stark Backpack-inspired Bottle" },
          { label: "DETAIL", value: "Gold-Tone Metal Details" },
          { label: "IDENTITY", value: "MCM Travel DNA" },
          { label: "STYLE", value: "Unisex" },
        ],
      },
      materials: { title: "Fragrance / Parfum" },
    },
  },
  {
    id: 6,
    category: "BELT",
    collection: "VISETOS",
    name: "클라우스 M 비세토스 리버서블 벨트 4.5cm",
    price: 450000,
    color: "Black / Matte Black",
    colors: ["Black / Matte Black", "Cognac / Gold", "Black"],
    size: "Cut to Size",
    stock: 5,
    styleNo: "MXBAAVI03BK001",
    image: beltImage,
    images: [beltImage],
    imageView: { scale: 1.06 },
    stocks: createMainStoreStock(5),
    variants: [
      {
        id: 601,
        productId: 6,
        name: "클라우스 M 비세토스 리버서블 벨트 4.5cm",
        color: "Black / Matte Black",
        size: "Cut to Size",
        image: beltImage,
        dimensions: "약 0 x 130 x 5 cm",
        strap: "4.5 cm",
        storage: "Reversible Belt",
        price: 450000,
        stock: 5,
      },
    ],
    specs: [
      { label: "DIMENSIONS", value: "약 0 x 130 x 5 cm" },
      { label: "WAIST SIZE", value: "122 cm" },
      { label: "DESIGN", value: "Reversible" },
      { label: "ADJUSTMENT", value: "Length Adjustable" },
    ],
    materials: [
      {
        id: 1,
        name: "코티드 캔버스",
        location: "Front",
        description: "내구성을 높인 코티드 캔버스를 사용해 견고한 표면감과 실용성을 더했습니다.",
      },
      {
        id: 2,
        name: "Solid Leather",
        location: "Reverse",
        description: "반대쪽 면에는 솔리드 레더를 사용해 서로 다른 소재감을 하나의 스트랩에 담았습니다.",
      },
      {
        id: 3,
        name: "Nappa Leather Trim",
        location: "Trim",
        description: "부드러운 나파 가죽으로 가장자리와 트림을 섬세하게 마감했습니다.",
      },
      {
        id: 4,
        name: "Metal Hardware",
        location: "Buckle",
        description: "금속 하드웨어를 적용해 구조적인 완성도와 내구성을 높였습니다.",
      },
    ],
    careGuide: [
      {
        title: "STORAGE",
        content: "더스트 백에 넣어 직사광선과 밝은 빛을 피해 서늘하고 건조한 곳에 보관해 주세요.",
      },
      {
        title: "CLEANING",
        content: "표면이 젖거나 오염되었을 경우 밝은색의 흡수성 천으로 닦아주세요.",
      },
      {
        title: "LEATHER",
        content: "가죽이 젖거나 얼룩지지 않도록 주의해 주세요.",
      },
      {
        title: "CAUTION",
        content: "비누나 솔벤트를 사용하지 말고 거친 표면과의 마찰을 피해주세요.",
      },
    ],
    aiDocentFaqs: [
      {
        question: "리버서블인가요?",
        answer: "네, 한쪽은 시그니처 모노그램 코티드 캔버스, 다른 한쪽은 솔리드 레더로 구성된 리버서블 벨트입니다.",
      },
      {
        question: "길이 조절이 가능한가요?",
        answer: "Cut to Size 형태로 스트랩을 잘라 원하는 길이로 조절할 수 있습니다.",
      },
      {
        question: "버클 특징은 무엇인가요?",
        answer: "아이코닉한 M 버클은 탈착 가능하며, 스트랩 길이 조절 후 다시 결합할 수 있습니다.",
      },
    ],
    story: {
      sections: [
        { title: "REVERSIBLE", content: "Monogram Coated Canvas · Solid Leather" },
        { title: "BUCKLE", content: "Detachable M Buckle" },
        { title: "ADJUSTMENT", content: "Cut-to-Length" },
      ],
      design: {
        title: "하나의 벨트, 두 가지 시그니처",
        paragraphs: [
          "한쪽 면은 시그니처 모노그램 코티드 캔버스, 다른 한쪽은 솔리드 레더로 구성된 리버서블 디자인입니다.",
          "아이코닉한 M 버클은 탈착 가능하며, 스트랩을 잘라 원하는 길이로 조절할 수 있습니다.",
        ],
        highlights: [
          { label: "REVERSIBLE", value: "Monogram Coated Canvas · Solid Leather" },
          { label: "BUCKLE", value: "Detachable M Buckle" },
          { label: "ADJUSTMENT", value: "Cut-to-Length" },
        ],
      },
      materials: { title: "Coated Canvas & Leather" },
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
    size: "38IT",
    stock: 1,
    styleNo: "MESEAAJ02WG038",
    image: sneakersImage,
    images: [sneakersImage],
    imageView: { scale: 1.38, translateY: "-30px" },
    stocks: createMainStoreStock(1),
    variants: [
      { size: "36IT", italianEu: "36", us: "6", uk: "3", koreanMm: "230", jp: "23", cn: "23", stock: 2 },
      { size: "37IT", italianEu: "37", us: "7", uk: "4", koreanMm: "240", jp: "24", cn: "24", stock: 0 },
      { size: "38IT", italianEu: "38", us: "8", uk: "5", koreanMm: "250", jp: "25", cn: "25", stock: 1 },
      { size: "39IT", italianEu: "39", us: "9", uk: "6", koreanMm: "260", jp: "26", cn: "26", stock: 1 },
      { size: "40IT", italianEu: "40", us: "7.5", uk: "6.5", koreanMm: "260", jp: "26", cn: "26", stock: 0 },
      { size: "41IT", italianEu: "41", us: "8.5", uk: "7.5", koreanMm: "265", jp: "26.5", cn: "26.5", stock: 2 },
      { size: "42IT", italianEu: "42", us: "9", uk: "8", koreanMm: "270", jp: "27", cn: "27", stock: 0 },
      { size: "43IT", italianEu: "43", us: "10", uk: "9", koreanMm: "280", jp: "28", cn: "28", stock: 1 },
    ].map((variant, index) => ({
      id: 701 + index,
      productId: 7,
      name: "네오 터레인 모노그램 레더 로우탑 스니커즈",
      color: "Egret",
      ...variant,
      image: sneakersImage,
      dimensions: variant.size,
      strap: "Low-top",
      storage: "Italian Calf Leather",
      price: 770000,
    })),
    sizeCompareFields: [
      { label: "이탈리아 / EU", valueKey: "italianEu" },
      { label: "미국", valueKey: "us" },
      { label: "영국", valueKey: "uk" },
      { label: "한국", valueKey: "koreanMm" },
      { label: "일본", valueKey: "jp" },
      { label: "중국", valueKey: "cn" },
      { label: "재고", valueKey: "stock", format: "stock" },
    ],
    specs: [
      { label: "PRODUCT TYPE", value: "Low-Top Sneakers" },
      { label: "UPPER", value: "100% Calf Leather" },
      { label: "TRIM", value: "100% Calf Leather" },
      { label: "LINING", value: "Leather Lining with Mesh" },
      { label: "INSOLE", value: "Removable OrthoLite® Memory Foam Insole" },
      { label: "OUTSOLE", value: "Rubber Outsole · MCM Logo Motif" },
    ],
    materials: [
      {
        id: 1,
        name: "송아지 가죽 어퍼",
        location: "Upper",
        description: "어퍼와 트림에 100% 송아지 가죽을 사용해 부드러운 질감과 견고한 구조를 완성했습니다.",
      },
      {
        id: 2,
        name: "Leather & Mesh Lining",
        location: "Lining",
        description: "가죽과 메쉬를 조합한 안감을 적용해 편안한 착용감과 통기성을 높였습니다.",
      },
      {
        id: 3,
        name: "OrthoLite® Memory Foam",
        location: "Insole",
        description: "탈착 가능한 OrthoLite® 메모리폼 인솔을 적용해 쿠셔닝과 발의 편안함을 강화했습니다.",
      },
      {
        id: 4,
        name: "Rubber Outsole",
        location: "Outsole",
        description: "러버 아웃솔을 사용해 안정적인 접지력과 내구성을 제공합니다.",
      },
    ],
    careGuide: [
      { title: "LIQUIDS", content: "알코올이 함유된 물질 예: 향수, 화장품, 오일 및 물과의 접촉을 피하십시오." },
      { title: "BEFORE CLEANING", content: "클리닝 전에 내부 삭스를 제거하세요." },
      { title: "DRYING", content: "클리닝 후 실내 온도에서 건조하세요." },
      { title: "OUTSOLE", content: "아웃솔은 부드러운 브러시를 사용해 세척하세요." },
      { title: "UPPER", content: "어퍼는 살짝 물에 적신 코튼 천을 사용해 세척하세요." },
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
        { title: "MONOGRAM", content: "Embossed Visetos Monogram" },
        { title: "TONGUE", content: "Laurel Logo Label" },
        { title: "HEEL", content: "Leather Diamond Patch" },
        { title: "OUTSOLE", content: "Rubber Outsole · MCM Logo Motif" },
      ],
      design: {
        title: "비세토스 모노그램으로 완성한 로우탑 실루엣",
        paragraphs: [
          "클래식한 비세토스 모노그램이 새겨진 이탈리안 송아지 가죽 어퍼로 완성한 로우탑 스니커즈입니다.",
          "바이에른 다이아몬드를 참고한 우븐 텅 라벨과 가죽 힐 패치가 디자인에 포인트를 더합니다.",
        ],
        highlights: [
          { label: "MONOGRAM", value: "Embossed Visetos Monogram" },
          { label: "TONGUE", value: "Laurel Logo Label" },
          { label: "HEEL", value: "Leather Diamond Patch" },
          { label: "OUTSOLE", value: "Rubber Outsole · MCM Logo Motif" },
        ],
      },
      materials: { title: "100% Calf Leather" },
    },
  },
  {
    id: 8,
    category: "SCARF",
    collection: "VISETOS",
    name: "모노그램 프린트 트라이앵글 실크 스카프",
    price: 390000,
    color: "Cognac",
    colors: ["Cognac", "Soft Pink"],
    size: "Free",
    stock: 3,
    styleNo: "MEFGAMM11PZ001",
    image: monogramTriangleSilkScarfImage,
    images: [monogramTriangleSilkScarfImage],
    imageView: { scale: 1.05 },
    stocks: createMainStoreStock(3),
    variants: [
      {
        id: 801,
        productId: 8,
        name: "모노그램 프린트 트라이앵글 실크 스카프",
        color: "Cognac",
        size: "Free",
        image: monogramTriangleSilkScarfImage,
        dimensions: "70 x 70 x 0 cm",
        strap: "-",
        storage: "Triangular Silhouette",
        price: 390000,
        stock: 3,
      },
    ],
    specs: [
      { label: "DIMENSIONS", value: "70 x 70 x 0 cm" },
      { label: "MATERIAL", value: "100% Silk" },
      { label: "PATTERN", value: "Visetos Monogram Print · MCM Logo Stripe Motif" },
      { label: "SHAPE", value: "Triangular Silhouette" },
    ],
    materials: [
      {
        id: 1,
        name: "실크 소재",
        location: "Material",
        description: "100% 이탈리아 실크를 사용해 부드러운 촉감과 은은한 광택을 완성했습니다.\n가볍고 유연한 소재감이 자연스러운 드레이프를 만들어 다양한 연출이 가능합니다.",
      },
      {
        id: 2,
        name: "MATERIAL",
        location: "Material",
        description: "100% Silk",
      },
      {
        id: 3,
        name: "TEXTURE",
        location: "Texture",
        description: "Soft & Smooth",
      },
      {
        id: 4,
        name: "FINISH",
        location: "Finish",
        description: "Lightweight & Drapey",
      },
      {
        id: 5,
        name: "CRAFT",
        location: "Craft",
        description: "Fine Edge Finish",
      },
    ],
    careGuide: [
      { title: "드라이클리닝 전용", content: "스카프는 드라이클리닝으로만 관리해 주세요. 물세탁은 피하고, 제품의 소재 특성에 맞는 방식으로 관리하는 것을 권장합니다." },
      { title: "더스트 백에 넣어 보관", content: "제공된 보호용 더스트 백에 넣어 직사광선이나 밝은 조명을 피해 서늘하고 건조한 곳에 보관해 주세요." },
      { title: "젖거나 오염되지 않도록 주의", content: "표면이 젖거나 오염되었을 경우 보풀이 없는 밝은 색상의 흡수성 천으로 닦아 말려주세요." },
      { title: "비누·솔벤트 사용 금지", content: "비누 또는 솔벤트를 사용하지 마세요." },
      { title: "거친 표면과의 마찰 주의", content: "제품이 거친 표면에 긁히거나 마찰되지 않도록 주의해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "어떤 형태의 스카프인가요?",
        answer: "삼각형 실루엣의 실크 스카프로, 스카프나 리본, 가방 핸들 장식으로 활용하기 좋습니다.",
      },
      {
        question: "소재는 무엇인가요?",
        answer: "100% 이탈리아 실크를 사용해 부드러운 촉감과 은은한 광택을 완성했습니다.",
      },
      {
        question: "어떻게 관리하나요?",
        answer: "드라이클리닝으로만 관리하고, 보관할 때는 더스트 백에 넣어 직사광선과 밝은 조명을 피해 주세요.",
      },
    ],
    story: {
      sections: [
        { title: "SILHOUETTE", content: "Triangular Shape" },
        { title: "PATTERN", content: "Visetos Monogram" },
        { title: "BORDER", content: "MCM Logo & Stripe" },
        { title: "STYLING", content: "Scarf · Ribbon · Bag Handle" },
      ],
      design: {
        title: "MCM Triangle Silk Scarf",
        paragraphs: [
          "뮌헨 하우스의 새로운 실루엣을 제안하는 실크 스카프입니다.",
          "비세토스 모노그램과 MCM 로고 모티프를 조화롭게 배치해 브랜드의 아이덴티티를 표현했습니다.",
          "삼각형 실루엣과 스트라이프 테두리가 어우러져 다양한 스타일링에 활용할 수 있는 디자인을 완성합니다.",
        ],
        highlights: [
          { label: "SILHOUETTE", value: "Triangular Shape" },
          { label: "PATTERN", value: "Visetos Monogram" },
          { label: "BORDER", value: "MCM Logo & Stripe" },
          { label: "STYLING", value: "Scarf · Ribbon · Bag Handle" },
        ],
      },
      materials: { title: "100% Italian Silk" },
    },
  },
  {
    id: 9,
    category: "BAG",
    collection: "VISETOS",
    collectionName: "VISETOS",
    collection_name: "VISETOS",
    groupId: 9,
    group_id: 9,
    groupName: "Aren Hobo",
    group_name: "Aren Hobo",
    name: "Aren Hobo In Visetos",
    price: 1290000,
    color: "Cognac",
    colors: ["Cognac", "Soft Pink", "Black"],
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
    stocks: createMainStoreStock(3),
    variants: [
      {
        id: 901,
        productId: 9,
        name: "Aren Hobo In Visetos Small",
        color: "Cognac",
        size: "Small",
        image: hoboBagImage,
        dimensions: "10 x 26 x 19 cm",
        strap: "125-133 cm",
        storage: "Tablet / Mobile Phone / AirPods / AirPods Max",
        price: 1290000,
        stock: 3,
      },
      {
        id: 902,
        productId: 9,
        name: "Aren Hobo In Visetos Large",
        color: "Cognac",
        size: "Large",
        image: hoboBagLargeImage,
        dimensions: "11 x 34 x 33 cm",
        strap: "92.5-116.5 cm",
        storage: "Laptop / Tablet / AirPods Max / Tumbler",
        price: 1450000,
        stock: 2,
      },
    ],
    specs: [
      { label: "STYLE NO.", value: "MWHESSTA01CO001" },
      { label: "DIMENSIONS", value: "10 x 26 x 19 cm" },
      { label: "CLOSURE", value: "Zip Closure" },
      { label: "STRAP", value: "Adjustable Leather Shoulder Strap, 125-133 cm" },
      { label: "STORAGE", value: "Tablet / Mobile Phone / AirPods / AirPods Max" },
    ],
    sizeCompareFields: [
      { label: "카테고리", valueKey: "name" },
      { label: "크기", valueKey: "dimensions", format: "dimensions" },
      { label: "스트랩", valueKey: "strap", format: "dash" },
      { label: "수납", valueKey: "storage", format: "storage" },
      { label: "가격", valueKey: "price", format: "price" },
      { label: "재고", valueKey: "stock", format: "stock" },
    ],
    materials: [
      {
        id: 1,
        name: "Visetos 패턴",
        location: "Body",
        description: "MCM의 시그니처 Visetos 모노그램 캔버스를 바디에 사용했습니다.\n제품의 주요 소재로, 클래식한 모노그램 패턴이 Aren Hobo의 전체적인 디자인을 완성합니다.",
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
        description: "가방 내부에는 스웨이드 마감의 마이크로파이버 안감을 사용했습니다.",
        image: hoboSuedeMicrofiberMaterialImage,
        imageStyle: { height: "126.14%", left: "-28.26%", top: "-18.6%", width: "152.17%" },
      },
    ],
    careGuide: [
      {
        title: "STORAGE",
        content: "더스트 백에 넣어 직사광선과 밝은 빛을 피해 서늘하고 건조한 곳에 보관해 주세요.",
      },
      {
        title: "CLEANING",
        content: "표면이 젖거나 오염되었을 경우 밝은색의 흡수성 천으로 닦아주세요.",
      },
      {
        title: "LEATHER",
        content: "가죽이 젖거나 얼룩지지 않도록 주의해 주세요.",
      },
      {
        title: "CAUTION",
        content: "비누나 솔벤트를 사용하지 말고 거친 표면과의 마찰을 피해주세요.",
      },
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
        { title: "COLLECTION", content: "Visetos Collection" },
        { title: "DESIGN", content: "Softness & Structure" },
        { title: "SIGNATURE", content: "Leather Hang Tag" },
        { title: "HERITAGE", content: "MCM Luggage" },
      ],
      design: {
        paragraphs: [
          "클래식한 호보 실루엣을 현대적으로 재해석한 Aren Hobo는 부드러움과 구조감의 이상적인 균형을 보여줍니다.",
          "MCM 헤리티지 러기지에서 가져온 디자인 요소인 탈부착 가능한 가죽 행택과 로고가 각인된 패드락이 더해져 Aren Hobo만의 디자인을 완성합니다.",
          "또한 조절 가능한 가죽 스트랩이 적용된 비세토스 호보백으로, 클래식한 실루엣과 MCM의 헤리티지 러기지 디테일을 현대적으로 담아낸 디자인입니다.",
        ],
      },
      materials: { title: "Visetos Monogram Canvas" },
    },
  },
  {
    id: 10,
    category: "CLOTHING",
    collection: "LAUREL",
    name: "모노그램 크롭 티셔츠",
    price: 390000,
    color: "White",
    colors: ["White"],
    size: "S",
    stock: 1,
    styleNo: "MFTGSMM05WT00L",
    image: monogramCropTshirtImage,
    images: [monogramCropTshirtImage],
    imageView: { scale: 1.04 },
    stocks: createMainStoreStock(1),
    variants: [
      {
        size: "S",
        koreanSize: "55",
        height: "165-170 cm",
        chest: "84-86 cm",
        stock: 1,
      },
      {
        size: "M",
        koreanSize: "66",
        height: "167-172 cm",
        chest: "92-96 cm",
        stock: 0,
      },
      {
        size: "L",
        koreanSize: "77",
        height: "168-173 cm",
        chest: "98-102 cm",
        stock: 1,
      },
    ].map((variant, index) => ({
      id: 1001 + index,
      productId: 10,
      name: "모노그램 크롭 티셔츠",
      color: "White",
      ...variant,
      image: monogramCropTshirtImage,
      dimensions: variant.size,
      strap: "Slim Fit",
      storage: "100% Organic Cotton",
      price: 390000,
    })),
    sizeCompareFields: [
      { label: "카테고리", valueKey: "size" },
      { label: "한국 사이즈", valueKey: "koreanSize" },
      { label: "신장", valueKey: "height", format: "dash" },
      { label: "가슴둘레", valueKey: "chest", format: "dash" },
      { label: "가격", valueKey: "price", format: "price" },
      { label: "재고", valueKey: "stock", format: "availability" },
    ],
    specs: [
      { label: "STYLE NO.", value: "MFTGSMM05WT00L" },
      { label: "FIT", value: "Slim Fit" },
      { label: "LENGTH", value: "Cropped Length" },
      { label: "MATERIAL", value: "100% Organic Cotton" },
      { label: "MODEL", value: "173 cm · Wearing Size S" },
    ],
    materials: [
      {
        id: 1,
        name: "Organic Cotton Jersey",
        location: "Body",
        description:
          "바디에 100% 오가닉 면을 사용한 코튼 저지 소재로 제작했습니다. 부드럽고 편안한 소재감이 크롭 실루엣과 자연스럽게 어우러집니다.",
      },
      {
        id: 2,
        name: "BODY",
        location: "Body",
        description: "100% Organic Cotton 바디 전체에 오가닉 면 100%를 사용했습니다.",
      },
      {
        id: 3,
        name: "FABRIC",
        location: "Fabric",
        description: "Cotton Jersey 오가닉 면을 기반으로 한 저지 소재를 사용했습니다.",
      },
      {
        id: 4,
        name: "ELASTIC",
        location: "Hem",
        description: "Visetos Monogram Jacquard Elastic 밑단에 비세토스 모노그램 자카드 신축성 밴드를 적용했습니다.",
      },
      {
        id: 5,
        name: "EMBROIDERY",
        location: "Chest",
        description: "Tone-on-Tone Laurel Logo Embroidery 가슴 부분에 톤온톤 라우렐 로고 자수를 적용했습니다.",
      },
    ],
    careGuide: [
      { title: "CLEANING", content: "손세탁 또는 드라이클리닝으로 관리해 주세요." },
      { title: "BLEACH", content: "표백제를 사용하지 마세요." },
      { title: "DRYING", content: "건조기 사용을 피해주세요." },
      { title: "IRONING", content: "다림질할 때는 천을 대고 다림질해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "핏은 어떤가요?",
        answer: "크롭 기장의 슬림 핏 티셔츠로, 밑단의 자카드 밴드가 실루엣에 포인트를 줍니다.",
      },
      {
        question: "소재는 무엇인가요?",
        answer: "바디 전체에 100% 오가닉 코튼 저지 소재를 사용했습니다.",
      },
      {
        question: "어떻게 관리하나요?",
        answer: "손세탁 또는 드라이클리닝으로 관리하고, 표백제와 건조기 사용은 피해주세요.",
      },
    ],
    story: {
      sections: [
        { title: "SIGNATURE", content: "Tone-on-Tone Laurel Logo" },
        { title: "DETAIL", content: "Visetos Jacquard Elastic" },
        { title: "SILHOUETTE", content: "Cropped Length" },
        { title: "FIT", content: "Slim Fit" },
      ],
      design: {
        title: "Laurel Logo Crop T-Shirt",
        paragraphs: [
          "밑단에 비세토스 모노그램 자카드 신축성 밴드로 포인트를 준 크롭 길이의 오가닉 코튼 티셔츠입니다.",
          "하우스의 시그니처인 라우렐 엠블럼은 가슴 부분에 톤온톤 자수로 표현해 절제된 브랜드 아이덴티티를 완성합니다.",
          "크롭 기장의 슬림핏 실루엣과 밑단의 자카드 밴드가 조화를 이루어 깔끔하면서도 개성 있는 스타일을 보여줍니다.",
        ],
        highlights: [
          { label: "SIGNATURE", value: "Tone-on-Tone Laurel Logo" },
          { label: "DETAIL", value: "Visetos Jacquard Elastic" },
          { label: "SILHOUETTE", value: "Cropped Length" },
          { label: "FIT", value: "Slim Fit" },
        ],
      },
      materials: { title: "Organic Cotton Jersey" },
    },
  },
  {
    id: 11,
    category: "BOTTOM",
    collection: "DISCO",
    name: "루렉스 데님 플레어 팬츠",
    price: 830000,
    color: "Indigo",
    colors: ["Indigo"],
    size: "38IT",
    stock: 1,
    styleNo: "MFPGAMM04LI038",
    image: denimPantsImage,
    images: [denimPantsImage],
    imageView: { scale: 1.02 },
    stocks: createMainStoreStock(1),
    variants: [
      {
        size: "38IT",
        sizeCategory: "XS",
        koreanSize: "44",
        height: "160-165 cm",
        waist: "24-25",
        stock: 1,
      },
      {
        size: "40IT",
        sizeCategory: "S",
        koreanSize: "55",
        height: "165-170 cm",
        waist: "26-27",
        stock: 0,
      },
      {
        size: "42IT",
        sizeCategory: "M",
        koreanSize: "66",
        height: "167-172 cm",
        waist: "28-29",
        stock: 1,
      },
    ].map((variant, index) => ({
      id: 1101 + index,
      productId: 11,
      name: "루렉스 데님 플레어 팬츠",
      color: "Indigo",
      ...variant,
      image: denimPantsImage,
      dimensions: variant.sizeCategory,
      strap: "Slim Fit",
      storage: "Flared Denim Pants",
      price: 830000,
    })),
    sizeCompareFields: [
      { label: "카테고리", valueKey: "sizeCategory" },
      { label: "한국 사이즈", valueKey: "koreanSize" },
      { label: "신장", valueKey: "height", format: "dash" },
      { label: "허리 사이즈", valueKey: "waist", format: "dash" },
      { label: "가격", valueKey: "price", format: "price" },
      { label: "재고", valueKey: "stock", format: "availability" },
    ],
    specs: [
      { label: "STYLE NO.", value: "MFPGAMM04LI038" },
      { label: "FIT", value: "Slim Fit" },
      { label: "STYLE", value: "Flared Denim Pants" },
      { label: "POCKET", value: "5-Pocket Style · Silicon Logo Plate Patch" },
      { label: "HARDWARE", value: "Logo-Engraved Metal Buttons · Diamond Studs" },
    ],
    materials: [
      {
        id: 1,
        name: "Metallic Lurex Denim",
        location: "Body",
        description:
          "메탈릭 루렉스 섬유를 직조한 데님 소재로 은은한 광택을 더했습니다. 코튼과 폴리에스터를 혼방하고 금속 코팅 섬유를 사용해 독특한 소재감을 완성했습니다.",
      },
      {
        id: 2,
        name: "BODY",
        location: "Body",
        description: "66.2% Cotton",
      },
      {
        id: 3,
        name: "POLYESTER",
        location: "Body",
        description: "22.8% Polyester",
      },
      {
        id: 4,
        name: "METALLIC FIBER",
        location: "Body",
        description: "11% Metal-Coated Fiber",
      },
      {
        id: 5,
        name: "POCKET LINING",
        location: "Pocket Lining",
        description: "100% Cotton",
      },
    ],
    careGuide: [
      { title: "CLEANING", content: "손세탁 또는 드라이클리닝으로 관리해 주세요." },
      { title: "BLEACH", content: "표백제를 사용하지 마세요." },
      { title: "DRYING", content: "건조기 사용을 피해주세요." },
      { title: "HARDWARE", content: "세탁 및 관리 시 로고 각인 버튼과 스터드 하드웨어가 손상되지 않도록 주의해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "핏은 어떤가요?",
        answer: "슬림하게 떨어지다가 밑단으로 자연스럽게 퍼지는 플레어 데님 팬츠입니다.",
      },
      {
        question: "소재는 무엇인가요?",
        answer: "코튼과 폴리에스터를 혼방한 데님에 메탈릭 루렉스 섬유를 직조해 은은한 광택감을 더했습니다.",
      },
      {
        question: "관리할 때 주의할 점이 있나요?",
        answer: "손세탁 또는 드라이클리닝으로 관리하고, 로고 각인 버튼과 스터드 하드웨어가 손상되지 않도록 주의해 주세요.",
      },
    ],
    story: {
      sections: [
        { title: "SILHOUETTE", content: "Flared Silhouette" },
        { title: "POCKET", content: "5-Pocket Style" },
        { title: "BACK DETAIL", content: "Visetos Monogram Patch" },
        { title: "LOGO DETAIL", content: "Silicon Logo Plate Patch" },
      ],
      design: {
        title: "MCM Disco Flared Denim",
        paragraphs: [
          "70년대와 디스코 문화에서 영감을 받은 플레어 데님 팬츠로, 슬림한 실루엣에서 자연스럽게 퍼지는 플레어 라인이 특징입니다.",
          "5포켓 스타일을 바탕으로 비세토스 모노그램 패치와 실리콘 로고 플레이트 패치를 더해 MCM의 시그니처 아이덴티티를 표현했습니다.",
        ],
        highlights: [
          { label: "SILHOUETTE", value: "Flared Silhouette" },
          { label: "POCKET", value: "5-Pocket Style" },
          { label: "BACK DETAIL", value: "Visetos Monogram Patch" },
          { label: "LOGO DETAIL", value: "Silicon Logo Plate Patch" },
        ],
      },
      materials: { title: "Metallic Lurex Denim" },
    },
  },
  {
    id: 12,
    category: "SHOES",
    collection: "VISETOS",
    name: "모노그램 플랫폼 양가죽 샌들",
    price: 890000,
    color: "Cognac",
    colors: ["Cognac"],
    size: "36IT",
    stock: 2,
    styleNo: "MESGAMM06CO036",
    image: womanMonogramSandalImage,
    images: [womanMonogramSandalImage],
    imageView: { scale: 1.2, translateY: "-12px" },
    stocks: createMainStoreStock(2),
    variants: [
      {
        size: "36IT",
        koreanMm: "230",
        us: "6",
        uk: "3",
        eu: "36",
        jp: "23",
        stock: 2,
      },
      {
        size: "37IT",
        koreanMm: "240",
        us: "7",
        uk: "4",
        eu: "37",
        jp: "24",
        stock: 1,
      },
      {
        size: "38IT",
        koreanMm: "250",
        us: "8",
        uk: "5",
        eu: "38",
        jp: "25",
        stock: 2,
      },
      {
        size: "39IT",
        koreanMm: "260",
        us: "9",
        uk: "6",
        eu: "39",
        jp: "26",
        stock: 3,
      },
    ].map((variant, index) => ({
      id: 1201 + index,
      productId: 12,
      name: "모노그램 플랫폼 양가죽 샌들",
      color: "Cognac",
      ...variant,
      image: womanMonogramSandalImage,
      dimensions: variant.size,
      strap: "Leather Buckle Strap",
      storage: "Platform Sandal",
      price: 890000,
    })),
    sizeCompareFields: [
      { label: "카테고리", valueKey: "size" },
      { label: "한국 (mm)", valueKey: "koreanMm" },
      { label: "미국 (US)", valueKey: "us" },
      { label: "영국 (UK)", valueKey: "uk" },
      { label: "유럽 (EU)", valueKey: "eu" },
      { label: "일본 (cm)", valueKey: "jp" },
      { label: "재고", valueKey: "stock", format: "stock" },
    ],
    specs: [
      { label: "STYLE NO.", value: "MESGAMM06CO036" },
      { label: "UPPER", value: "램스킨 레더 · 비세토스 모노그램 프린트" },
      { label: "SOLE", value: "EVA 플랫폼 솔" },
      { label: "STRAP", value: "뒷면 레더 버클 스트랩" },
      { label: "HARDWARE", value: "골드톤 바이에른 다이아몬드 메탈 버클" },
    ],
    materials: [
      {
        id: 1,
        name: "Lambskin Leather",
        location: "Upper",
        description: "부드러운 양가죽을 사용해 어퍼와 풋베드에 편안하고 유연한 착용감을 더했습니다.",
      },
      {
        id: 2,
        name: "Visetos Monogram Print",
        location: "Upper",
        description: "램스킨 어퍼에 MCM의 시그니처 비세토스 모노그램을 프린트했습니다.",
      },
      {
        id: 3,
        name: "EVA Platform Sole",
        location: "Sole",
        description: "EVA 플랫폼 솔을 적용해 가벼운 착용감과 안정적인 쿠셔닝을 제공합니다.",
      },
      {
        id: 4,
        name: "Gold-Tone Metal Hardware",
        location: "Buckle",
        description: "골드톤 바이에른 다이아몬드 메탈 버클을 사용해 MCM의 헤리티지를 강조했습니다.",
      },
    ],
    careGuide: [
      { title: "STORAGE", content: "직사광선, 화기 및 습기를 피해 보관해 주세요." },
      { title: "CLEANING", content: "아웃솔은 부드러운 브러시로, 어퍼는 살짝 적신 부드러운 면 천으로 닦아주세요." },
      { title: "LEATHER", content: "수분 및 알코올 성분이 포함된 향수, 메이크업 제품, 오일 등이 제품에 닿지 않도록 주의해 주세요." },
      { title: "CAUTION", content: "제품이 젖었을 경우 세척하기 전에 상온에서 충분히 건조해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "어떤 디자인의 샌들인가요?",
        answer: "비세토스 모노그램을 프린트한 크로스 스트랩과 플랫폼 실루엣이 조화를 이루는 샌들입니다.",
      },
      {
        question: "착용감은 어떤가요?",
        answer: "부드러운 램스킨 풋베드와 EVA 플랫폼 솔을 적용해 가볍고 안정적인 착용감을 제공합니다.",
      },
      {
        question: "사이즈는 어떻게 보나요?",
        answer: "36IT부터 39IT까지 있으며, 사이즈 비교에서 한국, 미국, 영국, 유럽, 일본 기준을 함께 확인할 수 있습니다.",
      },
    ],
    story: {
      sections: [
        { title: "COLLECTION", content: "Visetos Collection" },
        { title: "DESIGN", content: "Platform Sandal" },
        { title: "SIGNATURE", content: "Visetos Monogram" },
        { title: "HERITAGE", content: "Bavarian Diamond" },
      ],
      design: {
        title: "Visetos Monogram Sandal",
        paragraphs: [
          "비세토스 모노그램을 프린트한 크로스 스트랩과 플랫폼 실루엣이 조화를 이루는 샌들입니다.",
          "부드러운 램스킨 풋베드와 버클 스트랩을 더해 편안한 착용감을 제공합니다.",
          "MCM의 시그니처 모노그램과 바이에른 다이아몬드에서 영감을 받은 메탈 디테일을 현대적인 샌들 디자인으로 재해석했습니다.",
        ],
        highlights: [
          { label: "COLLECTION", value: "Visetos Collection" },
          { label: "DESIGN", value: "Platform Sandal" },
          { label: "SIGNATURE", value: "Visetos Monogram" },
          { label: "HERITAGE", value: "Bavarian Diamond" },
        ],
      },
      materials: { title: "Lambskin Leather" },
    },
  },
  {
    id: 13,
    category: "TOP",
    collection: "WESTERN",
    name: "모노그램 플록 포켓 웨스턴 셔츠",
    price: 690000,
    color: "della robbia blue",
    colors: ["della robbia blue"],
    size: "40IT",
    sizes: ["40IT", "42IT", "44IT"],
    image: monogramShirtsImage,
    images: [monogramShirtsImage],
    imageView: { scale: 1.04 },
    stocks: createMainStoreStock(1),
    variants: [
      {
        size: "40IT",
        sizeCategory: "S",
        koreanSize: "55",
        height: "165–170 cm",
        chest: "88–90 cm",
        stock: 1,
      },
      {
        size: "42IT",
        sizeCategory: "M",
        koreanSize: "66",
        height: "167–172 cm",
        chest: "92–96 cm",
        stock: 0,
      },
      {
        size: "44IT",
        sizeCategory: "L",
        koreanSize: "77",
        height: "168–173 cm",
        chest: "98–102 cm",
        stock: 1,
      },
    ].map((variant, index) => ({
      id: 1301 + index,
      productId: 13,
      name: "모노그램 플록 포켓 웨스턴 셔츠",
      color: "della robbia blue",
      ...variant,
      image: monogramShirtsImage,
      dimensions: variant.size,
      strap: variant.height,
      storage: variant.chest,
      price: 390000,
    })),
    sizeCompareFields: [
      { label: "카테고리", valueKey: "sizeCategory" },
      { label: "한국 사이즈", valueKey: "koreanSize" },
      { label: "신장", valueKey: "height" },
      { label: "가슴둘레", valueKey: "chest" },
      { label: "가격", valueKey: "price", format: "price" },
      { label: "재고", valueKey: "stock", format: "availability" },
    ],
    specs: [
      { label: "STYLE NO.", value: "MFHGAMM02L8040" },
      { label: "FIT", value: "Regular Fit" },
      { label: "CLOSURE", value: "Button Closure" },
      { label: "SLEEVE", value: "Long Sleeve" },
      { label: "POCKET", value: "Chest Pocket · Visetos Monogram Flock Print" },
    ],
    materials: [
      {
        id: 1,
        name: "Rayon-Polyester Blend",
        location: "Body",
        description:
          "레이온과 폴리에스터를 혼방한 소재로 제작해 셔츠 특유의 자연스러운 실루엣을 완성했습니다. 바디는 레이온 35%, 폴리에스터 65%로 구성되어 있습니다.",
      },
      {
        id: 2,
        name: "BODY",
        location: "Fabric",
        description: "Rayon 35% · Polyester 65%",
      },
      {
        id: 3,
        name: "RAYON",
        location: "Fabric",
        description: "35% Rayon",
      },
      {
        id: 4,
        name: "POLYESTER",
        location: "Fabric",
        description: "65% Polyester",
      },
      {
        id: 5,
        name: "CRAFT",
        location: "Pocket",
        description: "Visetos Monogram Flock Print",
      },
    ],
    careGuide: [
      { title: "CLEANING", content: "손세탁 또는 드라이클리닝으로 관리해 주세요." },
      { title: "BLEACH", content: "표백제를 사용하지 마세요." },
      { title: "DRYING", content: "건조기 사용을 피해 주세요." },
      { title: "IRONING", content: "다림질할 때는 천을 대고 다림질해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "어떤 핏의 셔츠인가요?",
        answer:
          "레귤러 핏의 롱 슬리브 셔츠로, 웨스턴 스타일 숄더 패널과 비세토스 모노그램 플록 포켓이 특징입니다.",
      },
      {
        question: "소재는 무엇인가요?",
        answer:
          "바디는 레이온 35%, 폴리에스터 65% 혼방 소재로 제작되어 자연스러운 실루엣을 보여줍니다.",
      },
      {
        question: "사이즈는 어떻게 보면 되나요?",
        answer:
          "40IT, 42IT, 44IT 옵션이 있으며 사이즈 비교에서 S, M, L 기준의 한국 사이즈와 추천 신장, 가슴둘레를 확인할 수 있습니다.",
      },
    ],
    story: {
      sections: [
        { title: "FIT", content: "Regular Fit" },
        { title: "CLOSURE", content: "Button Closure" },
        { title: "SLEEVE", content: "Long Sleeve" },
        { title: "POCKET", content: "Chest Pocket · Visetos Monogram Flock Print" },
      ],
      design: {
        title: "Western Panel Shirt",
        paragraphs: [
          "레이온과 폴리에스터 혼방 소재로 제작된 롱 슬리브 셔츠에 웨스턴 스타일의 디테일을 더했습니다.",
          "바이에른 다이아몬드 실루엣에서 영감을 받은 기하학적인 숄더 패널이 웨스턴 무드를 표현하며, 델라 로비아 블루 컬러에 비세토스 모노그램 포켓을 더해 MCM의 헤리티지를 은은하게 담아냈습니다.",
        ],
        highlights: [
          { label: "SHOULDER", value: "Western-Style Shoulder Panel" },
          { label: "MOTIF", value: "Bavarian Diamond-Inspired Geometric Detail" },
          { label: "POCKET", value: "Visetos Monogram Flock Print Pocket" },
          { label: "COLOR", value: "Della Robbia Blue" },
        ],
      },
      materials: { title: "Rayon-Polyester Blend" },
    },
  },
  {
    id: 14,
    category: "BOTTOM",
    collection: "BOUCLE",
    name: "부클레 팬츠",
    price: 790000,
    color: "navy blazer",
    colors: ["navy blazer"],
    size: "38IT",
    sizes: ["38IT", "40IT", "42IT", "44IT"],
    image: bouclePantsImage,
    images: [bouclePantsImage],
    imageView: { scale: 1.02 },
    stocks: createMainStoreStock(1),
    variants: [
      {
        size: "38IT",
        sizeCategory: "XS",
        koreanSize: "44",
        height: "160–165 cm",
        length: "105.2 cm",
        waist: "69.0 cm",
        stock: 0,
      },
      {
        size: "40IT",
        sizeCategory: "S",
        koreanSize: "55",
        height: "165–170 cm",
        length: "106.0 cm",
        waist: "73.0 cm",
        stock: 1,
      },
      {
        size: "42IT",
        sizeCategory: "M",
        koreanSize: "66",
        height: "167–172 cm",
        length: "107.4 cm",
        waist: "77.0 cm",
        stock: 0,
      },
      {
        size: "44IT",
        sizeCategory: "L",
        koreanSize: "77",
        height: "168–173 cm",
        length: "108.2 cm",
        waist: "81.0 cm",
        stock: 1,
      },
    ].map((variant, index) => ({
      id: 1401 + index,
      productId: 14,
      name: "부클레 팬츠",
      color: "navy blazer",
      ...variant,
      image: bouclePantsImage,
      dimensions: variant.size,
      strap: variant.length,
      storage: variant.waist,
      price: 790000,
    })),
    sizeCompareFields: [
      { label: "카테고리", valueKey: "sizeCategory" },
      { label: "한국 사이즈", valueKey: "koreanSize" },
      { label: "신장", valueKey: "height" },
      { label: "길이", valueKey: "length" },
      { label: "허리", valueKey: "waist" },
      { label: "재고", valueKey: "stock", format: "availability" },
    ],
    specs: [
      { label: "STYLE NO.", value: "MFPESMM03VC040" },
      { label: "FIT", value: "Regular Fit" },
      { label: "SILHOUETTE", value: "Wide Leg" },
      { label: "CLOSURE", value: "Button & Zip Closure" },
      { label: "POCKET", value: "Front Side Pockets · Back Welt Pocket" },
    ],
    materials: [
      {
        id: 1,
        name: "Bouclé Fabric",
        location: "Body",
        description:
          "폴리에스터와 코튼을 중심으로 폴리아미드를 혼방한 부클레 소재로 제작했습니다. 폴리에스터 트림을 더해 소재의 디테일을 완성했습니다.",
      },
      {
        id: 2,
        name: "POLYESTER",
        location: "Body",
        description: "49% Polyester",
      },
      {
        id: 3,
        name: "COTTON",
        location: "Body",
        description: "42% Cotton",
      },
      {
        id: 4,
        name: "POLYAMIDE",
        location: "Body",
        description: "9% Polyamide",
      },
      {
        id: 5,
        name: "TRIM",
        location: "Trim",
        description: "Polyester Trim",
      },
    ],
    careGuide: [
      { title: "CLEANING", content: "손세탁 가능하며, 드라이클리닝은 하지 마세요." },
      { title: "BLEACH", content: "표백제를 사용하지 마세요." },
      { title: "DRYING", content: "건조기 사용을 하지 마세요." },
      {
        title: "IRONING",
        content: "다림질할 때는 천을 덮어 다려 주세요. 마찰로 인한 필링(보풀)은 자연스럽게 발생할 수 있습니다.",
      },
    ],
    aiDocentFaqs: [
      {
        question: "어떤 실루엣인가요?",
        answer:
          "네이비 컬러의 와이드 레그 부클레 팬츠로, 화이트 배색 디테일과 골드 톤 버튼이 클래식한 대비를 만듭니다.",
      },
      {
        question: "소재 구성은 어떻게 되나요?",
        answer:
          "폴리에스터 49%, 코튼 42%, 폴리아미드 9%를 중심으로 한 부클레 패브릭에 폴리에스터 트림을 더했습니다.",
      },
      {
        question: "사이즈는 어떻게 확인하나요?",
        answer:
          "38IT부터 44IT까지 있으며, 사이즈 비교에서 XS부터 L까지의 한국 사이즈, 신장, 길이, 허리 정보를 확인할 수 있습니다.",
      },
    ],
    story: {
      sections: [
        { title: "FIT", content: "Regular Fit" },
        { title: "SILHOUETTE", content: "Wide Leg" },
        { title: "CLOSURE", content: "Button & Zip Closure" },
        { title: "POCKET", content: "Front Side Pockets · Back Welt Pocket" },
      ],
      design: {
        title: "Bouclé Wide-Leg Pants",
        paragraphs: [
          "네이비 컬러의 와이드 레그 부클레 팬츠에 화이트 배색 디테일을 더해 세련된 대비를 완성했습니다.",
          "로고 각인 골드 톤 메탈 버튼이 포인트가 되어 클래식한 분위기를 더하며, 매칭 재킷과 함께 셋업으로 연출할 수 있습니다.",
        ],
        highlights: [
          { label: "SILHOUETTE", value: "Wide Leg Design" },
          { label: "COLOR", value: "Navy · White Contrast" },
          { label: "HARDWARE", value: "Logo-Engraved Gold-Tone Metal Buttons" },
          { label: "STYLING", value: "Matching Jacket Styling" },
        ],
      },
      materials: { title: "Bouclé Fabric" },
    },
  },
  {
    id: 15,
    category: "SHOES",
    collection: "MCM FOOTWEAR",
    name: "송아지 가죽 플랫폼 로퍼",
    price: 930000,
    color: "Black",
    colors: ["Black"],
    size: "38IT",
    stock: 3,
    styleNo: "MESGAMM01BK036",
    image: roperImage,
    images: [roperImage],
    imageView: { scale: 1.28, translateY: "-18px" },
    stocks: createMainStoreStock(3),
    variants: [
      { size: "36IT", italianEu: "36", us: "6", uk: "3", koreanMm: "230", jp: "23", cn: "23", stock: 1 },
      { size: "37IT", italianEu: "37", us: "7", uk: "4", koreanMm: "240", jp: "24", cn: "24", stock: 2 },
      { size: "38IT", italianEu: "38", us: "8", uk: "5", koreanMm: "250", jp: "25", cn: "25", stock: 3 },
      { size: "39IT", italianEu: "39", us: "9", uk: "6", koreanMm: "260", jp: "26", cn: "26", stock: 2 },
      { size: "41IT", italianEu: "41", us: "8.5", uk: "7.5", koreanMm: "265", jp: "26.5", cn: "26.5", stock: 2 },
      { size: "42IT", italianEu: "42", us: "9", uk: "8", koreanMm: "270", jp: "27", cn: "27", stock: 1 },
      { size: "43IT", italianEu: "43", us: "10", uk: "9", koreanMm: "280", jp: "28", cn: "28", stock: 0 },
    ].map((variant, index) => ({
      id: 1501 + index,
      productId: 15,
      name: "송아지 가죽 플랫폼 로퍼",
      color: "Black",
      ...variant,
      image: roperImage,
      dimensions: variant.size,
      strap: "Platform Loafer",
      storage: "Calfskin Leather",
      price: 930000,
    })),
    sizeCompareFields: [
      { label: "이탈리아 / EU", valueKey: "italianEu" },
      { label: "미국", valueKey: "us" },
      { label: "영국", valueKey: "uk" },
      { label: "한국", valueKey: "koreanMm" },
      { label: "일본", valueKey: "jp" },
      { label: "중국", valueKey: "cn" },
      { label: "재고", valueKey: "stock", format: "stock" },
    ],
    specs: [
      { label: "STYLE NO.", value: "MESGAMM01BK036" },
      { label: "MATERIAL", value: "카프스킨 100%" },
      { label: "SOLE", value: "Vibram® EVA 플랫폼 아웃솔" },
      { label: "HARDWARE", value: "골드톤 메탈" },
      { label: "FIT", value: "플랫폼 로퍼 / 레귤러 핏" },
    ],
    materials: [
      {
        id: 1,
        name: "Italian Calfskin Leather",
        location: "Upper",
        description: "고급스러운 이탈리아산 카프스킨 100%를 어퍼에 사용했습니다.",
      },
      {
        id: 2,
        name: "Calfskin Footbed",
        location: "Footbed",
        description: "부드러운 카프스킨을 풋베드에 적용해 편안한 착화감을 제공합니다.",
      },
      {
        id: 3,
        name: "Vibram® EVA Platform",
        location: "Outsole",
        description: "가볍고 안정적인 Vibram® EVA 플랫폼 아웃솔을 적용했습니다.",
      },
      {
        id: 4,
        name: "Gold-Tone Metal Hardware",
        location: "Hardware",
        description: "바이에른 다이아몬드에서 영감을 받은 골드톤 메탈 스터드와 하드웨어를 사용했습니다.",
      },
    ],
    careGuide: [
      {
        title: "CLEANING",
        content: "어퍼는 살짝 적신 부드러운 면 천으로 가볍게 닦아주세요.",
      },
      {
        title: "SOLE",
        content: "아웃솔은 부드러운 브러시를 사용해 관리해 주세요.",
      },
      {
        title: "MOISTURE",
        content: "물이나 알코올, 향수·메이크업·오일 등의 접촉을 피해 주세요.",
      },
      {
        title: "CAUTION",
        content: "제품이 젖었을 경우 인솔을 제거한 후 실온에서 충분히 건조해 주세요. 엠보싱 로고에는 강한 압력을 가하지 마세요.",
      },
    ],
    aiDocentFaqs: [
      {
        question: "어떤 스타일의 신발인가요?",
        answer: "카프스킨 어퍼에 골드톤 바이에른 다이아몬드 스터드 장식을 더한 플랫폼 로퍼입니다.",
      },
      {
        question: "착화감은 어떤가요?",
        answer: "카프스킨 풋베드와 Vibram® EVA 플랫폼 아웃솔을 적용해 안정적이고 편안한 착화감을 제공합니다.",
      },
      {
        question: "사이즈는 어떻게 확인하나요?",
        answer: "36IT부터 43IT까지 국가별 사이즈 변환표와 매장 재고를 사이즈 비교 화면에서 확인할 수 있습니다.",
      },
    ],
    story: {
      sections: [
        { title: "COLLECTION", content: "MCM Footwear" },
        { title: "DESIGN", content: "Platform Loafer" },
        { title: "SIGNATURE", content: "Bavarian Diamond Studs" },
        { title: "HERITAGE", content: "MCM Leather Craftsmanship" },
      ],
      design: {
        title: "Bavarian Diamond Platform Loafer",
        paragraphs: [
          "MCM의 장인 정신과 가죽 공예 기술을 현대적으로 재해석한 플랫폼 로퍼입니다.",
          "고급스러운 블랙 카프스킨에 바이에른 다이아몬드에서 영감을 받은 메탈 스터드 장식을 더해 MCM만의 아이코닉한 디자인을 완성했습니다.",
          "Vibram® EVA 플랫폼 솔과 부드러운 카프스킨 풋베드가 편안한 착화감과 구조적인 실루엣을 제공합니다.",
        ],
        highlights: [
          { label: "COLLECTION", value: "MCM Footwear" },
          { label: "DESIGN", value: "Platform Loafer" },
          { label: "SIGNATURE", value: "Bavarian Diamond Studs" },
          { label: "HERITAGE", value: "MCM Leather Craftsmanship" },
        ],
      },
      materials: { title: "Italian Calfskin Leather" },
    },
  },
  {
    id: 16,
    category: "SHOES",
    name: "비세토스 샌들",
    description:
      "시그니처 비세토스 모노그램 캔버스에 바이에른 다이아몬드에서 영감을 받은 메탈 버클을 더한 샌들입니다.",
    price: 770000,
    color: "Black",
    colors: ["Black", "Cognac"],
    size: "36IT, 37IT, 38IT, 39IT, 41IT, 42IT, 43IT",
    stock: 8,
    brand: "MCM",
    collection: "Visetos Collection",
    styleNo: "MEXFSMM02BK036",
    image: basetonesSandalImage,
    images: [basetonesSandalImage],
    imageView: {
      front: basetonesSandalImage,
      side: basetonesSandalImage,
      back: basetonesSandalImage,
    },
    stocks: createMainStoreStock(1),
    variants: [
      { size: "36IT", eu: "36", us: "6", uk: "3", kr: "230", jp: "23", cn: "23", stock: 0 },
      { size: "37IT", eu: "37", us: "7", uk: "4", kr: "240", jp: "24", cn: "24", stock: 0 },
      { size: "38IT", eu: "38", us: "8", uk: "5", kr: "250", jp: "25", cn: "25", stock: 1 },
      { size: "39IT", eu: "39", us: "9", uk: "6", kr: "260", jp: "26", cn: "26", stock: 3 },
      { size: "41IT", eu: "41", us: "8.5", uk: "7.5", kr: "265", jp: "26.5", cn: "26.5", stock: 0 },
      { size: "42IT", eu: "42", us: "9", uk: "8", kr: "270", jp: "27", cn: "27", stock: 2 },
      { size: "43IT", eu: "43", us: "10", uk: "9", kr: "280", jp: "28", cn: "28", stock: 2 },
    ].map((variant, index) => ({
      id: 1601 + index,
      productId: 16,
      name: "비세토스 샌들",
      color: "Black",
      category: variant.size,
      size: variant.size,
      dimensions: variant.size,
      strap: "Adjustable Strap Sandal",
      storage: "Visetos Monogram Canvas",
      price: 770000,
      image: basetonesSandalImage,
      ...variant,
    })),
    sizeCompareFields: [
      { label: "이탈리아 / EU", valueKey: "eu" },
      { label: "미국", valueKey: "us" },
      { label: "영국", valueKey: "uk" },
      { label: "한국", valueKey: "kr" },
      { label: "일본", valueKey: "jp" },
      { label: "중국", valueKey: "cn" },
      { label: "재고", valueKey: "stock", format: "stock" },
    ],
    specs: [
      { label: "소재", value: "비세토스 모노그램 캔버스 · 카프 레더" },
      { label: "솔", value: "EVA 아웃솔" },
      { label: "하드웨어", value: "실버톤 다이아몬드 메탈 버클" },
      { label: "핏", value: "조절 가능한 스트랩 · 레귤러 핏" },
    ],
    features: [
      "Visetos Collection",
      "Adjustable Strap Sandal",
      "Bavarian Diamond Buckle",
      "MCM Leather Craftsmanship",
    ],
    materials: [
      {
        id: 1,
        name: "Visetos Monogram Canvas",
        location: "Body",
        description: "MCM의 시그니처 비세토스 모노그램 캔버스를 바디에 사용했습니다.",
      },
      {
        id: 2,
        name: "Italian Calf Leather",
        location: "Trim & Footbed",
        description: "이탈리아산 카프 레더를 트림과 풋베드, 안감에 적용했습니다.",
      },
      {
        id: 3,
        name: "EVA Outsole",
        location: "Sole",
        description: "가볍고 편안한 착화감을 제공하는 EVA 아웃솔을 사용했습니다.",
      },
      {
        id: 4,
        name: "Silver-Tone Metal Buckle",
        location: "Hardware",
        description: "바이에른 다이아몬드에서 영감을 받은 실버톤 메탈 버클 하드웨어를 적용했습니다.",
      },
    ],
    careGuide: [
      { title: "STORAGE", body: "직사광선과 열, 비를 피해 건조한 곳에 보관해 주세요." },
      { title: "OUTSOLE", body: "아웃솔은 부드러운 브러시를 사용해 가볍게 관리해 주세요." },
      { title: "UPPER", body: "갑피는 살짝 적신 부드러운 면 천으로 닦아주세요." },
      { title: "CAUTION", body: "제품이 젖거나 습기에 장시간 노출되지 않도록 주의해 주세요." },
    ],
    aiDocentFaqs: [
      {
        question: "어떤 디자인의 샌들인가요?",
        answer: "비세토스 모노그램 캔버스와 실버톤 바이에른 다이아몬드 버클을 더한 조절형 스트랩 샌들입니다.",
      },
      {
        question: "소재는 무엇인가요?",
        answer: "비세토스 모노그램 캔버스 바디에 이탈리아산 카프 레더 트림과 EVA 아웃솔을 적용했습니다.",
      },
      {
        question: "사이즈와 재고는 어떻게 확인하나요?",
        answer: "36IT부터 43IT까지 국가별 사이즈 변환표와 사이즈별 매장 재고를 사이즈 비교 화면에서 확인할 수 있습니다.",
      },
    ],
    story: {
      design: {
        title: "Visetos Monogram Sandal",
        paragraphs: [
          "시그니처 비세토스 모노그램 캔버스에 바이에른 다이아몬드에서 영감을 받은 메탈 버클을 더한 샌들입니다.",
          "이탈리아산 카프 레더 트림과 로고 풋베드가 클래식한 MCM 헤리티지와 편안한 착화감을 함께 완성합니다.",
        ],
        highlights: [
          { label: "COLLECTION", value: "Visetos Collection" },
          { label: "DESIGN", value: "Adjustable Strap Sandal" },
          { label: "SIGNATURE", value: "Bavarian Diamond Buckle" },
          { label: "HERITAGE", value: "MCM Leather Craftsmanship" },
        ],
      },
      materials: {
        title: "Visetos Monogram Canvas",
      },
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
    : createMainStoreStock(product.stock);
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
  const designHighlights =
    product.story?.design?.highlights ??
    sections.map((section) => ({
      label: section.title,
      value: section.content,
    }));

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
      highlights: designHighlights.map((highlight) => ({
        label: highlight.label.toUpperCase(),
        value: highlight.value,
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
