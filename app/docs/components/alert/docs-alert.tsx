"use client"

import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaAlert from "@/components/cubix/aria/alert"
import * as BaseAlert from "@/components/cubix/base/alert"
import * as RadixAlert from "@/components/cubix/radix/alert"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type AlertVariant = "default" | "destructive"

type AlertProps = {
  className?: string
  variant?: AlertVariant
  children?: ReactNode
} & Omit<ComponentProps<"div">, "className" | "children">

type AlertPartProps = {
  className?: string
  children?: ReactNode
} & Omit<ComponentProps<"div">, "className" | "children">

function useAlertBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Alert({ className, variant, children, ...props }: AlertProps) {
  const base = useAlertBase()
  if (base === "radix") {
    return (
      <RadixAlert.Alert className={className} variant={variant} {...props}>
        {children}
      </RadixAlert.Alert>
    )
  }
  if (base === "aria") {
    return (
      <AriaAlert.Alert className={className} variant={variant} {...props}>
        {children}
      </AriaAlert.Alert>
    )
  }
  return (
    <BaseAlert.Alert className={className} variant={variant} {...props}>
      {children}
    </BaseAlert.Alert>
  )
}

function AlertTitle({ className, children, ...props }: AlertPartProps) {
  const base = useAlertBase()
  if (base === "radix") {
    return (
      <RadixAlert.AlertTitle className={className} {...props}>
        {children}
      </RadixAlert.AlertTitle>
    )
  }
  if (base === "aria") {
    return (
      <AriaAlert.AlertTitle className={className} {...props}>
        {children}
      </AriaAlert.AlertTitle>
    )
  }
  return (
    <BaseAlert.AlertTitle className={className} {...props}>
      {children}
    </BaseAlert.AlertTitle>
  )
}

function AlertDescription({ className, children, ...props }: AlertPartProps) {
  const base = useAlertBase()
  if (base === "radix") {
    return (
      <RadixAlert.AlertDescription className={className} {...props}>
        {children}
      </RadixAlert.AlertDescription>
    )
  }
  if (base === "aria") {
    return (
      <AriaAlert.AlertDescription className={className} {...props}>
        {children}
      </AriaAlert.AlertDescription>
    )
  }
  return (
    <BaseAlert.AlertDescription className={className} {...props}>
      {children}
    </BaseAlert.AlertDescription>
  )
}

function AlertAction({ className, children, ...props }: AlertPartProps) {
  const base = useAlertBase()
  if (base === "radix") {
    return (
      <RadixAlert.AlertAction className={className} {...props}>
        {children}
      </RadixAlert.AlertAction>
    )
  }
  if (base === "aria") {
    return (
      <AriaAlert.AlertAction className={className} {...props}>
        {children}
      </AriaAlert.AlertAction>
    )
  }
  return (
    <BaseAlert.AlertAction className={className} {...props}>
      {children}
    </BaseAlert.AlertAction>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
