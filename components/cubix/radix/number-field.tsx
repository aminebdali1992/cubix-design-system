"use client"

/*
  Cubix Number Field - labeled integer input specialized from Text Field.

  type stays text with inputMode numeric; values always display as Persian
  digits. text-right keeps values readable in RTL. Stepper arrows and
  ArrowUp / ArrowDown on the input adjust the value. Weight 400 and tracking-normal keep IRANSans XV readable. Icons use
  data-icon like Button.
*/
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/*
  Icon-side inline padding matches Button / vertical icon inset:
  default: 8px · lg: 12px
*/

const numberFieldControlVariants = cva(
  "group/number-field-control relative flex w-full min-w-0 items-center rounded-lg border border-input bg-transparent transition-colors outline-none has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-muted has-[[data-slot=number-field-input]:focus-visible]:border-primary has-[[data-slot=number-field-input]:focus-visible]:ring-3 has-[[data-slot=number-field-input]:focus-visible]:ring-primary/20 has-[[data-slot=number-field-input]:focus-visible]:ring-offset-1 has-[[data-slot=number-field-input]:focus-visible]:ring-offset-background has-[[data-slot=number-field-input][aria-invalid=true]]:border-destructive has-[[data-slot=number-field-input][aria-invalid=true]]:ring-0 has-[[data-slot=number-field-input][aria-invalid=true]:focus-visible]:border-destructive has-[[data-slot=number-field-input][aria-invalid=true]:focus-visible]:ring-0 dark:bg-input/30 dark:has-disabled:bg-muted dark:has-[[data-slot=number-field-input][aria-invalid=true]]:border-destructive/50 dark:has-[[data-slot=number-field-input][aria-invalid=true]:focus-visible]:border-destructive/50 dark:has-[[data-slot=number-field-input][aria-invalid=true]:focus-visible]:ring-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg]:text-muted-foreground [&_[data-icon]]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
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

const numberFieldInputVariants = cva(
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

type NumberFieldSize = NonNullable<VariantProps<typeof numberFieldInputVariants>["size"]>

type NumberFieldContextValue = {
  size: NumberFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  id: string
  descriptionId: string
  errorId: string
}

const NumberFieldContext = React.createContext<NumberFieldContextValue | null>(null)
const NumberFieldSizeContext = React.createContext<NumberFieldSize>("default")
const NumberFieldControlContext = React.createContext(false)

function NumberField({
  className,
  size = "default",
  disabled,
  invalid,
  name,
  id: idProp,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: NumberFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
}) {
  const reactId = React.useId()
  const id = idProp ?? reactId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  return (
    <NumberFieldContext.Provider
      value={{ size, disabled, invalid, name, id, descriptionId, errorId }}
    >
      <NumberFieldSizeContext.Provider value={size}>
        <div
          data-slot="number-field"
          data-size={size}
          data-disabled={disabled ? "" : undefined}
          data-invalid={invalid ? "" : undefined}
          className={cn(
            "group/number-field flex w-full flex-col gap-2 data-disabled:cursor-not-allowed data-disabled:opacity-70",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </NumberFieldSizeContext.Provider>
    </NumberFieldContext.Provider>
  )
}

function NumberFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const ctx = React.useContext(NumberFieldContext)

  return (
    <LabelPrimitive.Root
      data-slot="number-field-label"
      htmlFor={props.htmlFor ?? ctx?.id}
      className={cn(
        "flex w-fit items-center gap-2 text-label leading-none font-normal text-foreground select-none group-data-disabled/number-field:cursor-not-allowed group-data-disabled/number-field:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldControl({
  className,
  size: sizeProp,
  onClick,
  ...props
}: React.ComponentProps<"div"> & {
  size?: NumberFieldSize
}) {
  const rootSize = React.useContext(NumberFieldContext)?.size
  const contextSize = React.useContext(NumberFieldSizeContext)
  const size = sizeProp ?? rootSize ?? contextSize

  return (
    <NumberFieldControlContext.Provider value={true}>
      <div
        data-slot="number-field-control"
        data-size={size}
        className={cn(numberFieldControlVariants({ size }), className)}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          if ((event.target as HTMLElement).closest("button,a,input,textarea")) {
            return
          }
          const input = event.currentTarget.querySelector<HTMLInputElement>(
            "[data-slot=number-field-input]"
          )
          if (!input || input.disabled || input.readOnly) return
          input.focus()
        }}
        {...props}
      />
    </NumberFieldControlContext.Provider>
  )
}

function NumberFieldInput({
  className,
  size: sizeProp,
  id,
  name,
  disabled,
  autoComplete = "off",
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  onBeforeInput,
  onPaste,
  onInput,
  onKeyDown,
  defaultValue,
  value,
  ...props
}: Omit<React.ComponentProps<"input">, "size" | "type" | "inputMode" | "spellCheck"> & {
  size?: NumberFieldSize
}) {
  const ctx = React.useContext(NumberFieldContext)
  const sizeFromContext = React.useContext(NumberFieldSizeContext)
  const size = sizeProp ?? ctx?.size ?? sizeFromContext
  const inControl = React.useContext(NumberFieldControlContext)
  const isInvalid = ariaInvalid ?? ctx?.invalid
  const describedBy = [ariaDescribedby, ctx?.descriptionId, isInvalid ? ctx?.errorId : null]
    .filter(Boolean)
    .join(" ")
  const persianDefault =
    defaultValue == null
      ? defaultValue
      : toPersianDigits(String(defaultValue).replace(/[^\d۰-۹٠-٩.\-]/g, ""))
  const persianValue =
    value === undefined
      ? undefined
      : value == null
        ? value
        : toPersianDigits(String(value).replace(/[^\d۰-۹٠-٩.\-]/g, ""))

  return (
    <input
      data-slot="number-field-input"
      data-size={size}
      id={id ?? ctx?.id}
      name={name ?? ctx?.name}
      disabled={disabled ?? ctx?.disabled}
      aria-invalid={isInvalid || undefined}
      aria-describedby={describedBy || undefined}
      className={cn(numberFieldInputVariants({ size, inControl }), className)}
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
        if (/[^\d۰-۹٠-٩.\-]/.test(event.data)) {
          event.preventDefault()
          return
        }
        const persian = toPersianDigits(event.data)
        if (persian === event.data) return
        event.preventDefault()
        const input = event.currentTarget
        const start = input.selectionStart ?? input.value.length
        const end = input.selectionEnd ?? input.value.length
        const next = input.value.slice(0, start) + persian + input.value.slice(end)
        setNumberFieldInputValue(input, next)
        const caret = start + persian.length
        requestAnimationFrame(() => {
          input.setSelectionRange(caret, caret)
        })
      }}
      onPaste={(event) => {
        onPaste?.(event)
        if (event.defaultPrevented) return
        const text = event.clipboardData?.getData("text") ?? ""
        const sanitized = toPersianDigits(text.replace(/[^\d۰-۹٠-٩.\-]/g, ""))
        if (!sanitized) {
          if (/[^\d۰-۹٠-٩.\-]/.test(text) || /[\d٠-٩]/.test(text)) {
            event.preventDefault()
          }
          return
        }
        if (sanitized === text) return
        event.preventDefault()
        const input = event.currentTarget
        const start = input.selectionStart ?? input.value.length
        const end = input.selectionEnd ?? input.value.length
        const next = input.value.slice(0, start) + sanitized + input.value.slice(end)
        setNumberFieldInputValue(input, next)
        const caret = start + sanitized.length
        requestAnimationFrame(() => {
          input.setSelectionRange(caret, caret)
        })
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return
        event.preventDefault()
        stepNumberFieldInput(event.currentTarget, event.key === "ArrowUp" ? 1 : -1)
      }}
      onInput={(event) => {
        onInput?.(event)
        if (event.defaultPrevented || value !== undefined) return
        const input = event.currentTarget
        const next = toPersianDigits(input.value.replace(/[^\d۰-۹٠-٩.\-]/g, ""))
        if (next === input.value) return
        const caret = input.selectionStart ?? next.length
        setNumberFieldInputValue(input, next)
        requestAnimationFrame(() => {
          const pos = Math.min(caret, next.length)
          input.setSelectionRange(pos, pos)
        })
      }}
    />
  )
}

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"

function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)))
}

