"use client"

import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaPasswordField from "@/components/cubix/aria/password-field"
import * as BasePasswordField from "@/components/cubix/base/password-field"
import * as RadixPasswordField from "@/components/cubix/radix/password-field"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type PasswordFieldSize = "default" | "lg"

type PasswordFieldProps = {
  className?: string
  size?: PasswordFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
}

type PasswordFieldLabelProps = {
  className?: string
  children?: ReactNode
}

type PasswordFieldControlProps = {
  className?: string
  size?: PasswordFieldSize
  children?: ReactNode
}

type PasswordFieldToggleProps = {
  className?: string
  showLabel?: string
  hideLabel?: string
  "aria-label"?: string
}

type PasswordFieldInputProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | "spellCheck"
> & {
  size?: PasswordFieldSize
}

type PasswordFieldDescriptionProps = {
  className?: string
  children?: ReactNode
}

type PasswordFieldErrorProps = {
  className?: string
  children?: ReactNode
}

function usePasswordFieldBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function PasswordField({
  className,
  size,
  disabled,
  invalid,
  name,
  visible,
  defaultVisible,
  onVisibleChange,
  children,
}: PasswordFieldProps) {
  const base = usePasswordFieldBase()

  if (base === "radix") {
    return (
      <RadixPasswordField.PasswordField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        visible={visible}
        defaultVisible={defaultVisible}
        onVisibleChange={onVisibleChange}
      >
        {children}
      </RadixPasswordField.PasswordField>
    )
  }

  if (base === "aria") {
    return (
      <AriaPasswordField.PasswordField
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
        visible={visible}
        defaultVisible={defaultVisible}
        onVisibleChange={onVisibleChange}
      >
        {children}
      </AriaPasswordField.PasswordField>
    )
  }

  return (
    <BasePasswordField.PasswordField
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      name={name}
      visible={visible}
      defaultVisible={defaultVisible}
      onVisibleChange={onVisibleChange}
    >
      {children}
    </BasePasswordField.PasswordField>
  )
}

function PasswordFieldLabel({ className, children }: PasswordFieldLabelProps) {
  const base = usePasswordFieldBase()

  if (base === "radix") {
    return (
      <RadixPasswordField.PasswordFieldLabel className={className}>
        {children}
      </RadixPasswordField.PasswordFieldLabel>
    )
  }

  if (base === "aria") {
    return (
      <AriaPasswordField.PasswordFieldLabel className={className}>
        {children}
      </AriaPasswordField.PasswordFieldLabel>
    )
  }

  return (
    <BasePasswordField.PasswordFieldLabel className={className}>
      {children}
    </BasePasswordField.PasswordFieldLabel>
  )
}

function PasswordFieldControl({
  className,
  size,
  children,
}: PasswordFieldControlProps) {
  const base = usePasswordFieldBase()

  if (base === "radix") {
    return (
      <RadixPasswordField.PasswordFieldControl className={className} size={size}>
        {children}
      </RadixPasswordField.PasswordFieldControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaPasswordField.PasswordFieldControl className={className} size={size}>
        {children}
      </AriaPasswordField.PasswordFieldControl>
    )
  }

  return (
    <BasePasswordField.PasswordFieldControl className={className} size={size}>
      {children}
    </BasePasswordField.PasswordFieldControl>
  )
}

function PasswordFieldToggle({
  className,
  showLabel,
  hideLabel,
}: PasswordFieldToggleProps) {
  const base = usePasswordFieldBase()

  if (base === "radix") {
    return (
      <RadixPasswordField.PasswordFieldToggle
        className={className}
        showLabel={showLabel}
        hideLabel={hideLabel}
      />
    )
  }

  if (base === "aria") {
    return (
      <AriaPasswordField.PasswordFieldToggle
        className={className}
        showLabel={showLabel}
        hideLabel={hideLabel}
      />
    )
  }

  return (
    <BasePasswordField.PasswordFieldToggle
      className={className}
      showLabel={showLabel}
      hideLabel={hideLabel}
    />
  )
}

function PasswordFieldInput(props: PasswordFieldInputProps) {
  const base = usePasswordFieldBase()

  if (base === "radix") {
    return <RadixPasswordField.PasswordFieldInput {...props} />
  }

  if (base === "aria") {
    return <AriaPasswordField.PasswordFieldInput {...props} />
  }

  return <BasePasswordField.PasswordFieldInput {...props} />
}

function PasswordFieldDescription({
  className,
  children,
}: PasswordFieldDescriptionProps) {
  const base = usePasswordFieldBase()

  if (base === "radix") {
    return (
      <RadixPasswordField.PasswordFieldDescription className={className}>
        {children}
      </RadixPasswordField.PasswordFieldDescription>
    )
  }

  if (base === "aria") {
    return (
      <AriaPasswordField.PasswordFieldDescription className={className}>
        {children}
      </AriaPasswordField.PasswordFieldDescription>
    )
  }

  return (
    <BasePasswordField.PasswordFieldDescription className={className}>
      {children}
    </BasePasswordField.PasswordFieldDescription>
  )
}

function PasswordFieldError({ className, children }: PasswordFieldErrorProps) {
  const base = usePasswordFieldBase()

  if (base === "radix") {
    return (
      <RadixPasswordField.PasswordFieldError className={className}>
        {children}
      </RadixPasswordField.PasswordFieldError>
    )
  }

  if (base === "aria") {
    return (
      <AriaPasswordField.PasswordFieldError className={className}>
        {children}
      </AriaPasswordField.PasswordFieldError>
    )
  }

  return (
    <BasePasswordField.PasswordFieldError className={className}>
      {children}
    </BasePasswordField.PasswordFieldError>
  )
}

export {
  PasswordField,
  PasswordFieldLabel,
  PasswordFieldControl,
  PasswordFieldToggle,
  PasswordFieldInput,
  PasswordFieldDescription,
  PasswordFieldError,
}
