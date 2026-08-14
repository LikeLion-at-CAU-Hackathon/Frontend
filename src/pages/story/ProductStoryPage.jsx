import { useState } from "react";
import { AdvisorButton, AdvisorSheet } from "../../components/common";
import { StoryTabBar } from "../../components/story";
import { productStory } from "../../mocks/productStories";
import StoryDesignPage from "./design/StoryDesignPage";
import StoryMaterialsPage from "./materials/StoryMaterialsPage";

function ProductStoryPage() {
  const [activeTab, setActiveTab] = useState("design");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const { design, materials } = productStory;

  return (
    <main className="relative min-h-full w-full bg-[#faf8f5]">
      <StoryTabBar activeKey={activeTab} onTabClick={setActiveTab} />

      {activeTab === "materials" ? (
        <StoryMaterialsPage story={materials} />
      ) : (
        <StoryDesignPage story={design} />
      )}

      <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
      <AdvisorSheet isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
    </main>
  );
}

export default ProductStoryPage;
