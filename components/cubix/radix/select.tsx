"use client"

/*
  Cubix Select - Persian-first single select (Radix UI version).

  Same part names, props and classes as the Base UI select. The trigger
  matches Cubix Text Field: 40px default height, 12px inline padding, a
  primary focus border and ring, a destructive border without a ring when
  invalid, and a muted background when disabled. Padding, the check indicator
  and the popup alignment use logical start / end. The trigger reports the
  closest dir / lang from the page; Radix reads direction from its provider,
  not from the DOM, so the root passes it on.
*/
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { DirectionProvider } from "@/components/cubix/radix/direction"
import { cn } from "@/lib/utils"

type TextDirection = "ltr" | "rtl"

type SelectLocale = {
  dir?: TextDirection
  lang?: string
}

type SelectItems =
  Record<string, React.ReactNode> | ReadonlyArray<{ value: string | null; label: React.ReactNode }>

const SelectLocaleContext = React.createContext<SelectLocale>({})

const SelectLocaleResolverContext = React.createContext<((locale: SelectLocale) => void) | null>(
  null
)

function toTextDirection(value: string | null | undefined): TextDirection | undefined {
  return value === "rtl" || value === "ltr" ? value : undefined
}

function resolveClosestDir(node: Element | null): TextDirection | undefined {
  return toTextDirection(node?.closest("[dir]")?.getAttribute("dir"))
}

function resolveClosestLang(node: Element | null): string | undefined {
  return node?.closest("[lang]")?.getAttribute("lang") ?? undefined
}

function localeDomProps(locale: SelectLocale) {
  return {
    ...(locale.dir ? { dir: locale.dir } : {}),
    ...(locale.lang ? { lang: locale.lang } : {}),
  }
}

/*
  Sizes: sm 32px (toolbars, beside sm buttons), default 40px and lg 48px
  (beside Cubix fields and default / lg buttons). The chevron sits where the
  Combobox chevron sits: 12px from the end edge (16px on lg).
*/
const selectTriggerVariants = cva(
  "group/select-trigger flex w-fit min-w-0 cursor-default items-center justify-between rounded-lg border border-input bg-transparent font-normal tracking-normal whitespace-nowrap text-foreground transition-colors outline-none select-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:border-transparent disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-0 data-placeholder:text-muted-foreground dark:bg-input/30 dark:disabled:bg-muted dark:aria-invalid:border-destructive/50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        sm: "h-8 gap-1.5 ps-3 pe-2.5 text-caption",
        default: "h-10 gap-2 ps-3 pe-3 text-label",
        lg: "h-12 gap-2.5 ps-3.5 pe-4 text-label",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const selectPopupStyles =
  "cn-menu-target cn-menu-translucent relative z-50 max-h-[min(var(--radix-select-content-available-height),20rem)] min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"

const selectItemStyles =
  "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

/*
  The root renders no element, so the trigger reports the closest dir / lang
  from the page and the root shares it with the portaled popup. Explicit
  dir / lang props on the root always win. A null value shows the
  placeholder. items is accepted for paste-ready parity with Base UI; Radix
  reads the label from the selected item.
*/
function Select({
  dir,
  lang,
  value,
  defaultValue,
  onValueChange,
  items: _items,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.Root>,
  "dir" | "value" | "defaultValue" | "onValueChange"
> & {
  dir?: TextDirection
  lang?: string
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  items?: SelectItems
}) {
  const [resolved, setResolved] = React.useState<SelectLocale>({})
  const resolvedDir = resolved.dir
  const resolvedLang = resolved.lang
  const locale = React.useMemo<SelectLocale>(
    () => ({
      dir: toTextDirection(dir) ?? resolvedDir,
      lang: lang ?? resolvedLang,
    }),
    [dir, lang, resolvedDir, resolvedLang]
  )

  return (
    <SelectLocaleResolverContext.Provider value={setResolved}>
      <SelectLocaleContext.Provider value={locale}>
        <DirectionProvider dir={locale.dir ?? "ltr"}>
          <SelectPrimitive.Root
            data-slot="select"
            dir={locale.dir}
            value={value === null ? "" : value}
            defaultValue={defaultValue ?? undefined}
            onValueChange={onValueChange}
            {...props}
          />
        </DirectionProvider>
      </SelectLocaleContext.Provider>
    </SelectLocaleResolverContext.Provider>
  )
}

function SelectGroup({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex-1 truncate text-start", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ref,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>) {
  const locale = React.useContext(SelectLocaleContext)
  const reportLocale = React.useContext(SelectLocaleResolverContext)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const setTriggerRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  React.useLayoutEffect(() => {
    const parent = triggerRef.current?.parentElement ?? null
    reportLocale?.({
      dir: resolveClosestDir(parent),
      lang: resolveClosestLang(parent),
    })
  }, [reportLocale])

  return (
    <SelectPrimitive.Trigger
      ref={setTriggerRef}
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size }), className)}
      {...localeDomProps(locale)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/*
  The popup opens below the trigger by default, the same on every base. Set
  alignItemWithTrigger to overlap the selected item with the trigger instead
  (Radix item-aligned position).
*/
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  dir,
  lang,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Content>, "position"> & {
  alignItemWithTrigger?: boolean
  lang?: string
}) {
  const locale = React.useContext(SelectLocaleContext)
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }
  const position = alignItemWithTrigger ? "item-aligned" : "popper"

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={alignItemWithTrigger}
        position={position}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className={cn(selectPopupStyles, className)}
        {...localeDomProps(contentLocale)}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className="p-1 data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)"
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-2 py-1 text-caption font-medium tracking-normal whitespace-nowrap text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(selectItemStyles, className)}
      {...props}
    >
      <span className="flex flex-1 items-center gap-2 truncate">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
}
