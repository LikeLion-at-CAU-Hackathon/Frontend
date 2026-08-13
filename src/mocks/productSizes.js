import hoboBagImage from "../assets/images/products/hobobag.webp";
import hoboBagLargeImage from "../assets/images/products/hobobag_large.webp";

export const productSizes = [
  {
    id: 8,
    productId: 8,
    groupId: 1,
    name: "Small Aren Hobo In Visetos",
    color: "Cognac",
    size: "Small",
    image: hoboBagImage,
    isCurrent: true,
    dimensions: "10 x 26 x 19 cm",
    strap: "125-133 cm",
    storage: "Tablet / Mobile Phone / AirPods Max",
    price: 1290000,
    stock: 3,
    stockLabel: "3개 (현재 매장)",
  },
  {
    id: 9,
    productId: 9,
    groupId: 1,
    name: "Large Aren Hobo In Visetos",
    color: "Cognac",
    size: "Large",
    image: hoboBagLargeImage,
    isCurrent: false,
    dimensions: "11 x 34 x 33 cm",
    strap: "92.5cm ~ 116.5cm",
    storage: "Laptop / Tablet / AirPods Max / Tumbler",
    price: 1450000,
    stock: 2,
    stockLabel: "2개 (현재 매장)",
  },
];

export const getProductSizesByGroupId = (groupId) => {
  return productSizes.filter((productSize) => productSize.groupId === Number(groupId));
};
