import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRightIcon, CircleAlertIcon } from "lucide-react";

import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import { addComponentCommands } from "@/lib/package-manager-commands";
import { initCommands, readyComponentCount } from "./introduction-data";
import {
  AgentSurfaceList,
  BaseTable,
  FrameworkGrid,
  NextStepGrid,
  PrincipleGrid,
  TokenSwatches,
} from "./introduction-sections";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "Cubix is a set of accessible, token-driven React components and the system that distributes them. Three primitive bases, one visual API, and source you own.",
};

const linkClassName =
  "font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80";

const sectionHeadingClassName = "scroll-m-20 font-semibold tracking-tight";

const addDialogAriaCommands = addComponentCommands("dialog", "aria");
const addButtonCommands = addComponentCommands("button");

function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>;
}

export default function DocsPage() {
  return (
    <article className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <DocsMobileMenuTrigger />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            Introduction
          </h1>
        </div>
        <p className="text-lead text-muted-foreground">
          Cubix is a set of accessible, token-driven React components and the
          system that distributes them. Three primitive bases, one visual API,
          and source you own. Open source. Open code.
        </p>
      </header>

      <section className="space-y-4">
        <p className="border-s-2 border-foreground ps-4 font-medium text-foreground">
          Cubix is not a component library you install. It is the foundation
          you build your own component library on.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Most UI kits follow the same pattern: install a package, import its
          components, and use them as-is. That works until the product needs
          something the package did not plan for - a different interaction
          model, a layout the API cannot express, or a control that is simply
          missing.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          From there, teams wrap components, override styles with ever more
          specific selectors, or mix libraries with incompatible APIs. The UI
          layer slowly becomes the part of the codebase nobody wants to touch.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Cubix is built to avoid that. {readyComponentCount} production-ready
          components today, each available on three accessibility backends,
          all shaped by a few principles:
        </p>
        <PrincipleGrid />
      </section>

      <section className="space-y-4">
        <h2 id="open-code" className={sectionHeadingClassName}>
          Open code
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          The CLI copies real TypeScript files into{" "}
          <InlineCode>components/cubix</InlineCode>. Nothing is compiled away
          or hidden behind a package boundary, which means:
        </p>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Full transparency</strong> -
            markup, variants, ARIA wiring, and{" "}
            <InlineCode>data-slot</InlineCode> structure are all visible.
          </li>
          <li>
            <strong className="text-foreground">Direct customization</strong>{" "}
            - to change how a button behaves, edit{" "}
            <InlineCode>components/cubix/button.tsx</InlineCode>. No wrapper,
            no style overrides.
          </li>
          <li>
            <strong className="text-foreground">No upstream lock-in</strong> -
            a one-line fix never waits on someone else&apos;s release.
          </li>
        </ul>
        <details className="group rounded-xl border bg-card">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
            <ChevronRightIcon
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90 rtl:-scale-x-100"
            />
            How do I pick up upstream updates?
          </summary>
          <div className="border-t px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            Run <InlineCode>cubix view &lt;name&gt;</InlineCode> to inspect the
            latest registry version, compare it with your local file, and merge
            what you want. <InlineCode>cubix add</InlineCode> never replaces an
            existing file unless you pass{" "}
            <InlineCode>--overwrite</InlineCode>, so your edits stay safe.
          </div>
        </details>
      </section>

      <section className="space-y-4">
        <h2 id="one-api-three-bases" className={sectionHeadingClassName}>
          One API, three bases
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Teams standardize on different accessibility primitives for good
          reasons. Cubix treats all three as first-class: every component ships
          for each base with identical props, variants, tokens, and slot names,
          so screens do not change when the primitive underneath does.
        </p>
        <BaseTable />
        <p className="leading-relaxed text-muted-foreground">
          Set the default in <InlineCode>cubix.json</InlineCode>, or override
          it for a single install:
        </p>
        <CodeBlockCommand commands={addDialogAriaCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Every component page includes a base switcher, so you can compare
          the source for each backend side by side.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="design-tokens" className={sectionHeadingClassName}>
          Design tokens
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Components never reach for a hardcoded color. They speak a small set
          of semantic tokens, defined as oklch values for light and dark mode
          in <InlineCode>globals.css</InlineCode>:
        </p>
        <TokenSwatches />
        <p className="leading-relaxed text-muted-foreground">
          Restyle the entire product by editing variables, and open component
          files only when structure or behavior must change. The full map
          lives in{" "}
          <Link href="/docs/theming" className={linkClassName}>
            Theming
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="agent-interfaces" className={sectionHeadingClassName}>
          Agent interfaces
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Chat and agent products need more than forms and dialogs. Cubix is
          building a dedicated set of agent surfaces that handle the hard
          states - streaming, partial output, tool failures, and long
          transcripts - not just the happy path:
        </p>
        <AgentSurfaceList />
        <p className="leading-relaxed text-muted-foreground">
          Each surface follows the same rules as every other Cubix component:
          owned source, three bases, semantic tokens. Track progress on the{" "}
          <Link href="/docs/changelog" className={linkClassName}>
            Changelog
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="typeset" className={sectionHeadingClassName}>
          Typeset
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Markdown, CMS content, and model output arrive as unstyled HTML.
          Typeset gives them one shared rhythm: semantic type roles, a reading
          measure, and presets driven by three controls -{" "}
          <InlineCode>size</InlineCode>, <InlineCode>leading</InlineCode>, and{" "}
          <InlineCode>flow</InlineCode>.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Spacing runs in one direction, so a streaming reply can append new
          blocks without reflowing the ones above it. The presets are plain
          CSS in your project - this page uses the{" "}
          <InlineCode>docs-prose</InlineCode> preset. Read more in{" "}
          <Link href="/docs/typeset" className={linkClassName}>
            Typeset
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="rtl-and-locale" className={sectionHeadingClassName}>
          RTL and locale
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Bidirectional layout is part of the system, not a patch on top of it.
          Components use logical properties (<InlineCode>ps-*</InlineCode>,{" "}
          <InlineCode>me-*</InlineCode>, <InlineCode>start</InlineCode>,{" "}
          <InlineCode>end</InlineCode>), so they mirror correctly under{" "}
          <InlineCode>dir=&quot;rtl&quot;</InlineCode> without extra classes.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Persian content under <InlineCode>[lang=fa]</InlineCode> uses
          IRANSans XV with baseline-corrected metrics and tuned leading, while
          type sizes stay identical to the documented scale across locales.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="distribution" className={sectionHeadingClassName}>
          Distribution
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix is also a code distribution system, made of two parts:
        </p>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Registry schema</strong> - a
            flat-file JSON format that lists each item&apos;s files,
            dependencies, and base variants.
          </li>
          <li>
            <strong className="text-foreground">CLI</strong> -{" "}
            <InlineCode>init</InlineCode>, <InlineCode>add</InlineCode>,{" "}
            <InlineCode>view</InlineCode>, <InlineCode>search</InlineCode>,{" "}
            <InlineCode>build</InlineCode>, and <InlineCode>info</InlineCode>{" "}
            for installing, inspecting, and publishing items.
          </li>
        </ul>
        <p className="leading-relaxed text-muted-foreground">
          Use the same schema to publish your own components to other
          projects. See{" "}
          <Link href="/docs/cli" className={linkClassName}>
            CLI
          </Link>{" "}
          and{" "}
          <Link href="/docs/registry" className={linkClassName}>
            Registry
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="ai-ready" className={sectionHeadingClassName}>
          AI-ready
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Open source and a consistent API make Cubix easy for assistants to
          read and extend. Cubix goes further by giving them project context:{" "}
          <InlineCode>cubix.json</InlineCode> and{" "}
          <InlineCode>cubix info</InlineCode> expose your framework, aliases,
          base, and installed components.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Install the Cubix{" "}
          <Link href="/docs/skills" className={linkClassName}>
            Skills
          </Link>{" "}
          and your assistant uses the right imports, the right base, and theme
          tokens instead of hardcoded colors - on the first try.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Quick start</h2>
        <p className="leading-relaxed text-muted-foreground">
          Initialize Cubix in the root of your app. This writes the design
          tokens, creates <InlineCode>lib/utils.ts</InlineCode>, and adds{" "}
          <InlineCode>cubix.json</InlineCode>:
        </p>
        <CodeBlockCommand commands={initCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Then add your first component:
        </p>
        <CodeBlockCommand commands={addButtonCommands} />
        <p className="leading-relaxed text-muted-foreground">
          The full walkthrough, including manual setup, is in{" "}
          <Link href="/docs/installation" className={linkClassName}>
            Installation
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Framework support</h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix is React source plus Tailwind CSS, not a closed runtime. It
          runs anywhere you can render React.
        </p>
        <FrameworkGrid />
        <div className="flex items-start gap-2 rounded-lg border bg-muted/30 p-4 text-sm">
          <CircleAlertIcon
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
          />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Requirements:</strong> React
            18+ (React 19 recommended), Tailwind CSS v4, and TypeScript.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <NextStepGrid />
      </section>
    </article>
  );
}
