"use client"

import { usePathname } from "next/navigation"

import * as AriaCheckbox from "@/components/cubix/aria/checkbox"
import * as BaseCheckbox from "@/components/cubix/base/checkbox"
import * as RadixCheckbox from "@/components/cubix/radix/checkbox"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type CheckboxProps = {
  className?: string
  id?: string
  name?: string
  value?: string
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  pending?: boolean
  required?: boolean
  invalid?: boolean
  "aria-invalid"?: boolean
  "aria-label"?: string
  "aria-describedby"?: string
  onCheckedChange?: (checked: boolean) => void
}

function useCheckboxBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Checkbox({
  className,
  id,
  name,
  value,
  checked,
  defaultChecked,
  indeterminate,
  disabled,
  pending,
  required,
  invalid,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  onCheckedChange,
}: CheckboxProps) {
  const base = useCheckboxBase()

  if (base === "radix") {
    return (
      <RadixCheckbox.Checkbox
        className={className}
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        indeterminate={indeterminate}
        disabled={disabled}
        pending={pending}
        required={required}
        aria-invalid={invalid ?? ariaInvalid}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        onCheckedChange={onCheckedChange}
      />
    )
  }

  if (base === "aria") {
    return (
      <AriaCheckbox.Checkbox
        className={className}
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        indeterminate={indeterminate}
        disabled={disabled}
        pending={pending}
        isRequired={required}
        invalid={invalid}
        aria-invalid={ariaInvalid}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        onCheckedChange={onCheckedChange}
      />
    )
  }

  return (
    <BaseCheckbox.Checkbox
      className={className}
      id={id}
      name={name}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
      indeterminate={indeterminate}
      disabled={disabled}
      pending={pending}
      required={required}
      aria-invalid={invalid ?? ariaInvalid}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      onCheckedChange={onCheckedChange}
    />
  )
}

export { Checkbox }
export type { CheckboxProps }
