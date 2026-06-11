import type {
  PageContent,
  PageCtaContent,
  PageHeroContent,
  PageSectionContent,
  PayloadPageDoc,
} from "@/lib/page-content/types";
import { getPageDefaults } from "@/lib/page-content/defaults";
import { isPayloadEnabled, payloadFetch } from "@/lib/payload/client";
import type { PayloadListResponse } from "@/lib/payload/types";
import { mediaUrl } from "@/lib/payload/media";

function mergeHero(base?: PageHeroContent, remote?: PageHeroContent): PageHeroContent | undefined {
  if (!base && !remote) return undefined;
  return { ...base, ...remote };
}

function mergeSections(
  base: Record<string, PageSectionContent>,
  remote: Record<string, PageSectionContent>,
): Record<string, PageSectionContent> {
  const keys = new Set([...Object.keys(base), ...Object.keys(remote)]);
  const merged: Record<string, PageSectionContent> = {};
  for (const key of keys) {
    merged[key] = {
      ...base[key],
      ...remote[key],
      bullets: remote[key]?.bullets ?? base[key]?.bullets,
      items: remote[key]?.items ?? base[key]?.items,
    };
  }
  return merged;
}

function mergePage(base: PageContent, remote: Partial<PageContent>): PageContent {
  return {
    ...base,
    ...remote,
    hero: mergeHero(base.hero, remote.hero),
    sections: mergeSections(base.sections, remote.sections ?? {}),
    stats: remote.stats?.length ? remote.stats : base.stats,
    metaCards: remote.metaCards?.length ? remote.metaCards : base.metaCards,
    contact: { ...base.contact, ...remote.contact },
    cta: { ...base.cta, ...remote.cta } as PageCtaContent,
  };
}

export function mapPayloadPage(doc: PayloadPageDoc): Partial<PageContent> {
  const sections: Record<string, PageSectionContent> = {};
  for (const section of doc.sections ?? []) {
    sections[section.sectionKey] = {
      tag: section.tag ?? undefined,
      heading: section.heading ?? undefined,
      subheading: section.subheading ?? undefined,
      body: section.body ?? undefined,
      bullets: section.bullets?.map((b) => b.text).filter(Boolean),
      items: section.items?.map((item) => ({
        title: item.title ?? undefined,
        body: item.body ?? undefined,
        label: item.label ?? undefined,
        value: item.value ?? undefined,
        url: item.url ?? undefined,
        image: mediaUrl(item.image),
      })),
    };
  }

  return {
    slug: doc.slug,
    metaTitle: doc.meta?.title ?? undefined,
    metaDescription: doc.meta?.description ?? undefined,
    hero: doc.hero
      ? {
          tag: doc.hero.tag ?? undefined,
          titleLines: doc.hero.titleLines?.map((l) => l.line).filter(Boolean),
          subheading: doc.hero.subheading ?? undefined,
          body: doc.hero.body ?? undefined,
          image: mediaUrl(doc.hero.image),
          ctaPrimaryLabel: doc.hero.ctaPrimaryLabel ?? undefined,
          ctaPrimaryUrl: doc.hero.ctaPrimaryUrl ?? undefined,
          ctaSecondaryLabel: doc.hero.ctaSecondaryLabel ?? undefined,
          ctaSecondaryUrl: doc.hero.ctaSecondaryUrl ?? undefined,
        }
      : undefined,
    sections,
    stats: doc.stats?.map((stat) => ({
      prefix: stat.prefix ?? undefined,
      value: stat.value,
      suffix: stat.suffix ?? undefined,
      label: stat.label,
      animateTo: stat.animateTo ?? undefined,
    })),
    metaCards: doc.metaCards?.map((card) => ({
      label: card.label,
      value: card.value,
    })),
    contact: doc.contact
      ? {
          eyebrow: doc.contact.eyebrow ?? undefined,
          email: doc.contact.email ?? undefined,
          location: doc.contact.location ?? undefined,
          locationNote: doc.contact.locationNote ?? undefined,
          formPlaceholder: doc.contact.formPlaceholder ?? undefined,
          submitLabel: doc.contact.submitLabel ?? undefined,
          submitSuccessLabel: doc.contact.submitSuccessLabel ?? undefined,
          socialLinks: doc.contact.socialLinks?.map((link) => ({
            label: link.label,
            url: link.url,
          })),
        }
      : undefined,
    cta: doc.cta
      ? {
          title: doc.cta.title ?? undefined,
          titleAccent: doc.cta.titleAccent ?? undefined,
          primaryLabel: doc.cta.primaryLabel ?? undefined,
          primaryUrl: doc.cta.primaryUrl ?? undefined,
          secondaryLabel: doc.cta.secondaryLabel ?? undefined,
          secondaryUrl: doc.cta.secondaryUrl ?? undefined,
        }
      : undefined,
  };
}

export async function fetchPageBySlug(slug: string): Promise<Partial<PageContent> | null> {
  const data = await payloadFetch<PayloadListResponse<PayloadPageDoc>>(
    `/api/pages?depth=2&limit=1&where[slug][equals]=${encodeURIComponent(slug)}&where[_status][equals]=published`,
    { revalidate: 60 },
  );
  const doc = data?.docs?.[0];
  return doc ? mapPayloadPage(doc) : null;
}

export async function getPageContent(slug: string): Promise<PageContent> {
  const defaults = getPageDefaults(slug);
  if (!isPayloadEnabled()) return defaults;
  const remote = await fetchPageBySlug(slug);
  return remote ? mergePage(defaults, remote) : defaults;
}

export function section(page: PageContent, key: string): PageSectionContent {
  return page.sections[key] ?? {};
}
