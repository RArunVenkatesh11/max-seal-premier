import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/about/global-partners")({
  head: () => ({
    meta: [
      { title: "Global Partners | Max-Seal" },
      { name: "description", content: "Max-Seal works with engineered distribution partners across North America and select international markets." },
      { property: "og:title", content: "Global Partners | Max-Seal" },
      { property: "og:url", content: "/about/global-partners" },
    ],
    links: [{ rel: "canonical", href: "/about/global-partners" }],
  }),
  component: GlobalPartnersPage,
});

const REGIONS = [
  { name: "United States", note: "Direct sales and engineered distribution coverage in every state." },
  { name: "Canada", note: "Regional partners for water, oil and gas, and mining service." },
  { name: "Mexico", note: "Engineering and aftermarket support for plant operators." },
  { name: "Latin America", note: "Select distribution for chemical, power, and water." },
  { name: "Middle East", note: "Engineered distribution for oil and gas and water." },
  { name: "Asia Pacific", note: "OEM and EPC partnerships across the region." },
];

function GlobalPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="About / Global Partners"
        title={
          <>
            Engineered distribution
            <br />
            <span className="text-brand">across regions.</span>
          </>
        }
        lede="Max-Seal partners with engineered distributors that share our standards on specification, stock, and after-sales support. Become a partner to add Max-Seal to your line card."
      />
      <Section>
        <Breadcrumbs items={[{ label: "About", to: "/about" }, { label: "Global Partners" }]} />
        <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((r) => (
            <div key={r.name} className="bg-background p-6">
              <div className="eyebrow">Region</div>
              <h3 className="mt-3 font-display text-lg text-foreground">{r.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-4 border border-border bg-secondary/40 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="font-display text-xl text-foreground">Become a Max-Seal partner.</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We add engineered distributors selectively. Send your territory, line card, and target industries.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background"
          >
            Apply to partner
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
