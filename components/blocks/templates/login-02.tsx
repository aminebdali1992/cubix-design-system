import Link from "next/link"

import { Button } from "@/components/cubix/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field"
import {
  PhoneField,
  PhoneFieldControl,
  PhoneFieldDescription,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "@/components/cubix/phone-field"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cubix/tabs"
import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { PreviewForm } from "@/components/blocks/templates/preview-form"

function PhoneSignInFields() {
  return (
    <>
      <PhoneField>
        <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
        <PhoneFieldControl>
          <PhoneFieldInput name="phone" placeholder="۰۹۱۲۰۰۰۰۰۰۰" required />
        </PhoneFieldControl>
        <PhoneFieldDescription>
          کد تأیید یک‌بار مصرف به این شماره پیامک می‌شود.
        </PhoneFieldDescription>
      </PhoneField>
      <Button type="submit" variant="foreground" className="w-full">
        دریافت کد تأیید
      </Button>
    </>
  )
}

function EmailSignInFields() {
  return (
    <>
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
      <Button type="submit" variant="foreground" className="w-full">
        ورود
      </Button>
    </>
  )
}

function Login02View({ className }: { className?: string }) {
  return (
    <div
      lang="fa"
      dir="rtl"
      className={cn(
        "relative flex flex-col overflow-hidden bg-muted/40 [--primary:var(--foreground)] [--primary-foreground:var(--background)]",
        className
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10">
        <Card
          className="cubix-enter w-full max-w-88 py-8 shadow-xs ring-0"
          style={{ animationDelay: "40ms" }}
        >
          <CardHeader className="justify-items-center text-center">
            <CardTitle className="text-lead font-semibold">خوش آمدید</CardTitle>
            <CardDescription>روش ورود به حساب خود را انتخاب کنید.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="phone" className="gap-6">
              <TabsList
                aria-label="روش ورود"
                className="-mx-(--card-spacing) w-auto border-b border-dashed border-border px-0"
              >
                <TabsTrigger value="phone">شماره همراه</TabsTrigger>
                <TabsTrigger value="email">ایمیل</TabsTrigger>
              </TabsList>
              <TabsContent value="phone">
                <PreviewForm
                  aria-label="ورود با شماره همراه"
                  className="flex flex-col gap-5"
                >
                  <PhoneSignInFields />
                </PreviewForm>
              </TabsContent>
              <TabsContent value="email">
                <PreviewForm
                  aria-label="ورود با ایمیل"
                  className="flex flex-col gap-5"
                >
                  <EmailSignInFields />
                </PreviewForm>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p
          className="cubix-enter mt-6 flex items-center justify-center gap-1 text-description text-muted-foreground"
          style={{ animationDelay: "160ms" }}
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
  )
}

export function Login02() {
  return <Login02View className="h-full min-h-0" />
}

export const login02Files = buildBlockFiles(
  "app/login/page.tsx",
  `import Link from "next/link"

import { Button } from "@/components/cubix/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field"
import {
  PhoneField,
  PhoneFieldControl,
  PhoneFieldDescription,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "@/components/cubix/phone-field"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cubix/tabs"

export default function LoginPage() {
  return (
    <div lang="fa" dir="rtl" className="flex min-h-svh flex-col items-center justify-center bg-muted/40 px-6 py-12 [--primary:var(--foreground)] [--primary-foreground:var(--background)]">
      <Card className="w-full max-w-88 py-8 shadow-xs ring-0">
        <CardHeader className="justify-items-center text-center">
          <CardTitle className="text-lead font-semibold">خوش آمدید</CardTitle>
          <CardDescription>روش ورود به حساب خود را انتخاب کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone" className="gap-6">
            <TabsList aria-label="روش ورود" className="-mx-(--card-spacing) w-auto border-b border-dashed border-border px-0">
              <TabsTrigger value="phone">شماره همراه</TabsTrigger>
              <TabsTrigger value="email">ایمیل</TabsTrigger>
            </TabsList>

            <TabsContent value="phone">
              <form action="/api/auth/otp" method="post" aria-label="ورود با شماره همراه" className="flex flex-col gap-5">
                <PhoneField>
                  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
                  <PhoneFieldControl>
                    <PhoneFieldInput name="phone" placeholder="۰۹۱۲۰۰۰۰۰۰۰" required />
                  </PhoneFieldControl>
                  <PhoneFieldDescription>کد تأیید یک‌بار مصرف به این شماره پیامک می‌شود.</PhoneFieldDescription>
                </PhoneField>
                <Button type="submit" variant="foreground" className="w-full">دریافت کد تأیید</Button>
              </form>
            </TabsContent>

            <TabsContent value="email">
              <form action="/api/auth/login" method="post" aria-label="ورود با ایمیل" className="flex flex-col gap-5">
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
                <Button type="submit" variant="foreground" className="w-full">ورود</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <p className="mt-6 flex items-center justify-center gap-1 text-description text-muted-foreground">
        حساب کاربری ندارید؟
        <Button variant="link" size="sm" className="h-auto px-0 text-description" render={<Link href="/signup" />} nativeButton={false}>
          ثبت‌نام کنید
        </Button>
      </p>
    </div>
  )
}
`
)
