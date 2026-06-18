import { Link, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import logoUrl from "@/assets/logo.svg";
import { CtaButton } from "@/components/framer-section";
import { useSiteNav } from "@/components/nav-context";

export function MobileMenu() {
  const items = useSiteNav();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const html = document.documentElement;
    const scrollbarW = window.innerWidth - html.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;
    // hide site header to avoid backdrop-blur flicker
    const header = document.querySelector<HTMLElement>("body > div header");
    if (header) header.style.visibility = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      if (header) header.style.visibility = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Mount first (invisible), then trigger transition on next frame
  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(t);
    }
  }, [open]);

  const dialog = mounted ? (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      data-open={visible}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        background: "var(--rm-surface)",
        overflowY: "auto",
        clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        transition: visible
          ? "clip-path 520ms cubic-bezier(0.22,1,0.36,1)"
          : "clip-path 320ms cubic-bezier(0.4,0,1,1)",
      }}
    >
      {/* ── Header bar ─────────────────────────────────────── */}
      <div className="px-5 pt-5 shrink-0">
        <div
          className="h-14 flex items-center justify-between pl-5 pr-2 rounded-full border border-white/10"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <Link to="/" onClick={close} aria-label="Real Media — home" className="leading-none">
            <img src={logoUrl} alt="Real Media" width={90} height={65} className="h-8 w-auto" />
          </Link>

          {/* Animated hamburger → X */}
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation"
            className="rm-touch inline-flex items-center gap-2.5 px-4 text-[11px] uppercase tracking-[0.24em] text-white/60 hover:text-white transition-colors duration-200 rounded-full"
          >
            Close
            <span className="relative w-[14px] h-[14px]">
              <span
                className="absolute inset-0 m-auto h-px bg-current"
                style={{ width: "14px", transform: "rotate(45deg)" }}
              />
              <span
                className="absolute inset-0 m-auto h-px bg-current"
                style={{ width: "14px", transform: "rotate(-45deg)" }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ── Nav list ───────────────────────────────────────── */}
      <nav aria-label="Primary navigation" className="flex-1 px-5 pt-6 pb-2">
        <ul className="divide-y divide-white/[0.07]">
          {items.map((item, i) => (
            <li
              key={item.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 480ms cubic-bezier(0.22,1,0.36,1) ${80 + i * 60}ms, transform 480ms cubic-bezier(0.22,1,0.36,1) ${80 + i * 60}ms`,
              }}
            >
              {item.to ? (
                <Link
                  to={item.to}
                  onClick={close}
                  className="group flex items-center justify-between gap-4 py-[18px]"
                >
                  {/* Index numeral */}
                  <span
                    className="shrink-0 tabular-nums text-[10px] uppercase tracking-[0.28em] text-white/25 select-none"
                    style={{ width: "2ch" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Label + sub */}
                  <span className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <span
                      className="text-white/90 group-hover:text-white font-medium leading-[1] tracking-[-0.025em] transition-colors duration-200"
                      style={{ fontSize: "clamp(2rem, 9vw, 2.8rem)" }}
                    >
                      {item.label}
                    </span>
                    <span className="text-[11px] text-white/35 tracking-[0.08em] font-normal">
                      {item.sub ?? ""}
                    </span>
                  </span>

                  {/* Arrow */}
                  <span
                    aria-hidden
                    className="shrink-0 text-rm-accent text-[18px] leading-none opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-0"
                    style={{ transition: "opacity 180ms ease-out, transform 180ms ease-out" }}
                  >
                    →
                  </span>
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={close}
                  className="group flex items-center justify-between gap-4 py-[18px]"
                >
                  <span
                    className="shrink-0 tabular-nums text-[10px] uppercase tracking-[0.28em] text-white/25 select-none"
                    style={{ width: "2ch" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <span
                      className="text-white/90 group-hover:text-white font-medium leading-[1] tracking-[-0.025em] transition-colors duration-200"
                      style={{ fontSize: "clamp(2rem, 9vw, 2.8rem)" }}
                    >
                      {item.label}
                    </span>
                    {item.sub ? (
                      <span className="text-[11px] text-white/35 tracking-[0.08em] font-normal">
                        {item.sub}
                      </span>
                    ) : null}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-rm-accent text-[18px] leading-none opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-0"
                    style={{ transition: "opacity 180ms ease-out, transform 180ms ease-out" }}
                  >
                    →
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Footer ─────────────────────────────────────────── */}
      <div
        className="px-5 pb-8 pt-6 shrink-0 border-t border-white/[0.07] space-y-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition:
            "opacity 520ms cubic-bezier(0.22,1,0.36,1) 400ms, transform 520ms cubic-bezier(0.22,1,0.36,1) 400ms",
        }}
      >
        {/* Primary CTA */}
        <CtaButton to="/audit" variant="primary" className="w-full justify-between" onClick={close}>
          Book an audit
        </CtaButton>

        {/* Meta row */}
        <div className="grid grid-cols-2 gap-4 text-[12px] text-white/40">
          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-[0.24em] text-white/25">Write</div>
            <a
              href="mailto:info@realmedia.ink"
              onClick={close}
              className="block text-white/70 hover:text-white transition-colors normal-case tracking-normal"
            >
              info@realmedia.ink
            </a>
          </div>
          <div className="space-y-1">
            <div className="text-[9px] uppercase tracking-[0.24em] text-white/25">Located</div>
            <div className="text-white/70 normal-case tracking-normal">Warsaw · EU · MENA</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-white/20">
          <span>© R—M 2026</span>
          <span>Vol. 01</span>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* ── Trigger button ───────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        aria-expanded={open}
        className="md:hidden rm-touch inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/70 hover:text-white px-4 rounded-full border border-white/10 transition-colors duration-200"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {/* Two-line icon */}
        <span className="flex flex-col gap-[4px]">
          <span className="block h-px bg-current" style={{ width: "15px" }} />
          <span className="block h-px bg-current" style={{ width: "10px" }} />
        </span>
        Menu
      </button>

      {typeof document !== "undefined" && createPortal(dialog, document.body)}
    </>
  );
}
