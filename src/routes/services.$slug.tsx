import { createFileRoute, notFound, Link, redirect } from "@tanstack/react-router";

import { ServicePageView } from "@/components/service-page";
import { serviceCardIntro } from "@/lib/services";
import { getServiceContent } from "@/lib/payload/services-cms";
import { buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    if (params.slug === "smm") {
      throw redirect({ to: "/services/smm" });
    }
    const service = await getServiceContent(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service not found — R-M" }] };
    const title = `${s.name} — ${s.tagline} · R—M Studio`;
    const description = serviceCardIntro(s);
    return buildPageHead({
      title,
      description,
      pathname: `/services/${params.slug}`,
    });
  },
  notFoundComponent: () => (
    <div className="rm-page text-white grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight">Service not found</h1>
        <Link
          to="/services"
          className="inline-flex rm-touch items-center mt-10 text-[13px] px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-rm-accent hover:text-white transition-colors"
        >
          View all services →
        </Link>
      </div>
    </div>
  ),
  component: ServiceSlugPage,
});

function ServiceSlugPage() {
  const { service } = Route.useLoaderData();
  return <ServicePageView service={service} />;
}
