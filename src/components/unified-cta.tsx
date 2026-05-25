import { Link } from "@tanstack/react-router";
import { MagneticButton, Reveal } from "@/components/motion-bits";

type CTAProps = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  primaryLabel?: string;
  primaryTo?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  secondaryHref?: string;
};

/**
 * Unified CTA block used across every page (sits directly above SiteFooter).
 * Visual language is taken from the SEO page CTA banner.
 */
export function UnifiedCTA({
  eyebrow,
  title = "Ready to build something that compounds?",
  titleAccent = "Let's start with a free audit.",
  primaryLabel = "Get free audit",
  primaryTo = "/audit",
  primaryHref,
  secondaryLabel = "See case studies",
  secondaryTo = "/cases",
  secondaryHref,
}: Partial<CTAProps> & { title?: string }) {
  return (
    <section
      id="cta"
      aria-labelledby="unified-cta-heading"
      className="relative overflow-hidden border-t border-white/10"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 50%, rgba(232,93,58,0.22), transparent 70%), var(--rm-surface)",
        }}
      />
      <div className="px-6 md:px-12 max-w-[1280px] mx-auto py-28 md:py-36 text-center">
        {eyebrow ? (
          <Reveal duration={0.5}>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-8">{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal duration={0.5}>
          <h2
            id="unified-cta-heading"
            className="mx-auto max-w-5xl text-[44px] sm:text-[72px] md:text-[104px] leading-[0.98] tracking-[-0.04em] font-medium text-white"
          >
            {title}{" "}
            {titleAccent ? <span className="font-light text-white/55">{titleAccent}</span> : null}
          </h2>
        </Reveal>
        <Reveal delay={0.1} duration={0.5}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {primaryHref ? (
              <MagneticButton
                href={primaryHref}
                strength={8}
                className="inline-flex rm-touch items-center gap-2 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
              >
                {primaryLabel}
              </MagneticButton>
            ) : (
              <Link
                to={primaryTo ?? "/audit"}
                className="inline-flex rm-touch items-center gap-2 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full bg-white text-black font-medium hover:bg-[#efeeea] transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
              >
                {primaryLabel}
              </Link>
            )}
            {secondaryHref ? (
              <MagneticButton
                href={secondaryHref}
                strength={6}
                className="inline-flex rm-touch items-center gap-2 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/20 text-white/90 hover:bg-white/5 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
              >
                {secondaryLabel}
              </MagneticButton>
            ) : (
              <Link
                to={secondaryTo ?? "/cases"}
                className="inline-flex rm-touch items-center gap-2 px-7 text-[12px] uppercase tracking-[0.2em] leading-[1] rounded-full border border-white/20 text-white/90 hover:bg-white/5 transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
