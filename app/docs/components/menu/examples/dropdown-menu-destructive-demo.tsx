"use client"

import { EllipsisIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonDemoIcon } from "@/components/docs/demo-icon"
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
        render={<Button variant="outline" size="icon-sm" aria-label="گزینه‌های پرونده" />}
      >
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <ButtonDemoIcon />
          ویرایش
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ButtonDemoIcon />
          تکثیر
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ButtonDemoIcon />
          اشتراک‌گذاری
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <ButtonDemoIcon />
          حذف
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
