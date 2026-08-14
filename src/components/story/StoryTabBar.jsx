const storyTabs = [
  { key: "design", label: "Design", widthClassName: "w-[79px]" },
  { key: "materials", label: "Materials", widthClassName: "w-[85px]" },
  { key: "care", label: "Care", widthClassName: "w-[65px]" },
  { key: "ai-docent", label: "AI Docent", widthClassName: "w-[96px]" },
];

// 스토리 화면 위에 있는 탭 버튼
function StoryTabBar({ activeKey = "design", onTabClick }) {
  return (
    <nav className="sticky top-0 z-20 flex h-[45px] w-full border-b border-[#e5e0da] bg-white">
      {storyTabs.map((tab) => {
        const isActive = tab.key === activeKey;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabClick?.(tab.key)}
            className={`flex h-full shrink-0 items-center justify-center border-b-2 text-[13px] leading-[19.5px] ${tab.widthClassName} ${
              isActive
                ? "border-[#6b3f1f] font-bold text-[#0a0908]"
                : "border-transparent font-medium text-[#8a8078]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

export default StoryTabBar;
