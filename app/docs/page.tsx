import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import { addComponentCommands } from "@/lib/package-manager-commands";
import { readyComponentCount } from "./introduction-data";
import {
  AgentSurfaceList,
  BaseTable,
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
          Cubix is a set of accessible, token-driven React components. Each
          component ships for three primitive bases with one API, and the
          source lives in your project.
        </p>
      </header>

      <section className="space-y-4">
        <p className="border-s-2 border-foreground ps-4 font-medium text-foreground">
          Cubix is not a package you install. It is the foundation you build
          your own component library on.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Packaged UI kits work until your product needs something they did not
          plan for. Then teams start wrapping components and fighting style
          overrides. Cubix avoids this by giving you the source.{" "}
          {readyComponentCount} components are ready today, each built on these
          principles:
        </p>
        <PrincipleGrid />
      </section>

      <section className="space-y-4">
        <h2 id="open-code" className={sectionHeadingClassName}>
          Open code
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          The CLI copies real TypeScript files into{" "}
          <InlineCode>components/cubix</InlineCode>. Markup, variants and ARIA
          wiring are all visible, and you change a component by editing its
          file directly. To pull in newer versions later, see{" "}
          <Link href="/docs/upgrade" className={linkClassName}>
            Upgrade
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="one-api-three-bases" className={sectionHeadingClassName}>
          One API, three bases
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Every component ships for three accessibility bases with the same
          props, variants, tokens and slot names. Switching the base does not
          change your screens.
        </p>
        <BaseTable />
        <p className="leading-relaxed text-muted-foreground">
          Set the default base in <InlineCode>cubix.json</InlineCode>, or pick
          one for a single install:
        </p>
        <CodeBlockCommand commands={addDialogAriaCommands} />
      </section>

      <section className="space-y-4">
        <h2 id="design-tokens" className={sectionHeadingClassName}>
          Design tokens
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Components never use hardcoded colors. They use semantic tokens
          defined in <InlineCode>globals.css</InlineCode> for light and dark
          mode, so you restyle the whole product by changing variables.
        </p>
        <TokenSwatches />
        <p className="leading-relaxed text-muted-foreground">
          See{" "}
          <Link href="/docs/theming" className={linkClassName}>
            Theming
          </Link>{" "}
          to change tokens and{" "}
          <Link href="/docs/color-usage" className={linkClassName}>
            Color Usage
          </Link>{" "}
          to pick the right color.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="rtl-and-typography" className={sectionHeadingClassName}>
          RTL and typography
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix is right-to-left by default. Components use logical properties
          such as <InlineCode>ps-*</InlineCode> and{" "}
          <InlineCode>me-*</InlineCode>, so they mirror correctly without extra
          classes. Persian text uses IRANSans XV on one shared type scale. See{" "}
          <Link href="/docs/typeset" className={linkClassName}>
            Typography
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="agent-interfaces" className={sectionHeadingClassName}>
          Agent interfaces
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix is building components for chat and agent products that handle
          streaming, partial output, tool errors and long conversations:
        </p>
        <AgentSurfaceList />
      </section>

      <section className="space-y-4">
        <h2 id="tools" className={sectionHeadingClassName}>
          Tools
        </h2>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            <Link href="/docs/cli" className={linkClassName}>
              CLI
            </Link>{" "}
            adds, inspects and publishes components.
          </li>
          <li>
            <Link href="/docs/registry" className={linkClassName}>
              Registry
            </Link>{" "}
            is the JSON format that lists each component&apos;s files and
            dependencies.
          </li>
          <li>
            <Link href="/docs/skills" className={linkClassName}>
              Skills
            </Link>{" "}
            and{" "}
            <Link href="/docs/mcp" className={linkClassName}>
              MCP
            </Link>{" "}
            help AI assistants use the right imports, base and tokens.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <NextStepGrid />
      </section>
    </article>
  );
}
