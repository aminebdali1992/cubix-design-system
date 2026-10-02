"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../docs-context-menu"

const triggerClassName =
  "flex h-36 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-4 text-center text-caption text-muted-foreground"

export function ContextMenuRadioDemo() {
  const [user, setUser] = React.useState("sara")

  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <span className="pointer-coarse:hidden">برای باز کردن منو کلیک راست کنید</span>
        <span className="hidden pointer-coarse:inline">برای باز کردن منو لمس کنید و نگه دارید</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuRadioGroup value={user} onValueChange={setUser}>
          <ContextMenuRadioItem value="amin">امین</ContextMenuRadioItem>
          <ContextMenuRadioItem value="sara">سارا</ContextMenuRadioItem>
          <ContextMenuRadioItem value="reza">رضا</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>ویرایش</ContextMenuItem>
        <ContextMenuItem>افزودن پروفایل</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
