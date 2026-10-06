"use client"

/*
  Cubix Label - React Aria version.

  Built on React Aria Label, so inside a React Aria field it picks up the
  field's id wiring automatically. Standalone, it links to a control through
  htmlFor like the Base UI and Radix labels.
*/
import type { ComponentProps } from "react"
import { Label as AriaLabel } from "react-aria-components"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: ComponentProps<typeof AriaLabel>) {
  return (
    <AriaLabel
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-label leading-none font-normal select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 group-data-[disabled=true]/field:pointer-events-none group-data-[disabled=true]/field:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
