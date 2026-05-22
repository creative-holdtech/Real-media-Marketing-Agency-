type TestimonialSectionProps = {
  quote?: string;
  authorName?: string;
  authorRole?: string;
};

const defaultQuote =
  "Working with Real Media has been an excellent experience for Finup. They are reliable, creative, and always professional in their approach. We're happy to recommend them as a fantastic team to work with";

const brokenQuoteLines = [
  {
    text: "Working with Real Media",
    className: "md:ml-0",
  },
  {
    text: "has been an excellent",
    className: "font-light text-white/68 md:ml-[7%]",
  },
  {
    text: "experience for Finup.",
    className: "md:ml-[2%]",
  },
  {
    text: "They are reliable, creative,",
    className: "font-light text-white/68 md:ml-[11%]",
  },
  {
    text: "and always professional",
    className: "md:ml-[5%]",
  },
  {
    text: "in their approach.",
    className: "font-light text-white/68 md:ml-[14%]",
  },
  {
    text: "We're happy to recommend them",
    className: "md:ml-[8%]",
  },
  {
    text: "as a fantastic team to work with",
    className: "font-light text-white/68 md:ml-[16%]",
  },
];

export default function TestimonialSection({
  quote = defaultQuote,
  authorName = "Nikita",
  authorRole = "PR, FinUp",
}: TestimonialSectionProps) {
  const lines =
    quote === defaultQuote
      ? brokenQuoteLines
      : [
          {
            text: quote,
            className: "",
          },
        ];

  return (
    <section className="relative overflow-hidden border-t border-white/10 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-6 gap-y-12 md:gap-x-12">
        <div className="reveal col-span-12 md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Client note</p>
        </div>

        <blockquote className="reveal col-span-12 md:col-span-9" data-delay="1">
          <p className="text-[28px] font-medium leading-[1.01] tracking-[-0.03em] text-white sm:text-[38px] md:text-[46px] lg:text-[54px]">
            <span className="sr-only">{quote}</span>
            <span aria-hidden className="inline">
              {lines.map((line, index) => (
                <span
                  key={line.text}
                  className={`block max-w-[30ch] text-balance ${line.className}`}
                >
                  {index === 0 && <span className="mr-2 text-rm-accent">"</span>}
                  {line.text}
                  {index === lines.length - 1 && <span className="ml-1 text-rm-accent">"</span>}
                </span>
              ))}
            </span>
          </p>

          <footer className="mt-12 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start md:mt-16">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-white/40">
              <cite className="not-italic text-white/85">{authorName}</cite>
              <span aria-hidden>·</span>
              <span>{authorRole}</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/25">
              Founders feedback
            </span>
          </footer>
        </blockquote>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  );
}
