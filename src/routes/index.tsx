import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HOME, PRODUCT_FAMILIES, INDUSTRIES, ENGINEERING_PILLARS } from "@/data/site";
import { CtaButton } from "@/components/site/CtaButton";
import { Section, SectionHeading } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Max-Seal | Engineered Butterfly Valves Built for Performance" },
      {
        name: "description",
        content:
          "Max-Seal is a US-based engineered butterfly valve manufacturer. Resilient seated, high performance, triple offset, and PFA lined solutions.",
      },
      { property: "og:title", content: "Max-Seal | Engineered Butterfly Valves" },
      {
        property: "og:description",
        content: "Not just ordinary butterfly valves. Built for performance. Many solutions. Zero compromise.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <FeaturedProducts />
      <SpecBar />
      <IndustriesStrip />
      <EngineeringPreview />
      <CtaBand title={HOME.ctaBand.title} body={HOME.ctaBand.body} />
    </>
  );
}

function Hero() {
  return (
    <section className="cinematic relative overflow-hidden">
      <div className="grid-precision absolute inset-0 opacity-60" />
      <div className="container-page relative grid gap-14 py-24 md:py-32 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <div className="eyebrow text-white/60">{HOME.hero.eyebrow}</div>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
            {HOME.hero.title}
            <br />
            <span className="text-brand">{HOME.hero.titleAccent}</span>
          </h1>
          <p className="mt-7 max-w-xl text-base text-white/70 md:text-lg">{HOME.hero.lede}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CtaButton to="/request-a-quote" variant="brand">Request a Quote</CtaButton>
            <CtaButton to="/products" variant="ghost-invert">Explore Products</CtaButton>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="border-l border-white/15 pl-8">
            <div className="eyebrow text-white/40">Product families</div>
            <ul className="mt-6 space-y-5">
              {PRODUCT_FAMILIES.map((p, i) => (
                <li key={p.slug}>
                  <Link
                    to={`/products/${p.slug}`}
                    className="group flex items-center justify-between text-white/80 transition hover:text-white"
                  >
                    <div>
                      <div className="font-mono text-[0.7rem] uppercase tracking-widest text-white/40">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-1 text-lg font-medium">{p.shortName}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="hairline bg-line" />
    </section>
  );
}

function Pillars() {
  return (
    <Section>
      <SectionHeading
        eyebrow="The Max-Seal difference"
        title={<>A stronger alternative to generic <span className="text-brand">low-cost</span> valve suppliers.</>}
        lede="Engineered valves, real application support, and a US-based team that stands behind every shipment."
      />
      <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
        {HOME.pillars.map((p) => (
          <div key={p.number} className="bg-background p-8">
            <div className="font-mono text-xs text-brand">{p.number}</div>
            <h3 className="mt-6 text-xl text-foreground">{p.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FeaturedProducts() {
  return (
    <Section tone="muted">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Product families"
          title="One source. Many solutions."
          lede="Four engineered platforms cover almost every butterfly valve service from clean water to cryogenic LNG."
        />
        <Link to="/products" className="font-mono text-xs uppercase tracking-widest text-foreground underline-offset-4 hover:underline">
          All products →
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PRODUCT_FAMILIES.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </Section>
  );
}

function SpecBar() {
  return (
    <section className="border-y border-border bg-background">
      <div className="container-page grid gap-px overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-4">
        {HOME.stats.map((s) => (
          <div key={s.label} className="bg-background px-6 py-10">
            <div className="font-display text-3xl font-semibold text-foreground md:text-4xl">{s.value}</div>
            <div className="eyebrow mt-3">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IndustriesStrip() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <SectionHeading
          eyebrow="Industries we serve"
          title="Specified where uptime matters."
          lede="From municipal water to LNG, Max-Seal valves are deployed across services where the wrong valve is not an option."
        />
        <div className="grid grid-cols-1 gap-px self-end bg-border sm:grid-cols-2">
          {INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              to={`/industries/${i.slug}`}
              className="group flex items-center justify-between bg-background p-6 transition hover:bg-secondary"
            >
              <span className="text-base font-medium text-foreground">{i.name}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

function EngineeringPreview() {
  return (
    <Section tone="dark">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading
          invert
          eyebrow="Engineering advantage"
          title="Specification is the product."
          lede="The valve you receive is the result of choices made before it was ever cast. Materials, geometry, seat technology, and testing."
        />
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {ENGINEERING_PILLARS.slice(0, 4).map((p) => (
            <div key={p.title} className="bg-ink p-6">
              <h4 className="text-lg text-white">{p.title}</h4>
              <p className="mt-2 text-sm text-white/60">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <CtaButton to="/engineering-advantage" variant="ghost-invert">
          See the engineering advantage
        </CtaButton>
      </div>
    </Section>
  );
}
