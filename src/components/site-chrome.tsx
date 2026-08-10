import { Link } from "@tanstack/react-router";
import { Dribbble, Instagram, Linkedin } from "lucide-react";
import { useLenis } from "lenis/react";

import logoUrl from "@/assets/logo.svg";
import { Reveal } from "@/components/motion-bits";
import {
  BtnArrow,
  btnOutline,
  btnPrimary,
  btnPrimarySm,
  chromeLightBorder,
  chromeLightInk,
  chromeLightMuted,
  chromeLightSurface,
  sectionHeroActionsRow,
  siteGutter,
  sectionInner,
  siteChromeBand,
  textDisplay,
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
            Get audit
            <BtnArrow />
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

type FooterCtaProps = {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  primaryLabel?: string;
  primaryTo?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  secondaryHref?: string;
};

type FooterLink = { label: string; to?: string; href?: string };

/** One labelled list of plain-text links (Work / Agency below the CTA). */
function FooterLinkGroup({
  light,
  heading,
  links,
}: {
  light: boolean;
  heading: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <div className={cn("mb-5", textMeta, light ? chromeLightMuted : textGhost)}>{heading}</div>
      <ul
        className={cn(
          "space-y-3 rm-type-body",
          light ? chromeLightMuted : "text-[var(--rm-text-body)]",
        )}
      >
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to} className={chromeLink(light)}>
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={chromeLink(light)}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const FOOTER_WORK_LINKS: FooterLink[] = [
  { label: "Services", to: "/services" },
  { label: "Case studies", to: "/cases" },
  { label: "Products", to: "/products" },
  { label: "Blog", to: "/blog" },
];

const FOOTER_AGENCY_LINKS: FooterLink[] = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Free audit", to: "/audit" },
];

const FOOTER_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/real-media-corp/", Icon: Linkedin },
  { label: "Dribbble", href: "https://dribbble.com/realmedia26", Icon: Dribbble },
  { label: "Instagram", href: "https://www.instagram.com/realmedia.corp", Icon: Instagram },
];

function FooterCtaButtons({
  primaryLabel,
  primaryTo,
  primaryHref,
  secondaryLabel,
  secondaryTo,
  secondaryHref,
}: {
  primaryLabel: string;
  primaryTo: string;
  primaryHref?: string;
  secondaryLabel: string;
  secondaryTo: string;
  secondaryHref?: string;
}) {
  return (
    <div className={sectionHeroActionsRow}>
      {primaryHref ? (
        <a href={primaryHref} className={cn(btnPrimary, "group gap-2")}>
          {primaryLabel.replace(/\s*→$/, "")}
          <BtnArrow />
        </a>
      ) : (
        <Link to={primaryTo} className={cn(btnPrimary, "group gap-2")}>
          {primaryLabel.replace(/\s*→$/, "")}
          <BtnArrow />
        </Link>
      )}
      {secondaryHref ? (
        <a href={secondaryHref} className={cn(btnOutline, "group gap-2")}>
          {secondaryLabel.replace(/\s*→$/, "")}
          <BtnArrow />
        </a>
      ) : (
        <Link to={secondaryTo} className={cn(btnOutline, "group gap-2")}>
          {secondaryLabel.replace(/\s*→$/, "")}
          <BtnArrow />
        </Link>
      )}
    </div>
  );
}

/** Bold, fully-visible "REAL MEDIA" wordmark closing out the footer -- sized
    off the container's own width (cqw), not the viewport, so it always
    reaches edge to edge without spilling past the grid on wide screens. */
function FooterWordmark({ light }: { light: boolean }) {
  return (
    <div aria-hidden className="select-none" style={{ containerType: "inline-size" }}>
      <div
        className={cn(
          "flex w-full items-center justify-between font-semibold uppercase leading-none tracking-tight",
          light ? "text-black" : "text-white",
        )}
        style={{ fontSize: "clamp(3rem, 13cqw, 15rem)" }}
      >
        <span>REAL</span>
        <span>MEDIA</span>
      </div>
    </div>
  );
}

