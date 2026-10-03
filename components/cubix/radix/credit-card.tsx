"use client"

/*
  Cubix Credit Card - labeled four-group card number field specialized from Text Field.

  Four numeric segments with - separators. Values always display as Persian
  digits. inputMode is locked to numeric. Weight 400 and tracking-normal keep
  IRANSans XV readable in fixed-height controls. The control row is dir=ltr so
  groups follow international card order inside RTL pages.
*/
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const creditCardControlVariants = cva(
  "group/credit-card-control relative flex w-full min-w-0 items-center outline-none",
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

const creditCardSegmentVariants = cva(
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

type CreditCardSize = NonNullable<
  VariantProps<typeof creditCardControlVariants>["size"]
>

type CreditCardPart = "group1" | "group2" | "group3" | "group4"

type CreditCardParts = {
  group1: string
  group2: string
  group3: string
  group4: string
}

type CreditCardStore = {
  parts: CreditCardParts
  setPart: (part: CreditCardPart, digits: string) => void
  setParts: (parts: CreditCardParts) => void
}

type CreditCardContextValue = {
  size: CreditCardSize
  disabled?: boolean
  invalid?: boolean
  id?: string
  descriptionId?: string
  errorId?: string
}

const CreditCardContext = React.createContext<CreditCardContextValue | null>(
  null
)

const CreditCardSizeContext = React.createContext<CreditCardSize>("default")
const CreditCardStoreContext = React.createContext<CreditCardStore | null>(null)

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"
const DIGIT_CHAR = /[\d۰-۹٠-٩]/
const ALLOWED_INSERT = /^[\d۰-۹٠-٩]+$/
const SEGMENT_LENGTH = 4
const MAX_LENGTH: Record<CreditCardPart, number> = {
  group1: SEGMENT_LENGTH,
  group2: SEGMENT_LENGTH,
  group3: SEGMENT_LENGTH,
  group4: SEGMENT_LENGTH,
}
const PART_ORDER: CreditCardPart[] = ["group1", "group2", "group3", "group4"]
const PART_SLOT: Record<CreditCardPart, string> = {
  group1: "credit-card-group-1",
  group2: "credit-card-group-2",
  group3: "credit-card-group-3",
  group4: "credit-card-group-4",
}
const PART_LABEL: Record<CreditCardPart, string> = {
  group1: "رقم‌های ۱ تا ۴",
  group2: "رقم‌های ۵ تا ۸",
  group3: "رقم‌های ۹ تا ۱۲",
  group4: "رقم‌های ۱۳ تا ۱۶",
}
const PART_PLACEHOLDER: Record<CreditCardPart, string> = {
  group1: "",
  group2: "",
  group3: "",
  group4: "",
}
const PART_AUTOCOMPLETE: Record<CreditCardPart, string> = {
  group1: "cc-number",
  group2: "cc-number",
  group3: "cc-number",
  group4: "cc-number",
}

/** Six-digit BIN prefixes for Iranian issuer cards (شبا / شتاب). */
const CREDIT_CARD_BANK_BINS: Record<string, string> = {
  "636795": "بانک مرکزی",
  "636797": "بانک مرکزی",
  "603799": "بانک ملی",
  "170019": "بانک ملی",
  "589210": "بانک سپه",
  "604932": "بانک سپه",
  "627381": "بانک سپه",
  "639599": "بانک سپه",
  "636949": "بانک سپه",
  "639370": "بانک سپه",
  "505801": "بانک سپه",
  "603769": "بانک صادرات",
  "903769": "بانک صادرات",
  "610433": "بانک ملت",
  "991975": "بانک ملت",
  "627353": "بانک تجارت",
  "585983": "بانک تجارت",
  "628023": "بانک مسکن",
  "603770": "بانک کشاورزی",
  "639217": "بانک کشاورزی",
  "589463": "بانک رفاه کارگران",
  "627760": "پست بانک",
  "502908": "بانک توسعه تعاون",
  "627648": "بانک توسعه صادرات",
  "207177": "بانک توسعه صادرات",
  "627961": "بانک صنعت و معدن",
  "606373": "بانک قرض‌الحسنه مهر ایران",
  "504172": "بانک قرض‌الحسنه رسالت",
  "628157": "موسسه اعتباری ملل",
  "606256": "موسسه اعتباری ملل",
  "622106": "بانک پارسیان",
  "627884": "بانک پارسیان",
  "639194": "بانک پارسیان",
  "502229": "بانک پاسارگاد",
  "639347": "بانک پاسارگاد",
  "621986": "بانک سامان",
  "627412": "بانک اقتصاد نوین",
  "636214": "بانک آینده",
  "502806": "بانک شهر",
  "504706": "بانک شهر",
  "502938": "بانک دی",
  "639346": "بانک سینا",
  "639607": "بانک سرمایه",
  "505416": "بانک گردشگری",
  "505426": "بانک گردشگری",
  "505785": "بانک ایران زمین",
  "627488": "بانک کارآفرین",
  "502910": "بانک کارآفرین",
  "585947": "بانک خاورمیانه",
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

function emptyParts(): CreditCardParts {
  return { group1: "", group2: "", group3: "", group4: "" }
}

function parseCreditCardValue(value: string): CreditCardParts {
  const normalized = value.trim()
  if (!normalized) return emptyParts()

  const separators = normalized.split(/[/\-.\s]+/).filter(Boolean)
  if (separators.length >= 4) {
    return {
      group1: extractDigits(separators[0] ?? "").slice(0, SEGMENT_LENGTH),
      group2: extractDigits(separators[1] ?? "").slice(0, SEGMENT_LENGTH),
      group3: extractDigits(separators[2] ?? "").slice(0, SEGMENT_LENGTH),
      group4: extractDigits(separators[3] ?? "").slice(0, SEGMENT_LENGTH),
    }
  }

  const digits = extractDigits(normalized).slice(0, 16)
  return {
    group1: digits.slice(0, 4),
    group2: digits.slice(4, 8),
    group3: digits.slice(8, 12),
    group4: digits.slice(12, 16),
  }
}

function formatCreditCardValue(
  value: string | CreditCardParts | null | undefined
) {
  const parts =
    value == null
      ? emptyParts()
      : typeof value === "string"
        ? parseCreditCardValue(value)
        : {
            group1: extractDigits(value.group1).slice(0, SEGMENT_LENGTH),
            group2: extractDigits(value.group2).slice(0, SEGMENT_LENGTH),
            group3: extractDigits(value.group3).slice(0, SEGMENT_LENGTH),
            group4: extractDigits(value.group4).slice(0, SEGMENT_LENGTH),
          }

  if (!parts.group1 && !parts.group2 && !parts.group3 && !parts.group4) {
    return ""
  }
  return PART_ORDER.map((part) =>
    parts[part] ? toPersianDigits(parts[part]) : ""
  ).join("-")
}

function getCreditCardBankName(
  value: string | CreditCardParts | null | undefined
) {
  if (value == null) return null
  const parts =
    typeof value === "string" ? parseCreditCardValue(value) : value
  const digits = PART_ORDER.map((part) => extractDigits(parts[part] ?? "")).join(
    ""
  )
  if (digits.length < 6) return null
  const bin = digits.slice(0, 6)
  return CREDIT_CARD_BANK_BINS[bin] ?? null
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
  part: CreditCardPart,
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

function CreditCardStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [parts, setPartsState] = React.useState<CreditCardParts>(emptyParts)
  const setPart = React.useCallback((part: CreditCardPart, digits: string) => {
    setPartsState((prev) => ({
      ...prev,
      [part]: extractDigits(digits).slice(0, MAX_LENGTH[part]),
    }))
  }, [])
  const setParts = React.useCallback((next: CreditCardParts) => {
    setPartsState({
      group1: extractDigits(next.group1).slice(0, SEGMENT_LENGTH),
      group2: extractDigits(next.group2).slice(0, SEGMENT_LENGTH),
      group3: extractDigits(next.group3).slice(0, SEGMENT_LENGTH),
      group4: extractDigits(next.group4).slice(0, SEGMENT_LENGTH),
    })
  }, [])
  const store = React.useMemo(
    () => ({ parts, setPart, setParts }),
    [parts, setPart, setParts]
  )

  return (
    <CreditCardStoreContext.Provider value={store}>
      {children}
    </CreditCardStoreContext.Provider>
  )
}

function CreditCard({
  className,
  size = "default",
  name,
  disabled,
  invalid,
  id: idProp,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: CreditCardSize
  name?: string
  disabled?: boolean
  invalid?: boolean
}) {
  const reactId = React.useId()
  const id = idProp ?? reactId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  return (
    <CreditCardStoreProvider>
      <CreditCardContext.Provider
        value={{ size, disabled, invalid, id, descriptionId, errorId }}
      >
        <CreditCardSizeContext.Provider value={size}>
          <div
            data-slot="credit-card"
            data-size={size}
            data-disabled={disabled ? "" : undefined}
            data-invalid={invalid ? "" : undefined}
            className={cn(
              "group/credit-card flex w-full min-w-0 flex-col gap-2 data-disabled:cursor-not-allowed data-disabled:opacity-70",
              className
            )}
            {...props}
          >
            {name ? <CreditCardHiddenInput name={name} /> : null}
            {children}
          </div>
        </CreditCardSizeContext.Provider>
      </CreditCardContext.Provider>
    </CreditCardStoreProvider>
  )
}

function CreditCardHiddenInput({ name }: { name: string }) {
  const store = React.useContext(CreditCardStoreContext)
  const value = store ? formatCreditCardValue(store.parts) : ""

  return <input type="hidden" name={name} value={value} readOnly />
}

function CreditCardLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const ctx = React.useContext(CreditCardContext)

  return (
    <LabelPrimitive.Root
      data-slot="credit-card-label"
      htmlFor={props.htmlFor ?? ctx?.id}
      className={cn(
        "flex w-fit items-center gap-2 text-label leading-none font-normal text-foreground select-none group-data-disabled/credit-card:cursor-not-allowed group-data-disabled/credit-card:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CreditCardControl({
  className,
  size: sizeProp,
  onClick,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: CreditCardSize
}) {
  const rootSize = React.useContext(CreditCardContext)?.size
  const contextSize = React.useContext(CreditCardSizeContext)
  const size = sizeProp ?? rootSize ?? contextSize

  return (
    <div
      data-slot="credit-card-control"
      data-size={size}
      dir="ltr"
      className={cn(creditCardControlVariants({ size }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if ((event.target as HTMLElement).closest("button,a,input,textarea")) {
          return
        }
        const first = event.currentTarget.querySelector<HTMLInputElement>(
          "[data-slot=credit-card-group-1]"
        )
        const target =
          first && !first.value
            ? first
            : event.currentTarget.querySelector<HTMLInputElement>(
                "[data-credit-card-segment]:not([disabled])"
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

function CreditCardSeparator({
  className,
  children = "-",
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="credit-card-separator"
      aria-hidden="true"
      className={cn(
        "shrink-0 select-none text-label font-normal text-muted-foreground group-data-disabled/credit-card:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

function CreditCardSegment({
  part,
  className,
  size: sizeProp,
  id,
  disabled,
  autoComplete,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
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
  part: CreditCardPart
  size?: CreditCardSize
}) {
  const ctx = React.useContext(CreditCardContext)
  const contextSize = React.useContext(CreditCardSizeContext)
  const size = sizeProp ?? ctx?.size ?? contextSize
  const store = React.useContext(CreditCardStoreContext)
  const isInvalid = ariaInvalid ?? ctx?.invalid
  const describedBy = [
    ariaDescribedby,
    ctx?.descriptionId,
    isInvalid ? ctx?.errorId : null,
  ]
    .filter(Boolean)
    .join(" ")
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
        focusSegment(
          input.closest("[data-slot=credit-card-control]"),
          nextPart,
          { select: true }
        )
      }
    }
  }

  return (
    <input
      data-slot={PART_SLOT[part]}
      data-credit-card-segment=""
      data-size={size}
      data-part={part}
      aria-label={ariaLabel ?? PART_LABEL[part]}
      placeholder={placeholder ?? PART_PLACEHOLDER[part]}
      className={cn(creditCardSegmentVariants({ size }), className)}
      {...props}
      id={id ?? (part === "group1" ? ctx?.id : undefined)}
      disabled={disabled ?? ctx?.disabled}
      aria-invalid={isInvalid || undefined}
      aria-describedby={describedBy || undefined}
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
              event.currentTarget.closest("[data-slot=credit-card-control]"),
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
        const parsed = parseCreditCardValue(text)
        const hasMultiple =
          Boolean(parsed.group1 && parsed.group2) ||
          text.includes("-") ||
          text.includes(" ") ||
          extractDigits(text).length > maxLength

        const input = event.currentTarget
        const control = input.closest("[data-slot=credit-card-control]")

        if (hasMultiple && setParts) {
          setParts(parsed)
          for (const nextPart of PART_ORDER) {
            const segment = control?.querySelector<HTMLInputElement>(
              `[data-slot=${PART_SLOT[nextPart]}]`
            )
            if (!segment) continue
            const next = formatSegmentDigits(
              parsed[nextPart],
              MAX_LENGTH[nextPart]
            )
            if (next !== segment.value) setNativeInputValue(segment, next)
          }
          const focusPart =
            parsed.group4.length >= SEGMENT_LENGTH
              ? "group4"
              : parsed.group3.length >= SEGMENT_LENGTH
                ? "group4"
                : parsed.group2.length >= SEGMENT_LENGTH
                  ? "group3"
                  : parsed.group1.length >= SEGMENT_LENGTH
                    ? "group2"
                    : "group1"
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
        focusSegment(
          input.closest("[data-slot=credit-card-control]"),
          prevPart
        )
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

function CreditCardGroup1(
  props: Omit<React.ComponentProps<typeof CreditCardSegment>, "part">
) {
  return <CreditCardSegment part="group1" {...props} />
}

function CreditCardGroup2(
  props: Omit<React.ComponentProps<typeof CreditCardSegment>, "part">
) {
  return <CreditCardSegment part="group2" {...props} />
}

function CreditCardGroup3(
  props: Omit<React.ComponentProps<typeof CreditCardSegment>, "part">
) {
  return <CreditCardSegment part="group3" {...props} />
}

function CreditCardGroup4(
  props: Omit<React.ComponentProps<typeof CreditCardSegment>, "part">
) {
  return <CreditCardSegment part="group4" {...props} />
}

function CreditCardDescription({
  className,
  id,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const ctx = React.useContext(CreditCardContext)
  const store = React.useContext(CreditCardStoreContext)
  const bankName = store ? getCreditCardBankName(store.parts) : null
  const content = bankName ?? children

  if (content == null || content === false) {
    return null
  }

  return (
    <p
      data-slot="credit-card-description"
      id={id ?? ctx?.descriptionId}
      className={cn(
        "m-0 text-caption font-normal text-muted-foreground group-data-disabled/credit-card:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {content}
    </p>
  )
}

function CreditCardError({
  className,
  id,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = React.useContext(CreditCardContext)

  if (!children) {
    return null
  }

  if (ctx && !ctx.invalid) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="credit-card-error"
      id={id ?? ctx?.errorId}
      className={cn(
        "m-0 text-caption font-normal text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </div>
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
  formatCreditCardValue,
  parseCreditCardValue,
  getCreditCardBankName,
  creditCardControlVariants,
  creditCardSegmentVariants,
}
export type { CreditCardParts, CreditCardPart }
