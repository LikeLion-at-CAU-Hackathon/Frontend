import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import StoryTabBar from "../../components/story/StoryTabBar";
import useProduct from "../../hooks/useProduct";
import { getAiDocentFaqsForProduct, getMockProductById } from "../../mocks/products";
import StoryAiDocentPage from "./ai-docent/StoryAiDocentPage";
import StoryCarePage from "./care/StoryCarePage";
import StoryDesignPage from "./design/StoryDesignPage";
import StoryMaterialsPage from "./materials/StoryMaterialsPage";

const AI_ASSISTANT_ADVISOR_BOTTOM = 135;

function isEditableElement(element) {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element?.isContentEditable
  );
}

function getKeyboardInset() {
  if (!window.visualViewport || !isEditableElement(document.activeElement)) {
    return 0;
  }

  const inset =
    window.innerHeight -
    window.visualViewport.height -
    window.visualViewport.offsetTop;

  return Math.max(0, Math.round(inset));
}

function ProductStoryPage() {
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState("design");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [keyboardInset, setKeyboardInset] = useState(0);
  const { product, isLoading, errorMessage } = useProduct(productId);
  const isAiAssistantTab = activeTab === "ai-docent";

  useEffect(() => {
    if (!isAiAssistantTab || !window.visualViewport) {
      queueMicrotask(() => setKeyboardInset(0));
      return undefined;
    }

    const updateKeyboardInset = () => {
      setKeyboardInset(getKeyboardInset());
    };

    updateKeyboardInset();
    window.visualViewport.addEventListener("resize", updateKeyboardInset);
    window.visualViewport.addEventListener("scroll", updateKeyboardInset);
    window.addEventListener("focusin", updateKeyboardInset);
    window.addEventListener("focusout", updateKeyboardInset);

    return () => {
      window.visualViewport.removeEventListener("resize", updateKeyboardInset);
      window.visualViewport.removeEventListener("scroll", updateKeyboardInset);
      window.removeEventListener("focusin", updateKeyboardInset);
      window.removeEventListener("focusout", updateKeyboardInset);
    };
  }, [isAiAssistantTab]);

  if (isLoading) {
    return (
      <main className="relative min-h-full w-full bg-[#faf8f5] px-[22px] py-20 text-center text-[12px] text-[#8a8078]">
        Loading product...
      </main>
    );
  }

  if (errorMessage || !product) {
    return (
      <main className="relative min-h-full w-full bg-[#faf8f5] px-[22px] py-20 text-center text-[12px] text-[#8a3d2f]">
        {errorMessage || "Product not found."}
      </main>
    );
  }

  const productStory = product.story ?? {};
  const aiDocentFaqs = getAiDocentFaqsForProduct(getMockProductById(productId));
  const { design, materials, care } = productStory;

  const storyPages = {
    design: <StoryDesignPage story={design ?? { paragraphs: [], highlights: [] }} />,
    materials: <StoryMaterialsPage story={materials ?? { sections: [] }} />,
    care: <StoryCarePage story={care ?? { guides: [] }} />,
    "ai-docent": <StoryAiDocentPage faqs={aiDocentFaqs} product={product} />,
  };

  return (
    <main className="relative min-h-full w-full bg-[#faf8f5]">
      <StoryTabBar activeKey={activeTab} onTabClick={setActiveTab} />

      {storyPages[activeTab] ?? <StoryDesignPage story={design ?? { paragraphs: [], highlights: [] }} />}

      <AdvisorButton
        style={
          isAiAssistantTab
            ? { bottom: `${AI_ASSISTANT_ADVISOR_BOTTOM + keyboardInset}px` }
            : undefined
        }
        onClick={() => setIsAdvisorOpen(true)}
      />
      <AdvisorSheet isOpen={isAdvisorOpen} product={product} onClose={() => setIsAdvisorOpen(false)} />
    </main>
  );
}

export default ProductStoryPage;
