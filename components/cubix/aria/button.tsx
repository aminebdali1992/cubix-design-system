"use client"

/*
  Cubix Button - Persian-first control.

  Weight 400 and tracking-normal keep IRANSans XV readable in fixed-height
  pills; Latin letter-spacing and medium weight look heavy on Arab script.
  Icon inset uses logical inline-start / inline-end for RTL.
*/
import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/*
  Icon-side inline padding matches vertical icon inset:
  (button height - icon size) / 2
  xs: (28 - 14) / 2 = 7px · sm/default: 8px (pe/ps-2) · lg: 12px (pe/ps-3)
*/
const ICON_INLINE_PAD_XS =
  "has-data-[icon=inline-end]:pe-[7px] has-data-[icon=inline-start]:ps-[7px]"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-label leading-none font-normal tracking-normal whitespace-nowrap transition-[color,background-color,border-color,opacity,box-shadow,transform] outline-none select-none focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary),black_10%)] focus-visible:ring-primary/20",
        foreground:
          "bg-foreground text-background focus-visible:ring-foreground/20 transition-[color,background-color,box-shadow,scale] duration-300 ease-out hover:scale-105 hover:bg-foreground/90 hover:shadow-2xl hover:shadow-foreground/40 active:not-aria-[haspopup]:translate-y-0 active:scale-100 active:duration-150 dark:hover:shadow-foreground/25 motion-reduce:transition-colors motion-reduce:hover:scale-100",
        secondary:
          "bg-primary/10 text-primary hover:bg-primary/20 aria-expanded:bg-primary/10 aria-expanded:text-primary focus-visible:ring-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30",
        gray: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-[color-mix(in_oklch,var(--destructive),black_10%)] focus-visible:ring-destructive/20",
        "destructive-secondary":
          "bg-destructive/10 text-destructive hover:bg-destructive/20 aria-expanded:bg-destructive/10 aria-expanded:text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-[6px] hover:underline hover:decoration-dotted hover:decoration-1",
      },
      size: {
        xs: `h-7 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 text-caption in-data-[slot=button-group]:rounded-lg ${ICON_INLINE_PAD_XS} [&_svg:not([class*='size-'])]:size-3.5`,
        sm: "h-8 gap-1.5 rounded-[min(var(--radius-md),12px)] px-3 text-caption in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg:not([class*='size-'])]:size-4",
        default:
          "h-10 gap-2 px-4 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg:not([class*='size-'])]:size-6",
        lg: "h-12 gap-2.5 px-6 text-description has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3 [&_svg:not([class*='size-'])]:size-6",
        "icon-xs":
          "size-7 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-6",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonHostProps = ComponentProps<"button"> & {
  "data-slot"?: string
  "data-variant"?: string
  "data-size"?: string
  "data-script"?: string
}

const ARAB_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u0870-\u089F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/u
const LATIN_TEXT = /[A-Za-z0-9\u00C0-\u024F]/u

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textContent).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) return textContent(node.props.children)
  return ""
}

/*
  In lang="fa" sections the Persian button face sets the line baseline, and
  Latin glyphs on it sit about 1px high. Latin-only labels opt out with
  data-script="latn" so they keep the Latin baseline.
*/
function labelScript(children: ReactNode): "latn" | undefined {
  const text = textContent(children)
  return LATIN_TEXT.test(text) && !ARAB_SCRIPT.test(text) ? "latn" : undefined
}

function Button({
  className,
  variant = "default",
  size = "default",
  render,
  nativeButton: _nativeButton,
  children,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    render?: ReactElement<ButtonHostProps>
    /** Accepted for paste-ready parity with Base UI. Ignored on React Aria. */
    nativeButton?: boolean
  }) {
  const buttonClassName = cn(buttonVariants({ variant, size }), className)

  if (isValidElement<ButtonHostProps>(render)) {
    const label = children ?? render.props.children
    return cloneElement(render, {
      ...props,
      className: cn(buttonClassName, render.props.className),
      "data-slot": "button",
      "data-variant": variant ?? "default",
      "data-size": size ?? "default",
      "data-script": labelScript(label),
      children: label,
    })
  }

  return (
    <button
      type="button"
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-script={labelScript(children)}
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button, buttonVariants }
