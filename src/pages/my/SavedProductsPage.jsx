import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import { deleteRecommendationProduct } from "../../api/recommendationApi";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import SavedProductsEmpty from "../../components/my/SavedProductsEmpty";
import SavedProductsList from "../../components/my/SavedProductsList";
import useSavedProductsStore from "../../stores/useSavedProductsStore";

function SavedProductsPage() {
  const navigate = useNavigate();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const savedProducts = useSavedProductsStore((state) => state.savedProducts);
  const removeSavedProduct = useSavedProductsStore((state) => state.removeSavedProduct);

  useEffect(() => {
    if (savedProducts.length === 0) {
      return undefined;
    }

    let isActive = true;

    Promise.all(
      savedProducts.map((product) =>
        getProductById(product.id)
          .then((detail) => [String(product.id), detail])
          .catch(() => [String(product.id), null]),
      ),
    ).then((entries) => {
      if (!isActive) return;

      setProductDetails(Object.fromEntries(entries));
    });

    return () => {
      isActive = false;
    };
  }, [savedProducts]);

  const displayProducts = useMemo(
    () =>
      savedProducts.map((product) => {
        const detail = productDetails[String(product.id)];

        if (!detail) return product;

        return {
          ...product,
          image: detail.image || product.image,
          images: detail.images?.length ? detail.images : product.images,
        };
      }),
    [productDetails, savedProducts],
  );

  const handleProductClick = (product) => {
    navigate(`/my/saved-products/${product.id}`);
  };

  const handleRemoveProduct = (productId) => {
    removeSavedProduct(productId);
    deleteRecommendationProduct(productId).catch(() => null);
  };

  return (
    <main className="relative min-h-[calc(100dvh-62px)] bg-[#faf8f5] text-[#0a0908]">
      <div className="h-px bg-[#e5e0da]" />

      {savedProducts.length === 0 ? (
        <SavedProductsEmpty />
      ) : (
        <SavedProductsList
          products={displayProducts}
          onProductClick={handleProductClick}
          onRemoveProduct={handleRemoveProduct}
        />
      )}

      <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
      <AdvisorSheet isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
    </main>
  );
}

export default SavedProductsPage;
