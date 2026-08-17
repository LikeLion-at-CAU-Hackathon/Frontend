import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import StoryTabBar from "../../components/story/StoryTabBar";
import {
  getAiDocentFaqsForProduct,
  getMockProductById,
  getProductStoryForProduct,
} from "../../mocks/products";
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
  const product = getMockProductById(productId);
  const productStory = getProductStoryForProduct(product);
  const aiDocentFaqs = getAiDocentFaqsForProduct(product);
  const { design, materials, care } = productStory;
  const isAiAssistantTab = activeTab === "ai-docent";

  const storyPages = {
    design: <StoryDesignPage story={design} />,
    materials: <StoryMaterialsPage story={materials} />,
    care: <StoryCarePage story={care} />,
    "ai-docent": <StoryAiDocentPage faqs={aiDocentFaqs} product={product} />,
  };

  useEffect(() => {
    if (!isAiAssistantTab || !window.visualViewport) {
      setKeyboardInset(0);
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

  return (
    <main className="relative min-h-full w-full bg-[#faf8f5]">
      <StoryTabBar activeKey={activeTab} onTabClick={setActiveTab} />

      {storyPages[activeTab] ?? <StoryDesignPage story={design} />}

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
