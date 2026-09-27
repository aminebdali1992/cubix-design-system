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

import { cn } from "@/lib/utils"

const itemStyles =
  "group/menubar-item relative flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1.25 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive!"

const contentStyles =
  "z-50 w-max min-w-32 overflow-x-visible overflow-y-auto rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none"

type TextDirection = "ltr" | "rtl"

type MenubarLocale = {
  dir?: TextDirection
  lang?: string
}

const MenubarLocaleContext = React.createContext<MenubarLocale>({})

function useMenubarLocale() {
  return React.useContext(MenubarLocaleContext)
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

type MenubarRadioContextValue = {
  value?: string
  onValueChange?: (value: string) => void
}

const MenubarRadioContext =
  React.createContext<MenubarRadioContextValue | null>(null)

function Menubar({
  className,
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof Toolbar>) {
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
          className={cn(
            "flex h-8 w-fit items-center gap-0.5 rounded-lg border p-[3px]",
            className
          )}
          {...localeDomProps(locale)}
          {...props}
        />
      </I18nProvider>
    </MenubarLocaleContext.Provider>
  )
}

function MenubarMenu({ children }: { children: React.ReactNode }) {
  return <MenuTrigger data-slot="menubar-menu">{children}</MenuTrigger>
}

function MenubarGroup({
  className,
  ...props
}: React.ComponentProps<typeof MenuSection>) {
  return (
    <MenuSection
      data-slot="menubar-group"
      className={cn(className)}
      {...props}
    />
  )
}

function MenubarPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
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

function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  onCheckedChange,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "children"> & {
  inset?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  children?: React.ReactNode
}) {
  return (
    <MenuItem
      data-slot="menubar-checkbox-item"
      data-inset={inset ? "" : undefined}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1.25 pe-1.5 ps-7 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-inset:ps-7 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      onAction={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span className="pointer-events-none absolute start-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
        {checked ? <CheckIcon absoluteStrokeWidth strokeWidth={1.6} /> : null}
      </span>
      {children}
    </MenuItem>
  )
}

function MenubarRadioGroup({
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<typeof MenuSection> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const current = value ?? uncontrolled

  return (
    <MenubarRadioContext.Provider
      value={{
        value: current,
        onValueChange: (next) => {
          if (value === undefined) setUncontrolled(next)
          onValueChange?.(next)
        },
      }}
    >
      <MenuSection data-slot="menubar-radio-group" {...props}>
        {children}
      </MenuSection>
    </MenubarRadioContext.Provider>
  )
}

function MenubarRadioItem({
  className,
  children,
  inset,
  value,
  ...props
}: Omit<React.ComponentProps<typeof MenuItem>, "id" | "children"> & {
  inset?: boolean
  value: string
  children?: React.ReactNode
}) {
  const ctx = React.useContext(MenubarRadioContext)
  const selected = ctx?.value === value

  return (
    <MenuItem
      id={value}
      data-slot="menubar-radio-item"
      data-inset={inset ? "" : undefined}
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1.25 pe-1.5 ps-7 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-inset:ps-7 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      onAction={() => ctx?.onValueChange?.(value)}
      {...props}
    >
      <span className="pointer-events-none absolute start-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
        {selected ? <CheckIcon absoluteStrokeWidth strokeWidth={1.6} /> : null}
      </span>
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
        "px-1.5 py-1 text-label whitespace-nowrap font-medium tracking-normal data-inset:ps-7",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<typeof Keyboard>) {
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
      {React.Children.toArray(children) as [
        React.ReactElement,
        React.ReactElement,
        ...React.ReactElement[],
      ]}
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
        "flex w-full cursor-default items-center gap-1.5 rounded-md px-1.5 py-1.25 text-label whitespace-nowrap tracking-normal outline-none select-none focus:bg-accent focus:text-accent-foreground data-[focused]:bg-accent data-[focused]:text-accent-foreground data-inset:ps-7 data-[open]:bg-accent data-[open]:text-accent-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto size-4 rtl:rotate-180" />
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
        "z-50 w-max min-w-32 overflow-x-visible rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none",
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
