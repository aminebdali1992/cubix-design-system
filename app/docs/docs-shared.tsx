import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, type LucideIcon } from "lucide-react";

import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import { cn } from "@/lib/utils";

export const linkClassName =
  "font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80";

export const sectionHeadingClassName = "scroll-m-20 font-semibold tracking-tight";

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>;
}

export function DocsPageHeader({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) {
  return (
    <header className="space-y-4">
      <div className="flex items-center gap-2">
        <DocsMobileMenuTrigger />
        <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
          {title}
        </h1>
      </div>
      <div className="text-lead text-muted-foreground">{description}</div>
    </header>
  );
}

export type DocsNextStep = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function DocsNextSteps({ steps }: { steps: DocsNextStep[] }) {
  return (
    <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
      {steps.map((step) => (
        <li key={step.href} className="flex">
          <Link
            href={step.href}
            className={cn(
              "group flex-1 rounded-xl border bg-card p-5 no-underline transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/40 text-foreground [&_svg]:size-4">
                  <step.icon aria-hidden />
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {step.title}
                </h3>
              </div>
              <ArrowUpRightIcon
                aria-hidden
                className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
