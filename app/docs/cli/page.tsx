import type { Metadata } from "next";
import Link from "next/link";
import {
  BlocksIcon,
  BookOpenIcon,
  PackageIcon,
  SparklesIcon,
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

const commandOverview = [
  {
    name: "init",
    description:
      "Configure tokens, utils, and cubix.json - or scaffold a new app with -t.",
  },
  {
    name: "add",
    description: "Copy components and dependencies into your project.",
  },
  {
    name: "view",
    description: "Inspect registry items before you install them.",
  },
  {
    name: "search",
    description: "Find items in the Cubix registry. list is an alias.",
  },
  {
    name: "build",
    description: "Generate registry JSON from your registry.json.",
  },
  {
    name: "info",
    description: "Print project config for humans and assistants.",
  },
] as const;

const initUsage = `Usage: cubix init [options] [components...]

initialize your project and install dependencies

Options:
  -t, --template <template>  scaffold a new project (next, vite, start, react-router, astro)
  -b, --base <base>          the primitive backend to use (base, radix, aria)
  -y, --yes                  skip confirmation prompts
  -f, --force                force overwrite of existing configuration
  -c, --cwd <cwd>            the working directory (default: current directory)
      --src-dir              use a src/ directory (Next.js template)
      --name <name>          project name when using --template
  -s, --silent               mute output
  -h, --help                 display help for command`;

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

export default function CliPage() {
  return (
    <article className="space-y-12">
      <DocsPageHeader
        title="CLI"
        description="Use the Cubix CLI to initialize a project, add components from the registry, inspect items before install, and publish registry JSON."
      />

      <section className="space-y-4">
        <p className="leading-relaxed text-muted-foreground">
          Run every command with your package manager. Prefer{" "}
          <InlineCode>npx cubix@latest</InlineCode> (or the pnpm / yarn / bun
          equivalent) so you always get the newest CLI.
        </p>
        <ul className="my-6 grid list-none gap-3 ps-0 sm:grid-cols-2">
          {commandOverview.map((command) => (
            <li key={command.name} className="rounded-xl border bg-card p-5">
              <a
                href={`#${command.name}`}
                className="text-sm font-semibold text-foreground no-underline hover:underline"
              >
                <InlineCode>{command.name}</InlineCode>
              </a>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {command.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 id="init" className={sectionHeadingClassName}>
          init
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Configure an existing project, or scaffold a new one with{" "}
          <InlineCode>-t</InlineCode> (<InlineCode>next</InlineCode>,{" "}
          <InlineCode>vite</InlineCode>, <InlineCode>start</InlineCode>,{" "}
          <InlineCode>react-router</InlineCode>, <InlineCode>astro</InlineCode>
          ). Detects your framework, writes design tokens to its CSS entry,
          adds <InlineCode>lib/utils.ts</InlineCode> with{" "}
          <InlineCode>cn</InlineCode>, ensures the <InlineCode>@/*</InlineCode>{" "}
          alias, and creates <InlineCode>cubix.json</InlineCode>.
        </p>
        <CodeBlockCommand commands={initCommands} />
        <p className="leading-relaxed text-muted-foreground">
          Scaffold Next.js and initialize Cubix in one step:
        </p>
        <CodeBlockCommand
          commands={{
            pnpm: "pnpm dlx cubix@latest init -t next",
            npm: "npx cubix@latest init -t next",
            yarn: "yarn dlx cubix@latest init -t next",
            bun: "bunx --bun cubix@latest init -t next",
          }}
        />
        <p className="leading-relaxed text-muted-foreground">Options:</p>
        <CodeBlock code={initUsage} title="Terminal" />
        <p className="leading-relaxed text-muted-foreground">
          Pass <InlineCode>--base aria</InlineCode> or{" "}
          <InlineCode>--base radix</InlineCode> to set the default primitive
          backend. Framework guides live on{" "}
          <Link href="/docs/installation" className={linkClassName}>
            Installation
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="add" className={sectionHeadingClassName}>
          add
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Copy components and their dependencies into your project. Existing
          files are never replaced unless you pass{" "}
          <InlineCode>--overwrite</InlineCode>.
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
        <p className="leading-relaxed text-muted-foreground">Options:</p>
        <CodeBlock code={addUsage} title="Terminal" />
      </section>

      <section className="space-y-4">
        <h2 id="view" className={sectionHeadingClassName}>
          view
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Inspect registry items before installing them - files, dependencies,
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
        <p className="leading-relaxed text-muted-foreground">Options:</p>
        <CodeBlock code={viewUsage} title="Terminal" />
      </section>

      <section className="space-y-4">
        <h2 id="search" className={sectionHeadingClassName}>
          search
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Find components in the Cubix registry.{" "}
          <InlineCode>list</InlineCode> is an alias.
        </p>
        <CodeBlockCommand commands={searchCommands} />
        <p className="leading-relaxed text-muted-foreground">Options:</p>
        <CodeBlock code={searchUsage} title="Terminal" />
      </section>

      <section className="space-y-4">
        <h2 id="build" className={sectionHeadingClassName}>
          build
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Generate registry JSON files from your{" "}
          <InlineCode>registry.json</InlineCode>. Output lands in{" "}
          <InlineCode>public/r</InlineCode> by default - the same shape served
          by this docs site.
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
        <p className="leading-relaxed text-muted-foreground">Options:</p>
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
        <h2 id="info" className={sectionHeadingClassName}>
          info
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Print project configuration from <InlineCode>cubix.json</InlineCode>{" "}
          - base, aliases, Tailwind CSS entry, and related settings. Pair with{" "}
          <Link href="/docs/skills" className={linkClassName}>
            Skills
          </Link>{" "}
          so assistants resolve the same context.
        </p>
        <CodeBlockCommand commands={infoCommands} />
        <p className="leading-relaxed text-muted-foreground">Options:</p>
        <CodeBlock code={infoUsage} title="Terminal" />
      </section>

      <section className="space-y-4">
        <h2 className={sectionHeadingClassName}>Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Installation",
              description: "Walk through init and your first component add.",
              href: "/docs/installation",
              icon: PackageIcon,
            },
            {
              title: "Registry",
              description: "Catalog schema, item format, and publishing.",
              href: "/docs/registry",
              icon: BookOpenIcon,
            },
            {
              title: "Skills",
              description: "Give assistants the same CLI and project context.",
              href: "/docs/skills",
              icon: SparklesIcon,
            },
            {
              title: "Components",
              description: "Browse what you can add today.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
          ]}
        />
      </section>
    </article>
  );
}
