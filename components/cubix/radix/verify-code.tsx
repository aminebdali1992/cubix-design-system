"use client"

/*
  Cubix Verify Code - labeled one-time code field specialized from Text Field.

  Separate single-digit input boxes. Box count is set with length (default 6).
  Pass groups (for example [3, 3]) to insert - separators between digit groups.
  Values always display as Persian digits. inputMode is locked to numeric.
  Weight 400 and tracking-normal keep IRANSans XV readable in fixed-height
  controls. The control row is dir=ltr so digits follow left-to-right order
  inside RTL pages.
*/
import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const DEFAULT_LENGTH = 6
const MIN_LENGTH = 4
const MAX_LENGTH = 8
const DIGIT_LENGTH = 1
const DEFAULT_RESEND_DURATION = 60

const DEFAULT_WAITING_LABEL = "زمان باقی‌مانده تا دریافت کد مجدد"
const DEFAULT_EXPIRED_LABEL = "دریافت مجدد کد تایید"
const DEFAULT_RESEND_LABEL = "دریافت مجدد"

const verifyCodeControlVariants = cva(
  "group/verify-code-control relative flex w-full min-w-0 items-center outline-none",
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

const verifyCodeDigitVariants = cva(
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

type VerifyCodeSize = NonNullable<
  VariantProps<typeof verifyCodeControlVariants>["size"]
>

type VerifyCodeStore = {
  length: number
  digits: string[]
  setDigit: (index: number, digit: string) => void
  setDigits: (digits: string[]) => void
}

type VerifyCodeContextValue = {
  size: VerifyCodeSize
  length: number
  groups: number[] | null
  disabled?: boolean
  invalid?: boolean
  id: string
  descriptionId: string
  errorId: string
}

const VerifyCodeSizeContext = React.createContext<VerifyCodeSize>("default")
const VerifyCodeStoreContext = React.createContext<VerifyCodeStore | null>(null)
const VerifyCodeContext = React.createContext<VerifyCodeContextValue | null>(
  null
)

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"
const ALLOWED_INSERT = /^[\d۰-۹٠-٩]+$/

function clampLength(length: number) {
  if (!Number.isFinite(length)) return DEFAULT_LENGTH
  return Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, Math.floor(length)))
}

