"use client"

import * as React from "react"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "../docs-menubar"

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
