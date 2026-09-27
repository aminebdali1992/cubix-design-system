"use client"

/*
  Cubix Birthday Date - labeled day / month / year field specialized from Text Field.

  Three numeric segments with / separators. Values always display as Persian
  digits. inputMode is locked to numeric. Weight 400 and tracking-normal keep
  IRANSans XV readable in fixed-height controls.
*/
import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const birthdayDateControlVariants = cva(
  "group/birthday-date-control relative flex w-full min-w-0 items-center outline-none",
  {
    variants: {
      size: {
        default: "gap-2",
        lg: "gap-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const birthdayDateSegmentVariants = cva(
  "w-full min-w-0 flex-1 rounded-lg border border-input bg-transparent text-center font-normal leading-none tracking-normal text-foreground tabular-nums transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-transparent disabled:bg-muted disabled:text-muted-foreground disabled:placeholder:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-0 dark:bg-input/30 dark:disabled:bg-muted dark:aria-invalid:border-destructive/50 dark:aria-invalid:focus-visible:border-destructive/50",
  {
    variants: {
      size: {
        default: "h-10 px-2 text-label md:text-label leading-none",
        lg: "h-12 px-2.5 text-label md:text-label leading-none",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type BirthdayDateSize = NonNullable<
  VariantProps<typeof birthdayDateControlVariants>["size"]
>

type BirthdayDatePart = "day" | "month" | "year"

type BirthdayDateParts = {
  day: string
  month: string
  year: string
}

type BirthdayDateStore = {
  parts: BirthdayDateParts
  setPart: (part: BirthdayDatePart, digits: string) => void
  setParts: (parts: BirthdayDateParts) => void
}

const BirthdayDateSizeContext = React.createContext<BirthdayDateSize>("default")
const BirthdayDateStoreContext = React.createContext<BirthdayDateStore | null>(
  null
)

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"
const DIGIT_CHAR = /[\d۰-۹٠-٩]/
const ALLOWED_INSERT = /^[\d۰-۹٠-٩]+$/
const MAX_LENGTH: Record<BirthdayDatePart, number> = {
  day: 2,
  month: 2,
  year: 4,
}
const PART_ORDER: BirthdayDatePart[] = ["day", "month", "year"]
const PART_SLOT: Record<BirthdayDatePart, string> = {
  day: "birthday-date-day",
  month: "birthday-date-month",
  year: "birthday-date-year",
}
const PART_LABEL: Record<BirthdayDatePart, string> = {
  day: "روز",
  month: "ماه",
  year: "سال",
}
const PART_PLACEHOLDER: Record<BirthdayDatePart, string> = {
  day: "روز",
  month: "ماه",
  year: "سال",
}
const PART_AUTOCOMPLETE: Record<BirthdayDatePart, string> = {
  day: "bday-day",
  month: "bday-month",
  year: "bday-year",
}

function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)))
}

function toPersianDigits(value: string) {
  return toLatinDigits(value).replace(
    /\d/g,
    (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit
  )
}

function extractDigits(value: string) {
  return toLatinDigits(value).replace(/\D/g, "")
}

function formatSegmentDigits(digits: string, maxLength: number) {
  const clipped = extractDigits(digits).slice(0, maxLength)
  return clipped ? toPersianDigits(clipped) : ""
}

function emptyParts(): BirthdayDateParts {
  return { day: "", month: "", year: "" }
}

function parseBirthdayDateValue(value: string): BirthdayDateParts {
  const normalized = value.trim()
  if (!normalized) return emptyParts()

  const separators = normalized.split(/[/\-.\s]+/).filter(Boolean)
  if (separators.length >= 3) {
    return {
      day: extractDigits(separators[0] ?? "").slice(0, 2),
      month: extractDigits(separators[1] ?? "").slice(0, 2),
      year: extractDigits(separators[2] ?? "").slice(0, 4),
    }
  }

  const digits = extractDigits(normalized)
  if (digits.length <= 2) {
    return { day: digits, month: "", year: "" }
  }
  if (digits.length <= 4) {
    return {
      day: digits.slice(0, 2),
      month: digits.slice(2),
      year: "",
    }
  }
  return {
    day: digits.slice(0, 2),
    month: digits.slice(2, 4),
    year: digits.slice(4, 8),
  }
}

function formatBirthdayDateValue(
  value: string | BirthdayDateParts | null | undefined
) {
  const parts =
    value == null
      ? emptyParts()
      : typeof value === "string"
        ? parseBirthdayDateValue(value)
        : {
            day: extractDigits(value.day).slice(0, 2),
            month: extractDigits(value.month).slice(0, 2),
            year: extractDigits(value.year).slice(0, 4),
          }

  if (!parts.day && !parts.month && !parts.year) return ""
  return [parts.day, parts.month, parts.year]
    .map((part) => (part ? toPersianDigits(part) : ""))
    .join("/")
}

function setNativeInputValue(input: HTMLInputElement, next: string) {
  const descriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )
  descriptor?.set?.call(input, next)
  input.dispatchEvent(new Event("input", { bubbles: true }))
  input.dispatchEvent(new Event("change", { bubbles: true }))
}

function focusSegment(
  control: Element | null,
  part: BirthdayDatePart,
  options?: { select?: boolean }
) {
  const input = control?.querySelector<HTMLInputElement>(
    `[data-slot=${PART_SLOT[part]}]`
  )
  if (!input || input.disabled || input.readOnly) return
  input.focus()
  if (options?.select) {
    input.select()
  } else {
    const end = input.value.length
    input.setSelectionRange(end, end)
  }
}

function BirthdayDateStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [parts, setPartsState] = React.useState<BirthdayDateParts>(emptyParts)
  const setPart = React.useCallback((part: BirthdayDatePart, digits: string) => {
    setPartsState((prev) => ({
      ...prev,
      [part]: extractDigits(digits).slice(0, MAX_LENGTH[part]),
    }))
  }, [])
  const setParts = React.useCallback((next: BirthdayDateParts) => {
    setPartsState({
      day: extractDigits(next.day).slice(0, 2),
      month: extractDigits(next.month).slice(0, 2),
      year: extractDigits(next.year).slice(0, 4),
    })
  }, [])
  const store = React.useMemo(
    () => ({ parts, setPart, setParts }),
    [parts, setPart, setParts]
  )

  return (
    <BirthdayDateStoreContext.Provider value={store}>
      {children}
    </BirthdayDateStoreContext.Provider>
  )
}

function BirthdayDate({
  className,
  size = "default",
  name,
  children,
  ...props
}: Omit<React.ComponentProps<typeof FieldPrimitive.Root>, "size"> & {
  size?: BirthdayDateSize
  name?: string
}) {
  return (
    <BirthdayDateStoreProvider>
      <BirthdayDateSizeContext.Provider value={size}>
        <FieldPrimitive.Root
          data-slot="birthday-date"
          data-size={size}
          className={cn(
            "group/birthday-date flex w-full min-w-0 flex-col gap-2 data-disabled:cursor-not-allowed data-disabled:opacity-70",
            className
          )}
          {...props}
        >
          {name ? <BirthdayDateHiddenInput name={name} /> : null}
          {children}
        </FieldPrimitive.Root>
      </BirthdayDateSizeContext.Provider>
    </BirthdayDateStoreProvider>
  )
}

function BirthdayDateHiddenInput({ name }: { name: string }) {
  const store = React.useContext(BirthdayDateStoreContext)
  const value = store
    ? formatBirthdayDateValue(store.parts)
    : ""

  return <input type="hidden" name={name} value={value} readOnly />
}

function BirthdayDateLabel({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Label>) {
  return (
    <FieldPrimitive.Label
      data-slot="birthday-date-label"
      className={cn(
        "flex w-fit items-center gap-2 text-label leading-none font-normal text-foreground select-none group-data-disabled/birthday-date:cursor-not-allowed group-data-disabled/birthday-date:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BirthdayDateControl({
  className,
  size: sizeProp,
  onClick,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: BirthdayDateSize
}) {
  const size = sizeProp ?? React.useContext(BirthdayDateSizeContext)

  return (
    <div
      data-slot="birthday-date-control"
      data-size={size}
      className={cn(birthdayDateControlVariants({ size }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if ((event.target as HTMLElement).closest("button,a,input,textarea")) {
          return
        }
        const day = event.currentTarget.querySelector<HTMLInputElement>(
          "[data-slot=birthday-date-day]"
        )
        const target =
          day && !day.value
            ? day
            : event.currentTarget.querySelector<HTMLInputElement>(
                "[data-birthday-segment]:not([disabled])"
              )
        if (!target || target.disabled || target.readOnly) return
        target.focus()
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function BirthdayDateSeparator({
  className,
  children = "/",
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="birthday-date-separator"
      aria-hidden="true"
      className={cn(
        "shrink-0 select-none text-label font-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

function BirthdayDateSegment({
  part,
  className,
  size: sizeProp,
  autoComplete,
  "aria-label": ariaLabel,
  placeholder,
  onBeforeInput,
  onPaste,
  onInput,
  onKeyDown,
  defaultValue,
  value,
  ...props
}: Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "inputMode" | "spellCheck" | "maxLength"
> & {
  part: BirthdayDatePart
  size?: BirthdayDateSize
}) {
  const size = sizeProp ?? React.useContext(BirthdayDateSizeContext)
  const store = React.useContext(BirthdayDateStoreContext)
  const maxLength = MAX_LENGTH[part]
  const persianDefault =
    defaultValue === undefined
      ? undefined
      : formatSegmentDigits(String(defaultValue), maxLength)
  const persianValue =
    value === undefined
      ? undefined
      : formatSegmentDigits(String(value), maxLength)

  const setPart = store?.setPart
  const setParts = store?.setParts

  React.useLayoutEffect(() => {
    if (value === undefined) return
    setPart?.(part, extractDigits(String(persianValue ?? "")))
  }, [value, persianValue, part, setPart])

  React.useLayoutEffect(() => {
    if (value !== undefined) return
    setPart?.(part, extractDigits(String(persianDefault ?? "")))
  }, [value, persianDefault, part, setPart])

  const applyValue = (
    input: HTMLInputElement,
    rawDigits: string,
    options?: { advance?: boolean }
  ) => {
    const nextDigits = extractDigits(rawDigits).slice(0, maxLength)
    const next = nextDigits ? toPersianDigits(nextDigits) : ""
    setPart?.(part, nextDigits)
    if (next !== input.value) {
      setNativeInputValue(input, next)
    }
    if (options?.advance && nextDigits.length >= maxLength) {
      const index = PART_ORDER.indexOf(part)
      const nextPart = PART_ORDER[index + 1]
      if (nextPart) {
        focusSegment(input.closest("[data-slot=birthday-date-control]"), nextPart, {
          select: true,
        })
      }
    }
  }

  return (
    <input
      data-slot={PART_SLOT[part]}
      data-birthday-segment=""
      data-size={size}
      data-part={part}
      aria-label={ariaLabel ?? PART_LABEL[part]}
      placeholder={placeholder ?? PART_PLACEHOLDER[part]}
      className={cn(birthdayDateSegmentVariants({ size }), className)}
      {...props}
      type="text"
      inputMode="numeric"
      size={1}
      autoComplete={autoComplete ?? PART_AUTOCOMPLETE[part]}
      spellCheck={false}
      maxLength={maxLength}
      defaultValue={persianDefault}
      value={persianValue}
      onBeforeInput={(event) => {
        onBeforeInput?.(event)
        if (event.defaultPrevented) return
        if (typeof event.data !== "string" || event.data.length === 0) return
        if (event.data === "/" || event.data === "-" || event.data === ".") {
          event.preventDefault()
          const index = PART_ORDER.indexOf(part)
          const nextPart = PART_ORDER[index + 1]
          if (nextPart) {
            focusSegment(
              event.currentTarget.closest("[data-slot=birthday-date-control]"),
              nextPart,
              { select: true }
            )
          }
          return
        }
        if (!ALLOWED_INSERT.test(event.data)) {
          event.preventDefault()
          return
        }
        const input = event.currentTarget
        const start = input.selectionStart ?? input.value.length
        const end = input.selectionEnd ?? input.value.length
        const insert = extractDigits(event.data)
        if (!insert) {
          event.preventDefault()
          return
        }
        event.preventDefault()
        const current = extractDigits(input.value)
        const nextDigits = (
          current.slice(0, countDigitsBefore(input.value, start)) +
          insert +
          current.slice(countDigitsBefore(input.value, end))
        ).slice(0, maxLength)
        applyValue(input, nextDigits, { advance: true })
      }}
      onPaste={(event) => {
        onPaste?.(event)
        if (event.defaultPrevented) return
        const text = event.clipboardData?.getData("text") ?? ""
        if (!text) return
        event.preventDefault()
        const parsed = parseBirthdayDateValue(text)
        const hasMultiple =
          Boolean(parsed.day && parsed.month) ||
          Boolean(parsed.day && parsed.year) ||
          text.includes("/") ||
          text.includes("-") ||
          text.includes(".") ||
          extractDigits(text).length > maxLength

        const input = event.currentTarget
        const control = input.closest("[data-slot=birthday-date-control]")

        if (hasMultiple && setParts) {
          setParts(parsed)
          for (const nextPart of PART_ORDER) {
            const segment = control?.querySelector<HTMLInputElement>(
              `[data-slot=${PART_SLOT[nextPart]}]`
            )
            if (!segment) continue
            const next = formatSegmentDigits(parsed[nextPart], MAX_LENGTH[nextPart])
            if (next !== segment.value) setNativeInputValue(segment, next)
          }
          const focusPart =
            parsed.year.length >= 4
              ? "year"
              : parsed.month.length >= 2
                ? "year"
                : parsed.day.length >= 2
                  ? "month"
                  : "day"
          focusSegment(control, focusPart)
          return
        }

        applyValue(input, extractDigits(text), { advance: true })
      }}
      onInput={(event) => {
        onInput?.(event)
        if (event.defaultPrevented) return
        const input = event.currentTarget
        if (value !== undefined) {
          setPart?.(part, extractDigits(input.value))
          return
        }
        applyValue(input, input.value, { advance: true })
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        if (event.key !== "Backspace") return
        const input = event.currentTarget
        const start = input.selectionStart ?? 0
        const end = input.selectionEnd ?? 0
        if (input.value.length > 0 && (start !== 0 || end !== 0)) return
        if (start !== end) return
        const index = PART_ORDER.indexOf(part)
        const prevPart = PART_ORDER[index - 1]
        if (!prevPart) return
        event.preventDefault()
        focusSegment(input.closest("[data-slot=birthday-date-control]"), prevPart)
      }}
    />
  )
}

function countDigitsBefore(value: string, caret: number) {
  let count = 0
  const end = Math.max(0, Math.min(caret, value.length))
  for (let index = 0; index < end; index += 1) {
    if (DIGIT_CHAR.test(value[index] ?? "")) count += 1
  }
  return count
}

function BirthdayDateDay(
  props: Omit<React.ComponentProps<typeof BirthdayDateSegment>, "part">
) {
  return <BirthdayDateSegment part="day" {...props} />
}

function BirthdayDateMonth(
  props: Omit<React.ComponentProps<typeof BirthdayDateSegment>, "part">
) {
  return <BirthdayDateSegment part="month" {...props} />
}

function BirthdayDateYear(
  props: Omit<React.ComponentProps<typeof BirthdayDateSegment>, "part">
) {
  return <BirthdayDateSegment part="year" {...props} />
}

function BirthdayDateDescription({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Description>) {
  return (
    <FieldPrimitive.Description
      data-slot="birthday-date-description"
      className={cn(
        "m-0 text-caption font-normal text-muted-foreground group-data-disabled/birthday-date:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function BirthdayDateError({
  className,
  children,
  match,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Error>) {
  return (
    <FieldPrimitive.Validity>
      {(validity) => {
        const isInvalid = validity.validity.valid === false
        if (!isInvalid && match !== true) {
          return null
        }

        return (
          <FieldPrimitive.Error
            data-slot="birthday-date-error"
            match={match ?? true}
            className={cn(
              "m-0 text-caption font-normal text-destructive",
              className
            )}
            {...props}
          >
            {children}
          </FieldPrimitive.Error>
        )
      }}
    </FieldPrimitive.Validity>
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
  formatBirthdayDateValue,
  parseBirthdayDateValue,
  birthdayDateControlVariants,
  birthdayDateSegmentVariants,
}
export type { BirthdayDateParts, BirthdayDatePart }
