"use client"

/*
  Cubix Combobox - React Aria version.

  Same part names, props and classes as the Base UI combobox, composed from
  React Aria's ComboBox (Group + Input + Button + Popover + ListBox). Two
  cases need a different React Aria root:
  - multiple: ComboBox with selectionMode="multiple"; chips are rendered from
    the selected values and removed through the same value state.
  - a standalone ComboboxTrigger (the search input moves into the popup):
    React Aria's ComboBox needs its input outside the popover, so this case
    renders Select + Autocomplete, the pattern React Aria documents for a
    searchable select.
  Values can be strings or objects. Each item gets a React Aria key from
  itemToStringValue, value.value or value.id (or a stable generated id), and
  its label from itemToStringLabel or value.label.
*/
import * as React from "react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"
import {
  Autocomplete,
  Button as AriaButton,
  ButtonContext,
  ComboBox,
  ComboBoxStateContext,
  Group,
  Header,
  I18nProvider,
  Input as AriaInput,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
  Select,
  Separator,
  TextField,
  useFilter,
  type ButtonProps as AriaButtonProps,
  type GroupProps,
  type HeaderProps,
  type InputProps as AriaInputProps,
  type Key,
  type ListBoxItemProps,
  type ListBoxProps,
  type ListBoxSectionProps,
  type PopoverProps,
  type SeparatorProps,
} from "react-aria-components"

import { buttonVariants } from "@/components/cubix/aria/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/cubix/aria/input-group"
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

const popupStyles =
  "cn-menu-target cn-menu-translucent cursor-default group/combobox-content relative z-50 flex w-max min-w-[max(150px,var(--trigger-width))] origin-(--trigger-anchor-point) flex-col overflow-hidden rounded-lg bg-popover text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 outline-none data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:w-auto *:data-[slot=input-group]:shrink-0"

// React Aria sets the popover's max-height inline (the available space), so
// the 20rem cap of the Base UI popup sits on the scrolling list here.
const listStyles =
  "max-h-80 min-h-0 scroll-py-1 overflow-y-auto overscroll-contain p-1 outline-none data-empty:p-0"

const itemStyles =
  "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none data-focused:bg-accent data-focused:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5"

const emptyStyles =
  "w-full px-3 py-2.75 text-center text-label tracking-normal text-muted-foreground empty:p-0"

type TextDirection = "ltr" | "rtl"

type ComboboxLocale = {
  dir?: TextDirection
  lang?: string
}

const ComboboxLocaleContext = React.createContext<ComboboxLocale>({})

const ComboboxLocaleResolverContext = React.createContext<
  ((locale: ComboboxLocale) => void) | null
>(null)

/* True inside ComboboxContent (the search input of a button-triggered popup). */
const ComboboxContentContext = React.createContext(false)

function toTextDirection(value: string | null | undefined): TextDirection | undefined {
  return value === "rtl" || value === "ltr" ? value : undefined
}

function resolveClosestDir(node: Element): TextDirection | undefined {
  return toTextDirection(node.closest("[dir]")?.getAttribute("dir"))
}

function resolveClosestLang(node: Element): string | undefined {
  return node.closest("[lang]")?.getAttribute("lang") ?? undefined
}

/*
  React Aria resolves logical placement (start / end) and arrow-key order from
  its locale, not from the dir attribute, so RTL pages get an RTL locale.
*/
function resolveAriaLocale(locale: ComboboxLocale): string | undefined {
  if (locale.lang) return locale.lang
  if (locale.dir === "rtl") return "fa-IR"
  if (locale.dir === "ltr") return "en-US"
  return undefined
}

function localeDomProps(locale: ComboboxLocale) {
  return {
    ...(locale.dir ? { dir: locale.dir } : {}),
    ...(locale.lang ? { lang: locale.lang } : {}),
  }
}

