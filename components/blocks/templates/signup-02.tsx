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
  PasswordFieldDescription,
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
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field"
import { cn } from "@/lib/utils"
import { buildBlockFiles } from "@/components/blocks/templates/block-source-deps"
import { PreviewForm } from "@/components/blocks/templates/preview-form"

function Signup02NameField() {
  return (
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
  )
}

function PhoneSignUpFields() {
  return (
    <>
      <Signup02NameField />
      <PhoneField>
        <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
        <PhoneFieldControl>
          <PhoneFieldInput name="phone" placeholder="۰۹۱۲۰۰۰۰۰۰۰" required />
        </PhoneFieldControl>
        <PhoneFieldDescription>
          برای تأیید شماره، یک کد یک‌بار مصرف پیامک می‌شود.
        </PhoneFieldDescription>
      </PhoneField>
      <Button type="submit" variant="foreground" className="w-full">
        دریافت کد تأیید
      </Button>
    </>
  )
}

function EmailSignUpFields() {
  return (
    <>
      <Signup02NameField />
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
      <Button type="submit" variant="foreground" className="w-full">
        ایجاد حساب
      </Button>
    </>
  )
}

function Signup02View({ className }: { className?: string }) {
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
            <CardTitle className="text-lead font-semibold">
              ایجاد حساب کاربری
            </CardTitle>
            <CardDescription>روش ثبت‌نام را انتخاب کنید.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="phone" className="gap-6">
              <TabsList
                aria-label="روش ثبت‌نام"
                className="-mx-(--card-spacing) w-auto border-b border-dashed border-border px-0"
              >
                <TabsTrigger value="phone">شماره همراه</TabsTrigger>
                <TabsTrigger value="email">ایمیل</TabsTrigger>
              </TabsList>
              <TabsContent value="phone">
                <PreviewForm
                  aria-label="ثبت‌نام با شماره همراه"
                  className="flex flex-col gap-5"
                >
                  <PhoneSignUpFields />
                </PreviewForm>
              </TabsContent>
              <TabsContent value="email">
                <PreviewForm
                  aria-label="ثبت‌نام با ایمیل"
                  className="flex flex-col gap-5"
                >
                  <EmailSignUpFields />
                </PreviewForm>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p
          className="cubix-enter mt-6 flex items-center justify-center gap-1 text-description text-muted-foreground"
          style={{ animationDelay: "160ms" }}
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
  )
}

export function Signup02() {
  return <Signup02View className="h-full min-h-0" />
}

export const signup02Files = buildBlockFiles(
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
import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldDescription,
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
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field"

function NameField() {
  return (
    <TextField>
      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput name="name" autoComplete="name" placeholder="نام خود را وارد کنید" required />
      </TextFieldControl>
    </TextField>
  )
}

export default function SignupPage() {
  return (
    <div lang="fa" dir="rtl" className="flex min-h-svh flex-col items-center justify-center bg-muted/40 px-6 py-12 [--primary:var(--foreground)] [--primary-foreground:var(--background)]">
      <Card className="w-full max-w-88 py-8 shadow-xs ring-0">
        <CardHeader className="justify-items-center text-center">
          <CardTitle className="text-lead font-semibold">ایجاد حساب کاربری</CardTitle>
          <CardDescription>روش ثبت‌نام را انتخاب کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone" className="gap-6">
            <TabsList aria-label="روش ثبت‌نام" className="-mx-(--card-spacing) w-auto border-b border-dashed border-border px-0">
              <TabsTrigger value="phone">شماره همراه</TabsTrigger>
              <TabsTrigger value="email">ایمیل</TabsTrigger>
            </TabsList>

            <TabsContent value="phone">
              <form action="/api/auth/otp" method="post" aria-label="ثبت‌نام با شماره همراه" className="flex flex-col gap-5">
                <NameField />
                <PhoneField>
                  <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
                  <PhoneFieldControl>
                    <PhoneFieldInput name="phone" placeholder="۰۹۱۲۰۰۰۰۰۰۰" required />
                  </PhoneFieldControl>
                  <PhoneFieldDescription>برای تأیید شماره، یک کد یک‌بار مصرف پیامک می‌شود.</PhoneFieldDescription>
                </PhoneField>
                <Button type="submit" variant="foreground" className="w-full">دریافت کد تأیید</Button>
              </form>
            </TabsContent>

            <TabsContent value="email">
              <form action="/api/auth/signup" method="post" aria-label="ثبت‌نام با ایمیل" className="flex flex-col gap-5">
                <NameField />
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
                <Button type="submit" variant="foreground" className="w-full">ایجاد حساب</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <p className="mt-6 flex items-center justify-center gap-1 text-description text-muted-foreground">
        حساب کاربری دارید؟
        <Button variant="link" size="sm" className="h-auto px-0 text-description" render={<Link href="/login" />} nativeButton={false}>
          وارد شوید
        </Button>
      </p>
    </div>
  )
}
`
)
