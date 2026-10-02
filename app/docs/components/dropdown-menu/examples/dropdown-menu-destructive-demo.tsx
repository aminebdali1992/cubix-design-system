"use client"

import { CopyIcon, EllipsisIcon, PencilIcon, Share2Icon, Trash2Icon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../docs-dropdown-menu"

export function DropdownMenuDestructiveDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="icon" aria-label="گزینه‌های پرونده" />}
      >
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <PencilIcon />
          ویرایش
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon />
          تکثیر
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2Icon />
          اشتراک‌گذاری
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2Icon />
          حذف
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
