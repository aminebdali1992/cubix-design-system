"use client"

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
          <MenubarItem>چاپ</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>واگرد</MenubarItem>
          <MenubarItem>بازگردانی</MenubarItem>
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
