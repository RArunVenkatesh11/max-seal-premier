import { CtaButton } from "./CtaButton";

export function CtaBand({
  title = "Specify with confidence.",
  body = "Send line conditions, materials, and quantities. You will get a clear quote with the right valve.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="cinematic border-y border-line">
      <div className="container-page grid gap-10 py-20 md:grid-cols-[1.4fr_1fr] md:items-end md:py-24">
        <div>
          <div className="eyebrow text-white/50">Next step</div>
          <h2 className="mt-3 max-w-2xl text-3xl text-white md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-white/70">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <CtaButton to="/request-a-quote" variant="brand">
            Request a Quote
          </CtaButton>
          <CtaButton to="/contact" variant="ghost-invert">
            Talk to Engineering
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
