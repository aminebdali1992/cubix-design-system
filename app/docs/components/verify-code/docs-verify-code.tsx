"use client"

import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaVerifyCode from "@/components/cubix/aria/verify-code"
import * as BaseVerifyCode from "@/components/cubix/base/verify-code"
import * as RadixVerifyCode from "@/components/cubix/radix/verify-code"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type VerifyCodeSize = "default" | "lg"

type VerifyCodeProps = {
  className?: string
  size?: VerifyCodeSize
  length?: number
  groups?: number[]
  disabled?: boolean
  invalid?: boolean
  name?: string
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children?: ReactNode
}

type VerifyCodeSeparatorProps = {
  className?: string
  children?: ReactNode
}

type VerifyCodeLabelProps = {
  className?: string
  children?: ReactNode
}

type VerifyCodeControlProps = {
  className?: string
  size?: VerifyCodeSize
  digitClassName?: string
  children?: ReactNode
}

type VerifyCodeDigitProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | "inputMode" | "spellCheck" | "maxLength" | "value" | "defaultValue"
> & {
  index: number
  size?: VerifyCodeSize
}

type VerifyCodeDescriptionProps = {
  className?: string
  children?: ReactNode
}

type VerifyCodeResendProps = {
  className?: string
  duration?: number
  waitingLabel?: ReactNode
  expiredLabel?: ReactNode
  resendLabel?: ReactNode
  onResend?: () => void
}

type VerifyCodeErrorProps = {
  className?: string
  children?: ReactNode
}

function useVerifyCodeBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function VerifyCode({
  className,
  size,
  length,
  groups,
  disabled,
  invalid,
  name,
  defaultValue,
  value,
  onValueChange,
  children,
}: VerifyCodeProps) {
  const base = useVerifyCodeBase()

  if (base === "radix") {
    return (
      <RadixVerifyCode.VerifyCode
        className={className}
        size={size}
        length={length}
        groups={groups}
        disabled={disabled}
        invalid={invalid}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      >
        {children}
      </RadixVerifyCode.VerifyCode>
    )
  }

  if (base === "aria") {
    return (
      <AriaVerifyCode.VerifyCode
        className={className}
        size={size}
        length={length}
        groups={groups}
        disabled={disabled}
        invalid={invalid}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      >
        {children}
      </AriaVerifyCode.VerifyCode>
    )
  }

  return (
    <BaseVerifyCode.VerifyCode
      className={className}
      size={size}
      length={length}
      groups={groups}
      disabled={disabled}
      invalid={invalid}
      name={name}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      {children}
    </BaseVerifyCode.VerifyCode>
  )
}

function VerifyCodeLabel({ className, children }: VerifyCodeLabelProps) {
  const base = useVerifyCodeBase()

  if (base === "radix") {
    return (
      <RadixVerifyCode.VerifyCodeLabel className={className}>
        {children}
      </RadixVerifyCode.VerifyCodeLabel>
    )
  }

  if (base === "aria") {
    return (
      <AriaVerifyCode.VerifyCodeLabel className={className}>
        {children}
      </AriaVerifyCode.VerifyCodeLabel>
    )
  }

  return (
    <BaseVerifyCode.VerifyCodeLabel className={className}>
      {children}
    </BaseVerifyCode.VerifyCodeLabel>
  )
}

function VerifyCodeControl({
  className,
  size,
  digitClassName,
  children,
}: VerifyCodeControlProps) {
  const base = useVerifyCodeBase()

  if (base === "radix") {
    return (
      <RadixVerifyCode.VerifyCodeControl
        className={className}
        size={size}
        digitClassName={digitClassName}
      >
        {children}
      </RadixVerifyCode.VerifyCodeControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaVerifyCode.VerifyCodeControl
        className={className}
        size={size}
        digitClassName={digitClassName}
      >
        {children}
      </AriaVerifyCode.VerifyCodeControl>
    )
  }

  return (
    <BaseVerifyCode.VerifyCodeControl
      className={className}
      size={size}
      digitClassName={digitClassName}
    >
      {children}
    </BaseVerifyCode.VerifyCodeControl>
  )
}

