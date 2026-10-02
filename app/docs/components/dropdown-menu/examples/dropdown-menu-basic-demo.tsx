"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../docs-dropdown-menu"

export function DropdownMenuBasicDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>پرونده</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>پنجره‌ها</DropdownMenuLabel>
          <DropdownMenuItem>زبانه جدید</DropdownMenuItem>
          <DropdownMenuItem>پنجره جدید</DropdownMenuItem>
          <DropdownMenuItem disabled>پنجره ناشناس</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>چاپ</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
