"use client"

/*
  Cubix Amount Field - labeled amount input specialized from Text Field.

  type stays text with inputMode numeric; values always display as Persian
  digits with thousand separators (٬). AmountFieldCurrency accepts only
  تومان or ریال. Optional amountInWords on the description spells the
  amount and flips تومان ↔ ریال (×10 / ÷10).
  text-right keeps amounts readable in RTL. Weight 400 and tracking-normal
  keep IRANSans XV readable. Icons use data-icon like Button.
*/
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  TextField as AriaAmountField,
  FieldError as AriaFieldError,
  Input as AriaInput,
  Label as AriaLabel,
  Text as AriaText,
} from "react-aria-components"

import { cn } from "@/lib/utils"

/*
  Icon-side inline padding matches Button / vertical icon inset:
  default: 8px · lg: 12px
*/

const amountFieldControlVariants = cva(
  "group/amount-field-control relative flex w-full min-w-0 items-center rounded-lg border border-input bg-transparent transition-colors outline-none has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-muted has-[[data-slot=amount-field-input]:focus-visible]:border-primary has-[[data-slot=amount-field-input]:focus-visible]:ring-3 has-[[data-slot=amount-field-input]:focus-visible]:ring-primary/20 has-[[data-slot=amount-field-input]:focus-visible]:ring-offset-1 has-[[data-slot=amount-field-input]:focus-visible]:ring-offset-background has-[[data-slot=amount-field-input][aria-invalid=true]]:border-destructive has-[[data-slot=amount-field-input][aria-invalid=true]]:ring-0 has-[[data-slot=amount-field-input][aria-invalid=true]:focus-visible]:border-destructive has-[[data-slot=amount-field-input][aria-invalid=true]:focus-visible]:ring-0 dark:bg-input/30 dark:has-disabled:bg-muted dark:has-[[data-slot=amount-field-input][aria-invalid=true]]:border-destructive/50 dark:has-[[data-slot=amount-field-input][aria-invalid=true]:focus-visible]:border-destructive/50 dark:has-[[data-slot=amount-field-input][aria-invalid=true]:focus-visible]:ring-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg]:text-muted-foreground [&_[data-icon]]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        default:
          "h-10 gap-2 px-3 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg:not([class*='size-'])]:size-6",
        lg: "h-12 gap-2.5 px-3.5 has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const amountFieldInputVariants = cva(
  "w-full min-w-0 rounded-lg border border-input bg-transparent text-right font-normal leading-none tracking-normal text-foreground transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-description file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-transparent disabled:bg-muted disabled:text-muted-foreground disabled:placeholder:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-0 dark:bg-input/30 dark:disabled:bg-muted dark:aria-invalid:border-destructive/50 dark:aria-invalid:focus-visible:border-destructive/50",
  {
    variants: {
      size: {
        default: "h-10 px-3 text-label md:text-label",
        lg: "h-12 px-3.5 text-label md:text-label",
      },
      inControl: {
        true: "h-full flex-1 rounded-none border-0 bg-transparent p-0 shadow-none ring-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 aria-invalid:border-0 aria-invalid:ring-0 aria-invalid:ring-offset-0 disabled:bg-transparent dark:bg-transparent dark:disabled:bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      inControl: false,
    },
  }
)

type AmountFieldSize = NonNullable<
  VariantProps<typeof amountFieldInputVariants>["size"]
>

type AmountFieldCurrencyUnit = "تومان" | "ریال"

type AmountFieldStore = {
  digits: string
  currency: AmountFieldCurrencyUnit | ""
  setDigits: (digits: string) => void
  setCurrency: (currency: AmountFieldCurrencyUnit | "") => void
}

const AmountFieldSizeContext = React.createContext<AmountFieldSize>("default")
const AmountFieldControlContext = React.createContext(false)
const AmountFieldStoreContext = React.createContext<AmountFieldStore | null>(null)

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"
const THOUSANDS_SEP = "٬"
const AMOUNT_DIGIT = /[\d۰-۹٠-٩]/
const AMOUNT_ALLOWED_INSERT = /^[\d۰-۹٠-٩]+$/

const ONES = [
  "",
  "یک",
  "دو",
  "سه",
  "چهار",
  "پنج",
  "شش",
  "هفت",
  "هشت",
  "نه",
]
const TEENS = [
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
]
const TENS = [
  "",
  "",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
]
const HUNDREDS = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
]
const SCALES = ["", "هزار", "میلیون", "میلیارد", "تریلیون"]

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

