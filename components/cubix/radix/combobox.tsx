"use client"

/*
  Cubix Combobox - Radix version.

  Radix has no combobox primitive, so this follows the WAI-ARIA APG combobox
  pattern on top of Radix Popover:
  - the input (role="combobox") keeps focus; aria-activedescendant points at
    the highlighted option, and ArrowUp / ArrowDown / Home / End / Enter /
    Escape drive the list;
  - the popup is a Popover anchored to the input group (or the chips) through
    Popover.Anchor, so Radix handles collision flipping and the RTL start edge;
  - a standalone ComboboxTrigger opens the popover from a button instead, with
    the search input inside the popup.
  Same part names, props and classes as the Base UI combobox. Disabled items
  stay highlightable but cannot be selected (the APG recommendation for
  options, and the Base UI behavior).
*/
import * as React from "react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { Button, buttonVariants } from "@/components/cubix/radix/button"
import { DirectionProvider } from "@/components/cubix/radix/direction"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/cubix/radix/input-group"
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

/* True inside ComboboxContent (the search input of a button-triggered popup). */
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

function assignRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node)
  else if (ref) (ref as React.RefObject<T | null>).current = node
}

/*
  The root renders no element, so the input group, chips or trigger report
  the closest dir / lang from the page and the root shares it with the
  portaled popup. Explicit dir / lang props on the root always win.
*/
function useLocaleReporter<T extends HTMLElement>(
  ...refs: (React.Ref<T> | undefined)[]
) {
  const report = React.useContext(ComboboxLocaleResolverContext)
  const inContent = React.useContext(ComboboxContentContext)
  const nodeRef = React.useRef<T | null>(null)
  const refsRef = React.useRef(refs)
  refsRef.current = refs
  const setRef = React.useCallback((node: T | null) => {
    nodeRef.current = node
    for (const ref of refsRef.current) assignRef(ref, node)
  }, [])

  React.useLayoutEffect(() => {
    if (inContent || !report) return
    const parent = nodeRef.current?.parentElement ?? null
    report({ dir: resolveClosestDir(parent), lang: resolveClosestLang(parent) })
  }, [report, inContent])

  return setRef
}

type Pending = "first" | "last" | "selected" | null

type ComboboxContextValue = {
  mode: "combobox" | "select"
  multiple: boolean
  disabled: boolean
  values: unknown[]
  open: boolean
  setOpen: (open: boolean, textAfterClose?: string) => void
  openWith: (pending: Pending) => void
  inputText: string
  query: string
  highlighted: string | null
  setHighlighted: (key: string | null) => void
  pending: Pending
  setPending: (pending: Pending) => void
  empty: boolean
  setEmpty: (empty: boolean) => void
  autoHighlight: boolean
  items: readonly unknown[]
  getKey: (value: unknown) => string
  labelOf: (value: unknown) => string
  register: (key: string, value: unknown) => void
  matches: (value: unknown) => boolean
  isSelected: (key: string) => boolean
  select: (value: unknown) => void
  removeValue: (index: number) => void
  clear: () => void
  listId: string
  optionId: (key: string) => string
  listRef: React.RefObject<HTMLDivElement | null>
  inputRef: React.RefObject<HTMLInputElement | null>
  anchorRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  inputProps: (props: {
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    onClick?: React.MouseEventHandler<HTMLInputElement>
  }) => React.InputHTMLAttributes<HTMLInputElement>
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null)

function useComboboxContext() {
  const context = React.useContext(ComboboxContext)
  if (!context) throw new Error("Combobox parts must be used inside <Combobox>.")
  return context
}

const ComboboxGroupContext = React.createContext<{
  labelId?: string
  items: readonly unknown[]
}>({ items: [] })

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
    typeof item === "object" &&
    item !== null &&
    Array.isArray((item as { items?: unknown }).items)
  )
}

function flattenItems(items: readonly unknown[]): unknown[] {
  return items.flatMap((item) =>
    isGroupItem(item) ? flattenItems(item.items) : [item]
  )
}

function toValueArray(value: unknown): unknown[] {
  if (value == null) return []
  return Array.isArray(value) ? value : [value]
}

