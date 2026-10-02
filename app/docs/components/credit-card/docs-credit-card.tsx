"use client"

import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaCreditCard from "@/components/cubix/aria/credit-card"
import * as BaseCreditCard from "@/components/cubix/base/credit-card"
import * as RadixCreditCard from "@/components/cubix/radix/credit-card"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type CreditCardSize = "default" | "lg"

type CreditCardProps = {
  className?: string
  size?: CreditCardSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  children?: ReactNode
}

type CreditCardLabelProps = {
  className?: string
  children?: ReactNode
}

type CreditCardControlProps = {
  className?: string
  size?: CreditCardSize
  children?: ReactNode
}

type CreditCardSegmentProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | "inputMode" | "spellCheck" | "maxLength"
> & {
  size?: CreditCardSize
}

type CreditCardSeparatorProps = {
  className?: string
  children?: ReactNode
}

type CreditCardDescriptionProps = {
  className?: string
  children?: ReactNode
}

type CreditCardErrorProps = {
  className?: string
  children?: ReactNode
}

function useCreditCardBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function CreditCard({ className, size, disabled, invalid, name, children }: CreditCardProps) {
  const base = useCreditCardBase()

  if (base === "radix") {
    return (
      <RadixCreditCard.CreditCard
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </RadixCreditCard.CreditCard>
    )
  }

  if (base === "aria") {
    return (
      <AriaCreditCard.CreditCard
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </AriaCreditCard.CreditCard>
    )
  }

  return (
    <BaseCreditCard.CreditCard
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      name={name}
    >
      {children}
    </BaseCreditCard.CreditCard>
  )
}

function CreditCardLabel({ className, children }: CreditCardLabelProps) {
  const base = useCreditCardBase()

  if (base === "radix") {
    return (
      <RadixCreditCard.CreditCardLabel className={className}>
        {children}
      </RadixCreditCard.CreditCardLabel>
    )
  }

  if (base === "aria") {
    return (
      <AriaCreditCard.CreditCardLabel className={className}>
        {children}
      </AriaCreditCard.CreditCardLabel>
    )
  }

  return (
    <BaseCreditCard.CreditCardLabel className={className}>
      {children}
    </BaseCreditCard.CreditCardLabel>
  )
}

function CreditCardControl({ className, size, children }: CreditCardControlProps) {
  const base = useCreditCardBase()

  if (base === "radix") {
    return (
      <RadixCreditCard.CreditCardControl className={className} size={size}>
        {children}
      </RadixCreditCard.CreditCardControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaCreditCard.CreditCardControl className={className} size={size}>
        {children}
      </AriaCreditCard.CreditCardControl>
    )
  }

  return (
    <BaseCreditCard.CreditCardControl className={className} size={size}>
      {children}
    </BaseCreditCard.CreditCardControl>
  )
}

function CreditCardGroup1(props: CreditCardSegmentProps) {
  const base = useCreditCardBase()
  if (base === "radix") return <RadixCreditCard.CreditCardGroup1 {...props} />
  if (base === "aria") return <AriaCreditCard.CreditCardGroup1 {...props} />
  return <BaseCreditCard.CreditCardGroup1 {...props} />
}

function CreditCardGroup2(props: CreditCardSegmentProps) {
  const base = useCreditCardBase()
  if (base === "radix") return <RadixCreditCard.CreditCardGroup2 {...props} />
  if (base === "aria") return <AriaCreditCard.CreditCardGroup2 {...props} />
  return <BaseCreditCard.CreditCardGroup2 {...props} />
}

function CreditCardGroup3(props: CreditCardSegmentProps) {
  const base = useCreditCardBase()
  if (base === "radix") return <RadixCreditCard.CreditCardGroup3 {...props} />
  if (base === "aria") return <AriaCreditCard.CreditCardGroup3 {...props} />
  return <BaseCreditCard.CreditCardGroup3 {...props} />
}

function CreditCardGroup4(props: CreditCardSegmentProps) {
  const base = useCreditCardBase()
  if (base === "radix") return <RadixCreditCard.CreditCardGroup4 {...props} />
  if (base === "aria") return <AriaCreditCard.CreditCardGroup4 {...props} />
  return <BaseCreditCard.CreditCardGroup4 {...props} />
}

function CreditCardSeparator({ className, children }: CreditCardSeparatorProps) {
  const base = useCreditCardBase()

  if (base === "radix") {
    return (
      <RadixCreditCard.CreditCardSeparator className={className}>
        {children}
      </RadixCreditCard.CreditCardSeparator>
    )
  }

  if (base === "aria") {
    return (
      <AriaCreditCard.CreditCardSeparator className={className}>
        {children}
      </AriaCreditCard.CreditCardSeparator>
    )
  }

  return (
    <BaseCreditCard.CreditCardSeparator className={className}>
      {children}
    </BaseCreditCard.CreditCardSeparator>
  )
}

function CreditCardDescription({ className, children }: CreditCardDescriptionProps) {
  const base = useCreditCardBase()

  if (base === "radix") {
    return (
      <RadixCreditCard.CreditCardDescription className={className}>
        {children}
      </RadixCreditCard.CreditCardDescription>
    )
  }

  if (base === "aria") {
    return (
      <AriaCreditCard.CreditCardDescription className={className}>
        {children}
      </AriaCreditCard.CreditCardDescription>
    )
  }

  return (
    <BaseCreditCard.CreditCardDescription className={className}>
      {children}
    </BaseCreditCard.CreditCardDescription>
  )
}

function CreditCardError({ className, children }: CreditCardErrorProps) {
  const base = useCreditCardBase()

  if (base === "radix") {
    return (
      <RadixCreditCard.CreditCardError className={className}>
        {children}
      </RadixCreditCard.CreditCardError>
    )
  }

  if (base === "aria") {
    return (
      <AriaCreditCard.CreditCardError className={className}>
        {children}
      </AriaCreditCard.CreditCardError>
    )
  }

  return (
    <BaseCreditCard.CreditCardError className={className}>
      {children}
    </BaseCreditCard.CreditCardError>
  )
}

export {
  CreditCard,
  CreditCardLabel,
  CreditCardControl,
  CreditCardGroup1,
  CreditCardGroup2,
  CreditCardGroup3,
  CreditCardGroup4,
  CreditCardSeparator,
  CreditCardDescription,
  CreditCardError,
}
