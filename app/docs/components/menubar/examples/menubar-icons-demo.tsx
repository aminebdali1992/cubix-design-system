"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../docs-menubar"

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
