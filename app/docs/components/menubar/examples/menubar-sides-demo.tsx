"use client"

import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../docs-menubar"

const sides = [
  { side: "top", label: "بالا" },
  { side: "bottom", label: "پایین" },
  { side: "left", label: "چپ" },
  { side: "right", label: "راست" },
] as const

export function MenubarSidesDemo() {
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
