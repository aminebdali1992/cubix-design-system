"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

/** Must match `html { scroll-padding-top: 5rem }` in globals.css */
const HEADER_OFFSET = 80;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitPascalCase(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
}

/** Short TOC labels: "DropdownMenuRadioGroup / DropdownMenuRadioItem" → "Radio Group" */
function tocDisplayText(heading: string, pageTitle: string) {
  const first = heading.split(/\s*\/\s*/)[0]?.trim() ?? heading;
  const prefix = pageTitle.replace(/\s+/g, "");

  if (prefix && first.startsWith(prefix) && first.length > prefix.length) {
    return splitPascalCase(first.slice(prefix.length));
  }

  if (first !== heading) {
    return splitPascalCase(first);
  }

  return heading;
}

/** Headings that belong in the page TOC - not previews, dialogs, or card grids. */
function getTocHeadings(article: Element): HTMLElement[] {
  return Array.from(article.querySelectorAll<HTMLElement>("h2, h3")).filter(
    (el) => {
      if (el.closest(".not-prose, dialog, [data-slot='dialog-content']")) {
        return false;
      }
      if (el.getClientRects().length === 0) {
        return false;
      }
      if (el.tagName === "H2") return true;
      return (
        el.classList.contains("text-2xl") ||
        el.classList.contains("scroll-m-20") ||
        el.className.includes("scroll-m-")
      );
    }
  );
}

function getActiveHeadingId(headings: HTMLElement[]) {
  if (headings.length === 0) return null;

  const scrolledToBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (scrolledToBottom) {
    return headings[headings.length - 1]?.id ?? null;
  }

  let currentId = headings[0].id;

  for (const heading of headings) {
    if (heading.getBoundingClientRect().top - HEADER_OFFSET <= 1) {
      currentId = heading.id;
    } else {
      break;
    }
  }

  return currentId;
}

export function DocsToc() {
  const pathname = usePathname();
  const [items, setItems] = React.useState<TocItem[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const headingElsRef = React.useRef<HTMLElement[]>([]);
  const activeLinkRef = React.useRef<HTMLAnchorElement | null>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const clickLockRef = React.useRef(false);
  const clickUnlockTimerRef = React.useRef<number>(0);
  const [fadeBottom, setFadeBottom] = React.useState(true);

  const updateFade = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    setFadeBottom(remaining > 8);
  }, []);

  React.useEffect(() => {
    const article = document.querySelector("article");
    if (!article) {
      headingElsRef.current = [];
      setItems([]);
      setActiveId(null);
      return;
    }

    const headings = getTocHeadings(article);
    const pageTitle = article.querySelector("h1")?.textContent?.trim() ?? "";
    const seen = new Map<string, number>();
    const toc: TocItem[] = [];

    headings.forEach((el) => {
      const text = el.dataset.toc?.trim() || el.textContent?.trim() || "";
      if (!text) return;

      const fullText = el.textContent?.trim() ?? text;
      const base = slugify(fullText);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count}`;

      const duplicate = document.getElementById(id);
      if (duplicate && duplicate !== el) {
        duplicate.removeAttribute("id");
      }

      el.id = id;
      el.style.scrollMarginTop = `${HEADER_OFFSET}px`;

      toc.push({
        id,
        text: tocDisplayText(text, pageTitle),
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    headingElsRef.current = headings.filter((el) => Boolean(el.id));
    setItems(toc);

    const hash = window.location.hash.replace(/^#/, "");
    setActiveId(
      hash && toc.some((item) => item.id === hash)
        ? hash
        : (toc[0]?.id ?? null)
    );
  }, [pathname]);

  React.useEffect(() => {
    if (items.length === 0) return;

    let ticking = false;
    let rafId = 0;

    const updateActiveHeading = () => {
      if (clickLockRef.current) return;
      const nextId = getActiveHeadingId(headingElsRef.current);
      if (nextId) setActiveId(nextId);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        updateActiveHeading();
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateActiveHeading();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [items]);

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
  }, [items, pathname, updateFade]);

  React.useEffect(() => {
    activeLinkRef.current?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
    updateFade();
  }, [activeId, updateFade]);

  function onItemClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    event.preventDefault();
    const heading = document.getElementById(id);
    if (!heading) return;

    clickLockRef.current = true;
    window.clearTimeout(clickUnlockTimerRef.current);
    setActiveId(id);
    heading.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);

    const unlock = () => {
      clickLockRef.current = false;
      window.removeEventListener("scrollend", unlock);
    };
    window.addEventListener("scrollend", unlock, { once: true });
    clickUnlockTimerRef.current = window.setTimeout(unlock, 800);
  }

  return (
    <div className="relative h-full overflow-hidden">
      <div
        ref={scrollerRef}
        className="no-scrollbar h-full overflow-x-hidden overflow-y-auto py-10 pl-2 pr-6"
      >
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          On This Page
        </p>
        {items.length > 0 ? (
          <nav className="min-w-0 space-y-0.5 overflow-x-hidden border-dotted-spaced-l">
            {items.map((item) => {
              const active = activeId === item.id;
              return (
                <a
                  key={item.id}
                  ref={active ? activeLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={(event) => onItemClick(event, item.id)}
                  className={cn(
                    "-ml-px block min-w-0 break-all border-l-2 py-1 pl-3 text-xs leading-5 transition-colors duration-150 no-underline",
                    item.level === 3 && "pl-6",
                    active
                      ? "border-foreground font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.text}
                </a>
              );
            })}
          </nav>
        ) : null}
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent transition-opacity duration-200",
          fadeBottom ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
