import Link from "next/link"
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  BoxesIcon,
  PaletteIcon,
  PuzzleIcon,
  TerminalIcon,
  TypeIcon,
} from "lucide-react"

import { Button } from "@/components/cubix/button"
import { CursorAgentInstall } from "@/components/landing/cursor-agent-install"
import { SiteFrame } from "@/components/site-frame"

const resources = [
  {
    href: "/docs",
    icon: BookOpenIcon,
    title: "Documentation",
    description:
      "Install Cubix, add components from the registry, and ship with a token-based system.",
  },
  {
    href: "/docs/components",
    icon: PuzzleIcon,
    title: "Component library",
    description: "Buttons, forms, overlays, and layout primitives - copy-paste ready React.",
  },
  {
    href: "/docs/theming",
    icon: PaletteIcon,
    title: "Theming",
    description:
      "Restyle the entire system from a handful of oklch CSS variables. Light and dark included.",
  },
  {
    href: "/docs/typeset",
    icon: TypeIcon,
    title: "Typeset",
    description:
      "Geist for UI, rhythm presets for docs and chat, and a Tailwind-aligned type scale.",
  },
  {
    href: "/docs",
    icon: TerminalIcon,
    title: "CLI & registry",
    description: "Install with npx cubix@latest add, or copy the JSON registry from public/r.",
  },
  {
    href: "/docs/components",
    icon: BoxesIcon,
    title: "Own the source",
    description: "Components live in your repo. No lock-in, no hidden runtime - extend every line.",
  },
]

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="w-full bg-background">
        <div className="border-b border-border">
          <SiteFrame>
            <div className="flex flex-col items-center justify-center gap-12 border-x border-border py-12">
              <div className="flex flex-col px-5 md:px-12">
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 text-center">
                  <div className="flex flex-col gap-3 lg:gap-4">
                    <div className="text-center font-mono text-xs leading-4 font-medium tracking-wider text-muted-foreground uppercase">
                      Cubix
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                      Beautifully designed components you can copy and paste.
                    </h1>
                    <p className="text-base text-muted-foreground md:text-lg">
                      Cubix is a complete design system for building modern products. Accessible,
                      customizable and open source - built on React and Tailwind CSS, with
                      first-class Next.js support.
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <Button
                      size="lg"
                      className="h-10 rounded-full px-4"
                      nativeButton={false}
                      render={<Link href="/docs" />}
                    >
                      Get Started
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-10 rounded-full px-4"
                      nativeButton={false}
                      render={<Link href="/docs/components" />}
                    >
                      Browse Components
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SiteFrame>
        </div>
      </section>

      <section className="w-full bg-background">
        <div className="border-b border-border">
          <SiteFrame>
            <div className="flex flex-col items-center justify-center gap-10 border-x border-border py-12 md:gap-12 md:py-16">
              <div className="flex flex-col px-5 md:px-12">
                <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 text-center">
                  <div className="flex flex-col gap-3 lg:gap-4">
                    <div className="text-center font-mono text-xs leading-4 font-medium tracking-wider text-muted-foreground uppercase">
                      Agent-ready
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      Install Cubix MCP in Cursor
                    </h2>
                    <p className="text-base text-muted-foreground md:text-lg">
                      Ask the agent to connect the Cubix MCP server. It writes your Cursor config so
                      component lookups stay accurate.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-5 md:px-12">
                <div className="mx-auto w-full max-w-4xl">
                  <CursorAgentInstall />
                </div>
              </div>
            </div>
          </SiteFrame>
        </div>
      </section>

      <section className="w-full bg-background">
        <div className="border-b border-border">
          <SiteFrame>
            <div className="flex flex-col items-center justify-center gap-12 border-x border-border pt-12">
              <div className="flex flex-col px-5 md:px-12">
                <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 text-center">
                  <div className="flex flex-col gap-3 lg:gap-4">
                    <div className="text-center font-mono text-xs leading-4 font-medium tracking-wider text-muted-foreground uppercase">
                      Our ecosystem
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      Design and ship Cubix projects faster
                    </h2>
                    <p className="text-base text-muted-foreground md:text-lg">
                      An extensive collection of React resources to help designers, developers, and
                      teams deliver Cubix projects efficiently.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 border-t border-border bg-muted p-2 sm:grid-cols-2 md:grid-cols-3">
                {resources.map((resource) => (
                  <Link
                    key={resource.title}
                    href={resource.href}
                    className="group relative flex flex-col items-start justify-start rounded-md border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/20 hover:opacity-80 md:p-6"
                  >
                    <ArrowUpRightIcon className="absolute top-3 right-3 text-foreground/30 transition-colors duration-300 group-hover:text-foreground" />
                    <div className="flex size-10 items-center justify-center rounded-md border border-border transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                      <resource.icon className="size-4" />
                    </div>
                    <h3 className="mt-6 text-xl leading-tight font-semibold tracking-tight text-foreground">
                      {resource.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground">{resource.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </SiteFrame>
        </div>
      </section>

      <footer className="border-b border-border">
        <SiteFrame>
          <div className="flex flex-col items-center justify-between gap-4 border-x border-border px-5 py-8 text-sm text-muted-foreground sm:flex-row lg:px-6">
            <p>Built by Cubix. The source code is available on GitHub.</p>
            <p>Open source. Owned by you.</p>
          </div>
        </SiteFrame>
      </footer>
    </main>
  )
}
