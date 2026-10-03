"use client"

/*
  Cubix Password Field - labeled password input specialized from Text Field.

  Weight 400 and tracking-normal keep IRANSans XV readable in fixed-height
  controls; Latin letter-spacing and medium weight look heavy on Arab script.
  Icons use data-icon="inline-start" | "inline-end" like Button (logical inset).
  PasswordFieldToggle switches type between password and text for visibility.
*/
import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  Icon-side inline padding matches Button / vertical icon inset:
  default: 8px · lg: 12px
*/

const passwordFieldControlVariants = cva(
  "group/password-field-control relative flex w-full min-w-0 items-center rounded-lg border border-input bg-transparent transition-colors outline-none has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-muted has-[[data-slot=password-field-input]:focus-visible]:border-primary has-[[data-slot=password-field-input]:focus-visible]:ring-3 has-[[data-slot=password-field-input]:focus-visible]:ring-primary/20 has-[[data-slot=password-field-input]:focus-visible]:ring-offset-1 has-[[data-slot=password-field-input]:focus-visible]:ring-offset-background has-[[data-slot=password-field-input][aria-invalid=true]]:border-destructive has-[[data-slot=password-field-input][aria-invalid=true]]:ring-0 has-[[data-slot=password-field-input][aria-invalid=true]:focus-visible]:border-destructive has-[[data-slot=password-field-input][aria-invalid=true]:focus-visible]:ring-0 dark:bg-input/30 dark:has-disabled:bg-muted dark:has-[[data-slot=password-field-input][aria-invalid=true]]:border-destructive/50 dark:has-[[data-slot=password-field-input][aria-invalid=true]:focus-visible]:border-destructive/50 dark:has-[[data-slot=password-field-input][aria-invalid=true]:focus-visible]:ring-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
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

const passwordFieldInputVariants = cva(
  "w-full min-w-0 rounded-lg border border-input bg-transparent font-normal leading-none tracking-normal text-foreground transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-description file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-transparent disabled:bg-muted disabled:text-muted-foreground disabled:placeholder:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-0 dark:bg-input/30 dark:disabled:bg-muted dark:aria-invalid:border-destructive/50 dark:aria-invalid:focus-visible:border-destructive/50",
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

/*
  Passwords are typed in Latin: dir="ltr" keeps trailing symbols in place when
  the value is revealed, and match-parent keeps the text aligned with the
  surrounding form direction.
*/
const PASSWORD_ALIGN_CLASS = "[text-align:match-parent]"

type PasswordFieldSize = NonNullable<VariantProps<typeof passwordFieldInputVariants>["size"]>

type PasswordFieldVisibilityContextValue = {
  visible: boolean
  setVisible: (visible: boolean) => void
  disabled?: boolean
}

const PasswordFieldSizeContext = React.createContext<PasswordFieldSize>("default")
const PasswordFieldControlContext = React.createContext(false)
const PasswordFieldVisibilityContext =
  React.createContext<PasswordFieldVisibilityContextValue | null>(null)

const DEFAULT_SHOW_LABEL = "نمایش رمز عبور"
const DEFAULT_HIDE_LABEL = "مخفی کردن رمز عبور"

type PasswordFieldContextValue = {
  size: PasswordFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  id: string
  descriptionId: string
  errorId: string
}

const PasswordFieldContext = React.createContext<PasswordFieldContextValue | null>(null)

function PasswordField({
  className,
  size = "default",
  disabled,
  invalid,
  name,
  id: idProp,
  children,
  visible: visibleProp,
  defaultVisible = false,
  onVisibleChange,
  ...props
}: React.ComponentProps<"div"> & {
  size?: PasswordFieldSize
  disabled?: boolean
  invalid?: boolean
  name?: string
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
}) {
  const reactId = React.useId()
  const id = idProp ?? reactId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  const [uncontrolledVisible, setUncontrolledVisible] = React.useState(defaultVisible)
  const isVisibilityControlled = visibleProp !== undefined
  const visible = isVisibilityControlled ? Boolean(visibleProp) : uncontrolledVisible
  const setVisible = React.useCallback(
    (next: boolean) => {
      if (!isVisibilityControlled) {
        setUncontrolledVisible(next)
      }
      onVisibleChange?.(next)
    },
    [isVisibilityControlled, onVisibleChange]
  )

  return (
    <PasswordFieldVisibilityContext.Provider value={{ visible, setVisible, disabled }}>
      <PasswordFieldSizeContext.Provider value={size}>
        <PasswordFieldContext.Provider
          value={{ size, disabled, invalid, name, id, descriptionId, errorId }}
        >
          <div
            data-slot="password-field"
            data-size={size}
            data-disabled={disabled ? "" : undefined}
            data-invalid={invalid ? "" : undefined}
            className={cn(
              "group/password-field flex w-full flex-col gap-2 data-disabled:cursor-not-allowed data-disabled:opacity-70",
              className
            )}
            {...props}
          >
            {children}
          </div>
        </PasswordFieldContext.Provider>
      </PasswordFieldSizeContext.Provider>
    </PasswordFieldVisibilityContext.Provider>
  )
}

function PasswordFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const ctx = React.useContext(PasswordFieldContext)

  return (
    <LabelPrimitive.Root
      data-slot="password-field-label"
      htmlFor={props.htmlFor ?? ctx?.id}
      className={cn(
        "flex w-fit items-center gap-2 text-label leading-none font-normal text-foreground select-none group-data-disabled/password-field:cursor-not-allowed group-data-disabled/password-field:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function PasswordFieldControl({
  className,
  size: sizeProp,
  onClick,
  ...props
}: React.ComponentProps<"div"> & {
  size?: PasswordFieldSize
}) {
  const rootSize = React.useContext(PasswordFieldContext)?.size
  const contextSize = React.useContext(PasswordFieldSizeContext)
  const size = sizeProp ?? rootSize ?? contextSize

  return (
    <PasswordFieldControlContext.Provider value={true}>
      <div
        data-slot="password-field-control"
        data-size={size}
        className={cn(passwordFieldControlVariants({ size }), className)}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          if ((event.target as HTMLElement).closest("button,a,input,textarea")) {
            return
          }
          const input = event.currentTarget.querySelector<HTMLInputElement>(
            "[data-slot=password-field-input]"
          )
          if (!input || input.disabled || input.readOnly) return
          input.focus()
        }}
        {...props}
      />
    </PasswordFieldControlContext.Provider>
  )
}

function PasswordFieldInput({
  className,
  size: sizeProp,
  id,
  name,
  disabled,
  autoComplete = "current-password",
  dir = "ltr",
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  ...props
}: Omit<React.ComponentProps<"input">, "size" | "type" | "spellCheck"> & {
  size?: PasswordFieldSize
}) {
  const ctx = React.useContext(PasswordFieldContext)
  const sizeFromContext = React.useContext(PasswordFieldSizeContext)
  const size = sizeProp ?? ctx?.size ?? sizeFromContext
  const inControl = React.useContext(PasswordFieldControlContext)
  const visible = React.useContext(PasswordFieldVisibilityContext)?.visible ?? false
  const isInvalid = ariaInvalid ?? ctx?.invalid
  const describedBy = [ariaDescribedby, ctx?.descriptionId, isInvalid ? ctx?.errorId : null]
    .filter(Boolean)
    .join(" ")

  return (
    <input
      data-slot="password-field-input"
      dir={dir}
      data-size={size}
      id={id ?? ctx?.id}
      name={name ?? ctx?.name}
      disabled={disabled ?? ctx?.disabled}
      aria-invalid={isInvalid || undefined}
      aria-describedby={describedBy || undefined}
      className={cn(
        passwordFieldInputVariants({ size, inControl }),
        PASSWORD_ALIGN_CLASS,
        className
      )}
      {...props}
      type={visible ? "text" : "password"}
      autoComplete={autoComplete}
      spellCheck={false}
    />
  )
}

function PasswordFieldEyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function PasswordFieldEyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  )
}

