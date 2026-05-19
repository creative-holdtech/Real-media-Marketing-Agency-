import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Free Marketing Audit — Strategy in 3–5 days | R-M" },
      {
        name: "description",
        content:
          "Free, no-strings marketing audit. SMM, PR, SEO or Performance — pick what's most urgent and get a concrete plan in 3–5 days.",
      },
      { property: "og:title", content: "Free Marketing Audit — R-M Studio" },
      {
        property: "og:description",
        content:
          "Free, no-strings audit. Concrete recommendations across SMM, PR, SEO and Performance in 3–5 days.",
      },
    ],
  }),
  component: AuditPage,
});

const includes = [
  {
    title: "SMM",
    body:
      "Audience quality, narrative consistency, and a 30-day cadence plan tied to inbound.",
  },
  {
    title: "PR",
    body:
      "Story-angle audit, target outlet map, and a placement plan for the next quarter.",
  },
  {
    title: "SEO",
    body:
      "Intent map, technical health, and a 3-pillar content roadmap that compounds.",
  },
  {
    title: "Performance",
    body:
      "Attribution audit, channel diagnosis, and a payback-aware budget reshape.",
  },
];

const steps = [
  { n: "01", title: "You submit", body: "Three minutes to fill the form below — context, channels, what's stuck." },
  { n: "02", title: "We diagnose", body: "Senior operator reviews your situation, talks to one of your team if needed." },
  { n: "03", title: "You get the plan", body: "Concrete, prioritised recommendations in a 6–10 page document. Yours to keep." },
];

