import { Link } from "@tanstack/react-router";

import { MobileMenu } from "@/components/mobile-menu";

export const siteNav: { label: string; href?: string; to?: string }[] = [
  { label: "Services", to: "/services" },
  { label: "Cases", to: "/cases" },
  { label: "About", to: "/about" },
  { label: "Journal", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const tone =
    variant === "dark"
      ? {
          shell: "border-white/10 bg-[#0c0a09]/40 text-white/80",
          link: "text-white/70 hover:text-white",
          cta: "bg-white text-black hover:bg-[#e85d3a] hover:text-white",
          wordmark: "text-white",
        }
      : {
          shell: "border-white/10 bg-[#0c0a09]/40 text-white/80",
          link: "text-white/70 hover:text-white",
          cta: "bg-white text-black hover:bg-[#e85d3a] hover:text-white",
          wordmark: "text-white",
        };

  return (
    <header className="relative z-40 px-4 pt-5">
      <nav
        className={`max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border ${tone.shell} backdrop-blur-xl pl-5 pr-2 relative`}
      >
        <Link
          to="/"
          className={`hidden md:block absolute left-1/2 -translate-x-1/2 font-semibold tracking-tight text-[15px] ${tone.wordmark}`}
        >
          R—M<span className="text-[#e85d3a]">.</span>
        </Link>
        <Link
          to="/"
          className={`md:hidden font-semibold tracking-tight text-[15px] ${tone.wordmark}`}
        >
          R—M<span className="text-[#e85d3a]">.</span>
        </Link>
        <div className="flex items-center gap-1 ml-auto">
          <ul className={`hidden md:flex items-center gap-6 text-[13px] mr-4`}>
            {siteNav.map((n) => (
              <li key={n.label}>
                {n.to ? (
                  <Link
                    to={n.to}
                    className={`${tone.link} transition-colors`}
                    activeProps={{ className: `${tone.link} text-white` }}
                  >
                    {n.label}
                  </Link>
                ) : (
                  <a href={n.href} className={`${tone.link} transition-colors`}>
                    {n.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <Link
            to="/audit"
            className={`hidden md:inline-block text-[13px] px-4 py-2 rounded-full font-medium transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] ${tone.cta}`}
          >
            Get Audit
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 pb-10 border-t border-white/10">
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        <div className="col-span-12 md:col-span-5">
          <div className="text-3xl font-semibold tracking-tight">
            R—M<span className="text-[#e85d3a]">.</span>
          </div>
          <p className="mt-5 text-[14px] text-white/55 leading-relaxed max-w-xs">
            Strategic growth partner for ambitious brands operating in
            competitive industries.
          </p>
          <div className="mt-8 flex gap-5 text-[12px] uppercase tracking-[0.18em] text-white/40">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Behance</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">Work</div>
          <ul className="space-y-3 text-[14px] text-white/70">
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/cases" className="hover:text-white transition-colors">Case Studies</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Journal</Link></li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">Studio</div>
          <ul className="space-y-3 text-[14px] text-white/70">
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/audit" className="hover:text-white transition-colors">Free Audit</Link></li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">Located</div>
          <div className="text-[14px] text-white/70">Kyiv — EU — MENA</div>
          <div className="mt-5 text-[12px] text-white/40 leading-relaxed">
            Operating across CET / GST timezones for partners in finance,
            iGaming, performance, and lifestyle.
          </div>
        </div>
      </div>

      <div className="mt-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-white/30">
        <span>© R-M 2025</span>
        <span className="opacity-60">Privacy Policy</span>
        <span>Vol. 01 — Made with intent</span>
      </div>
    </footer>
  );
}
