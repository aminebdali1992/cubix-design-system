"use client"

import * as React from "react"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/app/docs/components/tabs/docs-tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="mx-auto">
      <TabsList aria-label="تنظیمات">
        <TabsTrigger value="account" onRemove={() => {}}>
          <ButtonDemoIcon data-icon="inline-start" />
          حساب کاربری
        </TabsTrigger>
        <TabsTrigger value="password" onRemove={() => {}}>
          <ButtonDemoIcon data-icon="inline-start" />
          گذرواژه
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export function TabsIconsDemo() {
  return (
    <Tabs defaultValue="profile" className="mx-auto">
      <TabsList aria-label="تنظیمات کاربر">
        <TabsTrigger value="profile">
          <ButtonDemoIcon data-icon="inline-start" />
          نمایه
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <ButtonDemoIcon data-icon="inline-start" />
          اعلان‌ها
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export function TabsVerticalDemo() {
  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="mx-auto"
    >
      <TabsList aria-label="بخش‌های تنظیمات">
        <TabsTrigger value="general">عمومی</TabsTrigger>
        <TabsTrigger value="security">امنیت</TabsTrigger>
        <TabsTrigger value="billing">صورتحساب</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export function TabsDisabledDemo() {
  return (
    <Tabs defaultValue="active" className="mx-auto">
      <TabsList aria-label="وضعیت">
        <TabsTrigger value="active">فعال</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          غیرفعال
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export function TabsControlledDemo() {
  const [value, setValue] = React.useState("one")
  return (
    <div className="mx-auto grid gap-3">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList aria-label="مراحل">
          <TabsTrigger value="one">مرحله‌ی ۱</TabsTrigger>
          <TabsTrigger value="two">مرحله‌ی ۲</TabsTrigger>
        </TabsList>
      </Tabs>
      <p className="text-center text-caption text-muted-foreground">
        تب فعلی: {value === "one" ? "مرحله‌ی ۱" : "مرحله‌ی ۲"}
      </p>
    </div>
  )
}

const customTriggerClass =
  "h-auto w-fit flex-none justify-start rounded-none border-0 border-b border-transparent bg-transparent px-3 pb-3 text-muted-foreground shadow-none after:hidden hover:text-foreground data-active:border-foreground! data-active:text-foreground! data-[state=active]:border-foreground! data-[state=active]:text-foreground! data-selected:border-foreground! data-selected:text-foreground!"

export function TabsCustomDemo() {
  return (
    <Tabs defaultValue="a" className="mx-auto">
      <TabsList
        aria-label="سفارشی"
        className="h-auto w-full justify-start gap-0 rounded-none bg-transparent bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border),var(--foreground)_10%)_50%,transparent_50%)] bg-[length:6px_1px] bg-repeat-x bg-bottom p-0"
      >
        <TabsTrigger value="a" className={customTriggerClass}>
          نمای کلی
        </TabsTrigger>
        <TabsTrigger value="b" className={customTriggerClass}>
          گزارش‌ها
        </TabsTrigger>
        <TabsTrigger value="c" className={customTriggerClass}>
          تحلیل‌ها
        </TabsTrigger>
        <TabsTrigger value="d" className={customTriggerClass}>
          تنظیمات
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export function TabsRemovableDemo() {
  const [items, setItems] = React.useState(["ورودی", "ارسالی", "پیش‌نویس"])
  const [value, setValue] = React.useState("ورودی")
  const remove = (name: string) => {
    const next = items.filter((item) => item !== name)
    setItems(next)
    if (value === name && next.length) setValue(next[0])
  }
  return (
    <Tabs value={value} onValueChange={setValue} className="mx-auto">
      <TabsList aria-label="صندوق‌ها">
        {items.map((name) => (
          <TabsTrigger key={name} value={name} onRemove={() => remove(name)}>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
