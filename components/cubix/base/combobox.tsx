"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { Button } from "@/components/cubix/base/button"
import {
  DirectionProvider,
  useDirection,
} from "@/components/cubix/base/direction"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/cubix/base/input-group"
import { cn } from "@/lib/utils"

/*
  The combobox field matches Cubix Text Field: h-10, 12px inline padding
  (8px beside an icon or button, 24px icons), primary focus border and ring,
  a destructive border without a ring when invalid, and a muted background
  when disabled. The search input inside a button-triggered popup keeps the
  compact input-group style.
*/
const comboboxFieldStyles =
  "h-10 has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-primary/20 has-[[data-slot=input-group-control]:focus-visible]:ring-offset-1 has-[[data-slot=input-group-control]:focus-visible]:ring-offset-background has-[[data-slot][aria-invalid=true]]:ring-0 has-[[data-slot][aria-invalid=true]]:ring-primary/20 dark:has-[[data-slot][aria-invalid=true]]:ring-primary/20 has-[[data-slot][aria-invalid=true]:focus-visible]:border-destructive has-[[data-slot][aria-invalid=true]:focus-visible]:ring-0 dark:has-[[data-slot][aria-invalid=true]]:border-destructive/50 dark:has-[[data-slot][aria-invalid=true]:focus-visible]:border-destructive/50 has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-muted has-disabled:opacity-70 dark:has-disabled:bg-muted has-[>[data-align=inline-end]]:[&>input]:pe-2 has-[>[data-align=inline-start]]:[&>input]:ps-2 [&>[data-slot=input-group-addon]]:ms-0 [&>[data-slot=input-group-addon]]:me-0 [&>[data-slot=input-group-addon]>svg:not([class*='size-'])]:size-6"

const comboboxFieldInputStyles =
  "h-full cursor-text px-3 py-0 text-label md:text-label font-normal leading-none tracking-normal text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-100 disabled:placeholder:text-muted-foreground"

/*
  Sizes follow Cubix Text Field: default is 40px with 12px inline padding
  (8px on an icon or button side); lg is 48px with 14px (12px on the icon
  side, 10px between the text and the icon).
*/
type ComboboxSize = "default" | "lg"

const comboboxFieldSizes: Record<ComboboxSize, string> = {
  default: "",
  lg: "h-12 has-[>[data-align=inline-end]]:[&>input]:pe-2.5 has-[>[data-align=inline-start]]:[&>input]:ps-2.5 [&>[data-align=inline-end]]:pe-3 [&>[data-align=inline-start]]:ps-3",
}

const comboboxFieldInputSizes: Record<ComboboxSize, string> = {
  default: "",
  lg: "px-3.5",
}

const comboboxChipsSizes: Record<ComboboxSize, string> = {
  default: "",
  lg: "min-h-12 px-3.5 py-1.5 has-data-[slot=combobox-chip]:ps-3",
}

/* The chevron stays centered on the first row: (48 - 24) / 2 - 1px border. */
const comboboxChipsTriggerSizes: Record<ComboboxSize, string> = {
  default: "",
  lg: "end-3 top-2.75",
}

/*
  The chips field's chevron matches the single field's trigger: a 24px ghost
  button 8px from the inline-end edge, pinned to the first 40px row (it stays
  at the top when chips wrap). The chips row reserves pe-10 so chips and the
  input never run under it.
*/
const comboboxChipsTriggerStyles =
  "absolute end-2 top-1.75 cursor-default disabled:cursor-not-allowed data-pressed:bg-transparent"

/*
  The clear button matches Cubix Text Field's clear: a plain 24px button with
  a filled circle-X icon, muted until hover and never a background.
*/
const comboboxClearStyles =
  "inline-flex size-6 shrink-0 cursor-default items-center justify-center rounded-md bg-transparent text-muted-foreground outline-none transition-colors hover:bg-transparent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:cursor-not-allowed aria-expanded:bg-transparent dark:hover:bg-transparent"

