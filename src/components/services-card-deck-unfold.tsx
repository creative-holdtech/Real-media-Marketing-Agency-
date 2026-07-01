import { sectionCardGrid } from "@/components/framer-section";
import { ServiceCard } from "@/components/services-card";
import type { ServiceContent } from "@/lib/services/types";
import { cn } from "@/lib/utils";

type ServicesCardDeckUnfoldProps = {
  services: ServiceContent[];
  variant?: "default" | "compact" | "deck";
  className?: string;
};

/** Home `#studio` card matrix rhythm — `sectionCardGrid` + default shells. */
export function ServicesCardDeckUnfold({
  services,
  variant = "default",
  className,
}: ServicesCardDeckUnfoldProps) {
  return (
    <div className={cn(sectionCardGrid, className)}>
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} variant={variant} />
      ))}
    </div>
  );
}
