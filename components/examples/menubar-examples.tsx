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
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/app/docs/components/menubar/docs-menubar"

export function MenubarDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>پرونده</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            زبانه جدید <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            پنجره جدید <MenubarShortcut>⌘N</MenubarShortcut>
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
            چاپ... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            واگرد <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            بازگردانی <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>یافتن</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>جستجو در وب</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>یافتن...</MenubarItem>
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
          <MenubarCheckboxItem>نوار نشانک‌ها همیشه نمایش داده شود</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            آدرس کامل همیشه نمایش داده شود
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            بارگذاری مجدد <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            بارگذاری اجباری <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>تمام‌صفحه</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>پنهان کردن نوار کناری</MenubarItem>
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
          <MenubarItem inset>ویرایش...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>افزودن پروفایل...</MenubarItem>
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
            زبانه جدید <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            پنجره جدید <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>پنجره ناشناس</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            چاپ... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            واگرد <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            بازگردانی <MenubarShortcut>⇧⌘Z</MenubarShortcut>
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
            چاپ... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            واگرد <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            بازگردانی <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>یافتن</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>یافتن...</MenubarItem>
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
          <MenubarCheckboxItem>نوار نشانک‌ها همیشه نمایش داده شود</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            آدرس کامل همیشه نمایش داده شود
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            بارگذاری مجدد <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            بارگذاری اجباری <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>قالب</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>خط‌خورده</MenubarCheckboxItem>
          <MenubarCheckboxItem>کد</MenubarCheckboxItem>
          <MenubarCheckboxItem>بالانویس</MenubarCheckboxItem>
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
          <MenubarItem inset>ویرایش...</MenubarItem>
          <MenubarItem inset>افزودن پروفایل...</MenubarItem>
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
