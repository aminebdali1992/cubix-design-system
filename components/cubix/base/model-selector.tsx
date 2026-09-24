"use client"

import * as React from "react"

import { Button } from "@/components/cubix/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/cubix/command"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog"
import { cn } from "@/lib/utils"

export type ModelSelectorProps = React.ComponentProps<typeof Dialog>

function ModelSelector(props: ModelSelectorProps) {
  return <Dialog data-slot="model-selector" {...props} />
}

export type ModelSelectorTriggerProps = React.ComponentProps<
  typeof DialogTrigger
>

function ModelSelectorTrigger(props: ModelSelectorTriggerProps) {
  return <DialogTrigger data-slot="model-selector-trigger" {...props} />
}

export type ModelSelectorContentProps = React.ComponentProps<
  typeof DialogContent
> & {
  title?: React.ReactNode
}

function ModelSelectorContent({
  className,
  children,
  title = "Select a model",
  showCloseButton = false,
  ...props
}: ModelSelectorContentProps) {
  return (
    <DialogContent
      data-slot="model-selector-content"
      aria-describedby={undefined}
      showCloseButton={showCloseButton}
      className={cn(
        "gap-0 overflow-hidden rounded-xl p-0 shadow-lg ring-1 ring-foreground/10 sm:max-w-md",
        className
      )}
      {...props}
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <Command
        data-slot="model-selector-command"
        className="rounded-xl bg-transparent p-0 **:data-[slot=command-input-wrapper]:border-b **:data-[slot=command-input-wrapper]:border-border/60 **:data-[slot=command-input-wrapper]:p-2.5 **:data-[slot=command-input-wrapper]:pb-2.5"
      >
        {children}
      </Command>
    </DialogContent>
  )
}

export type ModelSelectorDialogProps = React.ComponentProps<
  typeof CommandDialog
>

function ModelSelectorDialog(props: ModelSelectorDialogProps) {
  return <CommandDialog data-slot="model-selector-dialog" {...props} />
}

export type ModelSelectorInputProps = React.ComponentProps<typeof CommandInput>

function ModelSelectorInput({
  className,
  placeholder = "Search models…",
  ...props
}: ModelSelectorInputProps) {
  return (
    <CommandInput
      data-slot="model-selector-input"
      placeholder={placeholder}
      className={cn("placeholder:text-muted-foreground/80", className)}
      {...props}
    />
  )
}

export type ModelSelectorListProps = React.ComponentProps<typeof CommandList>

function ModelSelectorList({ className, ...props }: ModelSelectorListProps) {
  return (
    <CommandList
      data-slot="model-selector-list"
      className={cn("max-h-80 scroll-py-2 p-1.5 pt-1", className)}
      {...props}
    />
  )
}

export type ModelSelectorEmptyProps = React.ComponentProps<typeof CommandEmpty>

function ModelSelectorEmpty({
  className,
  children = "No models found.",
  ...props
}: ModelSelectorEmptyProps) {
  return (
    <CommandEmpty
      data-slot="model-selector-empty"
      className={cn("py-8 text-muted-foreground", className)}
      {...props}
    >
      {children}
    </CommandEmpty>
  )
}

export type ModelSelectorGroupProps = React.ComponentProps<typeof CommandGroup>

function ModelSelectorGroup({ className, ...props }: ModelSelectorGroupProps) {
  return (
    <CommandGroup
      data-slot="model-selector-group"
      className={cn(
        "p-0! **:[[cmdk-group-heading]]:px-2.5 **:[[cmdk-group-heading]]:pt-2.5 **:[[cmdk-group-heading]]:pb-1.5 **:[[cmdk-group-heading]]:text-label **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:tracking-wide **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:uppercase",
        className
      )}
      {...props}
    />
  )
}

export type ModelSelectorItemProps = React.ComponentProps<typeof CommandItem> & {
  checked?: boolean
}

