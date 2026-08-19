import { useEffect, useState } from "react";
import { getProductDetail, getProductSizesForProduct } from "../api/productApi";

const getProductErrorMessage = (error) => {
  return (
    error?.response?.data?.message ??
    error?.message ??
    "Product data could not be loaded."
  );
};

export default function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [productSizes, setProductSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isCancelled = false;

    queueMicrotask(() => {
      if (isCancelled) return;
      setIsLoading(true);
      setErrorMessage("");
      setProduct(null);
      setProductSizes([]);
    });

    getProductDetail(productId)
      .then((nextProduct) => {
        if (!nextProduct) throw new Error("Product not found.");
        if (isCancelled) return;

        setProduct(nextProduct);
        setProductSizes(getProductSizesForProduct(nextProduct));
      })
      .catch((error) => {
        if (isCancelled) return;

        setErrorMessage(getProductErrorMessage(error));
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [productId]);

  return {
    product,
    productSizes,
    isLoading,
    errorMessage,
  };
}
