import { cn } from "@/lib/utils";
import { HOME_IMAGES } from "@/data/site";
import type { ReactNode } from "react";

/* ============================================================
   Reusable image system. All placeholders share consistent
   aspect ratios so cards align and pages feel premium.
   ============================================================ */

type Ratio = "16/9" | "4/3" | "3/2" | "1/1";

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
};

type MediaProps = {
  src: string;
  alt: string;
  ratio?: Ratio;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  label?: string;
  overlay?: "none" | "soft" | "graphite";
  children?: ReactNode;
};

export function Media({
  src,
  alt,
  ratio = "16/9",
  className,
  imgClassName,
  eager,
  label,
  overlay = "soft",
  children,
}: MediaProps) {
  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden bg-ink",
        ratioClass[ratio],
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition duration-700 ease-out",
          imgClassName,
        )}
      />
      {overlay !== "none" && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              overlay === "graphite"
                ? "linear-gradient(180deg, oklch(0.13 0.005 60 / 0.55) 0%, oklch(0.13 0.005 60 / 0.15) 50%, oklch(0.13 0.005 60 / 0.75) 100%)"
                : "linear-gradient(180deg, oklch(0.13 0.005 60 / 0.10) 0%, oklch(0.13 0.005 60 / 0.35) 100%)",
          }}
        />
      )}
      {label && (
        <span className="absolute left-3 top-3 inline-flex items-center rounded-sm bg-ink/70 px-2 py-1 font-display text-[0.6rem] uppercase tracking-[0.2em] text-white/85 backdrop-blur">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

/* ============================================================
   Aspect-ratio shorthands
   ============================================================ */
export const HeroMedia = (p: Omit<MediaProps, "ratio">) => (
  <Media ratio="16/9" overlay="graphite" {...p} />
);
export const CardMedia = (p: Omit<MediaProps, "ratio">) => (
  <Media ratio="4/3" {...p} />
);
export const StoryMedia = (p: Omit<MediaProps, "ratio">) => (
  <Media ratio="16/9" overlay="none" {...p} />
);
export const PostcardMedia = (p: Omit<MediaProps, "ratio">) => (
  <Media ratio="3/2" {...p} />
);
export const TechnicalThumb = (p: Omit<MediaProps, "ratio">) => (
  <Media ratio="1/1" overlay="none" {...p} />
);

/* ============================================================
   Resolvers — pick a premium industrial image for a given
   product family or industry. CMS can replace these later.
   ============================================================ */
const VALVE_IMG: Record<string, string> = {
  "resilient-seated": HOME_IMAGES.valveCloseup,
  "high-performance": HOME_IMAGES.pipelineDark,
  "triple-offset": HOME_IMAGES.engineeringDrawing,
  "pfa-lined": HOME_IMAGES.chemPlant,
  awwa: HOME_IMAGES.waterPlant,
  cryogenic: HOME_IMAGES.steelTexture,
  automation: HOME_IMAGES.manufacturing,
};

export function productImage(product: {
  slug: string;
  valveType?: string;
  category?: string;
}): string {
  if (product.slug.includes("iso")) return HOME_IMAGES.manufacturing;
  if (product.slug.includes("hi-tek")) return HOME_IMAGES.inspection;
  if (product.slug.includes("tri-max")) return HOME_IMAGES.engineeringDrawing;
  if (product.slug.includes("z-tek")) return HOME_IMAGES.pipelineDark;
  if (product.slug.includes("awwa")) return HOME_IMAGES.waterPlant;
  if (product.slug.includes("cryo")) return HOME_IMAGES.steelTexture;
  if (product.slug.includes("automation") || product.slug.includes("actuator"))
    return HOME_IMAGES.manufacturing;
  if (product.valveType && VALVE_IMG[product.valveType]) return VALVE_IMG[product.valveType];
  return HOME_IMAGES.valveCloseup;
}

const INDUSTRY_IMG: Record<string, string> = {
  "water-and-wastewater": HOME_IMAGES.waterPlant,
  "chemical-processing": HOME_IMAGES.chemPlant,
  "oil-and-gas": HOME_IMAGES.oilGas,
  power: HOME_IMAGES.powerPlant,
  "food-and-beverage": HOME_IMAGES.foodBev,
  mining: HOME_IMAGES.mining,
};

export function industryImage(slug: string): string {
  return INDUSTRY_IMG[slug] ?? HOME_IMAGES.facility;
}
