"use client"

import * as React from "react"

import { Button } from "@/components/cubix/button"
import { Checkbox } from "@/components/cubix/checkbox"
import { DirectionProvider } from "@/components/cubix/direction"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/cubix/field"
import { TextFieldInput } from "@/components/cubix/text-field"

type TextDirection = "ltr" | "rtl"

const copy = {
  ltr: {
    title: "Create an account",
    description: "Enter your details to get started.",
    name: "Full name",
    namePlaceholder: "Amin Ebdali",
    email: "Email",
    emailHint: "We'll send the order receipt to this address.",
    terms: "I agree to the terms and conditions",
    submit: "Sign up",
  },
  rtl: {
    title: "ساخت حساب کاربری",
    description: "برای شروع، اطلاعات خود را وارد کنید.",
    name: "نام و نام خانوادگی",
    namePlaceholder: "امین ابدالی",
    email: "ایمیل",
    emailHint: "رسید سفارش به این آدرس فرستاده می‌شود.",
    terms: "قوانین و مقررات را می‌پذیرم",
    submit: "ثبت‌نام",
  },
} as const

export function DirectionFormDemo() {
  const [direction, setDirection] = React.useState<TextDirection>("rtl")
  const t = copy[direction]

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div dir="ltr" className="flex justify-center gap-2">
        <Button
          size="sm"
          variant={direction === "ltr" ? "default" : "outline"}
          onClick={() => setDirection("ltr")}
        >
          LTR
        </Button>
        <Button
          size="sm"
          variant={direction === "rtl" ? "default" : "outline"}
          onClick={() => setDirection("rtl")}
        >
          RTL
        </Button>
      </div>
      <div dir={direction} lang={direction === "rtl" ? "fa" : "en"}>
        <DirectionProvider direction={direction}>
          <form
            className="rounded-lg border p-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="mb-5 flex flex-col gap-1">
              <h3 className="text-title font-normal text-foreground">{t.title}</h3>
              <p className="text-description text-muted-foreground">{t.description}</p>
            </div>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="direction-name">{t.name}</FieldLabel>
                <TextFieldInput id="direction-name" placeholder={t.namePlaceholder} />
              </Field>
              <Field>
                <FieldLabel htmlFor="direction-email">{t.email}</FieldLabel>
                <TextFieldInput
                  id="direction-email"
                  type="email"
                  dir="ltr"
                  placeholder="name@example.com"
                />
                <FieldDescription>{t.emailHint}</FieldDescription>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="direction-terms" />
                <FieldLabel htmlFor="direction-terms">{t.terms}</FieldLabel>
              </Field>
              <Button type="submit" className="w-full">
                {t.submit}
              </Button>
            </FieldGroup>
          </form>
        </DirectionProvider>
      </div>
    </div>
  )
}