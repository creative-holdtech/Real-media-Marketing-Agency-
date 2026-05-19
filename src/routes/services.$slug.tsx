import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { ServicePageView } from "@/components/service-page";
import { getService, type ServiceContent } from "@/lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { service: ServiceContent } => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service not found — R-M" }] };
    return {
      meta: [
        { title: `${s.name} — ${s.tagline} · R—M Studio` },
        { name: "description", content: s.heroIntro },
        { property: "og:title", content: `${s.name} — R—M Studio` },
        { property: "og:description", content: s.heroIntro },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a0a0a] text-white grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight">Service not found</h1>
        <Link
          to="/services"
          className="inline-block mt-10 text-[13px] px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-[#e85d3a] hover:text-white transition-colors"
        >
          View all services →
        </Link>
      </div>
    </div>
  ),
  component: ServiceSlugPage,
});

function ServiceSlugPage() {
  const { service } = Route.useLoaderData() as { service: ServiceContent };
  return <ServicePageView service={service} />;
}
