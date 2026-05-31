import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { afterHubSpotFormCapture } from "@/components/hubspot-tracking";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
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

      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-16 md:pt-24 pb-12 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(232,93,58,0.22), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(80,60,255,0.14), transparent 70%), #000000",
          }}
        />
        <p className="reveal text-[11px] uppercase tracking-[0.25em] text-white/55 mb-8">
          {hero?.tag ?? "Free · No obligation · up to 7 days"}
        </p>
        <h1 className="reveal text-[44px] sm:text-[80px] md:text-[112px] leading-[0.95] tracking-[-0.04em] font-medium text-white max-w-[1200px]">
          {hero?.titleLines?.[0] ?? "Free marketing audit."}{" "}
          <span className="font-light text-white/55">
            {hero?.titleLines?.[1] ?? "Hard data. No pitch."}
          </span>
        </h1>

        <ul
          className="reveal mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-[820px] text-[15px] md:text-[17px] text-white/75"
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
        className="border-y border-white/10 px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-24"
      >
        <div className="reveal max-w-4xl">
          <h2 className="text-[40px] sm:text-[56px] md:text-[80px] leading-[1.02] tracking-[-0.035em] font-medium text-white">
            Pick the channel that's most urgent.{" "}
            <span className="font-light text-white/45">We diagnose all six if needed.</span>
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {includes.map((b, i) => (
            <div
              key={b.title}
              className="reveal rm-card p-7 md:p-8 transition-[border-color] duration-500 hover:border-white/25"
              data-delay={String((i % 6) + 1)}
            >
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-5 tabular-nums">
                0{i + 1}
              </div>
              <h3 className="text-[26px] md:text-[32px] leading-[1.05] tracking-[-0.02em] font-medium text-white">
                {b.title}
              </h3>
              <p className="mt-4 text-[14px] md:text-[15px] rm-body leading-[1.65]">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-24 border-b border-white/10">
        <div className="reveal max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/45 mb-6">How it works</p>
          <h2 className="text-[40px] sm:text-[56px] md:text-[80px] leading-[1.02] tracking-[-0.035em] font-medium text-white">
            Three steps. <span className="font-light text-white/45">No mystery.</span>
          </h2>
        </div>
        <ol className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal relative rm-card p-7 md:p-10 transition-[border-color] duration-500 hover:border-white/25"
              data-delay={String(i + 1)}
            >
              <div className="text-[48px] md:text-[64px] font-light tracking-[-0.04em] text-white/25 tabular-nums leading-none mb-6">
                {s.n}
              </div>
              <h3 className="text-[22px] md:text-[28px] font-medium tracking-[-0.02em] text-white">
                {s.title}
              </h3>
              <p className="mt-4 text-[14px] md:text-[15px] rm-body leading-[1.65]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="audit-form" className="px-6 md:px-12 max-w-[820px] mx-auto py-24 md:py-36">
        <div className="reveal mb-16 md:mb-20">
          <h2 className="text-[36px] sm:text-[48px] md:text-[64px] leading-[1.02] tracking-[-0.035em] font-medium text-white">
            What are you interested in?
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] text-white/45">
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
            <div className="text-[10px] uppercase tracking-[0.24em] text-white/35 mb-4">
              Choose your focus:
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {focusOptions.map((k) => {
                const active = picks.includes(k);
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggle(k)}
                    aria-pressed={active}
                    className={`text-[14px] pb-1 border-b transition-colors ${
                      active
                        ? "text-white border-rm-accent"
                        : "text-white/45 border-transparent hover:text-white/80"
                    }`}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-14">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
              Anything else?
            </label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Add any extra context or specific goals here"
              className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-2 text-[15px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/50 transition-colors resize-none"
            />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-end gap-4">
            <button
              type="submit"
              className="inline-flex rm-touch items-center gap-2 px-8 text-[12px] uppercase tracking-[0.2em] rounded-full bg-white text-black font-medium hover:bg-rm-accent hover:text-white transition-[background-color,transform] duration-150 active:scale-[0.97]"
            >
              {sent ? "Request sent — we'll be in touch" : "Book the audit →"}
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
      <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
        {label}
        {required && <span className="text-rm-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-2 text-[15px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/50 transition-colors"
      />
    </div>
  );
}
