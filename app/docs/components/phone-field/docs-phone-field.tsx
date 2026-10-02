"use client"

import { markCubixFieldInput } from "@/lib/aria-field-value"
import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaPhoneField from "@/components/cubix/aria/phone-field"
import * as BasePhoneField from "@/components/cubix/base/phone-field"
import * as RadixPhoneField from "@/components/cubix/radix/phone-field"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type PhoneFieldSize = "default" | "lg"

type PhoneFieldProps = {
  className?: string
  size?: PhoneFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  children?: ReactNode
}

type PhoneFieldLabelProps = {
  className?: string
  children?: ReactNode
}

type PhoneFieldControlProps = {
  className?: string
  size?: PhoneFieldSize
  children?: ReactNode
}

type PhoneFieldClearProps = {
  className?: string
  "aria-label"?: string
}

type PhoneFieldInputProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | "inputMode" | "spellCheck"
> & {
  size?: PhoneFieldSize
}

type PhoneFieldDescriptionProps = {
  className?: string
  children?: ReactNode
}

type PhoneFieldErrorProps = {
  className?: string
  children?: ReactNode
}

function usePhoneFieldBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function PhoneField({ className, size, disabled, invalid, name, children }: PhoneFieldProps) {
  const base = usePhoneFieldBase()

  if (base === "radix") {
    return (
      <RadixPhoneField.PhoneField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </RadixPhoneField.PhoneField>
    )
  }

  if (base === "aria") {
    return (
      <AriaPhoneField.PhoneField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </AriaPhoneField.PhoneField>
    )
  }

  return (
    <BasePhoneField.PhoneField
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      name={name}
    >
      {children}
    </BasePhoneField.PhoneField>
  )
}

function PhoneFieldLabel({ className, children }: PhoneFieldLabelProps) {
  const base = usePhoneFieldBase()

  if (base === "radix") {
    return (
      <RadixPhoneField.PhoneFieldLabel className={className}>
        {children}
      </RadixPhoneField.PhoneFieldLabel>
    )
  }

  if (base === "aria") {
    return (
      <AriaPhoneField.PhoneFieldLabel className={className}>
        {children}
      </AriaPhoneField.PhoneFieldLabel>
    )
  }

  return (
    <BasePhoneField.PhoneFieldLabel className={className}>
      {children}
    </BasePhoneField.PhoneFieldLabel>
  )
}

function PhoneFieldControl({ className, size, children }: PhoneFieldControlProps) {
  const base = usePhoneFieldBase()

  if (base === "radix") {
    return (
      <RadixPhoneField.PhoneFieldControl className={className} size={size}>
        {children}
      </RadixPhoneField.PhoneFieldControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaPhoneField.PhoneFieldControl className={className} size={size}>
        {children}
      </AriaPhoneField.PhoneFieldControl>
    )
  }

  return (
    <BasePhoneField.PhoneFieldControl className={className} size={size}>
      {children}
    </BasePhoneField.PhoneFieldControl>
  )
}

function PhoneFieldClear({ className, "aria-label": ariaLabel }: PhoneFieldClearProps) {
  const base = usePhoneFieldBase()

  if (base === "radix") {
    return <RadixPhoneField.PhoneFieldClear className={className} aria-label={ariaLabel} />
  }

  if (base === "aria") {
    return <AriaPhoneField.PhoneFieldClear className={className} aria-label={ariaLabel} />
  }

  return <BasePhoneField.PhoneFieldClear className={className} aria-label={ariaLabel} />
}

function PhoneFieldInput(props: PhoneFieldInputProps) {
  const base = usePhoneFieldBase()

  if (base === "radix") {
    return <RadixPhoneField.PhoneFieldInput {...props} />
  }

  if (base === "aria") {
    return <AriaPhoneField.PhoneFieldInput {...props} />
  }

  return <BasePhoneField.PhoneFieldInput {...props} />
}

function PhoneFieldDescription({ className, children }: PhoneFieldDescriptionProps) {
  const base = usePhoneFieldBase()

  if (base === "radix") {
    return (
      <RadixPhoneField.PhoneFieldDescription className={className}>
        {children}
      </RadixPhoneField.PhoneFieldDescription>
    )
  }

  if (base === "aria") {
    return (
      <AriaPhoneField.PhoneFieldDescription className={className}>
        {children}
      </AriaPhoneField.PhoneFieldDescription>
    )
  }

  return (
    <BasePhoneField.PhoneFieldDescription className={className}>
      {children}
    </BasePhoneField.PhoneFieldDescription>
  )
}

function PhoneFieldError({ className, children }: PhoneFieldErrorProps) {
  const base = usePhoneFieldBase()

  if (base === "radix") {
    return (
      <RadixPhoneField.PhoneFieldError className={className}>
        {children}
      </RadixPhoneField.PhoneFieldError>
    )
  }

  if (base === "aria") {
    return (
      <AriaPhoneField.PhoneFieldError className={className}>
        {children}
      </AriaPhoneField.PhoneFieldError>
    )
  }

  return (
    <BasePhoneField.PhoneFieldError className={className}>
      {children}
    </BasePhoneField.PhoneFieldError>
  )
}

const PhoneFieldInputMarked = markCubixFieldInput(PhoneFieldInput)

export {
  PhoneField,
  PhoneFieldLabel,
  PhoneFieldControl,
  PhoneFieldClear,
  PhoneFieldInputMarked as PhoneFieldInput,
  PhoneFieldDescription,
  PhoneFieldError,
}
