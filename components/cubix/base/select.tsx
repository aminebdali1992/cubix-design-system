"use client"

/*
  Cubix Select - Persian-first single select.

  The trigger matches Cubix Text Field: 40px default height, 12px inline
  padding, a primary focus border and ring, a destructive border without a
  ring when invalid, and a muted background when disabled. Padding, the check
  indicator and the popup alignment use logical start / end, so the same
  markup is correct in RTL and LTR. The trigger reports the closest dir / lang
  from the page so the portaled popup follows it.
*/
import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { DirectionProvider, useDirection } from "@/components/cubix/base/direction"
import { cn } from "@/lib/utils"

type TextDirection = "ltr" | "rtl"

type SelectLocale = {
  dir?: TextDirection
  lang?: string
}

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
  "cn-menu-target cn-menu-translucent relative isolate z-50 max-h-[min(var(--available-height),20rem)] w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 outline-none data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"

const selectItemStyles =
  "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

type SelectItemLabel = { value: unknown; label: React.ReactNode }

/*
  Base UI shows the raw value unless it gets items. The Radix and React Aria
  selects show the selected item's label, so the labels are collected from
  the item elements in the parts (SelectItem or a wrapper that takes value
  and children). Pass items when the items render inside a component the
  root cannot see.
*/
function collectItemLabels(node: React.ReactNode, labels: SelectItemLabel[]) {
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement<{ value?: unknown; children?: React.ReactNode }>(child)) {
      return
    }
    const { value, children } = child.props
    const isItem =
      child.type === SelectItem ||
      (typeof child.type !== "string" &&
        (typeof value === "string" || typeof value === "number") &&
        children !== undefined)
    if (isItem) {
      labels.push({ value, label: children })
      return
    }
    collectItemLabels(children, labels)
  })
}

/*
  The root renders no element, so the trigger reports the closest dir / lang
  from the page and the root shares it with the portaled popup. Explicit
  dir / lang props on the root always win.
*/
function Select<Value, Multiple extends boolean | undefined = false>({
  dir,
  lang,
  items,
  children,
  ...props
}: SelectPrimitive.Root.Props<Value, Multiple> & {
  dir?: TextDirection
  lang?: string
}) {
  const collectedItems = React.useMemo(() => {
    if (items !== undefined) return items
    const labels: SelectItemLabel[] = []
    collectItemLabels(children, labels)
    return labels
  }, [items, children])
  const inheritedDir = useDirection()
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
        <DirectionProvider direction={locale.dir ?? inheritedDir}>
          <SelectPrimitive.Root items={collectedItems} {...props}>
            {children}
          </SelectPrimitive.Root>
        </DirectionProvider>
      </SelectLocaleContext.Provider>
    </SelectLocaleResolverContext.Provider>
  )
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
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
}: Omit<SelectPrimitive.Trigger.Props, "ref"> &
  VariantProps<typeof selectTriggerVariants> & {
    ref?: React.Ref<HTMLElement>
  }) {
  const locale = React.useContext(SelectLocaleContext)
  const reportLocale = React.useContext(SelectLocaleResolverContext)
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const setTriggerRef = React.useCallback(
    (node: HTMLElement | null) => {
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
      <SelectPrimitive.Icon render={<ChevronDownIcon className="text-muted-foreground" />} />
    </SelectPrimitive.Trigger>
  )
}

/*
  The popup opens below the trigger by default, the same on every base. Set
  alignItemWithTrigger to overlap the selected item with the trigger instead.
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
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  > & {
    lang?: string
  }) {
  const locale = React.useContext(SelectLocaleContext)
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  // dir on the Positioner lets floating-ui resolve the start alignment to
  // the right edge of the trigger in RTL.
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        dir={contentLocale.dir}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(selectPopupStyles, className)}
          {...localeDomProps(contentLocale)}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="p-1">{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-2 py-1 text-caption font-medium tracking-normal whitespace-nowrap text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(selectItemStyles, className)}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span
            aria-hidden
            className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"
          />
        }
      >
        <CheckIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
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
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
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
