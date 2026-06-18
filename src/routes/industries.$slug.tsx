import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { INDUSTRIES, PRODUCT_FAMILIES } from "@/data/site";
import { CtaBand } from "@/components/site/CtaBand";
import { ProductCard } from "@/components/site/ProductCard";
import { CtaButton } from "@/components/site/CtaButton";

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
        ]
      : [],
  }),
  component: IndustryDetail,
});

function IndustryDetail() {
  const { industry } = Route.useLoaderData();
  const products = PRODUCT_FAMILIES.filter((p) => industry.recommendedFamilies.includes(p.slug));

  return (
    <>
      <section className="cinematic relative overflow-hidden">
        <div className="grid-precision absolute inset-0 opacity-50" />
        <div className="container-page relative py-20 md:py-28">
          <div className="eyebrow text-white/60">
            <Link to="/industries" className="hover:text-white">Industries</Link>
            <span className="mx-2 opacity-40">/</span>
            <span>{industry.name}</span>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
            {industry.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">{industry.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton to="/request-a-quote" variant="brand">Quote this service</CtaButton>
            <CtaButton to="/contact" variant="ghost-invert">Talk to engineering</CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="eyebrow">Overview</div>
            <p className="mt-4 text-xl leading-relaxed text-foreground md:text-2xl">{industry.description}</p>
          </div>
          <div>
            <div className="eyebrow">Common challenges</div>
            <ul className="mt-4 space-y-3">
              {industry.challenges.map((c) => (
                <li key={c} className="border-l-2 border-brand pl-4 text-foreground">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-20">
        <div className="container-page">
          <div className="eyebrow">Typical applications</div>
          <div className="mt-6 grid gap-px bg-border sm:grid-cols-2 md:grid-cols-4">
            {industry.applications.map((a) => (
              <div key={a} className="bg-background p-6 text-sm font-medium">{a}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-page">
          <div className="eyebrow">Recommended product families</div>
          <h2 className="mt-3 text-3xl md:text-4xl">Engineered for this service</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
