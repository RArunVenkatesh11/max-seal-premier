import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  PRODUCT_FAMILIES,
  SELECTOR,
} from "@/data/site";
import { PageHero } from "@/components/site/Section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/selector")({
  head: () => ({
    meta: [
      { title: "Butterfly Valve Selector | Max-Seal" },
      {
        name: "description",
        content:
          "Answer six short questions and Max-Seal will recommend the right butterfly valve families for your service.",
      },
      { property: "og:title", content: "Butterfly Valve Selector | Max-Seal" },
      {
        property: "og:description",
        content: "A guided selection assistant for engineers, distributors, and procurement teams.",
      },
    ],
  }),
  component: SelectorWizard,
});

type Answers = {
  industry: string | null;
  media: string | null;
  priority: string | null;
  valveType: string | null;
  operation: string | null;
  support: string | null;
};

const initial: Answers = {
  industry: null,
  media: null,
  priority: null,
  valveType: "any",
  operation: null,
  support: null,
};

type Step = {
  key: keyof Answers;
  label: string;
  question: string;
  helper?: string;
  options: { value: string; label: string }[];
};

function buildSteps(): Step[] {
  return [
    {
      key: "industry",
      label: "Industry",
      question: "What industry are you working in?",
      helper: "We will weight materials, certifications, and standards by industry.",
      options: SELECTOR.industries,
    },
    {
      key: "media",
      label: "Media",
      question: "What media or process condition is involved?",
      helper: "Pick the closest match. We confirm trace constituents during the quote.",
      options: SELECTOR.media.map((m) => ({ value: m, label: m })),
    },
    {
      key: "priority",
      label: "Priority",
      question: "What performance requirement matters most?",
      helper: "We weight the recommendation against this priority.",
      options: SELECTOR.priorities,
    },
    {
      key: "valveType",
      label: "Type",
      question: "What valve type are you considering?",
      helper: "If you are not sure, pick Open to recommendation.",
      options: SELECTOR.valveTypes,
    },
    {
      key: "operation",
      label: "Operation",
      question: "What operation method do you need?",
      options: SELECTOR.operations.map((o) => ({ value: o, label: o })),
    },
    {
      key: "support",
      label: "Support",
      question: "Do you want a Max-Seal engineer to follow up?",
      options: SELECTOR.support,
    },
  ];
}

