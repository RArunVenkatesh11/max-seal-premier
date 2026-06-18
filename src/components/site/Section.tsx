import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "muted";
}) {
  return (
    <section
      className={cn(
        "py-20 md:py-28",
        tone === "dark" && "cinematic",
        tone === "muted" && "bg-secondary",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <div className={cn("eyebrow", invert && "text-white/60")}>{eyebrow}</div>
      )}
      <h2
        className={cn(
          "mt-3 text-3xl leading-[1.05] md:text-5xl",
          invert ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 text-base md:text-lg",
            invert ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="cinematic relative isolate overflow-hidden">
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt ?? ""}
            aria-hidden={!imageAlt}
            loading="eager"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(100deg, oklch(0.13 0.005 60 / 0.92) 0%, oklch(0.13 0.005 60 / 0.65) 55%, oklch(0.13 0.005 60 / 0.35) 100%)",
            }}
          />
        </>
      )}
      <div className="grid-precision absolute inset-0 opacity-60" />
      <div className="container-page relative aspect-[16/9] flex flex-col justify-center py-20 md:aspect-auto md:py-28 md:min-h-[420px]">
        <div className="max-w-3xl">
          <div className="eyebrow text-white/60">{eyebrow}</div>
          <h1 className="mt-4 text-4xl leading-[1.05] text-white md:text-6xl">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">{lede}</p>}
          {children}
        </div>
      </div>
      <div className="hairline bg-line" />
    </section>
  );
}
