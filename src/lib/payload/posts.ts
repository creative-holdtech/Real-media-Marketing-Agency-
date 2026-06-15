import { format, parseISO } from "date-fns";

import type { Post, PostSection } from "@/lib/posts";
import { posts as staticPosts, getPost as getStaticPost } from "@/lib/posts";

import { getPayloadUrl, isPayloadEnabled, payloadFetch } from "./client";
import { mediaUrl } from "./media";
import type { PayloadListResponse, PayloadMedia, PayloadPostDoc } from "./types";

function flattenSections(sections: PayloadPostDoc["sections"]): string[] {
  if (!sections?.length) return [];
  return sections.flatMap(
    (section) => section.paragraphs?.map((p) => p.text).filter(Boolean) ?? [],
  );
}

function mapSections(sections: PayloadPostDoc["sections"]): PostSection[] {
  if (!sections?.length) return [];
  return sections.map((section, index) => ({
    id: section.id ?? `s-${index + 1}`,
    label: section.heading,
    paragraphs: section.paragraphs?.map((p) => p.text).filter(Boolean) ?? [],
    image: mediaUrl(section.image ?? null) || undefined,
  }));
}

export function mapPayloadPost(doc: PayloadPostDoc): Post {
  const published = parseISO(doc.publishedAt);
  const imageMedia =
    typeof doc.featuredImage === "object" ? doc.featuredImage : null;

  return {
    slug: doc.slug,
    category: doc.category,
    label: doc.label,
    date: format(published, "MMM d, yyyy"),
    dateISO: format(published, "yyyy-MM-dd"),
    read: doc.readTime,
    title: doc.title,
    excerpt: doc.excerpt,
    image: mediaUrl(doc.featuredImage as PayloadMedia | string | null),
    imageAlt: imageMedia?.alt ?? doc.title,
    author: doc.author,
    featured: doc.featured ?? false,
    body: flattenSections(doc.sections),
    sections: mapSections(doc.sections),
    metaTitle: doc.meta?.title ?? undefined,
    metaDescription: doc.meta?.description ?? undefined,
  };
}

export async function fetchPosts(): Promise<Post[] | null> {
  const data = await payloadFetch<PayloadListResponse<PayloadPostDoc>>(
    "/api/posts?depth=1&limit=100&sort=-publishedAt&where[_status][equals]=published",
    { revalidate: 60 },
  );

  if (!data?.docs?.length) return null;
  return data.docs.map(mapPayloadPost);
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const data = await payloadFetch<PayloadListResponse<PayloadPostDoc>>(
    `/api/posts?depth=1&limit=1&where[slug][equals]=${encodeURIComponent(slug)}&where[_status][equals]=published`,
    { revalidate: 60 },
  );

  const doc = data?.docs?.[0];
  return doc ? mapPayloadPost(doc) : null;
}

export async function getPosts(): Promise<Post[]> {
  if (!isPayloadEnabled()) return staticPosts;
  const remote = await fetchPosts();
  return remote?.length ? remote : staticPosts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  if (!isPayloadEnabled()) return getStaticPost(slug);
  const remote = await fetchPostBySlug(slug);
  return remote ?? getStaticPost(slug);
}

export async function getFeaturedPost(postsList: Post[]): Promise<Post> {
  return postsList.find((p) => p.featured) ?? postsList[0]!;
}

export async function getArchivePosts(postsList: Post[]): Promise<Post[]> {
  return postsList.filter((p) => !p.featured);
}
