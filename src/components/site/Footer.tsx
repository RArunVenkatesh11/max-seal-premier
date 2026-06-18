import { Link } from "@tanstack/react-router";
import { SITE, PRODUCT_FAMILIES, INDUSTRIES, RESOURCE_CATEGORIES } from "@/data/site";

export function Footer() {
  return (
    <footer className="cinematic mt-24 border-t border-line">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-sm bg-white text-ink">
              <span className="font-mono text-sm font-bold">M</span>
            </span>
            <span className="font-display text-lg font-semibold text-white">
              Max<span className="text-brand">-</span>Seal
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm text-white/60">
            Engineered butterfly valves. One source for resilient seated, high performance, triple offset, cryogenic, and AWWA solutions.
          </p>
          <div className="mt-6 space-y-1 font-mono text-xs text-white/50">
            <div>{SITE.address}</div>
            <div>{SITE.phone}</div>
            <div>{SITE.email}</div>
          </div>
        </div>

        <FooterCol
          title="Products"
          items={[
            { label: "All Products", href: "/products" },
            { label: "Product Selector", href: "/products/selector" },
            { label: "Compare Families", href: "/products/compare" },
            { label: "Valve Families", href: "/products/valve-families" },
            { label: "Automation & Accessories", href: "/products/automation-accessories" },
            { label: "Product Downloads", href: "/products/downloads" },
          ]}
        />
        <FooterCol
          title="Featured Series"
          items={PRODUCT_FAMILIES.slice(0, 7).map((p) => ({
            label: p.shortName,
            href: `/products/${p.slug}`,
          }))}
        />
        <FooterCol
          title="Industries"
          items={INDUSTRIES.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))}
        />
        <FooterCol
          title="Resources"
          items={[
            { label: "All Resources", href: "/resources" },
            ...RESOURCE_CATEGORIES.map((c) => ({
              label: c.label,
              href: `/resources/${c.slug}`,
            })),
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "About", href: "/about" },
            { label: "Team", href: "/about/team" },
            { label: "End Users", href: "/about/end-users" },
            { label: "Global Partners", href: "/about/global-partners" },
            { label: "Engineering Advantage", href: "/engineering-advantage" },
            { label: "Ask The Experts", href: "/ask-the-experts" },
            { label: "Contact", href: "/contact" },
            { label: "Request a Quote", href: "/request-a-quote" },
          ]}
        />
      </div>

      <div className="border-t border-line/60">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Max-Seal. All rights reserved.</div>
          <div className="font-mono uppercase tracking-widest">Made in the USA</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="eyebrow text-white/50">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              to={i.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
