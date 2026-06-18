import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { PRODUCT_FAMILIES, PRODUCT_GROUPS } from "@/data/site";

export const Route = createFileRoute("/products/valve-families")({
  head: () => ({
    meta: [
      { title: "Butterfly Valve Families | Max-Seal" },
      {
        name: "description",
        content:
          "Explore every Max-Seal butterfly valve family by group. Resilient seated, high performance, severe service, lined, and AWWA platforms.",
      },
      { property: "og:title", content: "Butterfly Valve Families | Max-Seal" },
      { property: "og:url", content: "/products/valve-families" },
    ],
    links: [{ rel: "canonical", href: "/products/valve-families" }],
  }),
  component: ValveFamiliesPage,
});

function ValveFamiliesPage() {
  return (
    <>
      <PageHero
        eyebrow="Products / Valve Families"
        title={
          <>
            Every Max-Seal family,
            <br />
            <span className="text-brand">grouped by service.</span>
          </>
        }
        lede="Use this page to scan the full Max-Seal range by group. Each entry opens a detail page with technical specs, downloads, and recommended applications."
      />
      <Section>
        <Breadcrumbs
          items={[{ label: "Products", to: "/products" }, { label: "Valve Families" }]}
        />
        <div className="mt-10 space-y-16">
          {PRODUCT_GROUPS.filter((g) => g.slug !== "automation-and-operation").map((group) => (
            <div key={group.slug}>
              <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
                <div>
                  <div className="eyebrow">{group.title}</div>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{group.description}</p>
                </div>
                <Link
                  to="/products/compare"
                  className="hidden font-display text-xs uppercase tracking-widest text-foreground/70 hover:text-foreground md:inline"
                >
                  Compare in this group
                </Link>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.slugs
                  .map((slug) => PRODUCT_FAMILIES.find((p) => p.slug === slug))
                  .filter((p): p is NonNullable<typeof p> => Boolean(p))
                  .map((p) => (
                    <Link
                      key={p.slug}
                      to="/products/$slug"
                      params={{ slug: p.slug }}
                      className="group flex h-full flex-col border border-border bg-card p-5 transition hover:border-foreground/60"
                    >
                      <div className="eyebrow">{p.valveType.replace(/-/g, " ")}</div>
                      <h3 className="mt-3 font-display text-xl text-foreground group-hover:text-brand">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                      <div className="mt-4 flex flex-wrap gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                        <span>{p.pressureClass}</span>
                        <span className="opacity-40">/</span>
                        <span>{p.sizeRange}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap gap-3 border-t border-border pt-8">
          <Link
            to="/products/selector"
            className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
          >
            Use the product selector
          </Link>
          <Link
            to="/products/compare"
            className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest hover:bg-secondary"
          >
            Compare families
          </Link>
          <Link
            to="/ask-the-experts"
            className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest hover:bg-secondary"
          >
            Ask the experts
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
