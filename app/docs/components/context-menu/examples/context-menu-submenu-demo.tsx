"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../docs-context-menu"

const triggerClassName =
  "flex h-36 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-4 text-center text-caption text-muted-foreground"

export function ContextMenuSubmenuDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <span className="pointer-coarse:hidden">برای باز کردن منو کلیک راست کنید</span>
        <span className="hidden pointer-coarse:inline">برای باز کردن منو لمس کنید و نگه دارید</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>بازگشت</ContextMenuItem>
        <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>ابزارهای بیشتر</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>ذخیره صفحه به‌عنوان</ContextMenuItem>
            <ContextMenuItem>ایجاد میان‌بر</ContextMenuItem>
            <ContextMenuItem>نام‌گذاری پنجره</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>اشتراک‌گذاری</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>لینک ایمیل</ContextMenuItem>
            <ContextMenuItem>پیام‌ها</ContextMenuItem>
            <ContextMenuItem>یادداشت‌ها</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}
