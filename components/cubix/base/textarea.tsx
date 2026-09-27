"use client"

/*
  Cubix Text Area - multiline text control.

  Weight 400 and tracking-normal keep IRANSans XV readable; Latin
  letter-spacing and medium weight look heavy on Arab script. Visual
  tokens match TextFieldInput (primary focus ring, muted disabled fill).
  Icons use data-icon="inline-start" like Button / Text Field.
  Resize grip is always 8x8 with 4px inset from the bottom-end corner.
*/
import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaControlVariants = cva(
  "group/textarea-control relative w-full min-w-0 rounded-lg border border-input bg-transparent transition-colors outline-none has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-muted has-disabled:opacity-70 has-[[data-slot=textarea]:focus-visible]:border-primary has-[[data-slot=textarea]:focus-visible]:ring-3 has-[[data-slot=textarea]:focus-visible]:ring-primary/20 has-[[data-slot=textarea]:focus-visible]:ring-offset-1 has-[[data-slot=textarea]:focus-visible]:ring-offset-background has-[[data-slot=textarea][aria-invalid=true]]:border-destructive has-[[data-slot=textarea][aria-invalid=true]]:ring-0 has-[[data-slot=textarea][aria-invalid=true]:focus-visible]:border-destructive has-[[data-slot=textarea][aria-invalid=true]:focus-visible]:ring-0 dark:bg-input/30 dark:has-disabled:bg-muted dark:has-[[data-slot=textarea][aria-invalid=true]]:border-destructive/50 dark:has-[[data-slot=textarea][aria-invalid=true]:focus-visible]:border-destructive/50 dark:has-[[data-slot=textarea][aria-invalid=true]:focus-visible]:ring-0 [&_[data-icon]]:pointer-events-none [&_[data-icon]]:absolute [&_[data-icon]]:top-2.5 [&_[data-icon]]:z-10 [&_[data-icon]]:text-muted-foreground [&_[data-icon=inline-start]]:start-2 [&_[data-icon=inline-end]]:end-2 [&_svg:not([data-slot=textarea-resize-grip])]:pointer-events-none [&_svg:not([data-slot=textarea-resize-grip])]:shrink-0 [&_svg:not([data-slot=textarea-resize-grip]):not([class*='size-'])]:size-6 has-data-[icon=inline-start]:[&_[data-slot=textarea]]:ps-10 has-data-[icon=inline-end]:[&_[data-slot=textarea]]:pe-10 has-[[data-slot=textarea].resize-none]:[&_[data-slot=textarea-resize-grip]]:hidden"
)

const textareaVariants = cva(
  "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-3 py-2.5 font-normal text-label leading-relaxed tracking-normal text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-transparent disabled:bg-muted disabled:text-muted-foreground disabled:placeholder:text-muted-foreground disabled:opacity-70 aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-0 dark:bg-input/30 dark:disabled:bg-muted dark:aria-invalid:border-destructive/50 dark:aria-invalid:focus-visible:border-destructive/50 [&::-webkit-resizer]:opacity-0",
  {
    variants: {
      inControl: {
        true: "rounded-[inherit] border-0 bg-transparent shadow-none ring-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-transparent disabled:opacity-100 aria-invalid:border-0 aria-invalid:ring-0 aria-invalid:ring-offset-0 dark:bg-transparent dark:disabled:bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      inControl: false,
    },
  }
)

const TextareaControlContext = React.createContext(false)

/*
  Design grip: locked 8x8, 4px from the bottom-end corner on every shell.
  Path is bottom-start; mirrored in LTR for bottom-end.
*/
function TextareaResizeGrip({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      data-slot="textarea-resize-grip"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute bottom-[4px] end-[4px] z-10 size-[8px] h-[8px] w-[8px] shrink-0 text-[#D5D8DD] dark:text-border",
        "ltr:-scale-x-100 ltr:origin-center",
        className
      )}
    >
      <path
        fill="currentColor"
        d="M0 4.91653V0L8 8H3.08347C1.38052 8 0 6.61948 0 4.91653Z"
      />
    </svg>
  )
}

function TextareaControl({
  className,
  onClick,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <TextareaControlContext.Provider value={true}>
      <div
        data-slot="textarea-control"
        className={cn(textareaControlVariants(), className)}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          if (
            (event.target as HTMLElement).closest("button,a,input,textarea")
          ) {
            return
          }
          const textarea = event.currentTarget.querySelector<HTMLTextAreaElement>(
            "[data-slot=textarea]"
          )
          if (!textarea || textarea.disabled || textarea.readOnly) return
          textarea.focus()
        }}
        {...props}
      >
        {children}
        <TextareaResizeGrip />
      </div>
    </TextareaControlContext.Provider>
  )
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const inControl = React.useContext(TextareaControlContext)

  const textarea = (
    <textarea
      data-slot="textarea"
      className={cn(
        textareaVariants({ inControl }),
        !inControl && "w-full",
        className
      )}
      {...props}
    />
  )

  if (inControl) {
    return textarea
  }

  return (
    <div
      data-slot="textarea-root"
      className="relative w-full has-[[data-slot=textarea].resize-none]:[&_[data-slot=textarea-resize-grip]]:hidden"
    >
      {textarea}
      <TextareaResizeGrip />
    </div>
  )
}

export { Textarea, TextareaControl, textareaControlVariants, textareaVariants }
