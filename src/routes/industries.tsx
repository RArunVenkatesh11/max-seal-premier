import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { INDUSTRIES } from "@/data/site";
import { PageHero } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve | Max-Seal" },
      {
        name: "description",
        content: "Max-Seal butterfly valves are deployed in water, chemical, oil and gas, power, food, and mining service.",
      },
    ],
  }),
  component: IndustriesLayout,
});

function IndustriesLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/industries") return <IndustriesIndex />;
  return <Outlet />;
}

function IndustriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Specified where <span className="text-brand">uptime matters.</span></>}
        lede="From municipal water plants to LNG terminals, Max-Seal valves serve operators who measure success in years between failures, not transactions."
      />

      <section className="bg-background py-20 md:py-28">
        <div className="container-page grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              to={`/industries/${i.slug}`}
              className="group flex h-full flex-col justify-between bg-background p-8 transition hover:bg-secondary"
            >
              <div>
                <div className="eyebrow">{i.applications.length} applications</div>
                <h3 className="mt-4 text-2xl">{i.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{i.lede}</p>
              </div>
              <ArrowUpRight className="mt-8 h-5 w-5 text-muted-foreground transition group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
