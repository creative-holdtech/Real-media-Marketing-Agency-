import { Link } from "@tanstack/react-router";

import logoUrl from "@/assets/logo.svg";
import { btnPrimarySm, siteGutter, textMeta } from "@/components/framer-section";
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
        "sticky top-0 z-50 pt-5",
        siteGutter,
        overlay
          ? "bg-transparent"
          : light
            ? "bg-[#fbfbfa]/90 backdrop-blur-md"
            : "bg-rm-page/80 backdrop-blur-md",
      )}
    >
      <nav
        className={cn(
          "mx-auto grid h-14 w-full max-w-[var(--rm-grid-max)] grid-cols-[1fr_auto_1fr] items-center px-5",
          light
            ? "rounded-lg border border-[#eaeaea] bg-white/90"
            : "rounded-full border border-white/[0.08] bg-rm-surface/40",
        )}
      >
        <Link to="/" aria-label="Real Media — home" className="justify-self-start">
          <img
            src={logoUrl}
            alt="Real Media"
            width={90}
            height={65}
            className={cn("h-8 w-auto", light && "[filter:invert(1)]")}
          />
        </Link>

        <ul className="hidden items-center justify-center gap-5 text-[13px] md:flex">
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

        <div className="col-start-3 flex items-center justify-end gap-1">
          <Link
            to="/audit"
            onClick={(e) => { e.preventDefault(); triggerPageTransition("/audit"); }}
            className={cn(btnPrimarySm, "hidden md:inline-flex")}
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
        "mx-auto max-w-[var(--rm-grid-max)] pb-10 pt-12",
        siteGutter,
        light && "border-t border-[#eaeaea] text-[#111111]",
      )}
    >
      <div className="grid grid-cols-12 gap-6 md:gap-8">
        <div className="col-span-12 md:col-span-5">
          <img
            src={logoUrl}
            alt="Real Media"
            width={90}
            height={65}
            className={cn("h-12 w-auto", light && "[filter:invert(1)]")}
          />
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
              href="https://www.linkedin.com/company/real-media-corp/"
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
              href="https://dribbble.com/realmedia26"
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
              href="https://www.instagram.com/realmedia.corp"
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
            className={cn("mb-5", textMeta, light ? "text-[#787774]" : "text-white/30")}
          >
            Work
          </div>
          <ul className={cn("space-y-3 rm-type-body", light ? "text-[#787774]" : "text-white/70")}>
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
            className={cn("mb-5", textMeta, light ? "text-[#787774]" : "text-white/30")}
          >
            Agency
          </div>
          <ul className={cn("space-y-3 rm-type-body", light ? "text-[#787774]" : "text-white/70")}>
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
                  "font-medium transition-colors duration-150",
                  light ? "text-[#787774] hover:text-[#111111]" : "text-white/55 hover:text-white",
                )}
              >
                Free Audit
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3">
          <div
            className={cn("mb-5", textMeta, light ? "text-[#787774]" : "text-white/30")}
          >
            Located
          </div>
          <div className={cn("rm-type-body", light ? "text-[#787774]" : "text-white/70")}>
            Warsaw — EU — MENA
          </div>
          <div
            className={cn(
              "mt-5 rm-type-body",
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
          "mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5",
          textMeta,
          light ? "text-[#787774]" : "text-white/30",
        )}
      >
        <span>© R-M 2026</span>
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
