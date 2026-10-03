import type { ReactNode } from "react";
import Link from "next/link";
import {
  BlocksIcon,
  ChevronRightIcon,
  PaletteIcon,
  TerminalIcon,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/cubix/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cubix/tabs";
import { CodeBlock } from "@/components/docs/code-block";
import { CodeBlockCommand } from "@/components/docs/code-block-command";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import { cn } from "@/lib/utils";
import {
  DocsNextSteps,
  InlineCode,
  linkClassName,
} from "../docs-shared";
import type {
  GuideBlock,
  GuideStep,
  InstallationGuide,
} from "./installation-guides";

const pathCardClassName = cn(
  "h-auto flex-col items-start justify-start gap-1 rounded-xl border border-transparent bg-muted/50 p-5 text-start whitespace-normal",
  "text-muted-foreground transition-colors after:hidden hover:bg-muted hover:text-muted-foreground",
  "data-active:border-foreground/20 data-active:bg-background data-active:text-muted-foreground data-active:shadow-sm",
  "dark:data-active:border-foreground/20 dark:data-active:bg-muted dark:data-active:text-muted-foreground"
);

function withInlineCode(text: string): ReactNode {
  return text.split(/(`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <InlineCode key={index}>{part.slice(1, -1)}</InlineCode>;
    }
    return <span key={index}>{part}</span>;
  });
}

function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <p
              key={`text-${index}`}
              className="leading-relaxed text-muted-foreground"
            >
              {withInlineCode(block.content)}
            </p>
          );
        }
        if (block.type === "commands") {
          return (
            <CodeBlockCommand key={`cmd-${index}`} commands={block.commands} />
          );
        }
        return (
          <CodeBlock
            key={`code-${index}`}
            code={block.content}
            title={block.title}
            lang={block.lang}
          />
        );
      })}
    </div>
  );
}

function StepList({ steps }: { steps: GuideStep[] }) {
  return (
    <div className="docs-steps mb-0 pt-2 md:ms-4 md:border-s md:ps-8">
      {steps.map((step) => (
        <div key={step.title} className="mt-8 first:mt-0">
          <h3 className="docs-step scroll-m-20 font-heading text-base font-medium tracking-tight">
            {step.title}
          </h3>
          <div className="mt-4 space-y-4">
            {step.description ? (
              <p className="leading-relaxed text-muted-foreground">
                {withInlineCode(step.description)}
              </p>
            ) : null}
            {step.blocks ? <GuideBlocks blocks={step.blocks} /> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function GuidePaths({ guide }: { guide: InstallationGuide }) {
  const defaultPath =
    guide.paths.find((path) => path.id === "cli")?.id ??
    guide.paths[0]?.id ??
    "new";

  if (guide.paths.length === 1) {
    const path = guide.paths[0];
    return (
      <section className="space-y-6">
        {path.description ? (
          <p className="leading-relaxed text-muted-foreground">
            {path.description}
          </p>
        ) : null}
        <StepList steps={path.steps} />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <p className="leading-relaxed text-muted-foreground">
        Choose the setup that matches your starting point.
      </p>
      <Tabs
        defaultValue={defaultPath}
        dir="ltr"
        className="relative w-full flex-col gap-0"
      >
        <TabsList
          variant={null}
          aria-label={`${guide.name} setup options`}
          className="grid h-auto w-full grid-cols-1 items-stretch gap-3 rounded-none bg-transparent p-0 sm:grid-cols-3"
        >
          {guide.paths.map((path) => (
            <TabsTrigger
              key={path.id}
              value={path.id}
              className={pathCardClassName}
            >
              <span className="text-sm font-medium text-foreground">
                {path.label}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {path.description}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {guide.paths.map((path) => (
          <TabsContent
            key={path.id}
            value={path.id}
            className="relative mt-10 outline-none"
          >
            <StepList steps={path.steps} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

export function InstallationGuidePage({ guide }: { guide: InstallationGuide }) {
  return (
    <article className="space-y-10">
      <div className="flex min-w-0 items-center gap-2">
        <DocsMobileMenuTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/docs" />}>
                Docs
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/docs/installation" />}>
                Installation
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate font-medium">
                {guide.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center text-foreground [&_svg]:size-9"
            dangerouslySetInnerHTML={{ __html: guide.logo }}
          />
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            {guide.name}
          </h1>
        </div>
        <p className="text-lead text-muted-foreground">{guide.description}</p>
      </header>

      <GuidePaths guide={guide} />

      <section className="space-y-4 border-t border-border pt-10">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Next steps</h2>
        <DocsNextSteps
          steps={[
            {
              title: "Components",
              description: "Browse the catalog and add what you need.",
              href: "/docs/components",
              icon: BlocksIcon,
            },
            {
              title: "Theming",
              description: "Restyle tokens after init.",
              href: "/docs/theming",
              icon: PaletteIcon,
            },
            {
              title: "CLI",
              description: "Full reference for init, add, view, and build.",
              href: "/docs/cli",
              icon: TerminalIcon,
            },
          ]}
        />
        <p className="leading-relaxed text-muted-foreground">
          Prefer a different host? See all options on the{" "}
          <Link href="/docs/installation" className={linkClassName}>
            Installation
          </Link>{" "}
          page.
        </p>
      </section>
    </article>
  );
}
