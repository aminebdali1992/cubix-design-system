"use client"

import * as React from "react"

import { Label } from "@/components/cubix/label"
import { Switch } from "@/app/docs/components/switch/docs-switch"

export function SwitchDemo() {
  return (
    <div dir="rtl" lang="fa" className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">حالت هواپیما</Label>
    </div>
  )
}

export function SwitchStatesDemo() {
  return (
    <div dir="rtl" lang="fa" className="grid w-fit gap-3">
      <div className="flex items-center gap-2">
        <Switch id="state-on" defaultChecked />
        <Label htmlFor="state-on">روشن</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="state-off" />
        <Label htmlFor="state-off">خاموش</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="state-disabled" disabled />
        <Label htmlFor="state-disabled">غیرفعال</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="state-disabled-on" disabled defaultChecked />
        <Label htmlFor="state-disabled-on">غیرفعال و روشن</Label>
      </div>
    </div>
  )
}

export function SwitchSizesDemo() {
  return (
    <div dir="rtl" lang="fa" className="grid w-fit gap-3">
      <div className="flex items-center gap-2">
        <Switch size="sm" id="size-sm" defaultChecked />
        <Label htmlFor="size-sm">کوچک</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="size-default" defaultChecked />
        <Label htmlFor="size-default">پیش‌فرض</Label>
      </div>
    </div>
  )
}

export function SwitchDescriptionDemo() {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="flex w-full max-w-sm items-start justify-between gap-4 rounded-lg border p-4"
    >
      <Label htmlFor="desc-analytics" className="grid gap-1.5 leading-none">
        <span className="text-label font-normal text-foreground">
          اشتراک‌گذاری آمار
        </span>
        <span className="text-caption font-normal text-muted-foreground">
          با ارسال داده‌های ناشناس استفاده، به بهبود Cubix کمک کنید.
        </span>
      </Label>
      <Switch id="desc-analytics" defaultChecked className="mt-0.5" />
    </div>
  )
}

export function SwitchInvalidDemo() {
  return (
    <div dir="rtl" lang="fa" className="grid w-fit gap-2">
      <div className="flex items-center gap-2">
        <Switch id="invalid-terms" aria-invalid />
        <Label htmlFor="invalid-terms">پذیرش قوانین و شرایط</Label>
      </div>
      <p className="ps-11 text-caption text-destructive">
        برای ادامه باید این گزینه را روشن کنید.
      </p>
    </div>
  )
}

export function SwitchCustomDemo() {
  return (
    <div dir="rtl" lang="fa" className="flex items-center gap-2">
      <Switch
        id="custom-switch"
        defaultChecked
        className="data-checked:bg-emerald-600 data-[state=checked]:bg-emerald-600 data-unchecked:bg-muted-foreground/30 data-[state=unchecked]:bg-muted-foreground/30 dark:data-unchecked:bg-muted-foreground/30 dark:data-[state=unchecked]:bg-muted-foreground/30"
      />
      <Label htmlFor="custom-switch">اعلان‌های ایمیلی</Label>
    </div>
  )
}

export function SwitchControlledDemo() {
  const [checked, setChecked] = React.useState(false)

  return (
    <div dir="rtl" lang="fa" className="grid w-fit gap-3">
      <div className="flex items-center gap-2">
        <Switch
          id="controlled-notify"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="controlled-notify">اعلان‌ها</Label>
      </div>
      <p className="text-caption text-muted-foreground">
        وضعیت: {checked ? "روشن" : "خاموش"}
      </p>
    </div>
  )
}