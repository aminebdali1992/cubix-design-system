"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../docs-menubar"

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
