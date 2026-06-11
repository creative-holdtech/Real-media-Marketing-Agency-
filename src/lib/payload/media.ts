import { getPayloadUrl } from "./client";
import type { PayloadMedia } from "./types";

export function mediaUrl(media: PayloadMedia | string | null | undefined): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (!media.url) return "";
  if (media.url.startsWith("http")) return media.url;
  return `${getPayloadUrl()}${media.url}`;
}
