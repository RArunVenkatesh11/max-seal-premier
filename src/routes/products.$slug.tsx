import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Download } from "lucide-react";
import { PRODUCT_FAMILIES, INDUSTRIES, RESOURCES } from "@/data/site";
import { CtaButton } from "@/components/site/CtaButton";
import { CtaBand } from "@/components/site/CtaBand";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useCompare } from "@/hooks/use-compare";
import { Media, productImage } from "@/components/site/Media";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCT_FAMILIES.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.product.seo.title },
          { name: "description", content: loaderData.product.seo.description },
          { property: "og:title", content: loaderData.product.seo.title },
          { property: "og:description", content: loaderData.product.seo.description },
        ]
      : [],
  }),
  component: ProductDetail,
});

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "applications", label: "Applications" },
  { id: "materials", label: "Materials" },
  { id: "sizes", label: "Sizes & Pressure" },
  { id: "operation", label: "Operation" },
  { id: "downloads", label: "Downloads" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { slugs, toggle } = useCompare();
  const selected = slugs.includes(product.slug);
  const [tab, setTab] = useState<TabId>("overview");

  const relatedIndustries = INDUSTRIES.filter((i) =>
    i.recommendedFamilies.includes(product.slug),
  );
  const related = PRODUCT_FAMILIES.filter((p) => p.slug !== product.slug).slice(0, 3);
  const docs = RESOURCES.filter((r) => r.productSlugs.includes(product.slug));

  return (
    <>
      <section className="cinematic relative overflow-hidden">
        <div className="grid-precision absolute inset-0 opacity-50" />
        <div className="container-page relative py-16 md:py-24">
          <Breadcrumbs
            invert
            items={[
              { label: "Products", to: "/products" },
              { label: product.shortName },
            ]}
          />
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="eyebrow text-white/55">{product.valveType.replace(/-/g, " ")}</div>
              <h1 className="mt-3 font-display text-4xl leading-[1.05] text-white md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-white/70">{product.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaButton to="/request-a-quote" variant="brand">
                  Request a Quote
                </CtaButton>
                <CtaButton to="/contact" variant="ghost-invert">
                  Ask an Engineer
                </CtaButton>
                <button
                  type="button"
                  onClick={() => toggle(product.slug)}
                  className={cn(
                    "inline-flex h-12 items-center gap-2 rounded-sm border px-5 font-display text-xs uppercase tracking-widest transition",
                    selected
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-white/25 text-white hover:bg-white/10",
                  )}
                >
                  {selected ? "In comparison" : "Add to compare"}
                </button>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-px border border-white/10 bg-white/5 font-display text-xs">
              <Spec label="Size" value={product.sizeRange} />
              <Spec label="Pressure" value={product.pressureClass} />
              <Spec label="Temperature" value={product.temperatureRange} />
              <Spec label="Body" value={product.bodyMaterial[0]} />
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-14 py-14 md:py-20 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <div className="overflow-x-auto border-b border-border">
              <div role="tablist" className="flex min-w-max gap-1">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "border-b-2 px-4 py-3 font-display text-xs uppercase tracking-widest transition",
                      tab === t.id
                        ? "border-brand text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 min-h-[260px]">
              {tab === "overview" && (
                <div>
                  <div className="eyebrow">Overview</div>
                  <p className="mt-4 text-xl leading-relaxed text-foreground md:text-2xl">
                    {product.summary}
                  </p>
                  <div className="mt-10 grid gap-px bg-border sm:grid-cols-3">
                    {product.certifications.map((c: string) => (
                      <div key={c} className="bg-card p-5">
                        <div className="eyebrow">Certified</div>
                        <div className="mt-2 font-display text-sm text-foreground">{c}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "features" && (
                <div>
                  <div className="eyebrow">Engineering highlights</div>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {product.highlights.map((h: string) => (
                      <li
                        key={h}
                        className="flex gap-3 border-l-2 border-brand bg-secondary/40 p-4 text-sm text-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  {product.considerations.length > 0 && (
                    <div className="mt-10">
                      <div className="eyebrow">Considerations</div>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {product.considerations.map((c: string) => (
                          <li key={c} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {tab === "applications" && (
                <div>
                  <div className="eyebrow">Typical applications</div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.applications.map((a: string) => (
                      <span
                        key={a}
                        className="rounded-sm border border-border bg-card px-3 py-1.5 text-sm"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <div className="mt-10">
                    <div className="eyebrow">Common media</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.mediaTypes.map((m: string) => (
                        <span
                          key={m}
                          className="rounded-sm bg-foreground/5 px-3 py-1.5 text-sm text-foreground"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === "materials" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <Block label="Body" value={product.bodyMaterial.join(", ")} />
                  <Block label="Seal" value={product.sealMaterial.join(", ")} />
                </div>
              )}

              {tab === "sizes" && (
                <div className="grid gap-6 sm:grid-cols-3">
                  <Block label="Size range" value={product.sizeRange} />
                  <Block label="Pressure class" value={product.pressureClass} />
                  <Block label="Temperature" value={product.temperatureRange} />
                </div>
              )}

              {tab === "operation" && (
                <div>
                  <div className="eyebrow">Operation options</div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {product.operationTypes.map((o: string) => (
                      <li
                        key={o}
                        className="border border-border bg-card p-4 font-display text-sm text-foreground"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Actuator sizing includes safety factor on required torque. Position feedback,
                    fail-safe spring return, and SIL capable packages are available on request.
                  </p>
                </div>
              )}

              {tab === "downloads" && (
                <div>
                  <div className="eyebrow">Documents</div>
                  <ul className="mt-6 divide-y divide-border border border-border">
                    {docs.map((d) => (
                      <li key={d.title}>
                        <a
                          href={d.href}
                          className="group grid grid-cols-[1fr_auto] items-center gap-4 p-4 transition hover:bg-secondary sm:grid-cols-[1fr_120px_80px_auto]"
                        >
                          <div className="min-w-0">
                            <div className="eyebrow">{d.category}</div>
                            <div className="mt-1 truncate text-sm font-medium text-foreground">
                              {d.title}
                            </div>
                          </div>
                          <div className="hidden font-display text-xs text-muted-foreground sm:block">
                            {d.type}
                          </div>
                          <div className="hidden font-display text-xs text-muted-foreground sm:block">
                            {d.size}
                          </div>
                          <Download className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                        </a>
                      </li>
                    ))}
                    {docs.length === 0 && (
                      <li className="p-6 text-sm text-muted-foreground">
                        Datasheets and drawings available on request from engineering.
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sticky aside */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-card">
              <div className="border-b border-border p-5">
                <div className="eyebrow">Next step</div>
                <h3 className="mt-2 font-display text-xl text-foreground">
                  Quote this valve
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Send line conditions for a precise response, usually within one business day.
                </p>
              </div>
              <div className="space-y-2 p-5">
                <Link
                  to="/request-a-quote"
                  className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
                >
                  Request a quote
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-11 w-full items-center justify-center rounded-sm border border-border px-5 font-display text-xs uppercase tracking-widest hover:bg-secondary"
                >
                  Ask an engineer
                </Link>
                <Link
                  to="/products/compare"
                  className="inline-flex h-11 w-full items-center justify-center rounded-sm border border-brand px-5 font-display text-xs uppercase tracking-widest text-brand hover:bg-brand hover:text-brand-foreground"
                >
                  Compare families
                </Link>
              </div>
              <div className="border-t border-border p-5">
                <div className="eyebrow">Specification</div>
                <dl className="mt-3 space-y-2 font-display text-xs">
                  <Pair label="Size" value={product.sizeRange} />
                  <Pair label="Pressure" value={product.pressureClass} />
                  <Pair label="Temperature" value={product.temperatureRange} />
                  <Pair label="Certs" value={product.certifications.join(" / ")} />
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedIndustries.length > 0 && (
        <section className="border-t border-border bg-secondary py-16 md:py-20">
          <div className="container-page">
            <div className="eyebrow">Specified in</div>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
              Where this valve is deployed
            </h2>
            <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
              {relatedIndustries.map((i) => (
                <Link
                  key={i.slug}
                  to="/industries/$slug"
                  params={{ slug: i.slug }}
                  className="group bg-background p-7 transition hover:bg-background/80"
                >
                  <div className="eyebrow">Industry</div>
                  <h3 className="mt-3 font-display text-xl">{i.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{i.lede}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-background py-16">
        <div className="container-page">
          <div className="eyebrow">Related families</div>
          <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
            Other Max-Seal platforms
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group border border-border bg-card p-6 transition hover:border-foreground"
              >
                <div className="eyebrow">{p.shortName}</div>
                <h3 className="mt-3 font-display text-xl text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink p-5">
      <div className="font-display text-[0.6rem] uppercase tracking-[0.22em] text-white/50">
        {label}
      </div>
      <div className="mt-2 font-display text-sm text-white">{value}</div>
    </div>
  );
}

function Pair({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 text-foreground">
      <dt className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="break-words">{value}</dd>
    </div>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-card p-5">
      <div className="eyebrow">{label}</div>
      <div className="mt-3 font-display text-base text-foreground">{value}</div>
    </div>
  );
}
