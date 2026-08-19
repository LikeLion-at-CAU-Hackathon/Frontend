function TodayItems({ items }) {
  return (
    <section className="h-[170px] rounded-[12px] bg-[#e8e6e2] px-3 pt-[14px]">
      <h2 className="text-[10px] font-normal leading-[15px] tracking-[1.4px] text-[#6b3f1f]">
        BASED ON TODAY’S ITEMS
      </h2>
      <div className="mt-[18px] grid grid-cols-2 gap-x-4 gap-y-[6px]">
        {(items ?? []).slice(0, 3).map((item, index) => (
          <article
            key={item.historyId ?? `${item.id}-${index}`}
            className="flex h-[48px] min-w-0 items-center gap-[6px] rounded-[6px] border-[0.7px] border-[#e8e7e3] bg-[#f5f3ef] p-1 pr-2 transition duration-150 hover:-translate-y-px hover:bg-white hover:shadow-sm"
          >
            {item.image ? (
              <img src={item.image} alt="" className="size-10 shrink-0 rounded-[2px] object-cover" />
            ) : (
              <div className="size-10 shrink-0 rounded-[2px] bg-[#faf8f4]" aria-hidden="true" />
            )}
            <p className="font-playfair min-w-0 truncate text-[9px] leading-[11.55px] text-black">
              {item.name}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TodayItems;
