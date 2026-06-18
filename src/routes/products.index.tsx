import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Wrench,
  Factory,
  Layers,
  Compass,
  GitCompare,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Butterfly Valve Catalogue | Max-Seal" },
      {
        name: "description",
        content:
          "Discover Max-Seal butterfly valves by type, industry, or application. Guided selector, side-by-side compare, and engineer support.",
      },
      { property: "og:title", content: "Butterfly Valve Catalogue | Max-Seal" },
      {
        property: "og:description",
        content: "Find the right butterfly valve in three clicks. Engineer support on every choice.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
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

const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "most-used", label: "Most used" },
  { value: "high-performance", label: "High performance" },
  { value: "maintenance-friendly", label: "Maintenance friendly" },
] as const;

type SortKey = (typeof SORTS)[number]["value"];

type Intent = "type" | "industry" | "application" | "help" | "compare";

type Filters = {
  q: string;
  valveType: string | null;
  industry: string | null;
  application: string | null;
  operation: string | null;
  // advanced
  media: string | null;
  pressure: string | null;
  temperature: string | null;
  material: string | null;
  certification: string | null;
};

const initialFilters: Filters = {
  q: "",
  valveType: null,
  industry: null,
  application: null,
  operation: null,
  media: null,
  pressure: null,
  temperature: null,
  material: null,
  certification: null,
};

const FILTER_LABELS: Record<keyof Filters, string> = {
  q: "Search",
  valveType: "Valve",
  industry: "Industry",
  application: "Application",
  operation: "Operation",
  media: "Media",
  pressure: "Class",
  temperature: "Temp",
  material: "Material",
  certification: "Cert",
};

const INTENTS: { id: Intent; label: string; helper: string; icon: typeof Wrench }[] = [
  { id: "type", label: "I know the valve type", helper: "Browse by family", icon: Wrench },
  { id: "industry", label: "I know the industry", helper: "Filter by service", icon: Factory },
  { id: "application", label: "I know the application", helper: "Match to duty", icon: Layers },
  { id: "help", label: "I need help choosing", helper: "Guided selector", icon: Compass },
  { id: "compare", label: "Compare products", helper: "Side by side", icon: GitCompare },
];

