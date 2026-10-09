import Link from "next/link"
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  LanguagesIcon,
  PaletteIcon,
  SparklesIcon,
  TerminalIcon,
  TypeIcon,
} from "lucide-react"

import { Button } from "@/components/cubix/button"
import { cn } from "@/lib/utils"
import { AgentLoginDesign } from "@/components/landing/agent-login-design"
import { BasesCycle } from "@/components/landing/bases-cycle"
import { CliWorkflowDemo } from "@/components/landing/cli-workflow-demo"
import { CopyInitCommand } from "@/components/landing/copy-init-command"
import { DragIntoPlace } from "@/components/landing/drag-into-place"
import { HeroAgentStack } from "@/components/landing/hero-agent-stack"
import { HeroLiquidBackground } from "@/components/landing/hero-liquid-background"
import { HighlightCursorText } from "@/components/landing/highlight-cursor-text"
import { McpAgentMarks } from "@/components/landing/mcp-agent-marks"
import { SectionDivider, SectionShell } from "@/components/landing/section-shell"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteFrame } from "@/components/site-frame"
import { siteConfig } from "@/lib/site"

const capabilities = [
  "42 ready components",
  "3 primitive bases",
  "Agent UI",
  "HTTP MCP",
  "Typeset",
  "RTL & Persian",
  "Owned source",
] as const

const designPillars = [
  {
    icon: PaletteIcon,
    title: "Tokens first",
    description:
      "One oklch contract for light and dark. Restyle the system from CSS variables - never chase hex inside components.",
    proof: (
      <>
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-3.5 rounded-full bg-background ring-1 ring-border" />
          <span className="size-3.5 rounded-full bg-foreground" />
          <span className="size-3.5 rounded-full bg-primary" />
          <span className="size-3.5 rounded-full bg-muted ring-1 ring-border" />
          <span className="size-3.5 rounded-full bg-destructive" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">oklch</span>
      </>
    ),
  },
  {
    icon: TypeIcon,
    title: "Typeset",
    description:
      "Owned rhythm for UI, docs, and chat. Streaming-stable prose that stays on the same scale as the rest of the system.",
    proof: (
      <>
        <div className="flex items-baseline gap-2 text-foreground" aria-hidden>
          <span className="text-2xl font-semibold leading-none tracking-tight">Aa</span>
          <span className="text-sm leading-none text-muted-foreground">Bb</span>
          <span className="text-xs leading-none text-muted-foreground/80">Cc</span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">size · leading</span>
      </>
    ),
  },
  {
    icon: LanguagesIcon,
    title: "RTL ready",
    description:
      "Logical properties, locale-aware direction, and Persian-first foundations - built in, not bolted on after English ships.",
    proof: (
      <>
        <div className="flex items-center gap-2 text-sm" aria-hidden>
          <span className="text-muted-foreground">EN</span>
          <span className="text-muted-foreground/40">·</span>
          <span lang="fa" className="font-medium text-foreground">
            فارسی
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">ltr · rtl</span>
      </>
    ),
  },
]

const resources = [
  {
    href: "/docs",
    icon: BookOpenIcon,
    title: "Documentation",
    description: "Install, theming, Skills, and the readiness contract.",
  },
  {
    href: "/docs/typeset",
    icon: TypeIcon,
    title: "Typeset",
    description: "Semantic type roles, rhythm presets, and Persian-first prose.",
  },
  {
    href: "/docs/components",
    icon: SparklesIcon,
    title: "Components",
    description: "42 ready names across Base UI, React Aria, and Radix - copy-paste ownership.",
  },
  {
    href: "/docs/cli",
    icon: TerminalIcon,
    title: "CLI & registry",
    description: `Init, add, and ship from ${siteConfig.registryUrl}.`,
  },
]

