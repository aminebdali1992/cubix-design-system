import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2Icon,
  CircleAlertIcon,
} from "lucide-react";

import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import { frameworks } from "./frameworks";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "Cubix is an open React component registry with design tokens, three accessibility backends, and AI-ready building blocks you own in your repo.",
};

export default function DocsPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <DocsMobileMenuTrigger />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            Introduction
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          Cubix is an open React component registry for product teams. Accessible
          primitives, a shared token system, and source you paste into your app -
          so the UI layer stays yours from day one.
        </p>
      </header>

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Most UI kits ask you to install a package, import a black box, and
          hope the escape hatches cover your design system. That works until a
          product need falls outside the package: a different interaction model,
          a custom layout, or a control that simply is not in the kit.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Cubix takes the opposite path. Components ship as TypeScript source in
          your repository. You theme them with CSS variables, compose them with
          a consistent API, and change anything without wrapping someone
          else&apos;s abstraction.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          What you get out of the box:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Owned source</strong> - every
            control lives under{" "}
            <code className="font-mono text-sm">components/cubix</code>, ready
            to edit.
          </li>
          <li>
            <strong className="text-foreground">One visual API</strong> -
            install against Base UI, React Aria, or Radix UI without redesigning
            your app.
          </li>
          <li>
            <strong className="text-foreground">Token-first theming</strong> -
            oklch colors, radius, and typography as CSS variables you can restyle
            in one place.
          </li>
          <li>
            <strong className="text-foreground">AI surfaces included</strong> -
            conversation, prompt input, tool call, thinking, and related blocks
            for agent UIs.
          </li>
          <li>
            <strong className="text-foreground">CLI + registry</strong> - add
            components with{" "}
            <code className="font-mono text-sm">npx cubix@latest</code> from a
            flat-file registry.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Source you own
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix is not a compiled dependency you fight with overrides. The CLI
          copies real files into your project. That means full visibility into
          markup, variants, and accessibility wiring - and the freedom to delete,
          rename, or extend anything.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Need a button that behaves differently for your product? Open{" "}
          <code className="font-mono text-sm">components/cubix/button.tsx</code>
          . No wrapper layer. No waiting on an upstream release for a one-line
          change.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Three bases, one Cubix API
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Accessibility backends are not one-size-fits-all. Teams standardize on
          Base UI, React Aria, or Radix UI for different reasons. Cubix keeps
          the product-facing API aligned across all three so you can pick a
          primitive stack without rewriting screens.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">Base UI</strong> - default base
            for new projects.
          </li>
          <li>
            <strong className="text-foreground">React Aria</strong> - when your
            stack already centers on Adobe&apos;s accessibility primitives.
          </li>
          <li>
            <strong className="text-foreground">Radix UI</strong> - when you
            prefer Radix primitives under the same Cubix surface.
          </li>
        </ul>
        <p className="leading-relaxed text-muted-foreground">
          Switch with{" "}
          <code className="font-mono text-sm">--base aria</code> or{" "}
          <code className="font-mono text-sm">--base radix</code> when you add
          components. Visual variants, tokens, and{" "}
          <code className="font-mono text-sm">data-slot</code> structure stay
          consistent.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Design tokens, not one-off styles
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix components speak a small set of semantic tokens:{" "}
          <code className="font-mono text-sm">background</code>,{" "}
          <code className="font-mono text-sm">foreground</code>,{" "}
          <code className="font-mono text-sm">muted</code>,{" "}
          <code className="font-mono text-sm">accent</code>,{" "}
          <code className="font-mono text-sm">primary</code>,{" "}
          <code className="font-mono text-sm">destructive</code>,{" "}
          <code className="font-mono text-sm">border</code>,{" "}
          <code className="font-mono text-sm">input</code>, and{" "}
          <code className="font-mono text-sm">ring</code>. Light and dark palettes
          live in <code className="font-mono text-sm">globals.css</code> as
          oklch values.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Restyle the product by editing variables. Dig into component files
          only when structure or behavior must change. See{" "}
          <Link
            href="/docs/theming"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80"
          >
            Theming
          </Link>{" "}
          for the full token map.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Built for agent interfaces
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Modern products need more than forms and dialogs. Cubix includes
          first-class pieces for AI chat and agent workflows: conversation
          shells, prompt input, streaming text, thinking states, tool calls,
          code blocks, and related patterns - plus ready-made blocks you can
          drop into an app shell.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Same ownership model as every other component: copy the source, wire
          your backend, ship.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Registry and CLI
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Components are published as registry items - JSON that lists files and
          dependencies - and installed with the Cubix CLI. That keeps
          distribution predictable for humans and for tooling that generates or
          updates UI from the same schema.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Start a project with{" "}
          <Link
            href="/docs/installation"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80"
          >
            Installation
          </Link>
          , then add what you need with the{" "}
          <Link
            href="/docs/cli"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80"
          >
            CLI
          </Link>
          . When you are ready to publish your own set, use the{" "}
          <Link
            href="/docs/registry"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80"
          >
            Registry
          </Link>{" "}
          docs.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Framework support
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Because Cubix is React source plus Tailwind - not a closed runtime -
          it runs anywhere you can render React. The docs site itself is a
          Next.js App Router app.
        </p>
        <div className="my-6 grid gap-4 sm:grid-cols-2">
          {frameworks.map((f) => (
            <div
              key={f.name}
              className="rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/40 text-foreground [&_svg]:size-4"
                    dangerouslySetInnerHTML={{ __html: f.logo }}
                  />
                  <h3 className="truncate font-semibold">{f.name}</h3>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2Icon className="size-3" />
                  {f.status}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
        <div className="my-6 flex items-start gap-2 rounded-lg border bg-muted/30 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Requirements:</strong> React
            18+ (React 19 recommended), Tailwind CSS v4, and TypeScript. Default
            base is Base UI; pass{" "}
            <code className="font-mono text-sm">--base aria</code> or{" "}
            <code className="font-mono text-sm">--base radix</code> when you need
            a different primitive backend.
          </p>
        </div>
      </section>
    </article>
  );
}
