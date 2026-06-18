import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Max-Seal | US-Based Butterfly Valve Support" },
      {
        name: "description",
        content: "Reach the Max-Seal engineering and sales team. US-based phone and email support for butterfly valve applications.",
      },
    ],
  }),
  component: ContactPage,
});

const OFFICES = [
  { city: "Houston, TX", role: "Headquarters and engineering", phone: SITE.phone, email: SITE.email },
  { city: "Chicago, IL", role: "Midwest sales and stock", phone: SITE.phone, email: SITE.email },
  { city: "Los Angeles, CA", role: "West Coast sales", phone: SITE.phone, email: SITE.email },
];

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Real engineers. <span className="text-brand">Real phone numbers.</span></>}
        lede="Application questions, quote follow-ups, and after-sale support. The team that picks up is the team that ships."
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container-page grid gap-10 md:grid-cols-3">
          <Card icon={<Phone className="h-5 w-5" />} title="Call" value={SITE.phone} sub="Mon–Fri, 8a–6p CT" />
          <Card icon={<Mail className="h-5 w-5" />} title="Email" value={SITE.email} sub="Replies within one business day" />
          <Card icon={<MapPin className="h-5 w-5" />} title="Headquarters" value={SITE.address} sub="Engineering and assembly" />
        </div>

        <div className="container-page mt-20">
          <div className="eyebrow">Offices</div>
          <div className="mt-6 grid gap-px bg-border md:grid-cols-3">
            {OFFICES.map((o) => (
              <div key={o.city} className="bg-background p-8">
                <h3 className="text-xl">{o.city}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{o.role}</div>
                <div className="mt-5 space-y-1 font-mono text-sm">
                  <div>{o.phone}</div>
                  <div>{o.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Card({ icon, title, value, sub }: { icon: React.ReactNode; title: string; value: string; sub: string }) {
  return (
    <div className="border border-border bg-card p-8">
      <div className="grid h-10 w-10 place-items-center rounded-sm bg-secondary text-foreground">{icon}</div>
      <div className="mt-6 eyebrow">{title}</div>
      <div className="mt-2 text-xl font-medium text-foreground">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
    </div>
  );
}
