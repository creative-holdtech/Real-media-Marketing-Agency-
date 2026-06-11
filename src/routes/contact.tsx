import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Dribbble, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { afterHubSpotFormCapture } from "@/components/hubspot-tracking";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TeamEnsemble } from "@/components/team-ensemble";
import { useReveal } from "@/hooks/use-reveal";
import { engagementPrefillMessage } from "@/lib/engagements";
import { getPageContent } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";

const socialIconMap: Record<string, LucideIcon> = {
  Linkedin,
  Instagram,
  Dribbble,
};

export const Route = createFileRoute("/contact")({
  loader: async () => ({
    page: await getPageContent("contact"),
  }),
  validateSearch: (search: Record<string, unknown>): { engagement?: "sprint" | "marathon" } => {
    const engagement = search.engagement;
    if (engagement === "sprint" || engagement === "marathon") {
      return { engagement };
    }
    return {};
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    const title = page?.metaTitle ?? "Contact — Let's talk | R—M";
    const description =
      page?.metaDescription ??
      "Short message, sharp answer. We reply within one business day across CET / GST timezones.";
    return buildPageHead({ title, description, pathname: "/contact" });
  },
  component: ContactPage,
});

function ContactPage() {
  useReveal();
  const { page } = Route.useLoaderData();
  const { engagement } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const messagePrefill = engagementPrefillMessage(engagement);
  const hero = page.hero;
  const contact = page.contact;
  const socialLinks =
    contact?.socialLinks?.map((item) => ({
      ...item,
      icon: socialIconMap[item.label] ?? Linkedin,
    })) ?? [];

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-24 md:pt-24 pb-24 md:pb-36">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 30%, rgba(232,93,58,0.16), transparent 70%), radial-gradient(45% 55% at 85% 75%, rgba(124,92,255,0.16), transparent 70%)",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <div className="lg:col-span-5 max-w-[720px]">
            <p className="reveal text-[11px] uppercase tracking-[0.25em] text-white/50 mb-8">
              {contact?.eyebrow ?? "The conversation starts here"}
            </p>
            <h1 className="reveal text-[44px] sm:text-[72px] md:text-[104px] leading-[0.92] tracking-[-0.04em] font-medium text-white max-w-[12ch]">
              {hero?.titleLines?.[0] ?? "Let's"}{" "}
              <span className="font-light text-white/70">{hero?.titleLines?.[1] ?? "talk."}</span>
            </h1>
            {hero?.subheading ? (
              <p
                className="reveal mt-8 max-w-[44ch] text-[15px] md:text-[17px] leading-relaxed rm-body"
                data-delay="2"
              >
                {hero.subheading}
              </p>
            ) : null}

            <div className="reveal mt-12 flex flex-col gap-10" data-delay="3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">Email</p>
                <a
                  href={`mailto:${contact?.email ?? "info@realmedia.ink"}`}
                  className="inline-flex rm-touch items-center gap-3 text-[16px] md:text-[18px] text-white hover:text-rm-accent transition-colors"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70">
                    <Mail className="size-[18px]" strokeWidth={1.5} aria-hidden />
                  </span>
                  {contact?.email ?? "info@realmedia.ink"}
                </a>
              </div>

              <div>
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
                        className="inline-flex rm-touch items-center justify-center size-11 rounded-full border border-white/20 text-white/70 transition-[color,border-color,transform] duration-200 hover:border-white/50 hover:text-white hover:-translate-y-0.5"
                      >
                        <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
                  Located
                </p>
                <div className="flex items-start gap-3 text-[18px] md:text-[20px] text-white/85">
                  <MapPin
                    className="mt-1 size-[18px] shrink-0 text-white/35"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div>
                    {contact?.location ?? "Warsaw · EU · MENA"}
                    <span className="block mt-1 text-[13px] text-white/45">
                      {contact?.locationNote ?? "Operating across CET / GST"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 max-w-[820px] w-full">
            <form
              id="rm-contact-form"
              name="rm-contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                afterHubSpotFormCapture(() => setSent(true));
              }}
              className="reveal rm-card p-8 md:p-10"
              data-delay="2"
            >
              {engagement ? (
                <input type="hidden" name="engagement" value={engagement} readOnly />
              ) : null}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-9">
                <Field label="Name" name="name" required />
                <Field label="Company" name="company" />
                <Field label="Email" name="email" type="email" required className="md:col-span-2" />
              </div>

              <div className="mt-14">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
                  Message
                </label>
                <textarea
                  key={engagement ?? "default"}
                  name="message"
                  rows={4}
                  required
                  defaultValue={messagePrefill}
                  placeholder={
                    contact?.formPlaceholder ??
                    "Tell us what you are building and where you are stuck."
                  }
                  className="w-full bg-transparent border-0 border-b border-white/15 px-0 py-2 text-[15px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/50 transition-colors resize-none"
                />
              </div>

              <div className="mt-16 flex flex-wrap items-center justify-end gap-4">
                <button
                  type="submit"
                  className="inline-flex rm-touch items-center gap-2 px-8 text-[12px] uppercase tracking-[0.2em] rounded-full bg-white text-black font-medium hover:bg-rm-accent hover:text-white transition-[background-color,transform] duration-150 active:scale-[0.97]"
                >
                  {sent
                    ? (contact?.submitSuccessLabel ?? "Message sent — we'll reply soon")
                    : (contact?.submitLabel ?? "Send message →")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <TeamEnsemble variant="banner" />

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
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
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
