import type { BlockSourceFile } from "@/components/blocks/block-code-panel"
import avatarRegistryItem from "@/public/r/avatar.json"
import cardRegistryItem from "@/public/r/card.json"
import checkboxRegistryItem from "@/public/r/checkbox.json"
import emailFieldRegistryItem from "@/public/r/email-field.json"
import passwordFieldRegistryItem from "@/public/r/password-field.json"
import phoneFieldRegistryItem from "@/public/r/phone-field.json"
import tabsRegistryItem from "@/public/r/tabs.json"

type RegistryItem = {
  files: { path: string; content: string }[]
}

/* Reads the component source from its built registry item, so it stays in sync with `npm run registry:build`. */
function registrySourceFile(item: RegistryItem): BlockSourceFile {
  const [file] = item.files
  return { path: file.path, content: file.content }
}

export const cubixUtilsFile: BlockSourceFile = {
  path: "lib/utils.ts",
  content: `import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "headline",
        "title",
        "lead",
        "body",
        "description",
        "caption",
        "label",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
}

export const cubixButtonFile: BlockSourceFile = {
  path: "components/cubix/button.tsx",
  content: `"use client"

/*
  Cubix Button - Persian-first control.

  Weight 400 and tracking-normal keep IRANSans XV readable in fixed-height
  pills; Latin letter-spacing and medium weight look heavy on Arab script.
  Icon inset uses logical inline-start / inline-end for RTL.
*/
import { Button as ButtonPrimitive } from "@base-ui/react/button"
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
          "bg-foreground text-background hover:bg-foreground/85 focus-visible:ring-foreground/20",
        secondary:
          "bg-primary/10 text-primary hover:bg-primary/20 aria-expanded:bg-primary/10 aria-expanded:text-primary focus-visible:ring-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30",
        gray:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
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
        xs: \`h-7 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 text-caption in-data-[slot=button-group]:rounded-lg \${ICON_INLINE_PAD_XS} [&_svg:not([class*='size-'])]:size-3.5\`,
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

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
`,
}

export const cubixInputFile: BlockSourceFile = {
  path: "components/cubix/input.tsx",
  content: `import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-description file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-description dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
`,
}

export const cubixTextareaFile: BlockSourceFile = {
  path: "components/cubix/textarea.tsx",
  content: `import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-description dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
`,
}

export const cubixBadgeFile: BlockSourceFile = {
  path: "components/cubix/badge.tsx",
  content: `"use client"

import type { ComponentProps } from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent text-caption leading-none font-normal whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      size: {
        default: "h-5 px-2",
        lg: "h-6 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&>svg]:size-3.5!",
      },
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-[6px] hover:underline hover:decoration-dotted hover:decoration-1",
        dot: "size-2 min-w-0 gap-0 rounded-full bg-primary p-0 text-transparent",
      },
    },
    compoundVariants: [
      { variant: "dot", size: "lg", className: "size-3" },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
        // Base UI mergeProps typings omit data-* keys; keep Cubix slot contract.
        ...({ "data-slot": "badge" } satisfies { "data-slot": string }),
      } as ComponentProps<"span">,
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

export { Badge, badgeVariants }
`,
}

export const cubixSeparatorFile: BlockSourceFile = {
  path: "components/cubix/separator.tsx",
  content: `"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "w-full shrink-0 bg-border data-horizontal:h-px data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
`,
}

export const cubixLabelFile: BlockSourceFile = {
  path: "components/cubix/label.tsx",
  content: `"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-label leading-none font-normal select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 group-data-[disabled=true]/field:pointer-events-none group-data-[disabled=true]/field:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
`,
}

export const cubixEmptyFile: BlockSourceFile = {
  path: "components/cubix/empty.tsx",
  content: `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
        outline:
          "flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "cn-font-heading text-description font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-description/relaxed text-muted-foreground [&>a]:underline [&>a]:decoration-dotted [&>a]:decoration-1 [&>a]:underline-offset-[6px] [&>a]:[text-decoration-skip-ink:none] [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-description text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
  emptyMediaVariants,
}
`,
}

export const cubixInputGroupFile: BlockSourceFile = {
  path: "components/cubix/input-group.tsx",
  content: `"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

import { Button } from "@/components/cubix/button"
import { Input } from "@/components/cubix/input"
import { Textarea } from "@/components/cubix/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-description font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-description shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
}
`,
}

