import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's talk | R-M Studio" },
      {
        name: "description",
        content:
          "Tell us where you're stuck. We reply within one business day across CET / GST timezones.",
      },
      { property: "og:title", content: "Contact — R-M Studio" },
      {
        property: "og:description",
        content: "Tell us where you're stuck. We reply within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  useReveal();
  const [sent, setSent] = useState(false);

  return (
    <div className="rm-page selection:bg-rm-accent selection:text-black">
      <SiteHeader variant="dark" />

      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-24 md:pt-32 pb-24 md:pb-32">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 30%, rgba(232,93,58,0.16), transparent 70%), radial-gradient(45% 55% at 85% 75%, rgba(124,92,255,0.16), transparent 70%)",
          }}
        />

        <div className="grid grid-cols-12 gap-10 md:gap-16">
          {/* LEFT — TEXT + CONTACTS */}
          <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
            <p className="reveal text-[11px] uppercase tracking-[0.25em] text-white/50 mb-8">
              The conversation starts here
            </p>
            <h1 className="reveal text-[44px] sm:text-[72px] md:text-[104px] leading-[0.92] tracking-[-0.04em] font-medium text-white max-w-[12ch]">
              Let's <span className="font-light text-white/70">talk.</span>
            </h1>
            <p
              className="reveal mt-8 max-w-[44ch] text-[15px] md:text-[17px] leading-relaxed rm-body"
              data-delay="2"
            >
              Short message, sharp answer. We reply within one business day — founder-led, no
              gatekeepers.
            </p>

            <dl className="reveal mt-12 grid grid-cols-1 gap-7" data-delay="3">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-2">
                  Email
                </dt>
                <dd>
                  <a
                    href="mailto:hello@r-m.studio"
                    className="text-[18px] md:text-[20px] text-white hover:text-rm-accent transition-colors"
                  >
                    hello@r-m.studio
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-2">
                  LinkedIn
                </dt>
                <dd>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[18px] md:text-[20px] text-white hover:text-rm-accent transition-colors"
                  >
                    linkedin.com/company/r-m-studio
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-2">
                  Located
                </dt>
                <dd className="text-[18px] md:text-[20px] text-white/85">
                  Kyiv · EU · MENA
                  <span className="block mt-1 text-[13px] text-white/45">
                    Operating across CET / GST
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* RIGHT — FORM */}
          <div className="col-span-12 md:col-span-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const params = new URLSearchParams({
                  subject: `Contact — ${data.get("name") ?? ""} · ${data.get("company") ?? ""}`,
                  body: `${data.get("message") ?? ""}\n\n— ${data.get("name") ?? ""}\n${data.get("email") ?? ""}`,
                }).toString();
                window.location.href = `mailto:hello@r-m.studio?${params}`;
                setSent(true);
              }}
              className="reveal rm-card-floating p-6 md:p-10 transition-[border-color] duration-500 hover:border-white/20"
              data-delay="2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Name" name="name" required />
                <Field label="Company" name="company" />
                <div className="md:col-span-2">
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-[0.22em] text-white/45 mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="What are you trying to ship?"
                    className="w-full bg-rm-surface/50 border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Reply within 1 business day
                </p>
                <button
                  type="submit"
                  className="inline-flex rm-touch items-center gap-2 px-7 text-[12px] uppercase tracking-[0.2em] rounded-full bg-white text-black font-medium hover:bg-rm-accent hover:text-white transition-[background-color,transform] duration-150 active:scale-[0.97]"
                >
                  {sent ? "Opening mail…" : "Send message →"}
                </button>
              </div>
            </form>
          </div>
        </div>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.22em] text-white/45 mb-3">
        {label}
        {required && <span className="text-rm-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-rm-surface/50 border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
      />
    </div>
  );
}
