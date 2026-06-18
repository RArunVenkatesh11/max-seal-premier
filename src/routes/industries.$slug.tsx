import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { INDUSTRIES, PRODUCT_FAMILIES, RESOURCES } from "@/data/site";
import { CtaBand } from "@/components/site/CtaBand";
import { ProductCard } from "@/components/site/ProductCard";
import { CtaButton } from "@/components/site/CtaButton";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useCompare } from "@/hooks/use-compare";
import { industryImage } from "@/components/site/Media";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = INDUSTRIES.find((i) => i.slug === params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.industry.seo.title },
          { name: "description", content: loaderData.industry.seo.description },
          { property: "og:title", content: loaderData.industry.seo.title },
          { property: "og:description", content: loaderData.industry.seo.description },
        ]
      : [],
  }),
  component: IndustryDetail,
});

function IndustryDetail() {
  const { industry } = Route.useLoaderData();
  const { slugs, toggle } = useCompare();
  const products = PRODUCT_FAMILIES.filter((p) =>
    industry.recommendedFamilies.includes(p.slug),
  );
  const docs = RESOURCES.filter((r) => r.industrySlugs.includes(industry.slug));

  return (
    <>
      <section className="cinematic relative isolate overflow-hidden">
        <img
          src={industryImage(industry.slug)}
          alt=""
          aria-hidden
          loading="eager"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(100deg, oklch(0.13 0.005 60 / 0.92) 0%, oklch(0.13 0.005 60 / 0.65) 60%, oklch(0.13 0.005 60 / 0.35) 100%)",
          }}
        />
        <div className="grid-precision absolute inset-0 opacity-50" />
        <div className="container-page relative py-16 md:py-24">
          <Breadcrumbs
            invert
            items={[
              { label: "Industries", to: "/industries" },
              { label: industry.name },
            ]}
          />
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] text-white md:text-6xl">
            {industry.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">{industry.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton to="/request-a-quote" variant="brand">
              Quote this service
            </CtaButton>
            <CtaButton to="/contact" variant="ghost-invert">
              Ask an engineer
            </CtaButton>
          </div>
        </div>
      </section>


      <section className="bg-background py-16 md:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="eyebrow">Overview</div>
            <p className="mt-4 text-xl leading-relaxed text-foreground md:text-2xl">
              {industry.description}
            </p>
          </div>
          <div className="space-y-8">
            <div>
              <div className="eyebrow">Common challenges</div>
              <ul className="mt-4 space-y-2.5">
                {industry.challenges.map((c: string) => (
                  <li
                    key={c}
                    className="border-l-2 border-brand bg-secondary/40 py-2 pl-4 text-foreground"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">Typical valve needs</div>
              <ul className="mt-4 space-y-2 text-sm text-foreground">
                {industry.valveNeeds.map((v: string) => (
                  <li key={v} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-16">
        <div className="container-page">
          <div className="eyebrow">Common applications</div>
          <div className="mt-6 grid gap-px bg-border sm:grid-cols-2 md:grid-cols-4">
            {industry.applications.map((a: string) => (
              <div
                key={a}
                className="bg-background p-6 font-display text-sm tracking-wide text-foreground"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Recommended valve solutions</div>
              <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
                Engineered for this service
              </h2>
            </div>
            <Link
              to="/products/compare"
              className="font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Compare families →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {products.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                selected={slugs.includes(p.slug)}
                onToggleSelect={toggle}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-16">
        <div className="container-page grid gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <div className="eyebrow">Technical considerations</div>
            <ul className="mt-6 space-y-3">
              {industry.technicalConsiderations.map((t: string) => (
                <li
                  key={t}
                  className="border-l-2 border-foreground/30 bg-secondary/50 py-2 pl-4 text-sm text-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="eyebrow">Downloads</div>
              <Link
                to="/resources"
                className="font-display text-[0.7rem] uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                All resources →
              </Link>
            </div>
            <ul className="mt-6 divide-y divide-border border border-border">
              {docs.length === 0 && (
                <li className="p-5 text-sm text-muted-foreground">
                  Industry-specific datasheets available on request.
                </li>
              )}
              {docs.map((d) => (
                <li key={d.title}>
                  <a
                    href={d.href}
                    className="group flex items-center justify-between p-4 transition hover:bg-secondary"
                  >
                    <div className="min-w-0">
                      <div className="eyebrow">{d.category}</div>
                      <div className="mt-1 truncate text-sm font-medium text-foreground">
                        {d.title}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pl-4">
                      <span className="font-display text-xs text-muted-foreground">{d.type}</span>
                      <Download className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to specify for this service?"
        body="Send your line conditions, materials, and quantities. A Max-Seal engineer will return a precise scope, lead time, and price."
      />
    </>
  );
}
