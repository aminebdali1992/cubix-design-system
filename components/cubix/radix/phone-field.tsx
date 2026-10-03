"use client"

/*
  Cubix Phone Field - labeled mobile phone input specialized from Text Field.

  Weight 400 and tracking-normal keep IRANSans XV readable in fixed-height
  controls; Latin letter-spacing and medium weight look heavy on Arab script.
  Icons use data-icon="inline-start" | "inline-end" like Button (logical inset).
*/
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/*
  Icon-side inline padding matches Button / vertical icon inset:
  default: 8px · lg: 12px
*/

const phoneFieldControlVariants = cva(
  "group/phone-field-control relative flex w-full min-w-0 items-center rounded-lg border border-input bg-transparent transition-colors outline-none has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-muted has-[[data-slot=phone-field-input]:focus-visible]:border-primary has-[[data-slot=phone-field-input]:focus-visible]:ring-3 has-[[data-slot=phone-field-input]:focus-visible]:ring-primary/20 has-[[data-slot=phone-field-input]:focus-visible]:ring-offset-1 has-[[data-slot=phone-field-input]:focus-visible]:ring-offset-background has-[[data-slot=phone-field-input][aria-invalid=true]]:border-destructive has-[[data-slot=phone-field-input][aria-invalid=true]]:ring-0 has-[[data-slot=phone-field-input][aria-invalid=true]:focus-visible]:border-destructive has-[[data-slot=phone-field-input][aria-invalid=true]:focus-visible]:ring-0 dark:bg-input/30 dark:has-disabled:bg-muted dark:has-[[data-slot=phone-field-input][aria-invalid=true]]:border-destructive/50 dark:has-[[data-slot=phone-field-input][aria-invalid=true]:focus-visible]:border-destructive/50 dark:has-[[data-slot=phone-field-input][aria-invalid=true]:focus-visible]:ring-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
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

const phoneFieldInputVariants = cva(
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

type PhoneFieldSize = NonNullable<VariantProps<typeof phoneFieldInputVariants>["size"]>

type PhoneFieldContextValue = {
  size: PhoneFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  id: string
  descriptionId: string
  errorId: string
}

const PhoneFieldContext = React.createContext<PhoneFieldContextValue | null>(null)
const PhoneFieldSizeContext = React.createContext<PhoneFieldSize>("default")
const PhoneFieldControlContext = React.createContext(false)

function PhoneField({
  className,
  size = "default",
  disabled,
  invalid,
  name,
  id: idProp,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: PhoneFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
}) {
  const reactId = React.useId()
  const id = idProp ?? reactId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  return (
    <PhoneFieldContext.Provider
      value={{ size, disabled, invalid, name, id, descriptionId, errorId }}
    >
      <PhoneFieldSizeContext.Provider value={size}>
        <div
          data-slot="phone-field"
          data-size={size}
          data-disabled={disabled ? "" : undefined}
          data-invalid={invalid ? "" : undefined}
          className={cn(
            "group/phone-field flex w-full flex-col gap-2 data-disabled:cursor-not-allowed data-disabled:opacity-70",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </PhoneFieldSizeContext.Provider>
    </PhoneFieldContext.Provider>
  )
}

function PhoneFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const ctx = React.useContext(PhoneFieldContext)

  return (
    <LabelPrimitive.Root
      data-slot="phone-field-label"
      htmlFor={props.htmlFor ?? ctx?.id}
      className={cn(
        "flex w-fit items-center gap-2 text-label leading-none font-normal text-foreground select-none group-data-disabled/phone-field:cursor-not-allowed group-data-disabled/phone-field:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function PhoneFieldControl({
  className,
  size: sizeProp,
  onClick,
  ...props
}: React.ComponentProps<"div"> & {
  size?: PhoneFieldSize
}) {
  const rootSize = React.useContext(PhoneFieldContext)?.size
  const contextSize = React.useContext(PhoneFieldSizeContext)
  const size = sizeProp ?? rootSize ?? contextSize

  return (
    <PhoneFieldControlContext.Provider value={true}>
      <div
        data-slot="phone-field-control"
        data-size={size}
        className={cn(phoneFieldControlVariants({ size }), className)}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          if ((event.target as HTMLElement).closest("button,a,input,textarea")) {
            return
          }
          const input = event.currentTarget.querySelector<HTMLInputElement>(
            "[data-slot=phone-field-input]"
          )
          if (!input || input.disabled || input.readOnly) return
          input.focus()
        }}
        {...props}
      />
    </PhoneFieldControlContext.Provider>
  )
}

function PhoneFieldInput({
  className,
  size: sizeProp,
  id,
  name,
  disabled,
  autoComplete = "tel",
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  ...props
}: Omit<React.ComponentProps<"input">, "size" | "type" | "inputMode" | "spellCheck"> & {
  size?: PhoneFieldSize
}) {
  const ctx = React.useContext(PhoneFieldContext)
  const sizeFromContext = React.useContext(PhoneFieldSizeContext)
  const size = sizeProp ?? ctx?.size ?? sizeFromContext
  const inControl = React.useContext(PhoneFieldControlContext)
  const isInvalid = ariaInvalid ?? ctx?.invalid
  const describedBy = [ariaDescribedby, ctx?.descriptionId, isInvalid ? ctx?.errorId : null]
    .filter(Boolean)
    .join(" ")

  return (
    <input
      data-slot="phone-field-input"
      data-size={size}
      id={id ?? ctx?.id}
      name={name ?? ctx?.name}
      disabled={disabled ?? ctx?.disabled}
      aria-invalid={isInvalid || undefined}
      aria-describedby={describedBy || undefined}
      className={cn(phoneFieldInputVariants({ size, inControl }), className)}
      {...props}
      type="tel"
      inputMode="tel"
      autoComplete={autoComplete}
      spellCheck={false}
    />
  )
}

function clearPhoneFieldInput(input: HTMLInputElement) {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")
  descriptor?.set?.call(input, "")
  input.dispatchEvent(new Event("input", { bubbles: true }))
  input.dispatchEvent(new Event("change", { bubbles: true }))
}

function PhoneFieldClearIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </svg>
  )
}

function PhoneFieldClear({
  className,
  onClick,
  "aria-label": ariaLabel = "Clear",
  ...props
}: React.ComponentProps<"button">) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [show, setShow] = React.useState(false)

  React.useLayoutEffect(() => {
    const control = ref.current?.closest("[data-slot=phone-field-control]")
    const input = control?.querySelector<HTMLInputElement>("[data-slot=phone-field-input]")
    if (!input) return

    const sync = () => {
      setShow(Boolean(input.value) && !input.disabled && !input.readOnly)
    }
    sync()
    input.addEventListener("input", sync)
    input.addEventListener("change", sync)
    return () => {
      input.removeEventListener("input", sync)
      input.removeEventListener("change", sync)
    }
  }, [])

  return (
    <button
      ref={ref}
      type="button"
      data-slot="phone-field-clear"
      data-icon={show ? "inline-end" : undefined}
      aria-label={ariaLabel}
      tabIndex={show ? 0 : -1}
      hidden={!show}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        const input = event.currentTarget
          .closest("[data-slot=phone-field-control]")
          ?.querySelector<HTMLInputElement>("[data-slot=phone-field-input]")
        if (!input) return
        clearPhoneFieldInput(input)
        setShow(false)
        input.focus()
      }}
      {...props}
    >
      <PhoneFieldClearIcon className="size-4" />
    </button>
  )
}

function PhoneFieldDescription({ className, id, ...props }: React.ComponentProps<"p">) {
  const ctx = React.useContext(PhoneFieldContext)

  return (
    <p
      data-slot="phone-field-description"
      id={id ?? ctx?.descriptionId}
      className={cn(
        "m-0 text-caption font-normal text-muted-foreground group-data-disabled/phone-field:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function PhoneFieldError({ className, id, children, ...props }: React.ComponentProps<"div">) {
  const ctx = React.useContext(PhoneFieldContext)

  if (!children) {
    return null
  }

  if (ctx && !ctx.invalid) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="phone-field-error"
      id={id ?? ctx?.errorId}
      className={cn("m-0 text-caption font-normal text-destructive", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  PhoneField,
  PhoneFieldLabel,
  PhoneFieldControl,
  PhoneFieldInput,
  PhoneFieldClear,
  PhoneFieldDescription,
  PhoneFieldError,
  phoneFieldControlVariants,
  phoneFieldInputVariants,
}
