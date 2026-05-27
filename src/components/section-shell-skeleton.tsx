import { sectionContainer, sectionShell } from "@/components/framer-section";

type SectionShellSkeletonProps = {
  blocks?: 1 | 2;
  minBlockHeight?: string;
};

export function SectionShellSkeleton({
  blocks = 1,
  minBlockHeight = "280px",
}: SectionShellSkeletonProps) {
  return (
    <div className={sectionShell} aria-hidden="true">
      <div className={sectionContainer}>
        <div className="h-8 w-28 rounded-full bg-white/[0.08]" />
        <div className="mt-6 h-10 max-w-lg rounded-md bg-white/[0.06]" />
        <div
          className={
            blocks === 2
              ? "mt-8 grid grid-cols-1 gap-2 md:grid-cols-2"
              : "mt-8"
          }
        >
          {Array.from({ length: blocks }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white/[0.05]"
              style={{ minHeight: minBlockHeight }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
