import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/resources/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Max-Seal" },
      { name: "description", content: "Standard commercial terms and conditions of sale for Max-Seal products." },
      { property: "og:title", content: "Terms and Conditions | Max-Seal" },
      { property: "og:url", content: "/resources/terms" },
    ],
    links: [{ rel: "canonical", href: "/resources/terms" }],
  }),
  component: TermsPage,
});

const SECTIONS = [
  { title: "Acceptance", body: "Orders are accepted subject to these terms. Any conflicting purchase order conditions are excluded unless agreed in writing." },
  { title: "Quotations", body: "Quotations are valid for thirty days unless stated otherwise. Pricing is in US dollars, ex works, US warehouse." },
  { title: "Delivery", body: "Stated lead times are estimates. Title and risk pass on delivery to the carrier at the named place." },
  { title: "Warranty", body: "Max-Seal products carry a twelve month warranty from shipment against defects in materials and workmanship." },
  { title: "Limitation of liability", body: "Liability is limited to the value of the goods supplied. Max-Seal is not liable for consequential or indirect loss." },
  { title: "Governing law", body: "These terms are governed by the laws of the State of Texas, USA." },
];

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources / Terms"
        title={
          <>
            Terms and
            <br />
            <span className="text-brand">conditions.</span>
          </>
        }
        lede="The standard commercial terms applicable to Max-Seal quotations, orders, and shipments. A full PDF is available on request."
      />
      <Section>
        <Breadcrumbs
          items={[{ label: "Resources", to: "/resources" }, { label: "Terms and Conditions" }]}
        />
        <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
          {SECTIONS.map((s) => (
            <div key={s.title} className="bg-background p-6">
              <h3 className="font-display text-lg text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background"
          >
            Request the full PDF
          </Link>
          <Link
            to="/resources"
            className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest"
          >
            Back to resources
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
