import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  NarrowBand,
  PageHero,
  PageSection,
  SectionEyebrow,
  SectionSplitHeadline,
} from "@/components/ds-templates";
import {
  bodyCopy,
  btnPrimary,
  BtnArrow,
  interactiveSurfaceCard,
  sectionHeadline,
  subsectionTitle,
  surfaceCardPadding,
  surfaceCardShell,
  textCardBody,
  textFaint,
  textGhost,
  textMeta,
  textMetric,
} from "@/components/framer-section";
import { afterHubSpotFormCapture } from "@/components/hubspot-tracking";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useReveal } from "@/hooks/use-reveal";
import { getPageContent, section as pageSection } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/audit")({
  loader: async () => ({
    page: await getPageContent("audit"),
  }),
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    const title = page?.metaTitle ?? "Free Marketing Audit — up to 7 days | R—M";
    const description =
      page?.metaDescription ??
      "Free marketing audit with hard data and no pitch. Senior experts analyse your pipeline and deliver a prioritised 90-day plan in up to 7 days.";
    return buildPageHead({ title, description, pathname: "/audit" });
  },
  component: AuditPage,
});

const defaultHeroBullets = [
  "Senior experts analysing your current pipeline tracks",
  "A clear breakdown of what's blocking your growth",
  "Prioritised 90-day action plan, channel by channel",
  "No strings attached — execute with us or in-house",
];

const defaultIncludes = [
  {
    title: "SMM",
    body: "Audience quality, narrative consistency, 30-day cadence plan tied to inbound.",
  },
  {
    title: "PR",
    body: "Authority angles, target media shortlist, placement plan for the next quarter.",
  },
  {
    title: "SEO",
    body: "Commercial intent map, technical health check, 3-pillar compounding roadmap.",
  },
  {
    title: "Performance",
    body: "Attribution setup, channel performance audit, payback-aware budget reshape.",
  },
  {
    title: "Design",
    body: "Visual identity asset check, consistency alignment, product first-impression audit.",
  },
  {
    title: "Marketing",
    body: "Brand positioning, narrative alignment, end-to-end market communication logic.",
  },
];

const defaultSteps = [
  {
    n: "01",
    title: "You submit",
    body: "Three minutes to fill the form below — context, channels, what needs fixing.",
  },
  {
    n: "02",
    title: "We diagnose",
    body: "Senior expert reviews your setup and talks to your representative if needed.",
  },
  {
    n: "03",
    title: "You get the plan",
    body: "Concrete, prioritised recommendations in a 6–10 page document. Ready to execute.",
  },
];

const focusOptions = ["SMM", "PR", "SEO", "Performance", "Brand & Marketing", "Design"];

const heroAmbient = (
  <div
    aria-hidden
    className="absolute inset-0 -z-10"
    style={{
      background:
        "radial-gradient(60% 50% at 50% 30%, rgba(232,93,58,0.22), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(80,60,255,0.14), transparent 70%), #000000",
    }}
  />
);

