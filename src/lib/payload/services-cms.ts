import type { ServiceContent } from "@/lib/services/types";
import { getService as getStaticService, servicesList as staticServicesList } from "@/lib/services";
import type { PayloadServiceDoc } from "@/lib/page-content/types";
import { isPayloadEnabled, payloadFetch } from "@/lib/payload/client";
import { mediaUrl } from "@/lib/payload/media";
import type { PayloadListResponse } from "@/lib/payload/types";

function mapPayloadService(doc: PayloadServiceDoc): ServiceContent {
  return {
    slug: doc.slug as ServiceContent["slug"],
    name: doc.name,
    shortName: doc.shortName,
    tagline: doc.tagline,
    accent: doc.accent ?? "#7c5cff",
    hero: {
      word: doc.hero.word,
      paragraphs: doc.hero.paragraphs?.map((p) => p.text).filter(Boolean) ?? [],
      primaryCta: doc.hero.primaryCta ?? "Book free audit →",
    },
    blocks:
      doc.blocks?.map((block) => ({
        n: block.n,
        title: block.title,
        subtitle: block.subtitle,
        sections:
          block.sections?.map((section) => ({
            heading: section.heading,
            items: section.items?.map((item) => item.text).filter(Boolean) ?? [],
          })) ?? [],
        notes: block.notes?.map((n) => n.text).filter(Boolean) as string[] | undefined,
        cta: block.cta ?? undefined,
      })) ?? [],
    outcomes: {
      title: doc.outcomes?.title ?? "",
      items:
        doc.outcomes?.items?.map((item) => ({
          title: item.title,
          body: item.body,
          bullets: item.bullets?.map((b) => b.text).filter(Boolean) as string[] | undefined,
        })) ?? [],
      extra:
        doc.outcomes?.extraTitle && doc.outcomes.extraItems?.length
          ? {
              title: doc.outcomes.extraTitle,
              items: doc.outcomes.extraItems.map((item) => ({
                title: item.title,
                body: item.body,
              })),
            }
          : undefined,
    },
    socialProof: {
      title: doc.socialProof?.title ?? "",
      cases:
        doc.socialProof?.cases?.map((item) => ({
          quote: item.quote ?? undefined,
          attribution: item.attribution ?? undefined,
          label: item.label ?? undefined,
          metrics: item.metrics ?? [],
        })) ?? [],
    },
    closingQuote: doc.closingQuote ?? "",
    footerCta: doc.footerCta ?? "",
    cardImage: mediaUrl(doc.cardImage) ?? undefined,
  };
}

export async function fetchServices(): Promise<ServiceContent[] | null> {
  const data = await payloadFetch<PayloadListResponse<PayloadServiceDoc>>(
    "/api/services?depth=2&limit=100&where[_status][equals]=published",
    { revalidate: 60 },
  );
  if (!data?.docs?.length) return null;
  return data.docs.map(mapPayloadService);
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceContent | null> {
  const data = await payloadFetch<PayloadListResponse<PayloadServiceDoc>>(
    `/api/services?depth=2&limit=1&where[slug][equals]=${encodeURIComponent(slug)}&where[_status][equals]=published`,
    { revalidate: 60 },
  );
  const doc = data?.docs?.[0];
  return doc ? mapPayloadService(doc) : null;
}

export async function getServicesList(): Promise<ServiceContent[]> {
  if (!isPayloadEnabled()) return staticServicesList;
  const remote = await fetchServices();
  if (!remote?.length) return staticServicesList;
  return remote.map((service) => {
    const local = getStaticService(service.slug);
    if (!local) return service;
    return {
      ...service,
      cardImage: service.cardImage ?? local.cardImage,
      cardImageAlt: service.cardImageAlt ?? local.cardImageAlt,
    };
  });
}

export async function getServiceContent(slug: string): Promise<ServiceContent | undefined> {
  if (!isPayloadEnabled()) return getStaticService(slug);
  const remote = await fetchServiceBySlug(slug);
  return remote ?? getStaticService(slug);
}
