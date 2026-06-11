import { createFileRoute } from "@tanstack/react-router";

import { ServicePageView } from "@/components/service-page";
import { smmService } from "@/lib/services/content/smm";
import { serviceCardIntro } from "@/lib/services";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/smm")({
  head: () =>
    buildPageHead({
      title: "SMM — Be seen | R—M",
      description: serviceCardIntro(smmService),
      pathname: "/services/smm",
    }),
  component: SmmServicePage,
});

function SmmServicePage() {
  return <ServicePageView service={smmService} />;
}
