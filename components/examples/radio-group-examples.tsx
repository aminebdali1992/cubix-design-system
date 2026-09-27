"use client"

import { Label } from "@/components/cubix/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/docs/components/radio-group/docs-radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup
      dir="rtl"
      defaultValue="comfortable"
      aria-label="تراکم نمایش"
      className="w-fit"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem id="demo-default" value="default" />
        <Label htmlFor="demo-default">پیش‌فرض</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="demo-comfortable" value="comfortable" />
        <Label htmlFor="demo-comfortable">راحت</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="demo-compact" value="compact" />
        <Label htmlFor="demo-compact">فشرده</Label>
      </div>
    </RadioGroup>
  )
}

export function RadioGroupDescriptionDemo() {
  return (
    <RadioGroup
      dir="rtl"
      defaultValue="pro"
      aria-label="انتخاب طرح"
      className="w-fit max-w-sm"
    >
      <div className="flex items-start gap-2 rounded-lg border p-4">
        <RadioGroupItem id="plan-free" value="free" className="mt-0.5" />
        <Label htmlFor="plan-free" className="grid gap-1.5 leading-none">
          <span className="text-label font-normal text-foreground">رایگان</span>
          <span className="text-caption font-normal text-muted-foreground">
            برای پروژه‌های شخصی و آزمایشی.
          </span>
        </Label>
      </div>
      <div className="flex items-start gap-2 rounded-lg border p-4">
        <RadioGroupItem id="plan-pro" value="pro" className="mt-0.5" />
        <Label htmlFor="plan-pro" className="grid gap-1.5 leading-none">
          <span className="text-label font-normal text-foreground">حرفه‌ای</span>
          <span className="text-caption font-normal text-muted-foreground">
            برای تیم‌هایی که به امکانات و پشتیبانی بیشتر نیاز دارند.
          </span>
        </Label>
      </div>
    </RadioGroup>
  )
}

export function RadioGroupDisabledDemo() {
  return (
    <div dir="rtl" lang="fa" className="grid w-fit gap-6">
      <RadioGroup
        defaultValue="one"
        disabled
        aria-label="گزینه‌های قفل‌شده"
        className="w-fit"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem id="locked-one" value="one" />
          <Label htmlFor="locked-one">همه گزینه‌ها قفل‌اند</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="locked-two" value="two" />
          <Label htmlFor="locked-two">قابل تغییر نیست</Label>
        </div>
      </RadioGroup>
      <RadioGroup
        defaultValue="email"
        aria-label="کانال اعلان"
        className="w-fit"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem id="channel-email" value="email" />
          <Label htmlFor="channel-email">ایمیل</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="channel-sms" value="sms" disabled />
          <Label htmlFor="channel-sms">پیامک (در دسترس نیست)</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="channel-push" value="push" />
          <Label htmlFor="channel-push">اعلان فشاری</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

export function RadioGroupInvalidDemo() {
  return (
    <div dir="rtl" lang="fa" className="grid w-fit gap-2">
      <RadioGroup aria-label="پذیرش قوانین" aria-invalid className="w-fit">
        <div className="flex items-center gap-2">
          <RadioGroupItem id="invalid-accept" value="accept" aria-invalid />
          <Label htmlFor="invalid-accept">پذیرش قوانین و شرایط</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="invalid-decline" value="decline" aria-invalid />
          <Label htmlFor="invalid-decline">عدم پذیرش</Label>
        </div>
      </RadioGroup>
      <p className="ps-[26px] text-caption text-destructive">
        برای ادامه باید یک گزینه را انتخاب کنید.
      </p>
    </div>
  )
}

export function RadioGroupHorizontalDemo() {
  return (
    <RadioGroup
      dir="rtl"
      defaultValue="center"
      aria-label="تراز افقی"
      className="flex w-fit flex-row gap-4"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem id="align-right" value="right" />
        <Label htmlFor="align-right">راست</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="align-center" value="center" />
        <Label htmlFor="align-center">وسط</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="align-left" value="left" />
        <Label htmlFor="align-left">چپ</Label>
      </div>
    </RadioGroup>
  )
}
