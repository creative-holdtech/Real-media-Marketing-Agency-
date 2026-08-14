import { Dribbble, Instagram, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

import ctaSectionGlow from "@/assets/cta-section-glow.svg";
import {
  BtnArrow,
  DURATION_ENTER,
  EASE_ENTER,
  FlipLabel,
  FramerTag,
  bodyCopy,
  btnPrimaryOnLight,
  hoverColorTransform,
  sectionGap,
  sectionInner,
  sectionShell,
  sectionTagLeadStack,
  textFaint,
} from "@/components/framer-section";
import { afterHubSpotFormCapture } from "@/components/hubspot-tracking";
import { TRIGGER_VIEWPORT_MARGIN } from "@/components/motion-bits";
import type { PageContactContent, PageCtaContent } from "@/lib/page-content/types";
import { servicesList } from "@/lib/services";
import { cn } from "@/lib/utils";

const socialIconMap: Record<string, LucideIcon> = {
  Linkedin,
  Instagram,
  Dribbble,
};

/** mdx.so's own "Let's talk" card shadow (inspected live: rgba(16,24,32,.06) 0 10px 36px
 * + a 1px rgba(230,236,242,.08) edge) — lifts the card off the section instead of blending in. */
const CARD_SHADOW = "0 10px 36px rgba(16,24,32,0.06), 0 0 0 1px rgba(230,236,242,0.08)";

const INTEREST_OPTIONS = [
  { slug: "free-audit", label: "Free audit" },
  ...servicesList.map((s) => ({ slug: s.slug, label: s.shortName })),
];

/** Ellipse-fill hover grown from wherever the pointer entered — same
 * interaction as the Disciplines section's service pills (Section 5). */
function InterestPill({
  label,
  active,
  onClick,
}: {
  label: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  const fillRef = useRef<HTMLSpanElement>(null);

  const onPointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    if (fillRef.current) fillRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      aria-pressed={active}
      className={cn(
        "group relative rm-touch inline-flex items-center overflow-hidden whitespace-nowrap rounded-full border px-4 py-2 rm-type-body transition-colors duration-[700ms] ease-[cubic-bezier(0.625,0.05,0,1)]",
        active ? "border-[var(--rm-ink)]" : "border-[var(--rm-border-strong)] hover:border-[var(--rm-ink)]",
      )}
    >
      <span
        ref={fillRef}
        aria-hidden
        className={cn(
          "absolute -inset-px rounded-full bg-[var(--rm-ink)] transition-transform duration-[700ms] ease-[cubic-bezier(0.625,0.05,0,1)]",
          active ? "scale-100" : "scale-0 group-hover:scale-100",
        )}
        style={{ transformOrigin: "center" }}
      />
      <span
        className={cn(
          "relative z-[1] transition-colors duration-[700ms] ease-[cubic-bezier(0.625,0.05,0,1)]",
          active ? "text-[var(--rm-light-surface)]" : "text-[var(--rm-ink)] group-hover:text-white",
        )}
      >
        {label}
      </span>
    </button>
  );
}

type CtaContactFormProps = {
  cta?: PageCtaContent;
  contact?: PageContactContent;
};

export function CtaContactForm({ cta, contact }: CtaContactFormProps) {
  const [sent, setSent] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const reduce = Boolean(useReducedMotion());

  // One shared entrance signal for the whole card, gated with the sitewide
  // trigger margin. The card is tall (160px top/bottom padding, socials
  // sitting 100px below the heading, the form column further still), so
  // checking each block's own position independently — the old .reveal
  // approach — meant the user had to keep scrolling for each piece to reach
  // the trigger line in turn: a scroll-position-dependent staccato instead
  // of one cascade that plays once the card arrives.
  const cascadeRef = useRef<HTMLDivElement>(null);
  const entered = useInView(cascadeRef, {
    once: true,
    amount: 0.15,
    margin: TRIGGER_VIEWPORT_MARGIN,
  });
  const cascade = (index: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    animate: reduce || entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: DURATION_ENTER, ease: EASE_ENTER, delay: index * 0.13 },
  });

  const socialLinks =
    contact?.socialLinks?.map((item) => ({
      ...item,
      icon: socialIconMap[item.label] ?? Linkedin,
    })) ?? [];

  const submitLabel = (contact?.submitLabel ?? "Send message →").replace(/\s*→$/, "");
  const submitSuccessLabel = contact?.submitSuccessLabel ?? "Message sent — we'll reply soon";

  const titleText = cta?.title ?? "Tell us what's slowing you down. We'll clear the track.";

  return (
    <section
      className={cn(
        sectionShell,
        "relative overflow-hidden rm-section-light lg:flex lg:min-h-screen lg:flex-col lg:pt-[calc(var(--rm-header-offset)+2.5rem)] lg:pb-10",
      )}
    >
      <img
        src={ctaSectionGlow}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-16 md:-bottom-20 lg:-bottom-10 z-0 h-full w-full object-cover object-bottom opacity-90"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
        }}
      />

      <div className={cn(sectionInner, "relative z-[1] w-full lg:flex lg:flex-1 lg:flex-col")}>
        <div
          ref={cascadeRef}
          className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/25 p-8 backdrop-blur-2xl backdrop-saturate-150 md:rounded-[2.5rem] md:p-16 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-[160px]"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div className={cn("relative grid grid-cols-1 lg:grid-cols-12 lg:items-center", sectionGap)}>
            <div className="flex flex-col lg:col-span-6">
              <div className={sectionTagLeadStack}>
                <motion.div {...cascade(0)}>
                  <FramerTag className="w-fit">
                    {contact?.eyebrow ?? "The conversation starts here"}
                  </FramerTag>
                </motion.div>
                <motion.div {...cascade(1)} className="flex w-full flex-col gap-4">
                  <h2 className="rm-title-hero-lead m-0">{titleText}</h2>
                  {cta?.titleAccent ? (
                    <p className={cn(bodyCopy, "m-0")}>{cta.titleAccent}</p>
                  ) : null}
                </motion.div>
              </div>

              <motion.div {...cascade(2)} className="mt-[100px] flex flex-col gap-8">
                {socialLinks.length ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {socialLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          className={cn(
                            "group inline-flex rm-touch items-center justify-center size-11 rounded-full border border-[var(--rm-border-strong)] text-[var(--rm-text-muted)] hover:border-[var(--rm-ink)] hover:text-[var(--rm-ink)] motion-safe:hover:-translate-y-0.5",
                            hoverColorTransform,
                          )}
                        >
                          <span className="relative inline-block size-[18px] overflow-hidden">
                            <span className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:-translate-y-[18px] motion-reduce:group-hover:translate-y-0">
                              <Icon className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden />
                              <Icon className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden />
                            </span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                ) : null}

                <a
                  href={`mailto:${contact?.email ?? "info@realmedia.ink"}`}
                  className="group inline-flex rm-touch items-center gap-3 rm-type-subsection text-[var(--rm-ink)] w-fit"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--rm-border-strong)] text-[var(--rm-text-muted)]">
                    <span className="relative inline-block size-[18px] overflow-hidden">
                      <span className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:-translate-y-[18px] motion-reduce:group-hover:translate-y-0">
                        <Mail className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden />
                        <Mail className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden />
                      </span>
                    </span>
                  </span>
                  <span className="relative inline-block after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-[500ms] after:ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:after:scale-x-100">
                    {contact?.email ?? "info@realmedia.ink"}
                  </span>
                </a>
              </motion.div>
            </div>

            <motion.div {...cascade(3)} className="lg:col-span-5 lg:col-start-8">
              <form
                id="rm-cta-contact-form"
                name="rm-cta-contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  afterHubSpotFormCapture(() => setSent(true));
                }}
              >
                <input type="hidden" name="interest" value={interests.join(", ")} readOnly />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                  <Field label="Full name" name="name" required />
                  <Field label="Company" name="company" />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>

                <div className="mt-10">
                  <p className={cn("rm-type-tag mb-3 text-[length:var(--rm-font-base)]", textFaint)}>
                    I&rsquo;m interested in
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {INTEREST_OPTIONS.map((option) => {
                      const active = interests.includes(option.slug);
                      const label =
                        option.slug === "free-audit" ? (
                          <>
                            <span className="text-[#B85821]">Free</span> audit
                          </>
                        ) : (
                          option.label
                        );
                      return (
                        <InterestPill
                          key={option.slug}
                          label={label}
                          active={active}
                          onClick={() =>
                            setInterests((prev) =>
                              active ? prev.filter((slug) => slug !== option.slug) : [...prev, option.slug],
                            )
                          }
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mt-[25px]">
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={
                      contact?.formPlaceholder ??
                      "Tell us what you are building and where you are stuck"
                    }
                    className="block w-full bg-transparent border-0 border-b border-[var(--rm-border-strong)] px-0 py-2 rm-type-body text-[var(--rm-ink)] placeholder:text-[var(--rm-text-ghost)] placeholder:uppercase placeholder:tracking-[var(--rm-track-caps)] placeholder:font-medium focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className={cn(btnPrimaryOnLight, "group mt-12 w-full gap-2")}
                  aria-label={sent ? submitSuccessLabel : submitLabel}
                >
                  <FlipLabel text={sent ? submitSuccessLabel : submitLabel} />
                  {!sent ? <BtnArrow /> : null}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Placeholder IS the label, sitting inside the field itself — no
          caption above it, matching the reference. The border stays the
          same color focused or not; only outline-none is needed to drop
          the browser's own default focus ring. */}
      <input
        type={type}
        name={name}
        required={required}
        placeholder={label}
        className="w-full bg-transparent border-0 border-b border-[var(--rm-border-strong)] px-0 py-2 rm-type-body text-[var(--rm-ink)] placeholder:text-[var(--rm-text-ghost)] placeholder:uppercase placeholder:tracking-[var(--rm-track-caps)] placeholder:font-medium focus:outline-none transition-colors"
      />
    </div>
  );
}
