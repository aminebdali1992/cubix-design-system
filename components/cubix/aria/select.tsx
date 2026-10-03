"use client"

/*
  Cubix Select - Persian-first single select (React Aria version).

  Same part names, props and classes as the Base UI select, composed from
  React Aria's Select (Button + SelectValue + Popover + ListBox). The trigger
  matches Cubix Text Field: 40px default height, 12px inline padding, a
  primary focus border and ring, a destructive border without a ring when
  invalid, and a muted background when disabled.

  React Aria reads direction and arrow-key order from its locale, not from
  the dir attribute, so the trigger reports the closest dir / lang from the
  page and the root maps it to a locale. The trigger also reports its
  accessible name (aria-label or an associated <label>) and aria-invalid,
  which React Aria takes on the root.
*/
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import {
  Button as AriaButton,
  Header,
  I18nProvider,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  Separator,
  type ButtonProps as AriaButtonProps,
  type HeaderProps,
  type ListBoxItemProps,
  type ListBoxSectionProps,
  type PopoverProps,
  type SeparatorProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

type TextDirection = "ltr" | "rtl"

type SelectLocale = {
  dir?: TextDirection
  lang?: string
}

type SelectTriggerReport = SelectLocale & {
  label?: string
  invalid?: boolean
}

type SelectItems =
  Record<string, React.ReactNode> | ReadonlyArray<{ value: string | null; label: React.ReactNode }>

const SelectLocaleContext = React.createContext<SelectLocale>({})

const SelectReportContext = React.createContext<((report: SelectTriggerReport) => void) | null>(
  null
)

function toTextDirection(value: string | null | undefined): TextDirection | undefined {
  return value === "rtl" || value === "ltr" ? value : undefined
}

function resolveClosestDir(node: Element): TextDirection | undefined {
  return toTextDirection(node.closest("[dir]")?.getAttribute("dir"))
}

function resolveClosestLang(node: Element): string | undefined {
  return node.closest("[lang]")?.getAttribute("lang") ?? undefined
}

function resolveAriaLocale(locale: SelectLocale): string | undefined {
  if (locale.lang) return locale.lang
  if (locale.dir === "rtl") return "fa-IR"
  if (locale.dir === "ltr") return "en-US"
  return undefined
}

function localeDomProps(locale: SelectLocale) {
  return {
    ...(locale.dir ? { dir: locale.dir } : {}),
    ...(locale.lang ? { lang: locale.lang } : {}),
  }
}

function textContent(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textContent).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return textContent(node.props.children)
  }
  return ""
}

