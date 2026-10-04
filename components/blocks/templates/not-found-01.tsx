import Link from "next/link"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import { cn } from "@/lib/utils"
import { buildNotFoundFiles } from "@/components/blocks/templates/block-source-deps"

function NotFound01View({ className }: { className?: string }) {
  return (
    <div
      lang="fa"
      dir="rtl"
      className={cn(
        "relative flex flex-col overflow-hidden bg-background",
        className
      )}
    >
      <div
        aria-hidden
        className="cubix-enter-soft pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,color-mix(in_oklab,var(--foreground)_7%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_110%,color-mix(in_oklab,var(--muted-foreground)_10%,transparent),transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in oklab, var(--border) 65%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in oklab, var(--border) 65%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 45%, black 10%, transparent 75%)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="cubix-enter-soft pointer-events-none absolute inset-x-0 top-[42%] flex -translate-y-1/2 justify-center overflow-hidden"
        style={{ animationDelay: "60ms" }}
      >
        <span className="cubix-float select-none font-heading text-8xl font-semibold leading-none tracking-tighter text-foreground/5">
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
        <div className="flex max-w-lg flex-col items-center">
          <Badge
            variant="outline"
            className="cubix-enter font-mono tracking-widest uppercase"
            style={{ animationDelay: "40ms" }}
          >
            Error 404
          </Badge>

          <h1
            className="cubix-enter mt-7 font-heading text-lead font-semibold text-balance"
            style={{ animationDelay: "140ms" }}
          >
            صفحه مورد نظر یافت نشد
          </h1>

          <p
            className="cubix-enter mt-4 max-w-md text-description text-muted-foreground text-pretty"
            style={{ animationDelay: "200ms" }}
          >
            آدرس ممکن است اشتباه تایپ شده باشد یا صفحه جابه‌جا شده باشد. به خانه
            برگردید و از آنجا ادامه دهید.
          </p>

          <div
            className="cubix-enter mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
            style={{ animationDelay: "280ms" }}
          >
            <Button
              render={<Link href="/" />}
              nativeButton={false}
              variant="foreground"
              className="min-w-36"
            >
              بازگشت به خانه
            </Button>
            <Button
              variant="ghost"
              render={<Link href="/" />}
              nativeButton={false}
            >
              بازگشت به صفحه قبل
            </Button>
          </div>
        </div>
      </div>

      <footer className="relative z-10 flex items-center justify-center px-6 pb-6">
        <p
          className="cubix-enter text-caption text-muted-foreground"
          style={{ animationDelay: "360ms" }}
        >
          گم شده، اما نه از دست رفته
        </p>
      </footer>
    </div>
  )
}

export function NotFound01() {
  return <NotFound01View className="h-full min-h-0" />
}

export const notFound01Files = buildNotFoundFiles(`import Link from "next/link"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"

export default function NotFound() {
  return (
    <div lang="fa" dir="rtl" className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <div aria-hidden className="cubix-enter-soft pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,color-mix(in_oklab,var(--foreground)_7%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_110%,color-mix(in_oklab,var(--muted-foreground)_10%,transparent),transparent_65%)]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
        <Badge variant="outline" className="font-mono tracking-widest uppercase">
          Error 404
        </Badge>
        <h1 className="mt-7 font-heading text-lead font-semibold text-balance">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="mt-4 max-w-md text-description text-muted-foreground text-pretty">
          آدرس ممکن است اشتباه تایپ شده باشد یا صفحه جابه‌جا شده باشد. به خانه
          برگردید و از آنجا ادامه دهید.
        </p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <Button render={<Link href="/" />} nativeButton={false} variant="foreground" className="min-w-36">
            بازگشت به خانه
          </Button>
          <Button variant="ghost" render={<Link href="/" />} nativeButton={false}>
            بازگشت به صفحه قبل
          </Button>
        </div>
      </div>
    </div>
  )
}
`)
