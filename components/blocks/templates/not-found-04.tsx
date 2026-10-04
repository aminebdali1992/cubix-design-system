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
      lang="fa"
      dir="rtl"
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
        <span className="size-1.5 rounded-full bg-foreground/25" aria-hidden />
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

        <div className="relative z-10 grid min-h-0 flex-1 @min-[800px]:grid-cols-2">
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-10 @min-[640px]:px-12 @min-[800px]:items-start @min-[800px]:pe-6 @min-[800px]:text-start">
            <Badge
              variant="outline"
              className="cubix-enter w-fit font-mono tracking-widest uppercase @min-[640px]:hidden"
              style={{ animationDelay: "40ms" }}
            >
              Error 404
            </Badge>

            <h1
              className="cubix-enter mt-5 max-w-md font-heading text-lead font-semibold text-balance @min-[640px]:mt-0"
              style={{ animationDelay: "100ms" }}
            >
              صفحه مورد نظر یافت نشد
            </h1>

            <p
              className="cubix-enter mt-4 max-w-sm text-description text-muted-foreground text-pretty"
              style={{ animationDelay: "160ms" }}
            >
              این مسیر به هیچ صفحه‌ای وصل نیست. به خانه برگردید، یا مستندات را
              باز کنید و از یک نقطهٔ شناخته‌شده ادامه دهید.
            </p>

            <div
              className="cubix-enter mt-9 flex flex-wrap items-center justify-center gap-3 @min-[800px]:justify-start"
              style={{ animationDelay: "240ms" }}
            >
              <Button
                render={<Link href="/" />}
                nativeButton={false}
                variant="foreground"
              >
                بازگشت به خانه
              </Button>
              <Button
                variant="outline"
                render={<Link href="/docs" />}
                nativeButton={false}
              >
                باز کردن مستندات
              </Button>
            </div>

            <p
              className="cubix-enter mt-10 text-caption text-muted-foreground"
              style={{ animationDelay: "320ms" }}
            >
              وضعیت: مسیر تعریف‌نشده
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

import { Button } from "@/components/cubix/button"

export default function NotFound() {
  return (
    <div lang="fa" dir="rtl" className="relative flex min-h-svh overflow-hidden bg-background">
      <aside className="relative hidden w-18 shrink-0 flex-col items-center justify-between border-e border-border bg-muted/20 py-8 sm:flex">
        <span className="size-1.5 rounded-full bg-foreground/25" aria-hidden />
        <span className="font-heading text-headline text-foreground/80" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          404
        </span>
      </aside>
      <div className="relative flex min-w-0 flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:px-12 min-[800px]:items-start min-[800px]:text-start">
        <h1 className="max-w-md font-heading text-lead font-semibold">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="mt-4 max-w-sm text-description text-muted-foreground">
          این مسیر به هیچ صفحه‌ای وصل نیست. به خانه برگردید، یا مستندات را باز کنید و از یک نقطهٔ شناخته‌شده ادامه دهید.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 min-[800px]:justify-start">
          <Button render={<Link href="/" />} nativeButton={false} variant="foreground">بازگشت به خانه</Button>
          <Button variant="outline" render={<Link href="/docs" />} nativeButton={false}>باز کردن مستندات</Button>
        </div>
        <p className="mt-10 text-caption text-muted-foreground">وضعیت: مسیر تعریف‌نشده</p>
      </div>
    </div>
  )
}
`, { placeholder: true })
