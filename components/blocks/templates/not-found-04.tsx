import Link from "next/link"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import { cn } from "@/lib/utils"
import { buildNotFoundFiles } from "@/components/blocks/templates/block-source-deps"

function NotFound04View({
  className,
  railClassName,
}: {
  className?: string
  railClassName?: string
}) {
  return (
    <div
      className={cn(
        "@container relative flex overflow-hidden bg-background",
        className
      )}
    >
      <aside
        className={cn(
          "relative hidden w-18 shrink-0 flex-col items-center justify-between border-e border-border bg-muted/20 py-8 @min-[640px]:flex",
          railClassName
        )}
      >
        <Badge variant="outline" className="font-mono tracking-widest uppercase">
          Err
        </Badge>
        <span
          className="cubix-enter select-none font-heading text-headline text-foreground/80"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            animationDelay: "80ms",
          }}
        >
          404
        </span>
        <span className="size-1.5 rounded-full bg-foreground/25" aria-hidden />
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div
          aria-hidden
          className="cubix-enter-soft pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_0%,color-mix(in_oklab,var(--muted-foreground)_8%,transparent),transparent_60%)]" />
        </div>

        <div className="relative z-10 grid min-h-0 flex-1 @min-[800px]:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 @min-[640px]:px-12 @min-[800px]:pr-6">
            <Badge
              variant="outline"
              className="cubix-enter w-fit font-mono tracking-widest uppercase @min-[640px]:hidden"
              style={{ animationDelay: "40ms" }}
            >
              Error 404
            </Badge>

            <h1
              className="cubix-enter mt-5 max-w-md font-heading text-display text-balance @min-[640px]:mt-0"
              style={{ animationDelay: "100ms" }}
            >
              Page not found
            </h1>

            <p
              className="cubix-enter mt-4 max-w-sm text-lead text-muted-foreground text-pretty"
              style={{ animationDelay: "160ms" }}
            >
              This route does not connect to a page. Trace back to home, or open
              the docs and continue from a known landmark.
            </p>

            <div
              className="cubix-enter mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "240ms" }}
            >
              <Button render={<Link href="/" />} nativeButton={false}>
                Return home
              </Button>
              <Button
                variant="outline"
                render={<Link href="/docs" />}
                nativeButton={false}
              >
                Open docs
              </Button>
            </div>

            <p
              className="cubix-enter mt-10 font-mono text-label tracking-widest text-muted-foreground"
              style={{ animationDelay: "320ms" }}
            >
              status - missing_route
            </p>
          </div>

          <div className="relative hidden items-center justify-center p-8 @min-[800px]:flex">
            <div
              className="cubix-enter-soft relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-muted/15"
              style={{ animationDelay: "180ms" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/blocks/404-placeholder.svg"
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NotFound04() {
  return <NotFound04View className="h-full min-h-0" />
}

export const notFound04Files = buildNotFoundFiles(`import Link from "next/link"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh overflow-hidden bg-background">
      <aside className="relative hidden w-18 shrink-0 flex-col items-center justify-between border-e border-border bg-muted/20 py-8 sm:flex">
        <Badge variant="outline" className="font-mono tracking-widest uppercase">Err</Badge>
        <span className="font-heading text-headline text-foreground/80" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          404
        </span>
      </aside>
      <div className="relative flex min-w-0 flex-1 flex-col justify-center px-6 py-12 sm:px-12">
        <h1 className="max-w-md font-heading text-display">
          Page not found
        </h1>
        <p className="mt-4 max-w-sm text-lead text-muted-foreground">
          This route does not connect to a page. Trace back to home, or open the docs and continue from a known landmark.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button render={<Link href="/" />} nativeButton={false}>Return home</Button>
          <Button variant="outline" render={<Link href="/docs" />} nativeButton={false}>Open docs</Button>
        </div>
      </div>
    </div>
  )
}
`, { placeholder: true })
