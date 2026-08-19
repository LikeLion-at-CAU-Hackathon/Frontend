import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import SavedProductsEmpty from "../../components/my/SavedProductsEmpty";
import SavedProductsList from "../../components/my/SavedProductsList";
import useSavedProductsStore from "../../stores/useSavedProductsStore";

function SavedProductsPage() {
  const navigate = useNavigate();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const savedProducts = useSavedProductsStore((state) => state.savedProducts);
  const fetchSavedProducts = useSavedProductsStore((state) => state.fetchSavedProducts);
  const removeProduct = useSavedProductsStore((state) => state.removeProduct);

  useEffect(() => {
    fetchSavedProducts().catch(() => null);
  }, [fetchSavedProducts]);

  const handleProductClick = (product) => {
    navigate(`/my/saved-products/${product.id}`);
  };

  return (
    <main className="relative min-h-[calc(100dvh-62px)] bg-[#faf8f5] text-[#0a0908]">
      <div className="h-px bg-[#e5e0da]" />

      {savedProducts.length === 0 ? (
        <SavedProductsEmpty />
      ) : (
        <SavedProductsList
          products={savedProducts}
          onProductClick={handleProductClick}
          onRemoveProduct={(productId) => removeProduct(productId).catch(() => null)}
        />
      )}

      <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
      <AdvisorSheet isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
    </main>
  );
}

export default SavedProductsPage;
