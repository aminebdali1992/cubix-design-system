"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { Menubar as MenubarPrimitive } from "radix-ui"

import { Checkbox } from "@/components/cubix/radix/checkbox"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/cubix/radix/radio-group"
import { DirectionProvider } from "@/components/cubix/radix/direction"
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

function localeDomProps(locale: MenubarLocale) {
  return {
    ...(locale.dir ? { dir: locale.dir } : {}),
    ...(locale.lang ? { lang: locale.lang } : {}),
  }
}

function Menubar({
  className,
  dir,
  lang,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
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
      <DirectionProvider dir={locale.dir ?? "ltr"}>
        <MenubarPrimitive.Root asChild {...props}>
          <div
            ref={ref}
            data-slot="menubar"
            className={cn(
              "flex h-8 w-fit items-center gap-0.5 rounded-lg border p-[3px]",
              className
            )}
            {...localeDomProps(locale)}
          >
            {children}
          </div>
        </MenubarPrimitive.Root>
      </DirectionProvider>
    </MenubarLocaleContext.Provider>
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

type MenubarIndicator = "check" | "control"

const MenubarIndicatorContext = React.createContext<
  MenubarIndicator | undefined
>(undefined)

function MenubarCheckIndicator({ checked }: { checked: boolean }) {
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

const MenubarRadioValueContext = React.createContext<string | undefined>(
  undefined
)

function MenubarRadioGroup({
  value,
  defaultValue,
  onValueChange,
  indicator,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup> & {
  defaultValue?: string
  indicator?: MenubarIndicator
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const currentValue = value ?? uncontrolledValue

  return (
    <MenubarIndicatorContext.Provider value={indicator}>
      <MenubarRadioValueContext.Provider value={currentValue}>
        <MenubarPrimitive.RadioGroup
          data-slot="menubar-radio-group"
          value={currentValue ?? ""}
          onValueChange={(next) => {
            if (value === undefined) setUncontrolledValue(next)
            onValueChange?.(next)
          }}
          {...props}
        />
      </MenubarRadioValueContext.Provider>
    </MenubarIndicatorContext.Provider>
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "flex items-center rounded-sm px-1.5 py-[2px] text-label whitespace-nowrap font-medium tracking-normal outline-hidden select-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-expanded:bg-muted data-[state=open]:bg-muted",
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
}: React.ComponentProps<typeof MenubarPrimitive.Content> & {
  dir?: TextDirection
  lang?: string
}) {
  const locale = useMenubarLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-max min-w-[150px] origin-(--radix-menubar-content-transform-origin) overflow-x-visible overflow-y-auto rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-md ring-1 ring-foreground/[0.06] duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
          className
        )}
        {...localeDomProps(contentLocale)}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/menubar-item relative flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:ps-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
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
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem> & {
  inset?: boolean
  defaultChecked?: boolean
  indicator?: MenubarIndicator
}) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
    defaultChecked ?? false
  )
  const isChecked = checked ?? uncontrolledChecked

  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
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
      {...props}
    >
      {indicator === "check" ? (
        <MenubarCheckIndicator checked={isChecked === true} />
      ) : (
        <span aria-hidden className="pointer-events-none absolute end-2 flex items-center justify-center">
          <Checkbox className="size-3.5 rounded-[4px] [&_[data-slot=checkbox-indicator]_svg]:size-2.5" checked={isChecked === true} tabIndex={-1} />
        </span>
      )}
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioIndicator({ checked }: { checked: boolean }) {
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

function MenubarRadioItem({
  className,
  children,
  inset,
  value,
  indicator,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem> & {
  inset?: boolean
  indicator?: MenubarIndicator
}) {
  const groupValue = React.useContext(MenubarRadioValueContext)
  const groupIndicator = React.useContext(MenubarIndicatorContext)
  const resolvedIndicator = indicator ?? groupIndicator ?? "control"
  const isChecked = groupValue !== undefined && groupValue === value

  return (
    <MenubarPrimitive.RadioItem
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
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
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
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "ms-auto shrink-0 ps-4 font-mono text-caption tracking-normal whitespace-nowrap text-muted-foreground group-focus/menubar-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex w-full cursor-default items-center gap-1.5 rounded-sm px-2 py-1.75 text-label whitespace-nowrap tracking-normal outline-none select-none focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-open:bg-accent data-open:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&>svg:not([class*='size-'])]:size-4.5",
        className
      )}
      {...props}
    >
      {children}
      <span aria-hidden className="min-w-1 flex-1" />
      <ChevronRightIcon className="size-4 rtl:rotate-180" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  dir,
  lang,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent> & {
  dir?: TextDirection
  lang?: string
}) {
  const locale = useMenubarLocale()
  const contentLocale = {
    dir: toTextDirection(dir) ?? locale.dir,
    lang: lang ?? locale.lang,
  }

  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "z-50 w-max min-w-[150px] origin-(--radix-menubar-content-transform-origin) overflow-x-visible rounded-lg bg-popover p-1 text-start text-popover-foreground shadow-lg ring-1 ring-foreground/[0.06] duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
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