export default function HomePage() {
  return (
    <main className="flex-1 overflow-x-clip">
      <section className="relative z-10 w-full">
        <HeroLiquidBackground />
        <div className="border-b border-border">
          <SiteFrame>
            <div className="relative flex flex-col items-center justify-center gap-10 border-x border-border pt-16 md:gap-12 md:pt-24">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden opacity-80"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in oklch, var(--foreground) 8%, transparent), transparent 70%)",
                }}
              />
              <div className="relative z-10 flex w-full flex-col gap-10 px-5 md:gap-12 md:px-12">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
                  <div className="flex flex-col gap-4">
                    <p className="font-mono text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
                      Cubix
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl md:leading-[1.05]">
                      The design system your team owns.
                    </h1>
                    <p className="mx-auto max-w-2xl text-base text-pretty text-muted-foreground md:text-lg">
                      Tokens, three bases, agent UI, Typeset, and RTL - installed as source in your
                      repo. Agents run the same CLI you do.
                    </p>
                  </div>
                  <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                    <Button
                      variant="foreground"
                      size="lg"
                      className="h-10 rounded-full px-5"
                      nativeButton={false}
                      render={<Link href="/docs" />}
                    >
                      Start building
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-10 rounded-full px-5"
                      nativeButton={false}
                      render={<Link href="/docs/components" />}
                    >
                      Browse components
                    </Button>
                  </div>
                  <CopyInitCommand />
                </div>
                <HeroAgentStack />
              </div>
            </div>
          </SiteFrame>
        </div>
      </section>

      <section className="w-full" aria-label="Cubix capabilities">
        <div className="border-b border-border">
          <SiteFrame>
            <div className="border-x border-border">
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 px-5 py-3.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase md:gap-x-7 md:px-8 md:py-4">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1 shrink-0 rounded-full bg-foreground/35" aria-hidden />
                    <span className="whitespace-nowrap">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SiteFrame>
        </div>
      </section>

      <SectionShell
        eyebrow="Behind the scenes"
        title="How your agent installs Cubix and builds the UI"
        description={
          <HighlightCursorText
            segments={[
              { highlight: "Connect MCP" },
              " for live registry tools, ",
              { highlight: "install the Cubix Skill" },
              " for composition rules, then ",
              { highlight: "search and add owned source" },
              " - every step is real.",
            ]}
          />
        }
        className="flex flex-col items-center justify-center gap-8 border-x border-border pt-16 md:gap-10 md:pt-24"
      >
        <div className="w-full px-5 md:px-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <McpAgentMarks />
            <code className="inline-flex max-w-full items-center overflow-x-auto rounded-full border border-border bg-muted/50 px-3 py-1.5 font-mono text-[11px] text-muted-foreground md:text-xs">
              {siteConfig.mcpUrl}
            </code>
            <p className="text-xs text-muted-foreground">
              One MCP URL for every client -{" "}
              <Link
                href="/docs/mcp"
                className="font-medium text-foreground/80 underline decoration-dotted underline-offset-4"
              >
                setup guides
              </Link>
              . Pair with{" "}
              <span className="font-mono text-foreground/80">
                npx skills add {siteConfig.githubRepo}
              </span>
            </p>
          </div>
        </div>
        <div className="w-full border-t border-border">
          <AgentLoginDesign />
        </div>
      </SectionShell>

      <SectionDivider />

      <SectionShell
        eyebrow="Three bases"
        title="One visual API. Three primitive backends."
        description="Base UI, React Aria, and Radix stay first-class. Switch with --base without rewriting product UI."
        className="flex flex-col items-center justify-center gap-10 border-x border-border pt-16 md:gap-12 md:pt-24"
      >
        <div className="w-full border-t border-border">
          <BasesCycle />
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Design system"
        title="Tokens, type, and locale as the foundation"
        description="Cubix ships more than components. Theming, Typeset, and RTL are part of the contract."
        className="flex flex-col items-center justify-center gap-10 border-x border-border pt-16 md:gap-12 md:pt-24"
      >
        <div className="grid w-full grid-cols-1 border-t border-border md:grid-cols-3 md:items-stretch">
          {designPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={cn(
                "flex h-full flex-col border-border bg-background",
                index > 0 && "border-t md:border-t-0",
                index < designPillars.length - 1 && "md:border-e"
              )}
            >
              <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted/50">
                  <pillar.icon className="size-4" aria-hidden />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </div>
              <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-t border-border px-6 md:px-7">
                {pillar.proof}
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionDivider />

      <section className="w-full">
        <div className="border-b border-border">
          <SiteFrame>
            <div className="border-x border-border">
              <div className="flex flex-col items-start justify-between gap-6 border-b border-border px-5 py-12 md:flex-row md:items-end md:px-12 md:py-14">
                <div className="max-w-xl space-y-3">
                  <div className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Developer workflow
                  </div>
                  <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                    Own every line. <DragIntoPlace>Update</DragIntoPlace> when you choose.
                  </h2>
                  <p className="text-base text-pretty text-muted-foreground md:text-lg">
                    Init, add, review the diff, then overwrite on purpose - not a silent dependency
                    bump.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="foreground"
                    nativeButton={false}
                    render={<Link href="/docs/cli" />}
                    className="rounded-full"
                  >
                    CLI docs
                  </Button>
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={<Link href="/docs/upgrade" />}
                    className="rounded-full"
                  >
                    Upgrade guide
                  </Button>
                </div>
              </div>
              <CliWorkflowDemo />
            </div>
          </SiteFrame>
        </div>
      </section>

      <SectionShell
        eyebrow="Start here"
        title={
          <HighlightCursorText
            segments={["Everything you need to ", { highlight: "ship with Cubix" }]}
          />
        }
        description="Docs for decisions, components for product UI, CLI for the developer loop."
        className="flex flex-col items-center justify-center gap-10 border-x border-border pt-16 md:gap-12 md:pt-24"
      >
        <div className="grid w-full grid-cols-1 gap-2 border-t border-border bg-muted p-2 sm:grid-cols-2 sm:items-stretch lg:grid-cols-4">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="group relative flex h-full flex-col items-start justify-start rounded-md border border-border bg-card p-5 transition-colors duration-200 hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted md:p-6"
            >
              <ArrowUpRightIcon className="absolute top-3 end-3 size-4 text-foreground/25 transition-colors duration-200 group-hover:text-foreground" />
              <div className="flex size-10 items-center justify-center rounded-md border border-border transition-colors duration-200 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <resource.icon className="size-4" aria-hidden />
              </div>
              <h3 className="mt-6 text-xl leading-tight font-semibold tracking-tight text-foreground">
                {resource.title}
              </h3>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">
                {resource.description}
              </p>
            </Link>
          ))}
        </div>
      </SectionShell>

      <section className="w-full">
        <div className="border-b border-border">
          <SiteFrame>
            <div className="flex flex-col items-center gap-7 border-x border-border bg-muted/35 px-5 py-16 text-center md:px-12 md:py-24">
              <div className="flex max-w-xl flex-col items-center gap-3">
                <p className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Get started
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                  Ship the system. Keep the source.
                </h2>
                <p className="text-base text-pretty text-muted-foreground md:text-lg">
                  Initialize Cubix in your app, pull the components you need, and let agents work
                  against the same registry.
                </p>
              </div>
              <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                <Button
                  variant="foreground"
                  size="lg"
                  className="h-10 rounded-full px-5"
                  nativeButton={false}
                  render={<Link href="/docs" />}
                >
                  Read the docs
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-10 rounded-full px-5 font-mono text-sm"
                  nativeButton={false}
                  render={<Link href="/docs/cli" />}
                >
                  npx cubix-ui@latest init
                </Button>
              </div>
            </div>
          </SiteFrame>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
