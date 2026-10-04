"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { canonicalComponentHref } from "@/lib/bases";
import { components } from "@/app/docs/components/components-data";
import { motion } from "framer-motion";

type DocsNavLink = {
  title: string;
  href: string;
  indicator?: boolean;
  ready?: boolean;
  /** Also active on child routes, e.g. /docs/installation/next. */
  matchNested?: boolean;
};

function isLinkActive(link: DocsNavLink, pathname: string) {
  if (pathname === link.href) return true;
  if (canonicalComponentHref(pathname) === link.href) return true;
  return Boolean(link.matchNested && pathname.startsWith(`${link.href}/`));
}

const getStartedLinks: DocsNavLink[] = [
  { title: "Introduction", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Installation", href: "/docs/installation", matchNested: true },
  { title: "Theming", href: "/docs/theming" },
  { title: "CLI", href: "/docs/cli" },
  { title: "Upgrade", href: "/docs/upgrade" },
  { title: "Typeset", href: "/docs/typeset" },
  { title: "Skills", href: "/docs/skills" },
  { title: "MCP", href: "/docs/mcp" },
  { title: "Registry", href: "/docs/registry" },
  { title: "Changelog", href: "/docs/changelog", indicator: true },
];

const componentLinks: DocsNavLink[] = components
  .filter(
    (item): item is (typeof components)[number] & { href: string } =>
      typeof item.href === "string"
  )
  .map((item) => ({
    title: item.name,
    href: item.href,
    ready: item.ready,
  }))
  .sort((a, b) => {
    const aReady = a.ready !== false
    const bReady = b.ready !== false
    if (aReady !== bReady) return aReady ? -1 : 1
    return a.title.localeCompare(b.title)
  })

const groups: { title: string; links: DocsNavLink[] }[] = [
  {
    title: "Get started",
    links: getStartedLinks,
  },
  {
    title: "Components",
    links: componentLinks,
  },
];

function DocsNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {group.title}
          </h3>
          <ul className="relative space-y-0.5 border-dotted-spaced-l">
            {group.links.map((link) => {
              const active = isLinkActive(link, pathname);
              const disabled = link.ready === false;

              return (
                <li key={link.href} className="relative">
                  {active && !disabled ? (
                    <motion.div
                      layoutId={`active-line-${group.title}`}
                      className="absolute top-0 left-0 z-10 h-full w-px bg-foreground"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  ) : null}
                  {disabled ? (
                    <span
                      aria-disabled="true"
                      className="flex w-full cursor-not-allowed items-center gap-2 border-l-2 border-transparent py-1 pl-3 text-xs leading-5 text-muted-foreground/50 no-underline"
                    >
                      <span className="min-w-0 truncate">{link.title}</span>
                      <span className="ms-auto shrink-0 rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium leading-none tracking-wide text-muted-foreground/70">
                        Coming soon
                      </span>
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2 border-l-2 border-transparent py-1 pl-3 text-xs leading-5 text-muted-foreground no-underline transition-colors hover:text-foreground",
                        active && "font-medium text-foreground"
                      )}
                    >
                      <span>{link.title}</span>
                      {link.indicator ? (
                        <span
                          aria-hidden
                          className="size-1.5 shrink-0 rounded-full bg-primary"
                        />
                      ) : null}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  const pathname = usePathname();
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [fadeBottom, setFadeBottom] = React.useState(true);

  const updateFade = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    setFadeBottom(remaining > 8);
  }, []);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateFade();
    el.addEventListener("scroll", updateFade, { passive: true });
    const observer = new ResizeObserver(updateFade);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateFade);
      observer.disconnect();
    };
  }, [pathname, updateFade]);

  return (
    <aside className="relative sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-[250px] shrink-0 overflow-hidden border-dotted-spaced-r lg:block">
      <div
        ref={scrollerRef}
        className="no-scrollbar h-full overflow-y-auto p-6"
      >
        <DocsNav pathname={pathname} />
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent transition-opacity duration-200",
          fadeBottom ? "opacity-100" : "opacity-0"
        )}
      />
    </aside>
  );
}

type DocsMobileNavContextValue = {
  open: () => void;
};

const DocsMobileNavContext =
  React.createContext<DocsMobileNavContextValue | null>(null);

export function DocsMobileMenuTrigger({
  className,
}: {
  className?: string;
}) {
  const ctx = React.useContext(DocsMobileNavContext);

  return (
    <button
      type="button"
      onClick={() => ctx?.open()}
      aria-label="Open navigation menu"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-accent lg:hidden",
        className
      )}
    >
      <MenuIcon className="size-4" />
    </button>
  );
}

export function DocsMobileNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [fadeBottom, setFadeBottom] = React.useState(true);

  const updateFade = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    setFadeBottom(remaining > 8);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const el = scrollerRef.current;
    if (!el) return;
    updateFade();
    el.addEventListener("scroll", updateFade, { passive: true });
    const observer = new ResizeObserver(updateFade);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateFade);
      observer.disconnect();
    };
  }, [open, pathname, updateFade]);

  const value = React.useMemo(
    () => ({ open: () => setOpen(true) }),
    []
  );

  return (
    <DocsMobileNavContext.Provider value={value}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-overlay-strong"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Documentation navigation"
            className="absolute inset-y-0 left-0 flex w-80 max-w-[90%] flex-col overflow-hidden bg-background shadow-xl"
          >
            <div className="flex shrink-0 items-center justify-between px-6 pt-6 pb-2">
              <span className="text-sm font-semibold text-foreground">
                Documentation
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="-mr-1.5 inline-flex size-8 items-center justify-center rounded-md text-foreground hover:bg-accent"
              >
                <XIcon className="size-4" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <div
                ref={scrollerRef}
                className="no-scrollbar h-full overflow-y-auto px-6 pt-4 pb-6"
              >
                <DocsNav
                  pathname={pathname}
                  onNavigate={() => setOpen(false)}
                />
              </div>
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent transition-opacity duration-200",
                  fadeBottom ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
          </div>
        </div>
      ) : null}
    </DocsMobileNavContext.Provider>
  );
}
