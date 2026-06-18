import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Download, X } from "lucide-react";
import { PRODUCT_FAMILIES, INDUSTRIES, type ProductFamily } from "@/data/site";
import { PageHero } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useCompare } from "@/hooks/use-compare";

export const Route = createFileRoute("/products/compare")({
  head: () => ({
    meta: [
      { title: "Compare Butterfly Valve Families | Max-Seal" },
      {
        name: "description",
        content:
          "Compare Max-Seal resilient seated, high performance, triple offset, and PFA lined butterfly valves side by side.",
      },
      { property: "og:title", content: "Compare Butterfly Valve Families | Max-Seal" },
    ],
  }),
  component: ComparePage,
});

type Row = {
  label: string;
  render: (p: ProductFamily) => React.ReactNode;
};

const ROWS: Row[] = [
  { label: "Valve type", render: (p) => p.shortName },
  { label: "Best suited for", render: (p) => p.tagline },
  {
    label: "Typical industries",
    render: (p) => (
      <ul className="space-y-1 text-sm">
        {p.industries.map((slug) => {
          const i = INDUSTRIES.find((x) => x.slug === slug);
          return i ? (
            <li key={slug}>
              <Link to="/industries/$slug" params={{ slug }} className="hover:text-brand">
                {i.name}
              </Link>
            </li>
          ) : null;
        })}
      </ul>
    ),
  },
  {
    label: "Performance strengths",
    render: (p) => (
      <ul className="space-y-1 text-sm">
        {p.highlights.slice(0, 3).map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Media compatibility",
    render: (p) => p.mediaTypes.join(", "),
  },
  { label: "Temperature", render: (p) => p.temperatureRange },
  { label: "Pressure", render: (p) => p.pressureClass },
  { label: "Body materials", render: (p) => p.bodyMaterial.join(", ") },
  { label: "Seal materials", render: (p) => p.sealMaterial.join(", ") },
  { label: "Operation", render: (p) => p.operationTypes.join(", ") },
  { label: "Certifications", render: (p) => p.certifications.join(", ") },
  {
    label: "Maintenance considerations",
    render: (p) =>
      p.considerations.length > 0 ? (
        <ul className="space-y-1 text-sm">
          {p.considerations.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : (
        <span className="text-muted-foreground">Standard inline service intervals.</span>
      ),
  },
  {
    label: "Available downloads",
    render: (p) => (
      <ul className="space-y-1.5 text-sm">
        {p.downloads.map((d) => (
          <li key={d.label}>
            <a
              href={d.href}
              className="inline-flex items-center gap-1.5 text-foreground underline-offset-2 hover:text-brand hover:underline"
            >
              <Download className="h-3.5 w-3.5" />
              {d.label}
              <span className="font-display text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                {d.type}
              </span>
            </a>
          </li>
        ))}
      </ul>
    ),
  },
];

function ComparePage() {
  const { slugs, toggle, clear } = useCompare();

  const families = useMemo(() => {
    if (slugs.length === 0) return PRODUCT_FAMILIES;
    return PRODUCT_FAMILIES.filter((p) => slugs.includes(p.slug));
  }, [slugs]);

  const usingDefault = slugs.length === 0;

  return (
    <>
      <PageHero
        eyebrow="Compare families"
        title={
          <>
            Specifications,
            <br />
            <span className="text-brand">side by side.</span>
          </>
        }
        lede="A clean read of where each Max-Seal family fits. Add valves from the catalogue to narrow this view to your shortlist."
      />

      <div className="border-b border-border bg-background">
        <div className="container-page py-5">
          <Breadcrumbs
            items={[
              { label: "Products", to: "/products" },
              { label: "Compare" },
            ]}
          />
        </div>
      </div>

      <section className="bg-background py-10 md:py-14">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <span className="eyebrow">
                {usingDefault
                  ? `All ${PRODUCT_FAMILIES.length} families`
                  : `${families.length} selected`}
              </span>
              {!usingDefault && (
                <button
                  type="button"
                  onClick={clear}
                  className="ml-3 inline-flex items-center gap-1 font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
            </div>
            <Link
              to="/products"
              className="font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              ← Back to catalogue
            </Link>
          </div>

          {/* Mobile stacked cards */}
          <div className="mt-6 grid gap-5 md:hidden">
            {families.map((p) => (
              <article key={p.slug} className="border border-border bg-card">
                <header className="border-b border-border p-5">
                  <div className="eyebrow">{p.shortName}</div>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="mt-2 block font-display text-xl text-foreground hover:text-brand"
                  >
                    {p.name}
                  </Link>
                </header>
                <dl className="divide-y divide-border">
                  {ROWS.map((row) => (
                    <div key={row.label} className="grid grid-cols-[120px_1fr] gap-3 p-4 text-sm">
                      <dt className="font-display text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="text-foreground">{row.render(p)}</dd>
                    </div>
                  ))}
                </dl>
                {!usingDefault && (
                  <div className="border-t border-border p-4">
                    <button
                      type="button"
                      onClick={() => toggle(p.slug)}
                      className="w-full rounded-sm border border-border py-2 font-display text-[0.7rem] uppercase tracking-widest hover:bg-secondary"
                    >
                      Remove from comparison
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Desktop table */}
          <div className="mt-6 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[860px] border border-border text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="w-48 border-b border-border p-4 text-left font-display text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                    Specification
                  </th>
                  {families.map((p) => (
                    <th
                      key={p.slug}
                      className="border-b border-l border-border p-4 text-left align-bottom"
                    >
                      <div className="eyebrow">{p.valveType.replace(/-/g, " ")}</div>
                      <Link
                        to="/products/$slug"
                        params={{ slug: p.slug }}
                        className="mt-2 block font-display text-base text-foreground hover:text-brand"
                      >
                        {p.shortName}
                      </Link>
                      <div className="mt-1 text-xs font-normal text-muted-foreground">
                        {p.tagline}
                      </div>
                      {!usingDefault && (
                        <button
                          type="button"
                          onClick={() => toggle(p.slug)}
                          className="mt-3 inline-flex items-center gap-1 font-display text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                          Remove
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, idx) => (
                  <tr key={row.label} className={idx % 2 === 0 ? "bg-background" : "bg-secondary/40"}>
                    <th className="border-t border-border p-4 text-left align-top font-display text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {row.label}
                    </th>
                    {families.map((p) => (
                      <td
                        key={p.slug}
                        className="border-l border-t border-border p-4 align-top text-foreground"
                      >
                        {row.render(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-4 border border-border bg-card p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="eyebrow">Need help choosing?</div>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                A Max-Seal engineer can review your line conditions and confirm the right family
                for the service, with material certs and lead times in writing.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center rounded-sm border border-border px-5 font-display text-[0.7rem] uppercase tracking-widest hover:bg-secondary"
              >
                Ask an engineer
              </Link>
              <Link
                to="/request-a-quote"
                className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-[0.7rem] uppercase tracking-widest text-background hover:bg-foreground/90"
              >
                Request a quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
