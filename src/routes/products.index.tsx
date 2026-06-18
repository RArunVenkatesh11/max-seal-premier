import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  PRODUCT_FAMILIES,
  INDUSTRIES,
  MEDIA_TYPES,
  MATERIALS,
  CERTIFICATIONS,
  type ProductFamily,
} from "@/data/site";
import { PageHero } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { CtaBand } from "@/components/site/CtaBand";
import { useCompare } from "@/hooks/use-compare";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Butterfly Valve Catalogue | Max-Seal" },
      {
        name: "description",
        content:
          "Browse Max-Seal butterfly valves by type, industry, media, pressure, temperature, material, operation, and certification.",
      },
      { property: "og:title", content: "Butterfly Valve Catalogue | Max-Seal" },
      {
        property: "og:description",
        content:
          "Four engineered families. Filter by service conditions and add valves to a side-by-side comparison.",
      },
    ],
  }),
  component: ProductsIndex,
});

const VALVE_TYPES = [
  { value: "resilient-seated", label: "Resilient seated" },
  { value: "high-performance", label: "High performance" },
  { value: "triple-offset", label: "Triple offset" },
  { value: "pfa-lined", label: "PFA lined" },
] as const;

const PRESSURE_BUCKETS = [
  { value: "150", label: "150" },
  { value: "300", label: "300" },
  { value: "600", label: "600" },
  { value: "900", label: "900" },
  { value: "1500", label: "1500" },
  { value: "2500", label: "2500" },
] as const;

const TEMP_BUCKETS = [
  { value: "cryogenic", label: "Cryogenic" },
  { value: "low", label: "Low" },
  { value: "ambient", label: "Ambient" },
  { value: "elevated", label: "Elevated" },
  { value: "high", label: "High" },
] as const;

const APPLICATIONS = Array.from(
  new Set(PRODUCT_FAMILIES.flatMap((p) => p.applications)),
).sort();

const OPERATIONS = ["Manual lever", "Gear operator", "Pneumatic", "Electric"] as const;

type Filters = {
  q: string;
  valveType: string | null;
  industry: string | null;
  application: string | null;
  media: string | null;
  pressure: string | null;
  temperature: string | null;
  material: string | null;
  operation: string | null;
  certification: string | null;
};

const initialFilters: Filters = {
  q: "",
  valveType: null,
  industry: null,
  application: null,
  media: null,
  pressure: null,
  temperature: null,
  material: null,
  operation: null,
  certification: null,
};

