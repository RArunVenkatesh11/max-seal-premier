import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES, PRODUCT_FAMILIES, HOME_IMAGES } from "@/data/site";
import { PageHero } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { CardMedia, industryImage } from "@/components/site/Media";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries We Serve | Max-Seal" },
      {
        name: "description",
        content:
          "Explore Max-Seal butterfly valve solutions by industry. Water, chemical, oil and gas, power, food, and mining.",
      },
      { property: "og:title", content: "Industries We Serve | Max-Seal" },
    ],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Specified where
            <br />
            <span className="text-brand">uptime matters.</span>
          </>
        }
        lede="From municipal water plants to LNG terminals, Max-Seal valves serve operators who measure success in years between failures, not transactions."
        image={HOME_IMAGES.oilGas}
        imageAlt="Industrial pipeline facility at dusk"
      />

      <section className="bg-background py-14 md:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {INDUSTRIES.map((i) => {
            const families = PRODUCT_FAMILIES.filter((p) =>
              i.recommendedFamilies.includes(p.slug),
            );
            return (
              <article
                key={i.slug}
                className="group flex h-full flex-col border border-border bg-card transition hover:border-foreground/60"
              >
                <Link
                  to="/industries/$slug"
                  params={{ slug: i.slug }}
                  className="block overflow-hidden"
                  aria-label={i.name}
                >
                  <CardMedia
                    src={industryImage(i.slug)}
                    alt={`${i.name} application`}
                    label={`${i.applications.length} applications`}
                    imgClassName="group-hover:scale-[1.03]"
                  />
                </Link>
                <Link
                  to="/industries/$slug"
                  params={{ slug: i.slug }}
                  className="block p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="eyebrow">Industry</div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-foreground group-hover:text-brand">
                    {i.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{i.lede}</p>
                </Link>

                <div className="grid gap-6 border-t border-border p-7 sm:grid-cols-2">
                  <div>
                    <div className="eyebrow">Common challenges</div>
                    <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                      {i.challenges.slice(0, 3).map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="eyebrow">Typical valve needs</div>
                    <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                      {i.valveNeeds.slice(0, 3).map((v) => (
                        <li key={v} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border p-5">
                  <div className="min-w-0">
                    <div className="eyebrow">Recommended families</div>
                    <div className="mt-2 font-display text-sm tracking-wide text-foreground">
                      {families.map((f) => f.shortName).join(" / ")}
                    </div>
                  </div>
                  <Link
                    to="/industries/$slug"
                    params={{ slug: i.slug }}
                    className="inline-flex h-10 shrink-0 items-center rounded-sm bg-foreground px-4 font-display text-[0.7rem] uppercase tracking-widest text-background hover:bg-foreground/90"
                  >
                    View solutions
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