/** Lenis (root mode) drives real scroll via its own RAF loop, so a plain
    window.scrollTo() gets overwritten on the next tick -- has to go through
    Lenis when it's mounted, and fall back to native smooth scroll when it's
    not (reduced motion / touch, per SmoothScrollProvider). */
function useScrollToTop() {
  const lenis = useLenis();
  return () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
}

/** Footer -- also the site's closing CTA (formerly the separate
    UnifiedCTA / #cta section), interpreted from mdx.so's combined
    footer+CTA: eyebrow, headline, a short divider, standfirst, actions,
    then social/email, then the nav links, then the wordmark and a
    scroll-to-top bar. Every route that used to render <UnifiedCTA .../>
    followed by <SiteFooter /> now passes the same props straight to
    SiteFooter. */
export function SiteFooter({
  variant = "dark",
  eyebrow = "Get started",
  title = "Tell us what needs fixing",
  titleAccent = "New launch, a raise, or marketing that doesn’t perform.",
  primaryLabel = "Get free audit →",
  primaryTo = "/audit",
  primaryHref,
  secondaryLabel = "See case studies →",
  secondaryTo = "/cases",
  secondaryHref,
}: FooterCtaProps & { variant?: "light" | "dark" }) {
  const light = variant === "light";
  const scrollToTop = useScrollToTop();

  return (
    <footer
      id="cta"
      aria-labelledby="footer-cta-heading"
      className={cn(
        siteChromeBand,
        "bg-[#0a0a0b] pb-12 pt-16 md:pt-20",
        light && cn("border-t", chromeLightBorder, chromeLightInk),
      )}
    >
      <div className={sectionInner}>
        <Reveal duration={0.5}>
          <div className={cn("flex items-center gap-2", textMeta, light ? chromeLightMuted : textGhost)}>
            <span aria-hidden className="size-1.5 rounded-full bg-rm-accent" />
            {eyebrow}
          </div>
        </Reveal>

        <div className="mt-4 max-w-[42rem]">
          <Reveal duration={0.5}>
            <h2 id="footer-cta-heading" className={cn("m-0", textDisplay)}>
              {title}
            </h2>
          </Reveal>
          {titleAccent ? (
            <Reveal delay={0.05} duration={0.5}>
              <div className="mt-6 border-t border-[var(--rm-border-soft)] pt-6">
                <p
                  className={cn(
                    "rm-copy-standfirst m-0 max-w-[46ch] text-pretty",
                    light ? chromeLightMuted : textSubtle,
                  )}
                >
                  {titleAccent}
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={0.1} duration={0.5} className="mt-8">
          <FooterCtaButtons
            primaryLabel={primaryLabel}
            primaryTo={primaryTo}
            primaryHref={primaryHref}
            secondaryLabel={secondaryLabel}
            secondaryTo={secondaryTo}
            secondaryHref={secondaryHref}
          />
        </Reveal>

        <Reveal delay={0.15} duration={0.5}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className={cn("flex gap-4", light ? chromeLightMuted : textGhost)}>
              {FOOTER_SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(chromeLink(light), "inline-flex")}
                >
                  <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
                </a>
              ))}
            </div>
            <a href="mailto:info@realmedia.ink" className={cn("rm-type-body", chromeLink(light))}>
              info@realmedia.ink
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[var(--rm-border-soft)] pt-10 sm:grid-cols-4 md:mt-20">
          <FooterLinkGroup light={light} heading="Work" links={FOOTER_WORK_LINKS} />
          <FooterLinkGroup light={light} heading="Agency" links={FOOTER_AGENCY_LINKS} />
        </div>

        <div className="mt-16 md:mt-20">
          <FooterWordmark light={light} />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rm-border-soft)] pt-5">
          <div className="flex items-center gap-4">
            <span className={cn(textMeta, light ? chromeLightMuted : textGhost)}>© Real Media 2026</span>
            <a href="/privacy" className={cn("rm-type-body", chromeLink(light))}>
              Privacy Policy
            </a>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className={cn(
              "group inline-flex items-center gap-2",
              textMeta,
              light ? chromeLightMuted : textGhost,
              "transition-colors duration-150 hover:text-white",
            )}
          >
            Scroll to top
            <span aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
