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
  const imageView = story.imageView ?? {};
  const paragraphs = story.paragraphs ?? [];
  const highlights = story.highlights ?? [];

  return (
    <section className="mx-auto max-w-[393px] px-[22px] pb-[124px] pt-[17px] text-center">
      <p className="font-['DM_Sans'] whitespace-pre-line text-[10px] font-medium uppercase leading-[15px] tracking-[1.6px] text-[#6b3f1f]">
        {story.eyebrow}
      </p>
      <h1 className="font-playfair whitespace-pre-line mt-[10px] text-[23px] leading-[27.6px] text-[#0a0908]">
        {story.title}
      </h1>

      <div className="mt-[22px] whitespace-pre-line space-y-[22px] text-[13px] leading-[23.4px] text-[#3d3530]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mx-auto mt-[19px] h-[200px] w-[326px] max-w-full overflow-hidden bg-[#faf8f5]">
        {story.image && (
          <img
            src={story.image}
            alt={story.title}
            className="size-full mix-blend-multiply"
            style={{
              objectFit: imageView.fit ?? "contain",
              objectPosition: imageView.position ?? "center",
              transform: `translateY(${imageView.translateY ?? "0px"}) scale(${imageView.scale ?? 1})`,
            }}
          />
        )}
      </div>

      <dl className="mx-auto mt-[15px] grid w-full max-w-[349px] grid-cols-2 gap-x-[14px] gap-y-[12px] text-left">
        {highlights.map((item) => (
          <StoryHighlight key={item.label} {...item} />
        ))}
      </dl>
    </section>
  );
}

export default StoryDesignPage;
