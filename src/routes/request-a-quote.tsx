import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/Section";
import { PRODUCT_FAMILIES, INDUSTRIES } from "@/data/site";
import { Check } from "lucide-react";

export const Route = createFileRoute("/request-a-quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote | Max-Seal" },
      {
        name: "description",
        content: "Request an engineered butterfly valve quote from Max-Seal. Send your line conditions for a precise response.",
      },
    ],
  }),
  component: QuotePage,
});

// Form schema — designed to map to a future CMS / lead pipeline.
const QUOTE_FIELDS = {
  contact: ["name", "company", "email", "phone"],
  project: ["industry", "family", "size", "pressure", "temperature", "quantity"],
  details: ["fluid", "service", "notes"],
};

function QuotePage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title={<>Send line conditions. <span className="text-brand">Get a precise response.</span></>}
        lede="Tell us about the service. A real engineer will reply, usually within one business day, with a recommendation and a quote."
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-10 border border-border bg-card p-8 md:p-10"
          >
            {sent ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-brand text-brand-foreground">
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-2xl">Request received.</h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  An engineer will review your specifications and respond shortly. Check your inbox for confirmation.
                </p>
              </div>
            ) : (
              <>
                <Fieldset legend="Contact">
                  <Input name="name" label="Full name" required />
                  <Input name="company" label="Company" required />
                  <Input name="email" label="Email" type="email" required />
                  <Input name="phone" label="Phone" />
                </Fieldset>

                <Fieldset legend="Project">
                  <Select
                    name="industry"
                    label="Industry"
                    options={["Select", ...INDUSTRIES.map((i) => i.name)]}
                  />
                  <Select
                    name="family"
                    label="Product family"
                    options={["Not sure yet", ...PRODUCT_FAMILIES.map((p) => p.shortName)]}
                  />
                  <Input name="size" label="Valve size" placeholder='e.g. 8"' />
                  <Input name="pressure" label="Pressure" placeholder="e.g. ANSI 300" />
                  <Input name="temperature" label="Temperature" placeholder="e.g. 400°F" />
                  <Input name="quantity" label="Quantity" placeholder="e.g. 12 ea" />
                </Fieldset>

                <Fieldset legend="Service">
                  <Input name="fluid" label="Fluid" />
                  <Input name="service" label="Service description" />
                  <Textarea name="notes" label="Notes" rows={5} />
                </Fieldset>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  <p className="text-xs text-muted-foreground">
                    Your information is used only to respond to this quote.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center rounded-sm bg-foreground px-7 text-sm font-medium text-background hover:bg-foreground/90"
                  >
                    Submit Request
                  </button>
                </div>
              </>
            )}
          </form>

          <aside className="space-y-8">
            <div className="border border-border bg-card p-8">
              <h3 className="text-lg">What you will receive</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Recommended valve family and trim</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Detailed line-item pricing</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Lead time and stock availability</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Datasheets and certifications on request</li>
              </ul>
            </div>
            <div className="border border-border bg-card p-8">
              <h3 className="text-lg">Prefer to talk?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Engineers answer the phone during US business hours.
              </p>
              <div className="mt-4 font-mono text-sm text-foreground">+1 (000) 000-0000</div>
              <div className="font-mono text-sm text-foreground">sales@max-seal.example</div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow">{legend}</legend>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <input
        {...props}
        className="mt-2 h-11 w-full rounded-sm border border-border bg-background px-3 text-sm outline-none transition focus:border-foreground"
      />
    </label>
  );
}

function Textarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="col-span-full block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <textarea
        {...props}
        className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-foreground"
      />
    </label>
  );
}

function Select({ label, options, ...props }: { label: string; options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <select
        {...props}
        className="mt-2 h-11 w-full rounded-sm border border-border bg-background px-3 text-sm outline-none transition focus:border-foreground"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
