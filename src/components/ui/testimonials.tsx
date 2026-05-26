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
  authorName = "Nikita PR",
  authorRole = "FinUp",
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
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-20 md:py-28 lg:px-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-x-6 gap-y-12 md:gap-x-12">
        <blockquote className="reveal col-span-12 md:col-span-9 md:col-start-4" data-delay="1">
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

          <footer className="mt-12 flex flex-col gap-1.5 md:mt-16">
            <cite className="not-italic text-[11px] font-medium uppercase tracking-[0.24em] text-white/85">
              {authorName}
            </cite>
            <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              {authorRole}
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
