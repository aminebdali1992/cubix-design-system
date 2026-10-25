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

const currencyOptions = [
  { value: "rial", label: "ریال" },
  { value: "toman", label: "تومان" },
  { value: "usd", label: "دلار" },
]

export function DropdownDisabledDemo() {
  const [currency, setCurrency] = React.useState("toman")

  return (
    <TextField className="w-full max-w-xs" disabled>
      <TextFieldLabel>واحد پول</TextFieldLabel>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              disabled
              className={cn(
                textFieldInputVariants({ size: "default" }),
                "flex items-center justify-between gap-2 text-start not-disabled:hover:bg-muted aria-expanded:bg-muted dark:not-disabled:hover:bg-input/50 dark:aria-expanded:bg-input/50 shadow-[0_1px_3px_0_rgb(0_0_0/0.04)] dark:shadow-[0_1px_3px_0_rgb(0_0_0/0.2)]"
              )}
            />
          }
        >
          {currencyOptions.find((option) => option.value === currency)?.label}
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--anchor-width,var(--radix-dropdown-menu-trigger-width,var(--trigger-width)))]">
          {currencyOptions.map((option) => (
            <DropdownMenuItem key={option.value} onClick={() => setCurrency(option.value)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <TextFieldDescription>واحد پول پس از ثبت سفارش قابل تغییر نیست.</TextFieldDescription>
    </TextField>
  )
}
