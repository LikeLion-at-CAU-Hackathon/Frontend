const EXCLUDED_BACKGROUND_KEYS = new Set([
  "description",
  "design",
  "title",
  "collection",
  "design_details",
  "designDetails",
  "material_details",
  "materialDetails",
  "materials",
  "image",
  "story",
]);

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isFilledString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function toDisplayLabel(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toUpperCase();
}

function normalizeWhitespace(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDisplayValue(value) {
  if (value === null || value === undefined || value === "") return "";

  if (Array.isArray(value)) {
    return value.map(formatDisplayValue).filter(Boolean).join(" · ");
  }

  if (isPlainObject(value)) {
    return Object.entries(value)
      .map(([key, nestedValue]) => {
        const formattedValue = formatDisplayValue(nestedValue);
        return formattedValue ? `${toDisplayLabel(key)} ${formattedValue}` : "";
      })
      .filter(Boolean)
      .join(" · ");
  }

  return normalizeWhitespace(value);
}

function splitLeadingLabel(value) {
  const words = normalizeWhitespace(value).split(" ");
  const labelWords = [];
  const valueWords = [];

  words.forEach((word) => {
    const normalizedWord = word.replace(/[^\p{L}\p{N}&-]/gu, "");
    const isLabelWord = /^[A-Z0-9&-]+$/.test(normalizedWord);

    if (valueWords.length === 0 && isLabelWord) {
      labelWords.push(word);
      return;
    }

    valueWords.push(word);
  });

  if (labelWords.length === 0 || valueWords.length === 0) return null;

  if (labelWords.length > 1 && /^[가-힣]/.test(valueWords[0])) {
    valueWords.unshift(labelWords.pop());
  }

  return {
    label: labelWords.join(" "),
    value: valueWords.join(" "),
  };
}

function normalizeHighlight(key, value) {
  const formattedValue = formatDisplayValue(value);
  if (!formattedValue) return null;

  const parsedValue = splitLeadingLabel(formattedValue);

  if (/^\d+$/.test(String(key)) && parsedValue) {
    return parsedValue;
  }

  return {
    label: toDisplayLabel(key),
    value: formattedValue,
  };
}

function normalizeHighlightItem(item) {
  if (!isPlainObject(item)) return null;

  const label = item.label ?? item.title ?? item.name;
  const value = item.value ?? item.description ?? item.content ?? item.text;

  if (label && value) {
    return {
      label: String(label),
      value: formatDisplayValue(value),
    };
  }

  const entries = Object.entries(item);
  if (entries.length !== 1) return null;

  const [key, itemValue] = entries[0];
  return normalizeHighlight(key, itemValue);
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean).map(String))];
}

function resolveDesignStory(story) {
  if (!isPlainObject(story)) return {};

  if (isPlainObject(story.design)) {
    return {
      ...story.design,
      background: story.design.background ?? story.background,
      image: story.design.image ?? story.image,
      imageView: story.design.imageView ?? story.imageView,
      sections: story.design.sections ?? story.sections,
    };
  }

  return story;
}

function buildRawParagraphs(story, background) {
  const storyParagraphs = Array.isArray(story.paragraphs)
    ? story.paragraphs.filter(isFilledString)
    : [];

  if (storyParagraphs.length > 0) {
    return uniqueValues(storyParagraphs.flatMap(splitDisplayParagraphs));
  }

  return uniqueValues([
    story.description,
    background.description,
  ].filter(isFilledString).flatMap(splitDisplayParagraphs));
}

function splitDisplayParagraphs(value) {
  const text = normalizeWhitespace(value);
  if (!text) return [];

  const sentences = text.match(/[^.!?。！？]+[.!?。！？]?/g)?.map((sentence) => sentence.trim()) ?? [text];
  const paragraphs = sentences.reduce((groups, sentence) => {
    const previous = groups[groups.length - 1];

    if (previous && /[A-Za-z]\.$/.test(previous) && /^[가-힣]/.test(sentence)) {
      groups[groups.length - 1] = `${previous} ${sentence}`;
      return groups;
    }

    groups.push(sentence);
    return groups;
  }, []);

  if (paragraphs.length <= 3) return paragraphs;

  return [
    paragraphs[0],
    paragraphs.slice(1, -1).join(" "),
    paragraphs[paragraphs.length - 1],
  ].filter(Boolean);
}

function resolveTitleAndParagraphs(story, background) {
  const fallbackTitle = [
    story.productName,
    story.product_name,
    story.name,
    story.title,
    background.productName,
    background.product_name,
  ].find(isFilledString) ?? "";

  return {
    title: fallbackTitle,
    paragraphs: buildRawParagraphs(story, background),
  };
}

function buildHighlights(story, background) {
  const baseHighlights = Array.isArray(story.highlights)
    ? story.highlights.map(normalizeHighlightItem).filter(Boolean)
    : [];
  const sectionHighlights = Array.isArray(story.sections)
    ? story.sections.map(normalizeHighlightItem).filter(Boolean)
    : [];
  const designDetails = story.designDetails ?? story.design_details ?? background.design_details;
  const detailHighlights = isPlainObject(designDetails)
    ? Object.entries(designDetails).map(([key, value]) => normalizeHighlight(key, value))
    : [];
  const backgroundHighlights = Object.entries(background)
    .filter(([key]) => !EXCLUDED_BACKGROUND_KEYS.has(key))
    .map(([key, value]) => normalizeHighlight(key, value));

  return [
    ...baseHighlights,
    ...sectionHighlights,
    ...detailHighlights,
    ...(baseHighlights.length || sectionHighlights.length || detailHighlights.length
      ? []
      : backgroundHighlights),
  ]
    .filter(Boolean)
    .filter((item, index, items) => (
      items.findIndex((candidate) => (
        candidate.label === item.label && candidate.value === item.value
      )) === index
    ));
}

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

function StoryDesignPage({ story }) {
  const designStory = resolveDesignStory(story);
  const background = isPlainObject(designStory.background) ? designStory.background : {};
  const imageView = designStory.imageView ?? {};
  const imageScale = Number(imageView.scale) || 1.35;
  const { title: displayTitle, paragraphs } = resolveTitleAndParagraphs(designStory, background);
  const highlights = buildHighlights(designStory, background);

  return (
    <section className="mx-auto max-w-[393px] px-[22px] pb-[124px] pt-[18px] text-center">
      <p className="font-['DM_Sans'] whitespace-pre-line text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#6b3f1f]">
        {designStory.eyebrow}
      </p>
      <h1 className="font-playfair whitespace-pre-line mt-[10px] text-[23px] leading-[27.6px] text-[#0a0908]">
        {displayTitle}
      </h1>

      <div className="mt-[14px] whitespace-pre-line space-y-[22px] text-[13px] leading-[23.4px] text-[#3d3530]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mx-auto mt-[17px] h-[220px] w-[326px] max-w-full overflow-hidden">
        {designStory.image && (
          <img
            src={designStory.image}
            alt={displayTitle}
            className="size-full mix-blend-multiply"
            style={{
              objectFit: imageView.fit ?? "contain",
              objectPosition: imageView.position ?? "center",
              transform: `translateY(${imageView.translateY ?? "0px"}) scale(${imageScale})`,
            }}
          />
        )}
      </div>

      <dl className="mx-auto mt-[14px] grid w-full max-w-[349px] grid-cols-2 gap-x-[14px] gap-y-[14px] text-left">
        {highlights.map((item) => (
          <StoryHighlight key={`${item.label}-${item.value}`} {...item} />
        ))}
      </dl>
    </section>
  );
}

export default StoryDesignPage;
