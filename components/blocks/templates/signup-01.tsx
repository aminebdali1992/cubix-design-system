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
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field"
import { Separator } from "@/components/cubix/separator"
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field"
import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { brandGlyphsSource } from "@/components/blocks/templates/brand-glyphs-source"
import { GitHubGlyph, GoogleGlyph } from "@/components/blocks/templates/brand-glyphs"
import { PreviewForm } from "@/components/blocks/templates/preview-form"

function Signup01Fields() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="submit"
          name="provider"
          value="google"
          variant="outline"
          formNoValidate
          aria-label="ثبت‌نام با گوگل"
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
          aria-label="ثبت‌نام با گیت‌هاب"
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

      <TextField>
        <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput
            name="name"
            autoComplete="name"
            placeholder="نام خود را وارد کنید"
            required
          />
        </TextFieldControl>
      </TextField>

      <EmailField>
        <EmailFieldLabel>ایمیل</EmailFieldLabel>
        <EmailFieldControl>
          <EmailFieldInput name="email" placeholder="name@example.com" required />
        </EmailFieldControl>
      </EmailField>

      <PasswordField>
        <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
        <PasswordFieldControl>
          <PasswordFieldInput
            name="password"
            autoComplete="new-password"
            placeholder="یک رمز عبور انتخاب کنید"
            minLength={8}
            required
          />
          <PasswordFieldToggle />
        </PasswordFieldControl>
        <PasswordFieldDescription>حداقل ۸ کاراکتر.</PasswordFieldDescription>
      </PasswordField>

      <Label className="w-fit">
        <Checkbox name="terms" required />
        <span className="flex flex-wrap items-center gap-1">
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
          را می‌پذیرم
        </span>
      </Label>

      <Button type="submit" variant="foreground" className="w-full">
        ایجاد حساب
      </Button>
    </>
  )
}

function Signup01View({ className }: { className?: string }) {
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
              ایجاد حساب کاربری
            </h1>
            <p
              className="cubix-enter mt-2 text-description text-muted-foreground"
              style={{ animationDelay: "100ms" }}
            >
              برای شروع، اطلاعات خود را وارد کنید.
            </p>

            <PreviewForm
              aria-label="ایجاد حساب کاربری"
              className="cubix-enter mt-8 flex flex-col gap-5"
              style={{ animationDelay: "160ms" }}
            >
              <Signup01Fields />
            </PreviewForm>

            <p
              className="cubix-enter mt-8 flex items-center justify-center gap-1 text-description text-muted-foreground"
              style={{ animationDelay: "240ms" }}
            >
              حساب کاربری دارید؟
              <Button
                variant="link"
                size="sm"
                className="h-auto px-0 text-description"
                render={<Link href="/login" />}
                nativeButton={false}
              >
                وارد شوید
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

export function Signup01() {
  return <Signup01View className="h-full min-h-0" />
}

export const signup01Files = buildBlockFiles(
  "app/signup/page.tsx",
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
  PasswordFieldDescription,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field"
import { Separator } from "@/components/cubix/separator"
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field"

${brandGlyphsSource}

export default function SignupPage() {
  return (
    <div lang="fa" dir="rtl" className="grid min-h-svh bg-background [--primary:var(--foreground)] [--primary-foreground:var(--background)] min-[800px]:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-88">
          <h1 className="font-heading text-lead font-semibold">ایجاد حساب کاربری</h1>
          <p className="mt-2 text-description text-muted-foreground">
            برای شروع، اطلاعات خود را وارد کنید.
          </p>

          <form action="/api/auth/signup" method="post" aria-label="ایجاد حساب کاربری" className="mt-8 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <Button type="submit" name="provider" value="google" variant="outline" formNoValidate aria-label="ثبت‌نام با گوگل">
                <GoogleGlyph data-icon="inline-start" />
                گوگل
              </Button>
              <Button type="submit" name="provider" value="github" variant="outline" formNoValidate aria-label="ثبت‌نام با گیت‌هاب">
                <GitHubGlyph data-icon="inline-start" />
                گیت‌هاب
              </Button>
            </div>

            <div className="flex items-center gap-3 text-caption text-muted-foreground">
              <Separator className="flex-1" />
              یا با ایمیل
              <Separator className="flex-1" />
            </div>

            <TextField>
              <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
              <TextFieldControl>
                <TextFieldInput name="name" autoComplete="name" placeholder="نام خود را وارد کنید" required />
              </TextFieldControl>
            </TextField>

            <EmailField>
              <EmailFieldLabel>ایمیل</EmailFieldLabel>
              <EmailFieldControl>
                <EmailFieldInput name="email" placeholder="name@example.com" required />
              </EmailFieldControl>
            </EmailField>

            <PasswordField>
              <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
              <PasswordFieldControl>
                <PasswordFieldInput name="password" autoComplete="new-password" placeholder="یک رمز عبور انتخاب کنید" minLength={8} required />
                <PasswordFieldToggle />
              </PasswordFieldControl>
              <PasswordFieldDescription>حداقل ۸ کاراکتر.</PasswordFieldDescription>
            </PasswordField>

            <Label className="w-fit">
              <Checkbox name="terms" required />
              <span className="flex flex-wrap items-center gap-1">
                <Button variant="link" size="xs" className="h-auto px-0" render={<Link href="/terms" />} nativeButton={false}>شرایط استفاده</Button>
                و
                <Button variant="link" size="xs" className="h-auto px-0" render={<Link href="/privacy" />} nativeButton={false}>حریم خصوصی</Button>
                را می‌پذیرم
              </span>
            </Label>

            <Button type="submit" variant="foreground" className="w-full">ایجاد حساب</Button>
          </form>

          <p className="mt-8 flex items-center justify-center gap-1 text-description text-muted-foreground">
            حساب کاربری دارید؟
            <Button variant="link" size="sm" className="h-auto px-0 text-description" render={<Link href="/login" />} nativeButton={false}>
              وارد شوید
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