function AuditPage() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [picks, setPicks] = useState<string[]>([]);

  const toggle = (k: string) =>
    setPicks((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1] selection:bg-[#e85d3a] selection:text-black overflow-x-hidden">
      <SiteHeader variant="dark" />

      {/* HERO */}
      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-24 md:pt-32 pb-20 md:pb-24 min-h-[80vh] flex flex-col justify-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(232,93,58,0.22), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(80,60,255,0.14), transparent 70%), #060606",
          }}
        />
        <p className="reveal text-[11px] uppercase tracking-[0.25em] text-white/55 mb-8">
          Free · No obligation · 3–5 days
        </p>
        <h1 className="reveal text-[44px] sm:text-[80px] md:text-[112px] leading-[0.95] tracking-[-0.04em] font-medium text-white max-w-[1200px]">
          A free marketing audit.{" "}
          <span className="italic font-light text-white/55">No fluff. No pitch.</span>
        </h1>

        <ul
          className="reveal mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-[820px] text-[15px] md:text-[17px] text-white/75"
          data-delay="2"
        >
          {[
            "A senior operator (not a junior) reviewing your situation",
            "Concrete diagnosis of what's blocking growth",
            "Prioritised 90-day action plan, channel by channel",
            "Yours to keep — even if we never work together",
          ].map((it) => (
            <li key={it} className="flex gap-3">
              <span className="text-[#e85d3a]">—</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>

        <div className="reveal mt-12 flex flex-wrap items-center gap-3" data-delay="3">
          <a
            href="#audit-form"
            className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors active:scale-[0.97]"
          >
            Request the audit →
          </a>
          <a
            href="#what-included"
            className="inline-flex items-center gap-2 h-12 px-7 text-[12px] uppercase tracking-[0.2em] rounded-full border border-white/20 text-white/85 hover:bg-white/5 transition-colors"
          >
            What's included
          </a>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="what-included" className="border-y border-white/10 px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32">
        <div className="reveal max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/45 mb-6">What we look at</p>
          <h2 className="text-[40px] sm:text-[56px] md:text-[80px] leading-[1.02] tracking-[-0.035em] font-medium text-white">
            Pick the channel that's most urgent.{" "}
            <span className="font-light text-white/45">We diagnose all four if needed.</span>
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {includes.map((b, i) => (
            <div
              key={b.title}
              className="reveal rounded-3xl border border-white/10 bg-[#111] p-7 md:p-8 transition-[border-color] duration-500 hover:border-white/25"
              data-delay={String((i % 4) + 1)}
            >
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-5 tabular-nums">0{i + 1}</div>
              <h3 className="text-[26px] md:text-[32px] leading-[1.05] tracking-[-0.02em] font-medium text-white">
                {b.title}
              </h3>
              <p className="mt-4 text-[14px] md:text-[15px] text-white/65 leading-[1.65]">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto py-24 md:py-32 border-b border-white/10">
        <div className="reveal max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/45 mb-6">How it works</p>
          <h2 className="text-[40px] sm:text-[56px] md:text-[80px] leading-[1.02] tracking-[-0.035em] font-medium text-white">
            Three steps.{" "}
            <span className="font-light text-white/45">No mystery.</span>
          </h2>
        </div>
        <ol className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal relative rounded-3xl border border-white/10 bg-[#111] p-7 md:p-10 transition-[border-color] duration-500 hover:border-white/25"
              data-delay={String(i + 1)}
            >
              <div className="text-[48px] md:text-[64px] font-light tracking-[-0.04em] text-white/25 tabular-nums leading-none mb-6">
                {s.n}
              </div>
              <h3 className="text-[22px] md:text-[28px] font-medium tracking-[-0.02em] text-white">
                {s.title}
              </h3>
              <p className="mt-4 text-[14px] md:text-[15px] text-white/65 leading-[1.65]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* FORM */}
      <section id="audit-form" className="relative px-6 md:px-12 max-w-[1100px] mx-auto py-24 md:py-32">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(232,93,58,0.18), transparent 70%)",
          }}
        />
        <div className="reveal text-center mb-12">
          <h2 className="text-[40px] sm:text-[56px] md:text-[72px] leading-[1.02] tracking-[-0.035em] font-medium text-white">
            Request the audit.
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] text-white/55">
            Free · No obligation · Result in 3–5 days
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const interests = picks.length ? picks.join(", ") : "(none selected)";
            const params = new URLSearchParams({
              subject: `Audit request — ${data.get("name") ?? ""} · ${data.get("company") ?? ""}`,
              body: `Name: ${data.get("name") ?? ""}\nCompany: ${data.get("company") ?? ""}\nEmail: ${data.get("email") ?? ""}\nSite: ${data.get("site") ?? ""}\nInterests: ${interests}\n\nNotes:\n${data.get("notes") ?? ""}`,
            }).toString();
            window.location.href = `mailto:hello@r-m.studio?${params}`;
            setSent(true);
          }}
          className="reveal rounded-3xl border border-white/10 bg-[#111] p-6 md:p-12 transition-[border-color] duration-500 hover:border-white/20"
          data-delay="2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Name" name="name" required />
            <Field label="Company" name="company" />
            <Field label="Email" name="email" type="email" required />
            <Field label="Website" name="site" placeholder="https://" />
          </div>

          <div className="mt-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">
              What are you interested in?
            </div>
            <div className="flex flex-wrap gap-2">
              {["SMM", "PR", "SEO", "Performance"].map((k) => {
                const active = picks.includes(k);
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => toggle(k)}
                    aria-pressed={active}
                    className={`text-[12px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-colors active:scale-[0.97] ${
                      active
                        ? "bg-white text-black border-white"
                        : "border-white/15 text-white/65 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-[11px] uppercase tracking-[0.22em] text-white/45 mb-3">
              Anything else we should know?
            </label>
            <textarea
              name="notes"
              rows={4}
              placeholder="What's the biggest thing stuck right now?"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors resize-none"
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[12px] text-white/45">
              Free · No obligation · Result in 3–5 days
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 h-12 px-8 text-[12px] uppercase tracking-[0.2em] rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-[background-color,transform] duration-150 active:scale-[0.97]"
            >
              {sent ? "Opening mail…" : "Book the audit →"}
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
      <label className="block text-[11px] uppercase tracking-[0.22em] text-white/45 mb-3">
        {label}
        {required && <span className="text-[#e85d3a] ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
      />
    </div>
  );
}
