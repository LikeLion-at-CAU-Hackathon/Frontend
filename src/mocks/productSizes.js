import hoboBagImage from "../assets/images/products/hobobag.webp";
import hoboBagLargeImage from "../assets/images/products/hobobag_large.webp";

export const productSizesResponse = [
  {
    id: 1,
    name: "Aren Hobo In Visetos",
    color: "cognac",
    size: "small",
    price: 1290000,
  },
  {
    id: 2,
    name: "Aren Hobo In Visetos",
    color: "cognac",
    size: "large",
    price: 1450000,
  },
];

export const productSizes = [
  {
    id: productSizesResponse[0].id,
    productId: 8,
    groupId: 1,
    name: productSizesResponse[0].name,
    color: "Cognac",
    size: "Small",
    image: hoboBagImage,
    isCurrent: true,
    dimensions: "10 x 26 x 19 cm",
    strap: "125-133 cm",
    storage: "Tablet / Mobile Phone / AirPods Max",
    price: productSizesResponse[0].price,
    stock: 3,
    stockLabel: "3개 (현재 매장)",
  },
  {
    id: productSizesResponse[1].id,
    productId: 9,
    groupId: 1,
    name: productSizesResponse[1].name,
    color: "Cognac",
    size: "Large",
    image: hoboBagLargeImage,
    isCurrent: false,
    dimensions: "11 x 34 x 33 cm",
    strap: "92.5cm ~ 116.5cm",
    storage: "Laptop / Tablet / AirPods Max / Tumbler",
    price: productSizesResponse[1].price,
    stock: 2,
    stockLabel: "2개 (현재 매장)",
  },
];

export const getProductSizesByGroupId = (groupId) => {
  return productSizes.filter((productSize) => productSize.groupId === Number(groupId));
};

const getSpecValue = (product, labels) => {
  return labels
    .map((label) => product.specs?.find((spec) => spec.label === label)?.value)
    .find(Boolean);
};

const buildVariantFromProduct = (product, size, index) => ({
  id: product.id * 100 + index,
  productId: product.id,
  groupId: product.groupId ?? product.group_id ?? product.id,
  name: product.name,
  color: product.color,
  size,
  image: product.image,
  isCurrent: size === product.size,
  dimensions: getSpecValue(product, ["DIMENSIONS", "SIZE", "LENGTH"]) ?? "-",
  strap: getSpecValue(product, ["STRAP", "WIDTH", "FIT"]) ?? "-",
  storage: getSpecValue(product, ["STORAGE", "MATERIAL", "TYPE"]) ?? "-",
  price: product.price,
  stock: product.stock,
  stockLabel: `${product.stock}개 (현재 매장)`,
});

export const getProductSizesForProduct = (product) => {
  const groupId = product.groupId ?? product.group_id;
  const groupedSizes = groupId ? getProductSizesByGroupId(groupId) : [];

  if (groupedSizes.length > 0) {
    return groupedSizes.map((productSize) => ({
      ...productSize,
      isCurrent: productSize.size === product.size || productSize.productId === product.id,
    }));
  }

  return (product.sizes?.length ? product.sizes : [product.size]).map((size, index) =>
    buildVariantFromProduct(product, size, index + 1),
  );
};
