import { Link } from "@tanstack/react-router";
import { ArrowUp, Dribbble, Instagram, Linkedin, Send } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import logoUrl from "@/assets/logo.svg";
import {
  BtnArrow,
  FlipLabel,
  btnOutlineOnDark,
  btnOutlineOnLight,
  btnPrimarySm,
  chromeLightBorder,
  chromeLightInk,
  chromeLightMuted,
  siteGutter,
  sectionInner,
  siteChromeBand,
  textFaint,
  textGhost,
  textMeta,
  textNav,
  underlineHoverLink,
} from "@/components/framer-section";
import { MobileMenu } from "@/components/mobile-menu";
import { useSiteNav } from "@/components/nav-context";
import { triggerPageTransition } from "@/components/page-transition";
import { servicesList } from "@/lib/services";
import { cn } from "@/lib/utils";

/** Samples whatever is scrolled directly beneath the header and reports its
 * theme — lets header content invert (white on dark, ink on light) without a
 * background pill, mirroring how the custom cursor already inverts. */
function useHeaderTheme(initial: "light" | "dark") {
  const [theme, setTheme] = useState(initial);
  const headerRef = useRef<HTMLElement>(null);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const check = () => {
      frame.current = undefined;
      const header = headerRef.current;
      if (!header) return;
      const rect = header.getBoundingClientRect();
      const el = document.elementFromPoint(window.innerWidth / 2, rect.bottom + 2);
      // A dark decorative surface (e.g. the glow orb) can sit inside an
      // otherwise light-themed section — check for it before falling back
      // to the section-level class, or header text can go invisible against it.
      const isDarkSurface = !!el?.closest('[data-header-surface="dark"]');
      const isLight = !isDarkSurface && !!el?.closest(".rm-section-light");
      setTheme(isLight ? "light" : "dark");
    };
    const onScroll = () => {
      if (frame.current !== undefined) return;
      frame.current = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, []);

  return { theme, headerRef };
}

/** Icon-safe: plain color hover — use for social icons. */
function chromeLink(light: boolean) {
  return cn(
    "transition-colors duration-[300ms] ease-[cubic-bezier(0.625,0.05,0,1)]",
    light
      ? "text-[var(--rm-light-muted)] hover:text-[var(--rm-light-ink)]"
      : "text-[var(--rm-text-muted)] hover:text-white",
  );
}

/** Text links only — adds the underline-retract hover on top of chromeLink's color shift. */
function chromeTextLink(light: boolean) {
  return cn(chromeLink(light), underlineHoverLink);
}

