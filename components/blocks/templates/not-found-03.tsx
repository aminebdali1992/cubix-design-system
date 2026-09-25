import Link from "next/link"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/cubix/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/cubix/input-group"
import { cn } from "@/lib/utils"
import { buildNotFoundFiles } from "@/components/blocks/templates/block-source-deps"

const suggestions = [
  { title: "Getting started", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Blocks", href: "/blocks" },
]

function NotFound03View({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden bg-background",
        className
      )}
    >
      <div aria-hidden className="cubix-enter-soft pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[42%] bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--muted)_55%,transparent),transparent)]" />
        <div className="absolute -top-24 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--foreground)_5%,transparent),transparent_68%)]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-14 sm:px-10">
        <Empty className="max-w-md border-0 p-0">
          <EmptyHeader className="max-w-md">
            <EmptyMedia
              variant="icon"
              className="cubix-enter size-11 rounded-xl border border-border bg-background text-muted-foreground"
              style={{ animationDelay: "40ms" }}
            >
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle
              className="cubix-enter mt-5 font-heading text-display text-balance"
              style={{ animationDelay: "100ms" }}
            >
              Page not found
            </EmptyTitle>
            <EmptyDescription
              className="cubix-enter mt-1 text-lead text-pretty"
              style={{ animationDelay: "160ms" }}
            >
              Search for what you need, or jump to a place that still exists.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="max-w-md">
            <form
              action="/docs"
              className="cubix-enter mt-5 w-full"
              style={{ animationDelay: "220ms" }}
            >
              <InputGroup className="h-11">
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                  name="q"
                  type="search"
                  placeholder="Search documentation..."
                  aria-label="Search documentation"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton type="submit" variant="default" size="xs">
                    Search
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>

            <div
              className="cubix-enter mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-description"
              style={{ animationDelay: "300ms" }}
            >
              <span className="text-muted-foreground">Try</span>
              {suggestions.map((item, index) => (
                <span key={item.href} className="inline-flex items-center gap-1">
                  {index > 0 ? (
                    <span className="text-border" aria-hidden>
                      /
                    </span>
                  ) : null}
                  <Button
                    variant="link"
                    size="sm"
                    render={<Link href={item.href} />}
                    nativeButton={false}
                    className="h-auto px-1"
                  >
                    {item.title}
                  </Button>
                </span>
              ))}
            </div>

            <Button
              variant="link"
              render={<Link href="/" />}
              nativeButton={false}
              className="cubix-enter mt-4 text-muted-foreground"
              style={{ animationDelay: "360ms" }}
            >
              Or go back home
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  )
}

export function NotFound03() {
  return <NotFound03View className="h-full min-h-0" />
}

export const notFound03Files = buildNotFoundFiles(`import Link from "next/link"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/cubix/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/cubix/input-group"

const suggestions = [
  { title: "Getting started", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Blocks", href: "/blocks" },
]

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-14">
        <Empty className="max-w-md border-0 p-0">
          <EmptyHeader className="max-w-md">
            <EmptyMedia variant="icon" className="size-11 rounded-xl border border-border bg-background">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle className="mt-5 font-heading text-display">
              Page not found
            </EmptyTitle>
            <EmptyDescription className="text-lead">
              Search for what you need, or jump to a place that still exists.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="max-w-md">
            <form action="/docs" className="mt-5 w-full">
              <InputGroup className="h-11">
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput name="q" type="search" placeholder="Search documentation..." aria-label="Search documentation" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton type="submit" variant="default" size="xs">Search</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1 text-description">
              <span className="text-muted-foreground">Try</span>
              {suggestions.map((item) => (
                <Button key={item.href} variant="link" size="sm" render={<Link href={item.href} />} nativeButton={false}>
                  {item.title}
                </Button>
              ))}
            </div>
            <Button variant="link" render={<Link href="/" />} nativeButton={false} className="mt-4">
              Or go back home
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  )
}
`)
