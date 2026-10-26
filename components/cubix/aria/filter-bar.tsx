"use client"

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactElement, type ReactNode } from "react"
import { PlusIcon, SearchIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../base/command"
import { Input } from "./input"
import { PopoverContent } from "./popover"

/*
  Cubix Filter Bar - React Aria version. An advanced filtering bar with
  multiple conditions, operators and free-form text. Same API on
  Base UI, Radix and React Aria.
*/

type CustomOptionProps = {
  onChange: (value: string) => void
  onCancel: () => void
  search?: string
}

type FilterOptionObject = { label: string; value: string; count?: number }
type CustomOptionObject = { label?: string; component: (props: CustomOptionProps) => ReactElement }
type FilterOption = string | FilterOptionObject | CustomOptionObject
type OptionsFunction = (
  search?: string
) => (string | FilterOptionObject)[] | Promise<(string | FilterOptionObject)[]>

type FilterOperatorObject = { value: string; label: string }
type FilterOperator = string | FilterOperatorObject

type FilterCondition = {
  propertyName: string
  value: string | number | boolean | Date | null
  operator: string
}

type FilterGroup = {
  logicalOperator: "AND" | "OR"
  conditions: (FilterCondition | FilterGroup)[]
}

type FilterProperty = {
  label: string
  name: string
  type: "string" | "number" | "date" | "boolean"
  options?: FilterOption[] | OptionsFunction | CustomOptionObject
  operators?: FilterOperator[]
  isAvailable?: boolean
  formatValue?: (value: FilterCondition["value"]) => string
}

type FilterBarAction = {
  value: string
  label: string
  icon?: ReactNode
  onSelect: (
    inputValue: string,
    context: { path: number[]; activeFilters: FilterGroup }
  ) => void | Promise<void>
}

type FilterBarVariant = "default" | "pill"
type FilterBarSize = "sm" | "md"

type FilterBarProps = {
  filterProperties: FilterProperty[]
  filters: FilterGroup
  onFilterChange: (filters: FilterGroup) => void
  freeformText: string
  onFreeformTextChange: (text: string) => void
  onApply?: (filters: FilterGroup) => void
  actions?: FilterBarAction[]
  isLoading?: boolean
  supportsOperators?: boolean
  freeformDefaultProperty?: string
  variant?: FilterBarVariant
  /** Bar height: sm = h-8 (32px), md = h-10 (40px). */
  size?: FilterBarSize
  icon?: ReactNode
  placeholder?: string
  className?: string
}

type MenuItem = {
  key: string
  label: string
  hint?: string
  count?: number
  icon?: ReactNode
  onSelect: () => void
}

type ActiveMenu = { type: "root" } | { type: "operator"; index: number } | { type: "value"; index: number } | null

const OPERATOR_LABELS: Record<string, string> = {
  "=": "برابر با",
  "!=": "نابرابر با",
  ">": "بزرگ‌تر از",
  "<": "کوچک‌تر از",
  ">=": "بزرگ‌تر یا برابر",
  "<=": "کوچک‌تر یا برابر",
  CONTAINS: "شامل",
  "STARTS WITH": "شروع با",
  "ENDS WITH": "پایان با",
}

function isGroup(condition: FilterCondition | FilterGroup): condition is FilterGroup {
  return "logicalOperator" in condition
}

function normalizeOperators(property: FilterProperty): FilterOperatorObject[] {
  const list = property.operators?.length ? property.operators : ["="]
  return list.map((op) => (typeof op === "string" ? { value: op, label: OPERATOR_LABELS[op] ?? op } : op))
}

function isCustomOption(option: unknown): option is CustomOptionObject {
  return typeof option === "object" && option !== null && "component" in option
}

function displayValue(property: FilterProperty, value: FilterCondition["value"]) {
  if (value === null || value === undefined) return ""
  if (property.formatValue) return property.formatValue(value)
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(property.options)) {
    const match = property.options.find(
      (option) => !isCustomOption(option) && String(typeof option === "string" ? option : option.value) === String(value)
    )
    if (match && !isCustomOption(match)) return typeof match === "string" ? match : match.label
  }
  return String(value)
}

const MENU_CLASS = "filter-bar-menu w-auto min-w-[220px] max-w-[360px] overflow-hidden p-0"

