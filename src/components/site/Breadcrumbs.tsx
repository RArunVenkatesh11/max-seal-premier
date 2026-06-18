import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items, invert = false }: { items: Crumb[]; invert?: boolean }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-x-2 font-display text-[0.7rem] uppercase tracking-[0.22em]",
        invert ? "text-white/55" : "text-muted-foreground",
      )}
    >
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="flex items-center gap-2">
            {c.to && !isLast ? (
              <Link
                to={c.to}
                className={cn(
                  "transition-colors",
                  invert ? "hover:text-white" : "hover:text-foreground",
                )}
              >
                {c.label}
              </Link>
            ) : (
              <span className={invert ? "text-white" : "text-foreground"}>{c.label}</span>
            )}
            {!isLast && <span className="opacity-40">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
