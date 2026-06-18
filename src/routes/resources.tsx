import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RESOURCES, FAQS } from "@/data/site";
import { PageHero, Section, SectionHeading } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { Download } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources and Downloads | Max-Seal" },
      {
        name: "description",
        content: "Catalogs, datasheets, drawings, and engineering whitepapers for Max-Seal butterfly valves.",
      },
    ],
  }),
  component: ResourcesPage,
});

const CATEGORIES = ["All", "Catalog", "Datasheet", "Whitepaper", "Drawing", "Manual"] as const;

function ResourcesPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const items = useMemo(
    () => (cat === "All" ? RESOURCES : RESOURCES.filter((r) => r.category === cat)),
    [cat],
  );

  return (
    <>
      <PageHero
        eyebrow="Resources and downloads"
        title={<>Documents <span className="text-brand">engineered for spec sheets.</span></>}
        lede="Catalogs, datasheets, certifications, drawings, and installation manuals. Everything you need to specify and install with confidence."
      />

      <Section>
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-sm border px-4 py-2 text-sm transition ${
                cat === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="divide-y divide-border border border-border">
          {items.map((r) => (
            <li key={r.title}>
              <a
                href={r.href}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 p-5 transition hover:bg-secondary sm:grid-cols-[1fr_120px_80px_auto] sm:gap-6"
              >
                <div className="min-w-0">
                  <div className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {r.category}
                  </div>
                  <div className="mt-1 truncate text-base font-medium text-foreground">{r.title}</div>
                </div>
                <div className="hidden font-mono text-xs text-muted-foreground sm:block">{r.type}</div>
                <div className="hidden font-mono text-xs text-muted-foreground sm:block">{r.size}</div>
                <Download className="h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Frequently asked"
          title="Engineering questions, plainly answered."
        />
        <dl className="mt-12 divide-y divide-border border-y border-border">
          {FAQS.map((f) => (
            <div key={f.q} className="grid gap-4 py-6 md:grid-cols-[1fr_2fr]">
              <dt className="text-lg font-medium text-foreground">{f.q}</dt>
              <dd className="text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand />
    </>
  );
}
