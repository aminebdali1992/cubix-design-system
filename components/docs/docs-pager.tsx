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

export function DocsPager() {
  const pathname = usePathname();
  const index = order.findIndex(
    (item) => item.href === canonicalComponentHref(pathname)
  );

  if (index === -1) return null;

  const prev = index > 0 ? order[index - 1] : null;
  const next = index < order.length - 1 ? order[index + 1] : null;

  return (
    <nav aria-label="Pagination" className="mt-12 grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            "group rounded-lg border p-4 transition-colors hover:bg-accent/50"
          )}
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="mt-1 block font-medium">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className={cn(
            "group rounded-lg border p-4 text-end transition-colors hover:bg-accent/50"
          )}
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            Next
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1 block font-medium">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
