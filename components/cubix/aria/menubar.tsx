"use client"

/*
  Cubix Menubar - persistent horizontal menu for desktop-style apps.

  React Aria has no Menubar primitive; this base composes Toolbar + MenuTrigger
  + Menu + Popover to match the Cubix visual API used by Base UI and Radix.
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
  Toolbar,
} from "react-aria-components"

import { Checkbox } from "@/components/cubix/aria/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/cubix/aria/radio-group"
import { cn } from "@/lib/utils"

const itemStyles =
  "group/menubar-item relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5 data-[variant=destructive]:*:[svg]:text-destructive!"

const contentStyles =
  "z-50 w-max min-w-[150px] overflow-x-visible overflow-y-auto rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] outline-none"

type TextDirection = "ltr" | "rtl"

type MenubarLocale = {
  dir?: TextDirection
  lang?: string
}

const MenubarLocaleContext = React.createContext<MenubarLocale>({})

function useMenubarLocale() {
  return React.useContext(MenubarLocaleContext)
}

function toTextDirection(value: string | null | undefined): TextDirection | undefined {
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
  its locale, not from the dir attribute. Map the menubar locale so RTL menus
  align to the trigger's inline start edge.
*/
function resolveAriaLocale(locale: MenubarLocale): string | undefined {
  if (locale.lang) return locale.lang
  if (locale.dir === "rtl") return "fa-IR"
  if (locale.dir === "ltr") return "en-US"
  return undefined
}

function localeDomProps(locale: MenubarLocale) {
  return {
    ...(locale.dir ? { dir: locale.dir } : {}),
    ...(locale.lang ? { lang: locale.lang } : {}),
  }
}

type MenubarStore = Map<string, unknown>

const MenubarStoreContext = React.createContext<MenubarStore | null>(null)

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
    if (React.isValidElement<{ value?: unknown }>(child) && child.props.value !== undefined) {
      values.push(String(child.props.value))
    }
  })
  return `radio:${values.join("|")}`
}

/*
  Menu content unmounts when the menu closes, so uncontrolled checkbox and
  radio state is kept on the menu (keyed by the item label or the group's
  item values) and survives reopening it.
*/
function usePersistentState<T>(key: string, initial: T) {
  const store = React.useContext(MenubarStoreContext)
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

type MenubarIndicator = "check" | "control"

function MenubarCheckIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"
    >
      {checked ? <CheckIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" /> : null}
    </span>
  )
}

type MenubarRadioContextValue = {
  value?: string
  onValueChange?: (value: string) => void
  indicator?: MenubarIndicator
}

const MenubarRadioContext = React.createContext<MenubarRadioContextValue | null>(null)

function Menubar({ className, dir, lang, ...props }: React.ComponentProps<typeof Toolbar>) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [locale, setLocale] = React.useState<MenubarLocale>({
    dir: toTextDirection(dir),
    lang,
  })

  React.useLayoutEffect(() => {
    setLocale({
      dir: toTextDirection(dir) ?? resolveClosestDir(ref.current),
      lang: lang ?? resolveClosestLang(ref.current),
    })
  }, [dir, lang])

  return (
    <MenubarLocaleContext.Provider value={locale}>
      <I18nProvider locale={resolveAriaLocale(locale)}>
        <Toolbar
          ref={ref}
          data-slot="menubar"
          aria-label={props["aria-label"] ?? "Menubar"}
          className={cn("flex h-8 w-fit items-center gap-0.5 rounded-lg border p-[3px]", className)}
          {...localeDomProps(locale)}
          {...props}
        />
      </I18nProvider>
    </MenubarLocaleContext.Provider>
  )
}

function MenubarMenu({ children }: { children: React.ReactNode }) {
  const [store] = React.useState<MenubarStore>(() => new Map())

  return (
    <MenubarStoreContext.Provider value={store}>
      <MenuTrigger data-slot="menubar-menu">{children}</MenuTrigger>
    </MenubarStoreContext.Provider>
  )
}

function MenubarGroup({ className, ...props }: React.ComponentProps<typeof MenuSection>) {
  return <MenuSection data-slot="menubar-group" className={cn(className)} {...props} />
}

function MenubarPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="menubar-trigger"
      className={cn(
        "flex items-center rounded-sm px-1.5 py-[2px] text-label whitespace-nowrap font-medium tracking-normal outline-hidden select-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background data-[pressed]:bg-muted data-[focus-visible]:bg-muted aria-expanded:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  children,
  align = "start",
  side = "bottom",
  sideOffset = 8,
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
  const locale = useMenubarLocale()
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
      data-slot="menubar-content"
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

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenuItem> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuItem
      data-slot="menubar-item"
      data-inset={inset ? "" : undefined}
      data-variant={variant}
      className={cn(itemStyles, className)}
      {...props}
    />
  )
}

