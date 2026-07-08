import { motion, useReducedMotion } from "framer-motion";

import { ServicesCardDeckUnfold } from "@/components/services-card-deck-unfold";
import { MarketingTagColumn } from "@/components/marketing-section";
import {
  sectionContentGrid,
  sectionGap,
  sectionInner,
  sectionShell,
} from "@/components/framer-section";
import {
  ServicesIntroHeader,
  servicesScreenTwoItem,
  servicesScreenTwoStage,
} from "@/components/services-intro-header";
import type { ServiceContent } from "@/lib/services/types";
import { cn } from "@/lib/utils";

type ServicesSecondScreenProps = {
  services: ServiceContent[];
};

export function ServicesSecondScreen({ services }: ServicesSecondScreenProps) {
  const reduce = useReducedMotion();

  const stageProps = reduce
    ? {}
    : {
        variants: servicesScreenTwoStage,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.12, margin: "0px 0px -8% 0px" },
      };

  const StageTag = reduce ? "div" : motion.div;
  const ItemTag = reduce ? "div" : motion.div;

  return (
    <section
      id="services-disciplines"
      aria-labelledby="services-intro-heading"
      className={cn(sectionShell, "rm-services-intro-screen border-b-0 bg-black pt-0")}
    >
      <StageTag {...stageProps} className="rm-services-intro-screen__stage">
        <div className={cn(sectionInner, "flex flex-col", sectionGap)}>
          <ItemTag
            variants={reduce ? undefined : servicesScreenTwoItem}
            className={cn(sectionContentGrid, "items-start")}
          >
            <MarketingTagColumn tag="Six disciplines" />
            <div className="md:col-span-2 md:col-start-2">
              <ServicesIntroHeader />
            </div>
          </ItemTag>

          <ItemTag
            variants={reduce ? undefined : servicesScreenTwoItem}
            className="rm-services-intro-screen__cards"
          >
            <ServicesCardDeckUnfold services={services} variant="default" />
          </ItemTag>
        </div>
      </StageTag>
    </section>
  );
}