function ProductsIndex() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [panelOpen, setPanelOpen] = useState(false);
  const { slugs, toggle } = useCompare();

  const filtered = useMemo(() => filterProducts(PRODUCT_FAMILIES, filters), [filters]);
  const activeCount = Object.entries(filters).filter(
    ([k, v]) => k !== "q" && v !== null,
  ).length + (filters.q ? 1 : 0);

  function reset() {
    setFilters(initialFilters);
  }

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  return (
    <>
      <PageHero
        eyebrow="Products / Catalogue"
        title={
          <>
            Four engineered platforms.
            <br />
            <span className="text-brand">Specified for the duty.</span>
          </>
        }
        lede="Filter by service conditions, browse the families, and add valves to a comparison. Every Max-Seal product is supported by US engineers."
      />

      <section className="border-b border-border bg-background">
        <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-5 lg:grid-cols-[1fr_auto_auto] lg:py-6">
          <label className="relative flex min-w-0 items-center">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={filters.q}
              onChange={(e) => update("q", e.target.value)}
              placeholder="Search by name, application, or material"
              className="h-11 w-full rounded-sm border border-border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-foreground"
            />
          </label>
          <div className="hidden gap-2 lg:flex">
            <Link
              to="/products/selector"
              className="inline-flex h-11 items-center rounded-sm border border-border px-4 font-display text-xs uppercase tracking-widest hover:bg-secondary"
            >
              Guided selector
            </Link>
            <Link
              to="/products/compare"
              className="inline-flex h-11 items-center rounded-sm border border-border px-4 font-display text-xs uppercase tracking-widest hover:bg-secondary"
            >
              Compare ({slugs.length})
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen((v) => !v)}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-sm border border-border px-3 font-display text-xs uppercase tracking-widest lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-sm bg-brand px-1 text-[0.65rem] text-brand-foreground">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[300px_1fr]">
          <aside
            className={cn(
              "space-y-7 lg:block",
              panelOpen ? "block" : "hidden",
            )}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="eyebrow">Filters</span>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1 font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Reset
                </button>
              )}
            </div>

            <FilterGroup
              label="Valve type"
              options={VALVE_TYPES}
              value={filters.valveType}
              onChange={(v) => update("valveType", v)}
            />
            <FilterGroup
              label="Industry"
              options={INDUSTRIES.map((i) => ({ value: i.slug, label: i.name }))}
              value={filters.industry}
              onChange={(v) => update("industry", v)}
            />
            <FilterGroup
              label="Application"
              options={APPLICATIONS.map((a) => ({ value: a, label: a }))}
              value={filters.application}
              onChange={(v) => update("application", v)}
            />
            <FilterGroup
              label="Media"
              options={MEDIA_TYPES.map((m) => ({ value: m, label: m }))}
              value={filters.media}
              onChange={(v) => update("media", v)}
            />
            <FilterGroup
              label="Pressure class"
              options={PRESSURE_BUCKETS}
              value={filters.pressure}
              onChange={(v) => update("pressure", v)}
            />
            <FilterGroup
              label="Temperature"
              options={TEMP_BUCKETS}
              value={filters.temperature}
              onChange={(v) => update("temperature", v)}
            />
            <FilterGroup
              label="Material"
              options={MATERIALS.map((m) => ({ value: m, label: m }))}
              value={filters.material}
              onChange={(v) => update("material", v)}
            />
            <FilterGroup
              label="Operation"
              options={OPERATIONS.map((o) => ({ value: o, label: o }))}
              value={filters.operation}
              onChange={(v) => update("operation", v)}
            />
            <FilterGroup
              label="Certification"
              options={CERTIFICATIONS.map((c) => ({ value: c, label: c }))}
              value={filters.certification}
              onChange={(v) => update("certification", v)}
            />
          </aside>

          <div>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="eyebrow">
                  {filtered.length} of {PRODUCT_FAMILIES.length} families
                </span>
                {activeCount > 0 && (
                  <span className="ml-3 font-display text-[0.7rem] uppercase tracking-widest text-brand">
                    {activeCount} filter{activeCount === 1 ? "" : "s"} active
                  </span>
                )}
              </div>
              <Link
                to="/products/compare"
                className="hidden font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground hover:text-foreground sm:inline"
              >
                Go to comparison →
              </Link>
            </div>

            {filtered.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-2">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.slug}
                    product={p}
                    selected={slugs.includes(p.slug)}
                    onToggleSelect={toggle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: string | null;
  onChange: (v: T | null) => void;
}) {
  return (
    <div>
      <div className="eyebrow">{label}</div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(active ? null : o.value)}
              className={cn(
                "rounded-sm border px-2.5 py-1.5 text-xs transition",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:bg-secondary",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-10 border border-dashed border-border bg-secondary/40 p-10 text-center">
      <div className="eyebrow">No matches</div>
      <h3 className="mt-3 font-display text-2xl text-foreground">
        Nothing in the catalogue matches those filters.
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Try removing a filter, or ask an engineer to scope a custom configuration.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest hover:bg-secondary"
        >
          Reset filters
        </button>
        <Link
          to="/contact"
          className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
        >
          Ask an engineer
        </Link>
      </div>
    </div>
  );
}

function filterProducts(items: ProductFamily[], f: Filters): ProductFamily[] {
  const q = f.q.trim().toLowerCase();
  return items.filter((p) => {
    if (q) {
      const haystack = [
        p.name,
        p.shortName,
        p.tagline,
        p.summary,
        ...p.applications,
        ...p.bodyMaterial,
        ...p.sealMaterial,
        ...p.mediaTypes,
        ...p.certifications,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.valveType && p.valveType !== f.valveType) return false;
    if (f.industry && !p.industries.includes(f.industry)) return false;
    if (f.application && !p.applications.includes(f.application)) return false;
    if (f.media && !p.mediaTypes.includes(f.media)) return false;
    if (
      f.pressure &&
      !p.pressureBuckets.includes(f.pressure as ProductFamily["pressureBuckets"][number])
    )
      return false;
    if (
      f.temperature &&
      !p.temperatureBuckets.includes(
        f.temperature as ProductFamily["temperatureBuckets"][number],
      )
    )
      return false;
    if (f.material && !p.bodyMaterial.includes(f.material)) return false;
    if (
      f.operation &&
      !p.operationTypes.includes(f.operation as ProductFamily["operationTypes"][number])
    )
      return false;
    if (f.certification && !p.certifications.includes(f.certification)) return false;
    return true;
  });
}
