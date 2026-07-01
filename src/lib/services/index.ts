import { brandService } from "./content/brand";
import { designService } from "./content/design";
import { performanceService } from "./content/performance";
import { prService } from "./content/pr";
import { seoService } from "./content/seo";
import { smmService } from "./content/smm";

export type {
  ServiceBlock,
  ServiceContent,
  ServiceProofCase,
  ServiceSection,
  ServiceSlug,
} from "./types";

export const services = {
  smm: smmService,
  pr: prService,
  performance: performanceService,
  seo: seoService,
  brand: brandService,
  design: designService,
} as const;

export const servicesList = [
  smmService,
  prService,
  performanceService,
  seoService,
  brandService,
  designService,
];

export function getService(slug: string) {
  return (services as Record<string, (typeof services)[keyof typeof services]>)[slug];
}

/** Card intro on /services — first hero paragraph */
export function serviceCardIntro(service: (typeof servicesList)[number]) {
  return service.hero.paragraphs[0] ?? "";
}
