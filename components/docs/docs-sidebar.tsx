"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { canonicalComponentHref } from "@/lib/bases";
import { motion } from "framer-motion";

type DocsNavLink = {
  title: string;
  href: string;
  indicator?: boolean;
};

const groups: { title: string; links: DocsNavLink[] }[] = [
  {
    title: "Get started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Components", href: "/docs/components" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
      { title: "CLI", href: "/docs/cli" },
      { title: "Typeset", href: "/docs/typeset" },
      { title: "Skills", href: "/docs/skills" },
      { title: "Registry", href: "/docs/registry" },
      { title: "Changelog", href: "/docs/changelog", indicator: true },
    ],
  },
  {
    title: "Components",
    links: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Alert Dialog", href: "/docs/components/alert-dialog" },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { title: "Attachment", href: "/docs/components/attachment" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Branch", href: "/docs/components/branch" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Button Group", href: "/docs/components/button-group" },
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Carousel", href: "/docs/components/carousel" },
      { title: "Chart", href: "/docs/components/chart" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Code Block", href: "/docs/components/code-block" },
      { title: "Collapsible", href: "/docs/components/collapsible" },
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Context Menu", href: "/docs/components/context-menu" },
      { title: "Conversation", href: "/docs/components/conversation" },
      { title: "Data Table", href: "/docs/components/data-table" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Direction", href: "/docs/components/direction" },
      { title: "Drawer", href: "/docs/components/drawer" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Empty", href: "/docs/components/empty" },
      { title: "Field", href: "/docs/components/field" },
      { title: "Hover Card", href: "/docs/components/hover-card" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Input Group", href: "/docs/components/input-group" },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      { title: "Kbd", href: "/docs/components/kbd" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Menubar", href: "/docs/components/menubar" },
      { title: "Message", href: "/docs/components/message" },
      { title: "Message Scroller", href: "/docs/components/message-scroller" },
      { title: "Model Selector", href: "/docs/components/model-selector" },
      { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Prompt Input", href: "/docs/components/prompt-input" },
      { title: "Prompt Suggestion", href: "/docs/components/prompt-suggestion" },
      { title: "Queue", href: "/docs/components/queue" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Resizable", href: "/docs/components/resizable" },
      { title: "Scroll Area", href: "/docs/components/scroll-area" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Sidebar", href: "/docs/components/sidebar" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Sonner", href: "/docs/components/sonner" },
      { title: "Sources", href: "/docs/components/sources" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "Streaming Text", href: "/docs/components/streaming-text" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Thinking", href: "/docs/components/thinking" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Toggle Group", href: "/docs/components/toggle-group" },
      { title: "Tool Call", href: "/docs/components/tool-call" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
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
              const active =
                pathname === link.href ||
                canonicalComponentHref(pathname) === link.href;
              return (
                <li key={link.href} className="relative">
                  {active && (
                    <motion.div
                      layoutId={`active-line-${group.title}`}
                      className="absolute top-0 left-0 z-10 h-full w-px bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
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
