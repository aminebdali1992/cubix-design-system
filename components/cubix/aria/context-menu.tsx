"use client"

/*
  Cubix Context Menu - a menu of actions opened at the pointer.

  Built on React Aria's MenuTrigger with trigger="contextMenu": right click,
  long press on touch, Shift+F10 / the ContextMenu key (and Ctrl+Enter on
  macOS) on the focused trigger open a Popover + Menu positioned at the
  pointer. Escape closes it and focus returns to the trigger. Composed to
  match the Cubix visual API used by Base UI and Radix.
*/
import * as React from "react"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import {
  Button,
  Header,
  I18nProvider,
  Keyboard,
  Menu,
  MenuItem,
  MenuSection,
  MenuTrigger,
  Popover,
  Separator,
  SubmenuTrigger,
} from "react-aria-components"

import { Checkbox } from "@/components/cubix/aria/checkbox"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/cubix/aria/radio-group"
import { cn } from "@/lib/utils"

const itemStyles =
  "group/context-menu-item relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5 data-[variant=destructive]:*:[svg]:text-destructive!"

const selectableItemStyles =
  "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-inset:ps-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5"

const contentStyles =
  "z-50 w-max min-w-[150px] overflow-x-visible overflow-y-auto rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] outline-none"

type TextDirection = "ltr" | "rtl"

type ContextMenuLocale = {
  dir?: TextDirection
  lang?: string
}

const ContextMenuLocaleContext = React.createContext<ContextMenuLocale>({})

const ContextMenuLocaleResolverContext = React.createContext<
  ((locale: ContextMenuLocale) => void) | null
>(null)

function useContextMenuLocale() {
  return React.useContext(ContextMenuLocaleContext)
}

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

/*
  React Aria resolves logical placement (start / end) and arrow-key order from
  its locale, not from the dir attribute. Map the context menu locale so RTL
  menus open toward the inline start of the pointer and submenus toward the
  inline end.
*/
function resolveAriaLocale(locale: ContextMenuLocale): string | undefined {
  if (locale.lang) return locale.lang
  if (locale.dir === "rtl") return "fa-IR"
  if (locale.dir === "ltr") return "en-US"
  return undefined
}

type ContextMenuStore = Map<string, unknown>

const ContextMenuStoreContext = React.createContext<ContextMenuStore | null>(
  null
)

function textContent(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textContent).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return textContent(node.props.children)
  }
  return ""
}

function radioGroupKey(children: React.ReactNode) {
  const values: string[] = []
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement<{ value?: unknown }>(child) &&
      child.props.value !== undefined
    ) {
      values.push(String(child.props.value))
    }
  })
  return `radio:${values.join("|")}`
}

/*
  Menu content unmounts when the menu closes, so uncontrolled checkbox and
  radio state is kept on the root (keyed by the item label or the group's
  item values) and survives reopening the menu.
*/
function usePersistentState<T>(key: string, initial: T) {
  const store = React.useContext(ContextMenuStoreContext)
  const [value, setValue] = React.useState<T>(() =>
    store?.has(key) ? (store.get(key) as T) : initial
  )
  const update = React.useCallback(
    (next: T) => {
      store?.set(key, next)
      setValue(next)
    },
    [store, key]
  )
  return [value, update] as const
}

function localeDomProps(locale: ContextMenuLocale) {
  return {
    ...(locale.dir ? { dir: locale.dir } : {}),
    ...(locale.lang ? { lang: locale.lang } : {}),
  }
}

type ContextMenuIndicator = "check" | "control"

function ContextMenuCheckIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"
    >
      {checked ? (
        <CheckIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />
      ) : null}
    </span>
  )
}

type ContextMenuRadioContextValue = {
  value?: string
  onValueChange?: (value: string) => void
  indicator?: ContextMenuIndicator
}

const ContextMenuRadioContext =
  React.createContext<ContextMenuRadioContextValue | null>(null)