/*
  The input group, chips or trigger report the closest dir / lang from the
  page. React Aria also renders the parts once in a hidden tree to build the
  collection; nodes there are not DOM elements and are skipped.
*/
function useLocaleReporter<T extends HTMLElement>(ref?: React.Ref<T> | undefined) {
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
    const parent = nodeRef.current?.parentElement
    if (inContent || !report || !(parent instanceof Element)) return
    report({ dir: resolveClosestDir(parent), lang: resolveClosestLang(parent) })
  }, [report, inContent])

  return setRef
}

type ComboboxContextValue = {
  mode: "combobox" | "select"
  multiple: boolean
  values: unknown[]
  setValues: (next: unknown[]) => void
  getKey: (value: unknown) => string
  labelOf: (value: unknown) => string
  register: (key: string, value: unknown) => void
  items: readonly unknown[]
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null)

function useComboboxContext() {
  const context = React.useContext(ComboboxContext)
  if (!context) throw new Error("Combobox parts must be used inside <Combobox>.")
  return context
}

type EmptyContent = { className?: string; children?: React.ReactNode }

const ComboboxEmptyContext = React.createContext<React.RefObject<EmptyContent | null> | null>(null)

const ComboboxGroupItemsContext = React.createContext<readonly unknown[]>([])

function textContent(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textContent).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return textContent(node.props.children)
  }
  return ""
}

function isGroupItem(item: unknown): item is { items: readonly unknown[] } {
  return (
    typeof item === "object" && item !== null && Array.isArray((item as { items?: unknown }).items)
  )
}

function flattenItems(items: readonly unknown[]): unknown[] {
  return items.flatMap((item) => (isGroupItem(item) ? flattenItems(item.items) : [item]))
}

function toValueArray(value: unknown): unknown[] {
  if (value == null) return []
  return Array.isArray(value) ? value : [value]
}

/* A top-level ComboboxTrigger means the input lives inside the popup. */
function hasStandaloneTrigger(node: React.ReactNode): boolean {
  let found = false
  React.Children.forEach(node, (child) => {
    if (found || !React.isValidElement<{ children?: React.ReactNode }>(child)) {
      return
    }
    if (child.type === React.Fragment) {
      found = hasStandaloneTrigger(child.props.children)
      return
    }
    if (
      typeof child.type !== "string" &&
      (child.type as { displayName?: string }).displayName === "ComboboxTrigger"
    ) {
      found = true
    }
  })
  return found
}

/* The first placeholder in the parts labels the combobox for screen readers. */
function findPlaceholder(node: React.ReactNode): string | undefined {
  let found: string | undefined
  React.Children.forEach(node, (child) => {
    if (
      found ||
      !React.isValidElement<{
        placeholder?: unknown
        children?: React.ReactNode
      }>(child)
    ) {
      return
    }
    if (typeof child.props.placeholder === "string") {
      found = child.props.placeholder
      return
    }
    const inner = child.props.children
    if (inner != null && typeof inner !== "function") {
      found = findPlaceholder(inner)
    }
  })
  return found
}

type ComboboxValueType<Value, Multiple extends boolean | undefined> = Multiple extends true
  ? Value[]
  : Value

type ComboboxProps<Value, Multiple extends boolean | undefined = false, Item = Value> = {
  items?: readonly Item[]
  value?: ComboboxValueType<Value, Multiple> | null
  defaultValue?: ComboboxValueType<Value, Multiple> | null
  onValueChange?: (value: ComboboxValueType<Value, Multiple> | null) => void
  multiple?: Multiple
  autoHighlight?: boolean
  itemToStringLabel?: (itemValue: Value) => string
  itemToStringValue?: (itemValue: Value) => string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  inputValue?: string
  defaultInputValue?: string
  onInputValueChange?: (inputValue: string) => void
  onOpenChange?: (open: boolean) => void
  dir?: TextDirection
  lang?: string
  "aria-label"?: string
  children?: React.ReactNode
}

