import { ServiceCard } from "@/components/services-card";
import type { ServiceContent } from "@/lib/services/types";

export function ServicesCardDeckUnfold({ services }: { services: ServiceContent[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
