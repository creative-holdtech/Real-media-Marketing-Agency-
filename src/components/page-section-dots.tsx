import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export type PageSectionDot = {
  id: string;
  label: string;
};

export function PageSectionDots({
  sections,
  className,
}: {
  sections: ReadonlyArray<PageSectionDot>;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const targets = sections
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!targets.length || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -52% 0px",
        threshold: [0, 0.18, 0.36, 0.54, 0.72],
      },
    );

    targets.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sections]);

  const jumpToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Page sections"
      className={cn(
        "rm-scroll-cinema__rail pointer-events-none fixed right-6 top-1/2 z-[57] hidden -translate-y-1/2 md:block lg:right-10",
        className,
      )}
    >
      <ol className="flex flex-col gap-2">
        {sections.map((item) => {
          const active = activeId === item.id;

          return (
            <li key={item.id} className="flex items-center justify-end gap-2">
              <button
                type="button"
                className={cn(
                  "pointer-events-auto block h-1 w-1 rounded-full transition-[transform,background-color,opacity] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  active ? "scale-150 bg-[#efeeea] opacity-100" : "bg-[#555] opacity-100",
                )}
                aria-label={`Go to ${item.label}`}
                aria-current={active ? "true" : undefined}
                onClick={() => jumpToSection(item.id)}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
