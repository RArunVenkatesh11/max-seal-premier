import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { PRODUCT_FAMILIES } from "@/data/site";

export const Route = createFileRoute("/products/automation-accessories")({
  head: () => ({
    meta: [
      { title: "Automation and Accessories | Max-Seal" },
      {
        name: "description",
        content:
          "Gear operators, pneumatic and electric actuators, solenoids, limit switches, and positioners. Sized and tested with your valve.",
      },
      { property: "og:title", content: "Automation and Accessories | Max-Seal" },
      { property: "og:url", content: "/products/automation-accessories" },
    ],
    links: [{ rel: "canonical", href: "/products/automation-accessories" }],
  }),
  component: AutomationPage,
});

function AutomationPage() {
  const items = PRODUCT_FAMILIES.filter((p) => p.category === "automation");
  return (
    <>
      <PageHero
        eyebrow="Products / Automation"
        title={
          <>
            Automation
            <br />
            <span className="text-brand">and operation.</span>
          </>
        }
        lede="Gear operators, actuators, and accessories that ship sized and tested with the valve. One source, one assembly, one quote."
      />
      <Section>
        <Breadcrumbs
          items={[{ label: "Products", to: "/products" }, { label: "Automation and Accessories" }]}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex h-full flex-col border border-border bg-card p-6 transition hover:border-foreground/60"
            >
              <div className="eyebrow">Automation</div>
              <h3 className="mt-3 font-display text-2xl text-foreground group-hover:text-brand">
                {p.name}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.tagline}</p>
              <ul className="mt-5 space-y-1.5 text-sm text-foreground/85">
                {p.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" /> {h}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
        <div className="mt-12 grid gap-4 border border-border bg-secondary/40 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="font-display text-xl text-foreground">Not sure what actuation you need?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Send the line conditions and the duty cycle. We will size it and quote the complete assembly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/ask-the-experts"
              className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background"
            >
              Ask the experts
            </Link>
            <Link
              to="/request-a-quote"
              className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
