import { textMeta } from "@/components/framer-section";
import { cn } from "@/lib/utils";

type CmsFallbackBannerProps = {
  message?: string;
  className?: string;
};

export function CmsFallbackBanner({
  message = "Showing saved case studies — live CMS content is temporarily unavailable.",
  className,
}: CmsFallbackBannerProps) {
  return (
    <div
      role="status"
      className={cn(
        "border-b border-[var(--rm-border-soft)] bg-[var(--rm-surface-raised)] px-6 py-3 md:px-10",
        className,
      )}
    >
      <p
        className={cn(
          textMeta,
          "mx-auto max-w-[var(--rm-grid-max)] normal-case tracking-normal text-[var(--rm-text-body)]",
        )}
      >
        {message}
      </p>
    </div>
  );
}
