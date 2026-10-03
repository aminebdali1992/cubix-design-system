"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { components } from "@/app/docs/components/components-data";
import { canonicalComponentHref } from "@/lib/bases";
import { cn } from "@/lib/utils";

const getStarted = [
  { title: "Introduction", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Next.js", href: "/docs/installation/next" },
  { title: "Vite", href: "/docs/installation/vite" },
  { title: "TanStack Start", href: "/docs/installation/tanstack" },
  { title: "Laravel", href: "/docs/installation/laravel" },
  { title: "React Router", href: "/docs/installation/react-router" },
  { title: "Astro", href: "/docs/installation/astro" },
  { title: "Manual", href: "/docs/installation/manual" },
  { title: "Theming", href: "/docs/theming" },
  { title: "CLI", href: "/docs/cli" },
  { title: "Typeset", href: "/docs/typeset" },
  { title: "Skills", href: "/docs/skills" },
  { title: "Registry", href: "/docs/registry" },
  { title: "Changelog", href: "/docs/changelog" },
];

const readyComponents = components
  .filter(
    (item): item is (typeof components)[number] & { href: string } =>
      item.ready && typeof item.href === "string"
  )
  .map((item) => ({ title: item.name, href: item.href }))
  .sort((a, b) => a.title.localeCompare(b.title));

const order = [...getStarted, ...readyComponents];

const pagerLinkClassName = cn(
  "inline-flex h-8 items-center gap-1.5 rounded-lg bg-muted px-3 text-sm font-medium text-foreground",
  "transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
);

export function DocsPager() {
  const pathname = usePathname();
  const index = order.findIndex(
    (item) => item.href === canonicalComponentHref(pathname)
  );

  if (index === -1) return null;

  const prev = index > 0 ? order[index - 1] : null;
  const next = index < order.length - 1 ? order[index + 1] : null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between gap-4"
    >
      {prev ? (
        <Link
          href={prev.href}
          aria-label={`Previous: ${prev.title}`}
          className={pagerLinkClassName}
        >
          <ArrowLeftIcon className="size-4 rtl:rotate-180" />
          {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          aria-label={`Next: ${next.title}`}
          className={cn(pagerLinkClassName, "ms-auto")}
        >
          {next.title}
          <ArrowRightIcon className="size-4 rtl:rotate-180" />
        </Link>
      ) : null}
    </nav>
  );
}