function ProductsIndex() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [intent, setIntent] = useState<Intent | null>(null);
  const { slugs, toggle } = useCompare();

  const filtered = useMemo(() => {
    const items = filterProducts(PRODUCT_FAMILIES, filters);
    return sortProducts(items, sort);
  }, [filters, sort]);

  const chips = useMemo(() => activeChips(filters), [filters]);

  function reset() {
    setFilters(initialFilters);
  }
  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((f) => ({ ...f, [key]: value }));
  }
  function clearChip(key: keyof Filters) {
    update(key, (key === "q" ? "" : null) as Filters[typeof key]);
  }

  function pickIntent(id: Intent) {
    setIntent(id);
    if (id === "help") {
      window.location.href = "/products/selector";
      return;
    }
    if (id === "compare") {
      window.location.href = "/products/compare";
      return;
    }
    // scroll to filters area
    setTimeout(() => {
      document.getElementById("discover")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title={
          <>
            Find the right valve
            <br />
            <span className="text-brand">in three clicks.</span>
          </>
        }
        lede="Start where you are. Pick a valve type, an industry, or an application. If you are unsure, an engineer will help you scope the duty."
      />

      {/* Intent selector */}
      <section className="border-b border-border bg-background">
        <div className="container-page py-8 md:py-10">
          <div className="eyebrow">Where would you like to start</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {INTENTS.map((it) => {
              const Icon = it.icon;
              const active = intent === it.id;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => pickIntent(it.id)}
                  className={cn(
                    "group flex items-start gap-3 border bg-card p-4 text-left transition",
                    active
                      ? "border-brand shadow-elevated"
                      : "border-border hover:border-foreground/60",
                  )}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-border bg-background text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-sm leading-tight text-foreground">
                      {it.label}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{it.helper}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Simple filter bar */}
      <section id="discover" className="border-b border-border bg-secondary/40">
        <div className="container-page py-6">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
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
                className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-4 font-display text-xs uppercase tracking-widest hover:bg-secondary"
              >
                Guided selector
              </Link>
              <Link
                to="/products/compare"
                className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-4 font-display text-xs uppercase tracking-widest hover:bg-secondary"
              >
                Compare ({slugs.length})
              </Link>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            <SelectFilter
              label="Valve type"
              value={filters.valveType}
              onChange={(v) => update("valveType", v)}
              options={VALVE_TYPES}
            />
            <SelectFilter
              label="Industry"
              value={filters.industry}
              onChange={(v) => update("industry", v)}
              options={INDUSTRIES.map((i) => ({ value: i.slug, label: i.name }))}
            />
            <SelectFilter
              label="Application"
              value={filters.application}
              onChange={(v) => update("application", v)}
              options={APPLICATIONS.map((a) => ({ value: a, label: a }))}
            />
            <SelectFilter
              label="Operation"
              value={filters.operation}
              onChange={(v) => update("operation", v)}
              options={OPERATIONS.map((o) => ({ value: o, label: o }))}
            />
            <AdvancedTrigger
              open={advancedOpen}
              onOpenChange={setAdvancedOpen}
              filters={filters}
              update={update}
            />
          </div>

          {/* Chips */}
          {chips.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="eyebrow">Active</span>
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => clearChip(c.key)}
                  className="group inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1 font-display text-[0.7rem] uppercase tracking-widest text-foreground hover:border-foreground"
                >
                  <span className="text-muted-foreground">{FILTER_LABELS[c.key]}:</span>
                  <span>{c.label}</span>
                  <X className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
                </button>
              ))}
              <button
                type="button"
                onClick={reset}
                className="ml-1 font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="bg-background py-10 md:py-14">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="eyebrow">Results</div>
              <h2 className="mt-1 font-display text-2xl text-foreground">
                {filtered.length} matching {filtered.length === 1 ? "family" : "families"}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                Sort
              </label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-10 appearance-none rounded-sm border border-border bg-background pl-3 pr-8 font-display text-xs uppercase tracking-widest text-foreground outline-none hover:border-foreground"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState onReset={reset} />
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
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

          {/* Guided help */}
          <div className="mt-12 grid gap-6 border border-border bg-secondary/40 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center md:p-8">
            <span className="grid h-12 w-12 place-items-center rounded-sm border border-border bg-background text-brand">
              <HelpCircle className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl text-foreground">
                Not sure which valve fits your application?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Answer six short questions or talk directly to a Max-Seal engineer.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/products/selector"
                className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
              >
                Use product selector
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest hover:bg-secondary"
              >
                Ask an engineer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function SelectFilter<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | null;
  onChange: (v: T | null) => void;
  options: readonly { value: T; label: string }[];
}) {
  return (
    <div className="relative">
      <label className="pointer-events-none absolute left-3 top-1.5 font-display text-[0.55rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange((e.target.value || null) as T | null)}
        className={cn(
          "h-14 w-full appearance-none rounded-sm border bg-background pl-3 pr-8 pt-4 font-display text-xs uppercase tracking-widest text-foreground outline-none transition",
          value ? "border-brand" : "border-border hover:border-foreground/60",
        )}
      >
        <option value="">Any</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function AdvancedTrigger({
  open,
  onOpenChange,
  filters,
  update,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  filters: Filters;
  update: <K extends keyof Filters>(k: K, v: Filters[K]) => void;
}) {
  const count = [
    filters.media,
    filters.pressure,
    filters.temperature,
    filters.material,
    filters.certification,
  ].filter(Boolean).length;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex h-14 items-center justify-between gap-2 rounded-sm border border-border bg-background px-4 font-display text-xs uppercase tracking-widest text-foreground transition hover:border-foreground/60"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Advanced filters
          </span>
          {count > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-sm bg-brand px-1 text-[0.65rem] text-brand-foreground">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Advanced filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-7">
          <PillGroup
            label="Media type"
            options={MEDIA_TYPES.map((m) => ({ value: m, label: m }))}
            value={filters.media}
            onChange={(v) => update("media", v)}
          />
          <PillGroup
            label="Pressure class"
            options={PRESSURE_BUCKETS}
            value={filters.pressure}
            onChange={(v) => update("pressure", v)}
          />
          <PillGroup
            label="Temperature range"
            options={TEMP_BUCKETS}
            value={filters.temperature}
            onChange={(v) => update("temperature", v)}
          />
          <PillGroup
            label="Material"
            options={MATERIALS.map((m) => ({ value: m, label: m }))}
            value={filters.material}
            onChange={(v) => update("material", v)}
          />
          <PillGroup
            label="Certification or standard"
            options={CERTIFICATIONS.map((c) => ({ value: c, label: c }))}
            value={filters.certification}
            onChange={(v) => update("certification", v)}
          />
        </div>
        <div className="sticky bottom-0 mt-8 flex gap-2 border-t border-border bg-background py-4">
          <button
            type="button"
            onClick={() => {
              update("media", null);
              update("pressure", null);
              update("temperature", null);
              update("material", null);
              update("certification", null);
            }}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-sm border border-border px-4 font-display text-xs uppercase tracking-widest hover:bg-secondary"
          >
            Reset advanced
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-sm bg-foreground px-4 font-display text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
          >
            Show results
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function PillGroup<T extends string>({
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

function activeChips(f: Filters): { key: keyof Filters; label: string }[] {
  const chips: { key: keyof Filters; label: string }[] = [];
  if (f.q) chips.push({ key: "q", label: f.q });
  if (f.valveType) {
    const v = VALVE_TYPES.find((x) => x.value === f.valveType);
    chips.push({ key: "valveType", label: v?.label ?? f.valveType });
  }
  if (f.industry) {
    const v = INDUSTRIES.find((i) => i.slug === f.industry);
    chips.push({ key: "industry", label: v?.name ?? f.industry });
  }
  if (f.application) chips.push({ key: "application", label: f.application });
  if (f.operation) chips.push({ key: "operation", label: f.operation });
  if (f.media) chips.push({ key: "media", label: f.media });
  if (f.pressure) chips.push({ key: "pressure", label: `Class ${f.pressure}` });
  if (f.temperature) {
    const v = TEMP_BUCKETS.find((x) => x.value === f.temperature);
    chips.push({ key: "temperature", label: v?.label ?? f.temperature });
  }
  if (f.material) chips.push({ key: "material", label: f.material });
  if (f.certification) chips.push({ key: "certification", label: f.certification });
  return chips;
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

function sortProducts(items: ProductFamily[], key: SortKey): ProductFamily[] {
  const arr = [...items];
  switch (key) {
    case "most-used":
      return arr.sort((a, b) => b.applications.length - a.applications.length);
    case "high-performance":
      return arr.sort((a, b) => b.pressureBuckets.length - a.pressureBuckets.length);
    case "maintenance-friendly":
      // resilient seated and high-performance score higher
      return arr.sort(
        (a, b) => maintScore(b.valveType) - maintScore(a.valveType),
      );
    case "recommended":
    default:
      return arr.sort((a, b) => recScore(b) - recScore(a));
  }
}

function maintScore(v: ProductFamily["valveType"]): number {
  return v === "resilient-seated" ? 3 : v === "high-performance" ? 2 : v === "pfa-lined" ? 1 : 0;
}
function recScore(p: ProductFamily): number {
  return p.applications.length + p.industries.length + p.certifications.length;
}
