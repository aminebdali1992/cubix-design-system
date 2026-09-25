"use client"

import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

import * as AriaButton from "@/components/cubix/aria/button"
import * as BaseButton from "@/components/cubix/base/button"
import * as RadixButton from "@/components/cubix/radix/button"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type ButtonVariant =
  | "default"
  | "secondary"
  | "gray"
  | "destructive"
  | "destructive-secondary"
  | "outline"
  | "ghost"
  | "link"

type ButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant
  size?: ButtonSize
  nativeButton?: boolean
  render?: ReactElement<{ className?: string; children?: ReactNode }>
}

function useButtonBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Button({
  render,
  className,
  children,
  variant,
  size,
  nativeButton,
  ...props
}: ButtonProps) {
  const base = useButtonBase()

  if (base === "radix") {
    if (isValidElement(render)) {
      return (
        <RadixButton.Button
          asChild
          className={className}
          variant={variant}
          size={size}
          {...props}
        >
          {cloneElement(render, undefined, children ?? render.props.children)}
        </RadixButton.Button>
      )
    }
    return (
      <RadixButton.Button
        className={className}
        variant={variant}
        size={size}
        {...props}
      >
        {children}
      </RadixButton.Button>
    )
  }

  if (base === "aria") {
    return (
      <AriaButton.Button
        className={className}
        variant={variant}
        size={size}
        render={render}
        {...props}
      >
        {children}
      </AriaButton.Button>
    )
  }

  return (
    <BaseButton.Button
      className={className}
      variant={variant}
      size={size}
      nativeButton={nativeButton}
      render={render}
      {...props}
    >
      {children}
    </BaseButton.Button>
  )
}

export { Button }
