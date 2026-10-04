import Link from "next/link"
import { ArrowUpLeftIcon } from "lucide-react"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import { Separator } from "@/components/cubix/separator"
import { cn } from "@/lib/utils"
import { buildNotFoundFiles } from "@/components/blocks/templates/block-source-deps"

const destinations = [
  {
    label: "01",
    title: "مستندات",
    description: "راهنما، API و الگوها",
    href: "/docs",
  },
  {
    label: "02",
    title: "کامپوننت‌ها",
    description: "اجزای آمادهٔ رابط کاربری",
    href: "/docs/components",
  },
  {
    label: "03",
    title: "بلوک‌ها",
    description: "بخش‌ها و چیدمان صفحات",
    href: "/blocks",
  },
]

function NotFound02View({
  className,
  splitClassName,
}: {
  className?: string
  splitClassName?: string
}) {
  return (
    <div
      lang="fa"
      dir="rtl"
      className={cn(
        "@container relative flex flex-col overflow-hidden bg-background",
        className
      )}
    >
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
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/" />}
          nativeButton={false}
          className="cubix-enter"
          style={{ animationDelay: "80ms" }}
        >
          پشتیبانی
        </Button>
      </header>

      <div
        className={cn(
          "relative grid min-h-0 flex-1",
          splitClassName ??
            "@min-[720px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
        )}
      >
        <div className="relative z-10 flex flex-col justify-center px-5 py-10 sm:px-8 @min-[720px]:px-10 @min-[720px]:py-12 @min-[900px]:px-14">
          <div className="max-w-md">
            <div
              className="cubix-enter flex items-center gap-3"
              style={{ animationDelay: "40ms" }}
            >
              <Badge variant="outline" className="font-mono tracking-widest">
                404
              </Badge>
              <Separator className="w-8" />
              <span className="text-caption tracking-wide text-muted-foreground">
                Not found
              </span>
            </div>

            <h1
              className="cubix-enter mt-6 font-heading text-lead font-semibold text-balance"
              style={{ animationDelay: "120ms" }}
            >
              صفحه مورد نظر یافت نشد
            </h1>

            <p
              className="cubix-enter mt-4 text-description text-muted-foreground text-pretty"
              style={{ animationDelay: "180ms" }}
            >
              ممکن است تغییر نام داده یا حذف شده باشد. یکی از مقصدهای زیر را
              انتخاب کنید، یا به خانه برگردید و از نو شروع کنید.
            </p>

            <nav
              aria-label="مقصدهای پیشنهادی"
              className="cubix-enter mt-9"
              style={{ animationDelay: "240ms" }}
            >
              <ul className="border-y border-border">
                {destinations.map((item) => (
                  <li key={item.href} className="border-b border-border last:border-b-0">
                    <Button
                      variant="ghost"
                      nativeButton={false}
                      render={<Link href={item.href} />}
                      className="h-auto w-full items-start justify-start gap-4 rounded-none py-3.5 whitespace-normal"
                    >
                      <span className="mt-0.5 w-7 shrink-0 font-mono text-caption text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="min-w-0 flex-1 text-start">
                        <span className="flex items-center gap-1.5 text-description text-foreground">
                          {item.title}
                          <ArrowUpLeftIcon className="size-3.5 text-muted-foreground opacity-0 transition-all group-hover/button:-translate-x-0.5 group-hover/button:-translate-y-0.5 group-hover/button:opacity-100" />
                        </span>
                        <span className="mt-0.5 block text-caption font-normal text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="cubix-enter mt-8"
              style={{ animationDelay: "320ms" }}
            >
              <Button
                render={<Link href="/" />}
                nativeButton={false}
                variant="foreground"
              >
                بازگشت به خانه
              </Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "relative hidden min-h-56 overflow-hidden border-t border-border bg-muted/25 @min-[720px]:block @min-[720px]:border-t-0 @min-[720px]:border-s"
          )}
        >
          <div
            className="cubix-enter-soft absolute inset-0"
            style={{ animationDelay: "120ms" }}
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
  )
}

export function NotFound02() {
  return <NotFound02View className="h-full min-h-0" />
}

export const notFound02Files = buildNotFoundFiles(`import Link from "next/link"
import { ArrowUpLeftIcon } from "lucide-react"

import { Badge } from "@/components/cubix/badge"
import { Button } from "@/components/cubix/button"
import { Separator } from "@/components/cubix/separator"

const destinations = [
  { label: "01", title: "مستندات", description: "راهنما، API و الگوها", href: "/docs" },
  { label: "02", title: "کامپوننت‌ها", description: "اجزای آمادهٔ رابط کاربری", href: "/docs/components" },
  { label: "03", title: "بلوک‌ها", description: "بخش‌ها و چیدمان صفحات", href: "/blocks" },
]

export default function NotFound() {
  return (
    <div lang="fa" dir="rtl" className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <header className="flex h-14 items-center justify-between border-b border-border px-5 sm:px-8">
        <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false} className="font-heading">
          Cubix
        </Button>
        <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false}>
          پشتیبانی
        </Button>
      </header>
      <div className="relative grid min-h-0 flex-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-10 sm:px-8 lg:px-14">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono tracking-widest">404</Badge>
            <Separator className="w-8" />
            <span className="text-caption tracking-wide text-muted-foreground">Not found</span>
          </div>
          <h1 className="mt-6 font-heading text-lead font-semibold">
            صفحه مورد نظر یافت نشد
          </h1>
          <p className="mt-4 text-description text-muted-foreground">
            ممکن است تغییر نام داده یا حذف شده باشد. یکی از مقصدهای زیر را انتخاب کنید، یا به خانه برگردید و از نو شروع کنید.
          </p>
          <ul className="mt-9 border-y border-border">
            {destinations.map((item) => (
              <li key={item.href} className="border-b border-border last:border-b-0">
                <Button variant="ghost" nativeButton={false} render={<Link href={item.href} />} className="h-auto w-full items-start justify-start gap-4 rounded-none py-3.5 whitespace-normal">
                  <span className="mt-0.5 w-7 font-mono text-caption text-muted-foreground">{item.label}</span>
                  <span className="min-w-0 flex-1 text-start">
                    <span className="flex items-center gap-1.5 text-description">
                      {item.title}
                      <ArrowUpLeftIcon className="size-3.5 text-muted-foreground opacity-0 group-hover/button:opacity-100" />
                    </span>
                    <span className="mt-0.5 block text-caption font-normal text-muted-foreground">{item.description}</span>
                  </span>
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button render={<Link href="/" />} nativeButton={false} variant="foreground">بازگشت به خانه</Button>
          </div>
        </div>
        <div className="relative hidden overflow-hidden border-s border-border bg-muted/25 lg:block">
          <img src="/blocks/404-placeholder.svg" alt="" className="absolute inset-0 size-full object-cover" />
        </div>
      </div>
    </div>
  )
}
`, { placeholder: true })
