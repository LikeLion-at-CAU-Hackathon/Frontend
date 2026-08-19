function StyleKeywords({ keywords }) {
  return (
    <div className="flex w-full gap-1" aria-label="분석된 스타일 키워드">
      {(keywords ?? []).map((keyword) => (
        <span
          key={keyword}
          className="flex h-[31px] min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-[4px] border border-[#e5e0da] bg-[#6b3f1f] px-2 text-[14px] leading-[18px] text-white transition-all duration-200 ease-out hover:-translate-y-px hover:brightness-[1.04] hover:shadow-sm"
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}

export default StyleKeywords;
