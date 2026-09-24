import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/docs/code-block";
import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import { addComponentCommands } from "@/lib/package-manager-commands";

export const metadata: Metadata = {
  title: "CLI",
  description:
    "Use the Cubix CLI to initialize a project, add components from the registry, inspect items, and build registry JSON.",
};

const initCommands = {
  pnpm: "pnpm dlx cubix@latest init",
  npm: "npx cubix@latest init",
  yarn: "yarn dlx cubix@latest init",
  bun: "bunx --bun cubix@latest init",
};

const addCommands = {
  pnpm: "pnpm dlx cubix@latest add [component]",
  npm: "npx cubix@latest add [component]",
  yarn: "yarn dlx cubix@latest add [component]",
  bun: "bunx --bun cubix@latest add [component]",
};

const addButtonCommands = addComponentCommands("button");
const addMultiCommands = {
  pnpm: "pnpm dlx cubix@latest add button card dialog",
  npm: "npx cubix@latest add button card dialog",
  yarn: "yarn dlx cubix@latest add button card dialog",
  bun: "bunx --bun cubix@latest add button card dialog",
};
const addAriaCommands = addComponentCommands("button", "aria");

const viewCommands = {
  pnpm: "pnpm dlx cubix@latest view button",
  npm: "npx cubix@latest view button",
  yarn: "yarn dlx cubix@latest view button",
  bun: "bunx --bun cubix@latest view button",
};

const searchCommands = {
  pnpm: 'pnpm dlx cubix@latest search -q "button"',
  npm: 'npx cubix@latest search -q "button"',
  yarn: 'yarn dlx cubix@latest search -q "button"',
  bun: 'bunx --bun cubix@latest search -q "button"',
};

const buildCommands = {
  pnpm: "pnpm dlx cubix@latest build",
  npm: "npx cubix@latest build",
  yarn: "yarn dlx cubix@latest build",
  bun: "bunx --bun cubix@latest build",
};

const infoCommands = {
  pnpm: "pnpm dlx cubix@latest info",
  npm: "npx cubix@latest info",
  yarn: "yarn dlx cubix@latest info",
  bun: "bunx --bun cubix@latest info",
};

const initUsage = `Usage: cubix init [options]

initialize your project and install dependencies

Options:
  -b, --base <base>   the primitive backend to use (base, radix, aria)
  -y, --yes           skip confirmation prompt
  -f, --force         force overwrite of existing configuration
  -c, --cwd <cwd>     the working directory (default: current directory)
  -s, --silent        mute output
  -h, --help          display help for command`;

const addUsage = `Usage: cubix add [options] [components...]

add a component to your project

Arguments:
  components          name, url, or local path to a component

Options:
  -b, --base <base>   override the project base (base, radix, aria)
  -y, --yes           skip confirmation prompt
  -o, --overwrite     overwrite existing files
  -c, --cwd <cwd>     the working directory (default: current directory)
  -a, --all           add all available components
  -p, --path <path>   the path to add the component to
  -s, --silent        mute output
  --dry-run           preview changes without writing files
  -h, --help          display help for command`;

const viewUsage = `Usage: cubix view [options] <items...>

view items from the registry before installing them

Arguments:
  items               the item names or URLs to view

Options:
  -c, --cwd <cwd>     the working directory (default: current directory)
  -h, --help          display help for command`;

const searchUsage = `Usage: cubix search|list [options] [registries...]

search items from registries

Options:
  -q, --query <query>    query string
  -l, --limit <number>   maximum number of items to display (default: 100)
  -o, --offset <number>  number of items to skip (default: 0)
  -c, --cwd <cwd>        the working directory (default: current directory)
  -h, --help             display help for command`;

const buildUsage = `Usage: cubix build [options] [registry]

build components for a Cubix registry

Arguments:
  registry             path to registry.json (default: ./registry.json)

Options:
  -o, --output <path>  destination directory for JSON files (default: ./public/r)
  -c, --cwd <cwd>      the working directory (default: current directory)
  -h, --help           display help for command`;

