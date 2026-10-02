"use client"

import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaBirthdayDate from "@/components/cubix/aria/birthday-date"
import * as BaseBirthdayDate from "@/components/cubix/base/birthday-date"
import * as RadixBirthdayDate from "@/components/cubix/radix/birthday-date"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type BirthdayDateSize = "default" | "lg"

type BirthdayDateProps = {
  className?: string
  size?: BirthdayDateSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  children?: ReactNode
}

type BirthdayDateLabelProps = {
  className?: string
  children?: ReactNode
}

type BirthdayDateControlProps = {
  className?: string
  size?: BirthdayDateSize
  children?: ReactNode
}

type BirthdayDateSegmentProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | "inputMode" | "spellCheck" | "maxLength"
> & {
  size?: BirthdayDateSize
}

type BirthdayDateSeparatorProps = {
  className?: string
  children?: ReactNode
}

type BirthdayDateDescriptionProps = {
  className?: string
  children?: ReactNode
}

type BirthdayDateErrorProps = {
  className?: string
  children?: ReactNode
}

function useBirthdayDateBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function BirthdayDate({ className, size, disabled, invalid, name, children }: BirthdayDateProps) {
  const base = useBirthdayDateBase()

  if (base === "radix") {
    return (
      <RadixBirthdayDate.BirthdayDate
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </RadixBirthdayDate.BirthdayDate>
    )
  }

  if (base === "aria") {
    return (
      <AriaBirthdayDate.BirthdayDate
        className={className}
        size={size}
        disabled={disabled}
        invalid={invalid}
        name={name}
      >
        {children}
      </AriaBirthdayDate.BirthdayDate>
    )
  }

  return (
    <BaseBirthdayDate.BirthdayDate
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      name={name}
    >
      {children}
    </BaseBirthdayDate.BirthdayDate>
  )
}

function BirthdayDateLabel({ className, children }: BirthdayDateLabelProps) {
  const base = useBirthdayDateBase()

  if (base === "radix") {
    return (
      <RadixBirthdayDate.BirthdayDateLabel className={className}>
        {children}
      </RadixBirthdayDate.BirthdayDateLabel>
    )
  }

  if (base === "aria") {
    return (
      <AriaBirthdayDate.BirthdayDateLabel className={className}>
        {children}
      </AriaBirthdayDate.BirthdayDateLabel>
    )
  }

  return (
    <BaseBirthdayDate.BirthdayDateLabel className={className}>
      {children}
    </BaseBirthdayDate.BirthdayDateLabel>
  )
}

function BirthdayDateControl({ className, size, children }: BirthdayDateControlProps) {
  const base = useBirthdayDateBase()

  if (base === "radix") {
    return (
      <RadixBirthdayDate.BirthdayDateControl className={className} size={size}>
        {children}
      </RadixBirthdayDate.BirthdayDateControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaBirthdayDate.BirthdayDateControl className={className} size={size}>
        {children}
      </AriaBirthdayDate.BirthdayDateControl>
    )
  }

  return (
    <BaseBirthdayDate.BirthdayDateControl className={className} size={size}>
      {children}
    </BaseBirthdayDate.BirthdayDateControl>
  )
}

function BirthdayDateDay(props: BirthdayDateSegmentProps) {
  const base = useBirthdayDateBase()
  if (base === "radix") return <RadixBirthdayDate.BirthdayDateDay {...props} />
  if (base === "aria") return <AriaBirthdayDate.BirthdayDateDay {...props} />
  return <BaseBirthdayDate.BirthdayDateDay {...props} />
}

function BirthdayDateMonth(props: BirthdayDateSegmentProps) {
  const base = useBirthdayDateBase()
  if (base === "radix") return <RadixBirthdayDate.BirthdayDateMonth {...props} />
  if (base === "aria") return <AriaBirthdayDate.BirthdayDateMonth {...props} />
  return <BaseBirthdayDate.BirthdayDateMonth {...props} />
}

function BirthdayDateYear(props: BirthdayDateSegmentProps) {
  const base = useBirthdayDateBase()
  if (base === "radix") return <RadixBirthdayDate.BirthdayDateYear {...props} />
  if (base === "aria") return <AriaBirthdayDate.BirthdayDateYear {...props} />
  return <BaseBirthdayDate.BirthdayDateYear {...props} />
}

function BirthdayDateSeparator({ className, children }: BirthdayDateSeparatorProps) {
  const base = useBirthdayDateBase()

  if (base === "radix") {
    return (
      <RadixBirthdayDate.BirthdayDateSeparator className={className}>
        {children}
      </RadixBirthdayDate.BirthdayDateSeparator>
    )
  }

  if (base === "aria") {
    return (
      <AriaBirthdayDate.BirthdayDateSeparator className={className}>
        {children}
      </AriaBirthdayDate.BirthdayDateSeparator>
    )
  }

  return (
    <BaseBirthdayDate.BirthdayDateSeparator className={className}>
      {children}
    </BaseBirthdayDate.BirthdayDateSeparator>
  )
}

function BirthdayDateDescription({ className, children }: BirthdayDateDescriptionProps) {
  const base = useBirthdayDateBase()

  if (base === "radix") {
    return (
      <RadixBirthdayDate.BirthdayDateDescription className={className}>
        {children}
      </RadixBirthdayDate.BirthdayDateDescription>
    )
  }

  if (base === "aria") {
    return (
      <AriaBirthdayDate.BirthdayDateDescription className={className}>
        {children}
      </AriaBirthdayDate.BirthdayDateDescription>
    )
  }

  return (
    <BaseBirthdayDate.BirthdayDateDescription className={className}>
      {children}
    </BaseBirthdayDate.BirthdayDateDescription>
  )
}

function BirthdayDateError({ className, children }: BirthdayDateErrorProps) {
  const base = useBirthdayDateBase()

  if (base === "radix") {
    return (
      <RadixBirthdayDate.BirthdayDateError className={className}>
        {children}
      </RadixBirthdayDate.BirthdayDateError>
    )
  }

  if (base === "aria") {
    return (
      <AriaBirthdayDate.BirthdayDateError className={className}>
        {children}
      </AriaBirthdayDate.BirthdayDateError>
    )
  }

  return (
    <BaseBirthdayDate.BirthdayDateError className={className}>
      {children}
    </BaseBirthdayDate.BirthdayDateError>
  )
}

export {
  BirthdayDate,
  BirthdayDateLabel,
  BirthdayDateControl,
  BirthdayDateDay,
  BirthdayDateMonth,
  BirthdayDateYear,
  BirthdayDateSeparator,
  BirthdayDateDescription,
  BirthdayDateError,
}
