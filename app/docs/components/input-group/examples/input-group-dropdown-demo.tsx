"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/docs/components/menu/docs-dropdown-menu"
import { ArrowDownIcon, MoreIcon } from "@/components/docs/empty-icons"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../docs-input-group"

export function InputGroupDropdownDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="نام فایل را بنویسید" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<InputGroupButton size="icon-xs" aria-label="بیشتر" />}
            >
              <MoreIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>تنظیمات</DropdownMenuItem>
                <DropdownMenuItem>کپی مسیر</DropdownMenuItem>
                <DropdownMenuItem>باز کردن محل فایل</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="عبارت جستجو را بنویسید" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger render={<InputGroupButton className="pe-1!" />}>
              جستجو در
              <ArrowDownIcon className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>مستندات</DropdownMenuItem>
                <DropdownMenuItem>مقاله‌ها</DropdownMenuItem>
                <DropdownMenuItem>تغییرات</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}