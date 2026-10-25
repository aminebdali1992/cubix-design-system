"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../docs-dropdown-menu"

export function DropdownMenuSubmenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>ویرایش</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          واگرد
        </DropdownMenuItem>
        <DropdownMenuItem>
          ازنو
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>جست‌وجو</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>یافتن</DropdownMenuItem>
            <DropdownMenuItem>یافتن بعدی</DropdownMenuItem>
            <DropdownMenuItem>یافتن قبلی</DropdownMenuItem>
            <DropdownMenuItem>جایگزینی</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>برش</DropdownMenuItem>
        <DropdownMenuItem>کپی</DropdownMenuItem>
        <DropdownMenuItem>جای‌گذاری</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
