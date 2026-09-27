"use client"

/*
  Cubix Checkbox - toggle control for checked, unchecked, and indeterminate.

  Composes with Label via id / htmlFor. Values and states use Cubix tokens.
  Set pending while an async save is in flight to replace the box with a spinner.
*/
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon, Loader2Icon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  pending = false,
  disabled,
  ...props
}: CheckboxPrimitive.Root.Props & {
  pending?: boolean
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-pending={pending ? "" : undefined}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={cn(
        "group/checkbox peer relative flex size-[18px] shrink-0 items-center justify-center rounded-[6px] border border-input transition-[background-color,border-color] outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:data-checked:opacity-50 disabled:data-indeterminate:opacity-50 data-disabled:cursor-not-allowed data-disabled:data-checked:opacity-50 data-disabled:data-indeterminate:opacity-50 dark:bg-input/30 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:focus-visible:ring-primary/20 data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground data-indeterminate:focus-visible:ring-primary/20 group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary dark:data-indeterminate:bg-primary data-pending:cursor-wait data-pending:border-transparent data-pending:bg-transparent data-pending:text-muted-foreground data-pending:opacity-100 data-pending:data-checked:border-transparent data-pending:data-checked:bg-transparent data-pending:data-checked:text-muted-foreground data-pending:data-indeterminate:border-transparent data-pending:data-indeterminate:bg-transparent data-pending:data-indeterminate:text-muted-foreground dark:data-pending:bg-transparent",
        className
      )}
      {...props}
    >
      {pending ? (
        <span
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current"
        >
          <Loader2Icon
            absoluteStrokeWidth
            size={18}
            strokeWidth={1.6}
            className="animate-spin"
            aria-hidden
          />
        </span>
      ) : (
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-primary-foreground transition-none"
        >
          <MinusIcon
            absoluteStrokeWidth
            size={12}
            strokeWidth={1.6}
            className="hidden group-data-indeterminate/checkbox:block"
          />
          <CheckIcon
            absoluteStrokeWidth
            size={12}
            strokeWidth={1.6}
            className="group-data-indeterminate/checkbox:hidden"
          />
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
