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

function stripCareLabel(value) {
  return normalizeText(value).replace(
    /^(?:\d{1,2}\s*[—-]\s*)?(?:CLEANING|BLEACH|DRYING|IRONING)\s*/i,
    "",
  );
}

function collapseRepeatedPrefix(value) {
  let text = normalizeText(value);
  let previous = "";

  while (text !== previous) {
    previous = text;

    for (let length = Math.floor(text.length / 2); length >= 5; length -= 1) {
      const prefix = text.slice(0, length);

      if (text.startsWith(prefix + prefix)) {
        text = text.slice(length);
        break;
      }
    }
  }

  return text;
}

function getCareDescription(description) {
  const sentences = dedupeSentences(
    splitSentences(collapseRepeatedPrefix(stripCareLabel(description))),
  );

  return sentences.join(" ");
}

function normalizeCareItem(item) {
  if (typeof item === "string") {
    return {
      subtitle: "",
      description: getCareDescription(item),
    };
  }

  return {
    subtitle: normalizeText(item?.subtitle ?? item?.subTitle ?? item?.heading ?? item?.title ?? item?.name ?? item?.label),
    description: getCareDescription(item?.description ?? item?.content ?? item?.body ?? item?.text ?? item?.value),
  };
}

function normalizeGuide(guide) {
  const title = guide?.title ?? guide?.name ?? "";
  const description = guide?.description ?? guide?.content ?? guide?.body ?? "";
  const items = Array.isArray(guide?.items)
    ? guide.items.map(normalizeCareItem).filter((item) => item.subtitle || item.description)
    : [];
  const descriptions = items.length
    ? items.map((item) => item.description).filter(Boolean)
    : Array.isArray(guide?.descriptions)
      ? guide.descriptions.map(getCareDescription).filter(Boolean)
      : [getCareDescription(description)].filter(Boolean);

  return {
    title: normalizeText(title),
    description: descriptions.join(" "),
    descriptions,
    items: items.length
      ? items
      : descriptions.map((nextDescription) => ({
          subtitle: "",
          description: nextDescription,
        })),
  };
}

function normalizeGuides(guides) {
  return (guides ?? [])
    .map(normalizeGuide)
    .filter((guide) => guide.title || guide.items.length);
}

function getDisplayTitle(title) {
  return normalizeText(title).replace(/^\d{1,2}\s*[—-]\s*/, "");
}

function CareGuideItem({ guide }) {
  return (
    <li className="flex gap-[14px] border-b border-[#e5e0da] py-[13px]">
      <span className="mt-[7px] text-[4px] leading-[6px] text-[#6b3f1f]">●</span>
      <div className="flex-1">
        <h2 className="text-[13px] font-semibold leading-[19.5px] text-[#0a0908]">
          {getDisplayTitle(guide.title)}
        </h2>
        <div className="mt-[4px] space-y-[6px]">
          {guide.items.map((item, index) => (
            <div key={`${item.subtitle}-${item.description}-${index}`}>
              {item.subtitle ? (
                <p className="text-[12px] font-semibold leading-[18px] text-[#0a0908]">
                  {getDisplayTitle(item.subtitle)}
                </p>
              ) : null}
              {item.description ? (
                <p className="text-[13px] font-normal leading-[21.45px] text-[#8a8078]">
                  {item.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
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
