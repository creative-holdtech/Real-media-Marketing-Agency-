import { Link, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

const items: { label: string; to: string; meta: string }[] = [
  { label: "Services", to: "/services", meta: "What we do" },
  { label: "Cases", to: "/cases", meta: "Selected work" },
  { label: "About", to: "/about", meta: "The studio" },
  { label: "Journal", to: "/blog", meta: "Notes & essays" },
  { label: "Contact", to: "/contact", meta: "Start a project" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Auto-close whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + handle Escape while open
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const html = document.documentElement;
    const prevBody = body.style.overflow;
    const prevHtml = html.style.overflow;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white/85 hover:text-white px-4 h-10 rounded-full border border-white/10 bg-white/[0.03]"
      >
        <span className="flex flex-col gap-[3px]">
          <span className="block w-3.5 h-px bg-current" />
          <span className="block w-3.5 h-px bg-current" />
        </span>
        Menu
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] bg-[#0c0a09] text-white animate-in fade-in duration-200 overflow-y-auto flex flex-col"
        >
          {/* Top bar — matches site header */}
          <div className="px-4 pt-5">
            <div className="h-14 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl pl-5 pr-2">
              <Link
                to="/"
                onClick={close}
                className="font-semibold tracking-tight text-[15px] text-white"
              >
                R—M<span aria-hidden className="text-[#e85d3a]">.</span>
              </Link>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="inline-flex items-center gap-2 h-10 px-4 text-[12px] uppercase tracking-[0.22em] text-white/85 hover:text-white rounded-full"
              >
                Close
                <span aria-hidden className="relative w-3 h-3">
                  <span className="absolute inset-0 m-auto h-px w-3 bg-current rotate-45" />
                  <span className="absolute inset-0 m-auto h-px w-3 bg-current -rotate-45" />
                </span>
              </button>
            </div>
          </div>

          {/* Eyebrow */}
          <div className="px-6 pt-10 pb-4 flex items-baseline justify-between text-[10px] uppercase tracking-[0.28em] text-white/35">
            <span>Index</span>
            <span className="tabular-nums">{items.length.toString().padStart(2, "0")} / {items.length.toString().padStart(2, "0")}</span>
          </div>

          {/* Nav list */}
          <nav aria-label="Mobile primary" className="px-6 flex-1">
            <ul className="border-y border-white/10 divide-y divide-white/10">
              {items.map((it, i) => (
                <li key={it.label}>
                  <Link
                    to={it.to}
                    onClick={close}
                    className="group flex items-baseline justify-between gap-4 py-5"
                  >
                    <span className="flex items-baseline gap-4 min-w-0">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-white/30 tabular-nums pt-2">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="text-[40px] leading-[1.05] tracking-[-0.035em] font-medium text-white/95 group-hover:text-[#e85d3a] transition-colors">
                          {it.label}
                        </span>
                        <span className="mt-1 text-[12px] text-white/40">
                          {it.meta}
                        </span>
                      </span>
                    </span>
                    <span aria-hidden className="text-[#e85d3a] text-[20px] leading-none pt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer block */}
          <div className="px-6 pt-8 pb-10 mt-4 space-y-6">
            <Link
              to="/audit"
              onClick={close}
              className="inline-flex w-full items-center justify-between gap-2 h-14 px-6 text-[12px] uppercase tracking-[0.22em] rounded-full bg-white text-black font-medium active:scale-[0.98] transition-transform"
            >
              <span>Get the audit</span>
              <span aria-hidden>→</span>
            </Link>

            <div className="grid grid-cols-2 gap-6 text-[11px] uppercase tracking-[0.22em] text-white/35">
              <div className="space-y-1.5">
                <div className="text-white/30 text-[9px]">Write</div>
                <a
                  href="mailto:hello@r-m.studio"
                  onClick={close}
                  className="block text-white/80 hover:text-white normal-case tracking-normal text-[13px]"
                >
                  hello@r-m.studio
                </a>
              </div>
              <div className="space-y-1.5">
                <div className="text-white/30 text-[9px]">Located</div>
                <div className="text-white/80 normal-case tracking-normal text-[13px]">
                  Kyiv · EU · MENA
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/30">
              <span>© R—M 2025</span>
              <span>Vol. 01</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
