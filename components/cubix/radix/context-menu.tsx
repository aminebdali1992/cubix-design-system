"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { ContextMenu as ContextMenuPrimitive } from "radix-ui"

import { Checkbox } from "@/components/cubix/radix/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/cubix/radix/radio-group"
import { DirectionProvider } from "@/components/cubix/radix/direction"
import { cn } from "@/lib/utils"

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

function toTextDirection(value: string | null | undefined): TextDirection | undefined {
  return value === "rtl" || value === "ltr" ? value : undefined
}

function resolveClosestDir(node: Element | null): TextDirection | undefined {
  return toTextDirection(node?.closest("[dir]")?.getAttribute("dir"))
}

function resolveClosestLang(node: Element | null): string | undefined {
  return node?.closest("[lang]")?.getAttribute("lang") ?? undefined
}

type ContextMenuStore = Map<string, unknown>

const ContextMenuStoreContext = React.createContext<ContextMenuStore | null>(null)

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

/*
  Checkbox and radio items keep the menu open by default so several options
  can be changed in one go, matching the Base UI and React Aria menus. Pass
  closeOnClick to close the menu after a change.
*/
function keepOpenOnSelect(closeOnClick: boolean, onSelect?: (event: Event) => void) {
  return (event: Event) => {
    onSelect?.(event)
    if (!closeOnClick) event.preventDefault()
  }
}

function localeDomProps(locale: ContextMenuLocale) {
  return {
    ...(locale.dir ? { dir: locale.dir } : {}),
    ...(locale.lang ? { lang: locale.lang } : {}),
  }
}

