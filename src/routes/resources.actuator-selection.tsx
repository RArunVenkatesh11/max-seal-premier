import { createFileRoute } from "@tanstack/react-router";
import { ResourceCategoryPage } from "@/components/site/ResourceCategoryPage";

export const Route = createFileRoute("/resources/actuator-selection")({
  head: () => ({
    meta: [
      { title: "Actuator Selection | Max-Seal Resources" },
      { name: "description", content: "Size and specify pneumatic and electric actuators for Max-Seal butterfly valves." },
      { property: "og:title", content: "Actuator Selection | Max-Seal Resources" },
      { property: "og:url", content: "/resources/actuator-selection" },
    ],
    links: [{ rel: "canonical", href: "/resources/actuator-selection" }],
  }),
  component: () => (
    <ResourceCategoryPage
      title="Actuator Selection"
      description="Torque tables, supply pressure planning, and fail-safe selection for every Max-Seal actuator program."
      category="Actuator"
      slug="actuator-selection"
    />
  ),
});
