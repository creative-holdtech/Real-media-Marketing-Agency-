import { payloadFetch } from "./client";
import type { PayloadNavigationGlobal, PayloadNavLink } from "./types";

const defaultHeaderLinks: PayloadNavLink[] = [
  { label: "Services", url: "/services", sub: "What we do" },
  { label: "Cases", url: "/cases", sub: "Selected work" },
  { label: "Products", url: "/products", sub: "Sprint & Marathon" },
  { label: "About", url: "/about", sub: "The studio" },
  { label: "Blog", url: "/blog", sub: "Notes & essays" },
  { label: "Contact", url: "/contact", sub: "Start a project" },
];

export type NavItem = {
  label: string;
  to?: string;
  href?: string;
  sub?: string;
};

function toNavItem(link: PayloadNavLink): NavItem {
  const isExternal = /^https?:\/\//.test(link.url);
  return {
    label: link.label,
    ...(isExternal ? { href: link.url } : { to: link.url }),
    sub: link.sub ?? undefined,
  };
}

export async function fetchNavigation(): Promise<NavItem[]> {
  const data = await payloadFetch<PayloadNavigationGlobal>("/api/globals/navigation?depth=0", {
    revalidate: 120,
  });

  const links = data?.headerLinks?.length ? data.headerLinks : defaultHeaderLinks;
  return links.map(toNavItem);
}

export function getDefaultNavigation(): NavItem[] {
  return defaultHeaderLinks.map(toNavItem);
}