/*
  Case- and mark-insensitive "contains" match. Arabic yeh / kaf are folded to
  their Persian forms and the zero-width non-joiner is ignored, so typing
  "میوهها" or "كيوي" still matches.
*/
function normalizeText(text: string) {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/\u200c/g, "")
    .replace(/\u064a/g, "\u06cc")
    .replace(/\u0643/g, "\u06a9")
    .toLocaleLowerCase()
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

function encodeKey(key: string) {
  return Array.from(key, (char) => char.codePointAt(0)!.toString(36)).join("-")
}

type ComboboxValueType<Value, Multiple extends boolean | undefined> =
  Multiple extends true ? Value[] : Value

type ComboboxProps<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
> = {
  items?: readonly Item[]
  value?: ComboboxValueType<Value, Multiple> | null
  defaultValue?: ComboboxValueType<Value, Multiple> | null
  onValueChange?: (value: ComboboxValueType<Value, Multiple> | null) => void
  multiple?: Multiple
  autoHighlight?: boolean
  itemToStringLabel?: (itemValue: Value) => string
  itemToStringValue?: (itemValue: Value) => string
  /* null turns filtering off; a function replaces the default "contains". */
  filter?: ((itemValue: Value, query: string) => boolean) | null
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  inputValue?: string
  defaultInputValue?: string
  onInputValueChange?: (inputValue: string) => void
  dir?: TextDirection
  lang?: string
  children?: React.ReactNode
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
  items = [],
  value: valueProp,
  defaultValue,
  onValueChange,
  multiple,
  autoHighlight = false,
  itemToStringLabel,
  itemToStringValue,
  filter,
  disabled: disabledProp = false,
  readOnly = false,
  required,
  name,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  inputValue: inputValueProp,
  defaultInputValue,
  onInputValueChange,
  dir,
  lang,
  children,
}: ComboboxProps<Value, Multiple, Item>) {
  const [inputDisabled, setInputDisabled] = React.useState(false)
  const disabledState = React.useMemo<ComboboxDisabledState>(
    () => ({ disabled: disabledProp, report: setInputDisabled }),
    [disabledProp]
  )
  const disabled = disabledProp || inputDisabled
  const isMultiple = multiple === true
  const mode = hasStandaloneTrigger(children) ? "select" : "combobox"

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

  // Value
  const [uncontrolledValues, setUncontrolledValues] = React.useState<
    unknown[]
  >(() => toValueArray(defaultValue))
  const values =
    valueProp !== undefined ? toValueArray(valueProp) : uncontrolledValues
  const setValues = (next: unknown[]) => {
    if (valueProp === undefined) setUncontrolledValues(next)
    onValueChange?.(
      (isMultiple ? next : (next[0] ?? null)) as ComboboxValueType<
        Value,
        Multiple
      > | null
    )
  }
  const selectedKeys = new Set(values.map(getKey))
  const selectedLabel = isMultiple ? "" : labelOf(values[0])

  // Input text and the filter query (empty until the user types, so a
  // selected label does not filter the list when it reopens).
  const [uncontrolledText, setUncontrolledText] = React.useState(
    () =>
      defaultInputValue ??
      (mode === "combobox" && !isMultiple ? selectedLabel : "")
  )
  const inputText = inputValueProp ?? uncontrolledText
  const setText = (next: string) => {
    if (inputValueProp === undefined) setUncontrolledText(next)
    if (next !== inputText) onInputValueChange?.(next)
  }
  const [query, setQuery] = React.useState("")

  const previousLabel = React.useRef(selectedLabel)
  React.useEffect(() => {
    if (previousLabel.current === selectedLabel) return
    previousLabel.current = selectedLabel
    if (mode === "combobox" && !isMultiple && inputValueProp === undefined) {
      setUncontrolledText(selectedLabel)
    }
  }, [selectedLabel, mode, isMultiple, inputValueProp])

  // Open state and highlight
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen
  const [highlighted, setHighlighted] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState<Pending>(null)
  const [empty, setEmptyState] = React.useState(false)
  const setEmpty = React.useCallback((next: boolean) => setEmptyState(next), [])

  const setOpen = (next: boolean, textAfterClose?: string) => {
    if (next && disabled) return
    if (next === open) return
    if (openProp === undefined) setUncontrolledOpen(next)
    onOpenChange?.(next)
    if (!next) {
      setHighlighted(null)
      setPending(null)
      setQuery("")
      setText(
        textAfterClose ??
          (mode === "combobox" && !isMultiple ? selectedLabel : "")
      )
    }
  }
  const openWith = (nextPending: Pending) => {
    setPending(nextPending)
    setOpen(true)
  }

  const matches = (value: unknown) => {
    if (filter === null || !query) return true
    if (filter) return filter(value as Value, query)
    return normalizeText(labelOf(value)).includes(normalizeText(query))
  }

  const select = (value: unknown) => {
    if (readOnly) return
    const key = getKey(value)
    if (isMultiple) {
      const exists = selectedKeys.has(key)
      setValues(
        exists ? values.filter((v) => getKey(v) !== key) : [...values, value]
      )
      setText("")
      setQuery("")
      return
    }
    const label = mode === "combobox" ? labelOf(value) : ""
    setValues([value])
    previousLabel.current = labelOf(value)
    setText(label)
    setQuery("")
    setOpen(false, label)
  }

  const removeValue = (index: number) => {
    if (readOnly || index < 0) return
    setValues(values.filter((_, i) => i !== index))
  }

  const clear = () => {
    if (readOnly) return
    setValues([])
    previousLabel.current = ""
    setText("")
    setQuery("")
  }

  const baseId = React.useId()
  const listId = `${baseId}-list`
  const optionId = (key: string) => `${baseId}-option-${encodeKey(key)}`
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const anchorRef = React.useRef<HTMLDivElement | null>(null)
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  const getOptions = () =>
    Array.from(
      listRef.current?.querySelectorAll<HTMLElement>("[role=option]") ?? []
    )

  const moveHighlight = (target: "next" | "previous" | "first" | "last") => {
    const options = getOptions()
    if (options.length === 0) return
    const index = options.findIndex(
      (option) => option.dataset.key === highlighted
    )
    let nextIndex: number
    if (target === "first") nextIndex = 0
    else if (target === "last") nextIndex = options.length - 1
    else if (index === -1) nextIndex = target === "next" ? 0 : options.length - 1
    else {
      const step = target === "next" ? 1 : -1
      nextIndex = (index + step + options.length) % options.length
    }
    setHighlighted(options[nextIndex].dataset.key ?? null)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        if (!open) openWith(values.length > 0 ? "selected" : "first")
        else moveHighlight("next")
        break
      case "ArrowUp":
        event.preventDefault()
        if (!open) openWith(values.length > 0 ? "selected" : "last")
        else moveHighlight("previous")
        break
      case "Home":
      case "End":
        if (!open) return
        event.preventDefault()
        moveHighlight(event.key === "Home" ? "first" : "last")
        break
      case "Enter": {
        if (!open || highlighted == null) return
        event.preventDefault()
        const option = getOptions().find((o) => o.dataset.key === highlighted)
        if (!option || option.getAttribute("aria-disabled") === "true") return
        if (registry.current.has(highlighted)) {
          select(registry.current.get(highlighted))
        }
        break
      }
      case "Escape":
        if (!open) return
        event.preventDefault()
        setOpen(false)
        break
      case "Tab":
        if (open) setOpen(false)
        break
    }
  }

  const inputProps: ComboboxContextValue["inputProps"] = (handlers) => ({
    role: "combobox",
    "aria-expanded": open,
    "aria-controls": open ? listId : undefined,
    "aria-activedescendant":
      open && highlighted != null ? optionId(highlighted) : undefined,
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
    readOnly: readOnly || undefined,
    value: inputText,
    onChange: (event) => {
      handlers.onChange?.(event)
      if (event.defaultPrevented) return
      setText(event.target.value)
      setQuery(event.target.value)
      setHighlighted(null)
      setPending(autoHighlight && event.target.value ? "first" : null)
      if (!open) setOpen(true)
    },
    onKeyDown: (event) => {
      handlers.onKeyDown?.(event)
      if (!event.defaultPrevented) handleKeyDown(event)
    },
    onClick: (event) => {
      handlers.onClick?.(event)
      if (!event.defaultPrevented && !open && mode === "combobox") {
        openWith(null)
      }
    },
    onBlur: (event) => {
      handlers.onBlur?.(event)
      const next = event.relatedTarget as Node | null
      if (next && contentRef.current?.contains(next)) return
      if (next && anchorRef.current?.contains(next)) return
      if (mode === "combobox") setOpen(false)
    },
  })

  const context: ComboboxContextValue = {
    mode,
    multiple: isMultiple,
    disabled,
    values,
    open,
    setOpen,
    openWith,
    inputText,
    query,
    highlighted,
    setHighlighted,
    pending,
    setPending,
    empty,
    setEmpty,
    autoHighlight,
    items,
    getKey,
    labelOf,
    register,
    matches,
    isSelected: (key) => selectedKeys.has(key),
    select,
    removeValue,
    clear,
    listId,
    optionId,
    listRef,
    inputRef,
    anchorRef,
    contentRef,
    inputProps,
  }

  return (
    <ComboboxContext.Provider value={context}>
      <ComboboxLocaleResolverContext.Provider value={report}>
        <ComboboxLocaleContext.Provider value={locale}>
          <DirectionProvider dir={locale.dir ?? "ltr"}>
            <PopoverPrimitive.Root
              open={open && !disabled}
              onOpenChange={(next) => setOpen(next)}
            >
              <ComboboxDisabledContext.Provider value={disabledState}>
                {children}
              </ComboboxDisabledContext.Provider>
            </PopoverPrimitive.Root>
            {name ? (
              <input
                type="hidden"
                name={name}
                required={required}
                value={values.map(getKey).join(",")}
              />
            ) : null}
          </DirectionProvider>
        </ComboboxLocaleContext.Provider>
      </ComboboxLocaleResolverContext.Provider>
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
  const current = context.multiple
    ? context.values
    : (context.values[0] ?? null)
  if (typeof children === "function") return <>{children(current)}</>
  if (children !== undefined) return <>{children}</>
  if (context.values.length === 0) return <>{placeholder}</>
  return <>{context.values.map(context.labelOf).join("، ")}</>
}