function extractAmountDigits(value: string) {
  return toLatinDigits(value).replace(/\D/g, "")
}

function formatAmountFieldValue(value: string | number) {
  const digits = extractAmountDigits(String(value))
  if (!digits) return ""
  const normalized = digits.replace(/^0+(?=\d)/, "")
  const grouped = normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return toPersianDigits(grouped).replace(/,/g, THOUSANDS_SEP)
}

function parseAmountFieldValue(value: string) {
  const digits = extractAmountDigits(value)
  if (!digits) return Number.NaN
  return Number(digits)
}

function threeDigitsToWords(value: number) {
  const parts: string[] = []
  const hundreds = Math.floor(value / 100)
  const remainder = value % 100
  if (hundreds > 0) {
    parts.push(HUNDREDS[hundreds] ?? "")
  }
  if (remainder >= 10 && remainder < 20) {
    parts.push(TEENS[remainder - 10] ?? "")
  } else {
    const tens = Math.floor(remainder / 10)
    const ones = remainder % 10
    if (tens > 0) parts.push(TENS[tens] ?? "")
    if (ones > 0) parts.push(ONES[ones] ?? "")
  }
  return parts.filter(Boolean).join(" و ")
}

function numberToPersianWordsFromDigits(digits: string) {
  const normalized = digits.replace(/^0+(?=\d)/, "") || "0"
  if (normalized === "0") return "صفر"

  const groups: number[] = []
  for (let end = normalized.length; end > 0; end -= 3) {
    const start = Math.max(0, end - 3)
    groups.push(Number(normalized.slice(start, end)))
  }

  const parts: string[] = []
  for (let index = groups.length - 1; index >= 0; index -= 1) {
    const group = groups[index] ?? 0
    if (group === 0) continue
    const scale = SCALES[index] ?? ""
    if (!scale) {
      parts.push(threeDigitsToWords(group))
      continue
    }
    // Native Persian: 1000 is "هزار", not "یک هزار"
    if (group === 1 && scale === "هزار") {
      parts.push("هزار")
      continue
    }
    if (group === 1) {
      parts.push(`یک ${scale}`)
      continue
    }
    parts.push(`${threeDigitsToWords(group)} ${scale}`)
  }
  return parts.join(" و ")
}

function formatAmountFieldAmountInWords(
  amount: number | string,
  currency: AmountFieldCurrencyUnit | ""
) {
  const digits =
    typeof amount === "string"
      ? extractAmountDigits(amount).replace(/^0+(?=\d)/, "") || ""
      : Number.isFinite(amount) && amount >= 0
        ? String(Math.trunc(amount))
        : ""
  if (!digits) return ""

  if (currency === "تومان") {
    // 1 تومان = 10 ریال (append zero, avoid Number precision loss)
    return `${numberToPersianWordsFromDigits(`${digits}0`)} ریال`
  }
  if (currency === "ریال") {
    // 10 ریال = 1 تومان
    const tomans =
      digits.length <= 1
        ? "0"
        : digits.slice(0, -1).replace(/^0+(?=\d)/, "") || "0"
    return `${numberToPersianWordsFromDigits(tomans)} تومان`
  }
  return ""
}

function countDigitsBefore(value: string, caret: number) {
  let count = 0
  const end = Math.max(0, Math.min(caret, value.length))
  for (let index = 0; index < end; index += 1) {
    if (AMOUNT_DIGIT.test(value[index] ?? "")) count += 1
  }
  return count
}

function caretFromDigitCount(value: string, digitCount: number) {
  if (digitCount <= 0) return 0
  let seen = 0
  for (let index = 0; index < value.length; index += 1) {
    if (AMOUNT_DIGIT.test(value[index] ?? "")) {
      seen += 1
      if (seen >= digitCount) return index + 1
    }
  }
  return value.length
}

function setAmountFieldInputValue(input: HTMLInputElement, next: string) {
  const descriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )
  descriptor?.set?.call(input, next)
  input.dispatchEvent(new Event("input", { bubbles: true }))
  input.dispatchEvent(new Event("change", { bubbles: true }))
}

