import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  BlocksIcon,
  CircleAlertIcon,
  PaletteIcon,
  TerminalIcon,
} from "lucide-react";

import { CodeBlockCommand } from "@/components/docs/code-block-command";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  linkClassName,
  sectionHeadingClassName,
} from "../docs-shared";
import { installationGuides } from "./installation-guides";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Cubix in a new or existing React project. Choose your framework and follow step-by-step setup.",
};

export default function InstallationPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Installation"
        description="Install Cubix in a new or existing React project. Prefer the CLI template for Next.js and Vite, or follow a framework guide for step-by-step setup."
      />

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Quick start</h2>
        <p className="leading-relaxed text-muted-foreground">
          Scaffold and configure in one command:
        </p>
        <CodeBlockCommand
          commands={{
            pnpm: "pnpm dlx cubix-ui@latest init -t next",
            npm: "npx cubix-ui@latest init -t next",
            yarn: "yarn dlx cubix-ui@latest init -t next",
            bun: "bunx --bun cubix-ui@latest init -t next",
          }}
        />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Requirements</h2>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">React 18+</strong> (React 19
            recommended)
          </li>
          <li>
            <strong className="text-foreground">Tailwind CSS v4</strong>
          </li>
          <li>
            <strong className="text-foreground">TypeScript</strong> (project
            default)
          </li>
          <li>
            A path alias for <InlineCode>@/*</InlineCode>
          </li>
        </ul>
        <div className="flex items-start gap-2 rounded-lg border bg-muted/30 p-4 text-sm">
          <CircleAlertIcon
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
          />
          <p className="leading-relaxed text-muted-foreground">
            Cubix does not replace your framework scaffold. Create the app with
            the framework tooling, then <InlineCode>cubix-ui init</InlineCode>{" "}
            writes tokens, <InlineCode>lib/utils.ts</InlineCode>, and{" "}
            <InlineCode>cubix.json</InlineCode>. Default base is Base UI - pass{" "}
            <InlineCode>--base aria</InlineCode> or{" "}
            <InlineCode>--base radix</InlineCode> when needed. Full flags are on
            the{" "}
            <Link href="/docs/cli" className={linkClassName}>
              CLI
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      <section id="choose-your-framework" className="scroll-mt-24 space-y-4">
        <h2 className={sectionHeadingClassName}>Choose your framework</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each guide covers New project and Existing project paths where they
          apply.
        </p>
        <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2 lg:grid-cols-3">
          {installationGuides.map((guide) => (
            <li key={guide.slug} className="flex">
              <Link
                href={`/docs/installation/${guide.slug}`}
                className="group flex flex-1 flex-col items-start gap-3 rounded-xl border bg-card p-5 no-underline transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  aria-hidden
                  className="flex size-8 items-center justify-center text-foreground [&_svg]:size-8"
                  dangerouslySetInnerHTML={{ __html: guide.logo }}
                />
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {guide.name}
                  </span>
                  <ArrowUpRightIcon
                    aria-hidden
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                  />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {guide.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Components",
              description: "Browse and install from the catalog.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
            {
              title: "Theming",
              description: "Customize tokens after init.",
              href: "/docs/theming",
              icon: PaletteIcon,
            },
            {
              title: "CLI",
              description: "Every flag for init, add, view, and build.",
              href: "/docs/cli",
              icon: TerminalIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
