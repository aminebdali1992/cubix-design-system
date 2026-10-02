"use client"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../docs-context-menu"

const triggerClassName =
  "flex h-36 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-4 text-center text-caption text-muted-foreground"

export function ContextMenuCheckboxDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <span className="pointer-coarse:hidden">برای باز کردن منو کلیک راست کنید</span>
        <span className="hidden pointer-coarse:inline">برای باز کردن منو لمس کنید و نگه دارید</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem>نوار ابزار</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem defaultChecked>نوار وضعیت</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem disabled>نوار کناری</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
