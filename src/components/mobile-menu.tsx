import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const items: { label: string; to?: string; href?: string }[] = [
  { label: "Services", to: "/services" },
  { label: "Cases", to: "/cases" },
  { label: "About", to: "/about" },
  { label: "Journal", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
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
        className="md:hidden text-[13px] uppercase tracking-[0.2em] text-white/85 hover:text-white px-4 py-2 rounded-full"
      >
        Menu
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] bg-[#0a0a0a] text-white animate-in fade-in duration-200 overflow-y-auto"
        >
          <div className="px-4 pt-4">
            <div className="max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border border-white/10 bg-[#111] pl-5 pr-2">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="font-semibold tracking-tight text-[15px]"
              >
                R—M<span aria-hidden className="text-[#e85d3a]">.</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-[12px] uppercase tracking-[0.22em] text-white/85 hover:text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>

          <nav
            aria-label="Mobile primary"
            className="px-8 pt-12 pb-10 flex flex-col min-h-[calc(100dvh-72px)]"
          >
            <ul className="flex-1 flex flex-col divide-y divide-white/8 border-y border-white/8">
              {items.map((it, i) =>
                it.to ? (
                  <li key={it.label}>
                    <Link
                      to={it.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between py-5 text-white/90 hover:text-[#e85d3a] transition-colors"
                    >
                      <span className="text-[36px] leading-[1.1] tracking-[-0.03em] font-medium">
                        {it.label}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-white/30 tabular-nums">
                        0{i + 1}
                      </span>
                    </Link>
                  </li>
                ) : (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5 text-white/90 hover:text-[#e85d3a] transition-colors"
                    >
                      <span className="text-[36px] leading-[1.1] tracking-[-0.03em] font-medium">
                        {it.label}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-white/30 tabular-nums">
                        0{i + 1}
                      </span>
                    </a>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-10 flex flex-col gap-5">
              <Link
                to="/audit"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 h-14 px-7 text-[12px] uppercase tracking-[0.22em] rounded-full bg-white text-black font-medium active:scale-[0.97] transition-transform"
              >
                Get the audit →
              </Link>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/35">
                <a
                  href="mailto:hello@r-m.studio"
                  onClick={() => setOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  hello@r-m.studio
                </a>
                <span>Kyiv · EU · MENA</span>
              </div>
            </div>
          </nav>
        </div>
      )}

    </>
  );
}
