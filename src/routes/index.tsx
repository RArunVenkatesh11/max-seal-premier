import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { HOME } from "@/data/site";
import { CtaButton } from "@/components/site/CtaButton";
import { Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Max-Seal | Engineered Butterfly Valves Built for Performance" },
      {
        name: "description",
        content:
          "Max-Seal is a US-based engineered butterfly valve partner. Technical support, broad range, and quality focus for demanding industrial applications.",
      },
      { property: "og:title", content: "Max-Seal | Engineered Butterfly Valves" },
      {
        property: "og:description",
        content: "Built for performance when ordinary valves are not enough.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Pathways />
      <CuratedRanges />
      <Company />
      <Industries />
      <Process />
      <FinalCta />
    </>
  );
}

function Hero() {
  const h = HOME.hero;
  return (
    <section className="cinematic relative overflow-hidden">
      <div className="grid-precision absolute inset-0 opacity-50" />
      <div className="container-page relative py-28 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          <div className="eyebrow text-white/60">{h.eyebrow}</div>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.04] text-white md:text-6xl lg:text-7xl">
            {h.title}{" "}
            <span className="text-brand">{h.titleAccent}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base text-white/70 md:text-lg">{h.lede}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {h.ctas.map((c) => (
              <CtaButton
                key={c.href}
                to={c.href}
                variant={c.variant === "brand" ? "brand" : c.variant === "primary" ? "primary" : "ghost-invert"}
              >
                {c.label}
              </CtaButton>
            ))}
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 font-mono text-[0.7rem] uppercase tracking-widest text-white/50">
            {h.trustLine}
          </div>
        </div>
      </div>
      <div className="hairline bg-line" />
    </section>
  );
}

function Story() {
  const s = HOME.story;
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <div className="eyebrow text-brand">{s.eyebrow}</div>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            {s.title}
          </h2>
        </div>
        <div>
          <p className="text-base text-muted-foreground md:text-lg">{s.body}</p>
          <ul className="mt-10 space-y-6">
            {s.proofPoints.map((p, i) => (
              <li key={p.title} className="flex gap-5 border-t border-border pt-6">
                <div className="font-mono text-xs text-brand">0{i + 1}</div>
                <div>
                  <div className="font-display text-lg text-foreground">{p.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{p.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Pathways() {
  const p = HOME.pathways;
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={p.eyebrow} title={p.title} />
      <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {p.cards.map((c, i) => (
          <Link
            key={c.href}
            to={c.href}
            className="group flex flex-col justify-between bg-background p-8 transition-colors hover:bg-secondary"
          >
            <div>
              <div className="font-mono text-xs text-brand">0{i + 1}</div>
              <h3 className="mt-6 font-display text-xl text-foreground">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
            </div>
            <div className="mt-10 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-foreground">
              {c.cta}
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function CuratedRanges() {
  const r = HOME.curatedRanges;
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={r.eyebrow} title={r.title} />
        <Link
          to="/products"
          className="font-mono text-xs uppercase tracking-widest text-foreground underline-offset-4 hover:underline"
        >
          View all products →
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {r.items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="group relative flex flex-col justify-between overflow-hidden border border-border bg-background p-8 transition-colors hover:border-foreground/40"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-brand/0 transition-colors group-hover:bg-brand" />
            <div>
              <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">{item.body}</p>
            </div>
            <div className="mt-10 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-foreground">
              Explore range
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function Company() {
  const c = HOME.company;
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={c.eyebrow} title={c.title} />
      <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {c.timeline.map((t) => (
          <div key={t.label} className="bg-background p-8">
            <div className="font-display text-3xl font-semibold text-brand">{t.year}</div>
            <div className="eyebrow mt-4">{t.label}</div>
            <p className="mt-3 text-sm text-muted-foreground">{t.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link
          to="/about"
          className="font-mono text-xs uppercase tracking-widest text-foreground underline-offset-4 hover:underline"
        >
          About Max-Seal →
        </Link>
      </div>
    </Section>
  );
}

function Industries() {
  const ind = HOME.industries;
  const [active, setActive] = useState(ind.items[0].slug);
  const current = ind.items.find((i) => i.slug === active)!;
  return (
    <Section>
      <SectionHeading eyebrow={ind.eyebrow} title={ind.title} />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-wrap gap-2">
          {ind.items.map((i) => (
            <button
              key={i.slug}
              type="button"
              onClick={() => setActive(i.slug)}
              className={
                "rounded-sm border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-widest transition " +
                (active === i.slug
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground")
              }
            >
              {i.name}
            </button>
          ))}
        </div>
        <div className="border-l border-border pl-8">
          <div className="eyebrow text-brand">{current.name}</div>
          <div className="mt-6">
            <div className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">Common challenge</div>
            <p className="mt-2 font-display text-xl text-foreground">{current.challenge}</p>
          </div>
          <div className="mt-8">
            <div className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">Typical valve need</div>
            <p className="mt-2 text-base text-muted-foreground">{current.need}</p>
          </div>
          <div className="mt-10">
            <Link
              to="/industries/$slug"
              params={{ slug: current.slug }}
              className="font-mono text-xs uppercase tracking-widest text-foreground underline-offset-4 hover:underline"
            >
              View industry →
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Process() {
  const p = HOME.process;
  return (
    <Section tone="dark">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <SectionHeading invert eyebrow={p.eyebrow} title={p.title} lede={p.body} />
        <div className="grid gap-px bg-line sm:grid-cols-2">
          {p.steps.map((s) => (
            <div key={s.number} className="bg-ink p-7">
              <div className="font-mono text-xs text-brand">{s.number}</div>
              <h4 className="mt-5 font-display text-lg text-white">{s.title}</h4>
              <p className="mt-2 text-sm text-white/60">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <CtaButton to="/ask-the-experts" variant="ghost-invert">
          Ask The Experts
        </CtaButton>
      </div>
    </Section>
  );
}

function FinalCta() {
  const f = HOME.finalCta;
  return (
    <Section>
      <div className="border border-border bg-background p-10 md:p-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            {f.title}
          </h2>
          <div>
            <p className="text-base text-muted-foreground">{f.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton to="/request-a-quote" variant="brand">Request a Quote</CtaButton>
              <CtaButton to="/ask-the-experts" variant="ghost">Ask The Experts</CtaButton>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
