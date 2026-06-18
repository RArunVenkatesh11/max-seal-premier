import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCT_FAMILIES } from "@/data/site";
import { PageHero } from "@/components/site/Section";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/products/selector")({
  head: () => ({
    meta: [
      { title: "Butterfly Valve Selector | Max-Seal" },
      {
        name: "description",
        content: "Filter Max-Seal butterfly valves by service, size, pressure, and temperature.",
      },
    ],
  }),
  component: Selector,
});

const SERVICES = ["Any", "Water", "Process", "Chemical", "Steam", "Cryogenic"] as const;
const SIZES = ["Any", '< 4"', '4" – 12"', '14" – 36"', '> 36"'] as const;
const PRESSURES = ["Any", "150", "300", "600", "900+"] as const;

function Selector() {
  const [service, setService] = useState<(typeof SERVICES)[number]>("Any");
  const [size, setSize] = useState<(typeof SIZES)[number]>("Any");
  const [press, setPress] = useState<(typeof PRESSURES)[number]>("Any");

  const matches = useMemo(() => {
    return PRODUCT_FAMILIES.filter((p) => {
      if (service === "Water" && !p.applications.join(" ").toLowerCase().includes("water")) return false;
      if (service === "Chemical" && !p.slug.includes("pfa") && !p.slug.includes("triple")) return false;
      if (service === "Steam" && !["high-performance-butterfly-valves", "triple-offset-butterfly-valves"].includes(p.slug)) return false;
      if (service === "Cryogenic" && p.slug !== "triple-offset-butterfly-valves") return false;
      if (service === "Process" && p.slug === "resilient-seated-butterfly-valves") return false;
      if (press === "600" && !p.pressureClass.match(/600|900|1500|2500/)) return false;
      if (press === "900+" && p.slug !== "triple-offset-butterfly-valves") return false;
      return true;
    });
  }, [service, size, press]);

  return (
    <>
      <PageHero
        eyebrow="Product selector"
        title={<>Find the right valve in <span className="text-brand">under a minute.</span></>}
        lede="Tell us the service. We will narrow the field to valve families engineered for it."
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[340px_1fr]">
          <aside className="space-y-8">
            <Filter label="Service" options={SERVICES} value={service} onChange={setService} />
            <Filter label="Size range" options={SIZES} value={size} onChange={setSize} />
            <Filter label="Pressure class" options={PRESSURES} value={press} onChange={setPress} />
          </aside>

          <div>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="eyebrow">{matches.length} match{matches.length === 1 ? "" : "es"}</span>
              <button
                onClick={() => { setService("Any"); setSize("Any"); setPress("Any"); }}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Reset
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {matches.map((p) => (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="group flex items-start justify-between gap-6 border border-border bg-card p-6 transition hover:border-foreground"
                >
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{p.shortName}</div>
                    <h3 className="mt-2 text-xl text-foreground">{p.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
                </Link>
              ))}
              {matches.length === 0 && (
                <div className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                  No exact match. Talk to engineering for a custom configuration.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Filter<T extends string>({
  label, options, value, onChange,
}: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <div className="eyebrow">{label}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-sm border px-3 py-2 text-sm transition ${
              value === o
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