function AuditPage() {
  useReveal();
  const { page } = Route.useLoaderData();
  const hero = page.hero;
  const heroBullets = pageSection(page, "hero-bullets").bullets ?? defaultHeroBullets;
  const includesSection = pageSection(page, "includes");
  const stepsSection = pageSection(page, "steps");
  const includes =
    includesSection.items?.map((item) => ({
      title: item.title ?? "",
      body: item.body ?? "",
    })) ?? defaultIncludes;
  const steps =
    stepsSection.items?.map((item, index) => ({
      n: String(index + 1).padStart(2, "0"),
      title: item.title ?? "",
      body: item.body ?? "",
    })) ?? defaultSteps;
  const [sent, setSent] = useState(false);
  const [picks, setPicks] = useState<string[]>([]);

  const toggle = (k: string) =>
    setPicks((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      <PageHero
        tag={hero?.tag ?? "Free · No obligation · up to 7 days"}
        titleLines={[
          hero?.titleLines?.[0] ?? "Free marketing audit.",
          hero?.titleLines?.[1] ?? "Hard data. No pitch.",
        ]}
        ambient={heroAmbient}
      >
        <ul
          className="reveal mt-10 grid max-w-[var(--rm-prose-max)] grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-12"
          data-delay="2"
        >
          {heroBullets.map((it) => (
            <li key={it} className="flex gap-3">
              <span className="text-rm-accent">—</span>
              <span className={bodyCopy}>{it}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <PageSection id="what-included" className="border-y border-[var(--rm-border-soft)]">
        <SectionSplitHeadline
          primary="Pick the channel that's most urgent."
          muted="We diagnose all six if needed."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {includes.map((b, i) => (
            <div
              key={b.title}
              className={cn(
                surfaceCardShell,
                interactiveSurfaceCard,
                "reveal",
                surfaceCardPadding,
              )}
              data-delay={String((i % 6) + 1)}
            >
              <div className={cn(textMeta, "mb-5 tabular-nums", textFaint)}>
                0{i + 1}
              </div>
              <h3 className={subsectionTitle}>{b.title}</h3>
              <p className={cn(textCardBody, "mt-4")}>{b.body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-b border-[var(--rm-border-soft)]">
        <SectionEyebrow>How it works</SectionEyebrow>
        <SectionSplitHeadline primary="Three steps." muted="No mystery." />
        <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className={cn(surfaceCardShell, interactiveSurfaceCard, "reveal", surfaceCardPadding)}
              data-delay={String(i + 1)}
            >
              <div className={cn(textMetric, "mb-6 text-[2.5rem] text-[var(--rm-text-ghost)] md:text-[4rem]")}>
                {s.n}
              </div>
              <h3 className={subsectionTitle}>{s.title}</h3>
              <p className={cn(textCardBody, "mt-4")}>{s.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <NarrowBand id="audit-form" maxWidth="form" className="md:py-28">
        <div className="reveal mb-12 md:mb-16">
          <h2 className={cn(sectionHeadline, "text-white")}>What are you interested in?</h2>
          <p className={cn(textMeta, "mt-5 normal-case tracking-normal", textFaint)}>
            Free · No strings attached · Result in up to 7 days
          </p>
        </div>

        <form
          id="rm-audit-form"
          name="rm-audit-form"
          onSubmit={(e) => {
            e.preventDefault();
            afterHubSpotFormCapture(() => setSent(true));
          }}
          className="reveal"
          data-delay="2"
        >
          <input type="hidden" name="audit_focus" value={picks.join(", ")} readOnly />
          <div className="grid grid-cols-1 gap-x-10 gap-y-9 md:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Company" name="company" />
            <Field label="Email" name="email" type="email" required />
            <Field label="Website" name="site" placeholder="https://" />
          </div>

          <div className="mt-12">
            <div className={cn(textMeta, "mb-4", textGhost)}>Choose your focus:</div>
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {focusOptions.map((k) => {
                const active = picks.includes(k);
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggle(k)}
                    aria-pressed={active}
                    className={cn(
                      "rm-type-body border-b pb-1 transition-colors",
                      active
                        ? "border-rm-accent text-white"
                        : cn(textFaint, "border-transparent hover:text-[var(--rm-text-subtle)]"),
                    )}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-12">
            <label className={cn("mb-4 block", textMeta, textGhost)}>Anything else?</label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Add any extra context or specific goals here"
              className="w-full resize-none border-0 border-b border-[var(--rm-border-soft)] bg-transparent px-0 py-2 rm-type-body text-white placeholder:text-[var(--rm-text-ghost)] focus:border-white/50 focus:outline-none"
            />
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-end gap-4">
            <button type="submit" className={cn(btnPrimary, "group gap-2")}>
              {sent ? "Request sent — we'll be in touch" : "Book the audit"}
              {!sent ? <BtnArrow /> : null}
            </button>
          </div>
        </form>
      </NarrowBand>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={cn("mb-3 block", textMeta, textGhost)}>
        {label}
        {required ? <span className="ml-1 text-rm-accent">*</span> : null}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full border-0 border-b border-[var(--rm-border-soft)] bg-transparent px-0 py-2 rm-type-body text-white placeholder:text-[var(--rm-text-ghost)] focus:border-white/50 focus:outline-none"
      />
    </div>
  );
}
