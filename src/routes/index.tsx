import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

const nav = ["Home", "Work", About: "About", "Thinking"] as unknown as string[];
const navItems = ["Home", "Work", "About", "Thinking"];

const clients = [
  "Remedy",
  "Supercharge",
  "A1Base",
  "Iceberg",
  "Coherence",
  "Advance VC",
  "Syenta",
  "Updoc",
  "Giant Leap",
  "Firmable",
  "Elita",
  "Andromeda",
  "Veraty",
  "Workyard",
  "Earlywork",
  "Wedgetail",
  "Quoin",
  "Blackbird",
  "Exposure",
  "Aquila",
  "T-EDI",
  "Diag-Nose",
  "Aces",
];

const projects = [
  {
    title: "Established Diag-Nose's institutional credibility ahead of a $3M non-dilutive grant.",
    tags: ["Life Science", "AI", "Web"],
    grad: "from-[#1e3a5f] via-[#2d6e9e] to-[#e8b48a]",
  },
  {
    title: "Repositioned Coherence Neuro ahead of a $10M raise.",
    tags: ["Neuro-Tech", "AI", "Brand", "Web", "Narrative", "Deck"],
    grad: "from-[#1a1a3a] via-[#5a3a8a] to-[#e8a87c]",
  },
  {
    title: "Reframed Blackbird Foundation's digital presence to reflect the depth of their mission.",
    tags: ["Venture Foundation", "Web"],
    grad: "from-[#0a0a0a] via-[#1a1a1a] to-[#3a3a3a]",
  },
  {
    title: "Positioned Veraty AI for credibility, performance, and scale.",
    tags: ["Legal-Tech", "AI", "Web"],
    grad: "from-[#0c2340] via-[#2d8a9e] to-[#5cbdb9]",
  },
  {
    title: "Architected Iceberg Quantum's presence ahead of its emergence from stealth.",
    tags: ["Deep Tech", "AI", "Brand", "Web"],
    grad: "from-[#0a1428] via-[#3a6ba8] to-[#b8d4e8]",
  },
];

const services = [
  {
    name: "Narratives",
    desc: "Bridge the gap between complex engineering and market demand. We give you the exact words to capture attention, align your team, and build shared conviction.",
    tags: ["Brand Strategy", "Product Marketing", "Messaging"],
  },
  {
    name: "Brand",
    desc: "Prove you are building a category. We engineer brands that broadcast long-term intent and separate you from the noise.",
    tags: ["Visual Identities", "Naming", "Brand Guidelines"],
  },
  {
    name: "Decks",
    desc: "Don't let friction dilute your pitch. We strip away the friction to build compelling, highly precise investor materials engineered to get to \u201cyes.\u201d",
    tags: ["Deck Strategy", "Investor Narrative"],
  },
  {
    name: "Websites",
    desc: "Build a digital front door that works as hard as your tech stack. We combine immersive UX and elite UI to turn complex products into obvious solutions.",
    tags: ["Design", "Development", "Animation"],
  },
];

const testimonials = [
  { quote: "So impressed with the unparalleled responsiveness and open communication throughout our collaboration. Their infectious energy and remarkable design elevated our project.", who: "Lisa Miller", role: "CEO, Wedgetail" },
  { quote: "Truly awesome to work with the team, such positive vibrant energy. Exceptional design, leading with creativity and great intuition for translating our ideas.", who: "Eamonn Colley", role: "Co-CEO, Vexev" },
  { quote: "An exceptional experience from start to finish. Their collaborative approach and deep understanding of the unique challenges startups face set them apart.", who: "Sarah Fleetwood", role: "Product Designer, Veraty AI" },
  { quote: "I couldn't be happier with the results. These people are true experts in their field.", who: "Emma Jones", role: "CEO, T-EDI" },
  { quote: "From the start, they were trusted partners. Creative, flexible and passionate, they deliver amazing results.", who: "Maria Catanzariti", role: "Head of Comms, Square Peg" },
  { quote: "The whole process was frictionless. Wonderful people, extremely good at what they do.", who: "Felix Thomsen", role: "CEO, Iceberg Quantum" },
  { quote: "A rare combination of brilliant project management, crystal-clear communication, and genuine creative partnership.", who: "Joel Connolly", role: "Head of Blackbird Foundation" },
  { quote: "There is no one who comes close to matching their level of professionalism, skill, quality, and value.", who: "John Suntup", role: "Founder, ACE Ventures" },
];

