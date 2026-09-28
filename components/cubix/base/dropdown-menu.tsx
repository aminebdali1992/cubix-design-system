"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

import { Checkbox } from "@/components/cubix/base/checkbox"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/cubix/base/radio-group"
import {
  DirectionProvider,
  useDirection,
} from "@/components/cubix/base/direction"
import { cn } from "@/lib/utils"

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

type DropdownMenuStore = Map<string, unknown>

const DropdownMenuStoreContext = React.createContext<DropdownMenuStore | null>(
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

/*
  Base UI's GroupLabel must sit inside Menu.Group or Menu.RadioGroup. Labels
  used directly in the content render a plain element instead of throwing.
*/
const DropdownMenuGroupPresenceContext = React.createContext(false)

/*
  The root renders no element, so the trigger reports the closest dir / lang
  from the page and the root shares it with the portaled content. Explicit
  dir / lang props on the root always win. Until the trigger reports, the
  direction of an enclosing provider (for example a Menubar) is kept.
*/
function DropdownMenu({
  dir,
  lang,
  ...props
}: MenuPrimitive.Root.Props & {
  dir?: TextDirection
  lang?: string
}) {
  const inheritedDir = useDirection()
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
          <DirectionProvider direction={locale.dir ?? inheritedDir}>
            <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
          </DirectionProvider>
        </DropdownMenuLocaleContext.Provider>
      </DropdownMenuLocaleResolverContext.Provider>
    </DropdownMenuStoreContext.Provider>
  )
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({
  ref,
  ...props
}: Omit<MenuPrimitive.Trigger.Props, "ref"> & {
  ref?: React.Ref<HTMLElement>
}) {
  const locale = useDropdownMenuLocale()
  const reportLocale = React.useContext(DropdownMenuLocaleResolverContext)
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
    <MenuPrimitive.Trigger
      ref={setTriggerRef}
      data-slot="dropdown-menu-trigger"
      {...localeDomProps(locale)}
      {...props}
    />
  )
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  dir,
  lang,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const locale = useDropdownMenuLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  // dir on the Positioner lets floating-ui resolve the start alignment to
  // the right edge of the trigger in RTL.
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        dir={contentLocale.dir}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "cn-menu-target cn-menu-translucent z-50 max-h-(--available-height) w-max min-w-[150px] origin-(--transform-origin) overflow-x-visible overflow-y-auto rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...localeDomProps(contentLocale)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return (
    <DropdownMenuGroupPresenceContext.Provider value>
      <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
    </DropdownMenuGroupPresenceContext.Provider>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  render,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  const inGroup = React.useContext(DropdownMenuGroupPresenceContext)
  const labelClassName = cn(
    "px-2 py-1 text-caption text-muted-foreground whitespace-nowrap font-medium tracking-normal data-inset:ps-8",
    typeof className === "string" ? className : undefined
  )

  if (!inGroup) {
    return (
      <div
        data-slot="dropdown-menu-label"
        data-inset={inset ? "" : undefined}
        className={labelClassName}
        {...(props as React.ComponentProps<"div">)}
      />
    )
  }

  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={
        typeof className === "function"
          ? (state) =>
              cn(
                "px-2 py-1 text-caption text-muted-foreground whitespace-nowrap font-medium tracking-normal data-inset:ps-8",
                className(state)
              )
          : labelClassName
      }
      render={render}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

type DropdownMenuIndicator = "check" | "control"

const DropdownMenuIndicatorContext = React.createContext<
  DropdownMenuIndicator | undefined
>(undefined)

function DropdownMenuCheckIndicator({ checked }: { checked: boolean }) {
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

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  inset,
  indicator = "control",
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
  indicator?: DropdownMenuIndicator
}) {
  const [uncontrolledChecked, setUncontrolledChecked] = usePersistentState(
    `checkbox:${textContent(children)}`,
    defaultChecked ?? false
  )
  const isChecked = checked ?? uncontrolledChecked

  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      checked={isChecked}
      onCheckedChange={(value, eventDetails) => {
        if (checked === undefined) setUncontrolledChecked(value)
        onCheckedChange?.(value, eventDetails)
      }}
      {...props}
    >
      {indicator === "check" ? (
        <DropdownMenuCheckIndicator checked={isChecked} />
      ) : (
        <span aria-hidden className="pointer-events-none absolute end-2 flex items-center justify-center">
          <Checkbox className="size-3.5 rounded-[4px] [&_[data-slot=checkbox-indicator]_svg]:size-2.5" checked={isChecked} tabIndex={-1} />
        </span>
      )}
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

const DropdownMenuRadioValueContext = React.createContext<unknown>(undefined)

function DropdownMenuRadioGroup({
  value,
  defaultValue,
  onValueChange,
  indicator,
  children,
  ...props
}: MenuPrimitive.RadioGroup.Props & {
  indicator?: DropdownMenuIndicator
}) {
  const [uncontrolledValue, setUncontrolledValue] =
    usePersistentState<unknown>(radioGroupKey(children), defaultValue)
  const currentValue = value !== undefined ? value : uncontrolledValue

  return (
    <DropdownMenuIndicatorContext.Provider value={indicator}>
      <DropdownMenuRadioValueContext.Provider value={currentValue}>
        <DropdownMenuGroupPresenceContext.Provider value>
          <MenuPrimitive.RadioGroup
            data-slot="dropdown-menu-radio-group"
            value={currentValue ?? null}
            onValueChange={(next, eventDetails) => {
              if (value === undefined) setUncontrolledValue(next)
              onValueChange?.(next, eventDetails)
            }}
            {...props}
          >
            {children}
          </MenuPrimitive.RadioGroup>
        </DropdownMenuGroupPresenceContext.Provider>
      </DropdownMenuRadioValueContext.Provider>
    </DropdownMenuIndicatorContext.Provider>
  )
}

function DropdownMenuRadioIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      inert
      className="pointer-events-none absolute end-2 flex items-center justify-center"
    >
      <RadioGroup value={checked ? "on" : ""} className="flex">
        <RadioGroupItem value="on" className="size-3.5 [&_[data-slot=radio-group-indicator]]:size-1.5" />
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
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
  indicator?: DropdownMenuIndicator
}) {
  const groupValue = React.useContext(DropdownMenuRadioValueContext)
  const groupIndicator = React.useContext(DropdownMenuIndicatorContext)
  const resolvedIndicator = indicator ?? groupIndicator ?? "control"
  const isChecked = groupValue !== undefined && groupValue === value

  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      value={value}
      data-inset={inset}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      {...props}
    >
      {resolvedIndicator === "check" ? (
        <DropdownMenuCheckIndicator checked={isChecked} />
      ) : (
        <DropdownMenuRadioIndicator checked={isChecked} />
      )}
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

/*
  The shortcut keeps the item's direction so ms-auto / ps-4 place it at the
  inline end, while the keys themselves read left to right (⇧⌘P, not P⌘⇧).
*/
function DropdownMenuShortcut({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ms-auto shrink-0 ps-4 font-mono text-caption tracking-normal whitespace-nowrap text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    >
      <span dir="ltr">{children}</span>
    </span>
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-open:bg-accent data-open:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      {...props}
    >
      {children}
      <span aria-hidden className="min-w-1 flex-1" />
      <ChevronRightIcon className="size-4 rtl:rotate-180" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "inline-end",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("shadow-lg", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
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
