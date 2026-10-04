import type { Metadata } from "next";
import Link from "next/link";
import {
  BlocksIcon,
  PaletteIcon,
  TerminalIcon,
  WaypointsIcon,
} from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { siteConfig } from "@/lib/site";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  linkClassName,
  sectionHeadingClassName,
} from "../docs-shared";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Give your AI assistant deep knowledge of Cubix components, bases, CLI commands, theming, and registry patterns.",
};

const installCommands = {
  pnpm: `pnpm dlx skills add ${siteConfig.githubRepo}`,
  npm: `npx skills add ${siteConfig.githubRepo}`,
  yarn: `yarn dlx skills add ${siteConfig.githubRepo}`,
  bun: `bunx --bun skills add ${siteConfig.githubRepo}`,
};

const examplePrompts = [
  "Add a login form with email and password fields using Cubix Field and Input.",
  "Create a settings page with a profile form and a destructive delete dialog.",
  "Build a dashboard shell with Sidebar, stats cards, and a Data Table.",
  "Add an agent chat layout with Conversation, Thinking, Tool Call, and Prompt Input.",
  "Install button and dialog with --base radix and match our existing tokens.",
];

const includedTopics = [
  {
    id: "project-context",
    title: "Project context",
    body: (
      <>
        On relevant tasks, the skill resolves configuration from{" "}
        <InlineCode>cubix.json</InlineCode> and <InlineCode>cubix-ui info</InlineCode>
        : framework, Tailwind CSS entry, aliases, base library, icon library,
        and where components land under <InlineCode>components/cubix</InlineCode>
        .
      </>
    ),
  },
  {
    id: "cli-commands",
    title: "CLI commands",
    body: (
      <>
        Full reference for <InlineCode>init</InlineCode>,{" "}
        <InlineCode>add</InlineCode>, <InlineCode>view</InlineCode>,{" "}
        <InlineCode>search</InlineCode>, <InlineCode>build</InlineCode>, and{" "}
        <InlineCode>info</InlineCode> - including{" "}
        <InlineCode>--base</InlineCode>, overwrite, and dry-run workflows. See
        the{" "}
        <Link href="/docs/cli" className={linkClassName}>
          CLI
        </Link>{" "}
        docs for the human-readable reference.
      </>
    ),
  },
  {
    id: "theming",
    title: "Theming and customization",
    body: (
      <>
        How semantic tokens, oklch palettes, dark mode, radius scale, and
        variants work. Assistants are steered to Cubix tokens instead of
        hardcoded colors. Details live under{" "}
        <Link href="/docs/theming" className={linkClassName}>
          Theming
        </Link>
        .
      </>
    ),
  },
  {
    id: "bases",
    title: "Bases and composition",
    body: (
      <>
        Cubix keeps one visual API across Base UI, React Aria, and Radix UI.
        The skill teaches named exports, <InlineCode>data-slot</InlineCode>,{" "}
        <InlineCode>cn()</InlineCode>, and how <InlineCode>asChild</InlineCode>{" "}
        maps to each primitive compose API.
      </>
    ),
  },
  {
    id: "registry",
    title: "Registry authoring",
    body: (
      <>
        How to shape <InlineCode>registry.json</InlineCode> items,
        dependencies, and <InlineCode>public/r/*.json</InlineCode> output from{" "}
        <InlineCode>cubix-ui build</InlineCode>. More in{" "}
        <Link href="/docs/registry" className={linkClassName}>
          Registry
        </Link>
        .
      </>
    ),
  },
  {
    id: "agent-surfaces",
    title: "Agent surfaces",
    body: (
      <>
        Guidance for Cubix AI building blocks - Conversation, Prompt Input,
        Thinking, Tool Call, Streaming Text, and related patterns - so chat
        and agent UIs follow the same ownership model as the rest of the
        catalog.
      </>
    ),
  },
];

export default function SkillsPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Skills"
        description="Give your AI assistant deep knowledge of Cubix components, patterns, and best practices - so generated UI matches your project on the first try."
      />

      <section className="space-y-4">
        <p className="border-s-2 border-foreground ps-4 font-medium text-foreground">
          Skills turn Cubix from copy-paste source into project-aware context
          for assistants.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Once installed, the agent knows how to find, install, compose, and
          customize components using the correct APIs, tokens, and primitive
          base for your app. For example, you can ask:
        </p>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          {examplePrompts.map((prompt) => (
            <li key={prompt}>
              <span className="text-foreground">&ldquo;{prompt}&rdquo;</span>
            </li>
          ))}
        </ul>
        <p className="leading-relaxed text-muted-foreground">
          The skill reads your project <InlineCode>cubix.json</InlineCode> and
          supplies framework details, aliases, installed components, icon
          library, and base (<InlineCode>base</InlineCode>,{" "}
          <InlineCode>radix</InlineCode>, or <InlineCode>aria</InlineCode>) so
          imports and composition stay correct.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Install</h2>
        <p className="leading-relaxed text-muted-foreground">
          Install the Cubix skill into your project with the Skills CLI. The
          source lives in{" "}
          <a
            href={`${siteConfig.links.github}/blob/main/skills/cubix/SKILL.md`}
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            skills/cubix/SKILL.md
          </a>
          .
        </p>
        <CodeBlockCommand commands={installCommands} />
        <p className="leading-relaxed text-muted-foreground">
          After install, assistants that support Agent Skills load Cubix
          guidance automatically when you work on UI, registry items, or CLI
          flows. Pair this with{" "}
          <Link href="/docs/installation" className={linkClassName}>
            Installation
          </Link>{" "}
          so <InlineCode>cubix.json</InlineCode> already exists in the repo,
          and with{" "}
          <Link href="/docs/mcp" className={linkClassName}>
            MCP
          </Link>{" "}
          when you want live registry tools over HTTP.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>What&apos;s included</h2>
        <p className="leading-relaxed text-muted-foreground">
          The skill equips the assistant with the following knowledge:
        </p>
        <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
          {includedTopics.map((topic) => (
            <li key={topic.id} className="rounded-xl border bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">
                {topic.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {topic.body}
              </p>
            </li>
          ))}
        </ul>
        <CodeBlock
          code={`{
  "style": "cubix",
  "base": "base",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "ui": "@/components/cubix",
    "utils": "@/lib/utils"
  }
}`}
          title="cubix.json"
          lang="json"
        />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>How it works</h2>
        <ol className="list-decimal space-y-3 ps-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Project detection</strong> -
            the assistant loads the skill when the workspace has a{" "}
            <InlineCode>cubix.json</InlineCode>, imports from{" "}
            <InlineCode>components/cubix</InlineCode>, or the task mentions
            Cubix.
          </li>
          <li>
            <strong className="text-foreground">Context injection</strong> - it
            reads project config (and prefers{" "}
            <InlineCode>cubix-ui info --json</InlineCode> when available) so
            aliases, base, and paths stay accurate.
          </li>
          <li>
            <strong className="text-foreground">Pattern enforcement</strong> -
            the assistant follows Cubix composition rules: semantic tokens,{" "}
            <InlineCode>data-slot</InlineCode>, accessible states, and
            base-specific APIs without inventing a parallel design system.
          </li>
          <li>
            <strong className="text-foreground">Component discovery</strong> -
            before generating UI, it uses <InlineCode>cubix-ui search</InlineCode>
            , <InlineCode>cubix-ui view</InlineCode>, or the docs catalog under{" "}
            <Link href="/docs/components" className={linkClassName}>
              Components
            </Link>{" "}
            to pick real registry items.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Tips for better results</h2>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            Name the base when it matters:{" "}
            <InlineCode>--base aria</InlineCode> or{" "}
            <InlineCode>--base radix</InlineCode>.
          </li>
          <li>
            Point at existing screens or tokens so the assistant extends Cubix
            instead of introducing one-off styles.
          </li>
          <li>
            Ask it to run <InlineCode>cubix-ui add</InlineCode> for missing
            components rather than pasting incomplete stubs.
          </li>
          <li>
            For long-form or chat copy, pair Skills with{" "}
            <Link href="/docs/typeset" className={linkClassName}>
              Typeset
            </Link>{" "}
            presets so prose rhythm stays consistent.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "MCP",
              description: "HTTP tools for list, search, install, and demos.",
              href: "/docs/mcp",
              icon: WaypointsIcon,
            },
            {
              title: "CLI",
              description: "Commands the skill expects assistants to use.",
              href: "/docs/cli",
              icon: TerminalIcon,
            },
            {
              title: "Theming",
              description: "Token rules assistants should follow.",
              href: "/docs/theming",
              icon: PaletteIcon,
            },
            {
              title: "Components",
              description: "The catalog the skill should install from.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
