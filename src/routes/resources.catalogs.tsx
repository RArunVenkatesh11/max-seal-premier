import { createFileRoute } from "@tanstack/react-router";
import { ResourceCategoryPage } from "@/components/site/ResourceCategoryPage";

export const Route = createFileRoute("/resources/catalogs")({
  head: () => ({
    meta: [
      { title: "Catalogs | Max-Seal Resources" },
      { name: "description", content: "Master catalogue and product-family catalogues for every Max-Seal butterfly valve line." },
      { property: "og:title", content: "Catalogs | Max-Seal Resources" },
      { property: "og:url", content: "/resources/catalogs" },
    ],
    links: [{ rel: "canonical", href: "/resources/catalogs" }],
  }),
  component: () => (
    <ResourceCategoryPage
      title="Catalogs"
      description="The Max-Seal master catalogue and product-family catalogues. Specifications, materials, and pressure tables for every line."
      category="Catalog"
      slug="catalogs"
    />
  ),
});
