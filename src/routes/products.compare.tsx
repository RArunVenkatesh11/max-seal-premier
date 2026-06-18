import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCT_FAMILIES } from "@/data/site";
import { PageHero } from "@/components/site/Section";

export const Route = createFileRoute("/products/compare")({
  head: () => ({
    meta: [
      { title: "Compare Butterfly Valve Families | Max-Seal" },
      {
        name: "description",
        content: "Side-by-side comparison of Max-Seal resilient seated, high performance, triple offset, and PFA lined butterfly valves.",
      },
    ],
  }),
  component: Compare,
});

function Compare() {
  const rows: { label: string; get: (p: (typeof PRODUCT_FAMILIES)[number]) => string }[] = [
    { label: "Pressure", get: (p) => p.pressureClass },
    { label: "Temperature", get: (p) => p.temperatureRange },
    { label: "Size range", get: (p) => p.sizeRange },
    { label: "Body materials", get: (p) => p.bodyMaterial.join(", ") },
    { label: "Seal materials", get: (p) => p.sealMaterial.join(", ") },
    { label: "Certifications", get: (p) => p.certifications.join(", ") },
  ];

  return (
    <>
      <PageHero
        eyebrow="Compare families"
        title={<>Specifications, <span className="text-brand">side by side.</span></>}
        lede="A quick read on where each Max-Seal family fits. For application-specific selection, talk to engineering."
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container-page overflow-x-auto">
          <table className="w-full min-w-[860px] border border-border text-sm">
            <thead>
              <tr className="bg-secondary">
                <th className="w-48 border-b border-border p-4 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Specification
                </th>
                {PRODUCT_FAMILIES.map((p) => (
                  <th key={p.slug} className="border-b border-l border-border p-4 text-left">
                    <Link to={`/products/${p.slug}`} className="block hover:text-brand">
                      <div className="text-base font-semibold text-foreground">{p.shortName}</div>
                      <div className="mt-1 text-xs font-normal text-muted-foreground">{p.tagline}</div>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <th className="p-4 text-left align-top font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {row.label}
                  </th>
                  {PRODUCT_FAMILIES.map((p) => (
                    <td key={p.slug} className="border-l border-border p-4 align-top text-foreground">
                      {row.get(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