function toPersianDigits(value: string) {
  return toLatinDigits(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit)
}

function formatDigits(value: number) {
  return toPersianDigits(String(value))
}

function setNumberFieldInputValue(input: HTMLInputElement, next: string) {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")
  descriptor?.set?.call(input, next)
  input.dispatchEvent(new Event("input", { bubbles: true }))
  input.dispatchEvent(new Event("change", { bubbles: true }))
}

function stepNumberFieldInput(input: HTMLInputElement, direction: 1 | -1, stepOverride?: number) {
  if (input.disabled || input.readOnly) return

  const latin = toLatinDigits(input.value).replace(/[^\d.-]/g, "")
  const current = latin === "" || latin === "-" || latin === "." ? 0 : Number(latin)
  if (Number.isNaN(current)) return

  const stepAttr = input.step
  const parsedStep = stepOverride ?? (stepAttr && stepAttr !== "any" ? Number(stepAttr) : 1)
  const step = Number.isFinite(parsedStep) && parsedStep !== 0 ? parsedStep : 1

  let next = current + direction * step
  const min = input.min === "" ? undefined : Number(input.min)
  const max = input.max === "" ? undefined : Number(input.max)
  if (min !== undefined && Number.isFinite(min)) next = Math.max(min, next)
  if (max !== undefined && Number.isFinite(max)) next = Math.min(max, next)
  if (Number.isInteger(step) && Number.isInteger(current)) {
    next = Math.trunc(next)
  }

  setNumberFieldInputValue(input, formatDigits(next))
}

function NumberFieldChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 14.5L12 8.5L18 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NumberFieldChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 9.5L12 15.5L18 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NumberFieldStepper({
  className,
  step,
  incrementLabel = "افزایش",
  decrementLabel = "کاهش",
  ...props
}: React.ComponentProps<"div"> & {
  step?: number
  incrementLabel?: string
  decrementLabel?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [disabled, setDisabled] = React.useState(false)

  React.useLayoutEffect(() => {
    const control = ref.current?.closest("[data-slot=number-field-control]")
    const input = control?.querySelector<HTMLInputElement>("[data-slot=number-field-input]")
    if (!input) return

    const sync = () => {
      setDisabled(input.disabled || input.readOnly)
    }
    sync()
    input.addEventListener("input", sync)
    const observer = new MutationObserver(sync)
    observer.observe(input, {
      attributes: true,
      attributeFilter: ["disabled", "readonly"],
    })
    return () => {
      input.removeEventListener("input", sync)
      observer.disconnect()
    }
  }, [])

  const runStep = (direction: 1 | -1) => {
    const input = ref.current
      ?.closest("[data-slot=number-field-control]")
      ?.querySelector<HTMLInputElement>("[data-slot=number-field-input]")
    if (!input) return
    stepNumberFieldInput(input, direction, step)
    input.focus()
  }

  return (
    <div
      ref={ref}
      data-slot="number-field-stepper"
      data-icon="inline-end"
      className={cn("flex shrink-0 flex-col items-center justify-center -space-y-1", className)}
      {...props}
    >
      <button
        type="button"
        data-slot="number-field-increment"
        aria-label={incrementLabel}
        disabled={disabled}
        tabIndex={-1}
        className="inline-flex size-4 items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:text-current"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => runStep(1)}
      >
        <NumberFieldChevronUpIcon className="size-3.5" />
      </button>
      <button
        type="button"
        data-slot="number-field-decrement"
        aria-label={decrementLabel}
        disabled={disabled}
        tabIndex={-1}
        className="inline-flex size-4 items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:text-current"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => runStep(-1)}
      >
        <NumberFieldChevronDownIcon className="size-3.5" />
      </button>
    </div>
  )
}

function NumberFieldDescription({ className, id, ...props }: React.ComponentProps<"p">) {
  const ctx = React.useContext(NumberFieldContext)

  return (
    <p
      data-slot="number-field-description"
      id={id ?? ctx?.descriptionId}
      className={cn(
        "m-0 text-caption font-normal text-muted-foreground group-data-disabled/number-field:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldError({ className, id, children, ...props }: React.ComponentProps<"div">) {
  const ctx = React.useContext(NumberFieldContext)

  if (!children) {
    return null
  }

  if (ctx && !ctx.invalid) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="number-field-error"
      id={id ?? ctx?.errorId}
      className={cn("m-0 text-caption font-normal text-destructive", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  NumberField,
  NumberFieldLabel,
  NumberFieldControl,
  NumberFieldInput,
  NumberFieldStepper,
  NumberFieldDescription,
  NumberFieldError,
  numberFieldControlVariants,
  numberFieldInputVariants,
}
