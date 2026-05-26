import { Link } from "@tanstack/react-router";

import { MobileMenu } from "@/components/mobile-menu";

const siteNav: { label: string; href?: string; to?: string }[] = [
  { label: "Services", to: "/services" },
  { label: "Cases", to: "/cases" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader({
  variant = "dark",
  overlay = false,
}: {
  variant?: "light" | "dark";
  /** Homepage hero — no bar behind the floating nav pill */
  overlay?: boolean;
}) {
  return (
    <header
      className={[
        "sticky top-0 z-50 px-4 pt-5",
        overlay ? "bg-transparent" : "bg-rm-page/80 backdrop-blur-md",
      ].join(" ")}
    >
      <nav className="max-w-[1320px] mx-auto h-14 flex items-center rounded-full border border-white/[0.08] bg-rm-surface/40 backdrop-blur-xl pl-5 pr-2 relative">

        {/* Logo — anchored left */}
        <Link
          to="/"
          className="shrink-0 font-semibold tracking-tight text-[15px] text-white"
        >
          R—M<span className="text-rm-accent">.</span>
        </Link>

        {/* Nav links — centered */}
        <ul className="hidden md:flex items-center gap-5 text-[13px] absolute left-1/2 -translate-x-1/2">
          {siteNav.map((n) => (
            <li key={n.label}>
              {n.to ? (
                <Link
                  to={n.to}
                  className="relative inline-flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-150"
                  activeProps={{ className: "nav-active !text-white" }}
                >
                  {n.label}
                  {/* Active dot — shown via CSS .nav-active */}
                  <span
                    aria-hidden
                    className="nav-dot block w-[3px] h-[3px] rounded-full bg-rm-accent opacity-0 scale-0 transition-[opacity,transform] duration-200"
                  />
                </Link>
              ) : (
                <a
                  href={n.href}
                  className="text-white/60 hover:text-white transition-colors duration-150"
                >
                  {n.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* CTA + hamburger — right */}
        <div className="flex items-center gap-1 ml-auto">
          <Link
            to="/audit"
            className="hidden md:inline-flex rm-touch items-center text-[13px] px-4 py-2 rounded-full font-medium bg-white text-black hover:bg-rm-accent hover:text-white transition-[transform,background-color] duration-150 ease-out active:scale-[0.97]"
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
    <footer className="px-6 md:px-12 max-w-[1440px] mx-auto pt-16 pb-10">
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        <div className="col-span-12 md:col-span-5">
          <div className="text-3xl font-semibold tracking-tight">
            R—M<span className="text-rm-accent">.</span>
          </div>
          <p className="mt-5 text-[14px] text-white/55 leading-relaxed max-w-xs">
            Strategic marketing engine for competitive B2B markets.
          </p>
          <div className="mt-8 flex gap-5 text-[12px] uppercase tracking-[0.18em] text-white/40">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-150"
            >
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-150"
            >
              Behance
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-150"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">Work</div>
          <ul className="space-y-3 text-[14px] text-white/70">
            <li>
              <Link to="/services" className="hover:text-white transition-colors duration-150">
                Services
              </Link>
            </li>
            <li>
              <Link to="/cases" className="hover:text-white transition-colors duration-150">
                Case Studies
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition-colors duration-150">
                Products
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition-colors duration-150">
                Journal
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">Studio</div>
          <ul className="space-y-3 text-[14px] text-white/70">
            <li>
              <Link to="/about" className="hover:text-white transition-colors duration-150">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors duration-150">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/audit" className="hover:text-white transition-colors duration-150">
                Free Audit
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-5">Located</div>
          <div className="text-[14px] text-white/70">Warsaw — EU — MENA</div>
          <div className="mt-5 text-[12px] text-white/40 leading-relaxed">
            Operating across CET / GST timezones for partners in Fintech · AI SaaS · Cybersecurity ·
            iGaming
          </div>
        </div>
      </div>

      <div className="mt-20 pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-white/30">
        <span>© R-M 2025</span>
        <Link to="/contact" className="opacity-60 hover:opacity-100 transition-opacity duration-150">Privacy Policy</Link>
        <span>Vol. 01 — Made with intent</span>
      </div>
    </footer>
  );
}