type TriggerRenderProps = {
  variant?: React.ComponentProps<typeof Button>["variant"]
  size?: React.ComponentProps<typeof Button>["size"]
  className?: string
  "aria-label"?: string
}

/*
  Pass render={<Button variant="outline" />} to style the trigger as a Cubix
  Button (the same API as the Base UI trigger). The Button's variant, size,
  className and aria-label are applied to the Radix Popover trigger.
*/
function ComboboxTrigger({
  render,
  className,
  children,
  onKeyDown,
  ref,
  ...props
}: Omit<
  React.ComponentProps<typeof PopoverPrimitive.Trigger>,
  "asChild" | "children"
> & {
  render?: React.ReactElement<TriggerRenderProps>
  children?: React.ReactNode
}) {
  const context = useComboboxContext()
  const setRef = useLocaleReporter<HTMLButtonElement>(ref)
  const renderProps = React.isValidElement(render) ? render.props : undefined

  return (
    <PopoverPrimitive.Trigger
      ref={setRef}
      data-slot="combobox-trigger"
      aria-label={renderProps?.["aria-label"]}
      disabled={context.disabled || undefined}
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
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault()
          context.openWith(
            context.values.length > 0
              ? "selected"
              : event.key === "ArrowDown"
                ? "first"
                : "last"
          )
        }
      }}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </PopoverPrimitive.Trigger>
  )
}
ComboboxTrigger.displayName = "ComboboxTrigger"