export const cubixTextFieldFile: BlockSourceFile = {
  path: "components/cubix/text-field.tsx",
  content: `"use client"

/*
  Cubix Text Field - Persian-first labeled text input.

  Weight 400 and tracking-normal keep IRANSans XV readable in fixed-height
  controls; Latin letter-spacing and medium weight look heavy on Arab script.
  Icons use data-icon="inline-start" | "inline-end" like Button (logical inset).
*/
import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  Icon-side inline padding matches Button / vertical icon inset:
  default: 8px · lg: 12px
*/

const textFieldControlVariants = cva(
  "group/text-field-control relative flex w-full min-w-0 items-center rounded-lg border border-input bg-transparent transition-colors outline-none has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-muted has-[[data-slot=text-field-input]:focus-visible]:border-primary has-[[data-slot=text-field-input]:focus-visible]:ring-3 has-[[data-slot=text-field-input]:focus-visible]:ring-primary/20 has-[[data-slot=text-field-input]:focus-visible]:ring-offset-1 has-[[data-slot=text-field-input]:focus-visible]:ring-offset-background has-[[data-slot=text-field-input][aria-invalid=true]]:border-destructive has-[[data-slot=text-field-input][aria-invalid=true]]:ring-0 has-[[data-slot=text-field-input][aria-invalid=true]:focus-visible]:border-destructive has-[[data-slot=text-field-input][aria-invalid=true]:focus-visible]:ring-0 dark:bg-input/30 dark:has-disabled:bg-muted dark:has-[[data-slot=text-field-input][aria-invalid=true]]:border-destructive/50 dark:has-[[data-slot=text-field-input][aria-invalid=true]:focus-visible]:border-destructive/50 dark:has-[[data-slot=text-field-input][aria-invalid=true]:focus-visible]:ring-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
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

const textFieldInputVariants = cva(
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

type TextFieldSize = NonNullable<
  VariantProps<typeof textFieldInputVariants>["size"]
>

const TextFieldSizeContext = React.createContext<TextFieldSize>("default")
const TextFieldControlContext = React.createContext(false)

function TextField({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Root> & {
  size?: TextFieldSize
}) {
  return (
    <TextFieldSizeContext.Provider value={size}>
      <FieldPrimitive.Root
        data-slot="text-field"
        data-size={size}
        className={cn(
          "group/text-field flex w-full flex-col gap-2 data-disabled:cursor-not-allowed data-disabled:opacity-70",
          className
        )}
        {...props}
      />
    </TextFieldSizeContext.Provider>
  )
}

function TextFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Label>) {
  return (
    <FieldPrimitive.Label
      data-slot="text-field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-label leading-none font-normal text-foreground select-none group-data-disabled/text-field:cursor-not-allowed group-data-disabled/text-field:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function TextFieldControl({
  className,
  size: sizeProp,
  onClick,
  ...props
}: React.ComponentProps<"div"> & {
  size?: TextFieldSize
}) {
  const contextSize = React.useContext(TextFieldSizeContext)
  const size = sizeProp ?? contextSize

  return (
    <TextFieldControlContext.Provider value={true}>
      <div
        data-slot="text-field-control"
        data-size={size}
        className={cn(textFieldControlVariants({ size }), className)}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) return
          if ((event.target as HTMLElement).closest("button,a,input,textarea")) {
            return
          }
          const input = event.currentTarget.querySelector<HTMLInputElement>(
            "[data-slot=text-field-input]"
          )
          if (!input || input.disabled || input.readOnly) return
          input.focus()
        }}
        {...props}
      />
    </TextFieldControlContext.Provider>
  )
}

function TextFieldInput({
  className,
  size: sizeProp,
  ...props
}: Omit<React.ComponentProps<typeof InputPrimitive>, "size"> & {
  size?: TextFieldSize
}) {
  const contextSize = React.useContext(TextFieldSizeContext)
  const size = sizeProp ?? contextSize
  const inControl = React.useContext(TextFieldControlContext)

  return (
    <InputPrimitive
      data-slot="text-field-input"
      data-size={size}
      className={cn(
        textFieldInputVariants({ size, inControl }),
        className
      )}
      {...props}
    />
  )
}

function clearTextFieldInput(input: HTMLInputElement) {
  const descriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )
  descriptor?.set?.call(input, "")
  input.dispatchEvent(new Event("input", { bubbles: true }))
  input.dispatchEvent(new Event("change", { bubbles: true }))
}

function TextFieldClearIcon({ className }: { className?: string }) {
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

function TextFieldClear({
  className,
  onClick,
  "aria-label": ariaLabel = "Clear",
  ...props
}: React.ComponentProps<"button">) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [show, setShow] = React.useState(false)

  React.useLayoutEffect(() => {
    const control = ref.current?.closest("[data-slot=text-field-control]")
    const input = control?.querySelector<HTMLInputElement>(
      "[data-slot=text-field-input]"
    )
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
      data-slot="text-field-clear"
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
          .closest("[data-slot=text-field-control]")
          ?.querySelector<HTMLInputElement>("[data-slot=text-field-input]")
        if (!input) return
        clearTextFieldInput(input)
        setShow(false)
        input.focus()
      }}
      {...props}
    >
      <TextFieldClearIcon className="size-4" />
    </button>
  )
}

function TextFieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Description>) {
  return (
    <FieldPrimitive.Description
      data-slot="text-field-description"
      className={cn(
        "m-0 text-caption font-normal text-muted-foreground group-data-disabled/text-field:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function TextFieldError({
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
            data-slot="text-field-error"
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
  TextField,
  TextFieldLabel,
  TextFieldControl,
  TextFieldInput,
  TextFieldClear,
  TextFieldDescription,
  TextFieldError,
  textFieldControlVariants,
  textFieldInputVariants,
}
`,
}

