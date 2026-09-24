"use client"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/app/docs/components/button-group/docs-button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/cubix/dropdown-menu"
import { Input } from "@/components/cubix/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/cubix/select"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Button 1</Button>
      <Button variant="outline">Button 2</Button>
    </ButtonGroup>
  )
}

export function ButtonGroupOrientationDemo() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Media controls">
      <Button variant="outline" size="icon" aria-label="Increase">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Decrease">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}

export function ButtonGroupSizeDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="sm">
          Button
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="lg">
          Button
        </Button>
      </ButtonGroup>
    </div>
  )
}

export function ButtonGroupNestedDemo() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Add">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button 1</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Button 2</Button>
    </ButtonGroup>
  )
}

export function ButtonGroupSplitDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Update</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" aria-label="More options" />
          }
        >
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Disable</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Uninstall</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export function ButtonGroupInputDemo() {
  return (
    <ButtonGroup>
      <Input placeholder="Type something here..." />
      <Button variant="outline">Search</Button>
    </ButtonGroup>
  )
}

export function ButtonGroupTextDemo() {
  return (
    <ButtonGroup>
      <ButtonGroupText>https://</ButtonGroupText>
      <Input placeholder="example.com" />
    </ButtonGroup>
  )
}

export function ButtonGroupSelectDemo() {
  return (
    <ButtonGroup>
      <Select defaultValue="$">
        <SelectTrigger aria-label="Currency">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="$">$</SelectItem>
          <SelectItem value="€">€</SelectItem>
          <SelectItem value="£">£</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="Enter amount to send" />
      <Button variant="outline" size="icon" aria-label="Send">
        <ArrowRightIcon />
      </Button>
    </ButtonGroup>
  )
}

export function ButtonGroupRtlDemo() {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="flex flex-wrap justify-center gap-2"
    >
      <ButtonGroup>
        <Button variant="outline">ادامه</Button>
        <Button variant="outline">انصراف</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">
          ادامه
          <ArrowLeftIcon data-icon="inline-end" />
        </Button>
        <Button variant="outline" size="icon" aria-label="افزودن">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}
