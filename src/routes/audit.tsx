import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { afterHubSpotFormCapture } from "@/components/hubspot-tracking";
import {
  BtnArrow,
  btnPrimary,
  sectionHeadline,
  siteGutter,
  surfaceCardTitle,
  textCardBody,
  textFaint,
  textGhost,
  textMeta,
} from "@/components/framer-section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { getPageContent, section as pageSection } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";

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

      <section
        className={cn(
          "relative mx-auto max-w-[var(--rm-grid-max)] pt-16 md:pt-24 pb-12 md:pb-20",
          siteGutter,
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(232,93,58,0.22), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(80,60,255,0.14), transparent 70%), #000000",
          }}
        />
        <p className="reveal rm-eyebrow mb-8">
          {hero?.tag ?? "Free · No obligation · up to 7 days"}
        </p>
        <h1 className="reveal rm-title-hero max-w-[var(--rm-grid-max)]">
          {hero?.titleLines?.[0] ?? "Free marketing audit."}{" "}
          <span className="rm-type-display-muted">
            {hero?.titleLines?.[1] ?? "Hard data. No pitch."}
          </span>
        </h1>

        <ul
          className={cn(
            "reveal mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-[820px]",
            textCardBody,
          )}
          data-delay="2"
        >
          {heroBullets.map((it) => (
            <li key={it} className="flex gap-3">
              <span className="text-rm-accent">—</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="what-included"
        className={cn(
          "border-y border-[var(--rm-border-soft)] mx-auto max-w-[var(--rm-grid-max)] py-24",
          siteGutter,
        )}
      >
        <div className="reveal max-w-4xl">
          <h2 className={sectionHeadline}>
            Pick the channel that's most urgent.{" "}
            <span className="rm-type-display-muted">We diagnose all six if needed.</span>
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {includes.map((b, i) => (
            <div
              key={b.title}
              className="reveal rm-card p-7 md:p-8 transition-[border-color] duration-500 hover:border-[var(--rm-border-strong)]"
              data-delay={String((i % 6) + 1)}
            >
              <div className={cn(textMeta, "mb-5 tabular-nums")}>0{i + 1}</div>
              <h3 className={surfaceCardTitle}>{b.title}</h3>
              <p className={cn("mt-4", textCardBody)}>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={cn(
          "mx-auto max-w-[var(--rm-grid-max)] py-24 border-b border-[var(--rm-border-soft)]",
          siteGutter,
        )}
      >
        <div className="reveal max-w-4xl">
          <p className="rm-eyebrow mb-6">How it works</p>
          <h2 className={sectionHeadline}>
            Three steps. <span className="rm-type-display-muted">No mystery.</span>
          </h2>
        </div>
        <ol className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal relative rm-card p-7 md:p-10 transition-[border-color] duration-500 hover:border-[var(--rm-border-strong)]"
              data-delay={String(i + 1)}
            >
              <div
                className={cn(
                  "rm-type-display font-light text-[var(--rm-text-ghost)] tabular-nums leading-none mb-6",
                )}
              >
                {s.n}
              </div>
              <h3 className={surfaceCardTitle}>{s.title}</h3>
              <p className={cn("mt-4", textCardBody)}>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="audit-form" className={cn("mx-auto max-w-[820px] py-24 md:py-36", siteGutter)}>
        <div className="reveal mb-16 md:mb-20">
          <h2 className={sectionHeadline}>What are you interested in?</h2>
          <p className={cn("mt-5 rm-type-body", textFaint)}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-9">
            <Field label="Name" name="name" required />
            <Field label="Company" name="company" />
            <Field label="Email" name="email" type="email" required />
            <Field label="Website" name="site" placeholder="https://" />
          </div>

          <div className="mt-14">
            <div className={cn("rm-type-tag mb-4", textGhost)}>Choose your focus:</div>
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
                      "rm-type-body pb-1 border-b transition-colors",
                      active
                        ? "text-[var(--rm-ink)] border-rm-accent"
                        : "text-[var(--rm-text-faint)] border-transparent hover:text-[var(--rm-text-body)]",
                    )}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-14">
            <label className={cn("block rm-type-tag mb-4", textFaint)}>Anything else?</label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Add any extra context or specific goals here"
              className="w-full bg-transparent border-0 border-b border-[var(--rm-border-strong)] px-0 py-2 rm-type-body text-[var(--rm-ink)] placeholder:text-[var(--rm-text-ghost)] focus:outline-none focus:border-white/50 transition-colors resize-none"
            />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-end gap-4">
            <button type="submit" className={cn(btnPrimary, "group")}>
              {sent ? "Request sent — we'll be in touch" : "Book the audit"}
              {!sent ? <BtnArrow /> : null}
            </button>
          </div>
        </form>
      </section>

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
      <label className={cn("block rm-type-tag mb-3", textFaint)}>
        {label}
        {required && <span className="text-rm-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b border-[var(--rm-border-strong)] px-0 py-2 rm-type-body text-[var(--rm-ink)] placeholder:text-[var(--rm-text-ghost)] focus:outline-none focus:border-white/50 transition-colors"
      />
    </div>
  );
}