/* FILTER_MENU_START */
function FilterMenu({
  open,
  onOpenChange,
  children,
  className,
}: {
  open: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  className?: string
}) {
  const anchorRef = useRef<HTMLSpanElement>(null)

  // React Aria moves focus into the dialog on open; hand it back to the bar input so typing continues.
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const id = requestAnimationFrame(() => {
      const active = document.activeElement
      const inMenu = active instanceof Element && !!active.closest(".filter-bar-menu")
      if (previous && inMenu && anchorRef.current?.parentElement?.contains(previous)) {
        previous.focus()
      }
    })
    return () => cancelAnimationFrame(id)
  }, [open])

  return (
    <>
      <span ref={anchorRef} aria-hidden className="pointer-events-none absolute inset-0" />
      <PopoverContent
        triggerRef={anchorRef}
        isOpen={open}
        onOpenChange={(next) => onOpenChange?.(next)}
        align="start" className={cn(MENU_CLASS, className)}>
        {children}
      </PopoverContent>
    </>
  )
}
/* FILTER_MENU_END */

function MenuList({
  items,
  highlighted,
  onHighlight,
  empty,
}: {
  items: MenuItem[]
  highlighted: number
  onHighlight?: (index: number) => void
  empty?: string
}) {
  return (
    <Command
      shouldFilter={false}
      value={items[highlighted]?.key ?? ""}
      onValueChange={(key) => onHighlight?.(items.findIndex((item) => item.key === key))}
     
    >
      <CommandList>
        {empty && <CommandEmpty>{empty}</CommandEmpty>}
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.key}
              value={item.key}
              onMouseDown={(e) => e.preventDefault()}
              onSelect={item.onSelect}
              className="justify-between [&>svg:last-child]:hidden"
            >
              <span className="flex min-w-0 items-center gap-2">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </span>
              {item.hint && (
                <span className="ms-auto rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {item.hint}
                </span>
              )}
              {item.count !== undefined && <code className="text-muted-foreground">{item.count}</code>}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function useResolvedOptions(property: FilterProperty | undefined, search: string, enabled: boolean) {
  const [state, setState] = useState<{ items: FilterOption[]; loading: boolean }>({ items: [], loading: false })
  useEffect(() => {
    if (!enabled || !property?.options) return
    const source = property.options
    if (isCustomOption(source)) {
      setState({ items: [source], loading: false })
      return
    }
    if (Array.isArray(source)) {
      setState({ items: source, loading: false })
      return
    }
    let cancelled = false
    const result = source(search)
    if (result instanceof Promise) {
      setState((s) => ({ ...s, loading: true }))
      result.then((items) => !cancelled && setState({ items, loading: false }))
    } else {
      setState({ items: result, loading: false })
    }
    return () => {
      cancelled = true
    }
  }, [property, search, enabled])
  return state
}

function FilterConditionChip({
  condition,
  property,
  variant,
  menu,
  index,
  autoFocus,
  setMenu,
  onChange,
  onCommit,
  onRemove,
  isUserFocus,
  closeMenu,
}: {
  condition: FilterCondition
  property: FilterProperty
  variant: FilterBarVariant
  menu: ActiveMenu
  index: number
  autoFocus: boolean
  setMenu: (menu: ActiveMenu) => void
  onChange: (condition: FilterCondition) => void
  onCommit: () => void
  onRemove: () => void
  isUserFocus: () => boolean
  closeMenu: (after?: () => void) => void
}) {
  const [highlighted, setHighlighted] = useState(0)
  const [customOpen, setCustomOpen] = useState<CustomOptionObject | null>(null)
  const operatorOpen = menu?.type === "operator" && menu.index === index
  const valueOpen = menu?.type === "value" && menu.index === index
  const text = displayValue(property, condition.value)
  // Search only what the user typed since the menu opened, never the selected label/value.
  const [search, setSearch] = useState("")
  useEffect(() => {
    if (valueOpen) setSearch("")
  }, [valueOpen])
  const { items: options, loading } = useResolvedOptions(property, search, valueOpen)
  const operators = normalizeOperators(property)
  const operatorSymbol = condition.operator

  const setValue = (value: string) => {
    onChange({ ...condition, value })
    setSearch("")
    setCustomOpen(null)
    setMenu({ type: "root" })
    onCommit()
  }

  const valueItems: MenuItem[] = options
    .filter((option) => {
      if (isCustomOption(option)) return true
      const label = typeof option === "string" ? option : option.label
      return !search || label.toLowerCase().includes(search.toLowerCase()) || typeof property.options === "function"
    })
    .map((option, i) => {
      if (isCustomOption(option)) {
        return { key: `custom-${i}`, label: option.label ?? "مقدار سفارشی...", onSelect: () => setCustomOpen(option) }
      }
      const value = typeof option === "string" ? option : option.value
      const label = typeof option === "string" ? option : option.label
      const count = typeof option === "string" ? undefined : option.count
      return { key: value, label, count, onSelect: () => setValue(value) }
    })

  const operatorItems: MenuItem[] = operators.map((op) => ({
    key: op.value,
    label: op.label,
    hint: op.value,
    onSelect: () => {
      onChange({ ...condition, operator: op.value })
      setMenu({ type: "value", index })
      onCommit()
    },
  }))

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const list = valueOpen ? valueItems : []
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, list.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (list[highlighted]) list[highlighted].onSelect()
      else {
        setMenu({ type: "root" })
        onCommit()
      }
    } else if (e.key === "Escape") {
      setMenu(null)
    } else if (e.key === "Backspace" && text === "") {
      e.preventDefault()
      onRemove()
    }
  }

  return (
    <div
      data-slot="filter-bar-condition"
      className={cn(
        "relative flex shrink-0 items-stretch bg-muted px-0",
        variant === "pill" ? "h-full rounded-sm border border-border" : "h-full border-e border-border"
      )}
    >
      <span className="flex h-full shrink-0 items-center ps-2 pe-1 text-xs leading-4 whitespace-nowrap text-muted-foreground">
        {property.label}
      </span>
      <div className="relative inline-flex">
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => setMenu(operatorOpen ? null : { type: "operator", index })}
          aria-label={`عملگر ${property.label}`}
          className="h-full rounded-none px-1 text-center font-mono text-xs text-foreground outline-none hover:bg-transparent focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          {operatorSymbol}
        </Button>
        <FilterMenu open={operatorOpen} onOpenChange={(next) => !next && closeMenu()}>
          <MenuList items={operatorItems} highlighted={-1} />
        </FilterMenu>
      </div>
      <div className="relative inline-block max-w-[180px]">
        <Input
          type="text"
          value={text}
          autoFocus={autoFocus}
          aria-label={`مقدار ${property.label}`}
          autoComplete="off"
          onFocus={() => {
            // Only genuine focus (pointer or Tab) opens the menu, never a programmatic focus return.
            if (!isUserFocus() && !autoFocus) return
            setHighlighted(0)
            setMenu({ type: "value", index })
          }}
          onClick={() => !valueOpen && setMenu({ type: "value", index })}
          onChange={(e) => {
            setSearch(e.target.value)
            setHighlighted(0)
            onChange({ ...condition, value: e.target.value })
          }}
          onKeyDown={handleKeyDown}
          className="absolute start-0 top-0 h-full w-full rounded-none border-none bg-transparent px-1 py-0 text-xs shadow-none focus-visible:ring-0 md:text-xs dark:bg-transparent"
        />
        <span className="invisible block px-1 text-xs whitespace-pre">{text || " "}</span>
        <FilterMenu
          open={valueOpen && !!customOpen}
          onOpenChange={(next) => !next && closeMenu(() => setCustomOpen(null))}
          className="min-w-[220px] max-w-none"
        >
          {customOpen?.component({
            onChange: setValue,
            onCancel: () => {
              setCustomOpen(null)
              onRemove()
            },
            search: condition.value === null || condition.value === undefined ? "" : String(condition.value),
          })}
        </FilterMenu>
        <FilterMenu
          open={valueOpen && !customOpen && (loading || valueItems.length > 0)}
          onOpenChange={(next) => !next && closeMenu()}
        >
          <MenuList
            items={loading ? [] : valueItems}
            highlighted={highlighted}
            onHighlight={setHighlighted}
            empty={loading ? "در حال بارگذاری..." : undefined}
          />
        </FilterMenu>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={onRemove}
        aria-label={`حذف فیلتر ${property.label}`}
        className="m-[3px] size-[18px] shrink-0 self-center rounded-sm p-0 text-muted-foreground hover:bg-muted-foreground/15 hover:text-foreground"
      >
        <XIcon strokeWidth={1.5} className="size-3" />
      </Button>
    </div>
  )
}

