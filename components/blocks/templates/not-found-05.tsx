import Link from "next/link"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"
import { cn } from "@/lib/utils"
import { buildNotFoundFiles } from "@/components/blocks/templates/block-source-deps"

function NotFound05View({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden bg-background",
        className
      )}
    >
      <div aria-hidden className="cubix-enter-soft absolute inset-0 bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blocks/404-placeholder.svg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-100 dark:opacity-20"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-14 sm:px-10">
        <Card
          className="cubix-enter w-full max-w-md shadow-xs"
          style={{ animationDelay: "80ms" }}
        >
          <CardHeader className="items-center text-center">
            <Badge variant="outline" className="font-mono tracking-widest uppercase">
              Error 404
            </Badge>
            <CardTitle className="mt-2 text-display">
              Page not found
            </CardTitle>
            <CardDescription className="max-w-sm text-pretty">
              The page you requested is unavailable. Return home and continue
              from a known route.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-center gap-3 pb-8">
            <Button
              size="lg"
              render={<Link href="/" />}
              nativeButton={false}
            >
              Back to home
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/docs" />}
              nativeButton={false}
            >
              View docs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function NotFound05() {
  return <NotFound05View className="h-full min-h-0" />
}

export const notFound05Files = buildNotFoundFiles(`import Link from "next/link"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <div aria-hidden className="absolute inset-0 bg-muted">
        <img src="/blocks/404-placeholder.svg" alt="" className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-14">
        <Card className="w-full max-w-md shadow-xs">
          <CardHeader className="items-center text-center">
            <Badge variant="outline" className="font-mono tracking-widest uppercase">Error 404</Badge>
            <CardTitle className="mt-2 text-display">
              Page not found
            </CardTitle>
            <CardDescription className="max-w-sm">
              The page you requested is unavailable. Return home and continue from a known route.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-3 pb-8">
            <Button size="lg" render={<Link href="/" />} nativeButton={false}>Back to home</Button>
            <Button size="lg" variant="outline" render={<Link href="/docs" />} nativeButton={false}>View docs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
`, { placeholder: true })
