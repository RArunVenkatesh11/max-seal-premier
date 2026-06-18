import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PRODUCT_FAMILIES, INDUSTRIES } from "@/data/site";
import { CtaButton } from "@/components/site/CtaButton";
import { CtaBand } from "@/components/site/CtaBand";
import { Download, Check } from "lucide-react";

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

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const relatedIndustries = INDUSTRIES.filter((i) => i.recommendedFamilies.includes(product.slug));

  return (
    <>
      <section className="cinematic relative overflow-hidden">
        <div className="grid-precision absolute inset-0 opacity-50" />
        <div className="container-page relative py-20 md:py-28">
          <div className="eyebrow text-white/60">
            <Link to="/products" className="hover:text-white">Products</Link>
            <span className="mx-2 opacity-40">/</span>
            <span>{product.shortName}</span>
          </div>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-white/70">{product.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaButton to="/request-a-quote" variant="brand">Request a Quote</CtaButton>
                <CtaButton to="/products/compare" variant="ghost-invert">Compare families</CtaButton>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 font-mono text-xs">
              <Spec label="Size" value={product.sizeRange} />
              <Spec label="Pressure" value={product.pressureClass} />
              <Spec label="Temperature" value={product.temperatureRange} />
              <Spec label="Body" value={product.bodyMaterial[0]} />
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="eyebrow">Overview</div>
            <p className="mt-4 text-xl leading-relaxed text-foreground md:text-2xl">{product.summary}</p>

            <div className="mt-14">
              <h2 className="text-2xl">Engineering highlights</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {product.highlights.map((h: string) => (
                  <li key={h} className="flex gap-3 border-l-2 border-brand pl-4 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <h2 className="text-2xl">Typical applications</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.applications.map((a: string) => (
                  <span key={a} className="rounded-sm border border-border bg-secondary px-3 py-1.5 text-sm">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <div className="eyebrow">Materials</div>
              <dl className="mt-4 divide-y divide-border border border-border">
                <Pair label="Body" value={product.bodyMaterial.join(", ")} />
                <Pair label="Seal" value={product.sealMaterial.join(", ")} />
                <Pair label="Pressure" value={product.pressureClass} />
                <Pair label="Temperature" value={product.temperatureRange} />
              </dl>
            </div>

            <div>
              <div className="eyebrow">Certifications</div>
              <ul className="mt-4 space-y-2 font-mono text-xs">
                {product.certifications.map((c: string) => (
                  <li key={c} className="flex items-center gap-2 text-foreground">
                    <span className="h-1 w-1 rounded-full bg-brand" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="eyebrow">Downloads</div>
              <ul className="mt-4 space-y-2">
                {product.downloads.map((d: { label: string; type: string; href: string }) => (
                  <li key={d.label}>
                    <a
                      href={d.href}
                      className="group flex items-center justify-between border border-border bg-card p-4 text-sm hover:border-foreground"
                    >
                      <span>{d.label}</span>
                      <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        {d.type}
                        <Download className="h-4 w-4 group-hover:text-foreground" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {relatedIndustries.length > 0 && (
        <section className="border-t border-border bg-secondary py-20">
          <div className="container-page">
            <div className="eyebrow">Specified in</div>
            <h2 className="mt-3 text-3xl md:text-4xl">Where this valve is deployed</h2>
            <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
              {relatedIndustries.map((i) => (
                <Link
                  key={i.slug}
                  to={`/industries/${i.slug}`}
                  className="group bg-background p-8 transition hover:bg-background/80"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Industry</div>
                  <h3 className="mt-3 text-xl">{i.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{i.lede}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink p-5">
      <div className="text-[0.65rem] uppercase tracking-widest text-white/50">{label}</div>
      <div className="mt-2 text-sm text-white">{value}</div>
    </div>
  );
}

function Pair({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-3 p-4 text-sm">
      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
