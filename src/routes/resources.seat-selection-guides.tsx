import { createFileRoute } from "@tanstack/react-router";
import { ResourceCategoryPage } from "@/components/site/ResourceCategoryPage";

export const Route = createFileRoute("/resources/seat-selection-guides")({
  head: () => ({
    meta: [
      { title: "Seat Selection Guides | Max-Seal Resources" },
      { name: "description", content: "Elastomer and metal seat selection guides by service media and temperature." },
      { property: "og:title", content: "Seat Selection Guides | Max-Seal Resources" },
      { property: "og:url", content: "/resources/seat-selection-guides" },
    ],
    links: [{ rel: "canonical", href: "/resources/seat-selection-guides" }],
  }),
  component: () => (
    <ResourceCategoryPage
      title="Seat Selection Guides"
      description="Pick the right seat for your media. Elastomer compatibility tables, metal seat options, and service limits."
      category="Seat Guide"
      slug="seat-selection-guides"
    />
  ),
});
