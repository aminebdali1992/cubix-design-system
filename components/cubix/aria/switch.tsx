"use client"

/*
  Cubix Switch - toggle between on and off.

  Compose with Label via id / htmlFor. Cubix props (checked, defaultChecked,
  disabled, onCheckedChange) map onto React Aria Switch. The thumb moves toward
  the inline end when on, so it follows the page direction (RTL by default).
  className is applied to the visible track, and the track exposes data-checked
  like Base UI so custom styles work the same across versions.
*/
import * as React from "react"
import { Switch as AriaSwitch } from "react-aria-components"

import { cn } from "@/lib/utils"

type CubixSwitchProps = Omit<
  React.ComponentProps<typeof AriaSwitch>,
  "className" | "isSelected" | "defaultSelected" | "isDisabled" | "onChange" | "children"
> & {
  className?: string
  size?: "sm" | "default"
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  invalid?: boolean
  "aria-invalid"?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Switch({
  className,
  size = "default",
  checked,
  defaultChecked,
  disabled,
  invalid,
  "aria-invalid": ariaInvalid,
  onCheckedChange,
  ...props
}: CubixSwitchProps) {
  return (
    <AriaSwitch
      data-slot="switch"
      data-size={size}
      isSelected={checked}
      defaultSelected={defaultChecked}
      isDisabled={disabled}
      aria-invalid={invalid ?? ariaInvalid}
      onChange={onCheckedChange}
      className="peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
      {...props}
    >
      {({ isSelected }) => (
        <span
          data-slot="switch-track"
          data-checked={isSelected ? "" : undefined}
          data-unchecked={isSelected ? undefined : ""}
          className={cn(
            "flex shrink-0 items-center rounded-full border-2 border-transparent transition-colors group-has-[:focus-visible]/field-label:ring-0 group-data-[size=default]/switch:h-5 group-data-[size=default]/switch:w-9 group-data-[size=sm]/switch:h-4 group-data-[size=sm]/switch:w-7 group-data-[focus-visible]/switch:ring-3 group-data-[focus-visible]/switch:ring-secondary group-data-[focus-visible]/switch:ring-offset-1 group-data-[focus-visible]/switch:ring-offset-background data-checked:bg-primary group-data-[focus-visible]/switch:data-checked:ring-primary/20 data-unchecked:bg-input dark:data-unchecked:bg-input/80",
            className
          )}
        >
          <span
            data-slot="switch-thumb"
            className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 translate-x-0 group-data-[size=default]/switch:group-data-[selected]/switch:translate-x-4 group-data-[size=sm]/switch:group-data-[selected]/switch:translate-x-3 group-data-[size=default]/switch:group-data-[selected]/switch:rtl:-translate-x-4 group-data-[size=sm]/switch:group-data-[selected]/switch:rtl:-translate-x-3 dark:bg-foreground dark:group-data-[selected]/switch:bg-primary-foreground"
          />
        </span>
      )}
    </AriaSwitch>
  )
}

export { Switch }
