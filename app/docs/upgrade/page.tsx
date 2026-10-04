import type { Metadata } from "next";
import Link from "next/link";
import {
  BlocksIcon,
  HistoryIcon,
  PackageIcon,
  TerminalIcon,
} from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { addComponentCommands } from "@/lib/package-manager-commands";
import {
  DocsNextSteps,
  DocsPageHeader,
  InlineCode,
  linkClassName,
  sectionHeadingClassName,
} from "../docs-shared";

export const metadata: Metadata = {
  title: "Upgrade",
  description:
    "Update Cubix components you already own - CLI overwrite, bases, registry pins, and safe merge habits.",
};

const updateOneCommands = addComponentCommands("button");
const updateOverwriteCommands = {
  pnpm: "pnpm dlx cubix-ui@latest add button --overwrite",
  npm: "npx cubix-ui@latest add button --overwrite",
  yarn: "yarn dlx cubix-ui@latest add button --overwrite",
  bun: "bunx --bun cubix-ui@latest add button --overwrite",
};
const updateBaseCommands = addComponentCommands("button", "aria");
const updateManyCommands = {
  pnpm: "pnpm dlx cubix-ui@latest add button dialog select --overwrite",
  npm: "npx cubix-ui@latest add button dialog select --overwrite",
  yarn: "yarn dlx cubix-ui@latest add button dialog select --overwrite",
  bun: "bunx --bun cubix-ui@latest add button dialog select --overwrite",
};
const pinCliCommands = {
  pnpm: "pnpm dlx cubix-ui@0.1.3 add button --overwrite",
  npm: "npx cubix-ui@0.1.3 add button --overwrite",
  yarn: "yarn dlx cubix-ui@0.1.3 add button --overwrite",
  bun: "bunx --bun cubix-ui@0.1.3 add button --overwrite",
};

const mergeChecklist = `1. Commit or stash local edits under components/cubix before updating.
2. Re-add only the components you intend to refresh.
3. Diff the overwritten files - keep your product-specific changes.
4. Run your app build and smoke the touched screens (light, dark, RTL if you ship them).
5. Commit the registry refresh separately from unrelated app work.`;

export default function UpgradePage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="Upgrade"
        description="Cubix components live in your repo. Updating means pulling a newer registry item with the CLI, reviewing the diff, and keeping the edits that belong to your product."
      />

      <section className="space-y-4">
        <h2 id="how-updates-work" className={sectionHeadingClassName}>
          How updates work
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cubix is copy-paste ownership, not a runtime package of components.
          After <InlineCode>cubix-ui add</InlineCode>, the source under{" "}
          <InlineCode>components/cubix</InlineCode> is yours. When Cubix ships a
          fix or API improvement, you opt in by re-adding the same name from the
          registry.
        </p>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            <strong className="text-foreground">CLI version</strong> -{" "}
            <InlineCode>cubix-ui@latest</InlineCode> (or a pinned version)
            fetches items and writes files.
          </li>
          <li>
            <strong className="text-foreground">Registry</strong> - default
            catalog is the public Cubix registry; override with{" "}
            <InlineCode>CUBIX_REGISTRY_URL</InlineCode> when you need a mirror
            or local <InlineCode>public/r</InlineCode>.
          </li>
          <li>
            <strong className="text-foreground">Base</strong> - updates follow{" "}
            <InlineCode>cubix.json</InlineCode> (
            <InlineCode>base</InlineCode>, <InlineCode>aria</InlineCode>, or{" "}
            <InlineCode>radix</InlineCode>). Pass{" "}
            <InlineCode>--base</InlineCode> to target another variant.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 id="update-a-component" className={sectionHeadingClassName}>
          Update a component
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Re-run add for the component. If the file already exists, the CLI asks
          before overwriting unless you pass <InlineCode>--overwrite</InlineCode>
          .
        </p>
        <CodeBlockCommand commands={updateOneCommands} />
        <CodeBlockCommand commands={updateOverwriteCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Update several names in one pass when a changelog entry touches a set
          of related primitives:
        </p>
        <CodeBlockCommand commands={updateManyCommands} />
      </section>

      <section className="space-y-4">
        <h2 id="bases" className={sectionHeadingClassName}>
          Bases
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Ready components ship for Base UI, React Aria, and Radix with the same
          visual API. Keep the base in <InlineCode>cubix.json</InlineCode>{" "}
          stable for day-to-day work. When you intentionally migrate a screen,
          re-add with <InlineCode>--base</InlineCode> and fix imports in that
          feature only.
        </p>
        <CodeBlockCommand commands={updateBaseCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Do not mix bases inside one feature tree. Shared helpers under{" "}
          <InlineCode>@/lib</InlineCode> that the registry ships (except{" "}
          <InlineCode>utils</InlineCode>) update with the component that depends
          on them.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="pinning" className={sectionHeadingClassName}>
          Pin the CLI when you need a known snapshot
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          For reproducible upgrades in CI or a release branch, pin the CLI
          version that matches the changelog entry you are applying:
        </p>
        <CodeBlockCommand commands={pinCliCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Pair that with the{" "}
          <Link href="/docs/changelog" className={linkClassName}>
            Changelog
          </Link>{" "}
          so you know which components and packaging fixes landed in that
          release.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="merge-checklist" className={sectionHeadingClassName}>
          Safe merge checklist
        </h2>
        <CodeBlock code={mergeChecklist} title="Checklist" />
        <p className="leading-relaxed text-muted-foreground">
          Prefer small diffs. If you heavily customized a file, copy your
          variant aside, overwrite from the registry, then re-apply only the
          product-specific pieces (copy, layout, analytics hooks).
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="what-not-to-expect" className={sectionHeadingClassName}>
          What not to expect
        </h2>
        <ul className="list-disc space-y-2 ps-6 text-muted-foreground">
          <li>
            There is no automatic semver bump inside your app for component
            source - ownership means you choose when to pull.
          </li>
          <li>
            Coming soon components are not in the installable registry yet.
            Wait for a ready release before adding them.
          </li>
          <li>
            Switching bases is a migration, not a silent upgrade. Treat it like
            changing a dependency with a different compose API.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Changelog",
              description: "See what changed before you re-add components.",
              href: "/docs/changelog",
              icon: HistoryIcon,
            },
            {
              title: "CLI",
              description: "Full command reference for add, info, and build.",
              href: "/docs/cli",
              icon: TerminalIcon,
            },
            {
              title: "Installation",
              description: "Init and first add if you are new to Cubix.",
              href: "/docs/installation",
              icon: PackageIcon,
            },
            {
              title: "Components",
              description: "Browse ready components you can update today.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
