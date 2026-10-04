"use client"

/*
  Cubix Dropdown Menu - a menu of actions opened from a button.

  Built on React Aria's MenuTrigger: press, Enter, Space or ArrowDown on the
  trigger open a Popover + Menu aligned to the start edge of the trigger
  (the right edge in RTL). Escape closes it and focus returns to the
  trigger. Composed to match the Cubix visual API used by Base UI and Radix.
*/
import * as React from "react"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import {
  Button as AriaButton,
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
  type ButtonProps,
} from "react-aria-components"

import { buttonVariants } from "@/components/cubix/aria/button"
import { Checkbox } from "@/components/cubix/aria/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/cubix/aria/radio-group"
import { cn } from "@/lib/utils"

const itemStyles =
  "group/dropdown-menu-item relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5 data-[variant=destructive]:*:[svg]:text-destructive!"

const selectableItemStyles =
  "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-inset:ps-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5"

const contentStyles =
  "z-50 max-h-(--visual-viewport-height) w-max min-w-[150px] origin-(--trigger-anchor-point) overflow-x-visible overflow-y-auto rounded-lg bg-popover p-1 text-start text-popover-foreground ring-1 ring-foreground/[0.06] duration-100 outline-none data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:overflow-hidden data-exiting:fade-out-0 data-exiting:zoom-out-95"

type TextDirection = "ltr" | "rtl"

type DropdownMenuLocale = {
  dir?: TextDirection
  lang?: string
}

const DropdownMenuLocaleContext = React.createContext<DropdownMenuLocale>({})

const DropdownMenuLocaleResolverContext = React.createContext<
  ((locale: DropdownMenuLocale) => void) | null
>(null)

