import { Link } from "@tanstack/react-router";
import { Dribbble, Instagram, Linkedin } from "lucide-react";

import logoUrl from "@/assets/logo.svg";
import {
  BtnArrow,
  btnPrimarySm,
  chromeLightBorder,
  chromeLightInk,
  chromeLightMuted,
  chromeLightSurface,
  siteGutter,
  sectionInner,
  siteChromeBand,
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
    light
      ? "text-[var(--rm-light-muted)] hover:text-[var(--rm-light-ink)]"
      : "text-[var(--rm-text-muted)] hover:text-white",
  );
}

export function SiteHeader({
  variant = "dark",
  overlay = false,
  solid = false,
}: {
  variant?: "light" | "dark";
  overlay?: boolean;
  /** When true, header uses an opaque surface (e.g. after scroll on overlay heroes). */
  solid?: boolean;
}) {
  const light = variant === "light";
  const siteNav = useSiteNav();
  const transparent = overlay && !solid;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 pt-5 transition-[background-color,backdrop-filter] duration-200",
        siteGutter,
        transparent
          ? "bg-transparent"
          : light
            ? "bg-[var(--rm-light-surface)]/90 backdrop-blur-md"
            : "bg-rm-page/92 backdrop-blur-md",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-14 w-full max-w-[var(--rm-grid-max)] items-center pl-4 pr-3 transition-[background-color,backdrop-filter] duration-200 md:py-1 md:pl-5 md:pr-1",
          light
            ? cn(
                "rounded-lg border bg-white/85 backdrop-blur-sm backdrop-saturate-150",
                chromeLightBorder,
              )
            : "rounded-full border border-white/[0.08] bg-rm-surface/35 backdrop-blur-sm backdrop-saturate-150",
        )}
      >
        <div className="flex shrink-0 items-center">
          <Link to="/" aria-label="Real Media — home" className="shrink-0">
            <img
              src={logoUrl}
              alt="Real Media"
              width={90}
              height={65}
              className={cn("block h-8 w-auto", light && "[filter:invert(1)]")}
            />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center px-4 md:px-6">
          <ul
            className={cn(
              "hidden min-w-0 items-center justify-center gap-5 lg:gap-6 md:flex",
              textNav,
            )}
          >
            {siteNav.map((n) => (
              <li key={n.label} className="shrink-0">
                {n.to ? (
                  <Link
                    to={n.to}
                    onClick={(e) => {
                      e.preventDefault();
                      triggerPageTransition(n.to!);
                    }}
                    className={cn(
                      "relative inline-flex items-center whitespace-nowrap px-0.5 py-1",
                      light
                        ? cn(chromeLightMuted, "hover:text-[var(--rm-light-ink)]")
                        : "text-[var(--rm-text-muted)] hover:text-white",
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
                        "nav-dot pointer-events-none absolute -bottom-0.5 left-1/2 block h-[3px] w-[3px] -translate-x-1/2 scale-0 rounded-full opacity-0 transition-[opacity,transform] duration-200",
                        light ? "bg-[var(--rm-light-accent)]" : "bg-rm-accent",
                      )}
                    />
                  </Link>
                ) : (
                  <a href={n.href} className={cn(chromeLink(light), "whitespace-nowrap px-0.5 py-1")}>
                    {n.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3 md:gap-0">
          <Link
            to="/audit"
            onClick={(e) => {
              e.preventDefault();
              triggerPageTransition("/audit");
            }}
            className={cn(btnPrimarySm, "group hidden shrink-0 gap-2 md:inline-flex")}
          >
            Get Audit
            <BtnArrow />
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
        siteChromeBand,
        "bg-[#0a0a0b] pb-12 pt-12",
        light && cn("border-t", chromeLightBorder, chromeLightInk),
      )}
    >
      <div className={sectionInner}>
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
              aria-label="LinkedIn"
              className={cn(chromeLink(light), "inline-flex")}
            >
              <Linkedin className="size-[18px]" strokeWidth={1.5} aria-hidden />
            </a>
            <a
              href="https://dribbble.com/realmedia26"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble"
              className={cn(chromeLink(light), "inline-flex")}
            >
              <Dribbble className="size-[18px]" strokeWidth={1.5} aria-hidden />
            </a>
            <a
              href="https://www.instagram.com/realmedia.corp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={cn(chromeLink(light), "inline-flex")}
            >
              <Instagram className="size-[18px]" strokeWidth={1.5} aria-hidden />
            </a>
          </div>
        </div>

        <div className="col-span-6 md:col-span-2">
          <div className={cn("mb-5", textMeta, light ? chromeLightMuted : textGhost)}>Work</div>
          <ul
            className={cn(
              "space-y-3 rm-type-body",
              light ? chromeLightMuted : "text-[var(--rm-text-body)]",
            )}
          >
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
          <div className={cn("mb-5", textMeta, light ? chromeLightMuted : textGhost)}>Agency</div>
          <ul
            className={cn(
              "space-y-3 rm-type-body",
              light ? chromeLightMuted : "text-[var(--rm-text-body)]",
            )}
          >
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
          <div className={cn("mb-5", textMeta, light ? chromeLightMuted : textGhost)}>Located</div>
          <div
            className={cn("rm-type-body", light ? chromeLightMuted : "text-[var(--rm-text-body)]")}
          >
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
        )}
      >
        <span className={cn(textMeta, light ? chromeLightMuted : textGhost)}>© R-M 2026</span>
        <a href="/privacy" className={cn("rm-type-body", chromeLink(light))}>
          Privacy Policy
        </a>
      </div>
      </div>
    </footer>
  );
}
