"use client"

/*
  Cubix Radio Group - single-select control set.

  RadioGroupItem is the control only. Compose with Label via id / htmlFor.
  Cubix props (value, disabled, onValueChange) map onto React Aria RadioGroup.
*/
import * as React from "react"
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from "react-aria-components"

import { cn } from "@/lib/utils"

type CubixRadioGroupProps = Omit<
  React.ComponentProps<typeof AriaRadioGroup>,
  | "className"
  | "value"
  | "defaultValue"
  | "onChange"
  | "isDisabled"
  | "isRequired"
  | "isInvalid"
  | "children"
> & {
  className?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}

function RadioGroup({
  className,
  value,
  defaultValue,
  disabled,
  required,
  invalid,
  onValueChange,
  children,
  ...props
}: CubixRadioGroupProps) {
  return (
    <AriaRadioGroup
      data-slot="radio-group"
      value={value}
      defaultValue={defaultValue}
      isDisabled={disabled}
      isRequired={required}
      isInvalid={invalid}
      onChange={onValueChange}
      className={cn("group/radio-group grid gap-3", className)}
      {...props}
    >
      {children}
    </AriaRadioGroup>
  )
}

type CubixRadioGroupItemProps = Omit<
  React.ComponentProps<typeof AriaRadio>,
  | "className"
  | "value"
  | "isDisabled"
  | "children"
> & {
  className?: string
  value: string
  disabled?: boolean
  invalid?: boolean
  "aria-invalid"?: boolean
  children?: React.ReactNode
}

function RadioGroupItem({
  className,
  value,
  disabled,
  invalid,
  "aria-invalid": ariaInvalid,
  children,
  ...props
}: CubixRadioGroupItemProps) {
  return (
    <AriaRadio
      data-slot="radio-group-item"
      value={value}
      isDisabled={disabled}
      aria-invalid={invalid ?? ariaInvalid}
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-[18px] shrink-0 items-center justify-center rounded-full border border-input transition-[background-color,border-color,box-shadow] outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background data-[focus-visible]:ring-3 data-[focus-visible]:ring-secondary data-[focus-visible]:ring-offset-1 data-[focus-visible]:ring-offset-background disabled:cursor-not-allowed disabled:data-[selected]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:data-[selected]:opacity-50 dark:bg-input/30 data-[selected]:border-primary data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:focus-visible:ring-primary/20 data-[selected]:data-[focus-visible]:ring-primary/20 dark:data-[selected]:bg-primary",
        className
      )}
      {...props}
    >
      {({ isSelected }) => (
        <>
          {isSelected ? (
            <span
              data-slot="radio-group-indicator"
              className="pointer-events-none absolute top-1/2 left-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground"
            />
          ) : null}
          {children}
        </>
      )}
    </AriaRadio>
  )
}

export { RadioGroup, RadioGroupItem }
