import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PRODUCT_FAMILIES } from "@/data/site";
import { PageHero } from "@/components/site/Section";
import { ProductCard } from "@/components/site/ProductCard";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Butterfly Valve Products | Max-Seal" },
      {
        name: "description",
        content:
          "Resilient seated, high performance, triple offset, and PFA lined butterfly valves engineered for demanding service.",
      },
      { property: "og:title", content: "Butterfly Valve Products | Max-Seal" },
    ],
  }),
  component: ProductsLayout,
});

function ProductsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/products") return <ProductsIndex />;
  return <Outlet />;
}

function ProductsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Products / Engineered butterfly valves"
        title={<>Four platforms. <span className="text-brand">One standard.</span></>}
        lede="Every Max-Seal valve is selected, tested, and supported by engineers. Browse the families or use the selector to match service conditions to the right valve."
      />

      <section className="border-b border-border bg-background">
        <div className="container-page flex flex-wrap items-center gap-3 py-6">
          <span className="eyebrow">Quick links</span>
          <Link to="/products/selector" className="rounded-sm border border-border px-4 py-2 text-sm hover:bg-secondary">
            Product Selector
          </Link>
          <Link to="/products/compare" className="rounded-sm border border-border px-4 py-2 text-sm hover:bg-secondary">
            Compare Families
          </Link>
          <Link to="/resources" className="rounded-sm border border-border px-4 py-2 text-sm hover:bg-secondary">
            Catalogs and Datasheets
          </Link>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {PRODUCT_FAMILIES.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