function SelectorWizard() {
  const steps = useMemo(buildSteps, []);
  const [answers, setAnswers] = useState<Answers>(initial);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const current = steps[step];
  const value = answers[current.key];
  const canNext = value !== null && value !== "";

  function choose(v: string) {
    setAnswers((a) => ({ ...a, [current.key]: v }));
  }

  function next() {
    if (step === steps.length - 1) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (done) {
      setDone(false);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setAnswers(initial);
    setStep(0);
    setDone(false);
  }

  const progress = done ? 100 : Math.round(((step) / steps.length) * 100);

  return (
    <>
      <PageHero
        eyebrow="Guided product selector"
        title={
          <>
            Six questions.
            <br />
            <span className="text-brand">A specified shortlist.</span>
          </>
        }
        lede="Answer six short questions about your service. We will return the families that fit, with reasons and next steps."
      />

      <section className="bg-background py-14 md:py-20">
        <div className="container-page max-w-4xl">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              {done ? "Results" : `Step ${step + 1} of ${steps.length} · ${current.label}`}
            </div>
            <div className="font-display text-[0.7rem] uppercase tracking-widest text-brand">
              {progress}%
            </div>
          </div>
          <div className="mt-3 h-[2px] w-full bg-border">
            <div
              className="h-full bg-brand transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!done ? (
            <div className="mt-12">
              <h2 className="font-display text-3xl text-foreground md:text-4xl">
                {current.question}
              </h2>
              {current.helper && (
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{current.helper}</p>
              )}

              <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {current.options.map((o) => {
                  const active = value === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => choose(o.value)}
                      className={cn(
                        "group flex items-center justify-between rounded-sm border bg-card px-5 py-4 text-left transition",
                        active
                          ? "border-brand shadow-elevated"
                          : "border-border hover:border-foreground/60",
                      )}
                    >
                      <span className="font-display text-base text-foreground">{o.label}</span>
                      <span
                        className={cn(
                          "grid h-5 w-5 place-items-center rounded-full border transition",
                          active ? "border-brand bg-brand" : "border-border",
                        )}
                      >
                        {active && <Check className="h-3 w-3 text-brand-foreground" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex h-11 items-center gap-2 rounded-sm px-2 font-display text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!canNext}
                  className="inline-flex h-11 items-center gap-2 rounded-sm bg-foreground px-6 font-display text-xs uppercase tracking-widest text-background transition hover:bg-foreground/90 disabled:opacity-30"
                >
                  {step === steps.length - 1 ? "See recommendations" : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <Results answers={answers} onRestart={restart} onBack={back} />
          )}
        </div>
      </section>
    </>
  );
}

function Results({
  answers,
  onRestart,
  onBack,
}: {
  answers: Answers;
  onRestart: () => void;
  onBack: () => void;
}) {
  const ranked = useMemo(() => rankFamilies(answers), [answers]);

  return (
    <div className="mt-10">
      <h2 className="font-display text-3xl text-foreground md:text-4xl">
        Based on your answers, start here.
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        These families fit the service you described. Tap into a product for full specs, or send
        the brief to an engineer for sign-off.
      </p>

      <div className="mt-8 space-y-4">
        {ranked.map((r, idx) => (
          <article
            key={r.product.slug}
            className="grid gap-6 border border-border bg-card p-6 md:grid-cols-[auto_1fr_auto] md:items-start md:p-7"
          >
            <div className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-brand">
              Match {String(idx + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-display text-2xl text-foreground">{r.product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.product.tagline}</p>
              {r.reasons.length > 0 && (
                <ul className="mt-4 space-y-1.5 text-sm">
                  {r.reasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-2 text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {reason}
                    </li>
                  ))}
                </ul>
              )}
              {r.product.considerations.length > 0 && (
                <div className="mt-4">
                  <div className="eyebrow">Key considerations</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {r.product.considerations.join(". ")}.
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 md:w-44">
              <Link
                to="/products/$slug"
                params={{ slug: r.product.slug }}
                className="inline-flex h-10 items-center justify-center rounded-sm bg-foreground px-4 font-display text-[0.7rem] uppercase tracking-widest text-background hover:bg-foreground/90"
              >
                View product
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-10 items-center justify-center rounded-sm border border-border px-4 font-display text-[0.7rem] uppercase tracking-widest hover:bg-secondary"
              >
                Ask an engineer
              </Link>
              <Link
                to="/request-a-quote"
                className="inline-flex h-10 items-center justify-center rounded-sm border border-brand px-4 font-display text-[0.7rem] uppercase tracking-widest text-brand hover:bg-brand hover:text-brand-foreground"
              >
                Request a quote
              </Link>
            </div>
          </article>
        ))}

        {ranked.length === 0 && (
          <div className="border border-dashed border-border p-10 text-center">
            <h3 className="font-display text-xl text-foreground">
              No clean match in standard product lines.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your service may need a configured trim. Talk to an engineer to scope it.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
            >
              Talk to engineering
            </Link>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center gap-2 rounded-sm px-2 font-display text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Adjust answers
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex h-11 items-center rounded-sm border border-border px-5 font-display text-xs uppercase tracking-widest hover:bg-secondary"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

function rankFamilies(a: Answers) {
  const reasonsFor = new Map<string, string[]>();
  const score = new Map<string, number>();

  for (const p of PRODUCT_FAMILIES) {
    let s = 1;
    const r: string[] = [];

    if (a.industry && p.industries.includes(a.industry)) {
      s += 3;
      r.push(`Engineered for the ${labelFor(a.industry, "industry")} industry`);
    }
    if (a.media && p.mediaTypes.includes(a.media)) {
      s += 3;
      r.push(`Rated for ${a.media} service`);
    }
    if (a.valveType && a.valveType !== "any" && p.valveType === a.valveType) {
      s += 4;
      r.push("Matches the valve type you selected");
    }
    if (a.operation && p.operationTypes.includes(a.operation as never)) {
      s += 1;
      r.push(`Supports ${a.operation.toLowerCase()} operation`);
    }
    if (a.priority) {
      if (a.priority === "zero-leak" && p.valveType === "triple-offset") {
        s += 4;
        r.push("Zero leakage shutoff to ISO 5208 Rate A");
      }
      if (a.priority === "corrosion" && p.valveType === "pfa-lined") {
        s += 4;
        r.push("Zero metallic wetted parts for aggressive chemistry");
      }
      if (
        a.priority === "high-pressure" &&
        (p.valveType === "triple-offset" || p.valveType === "high-performance")
      ) {
        s += 3;
        r.push("Rated for elevated pressure and temperature");
      }
      if (a.priority === "low-cost" && p.valveType === "resilient-seated") {
        s += 3;
        r.push("Best value for general utility service");
      }
      if (a.priority === "low-emission" && p.valveType !== "resilient-seated") {
        s += 2;
        r.push("Fugitive emissions packing available");
      }
    }

    score.set(p.slug, s);
    reasonsFor.set(p.slug, r);
  }

  return PRODUCT_FAMILIES.map((p) => ({
    product: p,
    reasons: reasonsFor.get(p.slug) ?? [],
    score: score.get(p.slug) ?? 0,
  }))
    .filter((r) => r.score > 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function labelFor(value: string, kind: "industry" | "valve") {
  if (kind === "industry") {
    return SELECTOR.industries.find((i) => i.value === value)?.label ?? value;
  }
  if (kind === "valve") {
    return SELECTOR.valveTypes.find((v) => v.value === value)?.label ?? value;
  }
  return value;
}

