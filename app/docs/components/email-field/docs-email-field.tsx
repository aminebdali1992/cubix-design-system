"use client"

import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaEmailField from "@/components/cubix/aria/email-field"
import * as BaseEmailField from "@/components/cubix/base/email-field"
import * as RadixEmailField from "@/components/cubix/radix/email-field"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type EmailFieldSize = "default" | "lg"

type EmailFieldProps = {
  className?: string
  size?: EmailFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  children?: ReactNode
}

type EmailFieldLabelProps = {
  className?: string
  children?: ReactNode
}

type EmailFieldControlProps = {
  className?: string
  size?: EmailFieldSize
  children?: ReactNode
}

type EmailFieldClearProps = {
  className?: string
  "aria-label"?: string
}

type EmailFieldInputProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | "inputMode" | "spellCheck"
> & {
  size?: EmailFieldSize
}

type EmailFieldDescriptionProps = {
  className?: string
  children?: ReactNode
}

type EmailFieldErrorProps = {
  className?: string
  children?: ReactNode
}

function useEmailFieldBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function EmailField({
  className,
  size,
  disabled,
  invalid,
  name,
  children,
}: EmailFieldProps) {
  const base = useEmailFieldBase()

  if (base === "radix") {
    return (
      <RadixEmailField.EmailField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
      >
        {children}
      </RadixEmailField.EmailField>
    )
  }

  if (base === "aria") {
    return (
      <AriaEmailField.EmailField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </AriaEmailField.EmailField>
    )
  }

  return (
    <BaseEmailField.EmailField
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      name={name}
    >
      {children}
    </BaseEmailField.EmailField>
  )
}

function EmailFieldLabel({ className, children }: EmailFieldLabelProps) {
  const base = useEmailFieldBase()

  if (base === "radix") {
    return (
      <RadixEmailField.EmailFieldLabel className={className}>
        {children}
      </RadixEmailField.EmailFieldLabel>
    )
  }

  if (base === "aria") {
    return (
      <AriaEmailField.EmailFieldLabel className={className}>
        {children}
      </AriaEmailField.EmailFieldLabel>
    )
  }

  return (
    <BaseEmailField.EmailFieldLabel className={className}>
      {children}
    </BaseEmailField.EmailFieldLabel>
  )
}

function EmailFieldControl({
  className,
  size,
  children,
}: EmailFieldControlProps) {
  const base = useEmailFieldBase()

  if (base === "radix") {
    return (
      <RadixEmailField.EmailFieldControl className={className} size={size}>
        {children}
      </RadixEmailField.EmailFieldControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaEmailField.EmailFieldControl className={className} size={size}>
        {children}
      </AriaEmailField.EmailFieldControl>
    )
  }

  return (
    <BaseEmailField.EmailFieldControl className={className} size={size}>
      {children}
    </BaseEmailField.EmailFieldControl>
  )
}

function EmailFieldClear({ className, "aria-label": ariaLabel }: EmailFieldClearProps) {
  const base = useEmailFieldBase()

  if (base === "radix") {
    return (
      <RadixEmailField.EmailFieldClear
        className={className}
        aria-label={ariaLabel}
      />
    )
  }

  if (base === "aria") {
    return (
      <AriaEmailField.EmailFieldClear
        className={className}
        aria-label={ariaLabel}
      />
    )
  }

  return (
    <BaseEmailField.EmailFieldClear
      className={className}
      aria-label={ariaLabel}
    />
  )
}

function EmailFieldInput(props: EmailFieldInputProps) {
  const base = useEmailFieldBase()

  if (base === "radix") {
    return <RadixEmailField.EmailFieldInput {...props} />
  }

  if (base === "aria") {
    return <AriaEmailField.EmailFieldInput {...props} />
  }

  return <BaseEmailField.EmailFieldInput {...props} />
}

function EmailFieldDescription({
  className,
  children,
}: EmailFieldDescriptionProps) {
  const base = useEmailFieldBase()

  if (base === "radix") {
    return (
      <RadixEmailField.EmailFieldDescription className={className}>
        {children}
      </RadixEmailField.EmailFieldDescription>
    )
  }

  if (base === "aria") {
    return (
      <AriaEmailField.EmailFieldDescription className={className}>
        {children}
      </AriaEmailField.EmailFieldDescription>
    )
  }

  return (
    <BaseEmailField.EmailFieldDescription className={className}>
      {children}
    </BaseEmailField.EmailFieldDescription>
  )
}

function EmailFieldError({ className, children }: EmailFieldErrorProps) {
  const base = useEmailFieldBase()

  if (base === "radix") {
    return (
      <RadixEmailField.EmailFieldError className={className}>
        {children}
      </RadixEmailField.EmailFieldError>
    )
  }

  if (base === "aria") {
    return (
      <AriaEmailField.EmailFieldError className={className}>
        {children}
      </AriaEmailField.EmailFieldError>
    )
  }

  return (
    <BaseEmailField.EmailFieldError className={className}>
      {children}
    </BaseEmailField.EmailFieldError>
  )
}

export {
  EmailField,
  EmailFieldLabel,
  EmailFieldControl,
  EmailFieldClear,
  EmailFieldInput,
  EmailFieldDescription,
  EmailFieldError,
}
