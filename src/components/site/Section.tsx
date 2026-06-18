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
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <section className="cinematic relative overflow-hidden">
      <div className="grid-precision absolute inset-0 opacity-60" />
      <div className="container-page relative py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="eyebrow text-white/60">{eyebrow}</div>
          <h1 className="mt-4 text-4xl leading-[1.05] text-white md:text-6xl">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">{lede}</p>}
        </div>
      </div>
      <div className="hairline bg-line" />
    </section>
  );
}
