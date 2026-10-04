import Link from "next/link"

import { Button } from "@/components/cubix/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"
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
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field"
import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { PreviewForm } from "@/components/blocks/templates/preview-form"

function Signup04Fields() {
  return (
    <>
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
    </>
  )
}

function Signup04Footer() {
  return (
    <div className="sticky bottom-0 -mx-(--card-spacing) mt-auto flex flex-col gap-4 border-t border-border bg-card px-(--card-spacing) pt-4 pb-[max(--spacing(4),env(safe-area-inset-bottom))] @min-[640px]:static @min-[640px]:mx-0 @min-[640px]:border-0 @min-[640px]:p-0">
      <Button type="submit" variant="foreground" className="w-full">
        ایجاد حساب
      </Button>
      <p className="flex items-center justify-center gap-1 text-description text-muted-foreground">
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
  )
}

function Signup04View({ className }: { className?: string }) {
  return (
    <div
      lang="fa"
      dir="rtl"
      className={cn(
        "@container relative flex flex-col overflow-clip bg-card [--primary:var(--foreground)] [--primary-foreground:var(--background)]",
        className
      )}
    >
      <div className="flex flex-1 flex-col @min-[640px]:items-center @min-[640px]:justify-center @min-[640px]:bg-muted/40 @min-[640px]:px-10 @min-[640px]:py-12">
        <Card
          className="cubix-enter w-full flex-1 rounded-none pb-0 shadow-none ring-0 @max-[640px]:overflow-visible @min-[640px]:max-w-88 @min-[640px]:flex-none @min-[640px]:rounded-xl @min-[640px]:pb-8 @min-[640px]:shadow-xs"
          style={{ animationDelay: "40ms" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/blocks/404-placeholder.svg"
            alt=""
            className="aspect-video w-full bg-muted object-cover @max-[640px]:rounded-none!"
          />
          <CardHeader className="mt-2">
            <CardTitle className="text-lead font-semibold">
              به کوبیکس بپیوندید
            </CardTitle>
            <CardDescription>
              چند لحظه تا ساخت حساب کاربری فاصله دارید.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col">
            <PreviewForm
              aria-label="ایجاد حساب کاربری"
              className="flex flex-1 flex-col gap-5"
            >
              <Signup04Fields />
              <Signup04Footer />
            </PreviewForm>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function Signup04() {
  return <Signup04View className="min-h-full" />
}

export const signup04Files = buildBlockFiles(
  "app/signup/page.tsx",
  `import Link from "next/link"

import { Button } from "@/components/cubix/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"
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
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field"

export default function SignupPage() {
  return (
    <div lang="fa" dir="rtl" className="flex min-h-svh flex-col bg-card [--primary:var(--foreground)] [--primary-foreground:var(--background)] sm:items-center sm:justify-center sm:bg-muted/40 sm:px-10 sm:py-12">
      <Card className="w-full flex-1 rounded-none pb-0 shadow-none ring-0 max-sm:overflow-visible sm:max-w-88 sm:flex-none sm:rounded-xl sm:pb-8 sm:shadow-xs">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/blocks/404-placeholder.svg" alt="" className="aspect-video w-full bg-muted object-cover max-sm:rounded-none!" />
        <CardHeader className="mt-2">
          <CardTitle className="text-lead font-semibold">به کوبیکس بپیوندید</CardTitle>
          <CardDescription>چند لحظه تا ساخت حساب کاربری فاصله دارید.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <form action="/api/auth/signup" method="post" aria-label="ایجاد حساب کاربری" className="flex flex-1 flex-col gap-5">
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
            <div className="sticky bottom-0 -mx-(--card-spacing) mt-auto flex flex-col gap-4 border-t border-border bg-card px-(--card-spacing) pt-4 pb-[max(--spacing(4),env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:border-0 sm:p-0">
              <Button type="submit" variant="foreground" className="w-full">ایجاد حساب</Button>
              <p className="flex items-center justify-center gap-1 text-description text-muted-foreground">
                حساب کاربری دارید؟
                <Button variant="link" size="sm" className="h-auto px-0 text-description" render={<Link href="/login" />} nativeButton={false}>
                  وارد شوید
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
`,
  { placeholder: true }
)
