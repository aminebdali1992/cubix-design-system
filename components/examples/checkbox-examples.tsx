"use client"

import * as React from "react"

import { Label } from "@/components/cubix/label"
import { Checkbox } from "@/app/docs/components/checkbox/docs-checkbox"

export function CheckboxDemo() {
  return (
    <div dir="rtl" lang="fa" className="flex w-fit max-w-sm items-start gap-2">
      <Checkbox id="demo-ui" defaultChecked className="mt-0.5" />
      <Label htmlFor="demo-ui" className="grid gap-1.5 leading-none">
        <span className="text-label font-normal text-foreground">
          طراحی رابط کاربری
        </span>
        <span className="text-caption font-normal text-muted-foreground">
          چیدمان، رنگ و تعامل‌های بصری محصول را پوشش می‌دهد.
        </span>
      </Label>
    </div>
  )
}

export function CheckboxStatesDemo() {
  return (
    <div dir="rtl" lang="fa" className="grid w-fit max-w-sm gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="state-checked" defaultChecked />
        <Label htmlFor="state-checked">تایید شده</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="state-indeterminate" indeterminate />
        <Label htmlFor="state-indeterminate">انتخاب ناقص</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="state-disabled" disabled />
        <Label htmlFor="state-disabled">غیرفعال</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="state-disabled-checked" disabled defaultChecked />
        <Label htmlFor="state-disabled-checked">غیرفعال و انتخاب‌شده</Label>
      </div>
    </div>
  )
}

export function CheckboxInvalidDemo() {
  return (
    <div dir="rtl" lang="fa" className="grid w-fit max-w-sm gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id="invalid-terms" aria-invalid />
        <Label htmlFor="invalid-terms">پذیرش قوانین و شرایط</Label>
      </div>
      <p className="ps-[26px] text-caption text-destructive">
        برای ادامه باید قوانین را بپذیرید.
      </p>
    </div>
  )
}

export function CheckboxDescriptionDemo() {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="flex w-fit max-w-sm items-start gap-3 rounded-lg border p-4"
    >
      <Checkbox id="desc-terms" defaultChecked className="mt-0.5" />
      <Label htmlFor="desc-terms" className="grid gap-1.5 leading-none">
        <span className="text-label font-normal text-foreground">
          پذیرش قوانین و شرایط
        </span>
        <span className="text-caption font-normal text-muted-foreground">
          با ادامه، شرایط استفاده و سیاست حریم خصوصی را می‌پذیرید.
        </span>
      </Label>
    </div>
  )
}

export function CheckboxDisabledDemo() {
  return (
    <div dir="rtl" lang="fa" className="grid w-fit max-w-sm gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-off" disabled />
        <Label htmlFor="disabled-off">اعلان‌های ایمیلی</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on">اعلان‌های فشاری</Label>
      </div>
    </div>
  )
}

export function CheckboxPendingDemo() {
  const [checked, setChecked] = React.useState(false)
  const [pending, setPending] = React.useState(false)

  function handleCheckedChange(next: boolean) {
    setChecked(next)
    setPending(true)
    window.setTimeout(() => {
      setPending(false)
    }, 1500)
  }

  return (
    <div dir="rtl" lang="fa" className="grid w-fit max-w-sm gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          id="pending-save"
          checked={checked}
          pending={pending}
          onCheckedChange={handleCheckedChange}
        />
        <Label htmlFor="pending-save">ذخیره تنظیمات اعلان</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="pending-static" pending defaultChecked />
        <Label htmlFor="pending-static">در حال ذخیره</Label>
      </div>
    </div>
  )
}
