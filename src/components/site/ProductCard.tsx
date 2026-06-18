import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ProductFamily } from "@/data/site";

export function ProductCard({ product }: { product: ProductFamily }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative flex flex-col border border-border bg-card p-8 transition hover:border-foreground"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {product.shortName}
        </span>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
      </div>
      <h3 className="mt-6 text-2xl leading-tight text-foreground">{product.name}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{product.tagline}</p>

      <dl className="mt-8 grid grid-cols-2 gap-y-3 border-t border-border pt-6 font-mono text-xs">
        <Row label="Size" value={product.sizeRange} />
        <Row label="Class" value={product.pressureClass} />
        <Row label="Temp" value={product.temperatureRange} />
        <Row label="Body" value={product.bodyMaterial[0]} />
      </dl>
    </Link>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-muted-foreground uppercase tracking-widest text-[0.65rem]">{label}</dt>
      <dd className="mt-1 truncate text-foreground">{value}</dd>
    </div>
  );
}