function ComboboxClearIcon({ className }: { className?: string }) {
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

type TextDirection = "ltr" | "rtl"

type ComboboxLocale = {
  dir?: TextDirection
  lang?: string
}

const ComboboxLocaleContext = React.createContext<ComboboxLocale>({})

const ComboboxLocaleResolverContext = React.createContext<
  ((locale: ComboboxLocale) => void) | null
>(null)

/*
  True inside ComboboxContent. An input rendered there is the search field of
  a button-triggered popup: it hides the trigger by default and does not
  become the positioning anchor.
*/
const ComboboxContentContext = React.createContext(false)

function toTextDirection(
  value: string | null | undefined
): TextDirection | undefined {
  return value === "rtl" || value === "ltr" ? value : undefined
}

function resolveClosestDir(node: Element | null): TextDirection | undefined {
  return toTextDirection(node?.closest("[dir]")?.getAttribute("dir"))
}

function resolveClosestLang(node: Element | null): string | undefined {
  return node?.closest("[lang]")?.getAttribute("lang") ?? undefined
}

function localeDomProps(locale: ComboboxLocale) {
  return {
    ...(locale.dir ? { dir: locale.dir } : {}),
    ...(locale.lang ? { lang: locale.lang } : {}),
  }
}

/*
  The root renders no element, so the input group, chips or trigger report
  the closest dir / lang from the page and the root shares it with the
  portaled popup. Explicit dir / lang props on the root always win.
*/
function useLocaleReporter<T extends HTMLElement>(
  ref: React.Ref<T> | undefined
) {
  const report = React.useContext(ComboboxLocaleResolverContext)
  const inContent = React.useContext(ComboboxContentContext)
  const nodeRef = React.useRef<T | null>(null)
  const setRef = React.useCallback(
    (node: T | null) => {
      nodeRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  React.useLayoutEffect(() => {
    if (inContent || !report) return
    const parent = nodeRef.current?.parentElement ?? null
    report({
      dir: resolveClosestDir(parent),
      lang: resolveClosestLang(parent),
    })
  }, [report, inContent])

  return setRef
}

type ComboboxProps<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
> = ComboboxPrimitive.Root.Props<Value, Multiple, Item> & {
  dir?: TextDirection
  lang?: string
}


/*
  ComboboxInput reports its own disabled prop to the root, so the popup stays
  closed even when only the input (not the root) is marked disabled.
*/
type ComboboxDisabledState = {
  disabled: boolean
  report: (disabled: boolean) => void
}

const ComboboxDisabledContext =
  React.createContext<ComboboxDisabledState | null>(null)

function useInputDisabled(disabled: boolean, inContent: boolean) {
  const state = React.useContext(ComboboxDisabledContext)
  const report = state?.report
  React.useLayoutEffect(() => {
    if (inContent || !report) return
    report(disabled)
    return () => report(false)
  }, [report, disabled, inContent])
  return disabled || Boolean(state?.disabled)
}

function Combobox<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
>({
  dir,
  lang,
  disabled: disabledProp = false,
  ...props
}: ComboboxProps<Value, Multiple, Item>) {
  const [inputDisabled, setInputDisabled] = React.useState(false)
  const disabledState = React.useMemo<ComboboxDisabledState>(
    () => ({ disabled: disabledProp, report: setInputDisabled }),
    [disabledProp]
  )
  const inheritedDir = useDirection()
  const [resolved, setResolved] = React.useState<ComboboxLocale>({})
  const report = React.useCallback((next: ComboboxLocale) => {
    setResolved((prev) =>
      prev.dir === next.dir && prev.lang === next.lang ? prev : next
    )
  }, [])
  const resolvedDir = resolved.dir
  const resolvedLang = resolved.lang
  const locale = React.useMemo<ComboboxLocale>(
    () => ({
      dir: toTextDirection(dir) ?? resolvedDir,
      lang: lang ?? resolvedLang,
    }),
    [dir, lang, resolvedDir, resolvedLang]
  )

  return (
    <ComboboxDisabledContext.Provider value={disabledState}>
      <ComboboxLocaleResolverContext.Provider value={report}>
        <ComboboxLocaleContext.Provider value={locale}>
          <DirectionProvider direction={locale.dir ?? inheritedDir}>
            <ComboboxPrimitive.Root<Value, Multiple, Item>
              {...(props as ComboboxPrimitive.Root.Props<Value, Multiple, Item>)}
              disabled={disabledProp || inputDisabled}
            />
          </DirectionProvider>
        </ComboboxLocaleContext.Provider>
      </ComboboxLocaleResolverContext.Provider>
    </ComboboxDisabledContext.Provider>
  )
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Trigger>) {
  const setRef = useLocaleReporter<HTMLButtonElement>(ref)

  return (
    <ComboboxPrimitive.Trigger
      ref={setRef}
      data-slot="combobox-trigger"
      className={cn(
        "cursor-default disabled:cursor-not-allowed [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      aria-label="Clear"
      className={cn(comboboxClearStyles, className)}
      {...props}
    >
      <ComboboxClearIcon className="pointer-events-none size-4" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger,
  showClear = false,
  size = "default",
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  showTrigger?: boolean
  showClear?: boolean
  size?: ComboboxSize
}) {
  const inContent = React.useContext(ComboboxContentContext)
  const isDisabled = useInputDisabled(disabled, inContent)
  const setGroupRef = useLocaleReporter<HTMLDivElement>(undefined)
  const withTrigger = showTrigger ?? !inContent
  const groupClassName = cn(
    "w-auto cursor-default [&>[data-slot=input-group-addon]]:cursor-default has-disabled:cursor-not-allowed has-disabled:[&>[data-slot=input-group-addon]]:cursor-not-allowed",
    inContent ? "rounded-sm has-[[data-slot=input-group-control]:focus-visible]:border-input has-[[data-slot=input-group-control]:focus-visible]:ring-0" : cn(comboboxFieldStyles, comboboxFieldSizes[size]),
    typeof className === "string" ? className : undefined
  )

  const content = (
    <>
      <ComboboxPrimitive.Input
        disabled={isDisabled}
        render={
          <InputGroupInput
            className={
              inContent
                ? "cursor-text text-label md:text-label disabled:cursor-not-allowed"
                : cn(comboboxFieldInputStyles, comboboxFieldInputSizes[size])
            }
          />
        }
        {...props}
      />
      {(withTrigger || (showClear && !isDisabled)) && (
        <InputGroupAddon align="inline-end">
          {withTrigger && (
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              render={<ComboboxTrigger />}
              data-slot="input-group-button"
              className="cursor-default disabled:cursor-not-allowed group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
              disabled={isDisabled}
            />
          )}
          {showClear && !isDisabled && <ComboboxClear />}
        </InputGroupAddon>
      )}
      {children}
    </>
  )

  // Inside the popup the positioner anchors to the trigger, so the group is
  // a plain InputGroup there.
  if (inContent) {
    return <InputGroup className={groupClassName}>{content}</InputGroup>
  }

  // Outside the popup, Combobox.InputGroup makes the whole group (addons
  // included) the anchor, so the popup matches its width and start edge.
  return (
    <ComboboxPrimitive.InputGroup
      ref={setGroupRef}
      render={<InputGroup className={groupClassName} />}
    >
      {content}
    </ComboboxPrimitive.InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  anchor,
  dir,
  lang,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  const locale = React.useContext(ComboboxLocaleContext)
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  // dir on the Positioner lets floating-ui resolve the start alignment to
  // the right edge of the anchor in RTL.
  return (
    <ComboboxContentContext.Provider value>
      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner
          className="isolate z-50 outline-none"
          dir={contentLocale.dir}
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          anchor={anchor}
        >
          <ComboboxPrimitive.Popup
            data-slot="combobox-content"
            className={cn(
              "cn-menu-target cn-menu-translucent cursor-default group/combobox-content relative z-50 flex max-h-[min(var(--available-height),20rem)] w-max max-w-(--available-width) min-w-[max(150px,var(--anchor-width))] origin-(--transform-origin) flex-col overflow-hidden rounded-lg bg-popover text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:w-auto *:data-[slot=input-group]:shrink-0",
              className
            )}
            {...localeDomProps(contentLocale)}
            {...props}
          />
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxContentContext.Provider>
  )
}

/*
  The list is the scroll container, so it carries the menu's p-1: the
  separator's -mx-1 then reaches the popup edges without overflowing.
*/
function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "min-h-0 scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span
            aria-hidden
            className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"
          />
        }
      >
        <CheckIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "px-2 py-1 text-caption text-muted-foreground whitespace-nowrap font-medium tracking-normal",
        className
      )}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

/*
  Base UI keeps Empty mounted (it announces changes to screen readers) and
  renders its children only when the list is empty, so the padding is
  dropped while it has no content instead of hiding the element.
*/
function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "w-full px-3 py-2.75 text-center text-label tracking-normal text-muted-foreground empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  children,
  showTrigger = true,
  size = "default",
  ref,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Chips> & {
  showTrigger?: boolean
  size?: ComboboxSize
}) {
  const setRef = useLocaleReporter<HTMLDivElement>(ref)

  return (
    <ComboboxPrimitive.Chips
      ref={setRef}
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-10 cursor-default flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent bg-clip-padding px-3 py-1 text-label font-normal tracking-normal text-foreground transition-colors outline-none focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20 focus-within:ring-offset-1 focus-within:ring-offset-background has-aria-invalid:border-destructive has-aria-invalid:ring-0 has-aria-invalid:focus-within:border-destructive has-aria-invalid:focus-within:ring-0 has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-muted has-disabled:opacity-70 has-data-[slot=combobox-chip]:ps-2 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-disabled:bg-muted",
        comboboxChipsSizes[size],
        showTrigger && (size === "lg" ? "relative pe-11.5" : "relative pe-10"),
        className
      )}
      {...props}
    >
      {children}
      {showTrigger && (
        <InputGroupButton
          size="icon-xs"
          variant="ghost"
          render={<ComboboxTrigger />}
          data-slot="input-group-button"
          className={cn(
            comboboxChipsTriggerStyles,
            comboboxChipsTriggerSizes[size]
          )}
        />
      )}
    </ComboboxPrimitive.Chips>
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.25))] w-fit cursor-default items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-caption font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pe-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ms-1 cursor-default bg-transparent opacity-50 hover:bg-transparent hover:opacity-100 active:bg-transparent dark:hover:bg-transparent"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn(
        "min-w-16 flex-1 cursor-text bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export type { ComboboxProps, ComboboxSize }

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
