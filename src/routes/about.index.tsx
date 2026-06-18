import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { HOME } from "@/data/site";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Max-Seal | US-Based Butterfly Valve Manufacturer" },
      {
        name: "description",
        content: "Max-Seal is a US-based engineered butterfly valve manufacturer focused on performance, support, and long service life.",
      },
      { property: "og:title", content: "About Max-Seal" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { title: "Performance first", body: "We sell valves that work. The specification is the product. Marketing is not." },
  { title: "Engineered to service", body: "Every order is reviewed against the actual line conditions, not a catalog page." },
  { title: "Support that answers", body: "Real engineers in the US, available before and after the order." },
  { title: "One source, many solutions", body: "Four families that cover almost every butterfly valve service. No referrals out." },
];

const TIMELINE = [
  { year: "Founded", text: "Built by engineers tired of generic, overpromised valves." },
  { year: "Today", text: "Serving water, chemical, oil and gas, power, food, and mining operators across North America." },
  { year: "Tomorrow", text: "Expanding programs for engineered configurations and severe service." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Max-Seal"
        title={<>A valve company <span className="text-brand">built by engineers.</span></>}
        lede="Max-Seal exists because operators deserve a partner that takes service conditions seriously and ships a valve to match."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHeading eyebrow="What we believe" title="Built for performance. Zero compromise." />
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-background p-6">
                <h3 className="text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeading invert eyebrow="By the numbers" title="What a Max-Seal program looks like." />
        <div className="mt-12 grid gap-px bg-line md:grid-cols-4">
          {HOME_STATS.map((s) => (
            <div key={s.label} className="bg-ink p-8">
              <div className="font-display text-3xl text-white">{s.value}</div>
              <div className="eyebrow mt-3 text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="The story" title="From a workshop to a national program." />
        <ol className="mt-12 space-y-px bg-border">
          {TIMELINE.map((t) => (
            <li key={t.year} className="grid gap-4 bg-background p-8 md:grid-cols-[200px_1fr]">
              <div className="font-mono text-sm uppercase tracking-widest text-brand">{t.year}</div>
              <div className="text-lg text-foreground">{t.text}</div>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