function ComboboxClear({
  className,
  disabled,
}: {
  className?: string
  disabled?: boolean
}) {
  const context = useComboboxContext()
  return (
    <button
      type="button"
      data-slot="combobox-clear"
      aria-label="Clear"
      tabIndex={-1}
      className={cn(comboboxClearStyles, className)}
      disabled={disabled || context.disabled || undefined}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        context.clear()
        context.inputRef.current?.focus()
      }}
    >
      <ComboboxClearIcon className="pointer-events-none size-4" />
    </button>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger,
  showClear = false,
  size = "default",
  onChange,
  onKeyDown,
  onBlur,
  onClick,
  ref,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "size"> & {
  showTrigger?: boolean
  showClear?: boolean
  size?: ComboboxSize
}) {
  const context = useComboboxContext()
  const inContent = React.useContext(ComboboxContentContext)
  useInputDisabled(disabled, inContent)
  const setGroupRef = useLocaleReporter<HTMLDivElement>(
    inContent ? undefined : context.anchorRef
  )
  const withTrigger = showTrigger ?? !inContent
  const isDisabled = disabled || context.disabled
  const hasValue = !context.multiple && context.values.length > 0
  const setInputRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      context.inputRef.current = node
      assignRef(ref, node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref]
  )

  const group = (
    <InputGroup
      ref={setGroupRef}
      className={cn("w-auto cursor-default [&>[data-slot=input-group-addon]]:cursor-default has-disabled:cursor-not-allowed has-disabled:[&>[data-slot=input-group-addon]]:cursor-not-allowed", inContent ? "rounded-sm has-[[data-slot=input-group-control]:focus-visible]:border-input has-[[data-slot=input-group-control]:focus-visible]:ring-0" : cn(comboboxFieldStyles, comboboxFieldSizes[size]), className)}
    >
      <InputGroupInput
        ref={setInputRef}
        className={
          inContent
            ? "cursor-text text-label md:text-label disabled:cursor-not-allowed"
            : cn(comboboxFieldInputStyles, comboboxFieldInputSizes[size])
        }
        disabled={isDisabled || undefined}
        {...context.inputProps({ onChange, onKeyDown, onBlur, onClick })}
        {...props}
      />
      {(withTrigger || showClear) && (
        <InputGroupAddon align="inline-end">
          {withTrigger && (
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              data-slot="input-group-button"
              aria-label="Toggle"
              aria-expanded={context.open}
              tabIndex={-1}
              className="[&_svg:not([class*='size-'])]:size-4 cursor-default disabled:cursor-not-allowed group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
              disabled={isDisabled || undefined}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                context.inputRef.current?.focus()
                if (context.open) context.setOpen(false)
                else context.openWith(null)
              }}
            >
              <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
            </InputGroupButton>
          )}
          {showClear && hasValue && !isDisabled && <ComboboxClear />}
        </InputGroupAddon>
      )}
      {children}
    </InputGroup>
  )

  // Inside the popup the Popover trigger is the anchor, so the group is a
  // plain InputGroup there. Outside, the whole group (addons included) is the
  // Popover anchor, so the popup matches its width and start edge.
  if (inContent) return group
  return <PopoverPrimitive.Anchor asChild>{group}</PopoverPrimitive.Anchor>
}

