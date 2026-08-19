function MaterialImageFallback({ label = "Image", rounded = false }) {
  return (
    <div
      className={`flex size-full items-center justify-center bg-[#e5e0da] text-[11px] font-medium leading-[16.5px] text-[#8a8078] ${
        rounded ? "rounded-full" : ""
      }`}
    >
      {label}
    </div>
  );
}

function MaterialHeroImage({ image, alt }) {
  return (
    <div className="mt-[10px] h-[117px] w-full overflow-hidden rounded-[4px] bg-[#d9d9d9]">
      {image ? (
        <img src={image} alt={alt} className="h-full w-full object-cover object-center" />
      ) : (
        <MaterialImageFallback />
      )}
    </div>
  );
}

function FeaturedMaterial({ section }) {
  const title = section.displayTitle ?? section.title;

  return (
    <article className="border-b border-[#e5e0da] pb-[17px] pt-[18px]">
      {title && (
        <h2 className="text-[13px] font-bold leading-[19.5px] text-[#0a0908]">{title}</h2>
      )}
      {section.description && (
        <p className="mt-[5px] whitespace-pre-line text-[13px] font-normal leading-[22.1px] text-[#3d3530]">
          {section.description}
        </p>
      )}
    </article>
  );
}

function MaterialListItem({ section }) {
  return (
    <article className="flex items-center gap-5">
      <div className="relative size-[55px] shrink-0 overflow-hidden rounded-full border border-[#8b7355] bg-[#e5e0da]">
        {section.image && section.imageStyle ? (
          <img src={section.image} alt="" className="absolute max-w-none" style={section.imageStyle} />
        ) : section.image ? (
          <img src={section.image} alt="" className="size-full object-cover object-center" />
        ) : (
          <MaterialImageFallback rounded />
        )}
      </div>

      <div className="min-w-0 flex-1 py-[13px]">
        {section.title && (
          <h2 className="text-[13px] font-bold leading-[19.5px] text-[#0a0908]">{section.title}</h2>
        )}
        {section.description && (
          <p className="mt-[5px] whitespace-pre-line text-[13px] font-normal leading-[22.1px] text-[#3d3530]">
            {section.description}
          </p>
        )}
      </div>
    </article>
  );
}

function getMaterialDisplayTitle(sectionTitle, pageTitle) {
  if (!sectionTitle || sectionTitle !== pageTitle) return sectionTitle;

  if (/silk/i.test(sectionTitle)) return "실크 소재";
  if (/visetos|monogram canvas/i.test(sectionTitle)) return "Visetos 패턴";
  if (/leather/i.test(sectionTitle)) return "가죽 소재";

  return sectionTitle;
}

function StoryMaterialsPage({ story }) {
  const [featuredSection, ...materialSections] = story.sections ?? [];
  const materialDetails = story.details ?? story.highlights ?? [];
  const displayTitle = story.title || featuredSection?.title || "";
  const featuredMaterial = featuredSection
    ? {
      ...featuredSection,
      displayTitle: getMaterialDisplayTitle(featuredSection.title, displayTitle),
    }
    : null;
  const detailSections = materialDetails.map((detail) => ({
    title: detail.label,
    description: detail.value,
    image: detail.image,
    imageStyle: detail.imageStyle,
  }));
  const lowerSections = [...materialSections, ...detailSections];

  return (
    <section className="w-full bg-[#faf8f5] pb-[116px] pt-[14px] text-left">
      <div className="px-[22px]">
        <p className="font-['DM_Sans'] text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#6b3f1f]">
          {story.eyebrow}
        </p>
        {displayTitle && (
          <h1 className="font-playfair mt-[10px] text-[22px] font-medium leading-[27.5px] text-[#0a0908]">
            {displayTitle}
          </h1>
        )}

        <MaterialHeroImage image={story.image} alt={displayTitle} />

        {featuredMaterial && <FeaturedMaterial section={featuredMaterial} />}

        <div className="mt-[27px] flex flex-col gap-6">
          {lowerSections.map((section, index) => (
            <MaterialListItem key={`${section.title ?? "material"}-${index}`} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoryMaterialsPage;