function Index() {
  useReveal();
  // double the testimonial track for seamless marquee
  const tMarquee = [...testimonials, ...testimonials];
  const cMarquee = [...clients, ...clients, ...clients];

  return (
    <div className="min-h-screen bg-[#070a18] text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <nav className="max-w-[1320px] mx-auto h-14 rounded-full bg-black/55 backdrop-blur-md border border-white/10 pl-2 pr-2 flex items-center justify-between">
          <div className="flex items-center gap-2 pl-2">
            <span className="inline-flex h-7 w-7 rounded-full bg-white/10 items-center justify-center text-[12px]">✦</span>
            <span className="hidden sm:inline text-[12px] text-white/70">Loved by founders from Syd to SF</span>
          </div>
          <a href="#" className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium tracking-tight">
            DreamLab
          </a>
          <div className="flex items-center gap-1">
            <ul className="hidden md:flex items-center gap-1 text-[13px] text-white/75 mr-2">
              {navItems.map((n) => (
                <li key={n}>
                  <a href="#" className="px-3 py-2 rounded-full hover:bg-white/10 hover:text-white transition-colors">
                    {n}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="text-[13px] px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              Book a call
            </a>
          </div>
        </nav>
      </header>

      {/* HERO — full-bleed sunrise gradient */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* sunrise gradient */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#070a18_0%,#0b1430_18%,#1a3a6a_42%,#5e6f8a_62%,#c89a7a_82%,#f3c39a_94%,#f7d3b0_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(255,200,150,0.55),transparent_70%)]" />
          {/* film grain */}
          <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22220%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
        </div>

        <div className="max-w-[1100px] mx-auto pt-28 pb-24">
          <h1 className="reveal text-[44px] sm:text-[72px] md:text-[104px] lg:text-[128px] leading-[0.95] tracking-[-0.045em] font-semibold">
            Make your technology
            <br />
            feel inevitable
          </h1>
          <p className="reveal mt-8 text-[15px] md:text-[17px] text-white/80 max-w-[640px] mx-auto leading-relaxed" data-delay="2">
            We translate breakthrough tech into clear, undeniable market signals. Trusted by 275+ frontier founders and Tier 1 VCs.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70">
          <span>Swipe to explore</span>
          <span className="text-base">↓</span>
        </div>
      </section>

      {/* TRUSTED-BY MARQUEE */}
      <section className="relative py-16 border-t border-white/10 bg-[#070a18]">
        <p className="text-center text-[11px] uppercase tracking-[0.3em] text-white/40 mb-10">Trusted by</p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex gap-14 whitespace-nowrap animate-marquee-x will-change-transform">
            {cMarquee.map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="text-[22px] md:text-[26px] font-medium text-white/55 hover:text-white transition-colors tracking-tight shrink-0"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="px-6 md:px-12 max-w-[1320px] mx-auto py-28 md:py-40 border-t border-white/10">
        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <h2 className="col-span-12 md:col-span-5 reveal text-[36px] md:text-[56px] leading-[1.02] tracking-[-0.03em] font-semibold">
            Don't dilute<br />the breakthrough
          </h2>
          <div className="col-span-12 md:col-span-7 md:pl-8 reveal" data-delay="2">
            <p className="text-[16px] md:text-[19px] text-white/75 leading-[1.55] max-w-[640px]">
              The gap between your core technology and how the market perceives it is costing you capital and customers. We don't dumb down the complexity just to make it fit a template. We use precision design to make your exact technical advantage obvious to the outside world.
            </p>
            <p className="mt-6 text-[16px] md:text-[19px] text-white/60 leading-[1.55] max-w-[640px]">
              Through high-conviction brand identities, pitch decks, and websites, we help technical founders define their category and signal their ambition to the people who matter most.
            </p>
          </div>
        </div>

        {/* big stats */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 border-t border-white/10 pt-16">
          <div className="reveal">
            <div className="text-[120px] md:text-[200px] font-semibold leading-[0.9] tracking-[-0.06em] bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              275<span className="text-white/70">+</span>
            </div>
            <div className="mt-4 text-[13px] uppercase tracking-[0.25em] text-white/50">Technical founders</div>
          </div>
          <div className="reveal" data-delay="2">
            <div className="text-[120px] md:text-[200px] font-semibold leading-[0.9] tracking-[-0.06em] bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              $250<span className="text-white/70">M</span>
            </div>
            <div className="mt-4 text-[13px] uppercase tracking-[0.25em] text-white/50">Capital secured by our teams</div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="px-6 md:px-12 max-w-[1320px] mx-auto py-24 md:py-32 border-t border-white/10">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-[32px] md:text-[44px] tracking-[-0.02em] font-semibold">Featured projects</h2>
          <a href="#" className="text-[13px] text-white/70 hover:text-white border-b border-white/20 pb-0.5">All Work →</a>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {projects.map((p, i) => {
            const span = i === 0 || i === 3 ? "md:col-span-7" : "md:col-span-5";
            return (
              <article
                key={i}
                className={`col-span-12 ${span} group cursor-pointer reveal`}
                data-delay={String((i % 3) + 1)}
              >
                <div className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br ${p.grad} border border-white/10`}>
                  <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-end p-6 md:p-8 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/15">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-[18px] md:text-[22px] leading-snug tracking-[-0.01em] text-white/90 group-hover:text-white max-w-[560px]">
                  {p.title}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 md:px-12 max-w-[1320px] mx-auto py-28 md:py-40 border-t border-white/10">
        <h2 className="reveal text-[36px] md:text-[64px] leading-[1] tracking-[-0.03em] font-semibold max-w-[900px]">
          Engineering the signal for frontier tech
        </h2>

        <ul className="mt-16 border-t border-white/15">
          {services.map((s, i) => (
            <li key={s.name} className="reveal" data-delay={String(i + 1)}>
              <div className="grid grid-cols-12 gap-6 items-start py-10 border-b border-white/15 group hover:bg-white/[0.02] transition-colors -mx-4 px-4">
                <span className="col-span-2 text-[11px] text-white/35 tracking-[0.25em]">0{i + 1}</span>
                <h3 className="col-span-10 md:col-span-3 text-[28px] md:text-[40px] font-medium tracking-[-0.02em] leading-none group-hover:translate-x-1 transition-transform">
                  {s.name}
                </h3>
                <p className="col-span-12 md:col-span-5 text-[14px] md:text-[15px] text-white/65 leading-relaxed">
                  {s.desc}
                </p>
                <div className="col-span-12 md:col-span-2 flex flex-wrap gap-2 md:justify-end">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-[0.2em] text-white/55 border border-white/15 rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* TESTIMONIALS MARQUEE */}
      <section className="py-28 md:py-36 border-t border-white/10 overflow-hidden">
        <h2 className="px-6 md:px-12 max-w-[1320px] mx-auto text-[32px] md:text-[56px] tracking-[-0.03em] font-semibold leading-[1.02] mb-16">
          Hear from the founders<br />shaping what's next
        </h2>

        <div className="relative [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex gap-6 animate-marquee-slow will-change-transform">
            {tMarquee.map((t, i) => (
              <figure
                key={i}
                className="shrink-0 w-[360px] md:w-[440px] p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
              >
                <blockquote className="text-[15px] md:text-[16px] leading-[1.55] text-white/85">
                  <span className="text-white/40 mr-1">“</span>
                  {t.quote}
                  <span className="text-white/40 ml-1">”</span>
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-white/10 text-[12px] uppercase tracking-[0.18em] text-white/55">
                  <span className="text-white/85">{t.who}</span> — {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="relative px-6 md:px-12 py-32 md:py-48 border-t border-white/10 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#070a18_0%,#1a3a6a_55%,#e8a87c_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(255,200,150,0.45),transparent_70%)]" />
        </div>
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="reveal text-[44px] md:text-[88px] lg:text-[112px] leading-[0.95] tracking-[-0.04em] font-semibold">
            Let's make it<br />inevitable.
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a href="#" className="text-[14px] px-7 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition">
              Book a call →
            </a>
            <a href="#" className="text-[14px] px-7 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition">
              hello@dreamlab.studio
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070a18] px-6 md:px-12 pt-20 pb-10 border-t border-white/10">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <div className="text-3xl font-semibold tracking-tight">DreamLab</div>
              <p className="mt-5 text-[14px] text-white/60 leading-relaxed max-w-sm">
                Engineering the signal for frontier tech. Brand, narrative, decks, and websites for founders building what's next.
              </p>
            </div>
            <div className="col-span-6 md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-5">Site</div>
              <ul className="space-y-3 text-[14px] text-white/75">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Work</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Thinking</a></li>
              </ul>
            </div>
            <div className="col-span-6 md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-5">Contact</div>
              <ul className="space-y-3 text-[14px] text-white/75">
                <li><a href="#" className="hover:text-white">Book a call</a></li>
                <li><a href="#" className="hover:text-white">hello@dreamlab.studio</a></li>
              </ul>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-5">Studios</div>
              <div className="text-[14px] text-white/75">Sydney — San Francisco</div>
              <div className="mt-4 flex gap-4 text-[12px] uppercase tracking-[0.2em] text-white/50">
                <a href="#" className="hover:text-white">LinkedIn</a>
                <a href="#" className="hover:text-white">Instagram</a>
                <a href="#" className="hover:text-white">X</a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-white/35">
            <span>© DreamLab 2025</span>
            <span>Made with intent</span>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
