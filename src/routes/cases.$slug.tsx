import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { CaseRichDetail } from "@/components/case-rich-detail";
import { JsonLd } from "@/components/json-ld";
import { btnOutline, sectionHeadline, textMeta } from "@/components/framer-section";
import { getCase, getCases } from "@/lib/payload/cases-cms";
import { cases as staticCases, getCase as getStaticCase } from "@/lib/cases";
import { breadcrumbJsonLd, buildPageHead, caseStudyJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cases/$slug")({
  loader: async ({ params }) => {
    const study = await getCase(params.slug);
    if (!study) throw notFound();
    const allCases = await getCases();
    return { study, allCases };
  },
  head: ({ loaderData, params }) => {
    const s = loaderData?.study ?? getStaticCase(params.slug);
    if (!s) return { meta: [{ title: "Case not found — R-M" }] };
    const title = `${s.client} — ${s.headline} | R-M`;
    const description = s.rich?.subline ?? s.headline;
    return buildPageHead({
      title,
      description,
      pathname: `/cases/${params.slug}`,
      image: s.coverImage,
    });
  },
  notFoundComponent: () => (
    <div className="rm-page grid place-items-center px-6 text-[var(--rm-ink)]">
      <div className="max-w-md text-center">
        <p className={cn("mb-6", textMeta)}>404 — Not found</p>
        <h1 className={sectionHeadline}>
          This case <span className="font-normal text-[var(--rm-text-muted)]">doesn't exist.</span>
        </h1>
        <Link to="/cases" className={cn("mt-10", btnOutline)}>
          ← All cases
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="rm-page grid place-items-center px-6 text-center text-[var(--rm-ink)]">
      <div>
        <p className={cn("mb-6", textMeta)}>{error.message}</p>
        <button type="button" onClick={reset} className={btnOutline}>
          Try again
        </button>
      </div>
    </div>
  ),
  component: CaseDetail,
});

function CaseDetail() {
  const { study: c, allCases } = Route.useLoaderData();
  const others = allCases.filter((item) => item.slug !== c.slug).slice(0, 3);

  if (!c.rich) throw notFound();

  const pathname = `/cases/${c.slug}`;

  return (
    <>
      <JsonLd
        data={caseStudyJsonLd({
          title: `${c.client} — ${c.headline}`,
          description: c.rich.subline,
          pathname,
          image: c.coverImage,
          client: c.client,
          year: c.rich.meta.year,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Cases", path: "/cases" },
          { name: c.client, path: pathname },
        ])}
      />
      <CaseRichDetail study={c} others={others} />
    </>
  );
}

export const _allCaseSlugs = staticCases.map((c) => c.slug);