function applyCheckboxSemantics(node: HTMLElement, checked: boolean) {
  node.setAttribute("role", "menuitemcheckbox")
  node.setAttribute("aria-checked", checked ? "true" : "false")
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  inset,
  onCheckedChange,
  indicator = "control",
  closeOnClick = false,
  ref,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children" | "shouldCloseOnSelect"> & {
  inset?: boolean
  indicator?: MenubarIndicator
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  closeOnClick?: boolean
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
      data-slot="menubar-checkbox-item"
      data-inset={inset ? "" : undefined}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-inset:ps-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      shouldCloseOnSelect={closeOnClick}
      onAction={() => {
        const next = !isChecked
        if (checked === undefined) setUncontrolledChecked(next)
        onCheckedChange?.(next)
      }}
      {...props}
    >
      {indicator === "check" ? (
        <MenubarCheckIndicator checked={isChecked} />
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute end-2 flex items-center justify-center"
        >
          <Checkbox
            className="size-3.5 rounded-[4px] [&_[data-slot=checkbox-indicator]_svg]:size-2.5"
            checked={isChecked}
            excludeFromTabOrder
          />
        </span>
      )}
      {children}
    </MenuItem>
  )
}

function MenubarRadioGroup({
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
  indicator?: MenubarIndicator
}) {
  const [uncontrolled, setUncontrolled] = usePersistentState<string | undefined>(
    radioGroupKey(typeof children === "function" ? null : children),
    defaultValue
  )
  const current = value ?? uncontrolled

  const handleValueChange = (next: string) => {
    if (value === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  return (
    <MenubarRadioContext.Provider
      value={{
        value: current,
        indicator,
        onValueChange: handleValueChange,
      }}
    >
      <MenuSection
        data-slot="menubar-radio-group"
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
    </MenubarRadioContext.Provider>
  )
}

function MenubarRadioIndicator({ checked }: { checked: boolean }) {
  return (
    <span inert className="pointer-events-none absolute end-2 flex items-center justify-center">
      <RadioGroup value={checked ? "on" : ""} className="flex" aria-label="radio">
        <RadioGroupItem
          value="on"
          className="size-3.5 [&_[data-slot=radio-group-indicator]]:size-1.5"
          aria-label="radio"
        />
      </RadioGroup>
    </span>
  )
}

function MenubarRadioItem({
  className,
  children,
  inset,
  value,
  indicator,
  closeOnClick = false,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "id" | "children" | "shouldCloseOnSelect"> & {
  inset?: boolean
  indicator?: MenubarIndicator
  closeOnClick?: boolean
  value: string
  children?: React.ReactNode
}) {
  const ctx = React.useContext(MenubarRadioContext)
  const selected = ctx?.value === value
  const resolvedIndicator = indicator ?? ctx?.indicator ?? "control"

  return (
    <MenuItem
      id={value}
      data-slot="menubar-radio-item"
      data-inset={inset ? "" : undefined}
      shouldCloseOnSelect={closeOnClick}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-inset:ps-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      {...props}
    >
      {resolvedIndicator === "check" ? (
        <MenubarCheckIndicator checked={selected} />
      ) : (
        <MenubarRadioIndicator checked={selected} />
      )}
      {children}
    </MenuItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof Header> & {
  inset?: boolean
}) {
  return (
    <Header
      data-slot="menubar-label"
      data-inset={inset ? "" : undefined}
      className={cn(
        "px-2 py-1 text-label whitespace-nowrap font-medium tracking-normal data-inset:ps-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function MenubarShortcut({ className, ...props }: React.ComponentProps<typeof Keyboard>) {
  return (
    <Keyboard
      data-slot="menubar-shortcut"
      className={cn(
        "ms-auto shrink-0 ps-4 font-mono text-caption tracking-normal whitespace-nowrap text-muted-foreground group-focus/menubar-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({ children }: { children?: React.ReactNode }) {
  return (
    <SubmenuTrigger data-slot="menubar-sub">
      {
        React.Children.toArray(children) as [
          React.ReactElement,
          React.ReactElement,
          ...React.ReactElement[],
        ]
      }
    </SubmenuTrigger>
  )
}

function MenubarSubTrigger({
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
      data-slot="menubar-sub-trigger"
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

function MenubarSubContent({
  className,
  children,
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof Popover>) {
  const locale = useMenubarLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <Popover
      data-slot="menubar-sub-content"
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
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
