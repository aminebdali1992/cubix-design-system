import Link from "next/link"

import { Button } from "@/components/cubix/button"
import { Checkbox } from "@/components/cubix/checkbox"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import { Label } from "@/components/cubix/label"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field"
import { Separator } from "@/components/cubix/separator"
import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { brandGlyphsSource } from "@/components/blocks/templates/brand-glyphs-source"
import { GitHubGlyph, GoogleGlyph } from "@/components/blocks/templates/brand-glyphs"
import { PreviewForm } from "@/components/blocks/templates/preview-form"

function Login01Fields() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="submit"
          name="provider"
          value="google"
          variant="outline"
          formNoValidate
          aria-label="ورود با گوگل"
        >
          <GoogleGlyph data-icon="inline-start" />
          گوگل
        </Button>
        <Button
          type="submit"
          name="provider"
          value="github"
          variant="outline"
          formNoValidate
          aria-label="ورود با گیت‌هاب"
        >
          <GitHubGlyph data-icon="inline-start" />
          گیت‌هاب
        </Button>
      </div>

      <div className="flex items-center gap-3 text-caption text-muted-foreground">
        <Separator className="flex-1" />
        یا با ایمیل
        <Separator className="flex-1" />
      </div>

      <EmailField>
        <EmailFieldLabel>ایمیل</EmailFieldLabel>
        <EmailFieldControl>
          <EmailFieldInput name="email" placeholder="name@example.com" required />
        </EmailFieldControl>
      </EmailField>

      <PasswordField>
        <div className="flex items-center justify-between gap-3">
          <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
          <Button
            variant="link"
            size="sm"
            className="h-auto px-0"
            render={<Link href="/forgot-password" />}
            nativeButton={false}
          >
            فراموشی رمز عبور؟
          </Button>
        </div>
        <PasswordFieldControl>
          <PasswordFieldInput
            name="password"
            placeholder="رمز عبور خود را وارد کنید"
            required
          />
          <PasswordFieldToggle />
        </PasswordFieldControl>
      </PasswordField>

      <Label className="w-fit">
        <Checkbox name="remember" />
        مرا به خاطر بسپار
      </Label>

      <Button type="submit" variant="foreground" className="w-full">
        ورود
      </Button>
    </>
  )
}

function Login01View({ className }: { className?: string }) {
  return (
    <div
      lang="fa"
      dir="rtl"
      className={cn(
        "@container relative flex overflow-hidden bg-background [--primary:var(--foreground)] [--primary-foreground:var(--background)]",
        className
      )}
    >
      <div className="grid min-h-0 flex-1 @min-[800px]:grid-cols-2">
        <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-88">
            <h1
              className="cubix-enter font-heading text-lead font-semibold"
              style={{ animationDelay: "40ms" }}
            >
              ورود به حساب کاربری
            </h1>
            <p
              className="cubix-enter mt-2 text-description text-muted-foreground"
              style={{ animationDelay: "100ms" }}
            >
              برای ادامه، ایمیل و رمز عبور خود را وارد کنید.
            </p>

            <PreviewForm
              aria-label="ورود به حساب کاربری"
              className="cubix-enter mt-8 flex flex-col gap-5"
              style={{ animationDelay: "160ms" }}
            >
              <Login01Fields />
            </PreviewForm>

            <p
              className="cubix-enter mt-8 flex items-center justify-center gap-1 text-description text-muted-foreground"
              style={{ animationDelay: "240ms" }}
            >
              حساب کاربری ندارید؟
              <Button
                variant="link"
                size="sm"
                className="h-auto px-0 text-description"
                render={<Link href="/signup" />}
                nativeButton={false}
              >
                ثبت‌نام کنید
              </Button>
            </p>
          </div>
        </div>

        <div className="relative hidden p-3 @min-[800px]:block">
          <div
            className="cubix-enter-soft relative size-full overflow-hidden rounded-2xl bg-muted"
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

export function Login01() {
  return <Login01View className="h-full min-h-0" />
}

export const login01Files = buildBlockFiles(
  "app/login/page.tsx",
  `import type { ComponentProps } from "react"
import Link from "next/link"

import { Button } from "@/components/cubix/button"
import { Checkbox } from "@/components/cubix/checkbox"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import { Label } from "@/components/cubix/label"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field"
import { Separator } from "@/components/cubix/separator"

${brandGlyphsSource}

export default function LoginPage() {
  return (
    <div lang="fa" dir="rtl" className="grid min-h-svh bg-background [--primary:var(--foreground)] [--primary-foreground:var(--background)] min-[800px]:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-88">
          <h1 className="font-heading text-lead font-semibold">ورود به حساب کاربری</h1>
          <p className="mt-2 text-description text-muted-foreground">
            برای ادامه، ایمیل و رمز عبور خود را وارد کنید.
          </p>

          <form action="/api/auth/login" method="post" aria-label="ورود به حساب کاربری" className="mt-8 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <Button type="submit" name="provider" value="google" variant="outline" formNoValidate aria-label="ورود با گوگل">
                <GoogleGlyph data-icon="inline-start" />
                گوگل
              </Button>
              <Button type="submit" name="provider" value="github" variant="outline" formNoValidate aria-label="ورود با گیت‌هاب">
                <GitHubGlyph data-icon="inline-start" />
                گیت‌هاب
              </Button>
            </div>

            <div className="flex items-center gap-3 text-caption text-muted-foreground">
              <Separator className="flex-1" />
              یا با ایمیل
              <Separator className="flex-1" />
            </div>

            <EmailField>
              <EmailFieldLabel>ایمیل</EmailFieldLabel>
              <EmailFieldControl>
                <EmailFieldInput name="email" placeholder="name@example.com" required />
              </EmailFieldControl>
            </EmailField>

            <PasswordField>
              <div className="flex items-center justify-between gap-3">
                <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
                <Button variant="link" size="sm" className="h-auto px-0" render={<Link href="/forgot-password" />} nativeButton={false}>
                  فراموشی رمز عبور؟
                </Button>
              </div>
              <PasswordFieldControl>
                <PasswordFieldInput name="password" placeholder="رمز عبور خود را وارد کنید" required />
                <PasswordFieldToggle />
              </PasswordFieldControl>
            </PasswordField>

            <Label className="w-fit">
              <Checkbox name="remember" />
              مرا به خاطر بسپار
            </Label>

            <Button type="submit" variant="foreground" className="w-full">ورود</Button>
          </form>

          <p className="mt-8 flex items-center justify-center gap-1 text-description text-muted-foreground">
            حساب کاربری ندارید؟
            <Button variant="link" size="sm" className="h-auto px-0 text-description" render={<Link href="/signup" />} nativeButton={false}>
              ثبت‌نام کنید
            </Button>
          </p>
        </div>
      </div>

      <div className="relative hidden p-3 min-[800px]:block">
        <div className="relative size-full overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/blocks/404-placeholder.svg" alt="" className="absolute inset-0 size-full object-cover" />
        </div>
      </div>
    </div>
  )
}
`,
  { placeholder: true }
)
