"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/docs/components/menu/docs-dropdown-menu"
import { textFieldInputVariants } from "@/components/cubix/text-field"
import {
  TextField,
  TextFieldError,
  TextFieldLabel,
} from "@/app/docs/components/text-field/docs-text-field"
import { cn } from "@/lib/utils"

const categoryOptions = [
  { value: "digital", label: "لوازم دیجیتال" },
  { value: "clothing", label: "پوشاک" },
  { value: "books", label: "کتاب" },
  { value: "home", label: "لوازم خانگی" },
]

export function DropdownInvalidDemo() {
  const [category, setCategory] = React.useState("")

  return (
    <TextField className="w-full max-w-xs" invalid>
      <TextFieldLabel>دسته‌بندی</TextFieldLabel>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              aria-invalid="true"
              className={cn(
                textFieldInputVariants({ size: "default" }),
                "flex items-center justify-between gap-2 text-start not-disabled:hover:bg-muted aria-expanded:bg-muted dark:not-disabled:hover:bg-input/50 dark:aria-expanded:bg-input/50 shadow-[0_1px_3px_0_rgb(0_0_0/0.04)] dark:shadow-[0_1px_3px_0_rgb(0_0_0/0.2)]"
              )}
            />
          }
        >
          {categoryOptions.find((option) => option.value === category)?.label ?? (
            <span className="text-muted-foreground">انتخاب کنید</span>
          )}
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--anchor-width,var(--radix-dropdown-menu-trigger-width,var(--trigger-width)))]">
          {categoryOptions.map((option) => (
            <DropdownMenuItem key={option.value} onClick={() => setCategory(option.value)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TextFieldError>لطفاً یک دسته‌بندی انتخاب کنید.</TextFieldError>
    </TextField>
  )
}
