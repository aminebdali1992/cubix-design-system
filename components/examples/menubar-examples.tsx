"use client"

import * as React from "react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/app/docs/components/menubar/docs-menubar"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

export function MenubarDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>پرونده</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            زبانه جدید
          </MenubarItem>
          <MenubarItem>
            پنجره جدید
          </MenubarItem>
          <MenubarItem disabled>پنجره ناشناس</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>اشتراک‌گذاری</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>لینک ایمیل</MenubarItem>
              <MenubarItem>پیام‌ها</MenubarItem>
              <MenubarItem>یادداشت‌ها</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            چاپ
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            واگرد
          </MenubarItem>
          <MenubarItem>
            بازگردانی
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>یافتن</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>جستجو در وب</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>یافتن</MenubarItem>
              <MenubarItem>یافتن بعدی</MenubarItem>
              <MenubarItem>یافتن قبلی</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>برش</MenubarItem>
          <MenubarItem>کپی</MenubarItem>
          <MenubarItem>جای‌گذاری</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>نمایش</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>نوار ابزار</MenubarCheckboxItem>
          <MenubarCheckboxItem defaultChecked>
            نوار وضعیت
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>
            بارگذاری مجدد
          </MenubarItem>
          <MenubarItem disabled>
            بارگذاری اجباری
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>تمام‌صفحه</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>پنهان کردن نوار کناری</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>پروفایل‌ها</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup defaultValue="sara">
            <MenubarRadioItem value="amin">امین</MenubarRadioItem>
            <MenubarRadioItem value="sara">سارا</MenubarRadioItem>
            <MenubarRadioItem value="reza">رضا</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem>ویرایش</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>افزودن پروفایل</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarBasicDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>پرونده</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            زبانه جدید
          </MenubarItem>
          <MenubarItem>
            پنجره جدید
          </MenubarItem>
          <MenubarItem disabled>پنجره ناشناس</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            چاپ
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            واگرد
          </MenubarItem>
          <MenubarItem>
            بازگردانی
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>برش</MenubarItem>
          <MenubarItem>کپی</MenubarItem>
          <MenubarItem>جای‌گذاری</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarIconsDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>پرونده</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <ButtonDemoIcon />
            زبانه جدید
          </MenubarItem>
          <MenubarItem>
            <ButtonDemoIcon />
            پنجره جدید
          </MenubarItem>
          <MenubarItem disabled>
            <ButtonDemoIcon />
            پنجره ناشناس
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <ButtonDemoIcon />
              اشتراک‌گذاری
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <ButtonDemoIcon />
                لینک ایمیل
              </MenubarItem>
              <MenubarItem>
                <ButtonDemoIcon />
                پیام‌ها
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            <ButtonDemoIcon />
            چاپ
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <ButtonDemoIcon />
            برش
          </MenubarItem>
          <MenubarItem>
            <ButtonDemoIcon />
            کپی
          </MenubarItem>
          <MenubarItem>
            <ButtonDemoIcon />
            جای‌گذاری
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarSubmenuDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>پرونده</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>اشتراک‌گذاری</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>لینک ایمیل</MenubarItem>
              <MenubarItem>پیام‌ها</MenubarItem>
              <MenubarItem>یادداشت‌ها</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            چاپ
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            واگرد
          </MenubarItem>
          <MenubarItem>
            بازگردانی
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>یافتن</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>یافتن</MenubarItem>
              <MenubarItem>یافتن بعدی</MenubarItem>
              <MenubarItem>یافتن قبلی</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>برش</MenubarItem>
          <MenubarItem>کپی</MenubarItem>
          <MenubarItem>جای‌گذاری</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarCheckboxDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>نمایش</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>نوار ابزار</MenubarCheckboxItem>
          <MenubarCheckboxItem defaultChecked>
            نوار وضعیت
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>
            بارگذاری مجدد
          </MenubarItem>
          <MenubarItem disabled>
            بارگذاری اجباری
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>قالب</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem defaultChecked>خط‌خورده</MenubarCheckboxItem>
          <MenubarCheckboxItem>کد</MenubarCheckboxItem>
          <MenubarCheckboxItem>بالانویس</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarCheckboxIconsDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>نمایش</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>
            <ButtonDemoIcon />
            نوار ابزار
          </MenubarCheckboxItem>
          <MenubarCheckboxItem defaultChecked>
            <ButtonDemoIcon />
            نوار وضعیت
          </MenubarCheckboxItem>
          <MenubarCheckboxItem disabled>
            <ButtonDemoIcon />
            نوار کناری
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>قالب</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem defaultChecked>
            <ButtonDemoIcon />
            خط‌خورده
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>
            <ButtonDemoIcon />
            کد
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>
            <ButtonDemoIcon />
            بالانویس
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarRadioDemo() {
  const [user, setUser] = React.useState("sara")
  const [theme, setTheme] = React.useState("system")

  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>پروفایل‌ها</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={user} onValueChange={setUser}>
            <MenubarRadioItem value="amin">امین</MenubarRadioItem>
            <MenubarRadioItem value="sara">سارا</MenubarRadioItem>
            <MenubarRadioItem value="reza">رضا</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem>ویرایش</MenubarItem>
          <MenubarItem>افزودن پروفایل</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>پوسته</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
            <MenubarRadioItem value="light">روشن</MenubarRadioItem>
            <MenubarRadioItem value="dark">تاریک</MenubarRadioItem>
            <MenubarRadioItem value="system">سیستم</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarIndicatorDemo() {
  const [user, setUser] = React.useState("sara")

  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>نمایش</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem indicator="check">نوار ابزار</MenubarCheckboxItem>
          <MenubarCheckboxItem indicator="check" defaultChecked>
            نوار وضعیت
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>پروفایل‌ها</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup
            indicator="check"
            value={user}
            onValueChange={setUser}
          >
            <MenubarRadioItem value="amin">امین</MenubarRadioItem>
            <MenubarRadioItem value="sara">سارا</MenubarRadioItem>
            <MenubarRadioItem value="reza">رضا</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function MenubarSidesDemo() {
  const sides = [
    { side: "top" as const, label: "بالا" },
    { side: "bottom" as const, label: "پایین" },
    { side: "left" as const, label: "چپ" },
    { side: "right" as const, label: "راست" },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map(({ side, label }) => (
        <Menubar key={side} dir="rtl" lang="fa">
          <MenubarMenu>
            <MenubarTrigger>{label}</MenubarTrigger>
            <MenubarContent side={side}>
              <MenubarGroup>
                <MenubarItem>زبانه جدید</MenubarItem>
                <MenubarItem>پنجره جدید</MenubarItem>
                <MenubarItem>پنجره ناشناس</MenubarItem>
              </MenubarGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ))}
    </div>
  )
}
