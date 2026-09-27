"use client"

import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaNumberField from "@/components/cubix/aria/number-field"
import * as BaseNumberField from "@/components/cubix/base/number-field"
import * as RadixNumberField from "@/components/cubix/radix/number-field"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type NumberFieldSize = "default" | "lg"

type NumberFieldProps = {
  className?: string
  size?: NumberFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  children?: ReactNode
}

type NumberFieldLabelProps = {
  className?: string
  children?: ReactNode
}

type NumberFieldControlProps = {
  className?: string
  size?: NumberFieldSize
  children?: ReactNode
}

type NumberFieldStepperProps = {
  className?: string
  step?: number
  incrementLabel?: string
  decrementLabel?: string
}

type NumberFieldInputProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | "inputMode" | "spellCheck"
> & {
  size?: NumberFieldSize
}

type NumberFieldDescriptionProps = {
  className?: string
  children?: ReactNode
}

type NumberFieldErrorProps = {
  className?: string
  children?: ReactNode
}

function useNumberFieldBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function NumberField({
  className,
  size,
  disabled,
  invalid,
  name,
  children,
}: NumberFieldProps) {
  const base = useNumberFieldBase()

  if (base === "radix") {
    return (
      <RadixNumberField.NumberField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
      >
        {children}
      </RadixNumberField.NumberField>
    )
  }

  if (base === "aria") {
    return (
      <AriaNumberField.NumberField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </AriaNumberField.NumberField>
    )
  }

  return (
    <BaseNumberField.NumberField
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      name={name}
    >
      {children}
    </BaseNumberField.NumberField>
  )
}

function NumberFieldLabel({ className, children }: NumberFieldLabelProps) {
  const base = useNumberFieldBase()

  if (base === "radix") {
    return (
      <RadixNumberField.NumberFieldLabel className={className}>
        {children}
      </RadixNumberField.NumberFieldLabel>
    )
  }

  if (base === "aria") {
    return (
      <AriaNumberField.NumberFieldLabel className={className}>
        {children}
      </AriaNumberField.NumberFieldLabel>
    )
  }

  return (
    <BaseNumberField.NumberFieldLabel className={className}>
      {children}
    </BaseNumberField.NumberFieldLabel>
  )
}

function NumberFieldControl({
  className,
  size,
  children,
}: NumberFieldControlProps) {
  const base = useNumberFieldBase()

  if (base === "radix") {
    return (
      <RadixNumberField.NumberFieldControl className={className} size={size}>
        {children}
      </RadixNumberField.NumberFieldControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaNumberField.NumberFieldControl className={className} size={size}>
        {children}
      </AriaNumberField.NumberFieldControl>
    )
  }

  return (
    <BaseNumberField.NumberFieldControl className={className} size={size}>
      {children}
    </BaseNumberField.NumberFieldControl>
  )
}

function NumberFieldStepper({
  className,
  step,
  incrementLabel,
  decrementLabel,
}: NumberFieldStepperProps) {
  const base = useNumberFieldBase()

  if (base === "radix") {
    return (
      <RadixNumberField.NumberFieldStepper
        className={className}
        step={step}
        incrementLabel={incrementLabel}
        decrementLabel={decrementLabel}
      />
    )
  }

  if (base === "aria") {
    return (
      <AriaNumberField.NumberFieldStepper
        className={className}
        step={step}
        incrementLabel={incrementLabel}
        decrementLabel={decrementLabel}
      />
    )
  }

  return (
    <BaseNumberField.NumberFieldStepper
      className={className}
      step={step}
      incrementLabel={incrementLabel}
      decrementLabel={decrementLabel}
    />
  )
}

function NumberFieldInput(props: NumberFieldInputProps) {
  const base = useNumberFieldBase()

  if (base === "radix") {
    return <RadixNumberField.NumberFieldInput {...props} />
  }

  if (base === "aria") {
    return <AriaNumberField.NumberFieldInput {...props} />
  }

  return <BaseNumberField.NumberFieldInput {...props} />
}

function NumberFieldDescription({
  className,
  children,
}: NumberFieldDescriptionProps) {
  const base = useNumberFieldBase()

  if (base === "radix") {
    return (
      <RadixNumberField.NumberFieldDescription className={className}>
        {children}
      </RadixNumberField.NumberFieldDescription>
    )
  }

  if (base === "aria") {
    return (
      <AriaNumberField.NumberFieldDescription className={className}>
        {children}
      </AriaNumberField.NumberFieldDescription>
    )
  }

  return (
    <BaseNumberField.NumberFieldDescription className={className}>
      {children}
    </BaseNumberField.NumberFieldDescription>
  )
}

function NumberFieldError({ className, children }: NumberFieldErrorProps) {
  const base = useNumberFieldBase()

  if (base === "radix") {
    return (
      <RadixNumberField.NumberFieldError className={className}>
        {children}
      </RadixNumberField.NumberFieldError>
    )
  }

  if (base === "aria") {
    return (
      <AriaNumberField.NumberFieldError className={className}>
        {children}
      </AriaNumberField.NumberFieldError>
    )
  }

  return (
    <BaseNumberField.NumberFieldError className={className}>
      {children}
    </BaseNumberField.NumberFieldError>
  )
}

export {
  NumberField,
  NumberFieldLabel,
  NumberFieldControl,
  NumberFieldStepper,
  NumberFieldInput,
  NumberFieldDescription,
  NumberFieldError,
}
