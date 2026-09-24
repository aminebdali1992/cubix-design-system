import Link from "next/link"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import { Separator } from "@/components/cubix/separator"
import { cn } from "@/lib/utils"
import { buildNotFoundFiles } from "@/components/blocks/templates/block-source-deps"

function NotFound06View({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden bg-background",
        className
      )}
    >
      <div
        aria-hidden
        className="cubix-enter-soft pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--muted)_40%,transparent),transparent)]" />
        <div className="absolute top-0 right-0 size-[min(28rem,55vw)] translate-x-1/4 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--foreground)_4%,transparent),transparent_70%)]" />
      </div>

      <header className="relative z-20 flex h-14 shrink-0 items-center justify-between border-b border-border px-5 sm:px-8">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/" />}
          nativeButton={false}
          className="cubix-enter font-heading"
        >
          Cubix
        </Button>
        <nav
          className="cubix-enter flex items-center gap-1"
          style={{ animationDelay: "60ms" }}
        >
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/docs" />}
            nativeButton={false}
          >
            Docs
          </Button>
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/blocks" />}
            nativeButton={false}
          >
            Blocks
          </Button>
        </nav>
      </header>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto w-full max-w-2xl">
          <div
            className="cubix-enter flex items-baseline gap-4"
            style={{ animationDelay: "40ms" }}
          >
            <span className="font-heading text-display text-foreground/15">
              404
            </span>
            <Badge variant="outline" className="font-mono tracking-widest uppercase">
              Missing
            </Badge>
          </div>

          <h1
            className="cubix-enter mt-6 max-w-xl font-heading text-display text-balance"
            style={{ animationDelay: "120ms" }}
          >
            Page not found
          </h1>

          <p
            className="cubix-enter mt-4 max-w-md text-lead text-muted-foreground text-pretty"
            style={{ animationDelay: "180ms" }}
          >
            This URL does not map to a published page. Check the address, or
            continue from the homepage.
          </p>

          <div
            className="cubix-enter mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ animationDelay: "260ms" }}
          >
            <Button size="lg" render={<Link href="/" />} nativeButton={false}>
              Go home
            </Button>
            <Button
              variant="link"
              render={<Link href="/docs" />}
              nativeButton={false}
            >
              Browse documentation
            </Button>
          </div>

          <Separator className="cubix-enter mt-14 max-w-md" style={{ animationDelay: "340ms" }} />
          <dl
            className="cubix-enter mt-6 grid max-w-md grid-cols-2 gap-6"
            style={{ animationDelay: "340ms" }}
          >
            <div>
              <dt className="font-mono text-label tracking-widest text-muted-foreground uppercase">
                Status
              </dt>
              <dd className="mt-1.5 text-caption font-medium text-foreground">
                404
              </dd>
            </div>
            <div>
              <dt className="font-mono text-label tracking-widest text-muted-foreground uppercase">
                Action
              </dt>
              <dd className="mt-1.5 text-caption font-medium text-foreground">
                Return home
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export function NotFound06() {
  return <NotFound06View className="h-full min-h-0" />
}

export const notFound06Files = buildNotFoundFiles(`import Link from "next/link"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import { Separator } from "@/components/cubix/separator"

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <header className="flex h-14 items-center justify-between border-b border-border px-5 sm:px-8">
        <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false} className="font-heading">
          Cubix
        </Button>
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" render={<Link href="/docs" />} nativeButton={false}>Docs</Button>
          <Button variant="ghost" size="sm" render={<Link href="/blocks" />} nativeButton={false}>Blocks</Button>
        </nav>
      </header>
      <div className="flex flex-1 flex-col justify-center px-5 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex items-baseline gap-4">
            <span className="font-heading text-display text-foreground/15">404</span>
            <Badge variant="outline" className="font-mono tracking-widest uppercase">Missing</Badge>
          </div>
          <h1 className="mt-6 font-heading text-display">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-lead text-muted-foreground">
            This URL does not map to a published page. Check the address, or continue from the homepage.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" render={<Link href="/" />} nativeButton={false}>Go home</Button>
            <Button variant="link" render={<Link href="/docs" />} nativeButton={false}>Browse documentation</Button>
          </div>
          <Separator className="mt-14 max-w-md" />
          <dl className="mt-6 grid max-w-md grid-cols-2 gap-6">
            <div>
              <dt className="font-mono text-label tracking-widest text-muted-foreground uppercase">Status</dt>
              <dd className="mt-1.5 text-caption font-medium">404</dd>
            </div>
            <div>
              <dt className="font-mono text-label tracking-widest text-muted-foreground uppercase">Action</dt>
              <dd className="mt-1.5 text-caption font-medium">Return home</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
`)
