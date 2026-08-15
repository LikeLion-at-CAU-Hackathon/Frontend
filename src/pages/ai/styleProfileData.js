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

export const styleKeywords = ["Warm Tones", "Compact Size", "Classic Styling"];

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
    description: "시그니처 모노그램으로 완성한 데일리 스타일",
    reason: "따뜻한 톤과 실용적인 아이템을 조화롭게 구성했어요",
    products: [
      { id: 1, image: cropshirtImage, category: "Top", name: "Monogram Crop T-Shirt", price: "₩590,000" },
      { id: 2, image: denimPantsImage, category: "Bottom", name: "Logo Patch Denim Pants", price: "₩790,000" },
      { id: 3, image: sandalImage, category: "Shoes", name: "Monogram Sandals", price: "₩650,000" },
      { id: 4, image: hobobagImage, category: "Bag", name: "Aren Hobo Mini", price: "₩1,150,000" },
      { id: 5, image: silkscarfImage, category: "Accessory", name: "Monogram Silk Scarf", price: "₩330,000" },
    ],
  },
  look2: {
    name: "Modern Classic",
    description: "절제된 실루엣에 클래식한 디테일을 더한 스타일",
    reason: "차분한 컬러와 구조적인 아이템이 취향에 잘 어울려요",
    products: [
      { id: 1, image: shirtImage, category: "Top", name: "Laurel Monogram Shirt", price: "₩690,000" },
      { id: 2, image: buclepantsImage, category: "Bottom", name: "Bouclé Tailored Pants", price: "₩750,000" },
      { id: 3, image: ropersneakersImage, category: "Shoes", name: "Neo Terrain Lo Sneakers", price: "₩850,000" },
      { id: 4, image: hobobagImage, category: "Bag", name: "Aren Hobo Mini", price: "₩1,150,000" },
      { id: 5, image: silkscarfImage, category: "Accessory", name: "Monogram Silk Scarf", price: "₩330,000" },
    ],
  },
  look3: {
    name: "Sporty Casual",
    description: "가볍고 활동적인 무드의 감각적인 캐주얼 스타일",
    reason: "편안한 핏에 선명한 액세서리로 포인트를 더했어요",
    products: [
      { id: 1, image: cropshirtImage, category: "Top", name: "Monogram Crop T-Shirt", price: "₩590,000" },
      { id: 2, image: lambshortpantsImage, category: "Bottom", name: "Laurel Logo Short Pants", price: "₩630,000" },
      { id: 3, image: basetonessandalsImage, category: "Shoes", name: "Base Tone Sandals", price: "₩610,000" },
      { id: 4, image: hobobagImage, category: "Bag", name: "Aren Hobo Mini", price: "₩1,150,000" },
      { id: 5, image: ovalSunglassesImage, category: "Accessory", name: "Oval Logo Sunglasses", price: "₩410,000" },
    ],
  },
};