type Side = "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"

function toPhysicalSide(side: Side, dir: TextDirection | undefined) {
  if (side === "inline-start") return dir === "rtl" ? "right" : "left"
  if (side === "inline-end") return dir === "rtl" ? "left" : "right"
  return side
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
  onOpenAutoFocus,
  onCloseAutoFocus,
  onInteractOutside,
  ref,
  ...props
}: Omit<
  React.ComponentProps<typeof PopoverPrimitive.Content>,
  "side" | "dir"
> & {
  side?: Side
  dir?: TextDirection
  lang?: string
  /* Accepted for API parity; the input group or the chips are always the
     Popover anchor. */
  anchor?: React.RefObject<HTMLElement | null> | null
}) {
  void anchor
  const context = useComboboxContext()
  const locale = React.useContext(ComboboxLocaleContext)
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }
  const isSelect = context.mode === "select"
  const setContentRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      context.contentRef.current = node
      assignRef(ref, node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref]
  )

  return (
    <ComboboxContentContext.Provider value>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={setContentRef}
          data-slot="combobox-content"
          role={isSelect ? "dialog" : "presentation"}
          side={toPhysicalSide(side, contentLocale.dir)}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          className={cn(
            "cn-menu-target cn-menu-translucent cursor-default group/combobox-content relative z-50 flex max-h-[min(var(--radix-popover-content-available-height),20rem)] w-max max-w-(--radix-popover-content-available-width) min-w-[max(150px,var(--radix-popover-trigger-width))] origin-(--radix-popover-content-transform-origin) flex-col overflow-hidden rounded-lg bg-popover text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:w-auto *:data-[slot=input-group]:shrink-0",
            className
          )}
          onOpenAutoFocus={(event) => {
            onOpenAutoFocus?.(event)
            // Focus stays in the input; the popup is navigated through
            // aria-activedescendant. The search input of a button-triggered
            // popup takes focus instead.
            if (!isSelect) event.preventDefault()
          }}
          onCloseAutoFocus={(event) => {
            onCloseAutoFocus?.(event)
            if (!isSelect) event.preventDefault()
          }}
          onInteractOutside={(event) => {
            onInteractOutside?.(event)
            const target = event.target as Node | null
            if (target && context.anchorRef.current?.contains(target)) {
              event.preventDefault()
            }
          }}
          {...localeDomProps(contentLocale)}
          {...props}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </ComboboxContentContext.Provider>
  )
}

