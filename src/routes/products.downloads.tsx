import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { PRODUCT_FAMILIES } from "@/data/site";

export const Route = createFileRoute("/products/downloads")({
  head: () => ({
    meta: [
      { title: "Product Downloads | Max-Seal" },
      {
        name: "description",
        content:
          "Catalogues, datasheets, and 2D/3D models for every Max-Seal butterfly valve family.",
      },
      { property: "og:title", content: "Product Downloads | Max-Seal" },
      { property: "og:url", content: "/products/downloads" },
    ],
    links: [{ rel: "canonical", href: "/products/downloads" }],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products / Downloads"
        title={
          <>
            Product
            <br />
            <span className="text-brand">downloads.</span>
          </>
        }
        lede="Every catalogue, datasheet, drawing, and model in one place. Looking for installation manuals or technical bulletins? See the full Resources library."
      />
      <Section>
        <Breadcrumbs items={[{ label: "Products", to: "/products" }, { label: "Downloads" }]} />
        <div className="mt-10 space-y-12">
          {PRODUCT_FAMILIES.filter((p) => p.downloads.length > 0).map((p) => (
            <div key={p.slug} className="border-b border-border pb-10 last:border-b-0">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="eyebrow">{p.valveType.replace(/-/g, " ")}</div>
                  <h3 className="mt-2 font-display text-2xl text-foreground">{p.name}</h3>
                </div>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="font-display text-xs uppercase tracking-widest text-foreground/70 hover:text-foreground"
                >
                  View product
                </Link>
              </div>
              <ul className="mt-5 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {p.downloads.map((d) => (
                  <li key={d.label}>
                    <a
                      href={d.href}
                      className="group flex items-center justify-between gap-3 border border-border bg-background p-4 transition hover:border-foreground/60"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm text-foreground">{d.label}</div>
                        <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                          {d.type}
                        </div>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground group-hover:text-brand" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/resources"
            className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background"
          >
            Browse all resources
          </Link>
          <Link
            to="/ask-the-experts"
            className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest"
          >
            Ask the experts
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
