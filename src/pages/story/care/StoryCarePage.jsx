function normalizeText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSentences(value) {
  return normalizeText(value).match(/[^.!?。！？]+[.!?。！？]?/g)?.map((sentence) => sentence.trim()) ?? [];
}

function dedupeSentences(sentences) {
  const seen = new Set();

  return sentences.filter((sentence) => {
    const normalized = sentence.replace(/\s+/g, "");
    if (!normalized || seen.has(normalized)) return false;

    seen.add(normalized);
    return true;
  });
}

function getCareDescription(description) {
  const sentences = dedupeSentences(splitSentences(description));

  return sentences.join(" ");
}

function normalizeGuide(guide) {
  const title = guide?.title ?? guide?.name ?? "";
  const description = guide?.description ?? guide?.content ?? guide?.body ?? "";

  return {
    title: normalizeText(title),
    description: getCareDescription(description),
  };
}

function normalizeGuides(guides) {
  return (guides ?? [])
    .map(normalizeGuide)
    .filter((guide) => guide.title || guide.description);
}

function CareGuideItem({ guide }) {
  return (
    <li className="flex gap-[14px] border-b border-[#e5e0da] py-[13px]">
      <span className="mt-[7px] text-[4px] leading-[6px] text-[#6b3f1f]">●</span>
      <div className="flex-1">
        <h2 className="text-[13px] font-semibold leading-[19.5px] text-[#0a0908]">
          {guide.title}
        </h2>
        <p className="mt-[4px] text-[13px] font-normal leading-[21.45px] text-[#8a8078]">
          {guide.description}
        </p>
      </div>
    </li>
  );
}

function StoryCarePage({ story }) {
  const guides = normalizeGuides(story.guides);

  return (
    <section className="w-full px-[22px] pb-[116px] pt-[17px] text-left">
      <p className="font-['DM_Sans'] text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#6b3f1f]">
        {story.eyebrow}
      </p>
      <h1 className="mt-[10px] text-[22px] font-medium leading-[27.5px] text-[#0a0908]">
        {story.title}
      </h1>

      <ul className="mt-[29px]">
        {guides.map((guide, index) => (
          <CareGuideItem key={`${guide.title}-${index}`} guide={guide} />
        ))}
      </ul>
    </section>
  );
}

export default StoryCarePage;
