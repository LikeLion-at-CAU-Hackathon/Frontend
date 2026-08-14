import { useState } from "react";
import { useParams } from "react-router-dom";
import AdvisorButton from "../../components/common/AdvisorButton";
import AdvisorSheet from "../../components/common/AdvisorSheet";
import StoryTabBar from "../../components/story/StoryTabBar";
import { getMockProductById } from "../../mocks/products";
import { getAiDocentFaqsForProduct, getProductStoryForProduct } from "../../mocks/productStories";
import StoryAiDocentPage from "./ai-docent/StoryAiDocentPage";
import StoryCarePage from "./care/StoryCarePage";
import StoryDesignPage from "./design/StoryDesignPage";
import StoryMaterialsPage from "./materials/StoryMaterialsPage";

function ProductStoryPage() {
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState("design");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const product = getMockProductById(productId);
  const productStory = getProductStoryForProduct(product);
  const aiDocentFaqs = getAiDocentFaqsForProduct(product);
  const { design, materials, care } = productStory;

  const storyPages = {
    design: <StoryDesignPage story={design} />,
    materials: <StoryMaterialsPage story={materials} />,
    care: <StoryCarePage story={care} />,
    "ai-docent": <StoryAiDocentPage faqs={aiDocentFaqs} product={product} />,
  };

  return (
    <main className="relative min-h-full w-full bg-[#faf8f5]">
      <StoryTabBar activeKey={activeTab} onTabClick={setActiveTab} />

      {storyPages[activeTab] ?? <StoryDesignPage story={design} />}

      <AdvisorButton
        onClick={() => setIsAdvisorOpen(true)}
        positionClassName={
          activeTab === "ai-docent"
            ? "bottom-[139px] right-[max(16px,calc((100vw_-_393px)/2_+_16px))]"
            : undefined
        }
      />
      <AdvisorSheet isOpen={isAdvisorOpen} product={product} onClose={() => setIsAdvisorOpen(false)} />
    </main>
  );
}

export default ProductStoryPage;
