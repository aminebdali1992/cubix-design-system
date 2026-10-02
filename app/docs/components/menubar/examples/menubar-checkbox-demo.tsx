"use client"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../docs-menubar"

export function MenubarCheckboxDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>نمایش</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>نوار ابزار</MenubarCheckboxItem>
          <MenubarCheckboxItem defaultChecked>نوار وضعیت</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>بارگذاری مجدد</MenubarItem>
          <MenubarItem disabled>بارگذاری اجباری</MenubarItem>
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
