"use client"

import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

import * as AriaButtonGroup from "@/components/cubix/aria/button-group"
import * as BaseButtonGroup from "@/components/cubix/base/button-group"
import * as RadixButtonGroup from "@/components/cubix/radix/button-group"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function useButtonGroupBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

type Orientation = "horizontal" | "vertical"

function ButtonGroup({
  className,
  orientation,
  ...props
}: ComponentProps<"div"> & {
  orientation?: Orientation
}) {
  const base = useButtonGroupBase()

  if (base === "radix") {
    return (
      <RadixButtonGroup.ButtonGroup
        className={className}
        orientation={orientation}
        {...props}
      />
    )
  }

  if (base === "aria") {
    return (
      <AriaButtonGroup.ButtonGroup
        className={className}
        orientation={orientation}
        {...props}
      />
    )
  }

  return (
    <BaseButtonGroup.ButtonGroup
      className={className}
      orientation={orientation}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  render,
  children,
  ...props
}: ComponentProps<"div"> & {
  render?: ReactElement<{ className?: string; children?: ReactNode }>
}) {
  const base = useButtonGroupBase()

  if (base === "radix") {
    if (isValidElement(render)) {
      return (
        <RadixButtonGroup.ButtonGroupText
          asChild
          className={className}
          {...props}
        >
          {cloneElement(render, undefined, children ?? render.props.children)}
        </RadixButtonGroup.ButtonGroupText>
      )
    }
    return (
      <RadixButtonGroup.ButtonGroupText className={className} {...props}>
        {children}
      </RadixButtonGroup.ButtonGroupText>
    )
  }

  if (base === "aria") {
    return (
      <AriaButtonGroup.ButtonGroupText
        className={className}
        render={render}
        {...props}
      >
        {children}
      </AriaButtonGroup.ButtonGroupText>
    )
  }

  return (
    <BaseButtonGroup.ButtonGroupText
      className={className}
      render={render}
      {...props}
    >
      {children}
    </BaseButtonGroup.ButtonGroupText>
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<"div"> & {
  orientation?: Orientation
}) {
  const base = useButtonGroupBase()

  if (base === "radix") {
    return (
      <RadixButtonGroup.ButtonGroupSeparator
        className={className}
        orientation={orientation}
        {...props}
      />
    )
  }

  if (base === "aria") {
    return (
      <AriaButtonGroup.ButtonGroupSeparator
        className={className}
        orientation={orientation}
        {...props}
      />
    )
  }

  return (
    <BaseButtonGroup.ButtonGroupSeparator
      className={className}
      orientation={orientation}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
