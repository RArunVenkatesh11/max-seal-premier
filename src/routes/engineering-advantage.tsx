import { createFileRoute } from "@tanstack/react-router";
import { ENGINEERING_PILLARS, HOME } from "@/data/site";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/engineering-advantage")({
  head: () => ({
    meta: [
      { title: "Engineering Advantage | Max-Seal" },
      {
        name: "description",
        content: "Materials, geometry, seat technology, and testing. The decisions behind every Max-Seal butterfly valve.",
      },
      { property: "og:title", content: "Engineering Advantage | Max-Seal" },
    ],
  }),
  component: EngineeringPage,
});

function EngineeringPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering advantage"
        title={<>The valve is the result of <span className="text-brand">a decision tree.</span></>}
        lede="Body, geometry, seat, packing, actuation, and testing. Get any of them wrong and the valve underperforms. Get them right and it disappears into the system for decades."
      />

      <Section>
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {ENGINEERING_PILLARS.map((p, i) => (
            <div key={p.title} className="bg-background p-8">
              <div className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-6 text-xl">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeading
          invert
          eyebrow="The standard"
          title="Tested before it leaves the floor."
          lede="Hydrostatic body, seat closure, and functional cycle tests. Every valve. Every order. Documentation on request."
        />
        <div className="mt-12 grid gap-px bg-line md:grid-cols-4">
          {HOME_STATS.map((s) => (
            <div key={s.label} className="bg-ink p-8">
              <div className="font-display text-3xl text-white">{s.value}</div>
              <div className="eyebrow mt-3 text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="Have a difficult service?" body="Send your line conditions. We will engineer a valve that lasts." />
    </>
  );
}
