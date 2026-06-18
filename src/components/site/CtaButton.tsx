import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "brand" | "primary" | "ghost" | "ghost-invert";

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-sm px-6 text-sm font-medium transition";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-brand-foreground hover:bg-brand/90",
  primary: "bg-foreground text-background hover:bg-foreground/90",
  ghost: "border border-border bg-transparent text-foreground hover:bg-secondary",
  "ghost-invert": "border border-white/25 bg-transparent text-white hover:bg-white/10",
};

export function CtaButton({
  to,
  href,
  variant = "primary",
  children,
  className,
  showArrow = true,
}: {
  to?: string;
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}) {
  const cls = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowRight className="h-4 w-4" />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {content}
    </a>
  );
}
