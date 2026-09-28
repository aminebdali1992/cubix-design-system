"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/docs/components/dropdown-menu/docs-dropdown-menu"
import { Button } from "@/components/cubix/button"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

function Trigger() {
  return (
    <DropdownMenuTrigger render={<Button variant="outline" />}>
      باز کردن
    </DropdownMenuTrigger>
  )
}

export function DropdownMenuDemo() {
  return (
    <DropdownMenu dir="rtl" lang="fa">
      <Trigger />
      <DropdownMenuContent>
        <DropdownMenuItem>زبانه جدید</DropdownMenuItem>
        <DropdownMenuItem>پنجره جدید</DropdownMenuItem>
        <DropdownMenuItem disabled>پنجره ناشناس</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>اشتراک‌گذاری</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>لینک ایمیل</DropdownMenuItem>
            <DropdownMenuItem>پیام‌ها</DropdownMenuItem>
            <DropdownMenuItem>یادداشت‌ها</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>نوار ابزار</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem defaultChecked>
          نوار وضعیت
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup defaultValue="sara">
          <DropdownMenuRadioItem value="amin">امین</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sara">سارا</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="reza">رضا</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>چاپ</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuBasicDemo() {
  return (
    <DropdownMenu dir="rtl" lang="fa">
      <Trigger />
      <DropdownMenuContent>
        <DropdownMenuItem>زبانه جدید</DropdownMenuItem>
        <DropdownMenuItem>پنجره جدید</DropdownMenuItem>
        <DropdownMenuItem disabled>پنجره ناشناس</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>چاپ</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuIconsDemo() {
  return (
    <DropdownMenu dir="rtl" lang="fa">
      <Trigger />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <ButtonDemoIcon />
          زبانه جدید
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ButtonDemoIcon />
          پنجره جدید
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <ButtonDemoIcon />
          پنجره ناشناس
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ButtonDemoIcon />
            اشتراک‌گذاری
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <ButtonDemoIcon />
              لینک ایمیل
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ButtonDemoIcon />
              پیام‌ها
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ButtonDemoIcon />
          چاپ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuSubmenuDemo() {
  return (
    <DropdownMenu dir="rtl" lang="fa">
      <Trigger />
      <DropdownMenuContent>
        <DropdownMenuItem>واگرد</DropdownMenuItem>
        <DropdownMenuItem>بازگردانی</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>یافتن</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>یافتن</DropdownMenuItem>
            <DropdownMenuItem>یافتن بعدی</DropdownMenuItem>
            <DropdownMenuItem>یافتن قبلی</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>برش</DropdownMenuItem>
        <DropdownMenuItem>کپی</DropdownMenuItem>
        <DropdownMenuItem>جای‌گذاری</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuCheckboxesDemo() {
  return (
    <DropdownMenu dir="rtl" lang="fa">
      <Trigger />
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem>نوار ابزار</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem defaultChecked>
          نوار وضعیت
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>بارگذاری مجدد</DropdownMenuItem>
        <DropdownMenuItem disabled>بارگذاری اجباری</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuCheckboxesIconsDemo() {
  return (
    <DropdownMenu dir="rtl" lang="fa">
      <Trigger />
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem>
          <ButtonDemoIcon />
          نوار ابزار
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem defaultChecked>
          <ButtonDemoIcon />
          نوار وضعیت
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem disabled>
          <ButtonDemoIcon />
          نوار کناری
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuRadioGroupDemo() {
  const [user, setUser] = React.useState("sara")

  return (
    <DropdownMenu dir="rtl" lang="fa">
      <Trigger />
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={user} onValueChange={setUser}>
          <DropdownMenuRadioItem value="amin">امین</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sara">سارا</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="reza">رضا</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>ویرایش</DropdownMenuItem>
        <DropdownMenuItem>افزودن پروفایل</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuIndicatorDemo() {
  const [user, setUser] = React.useState("sara")

  return (
    <DropdownMenu dir="rtl" lang="fa">
      <Trigger />
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem indicator="check">
          نوار ابزار
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem indicator="check" defaultChecked>
          نوار وضعیت
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          indicator="check"
          value={user}
          onValueChange={setUser}
        >
          <DropdownMenuRadioItem value="amin">امین</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sara">سارا</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="reza">رضا</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuDestructiveDemo() {
  return (
    <DropdownMenu dir="rtl" lang="fa">
      <Trigger />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <ButtonDemoIcon />
          ویرایش
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ButtonDemoIcon />
          تکثیر
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ButtonDemoIcon />
          اشتراک‌گذاری
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <ButtonDemoIcon />
          حذف
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
