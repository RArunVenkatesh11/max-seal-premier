import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import type { ProductFamily } from "@/data/site";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  selected = false,
  onToggleSelect,
  expandable = true,
}: {
  product: ProductFamily;
  selected?: boolean;
  onToggleSelect?: (slug: string) => void;
  expandable?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={cn(
        "group relative flex flex-col border bg-card transition",
        selected
          ? "border-brand shadow-elevated"
          : "border-border hover:border-foreground/60",
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 p-6 pb-4 sm:p-7 sm:pb-5">
        <div className="min-w-0">
          <div className="eyebrow">{product.shortName}</div>
          <h3 className="mt-3 font-display text-2xl leading-tight text-foreground">
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              className="hover:text-brand"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{product.tagline}</p>
        </div>
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          aria-label={`Open ${product.name}`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <dl className="grid grid-cols-2 gap-px border-y border-border bg-border text-xs sm:grid-cols-4">
        <Cell label="Size" value={product.sizeRange} />
        <Cell label="Class" value={product.pressureClass} />
        <Cell label="Temp" value={product.temperatureRange} />
        <Cell label="Body" value={product.bodyMaterial[0]} />
      </dl>

      {expandable && open && (
        <div className="border-b border-border bg-secondary/60 p-6 sm:p-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="eyebrow">Highlights</div>
              <ul className="mt-3 space-y-2 text-sm">
                {product.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex gap-2 text-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">Applications</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.applications.slice(0, 4).map((a) => (
                  <span
                    key={a}
                    className="rounded-sm border border-border bg-background px-2 py-1 text-xs text-foreground"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div className="eyebrow mt-5">Certifications</div>
              <div className="mt-2 font-display text-xs tracking-wide text-foreground/80">
                {product.certifications.join(" / ")}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 sm:p-5">
        {onToggleSelect ? (
          <label className="flex min-w-0 cursor-pointer items-center gap-2 font-display text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
            <span
              className={cn(
                "grid h-4 w-4 place-items-center rounded-[2px] border transition",
                selected
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-background",
              )}
            >
              {selected && <Check className="h-3 w-3" />}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={selected}
              onChange={() => onToggleSelect(product.slug)}
            />
            <span className="truncate">{selected ? "In comparison" : "Add to compare"}</span>
          </label>
        ) : (
          <span className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            {product.certifications[0]}
          </span>
        )}

        <div className="flex shrink-0 items-center gap-1.5">
          {expandable && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 items-center gap-1.5 rounded-sm border border-border px-3 font-display text-[0.7rem] uppercase tracking-widest text-foreground hover:bg-secondary"
            >
              {open ? "Hide" : "Quick view"}
              <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} />
            </button>
          )}
          <Link
            to="/request-a-quote"
            className="inline-flex h-9 items-center rounded-sm bg-foreground px-3 font-display text-[0.7rem] uppercase tracking-widest text-background hover:bg-foreground/90"
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <div className="font-display text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 font-display text-sm text-foreground">{value}</div>
    </div>
  );
}
