"use client"

import * as React from "react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "../docs-menubar"

export function MenubarIndicatorDemo() {
  const [user, setUser] = React.useState("monir")

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
          <MenubarRadioGroup indicator="check" value={user} onValueChange={setUser}>
            <MenubarRadioItem value="amin">امین</MenubarRadioItem>
            <MenubarRadioItem value="monir">منیر</MenubarRadioItem>
            <MenubarRadioItem value="fatemeh">فاطمه</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
