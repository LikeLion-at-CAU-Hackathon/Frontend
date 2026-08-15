import hobobagImage from "../../assets/images/products/hobobag.webp";
import silkscarfImage from "../../assets/images/products/monogramsilkscarf.png";
import cropshirtImage from "../../assets/images/products/monogramcroptshirt.png";
import denimPantsImage from "../../assets/images/products/danimpants.png";
import sandalImage from "../../assets/images/products/womanmonogramsandal.png";
import ovalSunglassesImage from "../../assets/images/products/ovalsunglasses.png";
import shirtImage from "../../assets/images/products/monogramshirts.png";
import lambshortpantsImage from "../../assets/images/products/lambshortpants.png";
import buclepantsImage from "../../assets/images/products/buclepants.png";
import basetonessandalsImage from "../../assets/images/products/basetonessandal.png";
import ropersneakersImage from "../../assets/images/products/roper.png";

import sportycasuallookImage from "../../assets/images/lookbook/sportycasuallook.png";
import monogramdailylookImage from "../../assets/images/lookbook/monogramdailylook.png";
import modernclassiclookImage from "../../assets/images/lookbook/modernclassiclook.png";

export const todayItems = [
  { id: 1, name: "Monogram Print Triangular Silk Scarf", image: silkscarfImage },
  { id: 2, name: "Monogram Crop T-Shirt", image: cropshirtImage },
  { id: 3, name: "Aren Hobo Mini", image: hobobagImage },
];

export const styleKeywords = ["Warm Tone", "Classic", "Heritage"];

const businessCasualProducts = [
  { id: 1, image: cropshirtImage, name: "Top" },
  { id: 2, image: denimPantsImage, name: "Bottom" },
  { id: 3, image: sandalImage, name: "Shoes" },
  { id: 4, image: hobobagImage, name: "Bag" },
  { id: 5, image: silkscarfImage, name: "Accessory" },
];

export const looks = [
  {
    id: 1,
    name: "Monogram Daily",
    detailPath: "/ai/style-recommendation/look1",
    image: monogramdailylookImage,
    products: businessCasualProducts,
  },
  {
    id: 2,
    name: "Modern Classic",
    detailPath: "/ai/style-recommendation/look2",
    image: modernclassiclookImage,
    products: [
      { id: 1, image: shirtImage, name: "Top" },
      { id: 2, image: buclepantsImage, name: "Bottom" },
      { id: 3, image: ropersneakersImage, name: "Shoes" },
      { id: 4, image: hobobagImage, name: "Bag" },
      { id: 5, image: silkscarfImage, name: "Scarf" },
    ],
  },
  {
    id: 3,
    name: "Sporty Casual",
    detailPath: "/ai/style-recommendation/look3",
    image: sportycasuallookImage,
    products: [
      { id: 1, image: cropshirtImage, name: "Top" },
      { id: 2, image: lambshortpantsImage, name: "Bottom" },
      { id: 3, image: basetonessandalsImage, name: "Shoes" },
      { id: 4, image: hobobagImage, name: "Bag" },
      { id: 5, image: ovalSunglassesImage, name: "Accessory" },
    ],
  },
];

export const lookDetailData = {
  look1: {
    name: "Monogram Daily",
    description: "캐주얼하면서도 MCM의 아이덴티티가 드러나는 룩",
    reason: "데일리로 부담 없이 활용하기 좋은 조합으로, 개성 있는 스타일을 완성해줍니다.",
    products: [
      { id: 1, image: cropshirtImage, category: "Top", name: "Monogram Crop T-Shirt", price: "₩390,000" },
      { id: 2, image: denimPantsImage, category: "Bottom", name: "Lurex Denim Flare Pants", price: "₩830,000" },
      { id: 3, image: sandalImage, category: "Shoes", name: "Monogram Platform Lambskin Sandals", price: "₩890,000" },
      { id: 4, image: hobobagImage, category: "Bag", name: "Aren Visetos Hobo Mini", price: "₩1,290,000" },
      { id: 5, image: silkscarfImage, category: "Accessory", name: "Monogram Print Triangular Silk Scarf", price: "₩390,000" },
    ],
  },
  look2: {
    name: "Modern Classic",
    description: "클래식하면서도 현대적인 무드로 완성한 룩",
    reason: "네이비와 블루의 차분한 컬러에 꼬냑과 핑크를 포인트로 더해 단정하면서도 밋밋하지 않은 스타일을 연출할 수 있습니다. ",
    products: [
      { id: 1, image: shirtImage, category: "Top", name: "Monogram Flock Pocket Western Shirt", price: "₩690,000" },
      { id: 2, image: buclepantsImage, category: "Bottom", name: "boucle pants", price: "₩790,000" },
      { id: 3, image: ropersneakersImage, category: "Shoes", name: "Calfskin platform loafers", price: "₩930,000" },
      { id: 4, image: hobobagImage, category: "Bag", name: "Aren Visetos Hobo Mini", price: "₩1,290,000" },
      { id: 5, image: silkscarfImage, category: "Accessory", name: "Monogram Print Triangular Silk Scarf", price: "₩390,000" },
    ],
  },
  look3: {
    name: "Sporty Casual",
    description: "스포티하면서도 시크한 무드로 완성한 룩.",
    reason: "캐주얼한 아이템을 중심으로 구성해 활동성이 좋고, 트렌디하고 세련된 분위기를 연출할 수 있습니다.",
    products: [
      { id: 1, image: cropshirtImage, category: "Top", name: "Monogram Crop T-Shirt", price: "₩390,000" },
      { id: 2, image: lambshortpantsImage, category: "Bottom", name: "Lambskin shorts", price: "₩990,000" },
      { id: 3, image: basetonessandalsImage, category: "Shoes", name: "Visetos Sandals", price: "₩770,000" },
      { id: 4, image: hobobagImage, category: "Bag", name: "Aren Visetos Hobo Mini", price: "₩1,290,000" },
      { id: 5, image: ovalSunglassesImage, category: "Accessory", name: "Misplaced Sunglasses", price: "₩290,000" },
    ],
  },
};
