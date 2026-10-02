"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../docs-context-menu"

const triggerClassName =
  "flex h-36 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-4 text-center text-caption text-muted-foreground"

export function ContextMenuBasicDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <span className="pointer-coarse:hidden">برای باز کردن منو کلیک راست کنید</span>
        <span className="hidden pointer-coarse:inline">برای باز کردن منو لمس کنید و نگه دارید</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>بازگشت</ContextMenuItem>
        <ContextMenuItem disabled>جلو</ContextMenuItem>
        <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>ذخیره صفحه به‌عنوان</ContextMenuItem>
        <ContextMenuItem>چاپ</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