function normalizeGroups(
  groups: number[] | undefined,
  length: number
): number[] | null {
  if (!groups || groups.length < 2) return null
  const normalized = groups
    .map((group) => Math.floor(group))
    .filter((group) => Number.isFinite(group) && group > 0)
  if (normalized.length < 2) return null
  const sum = normalized.reduce((total, group) => total + group, 0)
  if (sum !== length) return null
  return normalized
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

function emptyDigits(length: number) {
  return Array.from({ length }, () => "")
}

function parseVerifyCodeValue(
  value: string | null | undefined,
  length: number = DEFAULT_LENGTH
) {
  const size = clampLength(length)
  const digits = extractDigits(value ?? "").slice(0, size)
  return Array.from({ length: size }, (_, index) => digits[index] ?? "")
}

function formatVerifyCodeValue(
  value: string | string[] | null | undefined,
  length: number = DEFAULT_LENGTH
) {
  const size = clampLength(length)
  const digits =
    value == null
      ? emptyDigits(size)
      : Array.isArray(value)
        ? Array.from(
            { length: size },
            (_, index) => extractDigits(value[index] ?? "").slice(0, DIGIT_LENGTH)
          )
        : parseVerifyCodeValue(value, size)

  if (digits.every((digit) => !digit)) return ""
  return digits.map((digit) => (digit ? toPersianDigits(digit) : "")).join("")
}

function formatDigitDisplay(digit: string) {
  const clipped = extractDigits(digit).slice(0, DIGIT_LENGTH)
  return clipped ? toPersianDigits(clipped) : ""
}

function digitAriaLabel(index: number) {
  return `رقم ${toPersianDigits(String(index + 1))}`
}

function focusDigit(
  control: Element | null,
  index: number,
  options?: { select?: boolean }
) {
  const input = control?.querySelector<HTMLInputElement>(
    `[data-slot=verify-code-digit][data-index="${index}"]`
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

function VerifyCodeStoreProvider({
  length,
  defaultValue,
  value,
  onValueChange,
  children,
}: {
  length: number
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}) {
  const isControlled = value !== undefined
  const [uncontrolledDigits, setUncontrolledDigits] = React.useState(() =>
    parseVerifyCodeValue(defaultValue, length)
  )

  React.useEffect(() => {
    if (isControlled) return
    setUncontrolledDigits((prev) => {
      if (prev.length === length) return prev
      return Array.from({ length }, (_, index) => prev[index] ?? "")
    })
  }, [isControlled, length])

  const digits = isControlled
    ? parseVerifyCodeValue(value, length)
    : uncontrolledDigits.length === length
      ? uncontrolledDigits
      : Array.from({ length }, (_, index) => uncontrolledDigits[index] ?? "")

  const digitsRef = React.useRef(digits)
  digitsRef.current = digits

  const commitDigits = React.useCallback(
    (next: string[]) => {
      const normalized = Array.from(
        { length },
        (_, index) => extractDigits(next[index] ?? "").slice(0, DIGIT_LENGTH)
      )
      if (!isControlled) {
        setUncontrolledDigits(normalized)
      }
      onValueChange?.(formatVerifyCodeValue(normalized, length))
    },
    [isControlled, length, onValueChange]
  )

  const setDigit = React.useCallback(
    (index: number, digit: string) => {
      if (index < 0 || index >= length) return
      const next = digitsRef.current.map((current, currentIndex) =>
        currentIndex === index
          ? extractDigits(digit).slice(0, DIGIT_LENGTH)
          : current
      )
      commitDigits(next)
    },
    [commitDigits, length]
  )

  const setDigits = React.useCallback(
    (next: string[]) => {
      commitDigits(next)
    },
    [commitDigits]
  )

  const store = React.useMemo(
    () => ({ length, digits, setDigit, setDigits }),
    [length, digits, setDigit, setDigits]
  )

  return (
    <VerifyCodeStoreContext.Provider value={store}>
      {children}
    </VerifyCodeStoreContext.Provider>
  )
}

function VerifyCode({
  className,
  size = "default",
  length: lengthProp = DEFAULT_LENGTH,
  groups: groupsProp,
  name,
  defaultValue,
  value,
  onValueChange,
  disabled,
  invalid,
  id: idProp,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: VerifyCodeSize
  length?: number
  groups?: number[]
  name?: string
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  invalid?: boolean
}) {
  const length = clampLength(lengthProp)
  const groups = normalizeGroups(groupsProp, length)
  const reactId = React.useId()
  const id = idProp ?? reactId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  return (
    <VerifyCodeStoreProvider
      length={length}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <VerifyCodeContext.Provider
        value={{
          size,
          length,
          groups,
          disabled,
          invalid,
          id,
          descriptionId,
          errorId,
        }}
      >
        <VerifyCodeSizeContext.Provider value={size}>
          <div
            data-slot="verify-code"
            data-size={size}
            data-length={length}
            data-disabled={disabled ? "" : undefined}
            data-invalid={invalid ? "" : undefined}
            className={cn(
              "group/verify-code flex w-full min-w-0 flex-col gap-2 data-disabled:cursor-not-allowed data-disabled:opacity-70",
              className
            )}
            {...props}
          >
            {name ? <VerifyCodeHiddenInput name={name} /> : null}
            {children}
          </div>
        </VerifyCodeSizeContext.Provider>
      </VerifyCodeContext.Provider>
    </VerifyCodeStoreProvider>
  )
}

function VerifyCodeHiddenInput({ name }: { name: string }) {
  const store = React.useContext(VerifyCodeStoreContext)
  const value = store
    ? formatVerifyCodeValue(store.digits, store.length)
    : ""

  return <input type="hidden" name={name} value={value} readOnly />
}

function VerifyCodeLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const ctx = React.useContext(VerifyCodeContext)

  return (
    <LabelPrimitive.Root
      data-slot="verify-code-label"
      htmlFor={props.htmlFor ?? ctx?.id}
      className={cn(
        "flex w-fit items-center gap-2 text-label leading-none font-normal text-foreground select-none group-data-disabled/verify-code:cursor-not-allowed group-data-disabled/verify-code:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function renderVerifyCodeDigits(
  length: number,
  groups: number[] | null,
  digitClassName?: string
) {
  if (!groups) {
    return Array.from({ length }, (_, index) => (
      <VerifyCodeDigit key={index} index={index} className={digitClassName} />
    ))
  }

  const nodes: React.ReactNode[] = []
  let index = 0

  groups.forEach((groupSize, groupIndex) => {
    if (groupIndex > 0) {
      nodes.push(<VerifyCodeSeparator key={`sep-${groupIndex}`} />)
    }
    for (let offset = 0; offset < groupSize; offset += 1) {
      nodes.push(
        <VerifyCodeDigit
          key={index}
          index={index}
          className={digitClassName}
        />
      )
      index += 1
    }
  })

  return nodes
}

function VerifyCodeControl({
  className,
  size: sizeProp,
  digitClassName,
  onClick,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: VerifyCodeSize
  digitClassName?: string
}) {
  const ctx = React.useContext(VerifyCodeContext)
  const contextSize = React.useContext(VerifyCodeSizeContext)
  const size = sizeProp ?? ctx?.size ?? contextSize
  const length = ctx?.length ?? DEFAULT_LENGTH
  const groups = ctx?.groups ?? null

  return (
    <div
      data-slot="verify-code-control"
      data-size={size}
      dir="ltr"
      className={cn(verifyCodeControlVariants({ size }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if ((event.target as HTMLElement).closest("button,a,input,textarea")) {
          return
        }
        const inputs = Array.from(
          event.currentTarget.querySelectorAll<HTMLInputElement>(
            "[data-slot=verify-code-digit]:not([disabled])"
          )
        )
        const firstEmpty = inputs.find((input) => !input.value)
        const target = firstEmpty ?? inputs[0]
        if (!target || target.disabled || target.readOnly) return
        target.focus()
      }}
      {...props}
    >
      {children ?? renderVerifyCodeDigits(length, groups, digitClassName)}
    </div>
  )
}

function VerifyCodeSeparator({
  className,
  children = "-",
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="verify-code-separator"
      aria-hidden="true"
      className={cn(
        "shrink-0 select-none text-label font-normal text-muted-foreground group-data-disabled/verify-code:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

function VerifyCodeDigit({
  index,
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
  ...props
}: Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "inputMode" | "spellCheck" | "maxLength" | "value" | "defaultValue"
> & {
  index: number
  size?: VerifyCodeSize
}) {
  const ctx = React.useContext(VerifyCodeContext)
  const contextSize = React.useContext(VerifyCodeSizeContext)
  const size = sizeProp ?? ctx?.size ?? contextSize
  const store = React.useContext(VerifyCodeStoreContext)
  const isInvalid = ariaInvalid ?? ctx?.invalid
  const describedBy = [
    ariaDescribedby,
    ctx?.descriptionId,
    isInvalid ? ctx?.errorId : null,
  ]
    .filter(Boolean)
    .join(" ")
  const length = store?.length ?? ctx?.length ?? DEFAULT_LENGTH
  const digitValue = store?.digits[index] ?? ""
  const displayValue = formatDigitDisplay(digitValue)

  const setDigit = store?.setDigit
  const setDigits = store?.setDigits

  const applyDigit = (
    input: HTMLInputElement,
    rawDigits: string,
    options?: { advance?: boolean }
  ) => {
    const nextDigits = extractDigits(rawDigits).slice(0, DIGIT_LENGTH)
    setDigit?.(index, nextDigits)
    if (options?.advance && nextDigits.length >= DIGIT_LENGTH) {
      if (index + 1 < length) {
        focusDigit(
          input.closest("[data-slot=verify-code-control]"),
          index + 1,
          { select: true }
        )
      }
    }
  }

  return (
    <input
      data-slot="verify-code-digit"
      data-verify-code-digit=""
      data-size={size}
      data-index={index}
      id={id ?? (index === 0 ? ctx?.id : undefined)}
      aria-label={ariaLabel ?? digitAriaLabel(index)}
      aria-describedby={describedBy || undefined}
      placeholder={placeholder ?? ""}
      className={cn(verifyCodeDigitVariants({ size }), className)}
      {...props}
      disabled={disabled ?? ctx?.disabled}
      aria-invalid={isInvalid || undefined}
      type="text"
      inputMode="numeric"
      size={1}
      autoComplete={autoComplete ?? (index === 0 ? "one-time-code" : "off")}
      spellCheck={false}
      maxLength={DIGIT_LENGTH}
      value={displayValue}
      onBeforeInput={(event) => {
        onBeforeInput?.(event)
        if (event.defaultPrevented) return
        if (typeof event.data !== "string" || event.data.length === 0) return
        if (!ALLOWED_INSERT.test(event.data)) {
          event.preventDefault()
          return
        }
        const input = event.currentTarget
        const insert = extractDigits(event.data)
        if (!insert) {
          event.preventDefault()
          return
        }
        event.preventDefault()

        if (insert.length > 1 && setDigits) {
          const control = input.closest("[data-slot=verify-code-control]")
          const current = store?.digits ?? emptyDigits(length)
          const merged = extractDigits(
            current.slice(0, index).join("") + insert
          ).slice(0, length)
          const next = Array.from(
            { length },
            (_, digitIndex) => merged[digitIndex] ?? ""
          )
          setDigits(next)
          const focusIndex = Math.min(merged.length, length - 1)
          focusDigit(control, focusIndex, { select: true })
          return
        }

        applyDigit(input, insert.slice(-DIGIT_LENGTH), { advance: true })
      }}
      onPaste={(event) => {
        onPaste?.(event)
        if (event.defaultPrevented) return
        const text = event.clipboardData?.getData("text") ?? ""
        if (!text) return
        event.preventDefault()
        const parsed = parseVerifyCodeValue(text, length)
        const input = event.currentTarget
        const control = input.closest("[data-slot=verify-code-control]")

        if (extractDigits(text).length > DIGIT_LENGTH && setDigits) {
          setDigits(parsed)
          const filled = parsed.findIndex((digit) => !digit)
          const focusIndex =
            filled === -1 ? length - 1 : Math.max(0, filled)
          focusDigit(control, focusIndex, { select: true })
          return
        }

        applyDigit(input, extractDigits(text), { advance: true })
      }}
      onInput={(event) => {
        onInput?.(event)
        if (event.defaultPrevented) return
        const input = event.currentTarget
        applyDigit(input, input.value, { advance: true })
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        const input = event.currentTarget
        const control = input.closest("[data-slot=verify-code-control]")

        if (event.key === "ArrowLeft") {
          if (index <= 0) return
          event.preventDefault()
          focusDigit(control, index - 1, { select: true })
          return
        }

        if (event.key === "ArrowRight") {
          if (index >= length - 1) return
          event.preventDefault()
          focusDigit(control, index + 1, { select: true })
          return
        }

        if (event.key !== "Backspace") return
        const start = input.selectionStart ?? 0
        const end = input.selectionEnd ?? 0
        if (input.value.length > 0 && (start !== 0 || end !== 0)) {
          return
        }
        if (start !== end) return
        if (input.value.length > 0) {
          event.preventDefault()
          applyDigit(input, "")
          return
        }
        if (index <= 0) return
        event.preventDefault()
        const prev = store?.digits[index - 1] ?? ""
        if (prev) {
          setDigit?.(index - 1, "")
        }
        focusDigit(control, index - 1)
      }}
    />
  )
}

function VerifyCodeDescription({
  className,
  id,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const ctx = React.useContext(VerifyCodeContext)

  if (children == null || children === false) {
    return null
  }

  return (
    <p
      data-slot="verify-code-description"
      id={id ?? ctx?.descriptionId}
      className={cn(
        "m-0 text-caption font-normal text-muted-foreground group-data-disabled/verify-code:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

function formatVerifyCodeTimer(totalSeconds: number) {
  const clamped = Math.max(0, Math.floor(totalSeconds))
  const minutes = Math.floor(clamped / 60)
  const seconds = clamped % 60
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  return toPersianDigits(display)
}

function VerifyCodeResend({
  className,
  duration = DEFAULT_RESEND_DURATION,
  waitingLabel = DEFAULT_WAITING_LABEL,
  expiredLabel = DEFAULT_EXPIRED_LABEL,
  resendLabel = DEFAULT_RESEND_LABEL,
  onResend,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  duration?: number
  waitingLabel?: React.ReactNode
  expiredLabel?: React.ReactNode
  resendLabel?: React.ReactNode
  onResend?: () => void
}) {
  const ctx = React.useContext(VerifyCodeContext)
  const durationSeconds =
    Number.isFinite(duration) && duration > 0
      ? Math.floor(duration)
      : DEFAULT_RESEND_DURATION
  const [remaining, setRemaining] = React.useState(durationSeconds)
  const disabled = Boolean(ctx?.disabled)
  const counting = remaining > 0
  const canResend = !counting && !disabled

  React.useEffect(() => {
    setRemaining(durationSeconds)
  }, [durationSeconds])

  React.useEffect(() => {
    if (!counting || disabled) return
    const timerId = window.setInterval(() => {
      setRemaining((current) => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearInterval(timerId)
  }, [counting, disabled])

  const restart = () => {
    if (!canResend) return
    onResend?.()
    setRemaining(durationSeconds)
  }

  const timerBoxClassName =
    "inline-grid h-6 shrink-0 place-items-center rounded-[6px] bg-muted px-2 text-caption font-normal text-foreground"

  return (
    <div
      data-slot="verify-code-resend"
      data-state={counting ? "waiting" : "ready"}
      className={cn(
        "flex w-full min-w-0 items-center justify-between gap-3 group-data-disabled/verify-code:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <p className="m-0 min-w-0 text-caption font-normal text-muted-foreground">
        {counting ? waitingLabel : expiredLabel}
      </p>
      {counting ? (
        <span data-slot="verify-code-timer" className={timerBoxClassName}>
          <span
            className="invisible col-start-1 row-start-1 whitespace-nowrap"
            aria-hidden="true"
          >
            {resendLabel}
          </span>
          <span className="col-start-1 row-start-1 tabular-nums">
            {formatVerifyCodeTimer(remaining)}
          </span>
        </span>
      ) : (
        <button
          type="button"
          data-slot="verify-code-timer"
          disabled={disabled}
          className={cn(
            timerBoxClassName,
            "transition-colors outline-none hover:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)] focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
          )}
          onClick={restart}
        >
          {resendLabel}
        </button>
      )}
    </div>
  )
}

function VerifyCodeError({
  className,
  id,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = React.useContext(VerifyCodeContext)

  if (!children) {
    return null
  }

  if (ctx && !ctx.invalid) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="verify-code-error"
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
  VerifyCode,
  VerifyCodeLabel,
  VerifyCodeControl,
  VerifyCodeDigit,
  VerifyCodeSeparator,
  VerifyCodeDescription,
  VerifyCodeResend,
  VerifyCodeError,
  formatVerifyCodeValue,
  parseVerifyCodeValue,
  formatVerifyCodeTimer,
  clampLength,
  normalizeGroups,
  verifyCodeControlVariants,
  verifyCodeDigitVariants,
  DEFAULT_LENGTH,
  MIN_LENGTH,
  MAX_LENGTH,
  DEFAULT_RESEND_DURATION,
}
export type { VerifyCodeSize }