/*
  The list is the scroll container, so it carries the menu's p-1: the
  separator's -mx-1 then reaches the popup edges without overflowing.
*/
function ComboboxList({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: React.ReactNode | ((item: any, index: number) => React.ReactNode)
}) {
  const context = useComboboxContext()
  const { setEmpty, setHighlighted, setPending, pending, highlighted, query } =
    context
  const content =
    typeof children === "function"
      ? context.items.map((item, index) => children(item, index))
      : children

  React.useLayoutEffect(() => {
    const options = Array.from(
      context.listRef.current?.querySelectorAll<HTMLElement>(
        "[role=option]"
      ) ?? []
    )
    setEmpty(options.length === 0)
    if (pending) {
      const target =
        pending === "last"
          ? options[options.length - 1]
          : ((pending === "selected"
              ? options.find((o) => o.getAttribute("aria-selected") === "true")
              : undefined) ?? options[0])
      setHighlighted(target?.dataset.key ?? null)
      setPending(null)
      return
    }
    if (
      highlighted != null &&
      !options.some((option) => option.dataset.key === highlighted)
    ) {
      setHighlighted(null)
    }
  })

  React.useEffect(() => {
    if (highlighted == null) return
    const option = context.listRef.current?.querySelector<HTMLElement>(
      `#${CSS.escape(context.optionId(highlighted))}`
    )
    option?.scrollIntoView({ block: "nearest" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlighted, query])

  return (
    <div
      ref={context.listRef}
      id={context.listId}
      role="listbox"
      aria-multiselectable={context.multiple || undefined}
      data-slot="combobox-list"
      data-empty={context.empty ? "" : undefined}
      className={cn(
        "min-h-0 scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )}
      {...props}
    >
      {content}
    </div>
  )
}

function ComboboxItem({
  className,
  children,
  value,
  disabled = false,
  onClick,
  onPointerMove,
  onPointerLeave,
  onMouseDown,
  ...props
}: React.ComponentProps<"div"> & {
  value: unknown
  disabled?: boolean
  index?: number
}) {
  const context = useComboboxContext()
  const key = context.getKey(value)
  context.register(key, value)
  if (!context.matches(value)) return null

  const selected = context.isSelected(key)
  const highlighted = context.highlighted === key

  return (
    <div
      id={context.optionId(key)}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      data-key={key}
      data-slot="combobox-item"
      data-selected={selected ? "" : undefined}
      data-highlighted={highlighted ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      onMouseDown={(event) => {
        onMouseDown?.(event)
        // Keep focus in the input.
        event.preventDefault()
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        if (!highlighted) context.setHighlighted(key)
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        if (highlighted) context.setHighlighted(null)
      }}
      onClick={(event) => {
        onClick?.(event)
        if (!disabled && !event.defaultPrevented) context.select(value)
      }}
      {...props}
    >
      {children}
      {selected ? (
        <span
          aria-hidden
          className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"
        >
          <CheckIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />
        </span>
      ) : null}
    </div>
  )
}

function ComboboxGroup({
  className,
  items,
  ...props
}: React.ComponentProps<"div"> & {
  items?: readonly unknown[]
}) {
  const context = useComboboxContext()
  const labelId = React.useId()
  if (items && !items.some(context.matches)) return null

  return (
    <ComboboxGroupContext.Provider value={{ labelId, items: items ?? [] }}>
      <div
        role="group"
        aria-labelledby={labelId}
        data-slot="combobox-group"
        className={cn(className)}
        {...props}
      />
    </ComboboxGroupContext.Provider>
  )
}

function ComboboxLabel({ className, ...props }: React.ComponentProps<"div">) {
  const { labelId } = React.useContext(ComboboxGroupContext)
  return (
    <div
      id={labelId}
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
  const { items } = React.useContext(ComboboxGroupContext)
  return <>{items.map((item, index) => children(item, index))}</>
}

/*
  Kept mounted (it announces changes to screen readers) and renders its
  children only when the list is empty, so the padding is dropped while it
  has no content instead of hiding the element.
*/
function ComboboxEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const context = useComboboxContext()
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic
      data-slot="combobox-empty"
      className={cn(
        "w-full px-3 py-2.75 text-center text-label tracking-normal text-muted-foreground empty:p-0",
        className
      )}
      {...props}
    >
      {context.empty ? children : null}
    </div>
  )
}

function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
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
  onClick,
  ...props
}: React.ComponentProps<"div"> & {
  showTrigger?: boolean
  size?: ComboboxSize
}) {
  const context = useComboboxContext()
  const setRef = useLocaleReporter<HTMLDivElement>(ref, context.anchorRef)

  return (
    <PopoverPrimitive.Anchor asChild>
      <div
        ref={setRef}
        data-slot="combobox-chips"
        className={cn(
          "flex min-h-10 cursor-default flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent bg-clip-padding px-3 py-1 text-label font-normal tracking-normal text-foreground transition-colors outline-none focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20 focus-within:ring-offset-1 focus-within:ring-offset-background has-aria-invalid:border-destructive has-aria-invalid:ring-0 has-aria-invalid:focus-within:border-destructive has-aria-invalid:focus-within:ring-0 has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-muted has-disabled:opacity-70 has-data-[slot=combobox-chip]:ps-2 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-disabled:bg-muted",
          comboboxChipsSizes[size],
          showTrigger && (size === "lg" ? "relative pe-11.5" : "relative pe-10"),
          className
        )}
        onClick={(event) => {
          onClick?.(event)
          if ((event.target as HTMLElement).closest("button, input")) return
          context.inputRef.current?.focus()
        }}
        {...props}
      >
        {children}
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            data-slot="input-group-button"
            aria-label="Toggle"
            aria-expanded={context.open}
            tabIndex={-1}
            className={cn(
              "[&_svg:not([class*='size-'])]:size-4",
              comboboxChipsTriggerStyles,
              comboboxChipsTriggerSizes[size]
            )}
            disabled={context.disabled || undefined}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              context.inputRef.current?.focus()
              if (context.open) context.setOpen(false)
              else context.openWith(null)
            }}
          >
            <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
          </InputGroupButton>
        )}
      </div>
    </PopoverPrimitive.Anchor>
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
  const index = context.values.findIndex(
    (value) => context.labelOf(value) === text
  )

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
        <Button
          variant="ghost"
          size="icon-xs"
          data-slot="combobox-chip-remove"
          aria-label="Remove"
          tabIndex={-1}
          disabled={context.disabled || undefined}
          className="-ms-1 cursor-default bg-transparent opacity-50 hover:bg-transparent hover:opacity-100 active:bg-transparent dark:hover:bg-transparent"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => context.removeValue(index)}
        >
          <XIcon className="pointer-events-none" />
        </Button>
      )}
    </div>
  )
}

function ComboboxChipsInput({
  className,
  onChange,
  onKeyDown,
  onBlur,
  onClick,
  disabled,
  ref,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "defaultValue">) {
  const context = useComboboxContext()
  const setInputRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      context.inputRef.current = node
      assignRef(ref, node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref]
  )

  return (
    <input
      ref={setInputRef}
      data-slot="combobox-chip-input"
      disabled={disabled || context.disabled || undefined}
      className={cn(
        "min-w-16 flex-1 cursor-text bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        className
      )}
      {...context.inputProps({
        onChange,
        onBlur,
        onClick,
        onKeyDown: (event) => {
          onKeyDown?.(event)
          if (
            !event.defaultPrevented &&
            event.key === "Backspace" &&
            event.currentTarget.value === "" &&
            context.values.length > 0
          ) {
            context.removeValue(context.values.length - 1)
          }
        },
      })}
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
