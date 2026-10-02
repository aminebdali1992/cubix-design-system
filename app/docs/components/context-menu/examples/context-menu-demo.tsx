"use client"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../docs-context-menu"

const triggerClassName =
  "flex h-36 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-4 text-center text-caption text-muted-foreground"

export function ContextMenuDemo() {
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
        <ContextMenuSub>
          <ContextMenuSubTrigger>ابزارهای بیشتر</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>ذخیره صفحه به‌عنوان</ContextMenuItem>
            <ContextMenuItem>ایجاد میان‌بر</ContextMenuItem>
            <ContextMenuItem>نام‌گذاری پنجره</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>ابزارهای توسعه‌دهنده</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem defaultChecked>نوار ابزار</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>نوار وضعیت</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup defaultValue="sara">
          <ContextMenuRadioItem value="amin">امین</ContextMenuRadioItem>
          <ContextMenuRadioItem value="sara">سارا</ContextMenuRadioItem>
          <ContextMenuRadioItem value="reza">رضا</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
