import { Link } from "@tanstack/react-router";

import logoUrl from "@/assets/logo.svg";
import {
  btnPrimarySm,
  chromeLightBorder,
  chromeLightInk,
  chromeLightMuted,
  chromeLightSurface,
  siteGutter,
  textFaint,
  textGhost,
  textMeta,
  textNav,
  textSubtle,
} from "@/components/framer-section";
import { MobileMenu } from "@/components/mobile-menu";
import { useSiteNav } from "@/components/nav-context";
import { triggerPageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";

function chromeLink(light: boolean) {
  return cn(
    "transition-colors duration-150",
    light ? "text-[var(--rm-light-muted)] hover:text-[var(--rm-light-ink)]" : "text-[var(--rm-text-muted)] hover:text-white",
  );
}

export function SiteHeader({
  variant = "dark",
  overlay = false,
}: {
  variant?: "light" | "dark";
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
            ? "bg-[var(--rm-light-surface)]/90 backdrop-blur-md"
            : "bg-rm-page/80 backdrop-blur-md",
      )}
    >
      <nav
        className={cn(
          "mx-auto grid h-14 w-full max-w-[var(--rm-grid-max)] grid-cols-[1fr_auto_1fr] items-center px-5",
          light
            ? cn("rounded-lg border bg-white/90", chromeLightBorder)
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

        <ul className={cn("hidden items-center justify-center gap-5 md:flex", textNav)}>
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
                    "relative inline-flex flex-col items-center gap-1.5",
                    light ? cn(chromeLightMuted, "hover:text-[var(--rm-light-ink)]") : "text-[var(--rm-text-muted)] hover:text-white",
                  )}
                  activeProps={{
                    className: light
                      ? "nav-active !text-[var(--rm-light-ink)]"
                      : "nav-active !text-white",
                  }}
                >
                  {n.label}
                  <span
                    aria-hidden
                    className={cn(
                      "nav-dot block h-[3px] w-[3px] scale-0 rounded-full opacity-0 transition-[opacity,transform] duration-200",
                      light ? "bg-[var(--rm-light-accent)]" : "bg-rm-accent",
                    )}
                  />
                </Link>
              ) : (
                <a href={n.href} className={chromeLink(light)}>
                  {n.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="col-start-3 flex items-center justify-end gap-1">
          <Link
            to="/audit"
            onClick={(e) => {
              e.preventDefault();
              triggerPageTransition("/audit");
            }}
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
        light && cn("border-t", chromeLightBorder, chromeLightInk),
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
          <p className={cn("rm-type-body mt-5 max-w-xs", light ? chromeLightMuted : textSubtle)}>
            Strategic marketing engine for competitive B2B markets.
          </p>
          <div className={cn("mt-8 flex gap-5", textMeta, light ? chromeLightMuted : textFaint)}>
            <a
              href="https://www.linkedin.com/company/real-media-corp/"
              target="_blank"
              rel="noopener noreferrer"
              className={chromeLink(light)}
            >
              LinkedIn
            </a>
            <a
              href="https://dribbble.com/realmedia26"
              target="_blank"
              rel="noopener noreferrer"
              className={chromeLink(light)}
            >
              Dribbble
            </a>
            <a
              href="https://www.instagram.com/realmedia.corp"
              target="_blank"
              rel="noopener noreferrer"
              className={chromeLink(light)}
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className={cn("mb-5", textMeta, light ? chromeLightMuted : textGhost)}>
            Work
          </div>
          <ul className={cn("space-y-3 rm-type-body", light ? chromeLightMuted : "text-[var(--rm-text-body)]")}>
            {(
              [
                ["/services", "Services"],
                ["/cases", "Case Studies"],
                ["/products", "Products"],
                ["/blog", "Blog"],
              ] as const
            ).map(([to, label]) => (
              <li key={to}>
                <Link to={to} className={chromeLink(light)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className={cn("mb-5", textMeta, light ? chromeLightMuted : textGhost)}>
            Agency
          </div>
          <ul className={cn("space-y-3 rm-type-body", light ? chromeLightMuted : "text-[var(--rm-text-body)]")}>
            {(
              [
                ["/about", "About"],
                ["/contact", "Contact"],
                ["/audit", "Free Audit"],
              ] as const
            ).map(([to, label]) => (
              <li key={to}>
                <Link to={to} className={chromeLink(light)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3">
          <div className={cn("mb-5", textMeta, light ? chromeLightMuted : textGhost)}>
            Located
          </div>
          <div className={cn("rm-type-body", light ? chromeLightMuted : "text-[var(--rm-text-body)]")}>
            Warsaw — EU — MENA
          </div>
          <div className={cn("rm-type-body mt-5", light ? chromeLightMuted : textFaint)}>
            Operating across CET / GST timezones for partners in Fintech · AI SaaS · Cybersecurity ·
            iGaming
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rm-border-soft)] pt-5",
          textMeta,
          light ? chromeLightMuted : textGhost,
        )}
      >
        <span>© R-M 2026</span>
        <span className="opacity-60">Privacy Policy</span>
      </div>
    </footer>
  );
}