/*
  The context menu root renders no element, so the trigger reports the
  closest dir / lang from the page and the root shares it with the portaled
  content. Explicit dir / lang props on the root always win.
*/
function ContextMenu({
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root> & {
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
          <DirectionProvider dir={locale.dir ?? "ltr"}>
            <ContextMenuPrimitive.Root data-slot="context-menu" dir={locale.dir} {...props} />
          </DirectionProvider>
        </ContextMenuLocaleContext.Provider>
      </ContextMenuLocaleResolverContext.Provider>
    </ContextMenuStoreContext.Provider>
  )
}

function ContextMenuTrigger({
  className,
  tabIndex = 0,
  ref,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  const locale = useContextMenuLocale()
  const reportLocale = React.useContext(ContextMenuLocaleResolverContext)
  const triggerRef = React.useRef<HTMLSpanElement | null>(null)
  const setTriggerRef = React.useCallback(
    (node: HTMLSpanElement | null) => {
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
    <ContextMenuPrimitive.Trigger
      ref={setTriggerRef}
      data-slot="context-menu-trigger"
      tabIndex={tabIndex}
      className={cn(
        "outline-hidden select-none focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        className
      )}
      {...localeDomProps(locale)}
      {...props}
    />
  )
}

function ContextMenuGroup({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
}

function ContextMenuPortal({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
}

type ContextMenuIndicator = "check" | "control"

const ContextMenuIndicatorContext = React.createContext<ContextMenuIndicator | undefined>(undefined)

function ContextMenuCheckIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute end-2 flex size-4 items-center justify-center"
    >
      {checked ? <CheckIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" /> : null}
    </span>
  )
}

const ContextMenuRadioValueContext = React.createContext<string | undefined>(undefined)

function ContextMenuRadioGroup({
  value,
  defaultValue,
  onValueChange,
  indicator,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup> & {
  defaultValue?: string
  indicator?: ContextMenuIndicator
}) {
  const [uncontrolledValue, setUncontrolledValue] = usePersistentState<string | undefined>(
    radioGroupKey(children),
    defaultValue
  )
  const currentValue = value ?? uncontrolledValue

  return (
    <ContextMenuIndicatorContext.Provider value={indicator}>
      <ContextMenuRadioValueContext.Provider value={currentValue}>
        <ContextMenuPrimitive.RadioGroup
          data-slot="context-menu-radio-group"
          value={currentValue ?? ""}
          onValueChange={(next) => {
            if (value === undefined) setUncontrolledValue(next)
            onValueChange?.(next)
          }}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.RadioGroup>
      </ContextMenuRadioValueContext.Provider>
    </ContextMenuIndicatorContext.Provider>
  )
}

function ContextMenuContent({
  className,
  side: _side,
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  dir?: TextDirection
  lang?: string
}) {
  // Radix always opens the root context menu at the pointer (side="right",
  // align="start"); side is accepted for API parity but has no effect.
  void _side
  const locale = useContextMenuLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <ContextMenuPortal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "z-50 w-max min-w-[150px] origin-(--radix-context-menu-content-transform-origin) overflow-x-visible overflow-y-auto rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:overflow-hidden data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...localeDomProps(contentLocale)}
        {...props}
      />
    </ContextMenuPortal>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/context-menu-item relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  onSelect,
  inset,
  indicator = "control",
  closeOnClick = false,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem> & {
  inset?: boolean
  defaultChecked?: boolean
  indicator?: ContextMenuIndicator
  closeOnClick?: boolean
}) {
  const [uncontrolledChecked, setUncontrolledChecked] = usePersistentState(
    `checkbox:${textContent(children)}`,
    defaultChecked ?? false
  )
  const isChecked = checked ?? uncontrolledChecked

  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      checked={isChecked}
      onCheckedChange={(value) => {
        if (checked === undefined) setUncontrolledChecked(value)
        onCheckedChange?.(value)
      }}
      onSelect={keepOpenOnSelect(closeOnClick, onSelect)}
      {...props}
    >
      {indicator === "check" ? (
        <ContextMenuCheckIndicator checked={isChecked === true} />
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute end-2 flex items-center justify-center"
        >
          <Checkbox
            className="size-3.5 rounded-[4px] [&_[data-slot=checkbox-indicator]_svg]:size-2.5"
            checked={isChecked === true}
            tabIndex={-1}
          />
        </span>
      )}
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioIndicator({ checked }: { checked: boolean }) {
  return (
    <span inert className="pointer-events-none absolute end-2 flex items-center justify-center">
      <RadioGroup value={checked ? "on" : ""} className="flex">
        <RadioGroupItem
          value="on"
          className="size-3.5 [&_[data-slot=radio-group-indicator]]:size-1.5"
        />
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
  onSelect,
  closeOnClick = false,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem> & {
  inset?: boolean
  indicator?: ContextMenuIndicator
  closeOnClick?: boolean
}) {
  const groupValue = React.useContext(ContextMenuRadioValueContext)
  const groupIndicator = React.useContext(ContextMenuIndicatorContext)
  const resolvedIndicator = indicator ?? groupIndicator ?? "control"
  const isChecked = groupValue !== undefined && groupValue === value

  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      value={value}
      data-inset={inset}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      onSelect={keepOpenOnSelect(closeOnClick, onSelect)}
      {...props}
    >
      {resolvedIndicator === "check" ? (
        <ContextMenuCheckIndicator checked={isChecked} />
      ) : (
        <ContextMenuRadioIndicator checked={isChecked} />
      )}
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
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
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ms-auto shrink-0 ps-4 font-mono text-caption tracking-normal whitespace-nowrap text-muted-foreground group-focus/context-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSub({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-none select-none focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      {...props}
    >
      {children}
      <span aria-hidden className="min-w-1 flex-1" />
      <ChevronRightIcon className="size-4 rtl:rotate-180" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({
  className,
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent> & {
  dir?: TextDirection
  lang?: string
}) {
  const locale = useContextMenuLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <ContextMenuPortal>
      <ContextMenuPrimitive.SubContent
        data-slot="context-menu-sub-content"
        className={cn(
          "z-50 w-max min-w-[150px] origin-(--radix-context-menu-content-transform-origin) overflow-x-visible rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-lg ring-1 ring-foreground/[0.06] duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...localeDomProps(contentLocale)}
        {...props}
      />
    </ContextMenuPortal>
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