const cubixSourceByName: Record<string, BlockSourceFile> = {
  button: cubixButtonFile,
  input: cubixInputFile,
  textarea: cubixTextareaFile,
  badge: cubixBadgeFile,
  separator: cubixSeparatorFile,
  avatar: registrySourceFile(avatarRegistryItem),
  card: registrySourceFile(cardRegistryItem),
  empty: cubixEmptyFile,
  "input-group": cubixInputGroupFile,
  "text-field": cubixTextFieldFile,
  label: cubixLabelFile,
  checkbox: registrySourceFile(checkboxRegistryItem),
  "email-field": registrySourceFile(emailFieldRegistryItem),
  "password-field": registrySourceFile(passwordFieldRegistryItem),
  "phone-field": registrySourceFile(phoneFieldRegistryItem),
  tabs: registrySourceFile(tabsRegistryItem),
}

const cubixSourceDeps: Record<string, string[]> = {
  "input-group": ["button", "input", "textarea"],
}

const cubixSourceOrder = [
  "button",
  "badge",
  "separator",
  "avatar",
  "card",
  "empty",
  "input",
  "textarea",
  "input-group",
  "text-field",
  "tabs",
  "email-field",
  "password-field",
  "phone-field",
  "checkbox",
  "label",
] as const

function collectCubixSourceFiles(pageContent: string): BlockSourceFile[] {
  const names = new Set<string>()
  const importPattern = /from ["']@\/components\/cubix\/([^"']+)["']/g
  let match = importPattern.exec(pageContent)
  while (match) {
    names.add(match[1])
    match = importPattern.exec(pageContent)
  }

  const resolved = new Set<string>()
  function add(name: string) {
    if (resolved.has(name) || !(name in cubixSourceByName)) return
    resolved.add(name)
    for (const dep of cubixSourceDeps[name] ?? []) {
      add(dep)
    }
  }

  for (const name of names) {
    add(name)
  }

  return cubixSourceOrder
    .filter((name) => resolved.has(name))
    .map((name) => cubixSourceByName[name])
}

export const placeholderAssetFile: BlockSourceFile = {
  path: "public/blocks/404-placeholder.svg",
  content: `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" fill="none"><rect width="1200" height="1200" fill="#EAEAEA" rx="3"/><g opacity=".5"><g opacity=".5"><path fill="#FAFAFA" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/></g><path stroke="url(#a)" stroke-width="2.418" d="M0-1.209h553.581" transform="scale(1 -1) rotate(45 1163.11 91.165)"/><path stroke="url(#b)" stroke-width="2.418" d="M404.846 598.671h391.726"/><path stroke="url(#c)" stroke-width="2.418" d="M599.5 795.742V404.017"/><path stroke="url(#d)" stroke-width="2.418" d="m795.717 796.597-391.441-391.44"/><path fill="#fff" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/><g clip-path="url(#e)"><path fill="#666" fill-rule="evenodd" d="M616.426 586.58h-31.434v16.176l3.553-3.554.531-.531h9.068l.074-.074 8.463-8.463h2.565l7.18 7.181V586.58Zm-15.715 14.654 3.698 3.699 1.283 1.282-2.565 2.565-1.282-1.283-5.2-5.199h-6.066l-5.514 5.514-.073.073v2.876a2.418 2.418 0 0 0 2.418 2.418h26.598a2.418 2.418 0 0 0 2.418-2.418v-8.317l-8.463-8.463-7.181 7.181-.071.072Zm-19.347 5.442v4.085a6.045 6.045 0 0 0 6.046 6.045h26.598a6.044 6.044 0 0 0 6.045-6.045v-7.108l1.356-1.355-1.282-1.283-.074-.073v-17.989h-38.689v23.43l-.146.146.146.147Z" clip-rule="evenodd"/></g><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/></g><defs><linearGradient id="a" x1="554.061" x2="-.48" y1=".083" y2=".087" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="b" x1="796.912" x2="404.507" y1="599.963" y2="599.965" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="c" x1="600.792" x2="600.794" y1="403.677" y2="796.082" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="d" x1="404.85" x2="796.972" y1="403.903" y2="796.02" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><clipPath id="e"><path fill="#fff" d="M581.364 580.535h38.689v38.689h-38.689z"/></clipPath></defs></svg>
`,
}

type BlockFilesOptions = {
  placeholder?: boolean
  extra?: BlockSourceFile[]
}

export function buildNotFoundFiles(
  pageContent: string,
  options?: BlockFilesOptions
): BlockSourceFile[] {
  return buildBlockFiles("app/not-found.tsx", pageContent, options)
}

export function buildBlockFiles(
  pagePath: string,
  pageContent: string,
  options?: BlockFilesOptions
): BlockSourceFile[] {
  const extra = options?.extra ?? []
  const files: BlockSourceFile[] = [
    {
      path: pagePath,
      content: pageContent,
    },
    ...extra,
    ...collectCubixSourceFiles(
      [pageContent, ...extra.map((file) => file.content)].join("\n")
    ),
    cubixUtilsFile,
  ]

  if (options?.placeholder) {
    files.push(placeholderAssetFile)
  }

  return files
}
