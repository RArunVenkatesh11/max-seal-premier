import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Lock, Search, X } from "lucide-react";
import {
  RESOURCES,
  PRODUCT_FAMILIES,
  INDUSTRIES,
  FAQS,
  type ResourceDoc,
} from "@/data/site";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources and Downloads | Max-Seal" },
      {
        name: "description",
        content:
          "Search and filter Max-Seal catalogues, datasheets, installation guides, maintenance manuals, and technical drawings.",
      },
      { property: "og:title", content: "Resources and Downloads | Max-Seal" },
    ],
  }),
  component: ResourcesPage,
});

const CATEGORIES = [
  "All",
  "Catalog",
  "Datasheet",
  "Installation",
  "Maintenance",
  "Technical",
  "Brochure",
] as const;

const FILE_TYPES = ["All", "PDF", "DWG", "STEP"] as const;

type Filters = {
  q: string;
  category: (typeof CATEGORIES)[number];
  fileType: (typeof FILE_TYPES)[number];
  product: string | "all";
  industry: string | "all";
};

const initial: Filters = {
  q: "",
  category: "All",
  fileType: "All",
  product: "all",
  industry: "all",
};

function ResourcesPage() {
  const [f, setF] = useState<Filters>(initial);

  const items = useMemo(() => applyFilters(RESOURCES, f), [f]);

  const activeFilterCount =
    (f.q ? 1 : 0) +
    (f.category !== "All" ? 1 : 0) +
    (f.fileType !== "All" ? 1 : 0) +
    (f.product !== "all" ? 1 : 0) +
    (f.industry !== "all" ? 1 : 0);

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    setF((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <PageHero
        eyebrow="Resources and downloads"
        title={
          <>
            Documents
            <br />
            <span className="text-brand">engineered for spec sheets.</span>
          </>
        }
        lede="Catalogues, datasheets, certifications, drawings, and installation manuals. Filter by product, industry, or document type."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-7">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={f.q}
                onChange={(e) => update("q", e.target.value)}
                placeholder="Search documents"
                className="h-11 w-full rounded-sm border border-border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-foreground"
              />
            </label>

            <ChipGroup
              label="Document type"
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
              value={f.category}
              onChange={(v) => update("category", v as Filters["category"])}
            />
            <ChipGroup
              label="File type"
              options={FILE_TYPES.map((t) => ({ value: t, label: t }))}
              value={f.fileType}
              onChange={(v) => update("fileType", v as Filters["fileType"])}
            />
            <ChipGroup
              label="Product family"
              options={[
                { value: "all", label: "All" },
                ...PRODUCT_FAMILIES.map((p) => ({ value: p.slug, label: p.shortName })),
              ]}
              value={f.product}
              onChange={(v) => update("product", v)}
            />
            <ChipGroup
              label="Industry"
              options={[
                { value: "all", label: "All" },
                ...INDUSTRIES.map((i) => ({ value: i.slug, label: i.name })),
              ]}
              value={f.industry}
              onChange={(v) => update("industry", v)}
            />

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={() => setF(initial)}
                className="inline-flex items-center gap-1 font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Reset all
              </button>
            )}
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <span className="eyebrow">
                {items.length} of {RESOURCES.length} documents
              </span>
              {activeFilterCount > 0 && (
                <span className="font-display text-[0.7rem] uppercase tracking-widest text-brand">
                  {activeFilterCount} filter{activeFilterCount === 1 ? "" : "s"} active
                </span>
              )}
            </div>

            {items.length === 0 ? (
              <div className="mt-8 border border-dashed border-border bg-secondary/40 p-10 text-center">
                <div className="eyebrow">No matches</div>
                <h3 className="mt-3 font-display text-2xl text-foreground">
                  Nothing in the library matches those filters.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reset the filters, or ask an engineer to send the document you need.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setF(initial)}
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
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {items.map((r) => (
                  <article
                    key={r.title}
                    className="group flex flex-col justify-between border border-border bg-card p-6 transition hover:border-foreground/60"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="eyebrow">{r.category}</span>
                        {r.gated && (
                          <span className="inline-flex items-center gap-1 rounded-sm border border-brand/40 px-2 py-0.5 font-display text-[0.6rem] uppercase tracking-widest text-brand">
                            <Lock className="h-3 w-3" /> Gated
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 font-display text-lg text-foreground">{r.title}</h3>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {r.productSlugs.slice(0, 2).map((s) => {
                          const p = PRODUCT_FAMILIES.find((x) => x.slug === s);
                          return p ? (
                            <span
                              key={s}
                              className="rounded-sm border border-border px-2 py-1 text-muted-foreground"
                            >
                              {p.shortName}
                            </span>
                          ) : null;
                        })}
                        {r.industrySlugs.slice(0, 2).map((s) => {
                          const i = INDUSTRIES.find((x) => x.slug === s);
                          return i ? (
                            <span
                              key={s}
                              className="rounded-sm bg-foreground/5 px-2 py-1 text-foreground"
                            >
                              {i.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border pt-4">
                      <div className="flex min-w-0 items-center gap-3 font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                        <span>{r.type}</span>
                        <span className="opacity-50">·</span>
                        <span>{r.size}</span>
                      </div>
                      <a
                        href={r.href}
                        className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-foreground px-3 font-display text-[0.7rem] uppercase tracking-widest text-background hover:bg-foreground/90"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {r.gated ? "Request" : "Download"}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Frequently asked"
          title="Engineering questions, plainly answered."
        />
        <dl className="mt-12 divide-y divide-border border-y border-border">
          {FAQS.map((faq) => (
            <div key={faq.q} className="grid gap-4 py-6 md:grid-cols-[1fr_2fr]">
              <dt className="font-display text-lg text-foreground">{faq.q}</dt>
              <dd className="text-muted-foreground">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand />
    </>
  );
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
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
              onClick={() => onChange(o.value)}
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

function applyFilters(items: ResourceDoc[], f: Filters): ResourceDoc[] {
  const q = f.q.trim().toLowerCase();
  return items.filter((r) => {
    if (q && !r.title.toLowerCase().includes(q)) return false;
    if (f.category !== "All" && r.category !== f.category) return false;
    if (f.fileType !== "All" && r.type !== f.fileType) return false;
    if (f.product !== "all" && !r.productSlugs.includes(f.product)) return false;
    if (f.industry !== "all" && !r.industrySlugs.includes(f.industry)) return false;
    return true;
  });
}