function normalizeAmountPropValue(
  value: string | number | readonly string[] | undefined | null
): string | undefined {
  if (value == null) return undefined
  if (typeof value === "object") {
    const first = value[0]
    return first == null ? undefined : formatAmountFieldValue(first)
  }
  return formatAmountFieldValue(value)
}

function AmountFieldStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [digits, setDigits] = React.useState("")
  const [currency, setCurrency] = React.useState<AmountFieldCurrencyUnit | "">(
    ""
  )
  const store = React.useMemo(
    () => ({ digits, currency, setDigits, setCurrency }),
    [digits, currency]
  )

  return (
    <AmountFieldStoreContext.Provider value={store}>
      {children}
    </AmountFieldStoreContext.Provider>
  )
}

function AmountField({
  className,
  size = "default",
  disabled,
  invalid,
  isDisabled,
  isInvalid,
  ...props
}: Omit<
  React.ComponentProps<typeof AriaAmountField>,
  "className" | "isDisabled" | "isInvalid"
> & {
  className?: string
  size?: AmountFieldSize
  disabled?: boolean
  invalid?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
}) {
  return (
    <AmountFieldStoreProvider>
      <AmountFieldSizeContext.Provider value={size}>
        <AriaAmountField
          data-slot="amount-field"
          data-size={size}
          isDisabled={disabled ?? isDisabled}
          isInvalid={invalid ?? isInvalid}
          className={cn(
            "group/amount-field flex w-full flex-col gap-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
            className
          )}
          {...props}
        />
      </AmountFieldSizeContext.Provider>
    </AmountFieldStoreProvider>
  )
}

function AmountFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof AriaLabel>) {
  return (
    <AriaLabel
      data-slot="amount-field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-label leading-none font-normal text-foreground select-none group-data-[disabled]/amount-field:cursor-not-allowed group-data-[disabled]/amount-field:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function AmountFieldControl({
  className,
  size: sizeProp,
  onClick,
  ...props
}: React.ComponentProps<"div"> & {
  size?: AmountFieldSize
}) {
  const size = sizeProp ?? React.useContext(AmountFieldSizeContext)

  return (
    <AmountFieldControlContext.Provider value={true}>
      <div
        data-slot="amount-field-control"
        data-size={size}
        className={cn(amountFieldControlVariants({ size }), className)}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          if ((event.target as HTMLElement).closest("button,a,input,textarea")) {
            return
          }
          const input = event.currentTarget.querySelector<HTMLInputElement>(
            "[data-slot=amount-field-input]"
          )
          if (!input || input.disabled || input.readOnly) return
          input.focus()
        }}
        {...props}
      />
    </AmountFieldControlContext.Provider>
  )
}

