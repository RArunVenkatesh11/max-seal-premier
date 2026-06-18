import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { INDUSTRIES } from "@/data/site";

export const Route = createFileRoute("/about/end-users")({
  head: () => ({
    meta: [
      { title: "End Users | Max-Seal" },
      { name: "description", content: "Plant operators, EPCs, and OEMs across water, chemical, oil and gas, power, food, and mining trust Max-Seal." },
      { property: "og:title", content: "End Users | Max-Seal" },
      { property: "og:url", content: "/about/end-users" },
    ],
    links: [{ rel: "canonical", href: "/about/end-users" }],
  }),
  component: EndUsersPage,
});

function EndUsersPage() {
  return (
    <>
      <PageHero
        eyebrow="About / End Users"
        title={
          <>
            Who Max-Seal
            <br />
            <span className="text-brand">works with.</span>
          </>
        }
        lede="Plant operators, EPC contractors, and OEM packagers across North America. Specification support before the order, parts and service after."
      />
      <Section>
        <Breadcrumbs items={[{ label: "About", to: "/about" }, { label: "End Users" }]} />
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$slug"
              params={{ slug: i.slug }}
              className="group border border-border bg-card p-6 transition hover:border-foreground/60"
            >
              <div className="eyebrow">Industry</div>
              <h3 className="mt-3 font-display text-xl text-foreground group-hover:text-brand">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.lede}</p>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