/*
  The root renders no element, so the trigger reports the closest dir / lang
  from the page and the root shares it with the portaled content. Explicit
  dir / lang props on the root always win.
*/
function ContextMenu({
  dir,
  lang,
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuTrigger>,
  "trigger" | "isOpen" | "defaultOpen" | "onOpenChange" | "children"
> & {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  dir?: TextDirection
  lang?: string
}) {
  const [store] = React.useState<ContextMenuStore>(() => new Map())
  const [resolved, setResolved] = React.useState<ContextMenuLocale>({})
  const resolvedDir = resolved.dir
  const resolvedLang = resolved.lang
  const locale = React.useMemo<ContextMenuLocale>(
    () => ({
      dir: toTextDirection(dir) ?? resolvedDir,
      lang: lang ?? resolvedLang,
    }),
    [dir, lang, resolvedDir, resolvedLang]
  )

  return (
    <ContextMenuStoreContext.Provider value={store}>
      <ContextMenuLocaleResolverContext.Provider value={setResolved}>
        <ContextMenuLocaleContext.Provider value={locale}>
          <I18nProvider locale={resolveAriaLocale(locale)}>
            <MenuTrigger
              data-slot="context-menu"
              trigger="contextMenu"
              isOpen={open}
              defaultOpen={defaultOpen}
              onOpenChange={onOpenChange}
              {...props}
            >
              {children}
            </MenuTrigger>
          </I18nProvider>
        </ContextMenuLocaleContext.Provider>
      </ContextMenuLocaleResolverContext.Provider>
    </ContextMenuStoreContext.Provider>
  )
}

function ContextMenuTrigger({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof Button>) {
  const locale = useContextMenuLocale()
  const reportLocale = React.useContext(ContextMenuLocaleResolverContext)
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
    <Button
      ref={setTriggerRef}
      data-slot="context-menu-trigger"
      className={cn(
        "outline-hidden select-none focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background data-[focus-visible]:ring-3 data-[focus-visible]:ring-secondary data-[focus-visible]:ring-offset-1 data-[focus-visible]:ring-offset-background",
        className
      )}
      {...localeDomProps(locale)}
      {...props}
    />
  )
}

function ContextMenuGroup({
  className,
  ...props
}: React.ComponentProps<typeof MenuSection>) {
  return (
    <MenuSection
      data-slot="context-menu-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ContextMenuPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function ContextMenuContent({
  className,
  children,
  align = "start",
  side = "bottom",
  sideOffset = 0,
  alignOffset: _alignOffset,
  dir,
  lang,
  ...props
}: Omit<React.ComponentProps<typeof Popover>, "placement" | "offset"> & {
  align?: "start" | "center" | "end"
  alignOffset?: number
  sideOffset?: number
  side?: "top" | "right" | "bottom" | "left"
}) {
  void _alignOffset
  const locale = useContextMenuLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }
  const placement: NonNullable<React.ComponentProps<typeof Popover>["placement"]> =
    align === "center"
      ? side
      : side === "top"
        ? align === "end"
          ? "top end"
          : "top start"
        : side === "bottom"
          ? align === "end"
            ? "bottom end"
            : "bottom start"
          : side === "left"
            ? align === "end"
              ? "left bottom"
              : "left top"
            : align === "end"
              ? "right bottom"
              : "right top"

  return (
    <Popover
      data-slot="context-menu-content"
      placement={placement}
      offset={sideOffset}
      className={cn(contentStyles, className)}
      {...localeDomProps(contentLocale)}
      {...props}
    >
      <Menu className="outline-none">{children}</Menu>
    </Popover>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  disabled,
  isDisabled,
  ...props
}: React.ComponentProps<typeof MenuItem> & {
  inset?: boolean
  variant?: "default" | "destructive"
  disabled?: boolean
}) {
  return (
    <MenuItem
      data-slot="context-menu-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      className={cn(itemStyles, className)}
      isDisabled={isDisabled ?? disabled}
      {...props}
    />
  )
}

function applyCheckboxSemantics(node: HTMLElement, checked: boolean) {
  node.setAttribute("role", "menuitemcheckbox")
  node.setAttribute("aria-checked", checked ? "true" : "false")
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  inset,
  onCheckedChange,
  indicator = "control",
  disabled,
  isDisabled,
  ref,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children"> & {
  inset?: boolean
  indicator?: ContextMenuIndicator
  disabled?: boolean
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  children?: React.ReactNode
}) {
  const [uncontrolledChecked, setUncontrolledChecked] = usePersistentState(
    `checkbox:${textContent(children)}`,
    defaultChecked ?? false
  )
  const isChecked = checked ?? uncontrolledChecked

  const itemRef = React.useRef<HTMLDivElement | null>(null)
  const checkedRef = React.useRef(isChecked)
  checkedRef.current = isChecked

  // React Aria only exposes checkbox semantics inside a selectable section,
  // so announce this standalone item's checked state directly. The real DOM
  // node is mounted by the collection after this component renders, so apply
  // the attributes from the ref callback as well as after each render.
  const setItemRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      itemRef.current = node
      if (node) applyCheckboxSemantics(node, checkedRef.current)
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  React.useLayoutEffect(() => {
    if (itemRef.current) applyCheckboxSemantics(itemRef.current, isChecked)
  })

  return (
    <MenuItem
      ref={setItemRef}
      data-slot="context-menu-checkbox-item"
      data-inset={inset ? "" : undefined}
      className={cn(selectableItemStyles, className)}
      isDisabled={isDisabled ?? disabled}
      onAction={() => {
        const next = !isChecked
        if (checked === undefined) setUncontrolledChecked(next)
        onCheckedChange?.(next)
      }}
      {...props}
    >
      {indicator === "check" ? (
        <ContextMenuCheckIndicator checked={isChecked} />
      ) : (
        <span aria-hidden className="pointer-events-none absolute end-2 flex items-center justify-center">
          <Checkbox className="size-3.5 rounded-[4px] [&_[data-slot=checkbox-indicator]_svg]:size-2.5" checked={isChecked} excludeFromTabOrder />
        </span>
      )}
      {children}
    </MenuItem>
  )
}

