import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/docs/code-block";
import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Give your AI assistant deep knowledge of Cubix components, bases, CLI commands, theming, and registry patterns.",
};

const installCommands = {
  pnpm: "pnpm dlx skills add cubix/ui",
  npm: "npx skills add cubix/ui",
  yarn: "yarn dlx skills add cubix/ui",
  bun: "bunx --bun skills add cubix/ui",
};

const examplePrompts = [
  "Add a login form with email and password fields using Cubix Field and Input.",
  "Create a settings page with a profile form and a destructive delete dialog.",
  "Build a dashboard shell with Sidebar, stats cards, and a Data Table.",
  "Add an agent chat layout with Conversation, Thinking, Tool Call, and Prompt Input.",
  "Install button and dialog with --base radix and match our existing tokens.",
];

const linkClassName =
  "font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80";

export default function SkillsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <DocsMobileMenuTrigger />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            Skills
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          Give your AI assistant deep knowledge of Cubix components, patterns,
          and best practices - so generated UI matches your project on the first
          try.
        </p>
      </header>

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Skills give assistants project-aware context about Cubix. Once
          installed, the agent knows how to find, install, compose, and
          customize components using the correct APIs, tokens, and primitive
          base for your app.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          For example, you can ask:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          {examplePrompts.map((prompt) => (
            <li key={prompt}>
              <span className="text-foreground">&ldquo;{prompt}&rdquo;</span>
            </li>
          ))}
        </ul>
        <p className="leading-relaxed text-muted-foreground">
          The skill reads your project{" "}
          <code className="font-mono text-sm">cubix.json</code> and supplies
          framework details, aliases, installed components, icon library, and
          base (<code className="font-mono text-sm">base</code>,{" "}
          <code className="font-mono text-sm">radix</code>, or{" "}
          <code className="font-mono text-sm">aria</code>) so imports and
          composition stay correct.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Install</h2>
        <p className="leading-relaxed text-muted-foreground">
          Install the Cubix skill into your project with the Skills CLI:
        </p>
        <CodeBlockCommand commands={installCommands} />
        <p className="leading-relaxed text-muted-foreground">
          After install, assistants that support Agent Skills load Cubix
          guidance automatically when you work on UI, registry items, or CLI
          flows. Pair this with{" "}
          <Link href="/docs/installation" className={linkClassName}>
            Installation
          </Link>{" "}
          so <code className="font-mono text-sm">cubix.json</code> already
          exists in the repo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          What&apos;s included
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          The skill equips the assistant with the following knowledge:
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          Project context
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          On relevant tasks, the skill resolves configuration from{" "}
          <code className="font-mono text-sm">cubix.json</code> and{" "}
          <code className="font-mono text-sm">cubix info</code>: framework,
          Tailwind CSS entry, aliases, base library, icon library, and where
          components land under{" "}
          <code className="font-mono text-sm">components/cubix</code>.
        </p>
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

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CLI commands
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Full reference for{" "}
          <code className="font-mono text-sm">init</code>,{" "}
          <code className="font-mono text-sm">add</code>,{" "}
          <code className="font-mono text-sm">view</code>,{" "}
          <code className="font-mono text-sm">search</code>,{" "}
          <code className="font-mono text-sm">build</code>, and{" "}
          <code className="font-mono text-sm">info</code> - including{" "}
          <code className="font-mono text-sm">--base</code>, overwrite, and
          dry-run style workflows. See the{" "}
          <Link href="/docs/cli" className={linkClassName}>
            CLI
          </Link>{" "}
          docs for the human-readable reference.
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          Theming and customization
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          How semantic tokens, oklch palettes, dark mode, radius scale, and
          variants work. Assistants are steered to{" "}
          <code className="font-mono text-sm">background</code>,{" "}
          <code className="font-mono text-sm">foreground</code>,{" "}
          <code className="font-mono text-sm">muted</code>,{" "}
          <code className="font-mono text-sm">accent</code>,{" "}
          <code className="font-mono text-sm">primary</code>,{" "}
          <code className="font-mono text-sm">destructive</code>,{" "}
          <code className="font-mono text-sm">border</code>,{" "}
          <code className="font-mono text-sm">input</code>, and{" "}
          <code className="font-mono text-sm">ring</code> instead of hardcoded
          colors. Details live under{" "}
          <Link href="/docs/theming" className={linkClassName}>
            Theming
          </Link>
          .
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          Bases and composition
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Cubix keeps one visual API across Base UI, React Aria, and Radix UI.
          The skill teaches named exports,{" "}
          <code className="font-mono text-sm">data-slot</code>,{" "}
          <code className="font-mono text-sm">cn()</code>, and how{" "}
          <code className="font-mono text-sm">asChild</code> maps to each
          primitive compose API so generated code stays aligned with your chosen
          base.
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          Registry authoring
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          How to shape <code className="font-mono text-sm">registry.json</code>{" "}
          items, dependencies, and{" "}
          <code className="font-mono text-sm">public/r/*.json</code> output from{" "}
          <code className="font-mono text-sm">cubix build</code>. More in{" "}
          <Link href="/docs/registry" className={linkClassName}>
            Registry
          </Link>
          .
        </p>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          Agent surfaces
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Guidance for Cubix AI building blocks - Conversation, Prompt Input,
          Thinking, Tool Call, Streaming Text, and related patterns - so chat
          and agent UIs follow the same ownership model as the rest of the
          catalog.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          How it works
        </h2>
        <ol className="list-decimal space-y-3 pl-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Project detection</strong> -
            the skill activates when it finds{" "}
            <code className="font-mono text-sm">cubix.json</code> in the
            workspace.
          </li>
          <li>
            <strong className="text-foreground">Context injection</strong> -
            it reads project config (and prefers{" "}
            <code className="font-mono text-sm">cubix info --json</code> when
            available) so aliases, base, and paths stay accurate.
          </li>
          <li>
            <strong className="text-foreground">Pattern enforcement</strong> -
            the assistant follows Cubix composition rules: semantic tokens,{" "}
            <code className="font-mono text-sm">data-slot</code>, accessible
            states, and base-specific APIs without inventing a parallel design
            system.
          </li>
          <li>
            <strong className="text-foreground">Component discovery</strong> -
            before generating UI, it uses{" "}
            <code className="font-mono text-sm">cubix search</code>,{" "}
            <code className="font-mono text-sm">cubix view</code>, or the docs
            catalog under{" "}
            <Link href="/docs/components" className={linkClassName}>
              Components
            </Link>{" "}
            to pick real registry items.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Tips for better results
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            Name the base when it matters:{" "}
            <code className="font-mono text-sm">--base aria</code> or{" "}
            <code className="font-mono text-sm">--base radix</code>.
          </li>
          <li>
            Point at existing screens or tokens so the assistant extends Cubix
            instead of introducing one-off styles.
          </li>
          <li>
            Ask it to run{" "}
            <code className="font-mono text-sm">cubix add</code> for missing
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
    </article>
  );
}
