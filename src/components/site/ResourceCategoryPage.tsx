import { Link } from "@tanstack/react-router";
import { Download, Lock } from "lucide-react";
import { PageHero, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { RESOURCES, type ResourceDoc, type ResourceCategory } from "@/data/site";

export function ResourceCategoryPage({
  title,
  description,
  category,
  slug,
}: {
  title: string;
  description: string;
  category: ResourceCategory;
  slug: string;
}) {
  const docs = RESOURCES.filter((r) => r.category === category);
  return (
    <>
      <PageHero
        eyebrow={`Resources / ${title}`}
        title={
          <>
            {title}
            <span className="text-brand">.</span>
          </>
        }
        lede={description}
      />
      <Section>
        <Breadcrumbs
          items={[
            { label: "Resources", to: "/resources" },
            { label: title },
          ]}
        />
        {docs.length === 0 ? (
          <EmptyState slug={slug} />
        ) : (
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {docs.map((d) => (
              <DocCard key={d.title} doc={d} />
            ))}
          </div>
        )}
        <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
          <Link
            to="/resources"
            className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest hover:bg-secondary"
          >
            All resources
          </Link>
          <Link
            to="/products/downloads"
            className="inline-flex h-11 items-center rounded-sm border border-border bg-background px-5 font-display text-xs uppercase tracking-widest hover:bg-secondary"
          >
            Product downloads
          </Link>
          <Link
            to="/ask-the-experts"
            className="inline-flex h-11 items-center rounded-sm bg-foreground px-5 font-display text-xs uppercase tracking-widest text-background"
          >
            Ask the experts
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

function DocCard({ doc }: { doc: ResourceDoc }) {
  return (
    <a
      href={doc.href}
      className="group flex items-center justify-between gap-4 border border-border bg-card p-5 transition hover:border-foreground/60"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {doc.gated && <Lock className="h-3 w-3 text-brand" />}
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            {doc.type} · {doc.size}
          </span>
        </div>
        <h3 className="mt-2 truncate font-display text-base text-foreground group-hover:text-brand">
          {doc.title}
        </h3>
      </div>
      <Download className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-brand" />
    </a>
  );
}

function EmptyState({ slug }: { slug: string }) {
  return (
    <div className="mt-10 border border-dashed border-border bg-secondary/40 p-10 text-center">
      <div className="eyebrow">Coming soon</div>
      <h3 className="mt-3 font-display text-2xl text-foreground">
        No documents indexed yet under {slug}.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Ask a Max-Seal engineer for the latest revision or request a specific document by email.
      </p>
    </div>
  );
}