const infoUsage = `Usage: cubix info [options]

get information about your project

Options:
  -c, --cwd <cwd>  the working directory (default: current directory)
  --json           output as JSON
  -h, --help       display help for command`;

const linkClassName =
  "font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80";

export default function CliPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <DocsMobileMenuTrigger />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            CLI
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          Use the Cubix CLI to initialize a project, add components from the
          registry, inspect items before install, and publish registry JSON.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">init</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">init</code> command to
          configure an existing project. It installs shared dependencies, adds
          the <code className="font-mono text-sm">cn</code> util, writes design
          tokens to your CSS entry, and creates{" "}
          <code className="font-mono text-sm">cubix.json</code>.
        </p>
        <CodeBlockCommand commands={initCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Options:
        </p>
        <CodeBlock code={initUsage} title="Terminal" />
        <p className="leading-relaxed text-muted-foreground">
          Pass <code className="font-mono text-sm">--base aria</code> or{" "}
          <code className="font-mono text-sm">--base radix</code> to set the
          default primitive backend. See{" "}
          <Link href="/docs/installation" className={linkClassName}>
            Installation
          </Link>{" "}
          for the full setup flow.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">add</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">add</code> command to copy
          components and their dependencies into your project.
        </p>
        <CodeBlockCommand commands={addCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Add a single component:
        </p>
        <CodeBlockCommand commands={addButtonCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Add several at once:
        </p>
        <CodeBlockCommand commands={addMultiCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Override the project base for one install:
        </p>
        <CodeBlockCommand commands={addAriaCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Options:
        </p>
        <CodeBlock code={addUsage} title="Terminal" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">view</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">view</code> command to
          inspect registry items before installing them - files, dependencies,
          and metadata.
        </p>
        <CodeBlockCommand commands={viewCommands} />
        <p className="leading-relaxed text-muted-foreground">
          You can view multiple items in one call:
        </p>
        <CodeBlockCommand
          commands={{
            pnpm: "pnpm dlx cubix@latest view button card dialog",
            npm: "npx cubix@latest view button card dialog",
            yarn: "yarn dlx cubix@latest view button card dialog",
            bun: "bunx --bun cubix@latest view button card dialog",
          }}
        />
        <p className="leading-relaxed text-muted-foreground">
          Options:
        </p>
        <CodeBlock code={viewUsage} title="Terminal" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">search</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">search</code> command to
          find components in the Cubix registry.{" "}
          <code className="font-mono text-sm">list</code> is an alias.
        </p>
        <CodeBlockCommand commands={searchCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Options:
        </p>
        <CodeBlock code={searchUsage} title="Terminal" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">build</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">build</code> command to
          generate registry JSON files from your{" "}
          <code className="font-mono text-sm">registry.json</code>. Output lands
          in <code className="font-mono text-sm">public/r</code> by default -
          the same shape served by this docs site.
        </p>
        <CodeBlockCommand commands={buildCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Customize the output directory:
        </p>
        <CodeBlockCommand
          commands={{
            pnpm: "pnpm dlx cubix@latest build --output ./public/registry",
            npm: "npx cubix@latest build --output ./public/registry",
            yarn: "yarn dlx cubix@latest build --output ./public/registry",
            bun: "bunx --bun cubix@latest build --output ./public/registry",
          }}
        />
        <p className="leading-relaxed text-muted-foreground">
          Options:
        </p>
        <CodeBlock code={buildUsage} title="Terminal" />
        <p className="leading-relaxed text-muted-foreground">
          More on publishing and schema on the{" "}
          <Link href="/docs/registry" className={linkClassName}>
            Registry
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">info</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">info</code> command to
          print project configuration from{" "}
          <code className="font-mono text-sm">cubix.json</code> - base, aliases,
          Tailwind CSS entry, and related settings.
        </p>
        <CodeBlockCommand commands={infoCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Options:
        </p>
        <CodeBlock code={infoUsage} title="Terminal" />
      </section>
    </article>
  );
}
