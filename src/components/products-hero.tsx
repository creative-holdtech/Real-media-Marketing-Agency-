import type { ReactNode } from "react";

import productsHeroAmbient from "@/assets/products-hero-ambient.jpg";
import { heroStandfirst } from "@/components/framer-section";
import { HeroAmbientImage, ServicesHero } from "@/components/services-hero";

type ProductsHeroProps = {
  titleLines: string[];
  body: string;
  actions: ReactNode;
};

/**
 * Products hero — same Pattern A tokens as home
 * (FramerTag → rm-title-hero-lead → heroStandfirst → sectionHeroActionsRow).
 */
export function ProductsHero({ titleLines, body, actions }: ProductsHeroProps) {
  return (
    <div id="products-top">
      <ServicesHero
        tag="Products"
        titleLines={titleLines}
        body={body}
        bodyClassName={heroStandfirst}
        headingId="products-heading"
        sectionClassName="rm-products-hero bg-black"
        align="center"
        ambient={<HeroAmbientImage src={productsHeroAmbient} />}
        actions={actions}
      />
    </div>
  );
}
