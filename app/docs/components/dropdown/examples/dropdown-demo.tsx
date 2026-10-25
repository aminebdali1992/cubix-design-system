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
  TextFieldLabel,
} from "@/app/docs/components/text-field/docs-text-field"
import { cn } from "@/lib/utils"

const cityOptions = [
  { value: "tehran", label: "تهران" },
  { value: "isfahan", label: "اصفهان" },
  { value: "shiraz", label: "شیراز" },
  { value: "tabriz", label: "تبریز" },
  { value: "mashhad", label: "مشهد" },
]

export function DropdownDemo() {
  const [city, setCity] = React.useState("tehran")

  return (
    <TextField className="w-full max-w-xs">
      <TextFieldLabel>شهر</TextFieldLabel>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button
              type="button"
              className={cn(
                textFieldInputVariants({ size: "default" }),
                "flex items-center justify-between gap-2 text-start not-disabled:hover:bg-muted aria-expanded:bg-muted dark:not-disabled:hover:bg-input/50 dark:aria-expanded:bg-input/50 shadow-[0_1px_3px_0_rgb(0_0_0/0.04)] dark:shadow-[0_1px_3px_0_rgb(0_0_0/0.2)]"
              )}
            />
          }
        >
          {cityOptions.find((option) => option.value === city)?.label}
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--anchor-width,var(--radix-dropdown-menu-trigger-width,var(--trigger-width)))]">
          {cityOptions.map((option) => (
            <DropdownMenuItem key={option.value} onClick={() => setCity(option.value)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TextField>
  )
}
