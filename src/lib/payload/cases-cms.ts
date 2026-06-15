import type { CaseStudy } from "@/lib/cases";
import { cases as staticCases, getCase as getStaticCase } from "@/lib/cases";
import type { PayloadCaseDoc } from "@/lib/page-content/types";
import { isPayloadEnabled, payloadFetch } from "@/lib/payload/client";
import { mediaUrl } from "@/lib/payload/media";
import type { PayloadListResponse } from "@/lib/payload/types";

import nicheAi from "@/assets/niche-ai.jpg";

export type CasesLoadResult = {
  cases: CaseStudy[];
  cmsFailed: boolean;
};

function mergeWithStatic(mapped: CaseStudy, usedFallbackCover: boolean): CaseStudy {
  const local = getStaticCase(mapped.slug);
  if (!local) return mapped;

  return {
    ...mapped,
    layout: mapped.layout ?? local.layout,
    rich: mapped.rich ?? local.rich,
    coverScope: mapped.coverScope ?? local.coverScope,
    coverImage: usedFallbackCover ? local.coverImage : mapped.coverImage,
    heroImage: usedFallbackCover ? local.heroImage : mapped.heroImage,
  };
}

function mapPayloadCase(doc: PayloadCaseDoc): CaseStudy {
  const coverFromCms = mediaUrl(doc.coverImage);
  const usedFallbackCover = !coverFromCms;
  const cover = coverFromCms || nicheAi;
  const hero = mediaUrl(doc.heroImage) || cover;

  const mapped: CaseStudy = {
    slug: doc.slug,
    client: doc.client,
    niche: doc.niche,
    format: doc.format,
    duration: doc.duration,
    preview: doc.preview,
    headline: doc.headline,
    heroMetrics: doc.heroMetrics ?? [],
    primaryMetric: doc.primaryMetric ?? { value: "", label: "" },
    situation: doc.situation,
    challenge: doc.challenge,
    work: doc.work ?? [],
    resultMetrics: doc.resultMetrics ?? [],
    resultsBody: doc.resultsBody,
    quote: doc.quote ?? { text: "", who: "", role: "" },
    accent: doc.accent ?? "#7c5cff",
    coverImage: cover,
    heroImage: hero,
  };

  return mergeWithStatic(mapped, usedFallbackCover);
}

export async function fetchCases(): Promise<CaseStudy[] | null> {
  const data = await payloadFetch<PayloadListResponse<PayloadCaseDoc>>(
    "/api/cases?depth=2&limit=100&where[_status][equals]=published",
    { revalidate: 60 },
  );
  if (!data?.docs?.length) return null;
  return data.docs.map(mapPayloadCase);
}

export async function fetchCaseBySlug(slug: string): Promise<CaseStudy | null> {
  const data = await payloadFetch<PayloadListResponse<PayloadCaseDoc>>(
    `/api/cases?depth=2&limit=1&where[slug][equals]=${encodeURIComponent(slug)}&where[_status][equals]=published`,
    { revalidate: 60 },
  );
  const doc = data?.docs?.[0];
  return doc ? mapPayloadCase(doc) : null;
}

export async function getCasesWithMeta(): Promise<CasesLoadResult> {
  if (!isPayloadEnabled()) {
    return { cases: staticCases, cmsFailed: false };
  }

  const remote = await fetchCases();
  if (remote?.length) {
    return { cases: remote, cmsFailed: false };
  }

  return { cases: staticCases, cmsFailed: true };
}

export async function getCases(): Promise<CaseStudy[]> {
  const { cases } = await getCasesWithMeta();
  return cases;
}

export async function getCase(slug: string): Promise<CaseStudy | undefined> {
  if (!isPayloadEnabled()) return getStaticCase(slug);
  const remote = await fetchCaseBySlug(slug);
  return remote ?? getStaticCase(slug);
}
