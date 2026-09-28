"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/app/docs/components/context-menu/docs-context-menu"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

const triggerClassName =
  "flex h-36 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-4 text-center text-caption text-muted-foreground"

function TriggerHint() {
  return (
    <>
      <span className="pointer-coarse:hidden">
        برای باز کردن منو کلیک راست کنید
      </span>
      <span className="hidden pointer-coarse:inline">
        برای باز کردن منو لمس کنید و نگه دارید
      </span>
    </>
  )
}

export function ContextMenuDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <TriggerHint />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>بازگشت</ContextMenuItem>
        <ContextMenuItem disabled>جلو</ContextMenuItem>
        <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>ابزارهای بیشتر</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>ذخیره صفحه به‌عنوان</ContextMenuItem>
            <ContextMenuItem>ایجاد میان‌بر</ContextMenuItem>
            <ContextMenuItem>نام‌گذاری پنجره</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>ابزارهای توسعه‌دهنده</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem defaultChecked>نوار ابزار</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>نوار وضعیت</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup defaultValue="sara">
          <ContextMenuRadioItem value="amin">امین</ContextMenuRadioItem>
          <ContextMenuRadioItem value="sara">سارا</ContextMenuRadioItem>
          <ContextMenuRadioItem value="reza">رضا</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuBasicDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <TriggerHint />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>بازگشت</ContextMenuItem>
        <ContextMenuItem disabled>جلو</ContextMenuItem>
        <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>ذخیره صفحه به‌عنوان</ContextMenuItem>
        <ContextMenuItem>چاپ</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuIconsDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <TriggerHint />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <ButtonDemoIcon />
          بازگشت
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <ButtonDemoIcon />
          جلو
        </ContextMenuItem>
        <ContextMenuItem>
          <ButtonDemoIcon />
          بارگذاری مجدد
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <ButtonDemoIcon />
            اشتراک‌گذاری
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>
              <ButtonDemoIcon />
              لینک ایمیل
            </ContextMenuItem>
            <ContextMenuItem>
              <ButtonDemoIcon />
              پیام‌ها
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ButtonDemoIcon />
          ذخیره صفحه به‌عنوان
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuSubmenuDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <TriggerHint />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>بازگشت</ContextMenuItem>
        <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>ابزارهای بیشتر</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>ذخیره صفحه به‌عنوان</ContextMenuItem>
            <ContextMenuItem>ایجاد میان‌بر</ContextMenuItem>
            <ContextMenuItem>نام‌گذاری پنجره</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>اشتراک‌گذاری</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>لینک ایمیل</ContextMenuItem>
            <ContextMenuItem>پیام‌ها</ContextMenuItem>
            <ContextMenuItem>یادداشت‌ها</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuCheckboxDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <TriggerHint />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem>نوار ابزار</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem defaultChecked>
          نوار وضعیت
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem disabled>نوار کناری</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuCheckboxIconsDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <TriggerHint />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem>
          <ButtonDemoIcon />
          نوار ابزار
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem defaultChecked>
          <ButtonDemoIcon />
          نوار وضعیت
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem disabled>
          <ButtonDemoIcon />
          نوار کناری
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuRadioDemo() {
  const [user, setUser] = React.useState("sara")

  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <TriggerHint />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuRadioGroup value={user} onValueChange={setUser}>
          <ContextMenuRadioItem value="amin">امین</ContextMenuRadioItem>
          <ContextMenuRadioItem value="sara">سارا</ContextMenuRadioItem>
          <ContextMenuRadioItem value="reza">رضا</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>ویرایش</ContextMenuItem>
        <ContextMenuItem>افزودن پروفایل</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuIndicatorDemo() {
  const [user, setUser] = React.useState("sara")

  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <TriggerHint />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem indicator="check">
          نوار ابزار
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem indicator="check" defaultChecked>
          نوار وضعیت
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup
          indicator="check"
          value={user}
          onValueChange={setUser}
        >
          <ContextMenuRadioItem value="amin">امین</ContextMenuRadioItem>
          <ContextMenuRadioItem value="sara">سارا</ContextMenuRadioItem>
          <ContextMenuRadioItem value="reza">رضا</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuDestructiveDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <TriggerHint />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <ButtonDemoIcon />
          ویرایش
        </ContextMenuItem>
        <ContextMenuItem>
          <ButtonDemoIcon />
          تکثیر
        </ContextMenuItem>
        <ContextMenuItem>
          <ButtonDemoIcon />
          اشتراک‌گذاری
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <ButtonDemoIcon />
          حذف
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