function ContextMenuRadioGroup({
  value,
  defaultValue,
  onValueChange,
  indicator,
  children,
  ...props
}: React.ComponentProps<typeof MenuSection> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  indicator?: ContextMenuIndicator
}) {
  const [uncontrolled, setUncontrolled] = usePersistentState<
    string | undefined
  >(radioGroupKey(typeof children === "function" ? null : children), defaultValue)
  const current = value ?? uncontrolled

  const handleValueChange = (next: string) => {
    if (value === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  return (
    <ContextMenuRadioContext.Provider
      value={{
        value: current,
        indicator,
        onValueChange: handleValueChange,
      }}
    >
      <MenuSection
        data-slot="context-menu-radio-group"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={current !== undefined ? [current] : []}
        onSelectionChange={(keys) => {
          if (keys === "all") return
          const [next] = Array.from(keys)
          if (next !== undefined && String(next) !== current) {
            handleValueChange(String(next))
          }
        }}
        {...props}
      >
        {children}
      </MenuSection>
    </ContextMenuRadioContext.Provider>
  )
}

function ContextMenuRadioIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      inert
      className="pointer-events-none absolute end-2 flex items-center justify-center"
    >
      <RadioGroup value={checked ? "on" : ""} className="flex" aria-label="radio">
        <RadioGroupItem value="on" className="size-3.5 [&_[data-slot=radio-group-indicator]]:size-1.5" aria-label="radio" />
      </RadioGroup>
    </span>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  value,
  indicator,
  disabled,
  isDisabled,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "id" | "children"> & {
  inset?: boolean
  indicator?: ContextMenuIndicator
  disabled?: boolean
  value: string
  children?: React.ReactNode
}) {
  const ctx = React.useContext(ContextMenuRadioContext)
  const selected = ctx?.value === value
  const resolvedIndicator = indicator ?? ctx?.indicator ?? "control"

  return (
    <MenuItem
      id={value}
      data-slot="context-menu-radio-item"
      data-inset={inset ? "" : undefined}
      className={cn(selectableItemStyles, className)}
      isDisabled={isDisabled ?? disabled}
      {...props}
    >
      {resolvedIndicator === "check" ? (
        <ContextMenuCheckIndicator checked={selected} />
      ) : (
        <ContextMenuRadioIndicator checked={selected} />
      )}
      {children}
    </MenuItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof Header> & {
  inset?: boolean
}) {
  return (
    <Header
      data-slot="context-menu-label"
      data-inset={inset ? "" : undefined}
      className={cn(
        "px-2 py-1 text-label whitespace-nowrap font-medium tracking-normal data-inset:ps-8",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<typeof Keyboard>) {
  return (
    <Keyboard
      data-slot="context-menu-shortcut"
      className={cn(
        "ms-auto shrink-0 ps-4 font-mono text-caption tracking-normal whitespace-nowrap text-muted-foreground group-focus/context-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSub({ children }: { children?: React.ReactNode }) {
  return (
    <SubmenuTrigger data-slot="context-menu-sub">
      {React.Children.toArray(children) as [
        React.ReactElement,
        React.ReactElement,
        ...React.ReactElement[],
      ]}
    </SubmenuTrigger>
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children"> & {
  inset?: boolean
  children?: React.ReactNode
}) {
  return (
    <MenuItem
      data-slot="context-menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      className={cn(
        "flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-none select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-inset:ps-8 data-[open]:bg-accent data-[open]:text-accent-foreground [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      {...props}
    >
      {children}
      <span aria-hidden className="min-w-1 flex-1" />
      <ChevronRightIcon className="size-4 rtl:rotate-180" />
    </MenuItem>
  )
}

function ContextMenuSubContent({
  className,
  children,
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof Popover>) {
  const locale = useContextMenuLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <Popover
      data-slot="context-menu-sub-content"
      className={cn(
        "z-50 w-max min-w-[150px] overflow-x-visible rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-lg ring-1 ring-foreground/[0.06] outline-none",
        className
      )}
      {...localeDomProps(contentLocale)}
      {...props}
    >
      <Menu className="outline-none">{children}</Menu>
    </Popover>
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
