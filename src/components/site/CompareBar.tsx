import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useCompare } from "@/hooks/use-compare";
import { PRODUCT_FAMILIES } from "@/data/site";

export function CompareBar() {
  const { slugs, remove, clear } = useCompare();
  if (slugs.length === 0) return null;
  const items = slugs
    .map((s) => PRODUCT_FAMILIES.find((p) => p.slug === s))
    .filter((p): p is (typeof PRODUCT_FAMILIES)[number] => Boolean(p));

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="container-page pointer-events-auto rounded-sm border border-line bg-ink/95 px-4 py-3 text-white shadow-elevated backdrop-blur-md sm:px-5">
        <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto] sm:gap-6">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-white/55">
              Compare
            </span>
            <span className="font-display text-[0.7rem] tracking-widest text-brand">
              {items.length}/4
            </span>
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {items.map((p) => (
                <span
                  key={p.slug}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-white/15 bg-white/5 px-2 py-1 text-xs"
                >
                  <span className="truncate">{p.shortName}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${p.shortName} from comparison`}
                    onClick={() => remove(p.slug)}
                    className="grid h-4 w-4 place-items-center rounded-full hover:bg-white/15"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-self-end">
            <button
              type="button"
              onClick={clear}
              className="rounded-sm px-3 py-2 text-xs uppercase tracking-widest text-white/55 hover:text-white"
            >
              Clear
            </button>
            <Link
              to="/products/compare"
              className="inline-flex h-9 items-center rounded-sm bg-brand px-4 font-display text-xs uppercase tracking-widest text-brand-foreground hover:bg-brand/90"
            >
              Compare now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
