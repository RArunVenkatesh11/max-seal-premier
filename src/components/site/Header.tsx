import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
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

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/request-a-quote"
            className="hidden h-10 items-center rounded-sm bg-foreground px-5 text-sm font-medium text-background transition hover:bg-foreground/90 md:inline-flex"
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

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-4">
            {SITE.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="border-b border-border py-4 text-base font-medium text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/request-a-quote"
              className="mt-4 inline-flex h-12 items-center justify-center rounded-sm bg-brand text-base font-medium text-brand-foreground"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
