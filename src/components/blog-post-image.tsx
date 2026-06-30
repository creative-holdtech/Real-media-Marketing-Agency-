import type { CSSProperties } from "react";

import type { Post } from "@/lib/posts";
import { getPostImageRender, type PostImageFrame } from "@/lib/post-image";
import { cn } from "@/lib/utils";

type BlogPostImageProps = {
  post: Post;
  frame: PostImageFrame;
  alt?: string;
  className?: string;
  imgClassName?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
  draggable?: boolean;
  width?: number;
  height?: number;
  style?: CSSProperties;
};

export function BlogPostImage({
  post,
  frame,
  alt,
  className,
  imgClassName,
  loading = "lazy",
  decoding = "async",
  draggable,
  width,
  height,
  style,
}: BlogPostImageProps) {
  const { fit, objectPosition } = getPostImageRender(post, frame);
  const contain = fit === "contain";

  return (
    <img
      src={post.image}
      alt={alt ?? post.imageAlt ?? ""}
      loading={loading}
      decoding={decoding}
      draggable={draggable}
      width={width}
      height={height}
      style={{ objectPosition, ...style }}
      className={cn(
        contain
          ? "max-h-full max-w-full object-contain"
          : "h-full w-full object-cover",
        imgClassName,
        className,
      )}
    />
  );
}
