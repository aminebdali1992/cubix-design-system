"use client"

import { markCubixFieldInput } from "@/lib/aria-field-value"
import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaTextField from "@/components/cubix/aria/text-field"
import * as BaseTextField from "@/components/cubix/base/text-field"
import * as RadixTextField from "@/components/cubix/radix/text-field"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type TextFieldSize = "default" | "lg"

type TextFieldProps = {
  className?: string
  size?: TextFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  children?: ReactNode
}

type TextFieldLabelProps = {
  className?: string
  children?: ReactNode
}

type TextFieldControlProps = {
  className?: string
  size?: TextFieldSize
  children?: ReactNode
}

type TextFieldClearProps = {
  className?: string
  "aria-label"?: string
}

type TextFieldInputProps = Omit<ComponentProps<"input">, "size"> & {
  size?: TextFieldSize
}

type TextFieldDescriptionProps = {
  className?: string
  children?: ReactNode
}

type TextFieldErrorProps = {
  className?: string
  children?: ReactNode
}

function useTextFieldBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function TextField({ className, size, disabled, invalid, name, children }: TextFieldProps) {
  const base = useTextFieldBase()

  if (base === "radix") {
    return (
      <RadixTextField.TextField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </RadixTextField.TextField>
    )
  }

  if (base === "aria") {
    return (
      <AriaTextField.TextField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </AriaTextField.TextField>
    )
  }

  return (
    <BaseTextField.TextField
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      name={name}
    >
      {children}
    </BaseTextField.TextField>
  )
}

function TextFieldLabel({ className, children }: TextFieldLabelProps) {
  const base = useTextFieldBase()

  if (base === "radix") {
    return (
      <RadixTextField.TextFieldLabel className={className}>
        {children}
      </RadixTextField.TextFieldLabel>
    )
  }

  if (base === "aria") {
    return (
      <AriaTextField.TextFieldLabel className={className}>{children}</AriaTextField.TextFieldLabel>
    )
  }

  return (
    <BaseTextField.TextFieldLabel className={className}>{children}</BaseTextField.TextFieldLabel>
  )
}

function TextFieldControl({ className, size, children }: TextFieldControlProps) {
  const base = useTextFieldBase()

  if (base === "radix") {
    return (
      <RadixTextField.TextFieldControl className={className} size={size}>
        {children}
      </RadixTextField.TextFieldControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaTextField.TextFieldControl className={className} size={size}>
        {children}
      </AriaTextField.TextFieldControl>
    )
  }

  return (
    <BaseTextField.TextFieldControl className={className} size={size}>
      {children}
    </BaseTextField.TextFieldControl>
  )
}

function TextFieldClear({ className, "aria-label": ariaLabel }: TextFieldClearProps) {
  const base = useTextFieldBase()

  if (base === "radix") {
    return <RadixTextField.TextFieldClear className={className} aria-label={ariaLabel} />
  }

  if (base === "aria") {
    return <AriaTextField.TextFieldClear className={className} aria-label={ariaLabel} />
  }

  return <BaseTextField.TextFieldClear className={className} aria-label={ariaLabel} />
}

function TextFieldInput(props: TextFieldInputProps) {
  const base = useTextFieldBase()

  if (base === "radix") {
    return <RadixTextField.TextFieldInput {...props} />
  }

  if (base === "aria") {
    return <AriaTextField.TextFieldInput {...props} />
  }

  return <BaseTextField.TextFieldInput {...props} />
}

function TextFieldDescription({ className, children }: TextFieldDescriptionProps) {
  const base = useTextFieldBase()

  if (base === "radix") {
    return (
      <RadixTextField.TextFieldDescription className={className}>
        {children}
      </RadixTextField.TextFieldDescription>
    )
  }

  if (base === "aria") {
    return (
      <AriaTextField.TextFieldDescription className={className}>
        {children}
      </AriaTextField.TextFieldDescription>
    )
  }

  return (
    <BaseTextField.TextFieldDescription className={className}>
      {children}
    </BaseTextField.TextFieldDescription>
  )
}

function TextFieldError({ className, children }: TextFieldErrorProps) {
  const base = useTextFieldBase()

  if (base === "radix") {
    return (
      <RadixTextField.TextFieldError className={className}>
        {children}
      </RadixTextField.TextFieldError>
    )
  }

  if (base === "aria") {
    return (
      <AriaTextField.TextFieldError className={className}>{children}</AriaTextField.TextFieldError>
    )
  }

  return (
    <BaseTextField.TextFieldError className={className}>{children}</BaseTextField.TextFieldError>
  )
}

const TextFieldInputMarked = markCubixFieldInput(TextFieldInput)

export {
  TextField,
  TextFieldLabel,
  TextFieldControl,
  TextFieldClear,
  TextFieldInputMarked as TextFieldInput,
  TextFieldDescription,
  TextFieldError,
}
