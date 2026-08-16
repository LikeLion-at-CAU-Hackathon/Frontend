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
    <div className="mt-[10px] h-[117px] w-full overflow-hidden bg-[#d9d9d9]">
      {image ? (
        <img src={image} alt={alt} className="h-full w-full object-cover object-center" />
      ) : (
        <MaterialImageFallback />
      )}
    </div>
  );
}

function FeaturedMaterial({ section }) {
  return (
    <article className="border-b border-[#e5e0da] pb-[17px] pt-[18px]">
      <h2 className="text-[13px] font-bold leading-[19.5px] text-[#0a0908]">{section.title}</h2>
      <p className="mt-[5px] whitespace-pre-line text-[13px] font-normal leading-[22.1px] text-[#3d3530]">
        {section.description}
      </p>
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
        <h2 className="text-[13px] font-bold leading-[19.5px] text-[#0a0908]">
          {section.title}
        </h2>
        <p className="mt-[5px] whitespace-pre-line text-[13px] font-normal leading-[22.1px] text-[#3d3530]">
          {section.description}
        </p>
      </div>
    </article>
  );
}

function StoryMaterialsPage({ story }) {
  const [featuredSection, ...materialSections] = story.sections ?? [];

  return (
    <section className="w-full bg-[#faf8f5] pb-[116px] pt-[14px] text-left">
      <div className="px-[22px]">
        <p className="font-['DM_Sans'] text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#6b3f1f]">
          {story.eyebrow}
        </p>
        <h1 className="font-playfair mt-[10px] text-[22px] font-medium leading-[27.5px] text-[#0a0908]">
          {story.title}
        </h1>

        <MaterialHeroImage image={story.image} alt={story.title} />

        {featuredSection && <FeaturedMaterial section={featuredSection} />}

        <div className="mt-[27px] flex flex-col gap-6">
          {materialSections.map((section) => (
            <MaterialListItem key={section.title} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StoryMaterialsPage;
