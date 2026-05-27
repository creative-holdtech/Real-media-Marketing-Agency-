import { motion } from "motion/react";

const engagements = [
  {
    name: "Sprint",
    time: "From 4 weeks",
    desc: "Fast start for brands that don't want to spend months on planning. We dive straight into execution, taking over your chosen channels from week one.",
    items: [
      { step: "01", label: "Setup", body: "free audit and channel selection (SMM, PR, SEO, Performance, Design, Messaging)" },
      { step: "02", label: "Run", body: "weekly updates, monthly reports, on-demand analytics and recommendations" },
      { step: "03", label: "Handover", body: "final deliverable with a clear roadmap and 100% asset & content ownership" },
    ],
  },
  {
    name: "Marathon",
    time: "From 2 months",
    desc: "Strategy followed by execution. For brands launching from scratch, rebranding, or entering new markets. We build your positioning and run your marketing channels.",
    items: [
      { step: "01", label: "Strategy", body: "deep-dive workshop, market analysis, brand positioning, and GTM planning" },
      { step: "02", label: "Action", body: "full-scale execution across SMM, PR, SEO, Performance, and active Brand Management" },
      { step: "03", label: "Handover", body: "final brand guidelines, operational channels, 100% asset & content ownership" },
    ],
  },
] as const;

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/50 border border-white/20 rounded-full px-4 py-1.5">
      {children}
    </span>
  );
}

export function ServicesSection() {
  return (
    <section id="engage" aria-labelledby="services-heading" className="bg-[#0a0a0a] border-b border-white/10 px-5 md:px-10 py-24 md:py-40">
      <div className="max-w-[1520px] mx-auto flex flex-col gap-16 md:gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start">
          <div>
            <Tag>Services</Tag>
          </div>
          <div className="md:col-span-2 flex flex-col gap-10">
            <h2
              id="services-heading"
              className="reveal text-[36px] md:text-[56px] font-semibold leading-[110%] tracking-[-0.06em] text-white"
            >
              Two ways to work{" "}
              <span className="text-white/40 font-normal">with us.</span>
            </h2>
            <p className="reveal text-[18px] md:text-[20px] font-medium leading-[1.3] tracking-[-0.04em] text-white/60 max-w-[52ch]" data-delay="1">
              Choose the engagement that fits your stage — a focused sprint or a full-scale marathon.
            </p>
          </div>
        </div>

        <div className="h-px bg-white/10 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-1">
          {engagements.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0, 0, 1] }}
              className="bg-white rounded-2xl p-8 md:p-10 flex flex-col gap-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.05em] leading-[1.1] text-neutral-900">
                    {e.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-semibold uppercase tracking-widest text-neutral-400">
                    {e.time}
                  </p>
                </div>
                <span className="text-[48px] font-semibold tracking-[-0.05em] leading-[0.9] text-neutral-200 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="text-[15px] leading-[1.65] text-neutral-500">{e.desc}</p>

              <div className="flex flex-col gap-0">
                {e.items.map((item, j) => (
                  <div key={item.step} className={`flex gap-5 py-5 ${j > 0 ? "border-t border-neutral-100" : ""}`}>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-300 tabular-nums pt-0.5 w-6 shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 mb-1">{item.label}</p>
                      <p className="text-[13px] leading-[1.6] text-neutral-500">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