function AmountFieldInput({
  className,
  size: sizeProp,
  autoComplete = "off",
  onBeforeInput,
  onPaste,
  onInput,
  defaultValue,
  value,
  ...props
}: Omit<
  React.ComponentProps<typeof AriaInput>,
  "size" | "type" | "className" | "inputMode" | "spellCheck"
> & {
  className?: string
  size?: AmountFieldSize
}) {
  const size = sizeProp ?? React.useContext(AmountFieldSizeContext)
  const inControl = React.useContext(AmountFieldControlContext)
  const store = React.useContext(AmountFieldStoreContext)
  const persianDefault =
    defaultValue === undefined
      ? undefined
      : normalizeAmountPropValue(defaultValue)
  const persianValue =
    value === undefined ? undefined : normalizeAmountPropValue(value)

  const setDigits = store?.setDigits

  React.useLayoutEffect(() => {
    if (value === undefined) return
    setDigits?.(extractAmountDigits(String(persianValue ?? "")))
  }, [value, persianValue, setDigits])

  React.useLayoutEffect(() => {
    if (value !== undefined) return
    setDigits?.(extractAmountDigits(String(persianDefault ?? "")))
  }, [value, persianDefault, setDigits])

  const applyFormattedValue = (
    input: HTMLInputElement,
    raw: string,
    caret: number | null
  ) => {
    const digitCount =
      caret == null ? null : countDigitsBefore(raw, caret)
    const next = formatAmountFieldValue(raw)
    store?.setDigits(extractAmountDigits(next))
    if (next === input.value) return
    setAmountFieldInputValue(input, next)
    if (digitCount == null) return
    const nextCaret = caretFromDigitCount(next, digitCount)
    requestAnimationFrame(() => {
      input.setSelectionRange(nextCaret, nextCaret)
    })
  }

  return (
    <AriaInput
      data-slot="amount-field-input"
      data-size={size}
      className={cn(amountFieldInputVariants({ size, inControl }), className)}
      {...props}
      type="text"
      inputMode="numeric"
      autoComplete={autoComplete}
      spellCheck={false}
      defaultValue={persianDefault}
      value={persianValue}
      onBeforeInput={(event) => {
        onBeforeInput?.(event)
        if (event.defaultPrevented) return
        if (typeof event.data !== "string" || event.data.length === 0) return
        if (!AMOUNT_ALLOWED_INSERT.test(event.data)) {
          event.preventDefault()
          return
        }
        const persian = toPersianDigits(event.data)
        if (persian === event.data) return
        event.preventDefault()
        const input = event.currentTarget
        const start = input.selectionStart ?? input.value.length
        const end = input.selectionEnd ?? input.value.length
        const raw =
          input.value.slice(0, start) + persian + input.value.slice(end)
        applyFormattedValue(input, raw, start + persian.length)
      }}
      onPaste={(event) => {
        onPaste?.(event)
        if (event.defaultPrevented) return
        const text = event.clipboardData?.getData("text") ?? ""
        const digits = extractAmountDigits(text)
        if (!digits) {
          if (text.length > 0) event.preventDefault()
          return
        }
        event.preventDefault()
        const input = event.currentTarget
        const start = input.selectionStart ?? input.value.length
        const end = input.selectionEnd ?? input.value.length
        const raw =
          input.value.slice(0, start) + digits + input.value.slice(end)
        applyFormattedValue(input, raw, start + digits.length)
      }}
      onInput={(event) => {
        onInput?.(event)
        if (event.defaultPrevented) return
        const input = event.currentTarget
        if (value !== undefined) {
          store?.setDigits(extractAmountDigits(input.value))
          return
        }
        applyFormattedValue(
          input,
          input.value,
          input.selectionStart ?? input.value.length
        )
      }}
    />
  )
}

function AmountFieldCurrency({
  className,
  unit,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  unit: AmountFieldCurrencyUnit
}) {
  const store = React.useContext(AmountFieldStoreContext)
  const setCurrency = store?.setCurrency

  React.useLayoutEffect(() => {
    setCurrency?.(unit)
    return () => {
      setCurrency?.("")
    }
  }, [unit, setCurrency])

  return (
    <span
      data-slot="amount-field-currency"
      data-icon="inline-end"
      className={cn(
        "shrink-0 select-none text-caption font-normal text-muted-foreground",
        className
      )}
      {...props}
    >
      {unit}
    </span>
  )
}

function AmountFieldDescription({
  className,
  amountInWords = false,
  children,
  ...props
}: Omit<React.ComponentProps<typeof AriaText>, "slot" | "className"> & {
  className?: string
  amountInWords?: boolean
}) {
  const store = React.useContext(AmountFieldStoreContext)
  const words =
    amountInWords && store?.digits
      ? formatAmountFieldAmountInWords(store.digits, store.currency)
      : ""
  const content = amountInWords ? words || children : children

  if (content == null || content === "") {
    return null
  }

  return (
    <AriaText
      slot="description"
      data-slot="amount-field-description"
      className={cn(
        "m-0 text-caption font-normal text-muted-foreground group-data-[disabled]/amount-field:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {content}
    </AriaText>
  )
}

function AmountFieldError({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AriaFieldError>, "className"> & {
  className?: string
}) {
  return (
    <AriaFieldError
      data-slot="amount-field-error"
      className={cn(
        "m-0 text-caption font-normal text-destructive",
        className
      )}
      {...props}
    />
  )
}

export {
  AmountField,
  AmountFieldLabel,
  AmountFieldControl,
  AmountFieldInput,
  AmountFieldCurrency,
  AmountFieldDescription,
  AmountFieldError,
  formatAmountFieldValue,
  parseAmountFieldValue,
  formatAmountFieldAmountInWords,
  amountFieldControlVariants,
  amountFieldInputVariants,
}
export type { AmountFieldCurrencyUnit }
