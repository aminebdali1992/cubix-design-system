import type { ComponentProps } from "react"
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
  TextField,
  TextFieldClear,
  TextFieldControl,
  TextFieldInput,
} from "@/components/cubix/text-field"
import { cn } from "@/lib/utils"
import { buildNotFoundFiles } from "@/components/blocks/templates/block-source-deps"

const suggestions = [
  { title: "کامپوننت‌ها", href: "/docs/components" },
  { title: "بلوک‌ها", href: "/blocks" },
  { title: "بازگشت به خانه", href: "/" },
]

function SearchGlyph(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="11" cy="11" r="5.5" />
      <path d="m15 15 4 4" />
    </svg>
  )
}

function NotFound03View({ className }: { className?: string }) {
  return (
    <div
      lang="fa"
      dir="rtl"
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
              variant="outline"
              className="cubix-enter"
              style={{ animationDelay: "40ms" }}
            >
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle
              className="cubix-enter mt-5 font-heading text-lead font-semibold tracking-normal text-balance"
              style={{ animationDelay: "100ms" }}
            >
              صفحه مورد نظر یافت نشد
            </EmptyTitle>
            <EmptyDescription
              className="cubix-enter mt-1 text-description text-pretty"
              style={{ animationDelay: "160ms" }}
            >
              چیزی که نیاز دارید را جستجو کنید، یا به جایی بروید که هنوز وجود
              دارد.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="max-w-md">
            <form
              action="/docs"
              role="search"
              className="cubix-enter mt-5 flex w-full items-center gap-2"
              style={{ animationDelay: "220ms" }}
            >
              <TextField className="min-w-0 flex-1">
                <TextFieldControl>
                  <SearchGlyph data-icon="inline-start" />
                  <TextFieldInput
                    name="q"
                    type="text"
                    enterKeyHint="search"
                    placeholder="جستجو در مستندات..."
                    aria-label="جستجو در مستندات"
                  />
                  <TextFieldClear aria-label="پاک کردن جستجو" />
                </TextFieldControl>
              </TextField>
              <Button type="submit" variant="foreground">
                جستجو
              </Button>
            </form>

            <div
              className="cubix-enter mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-description"
              style={{ animationDelay: "300ms" }}
            >
              {suggestions.map((item, index) => (
                <span key={item.href} className="inline-flex items-center gap-1">
                  {index > 0 ? (
                    <span className="text-border" aria-hidden>
                      /
                    </span>
                  ) : null}
                  <Button
                    variant="ghost"
                    size="sm"
                    render={<Link href={item.href} />}
                    nativeButton={false}
                  >
                    {item.title}
                  </Button>
                </span>
              ))}
            </div>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  )
}

export function NotFound03() {
  return <NotFound03View className="h-full min-h-0" />
}

export const notFound03Files = buildNotFoundFiles(`import type { ComponentProps } from "react"
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
  TextField,
  TextFieldClear,
  TextFieldControl,
  TextFieldInput,
} from "@/components/cubix/text-field"

const suggestions = [
  { title: "کامپوننت‌ها", href: "/docs/components" },
  { title: "بلوک‌ها", href: "/blocks" },
  { title: "بازگشت به خانه", href: "/" },
]

function SearchGlyph(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="11" cy="11" r="5.5" />
      <path d="m15 15 4 4" />
    </svg>
  )
}

export default function NotFound() {
  return (
    <div lang="fa" dir="rtl" className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-14">
        <Empty className="max-w-md border-0 p-0">
          <EmptyHeader className="max-w-md">
            <EmptyMedia variant="outline">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle className="mt-5 font-heading text-lead font-semibold tracking-normal">
              صفحه مورد نظر یافت نشد
            </EmptyTitle>
            <EmptyDescription className="text-description">
              چیزی که نیاز دارید را جستجو کنید، یا به جایی بروید که هنوز وجود دارد.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="max-w-md">
            <form action="/docs" role="search" className="mt-5 flex w-full items-center gap-2">
              <TextField className="min-w-0 flex-1">
                <TextFieldControl>
                  <SearchGlyph data-icon="inline-start" />
                  <TextFieldInput name="q" type="text" enterKeyHint="search" placeholder="جستجو در مستندات..." aria-label="جستجو در مستندات" />
                  <TextFieldClear aria-label="پاک کردن جستجو" />
                </TextFieldControl>
              </TextField>
              <Button type="submit" variant="foreground">جستجو</Button>
            </form>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1 text-description">
              {suggestions.map((item) => (
                <Button key={item.href} variant="ghost" size="sm" render={<Link href={item.href} />} nativeButton={false}>
                  {item.title}
                </Button>
              ))}
            </div>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  )
}
`)
