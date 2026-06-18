import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/ask-the-experts")({
  head: () => ({
    meta: [
      { title: "Ask The Experts | Max-Seal" },
      {
        name: "description",
        content:
          "Get a Max-Seal valve engineer on your application. Send line conditions, drawings, or a tag list and we will recommend the right valve.",
      },
      { property: "og:title", content: "Ask The Experts | Max-Seal" },
      { property: "og:url", content: "/ask-the-experts" },
    ],
    links: [{ rel: "canonical", href: "/ask-the-experts" }],
  }),
  component: AskExpertsPage,
});

const TOPICS = [
  "Valve sizing or selection",
  "Material compatibility",
  "Replacement for an existing valve",
  "Actuation sizing",
  "Cryogenic or severe service",
  "Other",
];

function AskExpertsPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Engineer Support"
        title={
          <>
            Ask the
            <br />
            <span className="text-brand">Max-Seal experts.</span>
          </>
        }
        lede="A US-based engineer will review your question and reply within one business day. Send line conditions, drawings, or a tag list. We will recommend the right valve."
      />
      <Section>
        <Breadcrumbs items={[{ label: "Ask The Experts" }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {sent ? (
              <div className="border border-brand bg-secondary/40 p-8">
                <div className="eyebrow text-brand">Thank you</div>
                <h2 className="mt-3 font-display text-3xl text-foreground">
                  Your question is in the queue.
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  An engineer will follow up within one business day. Need to add drawings? Reply to the confirmation email.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/products"
                    className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background"
                  >
                    Browse products
                  </Link>
                  <Link
                    to="/products/selector"
                    className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest"
                  >
                    Try the selector
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <Field label="Name">
                  <input type="text" required className="field" />
                </Field>
                <Field label="Work email">
                  <input type="email" required className="field" />
                </Field>
                <Field label="Company">
                  <input type="text" className="field" />
                </Field>
                <Field label="Topic">
                  <select required className="field">
                    <option value="">Choose a topic</option>
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Your question">
                  <textarea
                    required
                    rows={6}
                    className="field min-h-[160px] py-3"
                    placeholder="Service, media, pressure, temperature, size. Paste a tag list if helpful."
                  />
                </Field>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center rounded-sm bg-brand px-6 font-display text-xs uppercase tracking-widest text-brand-foreground hover:bg-brand/90"
                >
                  Send to an engineer
                </button>
              </form>
            )}
          </div>
          <aside className="space-y-6">
            <div className="border border-border bg-secondary/40 p-6">
              <div className="eyebrow">What to send</div>
              <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                <li>Service media and concentration</li>
                <li>Pressure and temperature, normal and upset</li>
                <li>Pipe size, schedule, and flange spec</li>
                <li>Operation: manual, pneumatic, or electric</li>
                <li>Standards: API, ISO, AWWA, NSF, PED</li>
              </ul>
            </div>
            <div className="border border-border bg-card p-6">
              <div className="eyebrow">Other ways to reach us</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link to="/products/selector" className="hover:text-brand">
                    Use the product selector
                  </Link>
                </li>
                <li>
                  <Link to="/request-a-quote" className="hover:text-brand">
                    Request a quote
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-brand">
                    Contact a regional rep
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
      <CtaBand />
      <style>{`
        .field { display:block; width:100%; height:48px; border:1px solid hsl(var(--border)); background:hsl(var(--background)); padding:0 14px; font-size:14px; color:hsl(var(--foreground)); border-radius:2px; outline:none; transition:border-color .15s; }
        .field:focus { border-color:hsl(var(--foreground)); }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow block">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
