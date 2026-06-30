import type { Post } from "@/lib/posts";

/** Portrait = home carousel (~4:5). Landscape = blog cards (4:3) and article hero (16:10). */
export type PostImageFrame = "portrait" | "landscape";

export type PostImageRender = {
  fit: "cover" | "contain";
  objectPosition: string;
};

/** Per-post crop tuned so the same asset reads in portrait carousel and landscape blog cards. */
export function getPostImageRender(post: Post, frame: PostImageFrame): PostImageRender {
  const fit = post.imageFit ?? "cover";
  const layout = post.imageLayout;

  if (frame === "portrait") {
    return {
      fit,
      objectPosition: layout?.portrait ?? "center center",
    };
  }

  return {
    fit,
    objectPosition: layout?.landscape ?? layout?.portrait ?? "center center",
  };
}
