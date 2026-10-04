import Link from "next/link"

import { Button } from "@/components/cubix/button"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldDescription,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import { Separator } from "@/components/cubix/separator"
import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { brandGlyphsSource } from "@/components/blocks/templates/brand-glyphs-source"
import { GitHubGlyph, GoogleGlyph } from "@/components/blocks/templates/brand-glyphs"
import { PreviewForm } from "@/components/blocks/templates/preview-form"

function Login03Header() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5 sm:px-8">
      <Button
        variant="ghost"
        size="sm"
        render={<Link href="/" />}
        nativeButton={false}
        className="font-heading"
      >
        Cubix
      </Button>
      <div className="flex items-center gap-3 text-description text-muted-foreground">
        <span className="hidden sm:inline">حساب کاربری ندارید؟</span>
        <Button
          variant="outline"
          size="sm"
          render={<Link href="/signup" />}
          nativeButton={false}
        >
          ثبت‌نام
        </Button>
      </div>
    </header>
  )
}

function Login03Fields() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="submit"
          name="provider"
          value="google"
          variant="outline"
          formNoValidate
        >
          <GoogleGlyph data-icon="inline-start" />
          ادامه با گوگل
        </Button>
        <Button
          type="submit"
          name="provider"
          value="github"
          variant="outline"
          formNoValidate
        >
          <GitHubGlyph data-icon="inline-start" />
          ادامه با گیت‌هاب
        </Button>
      </div>

      <div className="my-2 flex items-center gap-3 text-caption text-muted-foreground">
        <Separator className="flex-1" />
        یا
        <Separator className="flex-1" />
      </div>

      <EmailField>
        <EmailFieldLabel>ایمیل</EmailFieldLabel>
        <EmailFieldControl>
          <EmailFieldInput name="email" placeholder="name@example.com" required />
        </EmailFieldControl>
        <EmailFieldDescription>
          لینک ورود یک‌بار مصرف به این ایمیل ارسال می‌شود.
        </EmailFieldDescription>
      </EmailField>
      <Button type="submit" variant="foreground" className="mt-1 w-full">
        ادامه با ایمیل
      </Button>
    </>
  )
}

function Login03View({ className }: { className?: string }) {
  return (
    <div
      lang="fa"
      dir="rtl"
      className={cn(
        "relative flex flex-col overflow-hidden bg-background [--primary:var(--foreground)] [--primary-foreground:var(--background)]",
        className
      )}
    >
      <Login03Header />

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-88">
          <div className="text-center">
            <h1
              className="cubix-enter font-heading text-lead font-semibold"
              style={{ animationDelay: "40ms" }}
            >
              به حساب خود وارد شوید
            </h1>
            <p
              className="cubix-enter mt-2 text-description text-muted-foreground"
              style={{ animationDelay: "100ms" }}
            >
              با گوگل یا گیت‌هاب در یک قدم وارد شوید، یا لینک ورود را به ایمیل
              خود بگیرید.
            </p>
          </div>

          <PreviewForm
            aria-label="ورود به حساب کاربری"
            className="cubix-enter mt-8 flex flex-col gap-3"
            style={{ animationDelay: "160ms" }}
          >
            <Login03Fields />
          </PreviewForm>

          <p
            className="cubix-enter mt-8 flex flex-wrap items-center justify-center gap-1 text-caption text-muted-foreground"
            style={{ animationDelay: "240ms" }}
          >
            با ادامه،
            <Button
              variant="link"
              size="xs"
              className="h-auto px-0"
              render={<Link href="/terms" />}
              nativeButton={false}
            >
              شرایط استفاده
            </Button>
            و
            <Button
              variant="link"
              size="xs"
              className="h-auto px-0"
              render={<Link href="/privacy" />}
              nativeButton={false}
            >
              حریم خصوصی
            </Button>
            را می‌پذیرید.
          </p>
        </div>
      </div>
    </div>
  )
}

export function Login03() {
  return <Login03View className="h-full min-h-0" />
}

export const login03Files = buildBlockFiles(
  "app/login/page.tsx",
  `import type { ComponentProps } from "react"
import Link from "next/link"

import { Button } from "@/components/cubix/button"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldDescription,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import { Separator } from "@/components/cubix/separator"

${brandGlyphsSource}

export default function LoginPage() {
  return (
    <div lang="fa" dir="rtl" className="flex min-h-svh flex-col bg-background [--primary:var(--foreground)] [--primary-foreground:var(--background)]">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5 sm:px-8">
        <Button variant="ghost" size="sm" render={<Link href="/" />} nativeButton={false} className="font-heading">
          Cubix
        </Button>
        <div className="flex items-center gap-3 text-description text-muted-foreground">
          <span className="hidden sm:inline">حساب کاربری ندارید؟</span>
          <Button variant="outline" size="sm" render={<Link href="/signup" />} nativeButton={false}>ثبت‌نام</Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-88">
          <div className="text-center">
            <h1 className="font-heading text-lead font-semibold">به حساب خود وارد شوید</h1>
            <p className="mt-2 text-description text-muted-foreground">
              با گوگل یا گیت‌هاب در یک قدم وارد شوید، یا لینک ورود را به ایمیل خود بگیرید.
            </p>
          </div>

          <form action="/api/auth/login" method="post" aria-label="ورود به حساب کاربری" className="mt-8 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Button type="submit" name="provider" value="google" variant="outline" formNoValidate>
                <GoogleGlyph data-icon="inline-start" />
                ادامه با گوگل
              </Button>
              <Button type="submit" name="provider" value="github" variant="outline" formNoValidate>
                <GitHubGlyph data-icon="inline-start" />
                ادامه با گیت‌هاب
              </Button>
            </div>

            <div className="my-2 flex items-center gap-3 text-caption text-muted-foreground">
              <Separator className="flex-1" />
              یا
              <Separator className="flex-1" />
            </div>

            <EmailField>
              <EmailFieldLabel>ایمیل</EmailFieldLabel>
              <EmailFieldControl>
                <EmailFieldInput name="email" placeholder="name@example.com" required />
              </EmailFieldControl>
              <EmailFieldDescription>لینک ورود یک‌بار مصرف به این ایمیل ارسال می‌شود.</EmailFieldDescription>
            </EmailField>
            <Button type="submit" variant="foreground" className="mt-1 w-full">ادامه با ایمیل</Button>
          </form>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-1 text-caption text-muted-foreground">
            با ادامه،
            <Button variant="link" size="xs" className="h-auto px-0" render={<Link href="/terms" />} nativeButton={false}>شرایط استفاده</Button>
            و
            <Button variant="link" size="xs" className="h-auto px-0" render={<Link href="/privacy" />} nativeButton={false}>حریم خصوصی</Button>
            را می‌پذیرید.
          </p>
        </div>
      </div>
    </div>
  )
}
`
)
