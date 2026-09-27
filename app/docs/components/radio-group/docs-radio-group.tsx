"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaRadioGroup from "@/components/cubix/aria/radio-group"
import * as BaseRadioGroup from "@/components/cubix/base/radio-group"
import * as RadixRadioGroup from "@/components/cubix/radix/radio-group"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type RadioGroupProps = {
  className?: string
  value?: string
  defaultValue?: string
  name?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  dir?: "ltr" | "rtl"
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-invalid"?: boolean
  onValueChange?: (value: string) => void
  children?: ReactNode
}

type RadioGroupItemProps = {
  className?: string
  id?: string
  value: string
  disabled?: boolean
  invalid?: boolean
  "aria-invalid"?: boolean
  "aria-label"?: string
  children?: ReactNode
}

function useRadioGroupBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function RadioGroup({
  className,
  value,
  defaultValue,
  name,
  disabled,
  required,
  invalid,
  dir,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-invalid": ariaInvalid,
  onValueChange,
  children,
}: RadioGroupProps) {
  const base = useRadioGroupBase()

  if (base === "radix") {
    return (
      <RadixRadioGroup.RadioGroup
        className={className}
        value={value}
        defaultValue={defaultValue}
        name={name}
        disabled={disabled}
        required={required}
        dir={dir}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-invalid={invalid ?? ariaInvalid}
        onValueChange={onValueChange}
      >
        {children}
      </RadixRadioGroup.RadioGroup>
    )
  }

  if (base === "aria") {
    return (
      <AriaRadioGroup.RadioGroup
        className={className}
        value={value}
        defaultValue={defaultValue}
        name={name}
        disabled={disabled}
        required={required}
        dir={dir}
        invalid={invalid ?? ariaInvalid}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        onValueChange={onValueChange}
      >
        {children}
      </AriaRadioGroup.RadioGroup>
    )
  }

  return (
    <BaseRadioGroup.RadioGroup
      className={className}
      value={value}
      defaultValue={defaultValue}
      name={name}
      disabled={disabled}
      required={required}
      dir={dir}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-invalid={invalid ?? ariaInvalid}
      onValueChange={onValueChange}
    >
      {children}
    </BaseRadioGroup.RadioGroup>
  )
}

function RadioGroupItem({
  className,
  id,
  value,
  disabled,
  invalid,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  children,
}: RadioGroupItemProps) {
  const base = useRadioGroupBase()

  if (base === "radix") {
    return (
      <RadixRadioGroup.RadioGroupItem
        className={className}
        id={id}
        value={value}
        disabled={disabled}
        aria-invalid={invalid ?? ariaInvalid}
        aria-label={ariaLabel}
      >
        {children}
      </RadixRadioGroup.RadioGroupItem>
    )
  }

  if (base === "aria") {
    return (
      <AriaRadioGroup.RadioGroupItem
        className={className}
        id={id}
        value={value}
        disabled={disabled}
        invalid={invalid}
        aria-invalid={ariaInvalid}
        aria-label={ariaLabel}
      >
        {children}
      </AriaRadioGroup.RadioGroupItem>
    )
  }

  return (
    <BaseRadioGroup.RadioGroupItem
      className={className}
      id={id}
      value={value}
      disabled={disabled}
      aria-invalid={invalid ?? ariaInvalid}
      aria-label={ariaLabel}
    >
      {children}
    </BaseRadioGroup.RadioGroupItem>
  )
}

export { RadioGroup, RadioGroupItem }
export type { RadioGroupProps, RadioGroupItemProps }
