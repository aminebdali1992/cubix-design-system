"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
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

export function ContextMenuIconsDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <span className="pointer-coarse:hidden">برای باز کردن منو کلیک راست کنید</span>
        <span className="hidden pointer-coarse:inline">برای باز کردن منو لمس کنید و نگه دارید</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <ButtonDemoIcon />
          بازگشت
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <ButtonDemoIcon />
          جلو
        </ContextMenuItem>
        <ContextMenuItem>
          <ButtonDemoIcon />
          بارگذاری مجدد
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <ButtonDemoIcon />
            اشتراک‌گذاری
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>
              <ButtonDemoIcon />
              لینک ایمیل
            </ContextMenuItem>
            <ContextMenuItem>
              <ButtonDemoIcon />
              پیام‌ها
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ButtonDemoIcon />
          ذخیره صفحه به‌عنوان
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
