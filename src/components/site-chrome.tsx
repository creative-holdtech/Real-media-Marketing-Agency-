import { Link } from "@tanstack/react-router";

import { MobileMenu } from "@/components/mobile-menu";
import { useSiteNav } from "@/components/nav-context";
import { triggerPageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";

export function SiteHeader({
  variant = "dark",
  overlay = false,
}: {
  variant?: "light" | "dark";
  /** Homepage hero — no bar behind the floating nav pill */
  overlay?: boolean;
}) {
  const light = variant === "light";
  const siteNav = useSiteNav();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 px-4 pt-5",
        overlay
          ? "bg-transparent"
          : light
            ? "bg-[#fbfbfa]/90 backdrop-blur-md"
            : "bg-rm-page/80 backdrop-blur-md",
      )}
    >
      <nav
        className={cn(
          "max-w-[1320px] mx-auto h-14 flex items-center pl-5 pr-2 relative backdrop-blur-xl",
          light
            ? "rounded-lg border border-[#eaeaea] bg-white/90"
            : "rounded-full border border-white/[0.08] bg-rm-surface/40",
        )}
      >
        {/* Logo — anchored left */}
        <Link
          to="/"
          className={cn(
            "shrink-0 font-semibold tracking-tight text-[15px]",
            light ? "text-[#111111]" : "text-white",
          )}
        >
          R—M<span className={light ? "text-[#9f2f2d]" : "text-rm-accent"}>.</span>
        </Link>

        {/* Nav links — centered */}
        <ul className="hidden md:flex items-center gap-5 text-[13px] absolute left-1/2 -translate-x-1/2">
          {siteNav.map((n) => (
            <li key={n.label}>
              {n.to ? (
                <Link
                  to={n.to}
                  onClick={(e) => {
                    e.preventDefault();
                    triggerPageTransition(n.to!);
                  }}
                  className={cn(
                    "relative inline-flex flex-col items-center gap-1.5 transition-colors duration-150",
                    light
                      ? "text-[#787774] hover:text-[#111111]"
                      : "text-white/60 hover:text-white",
                  )}
                  activeProps={{
                    className: light ? "nav-active !text-[#111111]" : "nav-active !text-white",
                  }}
                >
                  {n.label}
                  <span
                    aria-hidden
                    className={cn(
                      "nav-dot block w-[3px] h-[3px] rounded-full opacity-0 scale-0 transition-[opacity,transform] duration-200",
                      light ? "bg-[#9f2f2d]" : "bg-rm-accent",
                    )}
                  />
                </Link>
              ) : (
                <a
                  href={n.href}
                  className={cn(
                    "transition-colors duration-150",
                    light ? "text-[#787774] hover:text-[#111111]" : "text-white/60 hover:text-white",
                  )}
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
            onClick={(e) => { e.preventDefault(); triggerPageTransition("/audit"); }}
            className="hidden md:inline-flex rm-touch items-center text-[13px] px-4 py-2 rounded-full font-medium bg-white text-black hover:bg-[#efeeea] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97]"
          >
            Get Audit
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const light = variant === "light";

  return (
    <footer
      className={cn(
        "mx-auto max-w-[1440px] px-6 pb-10 pt-16 md:px-12",
        light && "border-t border-[#eaeaea] text-[#111111]",
      )}
    >
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        <div className="col-span-12 md:col-span-5">
          <div className="text-3xl font-semibold tracking-tight">
            R—M<span className={light ? "text-[#9f2f2d]" : "text-rm-accent"}>.</span>
          </div>
          <p
            className={cn(
              "mt-5 max-w-xs text-[14px] leading-relaxed",
              light ? "text-[#787774]" : "text-white/55",
            )}
          >
            Strategic marketing engine for competitive B2B markets.
          </p>
          <div
            className={cn(
              "mt-8 flex gap-5 text-[12px] uppercase tracking-[0.18em]",
              light ? "text-[#787774]" : "text-white/40",
            )}
          >
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors duration-150",
                light ? "hover:text-[#111111]" : "hover:text-white",
              )}
            >
              LinkedIn
            </a>
            <a
              href="https://dribbble.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors duration-150",
                light ? "hover:text-[#111111]" : "hover:text-white",
              )}
            >
              Dribbble
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "transition-colors duration-150",
                light ? "hover:text-[#111111]" : "hover:text-white",
              )}
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div
            className={cn(
              "mb-5 text-[11px] uppercase tracking-[0.2em]",
              light ? "text-[#787774]" : "text-white/30",
            )}
          >
            Work
          </div>
          <ul className={cn("space-y-3 text-[14px]", light ? "text-[#787774]" : "text-white/70")}>
            <li>
              <Link
                to="/services"
                className={cn(
                  "transition-colors duration-150",
                  light ? "hover:text-[#111111]" : "hover:text-white",
                )}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/cases"
                className={cn(
                  "transition-colors duration-150",
                  light ? "hover:text-[#111111]" : "hover:text-white",
                )}
              >
                Case Studies
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={cn(
                  "transition-colors duration-150",
                  light ? "hover:text-[#111111]" : "hover:text-white",
                )}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={cn(
                  "transition-colors duration-150",
                  light ? "hover:text-[#111111]" : "hover:text-white",
                )}
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div
            className={cn(
              "mb-5 text-[11px] uppercase tracking-[0.2em]",
              light ? "text-[#787774]" : "text-white/30",
            )}
          >
            Agency
          </div>
          <ul className={cn("space-y-3 text-[14px]", light ? "text-[#787774]" : "text-white/70")}>
            <li>
              <Link
                to="/about"
                className={cn(
                  "transition-colors duration-150",
                  light ? "hover:text-[#111111]" : "hover:text-white",
                )}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={cn(
                  "transition-colors duration-150",
                  light ? "hover:text-[#111111]" : "hover:text-white",
                )}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/audit"
                className={cn(
                  "transition-colors duration-150",
                  light ? "hover:text-[#111111]" : "hover:text-white",
                )}
              >
                Free Audit
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3">
          <div
            className={cn(
              "mb-5 text-[11px] uppercase tracking-[0.2em]",
              light ? "text-[#787774]" : "text-white/30",
            )}
          >
            Located
          </div>
          <div className={cn("text-[14px]", light ? "text-[#787774]" : "text-white/70")}>
            Warsaw — EU — MENA
          </div>
          <div
            className={cn(
              "mt-5 text-[12px] leading-relaxed",
              light ? "text-[#787774]" : "text-white/40",
            )}
          >
            Operating across CET / GST timezones for partners in Fintech · AI SaaS · Cybersecurity ·
            iGaming
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mt-20 flex flex-wrap items-center justify-between gap-4 pt-6 text-[11px] uppercase tracking-[0.18em]",
          light ? "text-[#787774]" : "text-white/30",
        )}
      >
        <span>© R-M 2025</span>
        <Link
          to="/contact"
          className="opacity-60 hover:opacity-100 transition-opacity duration-150"
        >
          Privacy Policy
        </Link>
        <span>Vol. 01 — Made with intent</span>
      </div>
    </footer>
  );
}
