"use client"

import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Separator } from "@/components/cubix/aria/separator"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
  "group/button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-lg [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "*:data-slot:rounded-e-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-lg! [&>[data-slot]~[data-slot]]:rounded-s-none [&>[data-slot]~[data-slot]]:border-s-0",
        vertical:
          "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

type ButtonGroupTextHostProps = ComponentProps<"div"> & {
  "data-slot"?: string
}

function ButtonGroupText({
  className,
  render,
  children,
  ...props
}: ComponentProps<"div"> & {
  render?: ReactElement<ButtonGroupTextHostProps>
}) {
  const textClassName = cn(
    "flex items-center gap-2 rounded-lg border bg-muted px-2.5 text-caption font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    className
  )

  if (isValidElement<ButtonGroupTextHostProps>(render)) {
    return cloneElement(render, {
      ...props,
      className: cn(textClassName, render.props.className),
      "data-slot": "button-group-text",
      children: children ?? render.props.children,
    })
  }

  return (
    <div data-slot="button-group-text" className={textClassName} {...props}>
      {children}
    </div>
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
