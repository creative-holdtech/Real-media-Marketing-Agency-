import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Dribbble, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SplitDisplayTitle } from "@/components/ds-templates";
import {
  bodyCopy,
  btnPrimary,
  BtnArrow,
  formContainer,
  pageBand,
  textFaint,
  textGhost,
  textMeta,
} from "@/components/framer-section";
import { afterHubSpotFormCapture } from "@/components/hubspot-tracking";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TeamEnsemble } from "@/components/team-ensemble";
import { useReveal } from "@/hooks/use-reveal";
import { engagementPrefillMessage } from "@/lib/engagements";
import { getPageContent } from "@/lib/payload/pages";
import { buildPageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

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

      <section className={cn("relative pt-24 pb-24 md:pb-36", pageBand)}>
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
            <p className="reveal mb-8">
              <span className={textMeta}>{contact?.eyebrow ?? "The conversation starts here"}</span>
            </p>
            <SplitDisplayTitle
              lines={[
                hero?.titleLines?.[0] ?? "Let's",
                hero?.titleLines?.[1] ?? "talk.",
              ]}
              className="max-w-[12ch] reveal"
            />
            {hero?.subheading ? (
              <p
                className={cn("reveal mt-8 max-w-[44ch]", bodyCopy)}
                data-delay="2"
              >
                {hero.subheading}
              </p>
            ) : null}

            <div className="reveal mt-12 flex flex-col gap-10" data-delay="3">
              <div>
                <p className={cn(textMeta, "mb-3", textGhost)}>Email</p>
                <a
                  href={`mailto:${contact?.email ?? "info@realmedia.ink"}`}
                  className="inline-flex rm-touch items-center gap-3 rm-type-body text-white hover:text-rm-accent transition-colors"
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
                <p className={cn(textMeta, "mb-3", textGhost)}>
                  Located
                </p>
                <div className="flex items-start gap-3 rm-type-body text-white">
                  <MapPin
                    className="mt-1 size-[18px] shrink-0 text-white/35"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div>
                    {contact?.location ?? "Warsaw · EU · MENA"}
                    <span className={cn("mt-1 block rm-type-body", textFaint)}>
                      {contact?.locationNote ?? "Operating across CET / GST"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cn("lg:col-span-7 lg:col-start-6 w-full", formContainer)}>
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
                <label className={cn("mb-4 block", textMeta, textGhost)}>
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
                  className="w-full resize-none border-0 border-b border-[var(--rm-border-soft)] bg-transparent px-0 py-2 rm-type-body text-white placeholder:text-[var(--rm-text-ghost)] focus:border-white/50 focus:outline-none"
                />
              </div>

              <div className="mt-16 flex flex-wrap items-center justify-end gap-4">
                <button type="submit" className={cn(btnPrimary, "group gap-2")}>
                  {sent
                    ? (contact?.submitSuccessLabel ?? "Message sent — we'll reply soon")
                    : (contact?.submitLabel ?? "Send message").replace(/\s*→$/, "")}
                  {!sent ? <BtnArrow /> : null}
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
      <label className={cn("mb-3 block", textMeta, textGhost)}>
        {label}
        {required && <span className="ml-1 text-rm-accent">*</span>}
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
