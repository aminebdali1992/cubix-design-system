"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../docs-menubar"

export function MenubarBasicDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>پرونده</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>زبانه جدید</MenubarItem>
          <MenubarItem>پنجره جدید</MenubarItem>
          <MenubarItem disabled>پنجره ناشناس</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>چاپ</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>واگرد</MenubarItem>
          <MenubarItem>بازگردانی</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>برش</MenubarItem>
          <MenubarItem>کپی</MenubarItem>
          <MenubarItem>جای‌گذاری</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
