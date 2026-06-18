import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
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
      { property: "og:image", content: HOME.carousel[0].image },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroCarousel />
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

/* ============================================================
   HERO CAROUSEL
   ============================================================ */
function HeroCarousel() {
  const slides = HOME.carousel;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const go = (n: number) => setIndex((n + slides.length) % slides.length);

  return (
    <section
      className="relative isolate overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Max-Seal engineered butterfly valves"
    >
      <div className="relative h-[78vh] min-h-[560px] w-full">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className={
              "absolute inset-0 transition-opacity duration-1000 ease-out " +
              (i === index ? "opacity-100" : "pointer-events-none opacity-0")
            }
            aria-hidden={i !== index}
          >
            <img
              src={s.image}
              alt={s.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
            {/* graphite + copper overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, oklch(0.13 0.005 60 / 0.88) 0%, oklch(0.13 0.005 60 / 0.55) 45%, oklch(0.13 0.005 60 / 0.20) 100%)",
              }}
            />
            <div className="grid-precision absolute inset-0 opacity-30" />
          </div>
        ))}

        <div className="container-page relative flex h-full items-end pb-16 md:items-center md:pb-0">
          <div className="max-w-2xl">
            {slides.map((s, i) => (
              <div
                key={s.eyebrow}
                className={
                  "transition-all duration-700 " +
                  (i === index
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none absolute translate-y-2 opacity-0")
                }
                aria-hidden={i !== index}
              >
                <div className="eyebrow text-brand">{s.eyebrow}</div>
                <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-7xl">
                  {s.title}
                </h1>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <CtaButton to={s.cta.href} variant="brand">
                    {s.cta.label}
                  </CtaButton>
                  <CtaButton to="/request-a-quote" variant="ghost-invert">
                    Request a Quote
                  </CtaButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="container-page absolute inset-x-0 bottom-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3" role="tablist" aria-label="Slide selector">
              {slides.map((s, i) => (
                <button
                  key={s.eyebrow}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
                  onClick={() => go(i)}
                  className="group flex items-center gap-2"
                >
                  <span
                    className={
                      "h-px transition-all duration-500 " +
                      (i === index ? "w-14 bg-brand" : "w-8 bg-white/30 group-hover:bg-white/60")
                    }
                  />
                  <span
                    className={
                      "font-mono text-[0.65rem] uppercase tracking-widest transition " +
                      (i === index ? "text-white" : "text-white/40")
                    }
                  >
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 transition hover:border-white hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 transition hover:border-white hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hairline bg-line" />
    </section>
  );
}

/* ============================================================
   STORY (split layout with layered images)
   ============================================================ */
function Story() {
  const s = HOME.story;
  const img = HOME.storyImages;
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <div className="eyebrow text-brand">{s.eyebrow}</div>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            {s.title}
          </h2>
          <p className="mt-8 text-base text-muted-foreground md:text-lg">{s.body}</p>
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

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
            <img
              src={img.primary}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
          <div className="absolute -bottom-10 -left-6 hidden w-48 border border-border bg-background p-3 shadow-[var(--shadow-elevated)] md:block">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={img.secondary}
                alt="Technical drawing detail"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              Engineering / detail
            </div>
          </div>
          <div className="absolute -right-4 -top-4 hidden h-24 w-24 border border-brand/60 md:block" aria-hidden />
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   PATHWAYS with image crops
   ============================================================ */
function Pathways() {
  const p = HOME.pathways;
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={p.eyebrow} title={p.title} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {p.cards.map((c, i) => (
          <Link
            key={c.href}
            to={c.href}
            className="group flex flex-col overflow-hidden border border-border bg-background transition-colors hover:border-foreground/40"
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden bg-secondary">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute left-4 top-4 font-mono text-[0.65rem] uppercase tracking-widest text-white/80">
                0{i + 1}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="font-display text-lg text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-foreground">
                {c.cta}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   CURATED RANGES — image cards
   ============================================================ */
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
            className="group relative grid grid-cols-[1fr_1.1fr] overflow-hidden border border-border bg-background transition-colors hover:border-foreground/40"
          >
            <div className="relative overflow-hidden bg-secondary">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30" />
            </div>
            <div className="flex flex-col justify-between p-7">
              <div>
                <h3 className="font-display text-xl text-foreground md:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-foreground">
                Explore range
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </div>
            </div>
            <div className="absolute inset-x-0 top-0 h-px bg-brand/0 transition-colors group-hover:bg-brand" />
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   COMPANY — timeline with facility image strip
   ============================================================ */
function Company() {
  const c = HOME.company;
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={c.eyebrow} title={c.title} />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {c.timeline.map((t) => (
            <div key={t.label} className="bg-background p-7">
              <div className="font-display text-3xl font-semibold text-brand">{t.year}</div>
              <div className="eyebrow mt-4">{t.label}</div>
              <p className="mt-3 text-sm text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden border border-border bg-ink">
          <img
            src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1600&q=80"
            alt="Max-Seal facility floor"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <div className="eyebrow text-white/70">Facilities</div>
            <div className="mt-3 font-display text-2xl text-white">
              Lumberton, NC / Houston, TX
            </div>
            <div className="mt-2 text-sm text-white/70">
              Domestic team with distributor reach across the Americas.
            </div>
            <div className="mt-5 flex flex-wrap gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-white/60">
              <span className="border border-white/20 px-2 py-1">USA</span>
              <span className="border border-white/20 px-2 py-1">Mexico</span>
              <span className="border border-white/20 px-2 py-1">Argentina</span>
              <span className="border border-white/20 px-2 py-1">Chile</span>
            </div>
          </div>
        </div>
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

/* ============================================================
   INDUSTRIES — image-backed tabs
   ============================================================ */
function Industries() {
  const ind = HOME.industries;
  const [active, setActive] = useState(ind.items[0].slug);
  const current = ind.items.find((i) => i.slug === active)!;
  return (
    <Section>
      <SectionHeading eyebrow={ind.eyebrow} title={ind.title} />
      <div className="mt-10 flex flex-wrap gap-2">
        {ind.items.map((i) => (
          <button
            key={i.slug}
            type="button"
            onClick={() => setActive(i.slug)}
            className={
              "border px-4 py-2 font-mono text-[0.7rem] uppercase tracking-widest transition " +
              (active === i.slug
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground")
            }
          >
            {i.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-px bg-border lg:grid-cols-[1.2fr_1fr]">
        <div key={current.slug} className="relative min-h-[360px] overflow-hidden bg-ink animate-fade-in">
          <img
            src={current.image}
            alt={`${current.name} operating environment`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <div className="eyebrow text-brand">{current.name}</div>
            <div className="mt-3 font-display text-2xl text-white md:text-3xl">
              {current.challenge}
            </div>
          </div>
        </div>

        <div className="bg-background p-8">
          <div className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            Typical valve need
          </div>
          <p className="mt-2 text-base text-foreground">{current.need}</p>

          <div className="mt-8">
            <div className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              Recommended families
            </div>
            <p className="mt-2 font-display text-lg text-foreground">{current.recommended}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <CtaButton to={`/industries/${current.slug}`} variant="primary">
              View industry
            </CtaButton>
            <CtaButton to="/products/selector" variant="ghost">
              Product Selector
            </CtaButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   PROCESS — dark
   ============================================================ */
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