function firstEnabledItemKey(
  state: NonNullable<React.ContextType<typeof ComboBoxStateContext>>
): Key | null {
  const { collection, selectionManager } = state
  for (const node of collection) {
    if (node.type === "item" && !selectionManager.isDisabled(node.key)) {
      return node.key
    }
    if (node.type === "section") {
      for (const child of collection.getChildren?.(node.key) ?? []) {
        if (child.type === "item" && !selectionManager.isDisabled(child.key)) {
          return child.key
        }
      }
    }
  }
  return null
}

/* Base UI's autoHighlight: highlight the first match while typing. */
function ComboboxAutoHighlight() {
  const state = React.useContext(ComboBoxStateContext)
  const stateRef = React.useRef(state)
  stateRef.current = state
  const isOpen = state?.isOpen
  const inputValue = state?.inputValue
  const collection = state?.collection

  React.useEffect(() => {
    const current = stateRef.current
    if (!current || !isOpen || !inputValue) return
    const first = firstEnabledItemKey(current)
    if (first != null) current.selectionManager.setFocusedKey(first)
  }, [isOpen, inputValue, collection])

  return null
}

/*
  ComboboxInput reports its own disabled prop to the root, so the popup stays
  closed even when only the input (not the root) is marked disabled.
*/
type ComboboxDisabledState = {
  disabled: boolean
  report: (disabled: boolean) => void
}

const ComboboxDisabledContext = React.createContext<ComboboxDisabledState | null>(null)

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

