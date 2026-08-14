function MaterialPhoto({ image, alt }) {
  return (
    <div className="mt-[10px] h-[90px] w-full overflow-hidden bg-[#d9d9d9]">
      <img src={image} alt={alt} className="h-full w-full object-cover object-center" />
    </div>
  );
}

function MaterialPlaceholder() {
  return (
    <div className="mt-[14px] flex h-[90px] w-full items-center justify-center bg-[#d9d9d9] text-[13px] font-bold leading-[19.5px] text-[#0a0908]">
      사진
    </div>
  );
}

function MaterialSection({ section, showImage, image }) {
  return (
    <article>
      {showImage ? <MaterialPhoto image={image} alt={section.title} /> : <MaterialPlaceholder />}
      <div className="px-[22px] pt-[12px]">
        <h2 className="text-[13px] font-bold leading-[19.5px] text-[#0a0908]">{section.title}</h2>
        <p className="mt-[6px] text-[12px] font-medium leading-[20px] text-[#3d3530]">
          {section.description}
        </p>
      </div>
    </article>
  );
}

function StoryMaterialsPage({ story }) {
  return (
    <section className="w-full pb-[116px] pt-[17px] text-left">
      <div className="px-[22px]">
        <p className="font-['DM_Sans'] text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#6b3f1f]">
          {story.eyebrow}
        </p>
        <h1 className="font-playfair mt-[8px] text-[23px] font-medium leading-[27.6px] text-[#0a0908]">
          {story.title}
        </h1>
      </div>

      <div className="mt-[10px] space-y-[16px]">
        {story.sections.map((section, index) => (
          <MaterialSection
            key={section.title}
            section={section}
            showImage={index === 0}
            image={story.image}
          />
        ))}
      </div>
    </section>
  );
}

export default StoryMaterialsPage;