function FilterBar({
  filterProperties,
  filters,
  onFilterChange,
  freeformText,
  onFreeformTextChange,
  onApply,
  actions,
  isLoading = false,
  supportsOperators = false,
  freeformDefaultProperty,
  variant = "default",
  size = "md",
  icon,
  placeholder = "جستجو یا فیلتر...",
  className,
}: FilterBarProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [menu, setMenu] = useState<ActiveMenu>(null)
  const [highlighted, setHighlighted] = useState(0)
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const lastPointerRef = useRef<{ time: number; target: EventTarget | null }>({ time: 0, target: null })
  const lastTabRef = useRef(0)

  const isUserFocus = () => {
    const now = Date.now()
    return now - lastPointerRef.current.time < 500 || now - lastTabRef.current < 500
  }

  /*
    Popover asks to close on outside press. Defer one tick so every pointerdown
    handler has run, then keep the menu open when the press landed on the
    already-focused bar input that owns it (no close-then-reopen flicker).
  */
  const closeMenu = (after?: () => void) => {
    setTimeout(() => {
      const { time, target } = lastPointerRef.current
      const onFocusedInput =
        Date.now() - time < 300 &&
        target instanceof HTMLInputElement &&
        target === document.activeElement &&
        !!wrapperRef.current?.contains(target)
      if (onFocusedInput) return
      after?.()
      setMenu(null)
    })
  }

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Tab") lastTabRef.current = Date.now()
    }
    document.addEventListener("keydown", onKeyDown, true)
    return () => document.removeEventListener("keydown", onKeyDown, true)
  }, [])

  const commit = (next: FilterGroup) => {
    onFilterChange(next)
    onApply?.(next)
  }

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element
      if (target.closest?.(".filter-bar-menu")) return
      if (wrapperRef.current && !wrapperRef.current.contains(target)) setMenu(null)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  const addCondition = (property: FilterProperty, value = "") => {
    const operators = normalizeOperators(property)
    const operator = operators.find((op) => op.value === "=")?.value ?? operators[0].value
    const next = { ...filters, conditions: [...filters.conditions, { propertyName: property.name, operator, value }] }
    onFreeformTextChange("")
    if (value) {
      commit(next)
      setMenu({ type: "root" })
    } else {
      onFilterChange(next)
      setFocusIndex(next.conditions.length - 1)
      setMenu({ type: "value", index: next.conditions.length - 1 })
    }
  }

  const rootItems = useMemo<MenuItem[]>(() => {
    const query = freeformText.trim().toLowerCase()
    const items: MenuItem[] = []
    const defaultProperty = filterProperties.find((p) => p.name === freeformDefaultProperty)
    if (defaultProperty && query) {
      items.push({
        key: "freeform",
        label: `${defaultProperty.label}: «${freeformText.trim()}»`,
        icon: <SearchIcon className="size-3.5 text-muted-foreground" />,
        onSelect: () => addCondition(defaultProperty, freeformText.trim()),
      })
    }
    filterProperties
      .filter((p) => p.isAvailable !== false && (!query || p.label.toLowerCase().includes(query)))
      .forEach((p) => items.push({ key: `property-${p.name}`, label: p.label, onSelect: () => addCondition(p) }))
    if (supportsOperators) {
      items.push({
        key: "new-group",
        label: "گروه جدید",
        icon: <PlusIcon className="size-3.5 text-muted-foreground" />,
        onSelect: () => {
          commit({ ...filters, conditions: [...filters.conditions, { logicalOperator: "AND", conditions: [] }] })
          onFreeformTextChange("")
          setMenu(null)
        },
      })
    }
    actions?.forEach((action) =>
      items.push({
        key: `action-${action.value}`,
        label: action.label,
        icon: action.icon,
        onSelect: () => {
          void action.onSelect(freeformText, { path: [], activeFilters: filters })
          setMenu(null)
        },
      })
    )
    return items
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freeformText, filterProperties, actions, filters, freeformDefaultProperty, supportsOperators])

  const handleRootKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, rootItems.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (rootItems[highlighted]) rootItems[highlighted].onSelect()
      else onApply?.(filters)
    } else if (e.key === "Escape") {
      setMenu(null)
    } else if (e.key === "Backspace" && freeformText === "" && filters.conditions.length > 0) {
      commit({ ...filters, conditions: filters.conditions.slice(0, -1) })
    }
  }

  const focusRoot = () => {
    wrapperRef.current?.querySelector<HTMLInputElement>("[data-filter-bar-input]")?.focus()
  }

  return (
    <div
      ref={wrapperRef}
      data-slot="filter-bar"
      data-variant={variant}
      data-size={size}
      onPointerDownCapture={(e) => {
        lastPointerRef.current = { time: Date.now(), target: e.target }
      }}
      className="relative w-full space-y-2"
    >
      <div
        className={cn(
          "relative flex w-full cursor-text items-stretch gap-0 overflow-hidden rounded-md border border-border bg-foreground/[.026] p-0",
          size === "sm" ? "h-8" : "h-10",
          className
        )}
      >
        <div
          className={cn(
            "relative flex shrink-0 cursor-pointer justify-center",
            size === "sm" ? "px-1.5" : "px-2",
            variant === "pill" ? "items-center bg-transparent" : "items-center",
            variant === "pill" ? "" : "border-e border-border bg-muted"
          )}
          onClick={focusRoot}
        >
          <div className={cn("relative flex items-center transition-opacity duration-300", icon ? "opacity-0" : "opacity-100")}>
            <SearchIcon className={cn("text-muted-foreground", size === "sm" ? "size-3.5" : "size-4")} />
          </div>
          {icon && <div className="absolute inset-0 flex items-center justify-center">{icon}</div>}
        </div>
        <div
          data-loading={isLoading || undefined}
          className={cn(
            "no-scrollbar flex h-full min-w-0 flex-1 flex-nowrap items-center overflow-auto overflow-y-hidden transition-opacity",
            variant === "pill" ? "gap-1 ps-1" : "gap-0",
            isLoading && "animate-pulse opacity-50"
          )}
        >
          {filters.conditions.map((condition, index) => (
            <FilterGroupItem
              key={index}
              index={index}
              condition={condition}
              filters={filters}
              filterProperties={filterProperties}
              supportsOperators={supportsOperators}
              variant={variant}
              menu={menu}
              autoFocus={focusIndex === index}
              setMenu={setMenu}
              onFilterChange={onFilterChange}
              commit={commit}
              isUserFocus={isUserFocus}
              closeMenu={closeMenu}
            />
          ))}
          <div className="relative flex h-full min-w-[120px] flex-1 items-center">
            <Input
              type="text"
              data-filter-bar-input=""
              value={freeformText}
              autoComplete="off"
              placeholder={filters.conditions.length === 0 ? placeholder : "افزودن فیلتر..."}
              onClick={() => menu?.type !== "root" && setMenu({ type: "root" })}
              onFocus={() => {
                setFocusIndex(null)
                if (!isUserFocus()) return
                setHighlighted(0)
                setMenu({ type: "root" })
              }}
              onChange={(e) => {
                onFreeformTextChange(e.target.value)
                setHighlighted(0)
                setMenu({ type: "root" })
              }}
              onKeyDown={handleRootKeyDown}
              className={cn("relative mx-[3px] w-auto min-w-0 flex-1 border-none bg-transparent text-xs shadow-none focus-visible:ring-0 md:text-xs dark:bg-transparent", size === "sm" ? "px-1.5" : "px-2", "h-full py-0")}
            />
            <FilterMenu
              open={menu?.type === "root" && rootItems.length > 0}
              onOpenChange={(next) => !next && closeMenu()}
            >
              <MenuList items={rootItems} highlighted={highlighted} onHighlight={setHighlighted} />
            </FilterMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterGroupItem({
  index,
  condition,
  filters,
  filterProperties,
  supportsOperators,
  variant,
  menu,
  autoFocus,
  setMenu,
  onFilterChange,
  commit,
  isUserFocus,
  closeMenu,
}: {
  index: number
  condition: FilterCondition | FilterGroup
  filters: FilterGroup
  filterProperties: FilterProperty[]
  supportsOperators: boolean
  variant: FilterBarVariant
  menu: ActiveMenu
  autoFocus: boolean
  setMenu: (menu: ActiveMenu) => void
  onFilterChange: (filters: FilterGroup) => void
  commit: (filters: FilterGroup) => void
  isUserFocus: () => boolean
  closeMenu: (after?: () => void) => void
}) {
  const replace = (next: FilterCondition | FilterGroup) =>
    onFilterChange({ ...filters, conditions: filters.conditions.map((c, i) => (i === index ? next : c)) })
  const remove = () => {
    commit({ ...filters, conditions: filters.conditions.filter((_, i) => i !== index) })
    setMenu(null)
  }

  return (
    <>
      {index > 0 && supportsOperators && (
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => commit({ ...filters, logicalOperator: filters.logicalOperator === "AND" ? "OR" : "AND" })}
          className="h-auto cursor-pointer self-center rounded-none px-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {filters.logicalOperator === "AND" ? "و" : "یا"}
        </Button>
      )}
      {isGroup(condition) ? (
        <NestedGroup
          group={condition}
          filterProperties={filterProperties}
          onChange={(next) => commit({ ...filters, conditions: filters.conditions.map((c, i) => (i === index ? next : c)) })}
          onRemove={remove}
        />
      ) : (
        (() => {
          const property = filterProperties.find((p) => p.name === condition.propertyName)
          if (!property) return null
          return (
            <FilterConditionChip
              condition={condition}
              property={property}
              variant={variant}
              menu={menu}
              index={index}
              autoFocus={autoFocus}
              setMenu={setMenu}
              onChange={replace}
              onCommit={() => undefined}
              onRemove={remove}
              isUserFocus={isUserFocus}
              closeMenu={closeMenu}
            />
          )
        })()
      )}
    </>
  )
}

