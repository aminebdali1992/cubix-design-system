import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  BoxIcon,
  CheckCircle2Icon,
  ClockIcon,
} from "lucide-react";

import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import { components } from "./components-data";

export const metadata: Metadata = {
  title: "Components",
  description:
    "The complete list of Cubix components - accessible, copy-paste ready and themeable.",
};

const ready = components.filter((c) => c.ready);
const planned = components.filter((c) => !c.ready);

export default function ComponentsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <DocsMobileMenuTrigger />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            Components
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          The complete Cubix component list. Every component is accessible,
          themeable and shipped as source code you own - install one with{" "}
          <code className="font-mono text-sm">npx cubix@latest add</code>{" "}
          followed by its name.
        </p>
        <div className="flex gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2Icon className="size-3.5" />
            {ready.length} available
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-medium text-muted-foreground">
            <ClockIcon className="size-3.5" />
            {planned.length} on the roadmap
          </span>
        </div>
      </header>

      {/* Available */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Available
        </h2>
        <div className="my-6 grid gap-4 sm:grid-cols-2">
          {ready.map((c) => (
            <Link
              key={c.name}
              href={c.href!}
              className="group flex h-full items-start justify-between gap-4 rounded-xl border bg-card p-5 transition-colors hover:bg-muted"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <BoxIcon className="size-4 shrink-0 text-primary" />
                  <h3 className="font-semibold">{c.name}</h3>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
              <ArrowRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          On the roadmap
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Components still being finalized stay on the roadmap until they meet
          the Cubix production bar across Base UI, React Aria, and Radix. They
          unlock in the sidebar one by one as each is ready.
        </p>
        <div className="my-6 grid gap-4 sm:grid-cols-2">
          {planned.map((c) => (
            <div
              key={c.name}
              className="flex h-full flex-col rounded-xl border bg-card/50 p-5 opacity-75"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <h3 className="font-semibold">{c.name}</h3>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  <ClockIcon className="size-3" />
                  Soon
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