export function SiteHeader({
  variant = "dark",
}: {
  variant?: "light" | "dark";
  /** @deprecated header theme now follows whatever section is scrolled beneath it */
  overlay?: boolean;
  /** @deprecated header theme now follows whatever section is scrolled beneath it */
  solid?: boolean;
}) {
  const { theme, headerRef } = useHeaderTheme(variant);
  const light = theme === "light";
  const siteNav = useSiteNav();

  return (
    <header
      ref={headerRef}
      data-theme={theme}
      // will-change-transform forces the sticky header onto its own stable GPU
      // layer — without it, Chrome can reuse a stale composited backdrop behind
      // this transparent header during fast scroll past GPU-heavy siblings
      // (e.g. the Disciplines orb), flashing whatever was there a frame ago.
      className={cn("sticky top-0 z-50 pt-5 will-change-transform", siteGutter)}
    >
      <nav className="relative mx-auto flex h-14 w-full max-w-[var(--rm-grid-max)] items-center justify-between pl-4 pr-3 md:py-1 md:pl-5 md:pr-1">
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

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <ul className={cn("flex items-center gap-5 lg:gap-6", textNav)}>
            {siteNav.map((n) => (
              <li key={n.label} className="shrink-0">
                {n.to ? (
                  <Link
                    to={n.to}
                    onClick={(e) => {
                      e.preventDefault();
                      triggerPageTransition(n.to!);
                    }}
                    aria-label={n.label}
                    className={cn(
                      "group relative inline-flex items-center whitespace-nowrap px-0.5 py-1",
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
                    <FlipLabel text={n.label} />
                    <span
                      aria-hidden
                      className={cn(
                        "nav-dot pointer-events-none absolute -bottom-0.5 left-1/2 block h-[3px] w-[3px] -translate-x-1/2 scale-0 rounded-full opacity-0 transition-[opacity,transform] duration-200",
                        light ? "bg-[var(--rm-light-accent)]" : "bg-rm-accent",
                      )}
                    />
                  </Link>
                ) : (
                  <a
                    href={n.href}
                    aria-label={n.label}
                    className={cn(chromeLink(light), "group relative whitespace-nowrap px-0.5 py-1")}
                  >
                    <FlipLabel text={n.label} />
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
            className={cn(
              btnPrimarySm,
              light && "bg-[var(--rm-light-ink)] text-white hover:bg-black",
              "group hidden shrink-0 gap-2 md:inline-flex",
            )}
            aria-label="Get audit"
          >
            <FlipLabel text="Get audit" />
            <BtnArrow />
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

const FOOTER_SOCIAL_LINKS = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/real-media-corp/", Icon: Linkedin },
  { label: "Instagram", url: "https://www.instagram.com/realmedia.corp", Icon: Instagram },
  { label: "Dribbble", url: "https://dribbble.com/realmedia26", Icon: Dribbble },
];

/** One footer link column — title + a plain list of text links, internal or external. */
function FooterColumn({
  title,
  items,
  light,
}: {
  title: string;
  items: { key: string; label: ReactNode; to?: string; href?: string }[];
  light: boolean;
}) {
  return (
    <div>
      <div className={cn("mb-6", textMeta, light ? chromeLightMuted : textGhost)}>{title}</div>
      <ul
        className={cn(
          "space-y-4 rm-type-subsection",
          light ? chromeLightMuted : "text-[var(--rm-text-body)]",
        )}
      >
        {items.map((item) => (
          <li key={item.key}>
            {item.to ? (
              <Link to={item.to} className={chromeTextLink(light)}>
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={chromeTextLink(light)}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScrollToTopButton({ light }: { light: boolean }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => {
        lenis?.scrollTo(0, { duration: 1.1 });
        window.scrollTo({ top: 0, behavior: lenis ? "auto" : "smooth" });
      }}
      aria-label="Back to top"
      className={cn(light ? btnOutlineOnLight : btnOutlineOnDark, "group shrink-0 gap-2")}
    >
      <FlipLabel text="Back to top" />
      <ArrowUp className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
    </button>
  );
}

export function SiteFooter({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const light = variant === "light";

  const servicesItems = servicesList.map((s) => ({
    key: s.slug,
    label: s.shortName,
    to: `/services/${s.slug}` as const,
  }));
  const productsItems = [
    { key: "sprint", label: "Sprint", to: "/products" as const },
    { key: "marathon", label: "Marathon", to: "/products" as const },
  ];
  const agencyItems = [
    { key: "about", label: "About", to: "/about" as const },
    { key: "cases", label: "Case studies", to: "/cases" as const },
    { key: "blog", label: "Blog", to: "/blog" as const },
    { key: "contact", label: "Contact", to: "/contact" as const },
    {
      key: "audit",
      label: (
        <>
          <span className="text-[#B85821]">Free</span> audit
        </>
      ),
      to: "/audit" as const,
    },
  ];
  const socialItems = FOOTER_SOCIAL_LINKS.map((s) => ({ key: s.label, label: s.label, href: s.url }));

  return (
    <footer
      className={cn(
        siteChromeBand,
        "bg-[#0a0a0b] pb-8 pt-12",
        light && cn("border-t", chromeLightBorder, chromeLightInk),
      )}
    >
      <div className={sectionInner}>
        <div className="flex flex-col gap-8 border-b border-[var(--rm-border-soft)] pb-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-6">
            <img
              src={logoUrl}
              alt="Real Media"
              width={90}
              height={65}
              className={cn("block h-10 w-auto self-start", light && "[filter:invert(1)]")}
            />
            <p className={cn("rm-type-body max-w-[32ch]", light ? chromeLightMuted : textFaint)}>
              Strategic marketing engine for competitive B2B markets.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className={cn("rm-type-subsection m-0", light ? chromeLightInk : "text-white")}>
              Get in touch
            </p>
            <a
              href="mailto:info@realmedia.ink"
              className={cn(
                "group inline-flex rm-touch w-fit shrink-0 items-center gap-5 rm-type-subsection",
                light ? chromeLightInk : "text-white",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border",
                  light
                    ? cn(chromeLightBorder, chromeLightMuted)
                    : "border-[var(--rm-border-strong)] text-[var(--rm-text-muted)]",
                )}
              >
                <span className="relative inline-block size-[18px] overflow-hidden">
                  <span className="flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:-translate-y-[18px] motion-reduce:group-hover:translate-y-0">
                    <Send className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden />
                    <Send className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden />
                  </span>
                </span>
              </span>
              <span
                className={cn(
                  "relative inline-block after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-[500ms] after:ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:after:scale-x-100",
                )}
              >
                info@realmedia.ink
              </span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-12 md:grid-cols-5">
          <FooterColumn title="Services" items={servicesItems} light={light} />
          <FooterColumn title="Products" items={productsItems} light={light} />
          <FooterColumn title="Agency" items={agencyItems} light={light} />
          <FooterColumn title="Social" items={socialItems} light={light} />

          <div>
            <div className={cn("mb-6", textMeta, light ? chromeLightMuted : textGhost)}>Located</div>
            <div
              className={cn(
                "rm-type-subsection",
                light ? chromeLightMuted : "text-[var(--rm-text-body)]",
              )}
            >
              Warsaw — EU — MENA
            </div>
            <div className={cn("rm-type-body mt-5", light ? chromeLightMuted : textFaint)}>
              Operating across CET / GST timezones for partners in Fintech · AI SaaS · Cybersecurity ·
              iGaming
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-[var(--rm-border-soft)] pt-6 md:grid md:grid-cols-3 md:gap-6">
          <span
            className={cn(
              "rm-type-body md:justify-self-start",
              light ? chromeLightMuted : "text-[var(--rm-text-body)]",
            )}
          >
            © R-M 2026
          </span>

          <a href="/privacy" className={cn("rm-type-body md:justify-self-center", chromeTextLink(light))}>
            Privacy Policy
          </a>

          <div className="md:justify-self-end">
            <ScrollToTopButton light={light} />
          </div>
        </div>
      </div>
    </footer>
  );
}
