"use client"

/*
  Cubix Radio Group - single-select control set.

  RadioGroupItem is the control only. Compose with Label via id / htmlFor.
  Cubix props (value, disabled, onValueChange) map onto React Aria RadioGroup.
  Arrow keys follow the reading direction, so they are mirrored in RTL.
*/
import * as React from "react"
import {
  I18nProvider,
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
} from "react-aria-components"

import { cn } from "@/lib/utils"

/*
  Cubix is Persian-first, so the group starts right-to-left and then follows
  the closest dir on the page. An explicit dir prop wins. React Aria reads
  arrow key direction from its locale, so the resolved dir picks the locale.
*/
function usePageDir(dir?: "ltr" | "rtl") {
  const nodeRef = React.useRef<HTMLDivElement | null>(null)
  const [pageDir, setPageDir] = React.useState<"ltr" | "rtl">("rtl")

  React.useLayoutEffect(() => {
    const closest = nodeRef.current?.parentElement?.closest("[dir]")?.getAttribute("dir")
    if (closest === "ltr" || closest === "rtl") {
      setPageDir(closest)
    }
  }, [])

  return { nodeRef, resolvedDir: dir ?? pageDir }
}

type CubixRadioGroupProps = Omit<
  React.ComponentProps<typeof AriaRadioGroup>,
  | "className"
  | "value"
  | "defaultValue"
  | "onChange"
  | "isDisabled"
  | "isRequired"
  | "isInvalid"
  | "children"
  | "dir"
  | "orientation"
> & {
  className?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  dir?: "ltr" | "rtl"
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}

function RadioGroup({
  className,
  value,
  defaultValue,
  disabled,
  required,
  invalid,
  dir,
  onValueChange,
  children,
  ...props
}: CubixRadioGroupProps) {
  const { nodeRef, resolvedDir } = usePageDir(dir)

  /*
    React Aria's vertical orientation ignores the reading direction for
    Left / Right. Horizontal keeps Up / Down moving through the list and
    mirrors Left / Right in RTL, which is the keyboard contract of the
    Base UI and Radix groups.
  */
  return (
    <I18nProvider locale={resolvedDir === "rtl" ? "fa-IR" : "en-US"}>
      <AriaRadioGroup
        ref={nodeRef}
        data-slot="radio-group"
        dir={resolvedDir}
        orientation="horizontal"
        value={value}
        defaultValue={defaultValue}
        isDisabled={disabled}
        isRequired={required}
        isInvalid={invalid}
        onChange={onValueChange}
        className={cn("group/radio-group grid gap-3", className)}
        {...props}
      >
        {children}
      </AriaRadioGroup>
    </I18nProvider>
  )
}

type CubixRadioGroupItemProps = Omit<
  React.ComponentProps<typeof AriaRadio>,
  "className" | "value" | "isDisabled" | "children"
> & {
  className?: string
  value: string
  disabled?: boolean
  "aria-invalid"?: boolean
  children?: React.ReactNode
}

const INVALID_CLASS =
  "border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40"

/*
  React Aria renders the radio as a label around a hidden input, so focus,
  disabled and invalid states come from its data attributes. React Aria
  tracks validity on the group (invalid reaches every radio as
  data-invalid); aria-invalid on one radio only paints it, matching the
  Base UI and Radix item prop.
*/
function RadioGroupItem({
  className,
  value,
  disabled,
  "aria-invalid": ariaInvalid,
  children,
  ...props
}: CubixRadioGroupItemProps) {
  return (
    <AriaRadio
      data-slot="radio-group-item"
      value={value}
      isDisabled={disabled}
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-[18px] shrink-0 items-center justify-center rounded-full border border-input transition-[background-color,border-color,box-shadow] outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 data-[focus-visible]:ring-3 data-[focus-visible]:ring-secondary data-[focus-visible]:ring-offset-1 data-[focus-visible]:ring-offset-background data-[disabled]:cursor-not-allowed data-[disabled]:data-[selected]:opacity-50 dark:bg-input/30 data-[invalid]:border-destructive data-[invalid]:ring-3 data-[invalid]:ring-destructive/20 dark:data-[invalid]:border-destructive/50 dark:data-[invalid]:ring-destructive/40 data-[selected]:border-primary data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:data-[focus-visible]:ring-primary/20 dark:data-[selected]:bg-primary",
        ariaInvalid && INVALID_CLASS,
        className
      )}
      {...props}
    >
      {({ isSelected }) => (
        <>
          {isSelected ? (
            <span
              data-slot="radio-group-indicator"
              className="pointer-events-none absolute top-1/2 left-1/2 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground"
            />
          ) : null}
          {children}
        </>
      )}
    </AriaRadio>
  )
}

export { RadioGroup, RadioGroupItem }
