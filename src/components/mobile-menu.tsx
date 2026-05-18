import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const items: { label: string; to?: string; href?: string }[] = [
  { label: "Services", href: "/#products" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/#cases" },
  { label: "Insights", href: "/#insights" },
  { label: "About", href: "/#about" },
  { label: "Journal", to: "/blog" },
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
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl text-white animate-in fade-in duration-200"
        >
          <div className="px-4 pt-4">
            <div className="max-w-[1320px] mx-auto h-14 flex items-center justify-between rounded-full border border-white/10 bg-black/60 backdrop-blur-xl pl-5 pr-2">
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
                className="text-[13px] uppercase tracking-[0.2em] text-white/85 hover:text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>

          <nav
            aria-label="Mobile primary"
            className="px-8 pt-16 pb-12 flex flex-col h-[calc(100vh-72px)]"
          >
            <ul className="flex-1 flex flex-col gap-2">
              {items.map((it) =>
                it.to ? (
                  <li key={it.label}>
                    <Link
                      to={it.to}
                      onClick={() => setOpen(false)}
                      className="block text-[44px] leading-[1.1] tracking-[-0.03em] font-medium text-white/90 hover:text-[#e85d3a] transition-colors py-2"
                    >
                      {it.label}
                    </Link>
                  </li>
                ) : (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className="block text-[44px] leading-[1.1] tracking-[-0.03em] font-medium text-white/90 hover:text-[#e85d3a] transition-colors py-2"
                    >
                      {it.label}
                    </a>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-10 flex flex-col gap-4">
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="text-center text-[14px] px-6 py-4 rounded-full bg-[#e85d3a] text-white font-medium"
              >
                Get Audit →
              </a>
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 text-center">
                hello@r-m.studio
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