function ModelSelectorItem({
  className,
  checked = false,
  ...props
}: ModelSelectorItemProps) {
  return (
    <CommandItem
      data-slot="model-selector-item"
      data-checked={checked ? "true" : undefined}
      className={cn(
        "h-9 gap-2.5 rounded-lg px-2.5",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        "[&_[data-slot=model-selector-logo]]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

export type ModelSelectorShortcutProps = React.ComponentProps<
  typeof CommandShortcut
>

function ModelSelectorShortcut({
  className,
  ...props
}: ModelSelectorShortcutProps) {
  return (
    <CommandShortcut
      data-slot="model-selector-shortcut"
      className={cn(
        "ml-0! font-normal tracking-normal text-muted-foreground/80 tabular-nums",
        className
      )}
      {...props}
    />
  )
}

export type ModelSelectorSeparatorProps = React.ComponentProps<
  typeof CommandSeparator
>

function ModelSelectorSeparator({
  className,
  ...props
}: ModelSelectorSeparatorProps) {
  return (
    <CommandSeparator
      data-slot="model-selector-separator"
      className={cn("mx-2 my-1.5 bg-border/70", className)}
      {...props}
    />
  )
}

export type ModelSelectorProvider =
  | "openai"
  | "anthropic"
  | "google"
  | "google-vertex"
  | "xai"
  | "mistral"
  | "groq"
  | "deepseek"
  | "meta"
  | "llama"
  | "cohere"
  | "perplexity"
  | "togetherai"
  | "fireworks-ai"
  | "huggingface"
  | "azure"
  | "amazon-bedrock"
  | "vercel"
  | "openrouter"
  | "cerebras"
  | "nvidia"
  | (string & {})

export type ModelSelectorLogoProps = Omit<
  React.ComponentProps<"img">,
  "src" | "alt"
> & {
  provider: ModelSelectorProvider
}

function ModelSelectorLogo({
  provider,
  className,
  ...props
}: ModelSelectorLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-slot="model-selector-logo"
      alt={`${provider} logo`}
      width={14}
      height={14}
      className={cn("size-3.5 shrink-0 dark:invert", className)}
      src={`https://models.dev/logos/${provider}.svg`}
      {...props}
    />
  )
}

export type ModelSelectorLogoGroupProps = React.ComponentProps<"div">

function ModelSelectorLogoGroup({
  className,
  ...props
}: ModelSelectorLogoGroupProps) {
  return (
    <div
      data-slot="model-selector-logo-group"
      className={cn(
        "flex shrink-0 items-center -space-x-1",
        "[&>[data-slot=model-selector-logo]]:rounded-full [&>[data-slot=model-selector-logo]]:bg-background [&>[data-slot=model-selector-logo]]:p-px [&>[data-slot=model-selector-logo]]:ring-1 [&>[data-slot=model-selector-logo]]:ring-border",
        "dark:[&>[data-slot=model-selector-logo]]:bg-foreground",
        className
      )}
      {...props}
    />
  )
}

export type ModelSelectorNameProps = React.ComponentProps<"span">

function ModelSelectorName({
  className,
  ...props
}: ModelSelectorNameProps) {
  return (
    <span
      data-slot="model-selector-name"
      className={cn("min-w-0 flex-1 truncate text-left", className)}
      {...props}
    />
  )
}

export type ModelSelectorButtonProps = React.ComponentProps<typeof Button>

function ModelSelectorButton({
  className,
  variant = "outline",
  size = "sm",
  ...props
}: ModelSelectorButtonProps) {
  return (
    <Button
      data-slot="model-selector-button"
      type="button"
      variant={variant}
      size={size}
      className={cn(
        "h-8 max-w-56 justify-start gap-2 px-2.5 font-normal",
        className
      )}
      {...props}
    />
  )
}

export {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorContent,
  ModelSelectorDialog,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorShortcut,
  ModelSelectorSeparator,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorButton,
}
