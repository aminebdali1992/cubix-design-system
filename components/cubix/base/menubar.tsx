"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { CheckIcon } from "lucide-react"

import { Checkbox } from "@/components/cubix/base/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/cubix/base/radio-group"
import { DirectionProvider } from "@/components/cubix/base/direction"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/cubix/base/dropdown-menu"
import { cn } from "@/lib/utils"

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

function Menubar({ className, dir, lang, ...props }: MenubarPrimitive.Props) {
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
      <DirectionProvider direction={locale.dir ?? "ltr"}>
        <MenubarPrimitive
          ref={ref}
          data-slot="menubar"
          className={cn("flex h-8 w-fit items-center gap-0.5 rounded-lg border p-[3px]", className)}
          {...localeDomProps(locale)}
          {...props}
        />
      </DirectionProvider>
    </MenubarLocaleContext.Provider>
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  const [store] = React.useState<MenubarStore>(() => new Map())

  return (
    <MenubarStoreContext.Provider value={store}>
      <DropdownMenu data-slot="menubar-menu" {...props} />
    </MenubarStoreContext.Provider>
  )
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot="menubar-group" {...props} />
}

function MenubarPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPortal>) {
  return <DropdownMenuPortal data-slot="menubar-portal" {...props} />
}

function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger
      data-slot="menubar-trigger"
      className={cn(
        "flex items-center rounded-sm px-1.5 py-[2px] text-label whitespace-nowrap font-medium tracking-normal outline-hidden select-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-expanded:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  const locale = useMenubarLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <DropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "w-max min-w-[150px] overflow-x-visible overflow-y-auto rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        className
      )}
      {...localeDomProps(contentLocale)}
      {...props}
    />
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/menubar-item relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:opacity-50 [&>svg:not([class*='size-'])]:size-4.5 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

type MenubarIndicator = "check" | "control"

const MenubarIndicatorContext = React.createContext<MenubarIndicator | undefined>(undefined)

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

function MenubarCheckboxItem({
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
  indicator?: MenubarIndicator
}) {
  const [uncontrolledChecked, setUncontrolledChecked] = usePersistentState(
    `checkbox:${textContent(children)}`,
    defaultChecked ?? false
  )
  const isChecked = checked ?? uncontrolledChecked

  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
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
        <MenubarCheckIndicator checked={isChecked} />
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute end-2 flex items-center justify-center"
        >
          <Checkbox
            className="size-3.5 rounded-[4px] [&_[data-slot=checkbox-indicator]_svg]:size-2.5"
            checked={isChecked}
            tabIndex={-1}
          />
        </span>
      )}
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

const MenubarRadioValueContext = React.createContext<unknown>(undefined)

function MenubarRadioGroup({
  value,
  defaultValue,
  onValueChange,
  indicator,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuRadioGroup> & {
  indicator?: MenubarIndicator
}) {
  const [uncontrolledValue, setUncontrolledValue] = usePersistentState<unknown>(
    radioGroupKey(children),
    defaultValue
  )
  const currentValue = value !== undefined ? value : uncontrolledValue

  return (
    <MenubarIndicatorContext.Provider value={indicator}>
      <MenubarRadioValueContext.Provider value={currentValue}>
        <DropdownMenuRadioGroup
          data-slot="menubar-radio-group"
          value={currentValue ?? null}
          onValueChange={(next, eventDetails) => {
            if (value === undefined) setUncontrolledValue(next)
            onValueChange?.(next, eventDetails)
          }}
          {...props}
        >
          {children}
        </DropdownMenuRadioGroup>
      </MenubarRadioValueContext.Provider>
    </MenubarIndicatorContext.Provider>
  )
}

function MenubarRadioIndicator({ checked }: { checked: boolean }) {
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

function MenubarRadioItem({
  className,
  children,
  inset,
  value,
  indicator,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
  indicator?: MenubarIndicator
}) {
  const groupValue = React.useContext(MenubarRadioValueContext)
  const groupIndicator = React.useContext(MenubarIndicatorContext)
  const resolvedIndicator = indicator ?? groupIndicator ?? "control"
  const isChecked = groupValue !== undefined && groupValue === value

  return (
    <MenuPrimitive.RadioItem
      data-slot="menubar-radio-item"
      value={value}
      data-inset={inset}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-1.75 ps-2 pe-10 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      {...props}
    >
      {resolvedIndicator === "check" ? (
        <MenubarCheckIndicator checked={isChecked} />
      ) : (
        <MenubarRadioIndicator checked={isChecked} />
      )}
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuLabel
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1 text-label whitespace-nowrap font-medium tracking-normal data-inset:ps-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  return (
    <DropdownMenuShortcut
      data-slot="menubar-shortcut"
      className={cn(
        "ms-auto shrink-0 ps-4 font-mono text-caption tracking-normal whitespace-nowrap text-muted-foreground group-focus/menubar-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({ ...props }: React.ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuSubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-open:bg-accent data-open:text-accent-foreground [&>svg:not([class*='size-'])]:size-4 [&>svg:not([class*='size-']):not(:last-child)]:size-4.5 [&>svg:last-child]:ms-auto rtl:[&>svg:last-child]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuSubTrigger>
  )
}

function MenubarSubContent({
  className,
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  const locale = useMenubarLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <DropdownMenuSubContent
      data-slot="menubar-sub-content"
      side="inline-end"
      className={cn(
        "w-max min-w-[150px] overflow-x-visible rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-lg ring-1 ring-foreground/[0.06] duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      {...localeDomProps(contentLocale)}
      {...props}
    />
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
