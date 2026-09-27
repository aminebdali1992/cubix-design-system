"use client"

import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaAmountField from "@/components/cubix/aria/amount-field"
import * as BaseAmountField from "@/components/cubix/base/amount-field"
import * as RadixAmountField from "@/components/cubix/radix/amount-field"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type AmountFieldSize = "default" | "lg"

type AmountFieldProps = {
  className?: string
  size?: AmountFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  children?: ReactNode
}

type AmountFieldLabelProps = {
  className?: string
  children?: ReactNode
}

type AmountFieldControlProps = {
  className?: string
  size?: AmountFieldSize
  children?: ReactNode
}

type AmountFieldCurrencyProps = {
  className?: string
  unit: "تومان" | "ریال"
}

type AmountFieldInputProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | "inputMode" | "spellCheck"
> & {
  size?: AmountFieldSize
}

type AmountFieldDescriptionProps = {
  className?: string
  children?: ReactNode
  amountInWords?: boolean
}

type AmountFieldErrorProps = {
  className?: string
  children?: ReactNode
}

function useAmountFieldBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function AmountField({
  className,
  size,
  disabled,
  invalid,
  name,
  children,
}: AmountFieldProps) {
  const base = useAmountFieldBase()

  if (base === "radix") {
    return (
      <RadixAmountField.AmountField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
      >
        {children}
      </RadixAmountField.AmountField>
    )
  }

  if (base === "aria") {
    return (
      <AriaAmountField.AmountField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </AriaAmountField.AmountField>
    )
  }

  return (
    <BaseAmountField.AmountField
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      name={name}
    >
      {children}
    </BaseAmountField.AmountField>
  )
}

function AmountFieldLabel({ className, children }: AmountFieldLabelProps) {
  const base = useAmountFieldBase()

  if (base === "radix") {
    return (
      <RadixAmountField.AmountFieldLabel className={className}>
        {children}
      </RadixAmountField.AmountFieldLabel>
    )
  }

  if (base === "aria") {
    return (
      <AriaAmountField.AmountFieldLabel className={className}>
        {children}
      </AriaAmountField.AmountFieldLabel>
    )
  }

  return (
    <BaseAmountField.AmountFieldLabel className={className}>
      {children}
    </BaseAmountField.AmountFieldLabel>
  )
}

function AmountFieldControl({
  className,
  size,
  children,
}: AmountFieldControlProps) {
  const base = useAmountFieldBase()

  if (base === "radix") {
    return (
      <RadixAmountField.AmountFieldControl className={className} size={size}>
        {children}
      </RadixAmountField.AmountFieldControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaAmountField.AmountFieldControl className={className} size={size}>
        {children}
      </AriaAmountField.AmountFieldControl>
    )
  }

  return (
    <BaseAmountField.AmountFieldControl className={className} size={size}>
      {children}
    </BaseAmountField.AmountFieldControl>
  )
}

function AmountFieldInput(props: AmountFieldInputProps) {
  const base = useAmountFieldBase()

  if (base === "radix") {
    return <RadixAmountField.AmountFieldInput {...props} />
  }

  if (base === "aria") {
    return <AriaAmountField.AmountFieldInput {...props} />
  }

  return <BaseAmountField.AmountFieldInput {...props} />
}

function AmountFieldCurrency({ className, unit }: AmountFieldCurrencyProps) {
  const base = useAmountFieldBase()

  if (base === "radix") {
    return (
      <RadixAmountField.AmountFieldCurrency className={className} unit={unit} />
    )
  }

  if (base === "aria") {
    return (
      <AriaAmountField.AmountFieldCurrency className={className} unit={unit} />
    )
  }

  return (
    <BaseAmountField.AmountFieldCurrency className={className} unit={unit} />
  )
}

function AmountFieldDescription({
  className,
  children,
  amountInWords,
}: AmountFieldDescriptionProps) {
  const base = useAmountFieldBase()

  if (base === "radix") {
    return (
      <RadixAmountField.AmountFieldDescription
        className={className}
        amountInWords={amountInWords}
      >
        {children}
      </RadixAmountField.AmountFieldDescription>
    )
  }

  if (base === "aria") {
    return (
      <AriaAmountField.AmountFieldDescription
        className={className}
        amountInWords={amountInWords}
      >
        {children}
      </AriaAmountField.AmountFieldDescription>
    )
  }

  return (
    <BaseAmountField.AmountFieldDescription
      className={className}
      amountInWords={amountInWords}
    >
      {children}
    </BaseAmountField.AmountFieldDescription>
  )
}

function AmountFieldError({ className, children }: AmountFieldErrorProps) {
  const base = useAmountFieldBase()

  if (base === "radix") {
    return (
      <RadixAmountField.AmountFieldError className={className}>
        {children}
      </RadixAmountField.AmountFieldError>
    )
  }

  if (base === "aria") {
    return (
      <AriaAmountField.AmountFieldError className={className}>
        {children}
      </AriaAmountField.AmountFieldError>
    )
  }

  return (
    <BaseAmountField.AmountFieldError className={className}>
      {children}
    </BaseAmountField.AmountFieldError>
  )
}

export {
  AmountField,
  AmountFieldLabel,
  AmountFieldControl,
  AmountFieldInput,
  AmountFieldCurrency,
  AmountFieldDescription,
  AmountFieldError,
}