function NestedGroup({
  group,
  filterProperties,
  onChange,
  onRemove,
}: {
  group: FilterGroup
  filterProperties: FilterProperty[]
  onChange: (group: FilterGroup) => void
  onRemove: () => void
}) {
  return (
    <div
      data-slot="filter-bar-group"
      className="flex shrink-0 items-center gap-1 self-stretch border-e border-border px-1 before:text-muted-foreground before:content-['('] after:text-muted-foreground after:content-[')']"
    >
      {group.conditions.map((child, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-xs text-muted-foreground">{group.logicalOperator === "AND" ? "و" : "یا"}</span>}
          {isGroup(child) ? (
            <NestedGroup
              group={child}
              filterProperties={filterProperties}
              onChange={(next) => onChange({ ...group, conditions: group.conditions.map((c, j) => (j === i ? next : c)) })}
              onRemove={() => onChange({ ...group, conditions: group.conditions.filter((_, j) => j !== i) })}
            />
          ) : (
            <span className="flex h-[22px] items-center rounded-sm bg-muted px-2 text-xs text-muted-foreground">
              {(filterProperties.find((p) => p.name === child.propertyName)?.label ?? child.propertyName) +
                ` ${child.operator} ${String(child.value ?? "")}`}
            </span>
          )}
        </span>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={() => onChange({ ...group, conditions: [...group.conditions, { logicalOperator: "AND", conditions: [] }] })}
        className="h-[22px] gap-1 px-1.5 text-xs text-muted-foreground"
      >
        <PlusIcon className="size-3" />
        گروه جدید
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={onRemove}
        aria-label="حذف گروه"
        className="size-[18px] rounded-sm p-0 text-muted-foreground hover:text-foreground"
      >
        <XIcon strokeWidth={1.5} className="size-3" />
      </Button>
    </div>
  )
}

export { FilterBar }
export type {
  CustomOptionProps,
  FilterBarAction,
  FilterBarProps,
  FilterBarSize,
  FilterBarVariant,
  FilterCondition,
  FilterGroup,
  FilterOption,
  FilterOptionObject,
  FilterOperator,
  FilterProperty,
}
