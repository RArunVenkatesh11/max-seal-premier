import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NAV, type NavItem } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openMenu(label: string) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActiveMenu(label);
  }
  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 120);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled || activeMenu
          ? "border-border bg-background/95 backdrop-blur-md"
          : "border-transparent bg-background/0",
      )}
    >
      <div className="container-page grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6 md:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-foreground text-background">
            <span className="font-mono text-sm font-bold">M</span>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Max<span className="text-brand">-</span>Seal
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.groups && openMenu(item.label)}
              onMouseLeave={scheduleClose}
            >
              <Link
                to={item.href}
                className={cn(
                  "inline-flex h-10 items-center gap-1 rounded-sm px-3 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-foreground/65 hover:text-foreground",
                )}
              >
                {item.label}
                {item.groups && <ChevronDown className="h-3.5 w-3.5 opacity-50" />}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/request-a-quote"
            className="hidden h-10 items-center rounded-sm bg-foreground px-4 text-sm font-medium text-background transition hover:bg-foreground/90 md:inline-flex"
          >
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-border lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega menu panel */}
      {activeMenu && (
        <div
          className="hidden lg:block"
          onMouseEnter={() => openMenu(activeMenu)}
          onMouseLeave={scheduleClose}
        >
          <MegaPanel item={NAV.find((n) => n.label === activeMenu)!} />
        </div>
      )}

      {/* Mobile collapsible */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page max-h-[calc(100vh-4rem)] overflow-y-auto py-2">
            {NAV.map((item) => (
              <MobileItem key={item.href} item={item} />
            ))}
            <Link
              to="/request-a-quote"
              className="my-4 inline-flex h-12 w-full items-center justify-center rounded-sm bg-brand text-base font-medium text-brand-foreground"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function MegaPanel({ item }: { item: NavItem }) {
  if (!item.groups) return null;
  return (
    <div className="border-t border-border bg-background shadow-elevated">
      <div className="container-page py-8">
        <div
          className={cn(
            "grid gap-10",
            item.groups.length === 1 && "md:grid-cols-2 lg:grid-cols-3",
            item.groups.length === 2 && "lg:grid-cols-2",
            item.groups.length >= 3 && "lg:grid-cols-3",
          )}
        >
          {item.groups.map((group) => (
            <div key={group.title}>
              <div className="eyebrow text-muted-foreground">{group.title}</div>
              <ul className="mt-4 space-y-1.5">
                {group.items.map((sub) => (
                  <li key={sub.href}>
                    <Link
                      to={sub.href}
                      className="group block rounded-sm py-1.5 transition-colors"
                    >
                      <span className="block text-sm text-foreground group-hover:text-brand">
                        {sub.label}
                      </span>
                      {sub.description && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {sub.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileItem({ item }: { item: NavItem }) {
  const [expanded, setExpanded] = useState(false);
  if (!item.groups) {
    return (
      <Link
        to={item.href}
        className="block border-b border-border py-4 text-base font-medium text-foreground"
      >
        {item.label}
      </Link>
    );
  }
  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-between">
        <Link
          to={item.href}
          className="block flex-1 py-4 text-base font-medium text-foreground"
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Collapse" : "Expand"}
          className="grid h-10 w-10 place-items-center text-muted-foreground"
        >
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
          />
        </button>
      </div>
      {expanded && (
        <div className="pb-4 pl-3">
          {item.groups.map((g) => (
            <div key={g.title} className="mt-2">
              <div className="eyebrow text-muted-foreground">{g.title}</div>
              <ul className="mt-2 space-y-1">
                {g.items.map((sub) => (
                  <li key={sub.href}>
                    <Link
                      to={sub.href}
                      className="block py-2 text-sm text-foreground/85"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