function VerifyCodeDigit(props: VerifyCodeDigitProps) {
  const base = useVerifyCodeBase()
  if (base === "radix") return <RadixVerifyCode.VerifyCodeDigit {...props} />
  if (base === "aria") return <AriaVerifyCode.VerifyCodeDigit {...props} />
  return <BaseVerifyCode.VerifyCodeDigit {...props} />
}

function VerifyCodeSeparator({
  className,
  children,
}: VerifyCodeSeparatorProps) {
  const base = useVerifyCodeBase()

  if (base === "radix") {
    return (
      <RadixVerifyCode.VerifyCodeSeparator className={className}>
        {children}
      </RadixVerifyCode.VerifyCodeSeparator>
    )
  }

  if (base === "aria") {
    return (
      <AriaVerifyCode.VerifyCodeSeparator className={className}>
        {children}
      </AriaVerifyCode.VerifyCodeSeparator>
    )
  }

  return (
    <BaseVerifyCode.VerifyCodeSeparator className={className}>
      {children}
    </BaseVerifyCode.VerifyCodeSeparator>
  )
}

function VerifyCodeDescription({
  className,
  children,
}: VerifyCodeDescriptionProps) {
  const base = useVerifyCodeBase()

  if (base === "radix") {
    return (
      <RadixVerifyCode.VerifyCodeDescription className={className}>
        {children}
      </RadixVerifyCode.VerifyCodeDescription>
    )
  }

  if (base === "aria") {
    return (
      <AriaVerifyCode.VerifyCodeDescription className={className}>
        {children}
      </AriaVerifyCode.VerifyCodeDescription>
    )
  }

  return (
    <BaseVerifyCode.VerifyCodeDescription className={className}>
      {children}
    </BaseVerifyCode.VerifyCodeDescription>
  )
}

function VerifyCodeResend({
  className,
  duration,
  waitingLabel,
  expiredLabel,
  resendLabel,
  onResend,
}: VerifyCodeResendProps) {
  const base = useVerifyCodeBase()

  if (base === "radix") {
    return (
      <RadixVerifyCode.VerifyCodeResend
        className={className}
        duration={duration}
        waitingLabel={waitingLabel}
        expiredLabel={expiredLabel}
        resendLabel={resendLabel}
        onResend={onResend}
      />
    )
  }

  if (base === "aria") {
    return (
      <AriaVerifyCode.VerifyCodeResend
        className={className}
        duration={duration}
        waitingLabel={waitingLabel}
        expiredLabel={expiredLabel}
        resendLabel={resendLabel}
        onResend={onResend}
      />
    )
  }

  return (
    <BaseVerifyCode.VerifyCodeResend
      className={className}
      duration={duration}
      waitingLabel={waitingLabel}
      expiredLabel={expiredLabel}
      resendLabel={resendLabel}
      onResend={onResend}
    />
  )
}

function VerifyCodeError({ className, children }: VerifyCodeErrorProps) {
  const base = useVerifyCodeBase()

  if (base === "radix") {
    return (
      <RadixVerifyCode.VerifyCodeError className={className}>
        {children}
      </RadixVerifyCode.VerifyCodeError>
    )
  }

  if (base === "aria") {
    return (
      <AriaVerifyCode.VerifyCodeError className={className}>
        {children}
      </AriaVerifyCode.VerifyCodeError>
    )
  }

  return (
    <BaseVerifyCode.VerifyCodeError className={className}>
      {children}
    </BaseVerifyCode.VerifyCodeError>
  )
}

export {
  VerifyCode,
  VerifyCodeLabel,
  VerifyCodeControl,
  VerifyCodeDigit,
  VerifyCodeSeparator,
  VerifyCodeDescription,
  VerifyCodeResend,
  VerifyCodeError,
}