function PasswordFieldToggle({
  className,
  onClick,
  disabled,
  showLabel = DEFAULT_SHOW_LABEL,
  hideLabel = DEFAULT_HIDE_LABEL,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  showLabel?: string
  hideLabel?: string
}) {
  const visibility = React.useContext(PasswordFieldVisibilityContext)
  const ctx = React.useContext(PasswordFieldContext)
  const visible = visibility?.visible ?? false
  const isDisabled = disabled ?? visibility?.disabled ?? ctx?.disabled
  const label = visible ? hideLabel : showLabel

  return (
    <button
      type="button"
      data-slot="password-field-toggle"
      data-icon="inline-end"
      data-state={visible ? "visible" : "hidden"}
      aria-label={label}
      disabled={isDisabled}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none group-data-disabled/password-field:cursor-not-allowed",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        const next = !visible
        visibility?.setVisible(next)
        const input = event.currentTarget
          .closest("[data-slot=password-field-control]")
          ?.querySelector<HTMLInputElement>("[data-slot=password-field-input]")
        input?.focus()
      }}
      {...props}
    >
      {visible ? (
        <PasswordFieldEyeOffIcon className="size-4" />
      ) : (
        <PasswordFieldEyeIcon className="size-4" />
      )}
    </button>
  )
}

function PasswordFieldDescription({ className, id, ...props }: React.ComponentProps<"p">) {
  const ctx = React.useContext(PasswordFieldContext)

  return (
    <p
      data-slot="password-field-description"
      id={id ?? ctx?.descriptionId}
      className={cn(
        "m-0 text-caption font-normal text-muted-foreground group-data-disabled/password-field:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function PasswordFieldError({ className, id, children, ...props }: React.ComponentProps<"div">) {
  const ctx = React.useContext(PasswordFieldContext)

  if (!children) {
    return null
  }

  if (ctx && !ctx.invalid) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="password-field-error"
      id={id ?? ctx?.errorId}
      className={cn("m-0 text-caption font-normal text-destructive", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  PasswordField,
  PasswordFieldLabel,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldToggle,
  PasswordFieldDescription,
  PasswordFieldError,
  passwordFieldControlVariants,
  passwordFieldInputVariants,
}
export type { PasswordFieldSize }
