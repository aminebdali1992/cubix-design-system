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
  TextFieldDescription,
  TextFieldLabel,
} from "@/app/docs/components/text-field/docs-text-field"
import { cn } from "@/lib/utils"

const languageOptions = [
  { value: "fa", label: "فارسی" },
  { value: "en", label: "انگلیسی" },
  { value: "ar", label: "عربی" },
  { value: "tr", label: "ترکی" },
]

const sizes = [
  { size: "default", hint: "ارتفاع ۴۰ پیکسل" },
  { size: "lg", hint: "ارتفاع ۴۸ پیکسل" },
] as const

function SizedDropdown({ size, hint }: (typeof sizes)[number]) {
  const [language, setLanguage] = React.useState("fa")

  return (
    <TextField className="w-full max-w-xs" size={size}>
      <TextFieldLabel>زبان</TextFieldLabel>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              className={cn(
                textFieldInputVariants({ size }),
                "flex items-center justify-between gap-2 text-start not-disabled:hover:bg-muted aria-expanded:bg-muted dark:not-disabled:hover:bg-input/50 dark:aria-expanded:bg-input/50 shadow-[0_1px_3px_0_rgb(0_0_0/0.04)] dark:shadow-[0_1px_3px_0_rgb(0_0_0/0.2)]"
              )}
            />
          }
        >
          {languageOptions.find((option) => option.value === language)?.label}
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--anchor-width,var(--radix-dropdown-menu-trigger-width,var(--trigger-width)))]">
          {languageOptions.map((option) => (
            <DropdownMenuItem key={option.value} onClick={() => setLanguage(option.value)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TextFieldDescription>{hint}</TextFieldDescription>
    </TextField>
  )
}

export function DropdownSizesDemo() {
  return (
    <div className="grid w-full max-w-xs gap-8">
      {sizes.map((item) => (
        <SizedDropdown key={item.size} {...item} />
      ))}
    </div>
  )
}
