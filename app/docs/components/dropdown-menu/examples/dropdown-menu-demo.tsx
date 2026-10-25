"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "@/app/docs/components/button/docs-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../docs-dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>حساب من</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>حساب کاربری</DropdownMenuLabel>
          <DropdownMenuItem>
            <ButtonDemoIcon />
            نمایه
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ButtonDemoIcon />
            صورتحساب
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ButtonDemoIcon />
            تنظیمات
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ButtonDemoIcon />
            دعوت از اعضا
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <ButtonDemoIcon />
              ایمیل
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ButtonDemoIcon />
              پیامک
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ButtonDemoIcon />
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
