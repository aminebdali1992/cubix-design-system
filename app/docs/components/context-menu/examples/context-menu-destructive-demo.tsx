"use client"

import { CopyIcon, PencilIcon, Share2Icon, Trash2Icon } from "lucide-react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../docs-context-menu"

const triggerClassName =
  "flex h-36 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-4 text-center text-caption text-muted-foreground"

export function ContextMenuDestructiveDemo() {
  return (
    <ContextMenu dir="rtl" lang="fa">
      <ContextMenuTrigger className={triggerClassName}>
        <span className="pointer-coarse:hidden">برای باز کردن منو کلیک راست کنید</span>
        <span className="hidden pointer-coarse:inline">برای باز کردن منو لمس کنید و نگه دارید</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <PencilIcon />
          ویرایش
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon />
          تکثیر
        </ContextMenuItem>
        <ContextMenuItem>
          <Share2Icon />
          اشتراک‌گذاری
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          حذف
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
