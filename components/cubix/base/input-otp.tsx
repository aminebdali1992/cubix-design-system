"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cva, type VariantProps } from "class-variance-authority"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  value,
  defaultValue,
  onChange,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
    typeof defaultValue === "string" ? defaultValue : ""
  )
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : uncontrolledValue

  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      value={currentValue}
      onChange={(next) => {
        if (!isControlled) {
          setUncontrolledValue(next)
        }
        onChange?.(next)
      }}
      {...props}
    />
  )
}

const inputOTPGroupVariants = cva("flex items-center", {
  variants: {
    variant: {
      default: "",
      separated: "gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function InputOTPGroup({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputOTPGroupVariants>) {
  return (
    <div
      data-slot="input-otp-group"
      data-variant={variant}
      className={cn(inputOTPGroupVariants({ variant }), className)}
      {...props}
    />
  )
}

const inputOTPSlotVariants = cva(
  "relative flex h-9 w-9 items-center justify-center border-input text-description shadow-xs transition-all outline-none aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "border-y border-r first:rounded-l-md first:border-l last:rounded-r-md",
        separated: "rounded-md border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function InputOTPSlot({
  index,
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof inputOTPSlotVariants> & {
    index: number
  }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-variant={variant}
      className={cn(inputOTPSlotVariants({ variant }), className)}
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      ) : null}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon className="size-4" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
