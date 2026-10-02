"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Button } from "@/app/docs/components/button/docs-button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../docs-dropdown-menu"

export function DropdownMenuCheckboxesDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>نمایش</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>نوارها</DropdownMenuLabel>
          <DropdownMenuCheckboxItem defaultChecked>
            <ButtonDemoIcon />
            نوار ابزار
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            <ButtonDemoIcon />
            نوار وضعیت
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem disabled>
            <ButtonDemoIcon />
            نوار کناری
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
