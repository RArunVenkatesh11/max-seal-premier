import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/about/team")({
  head: () => ({
    meta: [
      { title: "Team | Max-Seal" },
      { name: "description", content: "The Max-Seal team. Application engineers, manufacturing, and customer support based in the United States." },
      { property: "og:title", content: "Team | Max-Seal" },
      { property: "og:url", content: "/about/team" },
    ],
    links: [{ rel: "canonical", href: "/about/team" }],
  }),
  component: TeamPage,
});

const ROLES = [
  { title: "Application Engineering", body: "Sizing, materials, and trim selection for every line. The engineer on your quote is the engineer who picks up the phone." },
  { title: "Manufacturing", body: "Assembly, test, and quality on US soil. Every valve hydrotested and seat tested before shipment." },
  { title: "Customer Support", body: "Order management, expediting, and after-sales service. One point of contact through the project." },
  { title: "Regional Sales", body: "Field representation across North America. On-site support for plant standardisation and specification." },
];

function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="About / Team"
        title={
          <>
            People behind
            <br />
            <span className="text-brand">every valve.</span>
          </>
        }
        lede="Max-Seal is a small team of engineers, machinists, and project managers. The same people specify, build, test, and ship the valve you order."
      />
      <Section>
        <Breadcrumbs items={[{ label: "About", to: "/about" }, { label: "Team" }]} />
        <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
          {ROLES.map((r) => (
            <div key={r.title} className="bg-background p-8">
              <div className="eyebrow text-brand">Role</div>
              <h3 className="mt-3 font-display text-xl text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-4 border border-border bg-secondary/40 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="font-display text-xl text-foreground">Want to talk to an engineer?</h3>
            <p className="mt-1 text-sm text-muted-foreground">No call centres. A US-based application engineer will pick up.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/ask-the-experts" className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background">Ask the experts</Link>
            <Link to="/contact" className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest">Contact</Link>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