function useDropdownMenuLocale() {
  return React.useContext(DropdownMenuLocaleContext)
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
  its locale, not from the dir attribute. Map the menu locale so RTL menus
  align to the right edge of the trigger and submenus open toward the inline
  end.
*/
function resolveAriaLocale(locale: DropdownMenuLocale): string | undefined {
  if (locale.lang) return locale.lang
  if (locale.dir === "rtl") return "fa-IR"
  if (locale.dir === "ltr") return "en-US"
  return undefined
}

type DropdownMenuStore = Map<string, unknown>

const DropdownMenuStoreContext = React.createContext<DropdownMenuStore | null>(null)

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
  radio state is kept on the root (keyed by the item label or the group's
  item values) and survives reopening the menu.
*/
function usePersistentState<T>(key: string, initial: T) {
  const store = React.useContext(DropdownMenuStoreContext)
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

function localeDomProps(locale: DropdownMenuLocale) {
  return {
    ...(locale.dir ? { dir: locale.dir } : {}),
    ...(locale.lang ? { lang: locale.lang } : {}),
  }
}

type DropdownMenuIndicator = "check" | "control"

function DropdownMenuCheckIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"
    >
      {checked ? <CheckIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" /> : null}
    </span>
  )
}

type DropdownMenuRadioContextValue = {
  value?: string
  indicator?: DropdownMenuIndicator
}

const DropdownMenuRadioContext = React.createContext<DropdownMenuRadioContextValue | null>(null)

/*
  The root renders no element, so the trigger reports the closest dir / lang
  from the page and the root shares it with the portaled content. Explicit
  dir / lang props on the root always win.
*/
function DropdownMenu({
  dir,
  lang,
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof MenuTrigger>,
  "isOpen" | "defaultOpen" | "onOpenChange" | "children"
> & {
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  dir?: TextDirection
  lang?: string
}) {
  const [store] = React.useState<DropdownMenuStore>(() => new Map())
  const [resolved, setResolved] = React.useState<DropdownMenuLocale>({})
  const resolvedDir = resolved.dir
  const resolvedLang = resolved.lang
  const locale = React.useMemo<DropdownMenuLocale>(
    () => ({
      dir: toTextDirection(dir) ?? resolvedDir,
      lang: lang ?? resolvedLang,
    }),
    [dir, lang, resolvedDir, resolvedLang]
  )

  return (
    <DropdownMenuStoreContext.Provider value={store}>
      <DropdownMenuLocaleResolverContext.Provider value={setResolved}>
        <DropdownMenuLocaleContext.Provider value={locale}>
          <I18nProvider locale={resolveAriaLocale(locale)}>
            <MenuTrigger
              data-slot="dropdown-menu"
              isOpen={open}
              defaultOpen={defaultOpen}
              onOpenChange={onOpenChange}
              {...props}
            >
              {children}
            </MenuTrigger>
          </I18nProvider>
        </DropdownMenuLocaleContext.Provider>
      </DropdownMenuLocaleResolverContext.Provider>
    </DropdownMenuStoreContext.Provider>
  )
}

type TriggerRenderProps = {
  variant?:
    | "default"
    | "foreground"
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
function DropdownMenuTrigger({
  render,
  className,
  ref,
  ...props
}: Omit<ButtonProps, "className" | "render"> & {
  render?: React.ReactElement<TriggerRenderProps>
  className?: string
  ref?: React.Ref<HTMLButtonElement>
}) {
  const locale = useDropdownMenuLocale()
  const reportLocale = React.useContext(DropdownMenuLocaleResolverContext)
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

  const renderProps = React.isValidElement(render) ? render.props : undefined

  return (
    <AriaButton
      ref={setTriggerRef}
      data-slot="dropdown-menu-trigger"
      aria-label={renderProps?.["aria-label"]}
      className={cn(
        renderProps
          ? buttonVariants({
              variant: renderProps.variant ?? "default",
              size: renderProps.size ?? "default",
            })
          : "outline-hidden select-none data-[focus-visible]:ring-3 data-[focus-visible]:ring-secondary data-[focus-visible]:ring-offset-1 data-[focus-visible]:ring-offset-background",
        renderProps?.className,
        className
      )}
      {...localeDomProps(locale)}
      {...props}
    />
  )
}

function DropdownMenuGroup({ className, ...props }: React.ComponentProps<typeof MenuSection>) {
  return <MenuSection data-slot="dropdown-menu-group" className={cn(className)} {...props} />
}

function DropdownMenuPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

type Side = "top" | "right" | "bottom" | "left"
type Align = "start" | "center" | "end"

function toPlacement(
  side: Side,
  align: Align
): NonNullable<React.ComponentProps<typeof Popover>["placement"]> {
  if (align === "center") return side
  if (side === "top" || side === "bottom") return `${side} ${align}`
  return `${side} ${align === "end" ? "bottom" : "top"}`
}

/*
  alignOffset follows the Base UI / Radix meaning: a positive value moves the
  menu away from the aligned edge. React Aria's crossOffset is physical, so
  flip it for end alignment and for the logical start edge in RTL.
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

function DropdownMenuContent({
  className,
  children,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  dir,
  lang,
  ...props
}: Omit<React.ComponentProps<typeof Popover>, "placement" | "offset" | "crossOffset"> & {
  align?: Align
  alignOffset?: number
  sideOffset?: number
  side?: Side
}) {
  const locale = useDropdownMenuLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <Popover
      data-slot="dropdown-menu-content"
      placement={toPlacement(side, align)}
      offset={sideOffset}
      crossOffset={toCrossOffset(alignOffset, side, align, contentLocale.dir)}
      className={cn(contentStyles, "shadow-md", className)}
      {...localeDomProps(contentLocale)}
      {...props}
    >
      <Menu className="outline-none">{children}</Menu>
    </Popover>
  )
}

function DropdownMenuItem({
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
      data-slot="dropdown-menu-item"
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

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  inset,
  onCheckedChange,
  indicator = "control",
  disabled,
  isDisabled,
  closeOnClick = false,
  ref,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children" | "shouldCloseOnSelect"> & {
  inset?: boolean
  indicator?: DropdownMenuIndicator
  disabled?: boolean
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
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset ? "" : undefined}
      className={cn(selectableItemStyles, className)}
      isDisabled={isDisabled ?? disabled}
      shouldCloseOnSelect={closeOnClick}
      onAction={() => {
        const next = !isChecked
        if (checked === undefined) setUncontrolledChecked(next)
        onCheckedChange?.(next)
      }}
      {...props}
    >
      {indicator === "check" ? (
        <DropdownMenuCheckIndicator checked={isChecked} />
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

function DropdownMenuRadioGroup({
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
  indicator?: DropdownMenuIndicator
}) {
  const [uncontrolled, setUncontrolled] = usePersistentState<string | undefined>(
    radioGroupKey(typeof children === "function" ? null : children),
    defaultValue
  )
  const current = value ?? uncontrolled

  return (
    <DropdownMenuRadioContext.Provider value={{ value: current, indicator }}>
      <MenuSection
        data-slot="dropdown-menu-radio-group"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={current !== undefined ? [current] : []}
        onSelectionChange={(keys) => {
          if (keys === "all") return
          const [next] = Array.from(keys)
          if (next !== undefined && String(next) !== current) {
            if (value === undefined) setUncontrolled(String(next))
            onValueChange?.(String(next))
          }
        }}
        {...props}
      >
        {children}
      </MenuSection>
    </DropdownMenuRadioContext.Provider>
  )
}

function DropdownMenuRadioIndicator({ checked }: { checked: boolean }) {
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

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  value,
  indicator,
  disabled,
  isDisabled,
  closeOnClick = false,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "id" | "children" | "shouldCloseOnSelect"> & {
  inset?: boolean
  indicator?: DropdownMenuIndicator
  disabled?: boolean
  closeOnClick?: boolean
  value: string
  children?: React.ReactNode
}) {
  const ctx = React.useContext(DropdownMenuRadioContext)
  const selected = ctx?.value === value
  const resolvedIndicator = indicator ?? ctx?.indicator ?? "control"

  return (
    <MenuItem
      id={value}
      data-slot="dropdown-menu-radio-item"
      data-inset={inset ? "" : undefined}
      className={cn(selectableItemStyles, className)}
      isDisabled={isDisabled ?? disabled}
      shouldCloseOnSelect={closeOnClick}
      {...props}
    >
      {resolvedIndicator === "check" ? (
        <DropdownMenuCheckIndicator checked={selected} />
      ) : (
        <DropdownMenuRadioIndicator checked={selected} />
      )}
      {children}
    </MenuItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof Header> & {
  inset?: boolean
}) {
  return (
    <Header
      data-slot="dropdown-menu-label"
      data-inset={inset ? "" : undefined}
      className={cn(
        "px-2 py-1 text-caption text-muted-foreground whitespace-nowrap font-medium tracking-normal data-inset:ps-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

/*
  React Aria's Keyboard sets dir="ltr" on the kbd, which would flip ms-auto /
  ps-4 in RTL. Keep the item's direction on the kbd so the shortcut sits at
  the inline end, and read the keys left to right inside it (⇧⌘P).
*/
function DropdownMenuShortcut({
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<typeof Keyboard>) {
  return (
    <Keyboard
      data-slot="dropdown-menu-shortcut"
      dir={dir}
      className={cn(
        "ms-auto shrink-0 ps-4 font-mono text-caption tracking-normal whitespace-nowrap text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    >
      <span dir="ltr">{children}</span>
    </Keyboard>
  )
}

/*
  React Aria's SubmenuTrigger takes exactly a trigger item and a popover, so
  the sub trigger and sub content are picked from the children in order.
*/
function DropdownMenuSub({ children }: { children?: React.ReactNode }) {
  const [trigger, content] = React.Children.toArray(children).filter(React.isValidElement)
  if (!trigger || !content) return null

  return (
    <SubmenuTrigger data-slot="dropdown-menu-sub">
      {trigger}
      {content}
    </SubmenuTrigger>
  )
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  disabled,
  isDisabled,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children"> & {
  inset?: boolean
  disabled?: boolean
  children?: React.ReactNode
}) {
  return (
    <MenuItem
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      className={cn(
        "flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-none select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-inset:ps-8 data-[open]:bg-accent data-[open]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      isDisabled={isDisabled ?? disabled}
      {...props}
    >
      {children}
      <span aria-hidden className="min-w-1 flex-1" />
      <ChevronRightIcon className="size-4 rtl:rotate-180" />
    </MenuItem>
  )
}

/*
  Match the Base UI / Radix submenu: flush against the sub trigger and moved
  up 3px so the first item lines up with the trigger row.
*/
function DropdownMenuSubContent({
  className,
  children,
  offset = 0,
  crossOffset = -3,
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof Popover>) {
  const locale = useDropdownMenuLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <Popover
      data-slot="dropdown-menu-sub-content"
      offset={offset}
      crossOffset={crossOffset}
      className={cn(contentStyles, "shadow-lg", className)}
      {...localeDomProps(contentLocale)}
      {...props}
    >
      <Menu className="outline-none">{children}</Menu>
    </Popover>
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