function sameReport(a: SelectTriggerReport, b: SelectTriggerReport) {
  return a.dir === b.dir && a.lang === b.lang && a.label === b.label && a.invalid === b.invalid
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
  "cn-menu-target cn-menu-translucent z-50 flex w-(--trigger-width) min-w-36 origin-(--trigger-anchor-point) flex-col overflow-hidden rounded-lg bg-popover text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 outline-none data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95"

// React Aria sets the popover's max-height inline (the available space), so
// the 20rem cap of the Base UI popup sits on the scrolling list here.
const selectListStyles =
  "max-h-80 min-h-0 scroll-py-1 overflow-y-auto overscroll-contain p-1 outline-none"

const selectItemStyles =
  "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none data-focused:bg-accent data-focused:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

/*
  The root renders a display: contents wrapper (React Aria needs an element),
  so layout and Button Group joins act on the trigger. A null value shows the
  placeholder. items is accepted for paste-ready parity with Base UI; React
  Aria reads the label from the selected item.
*/
function Select({
  value,
  defaultValue,
  onValueChange,
  items: _items,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  required,
  name,
  dir,
  lang,
  children,
}: {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  items?: SelectItems
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  dir?: TextDirection
  lang?: string
  children?: React.ReactNode
}) {
  const [report, setReport] = React.useState<SelectTriggerReport>({})
  const handleReport = React.useCallback((next: SelectTriggerReport) => {
    setReport((prev) => (sameReport(prev, next) ? prev : next))
  }, [])
  const reportedDir = report.dir
  const reportedLang = report.lang
  const locale = React.useMemo<SelectLocale>(
    () => ({
      dir: toTextDirection(dir) ?? reportedDir,
      lang: lang ?? reportedLang,
    }),
    [dir, lang, reportedDir, reportedLang]
  )

  return (
    <SelectReportContext.Provider value={handleReport}>
      <SelectLocaleContext.Provider value={locale}>
        <I18nProvider locale={resolveAriaLocale(locale)}>
          <AriaSelect
            data-slot="select"
            className="contents"
            aria-label={report.label}
            value={value}
            defaultValue={defaultValue}
            onChange={
              onValueChange ? (key) => onValueChange(key == null ? null : String(key)) : undefined
            }
            isOpen={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            isDisabled={disabled}
            isRequired={required}
            isInvalid={report.invalid}
            name={name}
          >
            {children}
          </AriaSelect>
        </I18nProvider>
      </SelectLocaleContext.Provider>
    </SelectReportContext.Provider>
  )
}

function SelectGroup({
  className,
  ...props
}: Omit<ListBoxSectionProps<object>, "className"> & { className?: string }) {
  return (
    <ListBoxSection data-slot="select-group" className={cn("scroll-my-1", className)} {...props} />
  )
}

function SelectValue({
  className,
  placeholder,
}: {
  className?: string
  placeholder?: React.ReactNode
}) {
  return (
    <AriaSelectValue
      data-slot="select-value"
      className={cn("flex-1 truncate text-start data-placeholder:text-muted-foreground", className)}
    >
      {({ isPlaceholder, defaultChildren }) => (isPlaceholder ? placeholder : defaultChildren)}
    </AriaSelectValue>
  )
}

/*
  React Aria's Button drops aria-invalid, so the trigger renders its own
  <button> through render to keep the invalid state on the element.
*/
function SelectTrigger({
  className,
  size = "default",
  children,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  ref,
  ...props
}: Omit<AriaButtonProps, "className" | "children" | "render"> &
  VariantProps<typeof selectTriggerVariants> & {
    className?: string
    children?: React.ReactNode
    "aria-invalid"?: boolean | "true" | "false"
    ref?: React.Ref<HTMLButtonElement>
  }) {
  const locale = React.useContext(SelectLocaleContext)
  const report = React.useContext(SelectReportContext)
  const invalid = ariaInvalid === true || ariaInvalid === "true"
  const nodeRef = React.useRef<HTMLButtonElement | null>(null)
  const setRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      nodeRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  // React Aria also renders the parts once in a hidden tree to build the
  // collection; nodes there are not DOM elements and are skipped.
  React.useLayoutEffect(() => {
    const node = nodeRef.current
    const parent = node?.parentElement
    if (!report || !(node instanceof HTMLButtonElement) || !(parent instanceof Element)) {
      return
    }
    const labelText = node.labels?.[0]?.textContent?.trim()
    report({
      dir: resolveClosestDir(parent),
      lang: resolveClosestLang(parent),
      label: ariaLabel ?? (labelText || undefined),
      invalid,
    })
  }, [report, ariaLabel, invalid])

  return (
    <AriaButton
      ref={setRef}
      data-slot="select-trigger"
      data-size={size}
      aria-label={ariaLabel}
      className={cn(selectTriggerVariants({ size }), className)}
      // Cubix keeps aria-invalid on the trigger button so forms can style invalid selects.
      // eslint-disable-next-line jsx-a11y/role-supports-aria-props -- intentional on the native button trigger
      render={(domProps) => <button {...domProps} aria-invalid={invalid || undefined} />}
      {...localeDomProps(locale)}
      {...props}
    >
      {children}
      <ChevronDownIcon aria-hidden className="text-muted-foreground" />
    </AriaButton>
  )
}

type Side = "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
type Align = "start" | "center" | "end"
type Placement = NonNullable<PopoverProps["placement"]>

function toPlacement(side: Side, align: Align): Placement {
  const logicalSide = side === "inline-start" ? "start" : side === "inline-end" ? "end" : side
  if (align === "center") return logicalSide
  if (logicalSide === "top" || logicalSide === "bottom") {
    return `${logicalSide} ${align}` as Placement
  }
  return `${logicalSide} ${align === "end" ? "bottom" : "top"}` as Placement
}

/*
  alignOffset follows the Base UI meaning: a positive value moves the popup
  away from the aligned edge. React Aria's crossOffset is physical, so flip it
  for end alignment and for the logical start edge in RTL.
*/
function toCrossOffset(
  alignOffset: number,
  side: Side,
  align: Align,
  dir: TextDirection | undefined
) {
  if (align === "center" || alignOffset === 0) return alignOffset
  const vertical = side === "top" || side === "bottom"
  const endSign = align === "end" ? -1 : 1
  const rtlSign = vertical && dir === "rtl" ? -1 : 1
  return alignOffset * endSign * rtlSign
}

/*
  The popup opens below the trigger, the same default as the Base UI and
  Radix selects. alignItemWithTrigger is accepted for paste-ready parity;
  React Aria always positions the list as a popover.
*/
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger: _alignItemWithTrigger,
  dir,
  lang,
  ...props
}: Omit<PopoverProps, "placement" | "offset" | "crossOffset" | "className" | "children" | "dir"> & {
  className?: string
  children?: React.ReactNode
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
  alignItemWithTrigger?: boolean
  dir?: TextDirection
  lang?: string
}) {
  const locale = React.useContext(SelectLocaleContext)
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <Popover
      data-slot="select-content"
      placement={toPlacement(side, align)}
      // React Aria floors the popover position (Math.floor of the anchor
      // edge + offset). The extra half pixel turns that into rounding to
      // the nearest pixel, as floating-ui does for the Base UI and Radix
      // popups, so a fractional anchor edge lands on the same pixel.
      offset={sideOffset + 0.5}
      crossOffset={toCrossOffset(alignOffset, side, align, contentLocale.dir)}
      className={cn(selectPopupStyles, className)}
      {...localeDomProps(contentLocale)}
      {...props}
    >
      <ListBox data-slot="select-list" className={selectListStyles}>
        {children}
      </ListBox>
    </Popover>
  )
}

function SelectLabel({
  className,
  ...props
}: Omit<HeaderProps, "className"> & { className?: string }) {
  return (
    <Header
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
  value,
  disabled,
  textValue,
  ...props
}: Omit<ListBoxItemProps<object>, "className" | "children" | "id" | "value" | "isDisabled"> & {
  className?: string
  children?: React.ReactNode
  value: string
  disabled?: boolean
}) {
  return (
    <ListBoxItem
      id={value}
      textValue={textValue ?? textContent(children)}
      isDisabled={disabled}
      data-slot="select-item"
      className={cn(selectItemStyles, className)}
      {...props}
    >
      {({ isSelected }) => (
        <>
          <span className="flex flex-1 items-center gap-2 truncate">{children}</span>
          {isSelected ? (
            <span
              aria-hidden
              className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"
            >
              <CheckIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />
            </span>
          ) : null}
        </>
      )}
    </ListBoxItem>
  )
}

function SelectSeparator({
  className,
  ...props
}: Omit<SeparatorProps, "className"> & { className?: string }) {
  return (
    <Separator
      data-slot="select-separator"
      elementType="div"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
}
