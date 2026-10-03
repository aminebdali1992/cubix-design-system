import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  BoxIcon,
  CheckCircle2Icon,
  ClockIcon,
  PackageIcon,
  PaletteIcon,
  TerminalIcon,
} from "lucide-react";

import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { addComponentCommands } from "@/lib/package-manager-commands";
import { cn } from "@/lib/utils";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  linkClassName,
  sectionHeadingClassName,
} from "../docs-shared";
import { components } from "./components-data";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Browse every Cubix component. Accessible source you own, available on Base UI, React Aria, and Radix UI.",
};

const ready = [...components]
  .filter((item) => item.ready && typeof item.href === "string")
  .sort((a, b) => a.name.localeCompare(b.name));

const planned = [...components]
  .filter((item) => !item.ready)
  .sort((a, b) => a.name.localeCompare(b.name));

const addButtonCommands = addComponentCommands("button");

const cardClassName =
  "group flex h-full flex-col rounded-xl border bg-card p-5 no-underline transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function ComponentsPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Components"
        description={
          <>
            Every Cubix component is accessible, themeable, and shipped as
            TypeScript source you own. Install one with{" "}
            <InlineCode>npx cubix-ui@latest add</InlineCode> followed by its name.
          </>
        }
      />

      <section className="space-y-4">
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 font-medium text-foreground">
            <CheckCircle2Icon aria-hidden className="size-3.5" />
            {ready.length} available
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 font-medium text-muted-foreground">
            <ClockIcon aria-hidden className="size-3.5" />
            {planned.length} on the roadmap
          </span>
        </div>
        <p className="leading-relaxed text-muted-foreground">
          Each ready component ships for Base UI, React Aria, and Radix UI with
          the same visual API. Switch bases on the component page, or pass{" "}
          <InlineCode>--base</InlineCode> when you install.
        </p>
        <CodeBlockCommand commands={addButtonCommands} />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Available</h2>
        <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
          {ready.map((item) => (
            <li key={item.name} className="flex">
              <Link href={item.href!} className={cn(cardClassName, "flex-1")}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/40 text-foreground [&_svg]:size-4">
                      <BoxIcon aria-hidden />
                    </span>
                    <h3 className="truncate text-sm font-semibold text-foreground">
                      {item.name}
                    </h3>
                  </div>
                  <ArrowUpRightIcon
                    aria-hidden
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                  />
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>On the roadmap</h2>
        <p className="leading-relaxed text-muted-foreground">
          Components stay here until they meet the Cubix production bar across
          all three bases - including loading, empty, and error states. They
          unlock in the sidebar as each one is ready. Track progress on the{" "}
          <Link href="/docs/changelog" className={linkClassName}>
            Changelog
          </Link>
          .
        </p>
        <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
          {planned.map((item) => (
            <li
              key={item.name}
              className="rounded-xl border border-dashed bg-card p-5"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {item.name}
                </h3>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border/60 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                  In progress
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Installation",
              description:
                "Initialize tokens, utilities, and cubix.json in your app.",
              href: "/docs/installation",
              icon: PackageIcon,
            },
            {
              title: "CLI",
              description:
                "Add, view, and search components from the registry.",
              href: "/docs/cli",
              icon: TerminalIcon,
            },
            {
              title: "Theming",
              description:
                "Restyle the catalog by editing semantic CSS variables.",
              href: "/docs/theming",
              icon: PaletteIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
