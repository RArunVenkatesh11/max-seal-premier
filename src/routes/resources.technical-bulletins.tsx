import { createFileRoute } from "@tanstack/react-router";
import { ResourceCategoryPage } from "@/components/site/ResourceCategoryPage";

export const Route = createFileRoute("/resources/technical-bulletins")({
  head: () => ({
    meta: [
      { title: "Technical Bulletins | Max-Seal Resources" },
      { name: "description", content: "Engineering notes and service bulletins from the Max-Seal application team." },
      { property: "og:title", content: "Technical Bulletins | Max-Seal Resources" },
      { property: "og:url", content: "/resources/technical-bulletins" },
    ],
    links: [{ rel: "canonical", href: "/resources/technical-bulletins" }],
  }),
  component: () => (
    <ResourceCategoryPage
      title="Technical Bulletins"
      description="Engineering notes, service bulletins, and white papers on Max-Seal valve technology."
      category="Technical"
      slug="technical-bulletins"
    />
  ),
});
