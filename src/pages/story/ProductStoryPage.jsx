import { useState } from "react";
import { AdvisorButton, AdvisorSheet } from "../../components/common";
import { StoryTabBar } from "../../components/story";
import { productStory } from "../../mocks/productStories";

function StoryHighlight({ label, value }) {
  return (
    <div>
      <dt className="text-[9px] uppercase leading-[13.5px] tracking-[1.44px] text-[#8a8078]">
        {label}
      </dt>
      <dd className="mt-[3px] font-['DM_Sans'] text-[13px] font-medium leading-[19.5px] text-[#0a0908]">
        {value}
      </dd>
    </div>
  );
}

function ProductStoryPage() {
  const [activeTab, setActiveTab] = useState("design");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const { design } = productStory;

  return (
    <main className="relative min-h-full w-full bg-[#faf8f5]">
      <StoryTabBar activeKey={activeTab} onTabClick={setActiveTab} />

      <section className="mx-auto max-w-[393px] px-[22px] pb-[124px] pt-[17px] text-center">
        <p className="font-['DM_Sans'] text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#6b3f1f]">
          {design.eyebrow}
        </p>
        <h1 className="font-playfair mt-[10px] text-[23px] leading-[27.6px] text-[#0a0908]">
          {design.title}
        </h1>

        <div className="mt-[22px] space-y-[22px] text-[13px] font-medium leading-[23.4px] text-[#3d3530]">
          {design.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mx-auto mt-[19px] h-[200px] w-[326px] max-w-full overflow-hidden bg-[#faf8f5]">
          <img
            src={design.image}
            alt={design.title}
            className="size-full object-cover object-[center_80%] mix-blend-multiply"
          />
        </div>

        <dl className="mx-auto mt-[15px] grid w-full max-w-[349px] grid-cols-2 gap-x-[14px] gap-y-[12px] text-left">
          {design.highlights.map((item) => (
            <StoryHighlight key={item.label} {...item} />
          ))}
        </dl>
      </section>

      <AdvisorButton onClick={() => setIsAdvisorOpen(true)} />
      <AdvisorSheet isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
    </main>
  );
}

export default ProductStoryPage;