function Combobox<Value, Multiple extends boolean | undefined = false, Item = Value>({
  items = [],
  value: valueProp,
  defaultValue,
  onValueChange,
  multiple,
  autoHighlight = false,
  itemToStringLabel,
  itemToStringValue,
  disabled: disabledProp = false,
  required,
  name,
  inputValue,
  defaultInputValue,
  onInputValueChange,
  onOpenChange,
  dir,
  lang,
  "aria-label": ariaLabel,
  children,
}: ComboboxProps<Value, Multiple, Item>) {
  const [inputDisabled, setInputDisabled] = React.useState(false)
  const disabledState = React.useMemo<ComboboxDisabledState>(
    () => ({ disabled: disabledProp, report: setInputDisabled }),
    [disabledProp]
  )
  const disabled = disabledProp || inputDisabled
  const isMultiple = multiple === true
  const [resolved, setResolved] = React.useState<ComboboxLocale>({})
  const report = React.useCallback((next: ComboboxLocale) => {
    setResolved((prev) => (prev.dir === next.dir && prev.lang === next.lang ? prev : next))
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

  const generatedKeys = React.useRef(new WeakMap<object, string>())
  const nextKey = React.useRef(0)
  const registry = React.useRef(new Map<string, unknown>())

  const getKey = React.useCallback(
    (value: unknown): string => {
      if (value == null) return ""
      if (typeof value !== "object") return String(value)
      if (itemToStringValue) return itemToStringValue(value as Value)
      const record = value as { value?: unknown; id?: unknown }
      if (typeof record.value === "string" || typeof record.value === "number") {
        return String(record.value)
      }
      if (typeof record.id === "string" || typeof record.id === "number") {
        return String(record.id)
      }
      let key = generatedKeys.current.get(value)
      if (!key) {
        nextKey.current += 1
        key = `combobox-item-${nextKey.current}`
        generatedKeys.current.set(value, key)
      }
      return key
    },
    [itemToStringValue]
  )

  const labelOf = React.useCallback(
    (value: unknown): string => {
      if (value == null) return ""
      if (typeof value !== "object") return String(value)
      if (itemToStringLabel) return itemToStringLabel(value as Value)
      const label = (value as { label?: unknown }).label
      return typeof label === "string" ? label : getKey(value)
    },
    [itemToStringLabel, getKey]
  )

  const register = React.useCallback((key: string, value: unknown) => {
    registry.current.set(key, value)
  }, [])

  for (const item of flattenItems(items)) register(getKey(item), item)

  const [uncontrolled, setUncontrolled] = React.useState<unknown[]>(() =>
    toValueArray(defaultValue)
  )
  const values = valueProp !== undefined ? toValueArray(valueProp) : uncontrolled
  const isControlled = valueProp !== undefined
  const setValues = React.useCallback(
    (next: unknown[]) => {
      if (!isControlled) setUncontrolled(next)
      onValueChange?.(
        (isMultiple ? next : (next[0] ?? null)) as ComboboxValueType<Value, Multiple> | null
      )
    },
    [isControlled, isMultiple, onValueChange]
  )
  const fromKey = (key: Key) => registry.current.get(String(key)) ?? String(key)
  const selectedKeys = values.map(getKey)

  const mode = hasStandaloneTrigger(children) ? "select" : "combobox"
  const label =
    ariaLabel ?? findPlaceholder(children) ?? (locale.lang?.startsWith("fa") ? "انتخاب" : "Select")

  const context: ComboboxContextValue = {
    mode,
    multiple: isMultiple,
    values,
    setValues,
    getKey,
    labelOf,
    register,
    items,
  }

  const shared = {
    "aria-label": label,
    "data-slot": "combobox",
    className: "contents",
    isDisabled: disabled,
    isRequired: required,
    name,
  }
  const comboBoxShared = {
    ...shared,
    allowsEmptyCollection: true,
    shouldFocusWrap: true,
    inputValue,
    defaultInputValue,
    onInputChange: onInputValueChange,
    onOpenChange: onOpenChange ? (isOpen: boolean) => onOpenChange(isOpen) : undefined,
  }
  const content = (
    <>
      {autoHighlight ? <ComboboxAutoHighlight /> : null}
      {children}
    </>
  )

  let root: React.ReactNode
  if (mode === "select") {
    root = (
      <Select
        {...shared}
        value={selectedKeys[0] ?? null}
        onChange={(key) => setValues(key == null ? [] : [fromKey(key)])}
        onOpenChange={onOpenChange}
      >
        {children}
      </Select>
    )
  } else if (isMultiple) {
    root = (
      <ComboBox
        {...comboBoxShared}
        selectionMode="multiple"
        value={selectedKeys}
        onChange={(keys) => setValues(keys.map(fromKey))}
      >
        {content}
      </ComboBox>
    )
  } else {
    root = (
      <ComboBox
        {...comboBoxShared}
        value={selectedKeys[0] ?? null}
        onChange={(key) => setValues(key == null ? [] : [fromKey(key)])}
      >
        {content}
      </ComboBox>
    )
  }

  return (
    <ComboboxContext.Provider value={context}>
      <ComboboxDisabledContext.Provider value={disabledState}>
        <ComboboxLocaleResolverContext.Provider value={report}>
          <ComboboxLocaleContext.Provider value={locale}>
            <I18nProvider locale={resolveAriaLocale(locale)}>{root}</I18nProvider>
          </ComboboxLocaleContext.Provider>
        </ComboboxLocaleResolverContext.Provider>
      </ComboboxDisabledContext.Provider>
    </ComboboxContext.Provider>
  )
}

function ComboboxValue({
  children,
  placeholder,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: React.ReactNode | ((selectedValue: any) => React.ReactNode)
  placeholder?: React.ReactNode
}) {
  const context = useComboboxContext()
  const current = context.multiple ? context.values : (context.values[0] ?? null)
  if (typeof children === "function") return <>{children(current)}</>
  if (children !== undefined) return <>{children}</>
  if (context.values.length === 0) return <>{placeholder}</>
  return <>{context.values.map(context.labelOf).join("، ")}</>
}

type TriggerRenderProps = {
  variant?:
    | "default"
    | "secondary"
    | "gray"
    | "destructive"
    | "destructive-secondary"
    | "outline"
    | "ghost"
    | "link"
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  className?: string
  "aria-label"?: string
}

/*
  Pass render={<Button variant="outline" />} to style the trigger as a Cubix
  Button (the same API as the Base UI trigger). React Aria needs its own
  pressable Button, so the Button's variant, size, className and aria-label
  are applied to it.
*/
function ComboboxTrigger({
  render,
  className,
  children,
  ref,
  ...props
}: Omit<AriaButtonProps, "className" | "children" | "render"> & {
  render?: React.ReactElement<TriggerRenderProps>
  className?: string
  children?: React.ReactNode
  ref?: React.Ref<HTMLButtonElement>
}) {
  const setRef = useLocaleReporter<HTMLButtonElement>(ref)
  const renderProps = React.isValidElement(render) ? render.props : undefined

  return (
    <AriaButton
      ref={setRef}
      data-slot="combobox-trigger"
      aria-label={renderProps?.["aria-label"]}
      className={cn(
        renderProps
          ? buttonVariants({
              variant: renderProps.variant ?? "default",
              size: renderProps.size ?? "default",
            })
          : undefined,
        "cursor-default disabled:cursor-not-allowed [&_svg:not([class*='size-'])]:size-4",
        renderProps?.className,
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </AriaButton>
  )
}
ComboboxTrigger.displayName = "ComboboxTrigger"

/*
  The clear button must not take the ComboBox button context (it would open
  the list), so it is rendered with that context cleared.
*/
function ComboboxClear({ className, disabled }: { className?: string; disabled?: boolean }) {
  const context = useComboboxContext()
  return (
    <ButtonContext.Provider value={null}>
      <AriaButton
        data-slot="combobox-clear"
        aria-label="Clear"
        className={cn(comboboxClearStyles, className)}
        isDisabled={disabled || undefined}
        onPress={() => context.setValues([])}
      >
        <ComboboxClearIcon className="pointer-events-none size-4" />
      </AriaButton>
    </ButtonContext.Provider>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger,
  showClear = false,
  size = "default",
  placeholder,
  ...props
}: Omit<AriaInputProps, "className" | "children" | "disabled" | "size"> & {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  showTrigger?: boolean
  showClear?: boolean
  size?: ComboboxSize
  ref?: React.Ref<HTMLInputElement>
}) {
  const context = useComboboxContext()
  const inContent = React.useContext(ComboboxContentContext)
  const isDisabled = useInputDisabled(disabled, inContent)
  const setGroupRef = useLocaleReporter<HTMLDivElement>()
  const withTrigger = showTrigger ?? !inContent
  const hasValue = !context.multiple && context.values.length > 0
  const groupClassName = cn(
    "w-auto cursor-default [&>[data-slot=input-group-addon]]:cursor-default has-disabled:cursor-not-allowed has-disabled:[&>[data-slot=input-group-addon]]:cursor-not-allowed",
    inContent
      ? "rounded-sm has-[[data-slot=input-group-control]:focus-visible]:border-input has-[[data-slot=input-group-control]:focus-visible]:ring-0"
      : cn(comboboxFieldStyles, comboboxFieldSizes[size]),
    className
  )

  const input = (
    <InputGroupInput
      placeholder={placeholder}
      className={
        inContent
          ? "cursor-text text-label md:text-label disabled:cursor-not-allowed"
          : cn(comboboxFieldInputStyles, comboboxFieldInputSizes[size])
      }
      disabled={isDisabled || undefined}
      {...props}
    />
  )
  const addon =
    withTrigger || showClear ? (
      <InputGroupAddon align="inline-end">
        {withTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            data-slot="input-group-button"
            className="cursor-default disabled:cursor-not-allowed group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            isDisabled={isDisabled || undefined}
          >
            <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
          </InputGroupButton>
        )}
        {showClear && hasValue && !isDisabled && <ComboboxClear />}
      </InputGroupAddon>
    ) : null

  // Inside the popup (Select + Autocomplete) the input is a search field:
  // TextField connects it to the Autocomplete filter.
  if (inContent) {
    return (
      <TextField aria-label={placeholder} autoFocus className="contents">
        <InputGroup className={groupClassName}>
          {input}
          {addon}
          {children}
        </InputGroup>
      </TextField>
    )
  }

  // The Group is React Aria's ComboBox anchor, so the popup matches the
  // width and start edge of the whole group, addons included.
  return (
    <InputGroup ref={setGroupRef} className={groupClassName}>
      {input}
      {addon}
      {children}
    </InputGroup>
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

function ComboboxAutocomplete({ children }: { children?: React.ReactNode }) {
  const { contains } = useFilter({ sensitivity: "base" })
  return <Autocomplete filter={contains}>{children}</Autocomplete>
}

function ComboboxContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  anchor,
  dir,
  lang,
  ...props
}: Omit<PopoverProps, "placement" | "offset" | "crossOffset" | "className" | "children"> & {
  className?: string
  children?: React.ReactNode
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
  dir?: TextDirection
  lang?: string
  /* Accepted for API parity; the ComboBox Group (input group or chips) is
     always the anchor in React Aria. */
  anchor?: React.RefObject<HTMLElement | null> | null
}) {
  void anchor
  const context = useComboboxContext()
  const locale = React.useContext(ComboboxLocaleContext)
  const emptyRef = React.useRef<EmptyContent | null>(null)
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <ComboboxContentContext.Provider value>
      <ComboboxEmptyContext.Provider value={emptyRef}>
        <Popover
          data-slot="combobox-content"
          placement={toPlacement(side, align)}
          // React Aria floors the popover position (Math.floor of the anchor
          // edge + offset). The extra half pixel turns that into rounding to
          // the nearest pixel, as floating-ui does for the Base UI and Radix
          // popups, so a fractional anchor edge lands on the same pixel.
          offset={sideOffset + 0.5}
          crossOffset={toCrossOffset(alignOffset, side, align, contentLocale.dir)}
          className={cn(popupStyles, className)}
          {...localeDomProps(contentLocale)}
          {...props}
        >
          {context.mode === "select" ? (
            <ComboboxAutocomplete>{children}</ComboboxAutocomplete>
          ) : (
            children
          )}
        </Popover>
      </ComboboxEmptyContext.Provider>
    </ComboboxContentContext.Provider>
  )
}

function ComboboxList({
  className,
  children,
  ...props
}: Omit<ListBoxProps<object>, "className" | "children" | "items" | "renderEmptyState"> & {
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: React.ReactNode | ((item: any, index: number) => React.ReactNode)
}) {
  const context = useComboboxContext()
  const emptyRef = React.useContext(ComboboxEmptyContext)
  const content =
    typeof children === "function"
      ? context.items.map((item, index) => children(item, index))
      : children

  return (
    <ListBox
      data-slot="combobox-list"
      className={cn(listStyles, className)}
      renderEmptyState={() => {
        const empty = emptyRef?.current
        if (!empty?.children) return null
        return (
          <div data-slot="combobox-empty" className={cn(emptyStyles, empty.className)}>
            {empty.children}
          </div>
        )
      }}
      {...props}
    >
      {content}
    </ListBox>
  )
}

function ComboboxItem({
  className,
  children,
  value,
  disabled,
  textValue,
  ...props
}: Omit<ListBoxItemProps<object>, "className" | "children" | "id" | "value" | "isDisabled"> & {
  className?: string
  children?: React.ReactNode
  value: unknown
  disabled?: boolean
}) {
  const context = useComboboxContext()
  const key = context.getKey(value)
  context.register(key, value)

  return (
    <ListBoxItem
      id={key}
      textValue={textValue ?? context.labelOf(value)}
      isDisabled={disabled}
      data-slot="combobox-item"
      className={cn(itemStyles, className)}
      {...props}
    >
      {({ isSelected }) => (
        <>
          {children}
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

function ComboboxGroup({
  className,
  items,
  children,
  ...props
}: Omit<ListBoxSectionProps<object>, "className" | "children" | "items"> & {
  className?: string
  items?: readonly unknown[]
  children?: React.ReactNode
}) {
  return (
    <ComboboxGroupItemsContext.Provider value={items ?? []}>
      <ListBoxSection data-slot="combobox-group" className={cn(className)} {...props}>
        {children}
      </ListBoxSection>
    </ComboboxGroupItemsContext.Provider>
  )
}

function ComboboxLabel({
  className,
  ...props
}: Omit<HeaderProps, "className"> & { className?: string }) {
  return (
    <Header
      data-slot="combobox-label"
      className={cn(
        "px-2 py-1 text-caption text-muted-foreground whitespace-nowrap font-medium tracking-normal",
        className
      )}
      {...props}
    />
  )
}

function ComboboxCollection({
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (item: any, index: number) => React.ReactNode
}) {
  const items = React.useContext(ComboboxGroupItemsContext)
  return <>{items.map((item, index) => children(item, index))}</>
}

/*
  React Aria renders an empty state from the ListBox, so ComboboxEmpty hands
  its content to the list and renders nothing itself.
*/
function ComboboxEmpty({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const emptyRef = React.useContext(ComboboxEmptyContext)
  if (emptyRef) emptyRef.current = { className, children }
  return null
}

function ComboboxSeparator({
  className,
  ...props
}: Omit<SeparatorProps, "className"> & { className?: string }) {
  return (
    <Separator
      data-slot="combobox-separator"
      elementType="div"
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
}: Omit<GroupProps, "className"> & {
  className?: string
  ref?: React.Ref<HTMLDivElement>
  showTrigger?: boolean
  size?: ComboboxSize
}) {
  const setRef = useLocaleReporter<HTMLDivElement>(ref)

  return (
    <Group
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
      {(renderProps) => (
        <>
          {typeof children === "function" ? children(renderProps) : children}
          {/* Takes the ComboBox button context, like the single field's chevron. */}
          {showTrigger && (
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              data-slot="input-group-button"
              className={cn(comboboxChipsTriggerStyles, comboboxChipsTriggerSizes[size])}
            >
              <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
            </InputGroupButton>
          )}
        </>
      )}
    </Group>
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: React.ComponentProps<"div"> & {
  showRemove?: boolean
}) {
  const context = useComboboxContext()
  const text = textContent(children)
  const remove = () => {
    const index = context.values.findIndex((value) => context.labelOf(value) === text)
    if (index >= 0) {
      context.setValues(context.values.filter((_, i) => i !== index))
    }
  }

  return (
    <div
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.25))] w-fit cursor-default items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-caption font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pe-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ButtonContext.Provider value={null}>
          <AriaButton
            data-slot="combobox-chip-remove"
            aria-label="Remove"
            excludeFromTabOrder
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-xs" }),
              "-ms-1 cursor-default bg-transparent opacity-50 hover:bg-transparent hover:opacity-100 active:bg-transparent dark:hover:bg-transparent"
            )}
            onPress={remove}
          >
            <XIcon className="pointer-events-none" />
          </AriaButton>
        </ButtonContext.Provider>
      )}
    </div>
  )
}

function ComboboxChipsInput({
  className,
  onKeyDown,
  ...props
}: Omit<AriaInputProps, "className"> & {
  className?: string
  ref?: React.Ref<HTMLInputElement>
}) {
  const context = useComboboxContext()

  return (
    <AriaInput
      data-slot="combobox-chip-input"
      className={cn(
        "min-w-16 flex-1 cursor-text bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        className
      )}
      onKeyDown={(event) => {
        if (
          event.key === "Backspace" &&
          event.currentTarget.value === "" &&
          context.values.length > 0
        ) {
          context.setValues(context.values.slice(0, -1))
        }
        onKeyDown?.(event)
      }}
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
