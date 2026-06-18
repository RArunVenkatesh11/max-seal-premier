import { createFileRoute } from "@tanstack/react-router";
import { ResourceCategoryPage } from "@/components/site/ResourceCategoryPage";

export const Route = createFileRoute("/resources/installation-maintenance")({
  head: () => ({
    meta: [
      { title: "Installation and Maintenance | Max-Seal Resources" },
      { name: "description", content: "Install, commission, and maintain Max-Seal valves. Step by step manuals and spare parts lists." },
      { property: "og:title", content: "Installation and Maintenance | Max-Seal Resources" },
      { property: "og:url", content: "/resources/installation-maintenance" },
    ],
    links: [{ rel: "canonical", href: "/resources/installation-maintenance" }],
  }),
  component: () => (
    <ResourceCategoryPage
      title="Installation and Maintenance"
      description="Step by step install and commissioning guides, plus maintenance and spare parts documentation."
      category="Installation"
      slug="installation-maintenance"
    />
  ),
});
