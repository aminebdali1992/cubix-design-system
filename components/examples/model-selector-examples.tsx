"use client"

import * as React from "react"
import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { Command } from "@/components/cubix/command"
import {
  ModelSelector,
  ModelSelectorButton,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorSeparator,
  ModelSelectorShortcut,
  ModelSelectorTrigger,
  type ModelSelectorProvider,
} from "@/components/cubix/model-selector"
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/cubix/prompt-input"

type ModelOption = {
  id: string
  name: string
  provider: ModelSelectorProvider
  providerLabel: string
  disabled?: boolean
  shortcut?: string
}

const models: ModelOption[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    providerLabel: "OpenAI",
    shortcut: "⌘1",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "openai",
    providerLabel: "OpenAI",
  },
  {
    id: "claude-sonnet",
    name: "Claude Sonnet",
    provider: "anthropic",
    providerLabel: "Anthropic",
    shortcut: "⌘2",
  },
  {
    id: "claude-haiku",
    name: "Claude Haiku",
    provider: "anthropic",
    providerLabel: "Anthropic",
  },
  {
    id: "gemini-2-flash",
    name: "Gemini 2.0 Flash",
    provider: "google",
    providerLabel: "Google",
  },
  {
    id: "gemini-legacy",
    name: "Gemini Legacy",
    provider: "google",
    providerLabel: "Google",
    disabled: true,
  },
  {
    id: "grok-2",
    name: "Grok 2",
    provider: "xai",
    providerLabel: "xAI",
  },
]

function groupModels(items: ModelOption[]) {
  const groups = new Map<string, ModelOption[]>()
  for (const model of items) {
    const list = groups.get(model.providerLabel) ?? []
    list.push(model)
    groups.set(model.providerLabel, list)
  }
  return [...groups.entries()]
}

function ModelPicker({
  value,
  onValueChange,
  open,
  onOpenChange,
}: {
  value: string
  onValueChange: (value: string) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const selected = models.find((model) => model.id === value) ?? models[0]!

  return (
    <ModelSelector open={open} onOpenChange={onOpenChange}>
      <ModelSelectorTrigger render={<ModelSelectorButton />}>
        <ModelSelectorLogo provider={selected.provider} />
        <ModelSelectorName>{selected.name}</ModelSelectorName>
        <ChevronsUpDownIcon className="ms-auto size-3.5 opacity-50" />
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput />
        <ModelSelectorList>
          <ModelSelectorEmpty />
          {groupModels(models).map(([label, items], index) => (
            <React.Fragment key={label}>
              {index > 0 ? <ModelSelectorSeparator /> : null}
              <ModelSelectorGroup heading={label}>
                {items.map((model) => (
                  <ModelSelectorItem
                    key={model.id}
                    value={`${model.name} ${model.providerLabel}`}
                    checked={model.id === selected.id}
                    disabled={model.disabled}
                    onSelect={() => {
                      onValueChange(model.id)
                      onOpenChange?.(false)
                    }}
                  >
                    <ModelSelectorLogo provider={model.provider} />
                    <ModelSelectorName>{model.name}</ModelSelectorName>
                    {model.shortcut ? (
                      <ModelSelectorShortcut>
                        {model.shortcut}
                      </ModelSelectorShortcut>
                    ) : null}
                  </ModelSelectorItem>
                ))}
              </ModelSelectorGroup>
            </React.Fragment>
          ))}
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  )
}

export function ModelSelectorDemo() {
  const [model, setModel] = React.useState("gpt-4o")

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3">
      <ModelPicker value={model} onValueChange={setModel} />
      <p className="text-center text-xs text-muted-foreground">
        Selected: {models.find((item) => item.id === model)?.name}
      </p>
    </div>
  )
}

export function ModelSelectorSearchDemo() {
  const [model, setModel] = React.useState("claude-sonnet")

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3">
      <ModelPicker value={model} onValueChange={setModel} />
      <p className="text-center text-xs text-muted-foreground">
        Open the menu and type to filter by model or provider.
      </p>
    </div>
  )
}

export function ModelSelectorEmptyDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <ModelSelector open={open} onOpenChange={setOpen}>
        <ModelSelectorTrigger render={<ModelSelectorButton />}>
          <ModelSelectorName>Search models</ModelSelectorName>
          <ChevronsUpDownIcon className="ms-auto size-3.5 opacity-50" />
        </ModelSelectorTrigger>
        <ModelSelectorContent title="Empty search">
          <ModelSelectorInput placeholder="Try typing zzz…" />
          <ModelSelectorList>
            <ModelSelectorEmpty>
              No models match that query.
            </ModelSelectorEmpty>
          </ModelSelectorList>
        </ModelSelectorContent>
      </ModelSelector>
    </div>
  )
}

export function ModelSelectorDisabledDemo() {
  const [model, setModel] = React.useState("gemini-2-flash")

  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <ModelPicker value={model} onValueChange={setModel} />
    </div>
  )
}

export function ModelSelectorLogosDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <ModelSelectorLogo provider="openai" className="size-4" />
        <ModelSelectorLogo provider="anthropic" className="size-4" />
        <ModelSelectorLogo provider="google" className="size-4" />
        <ModelSelectorLogo provider="xai" className="size-4" />
      </div>
      <ModelSelectorLogoGroup>
        <ModelSelectorLogo provider="openai" />
        <ModelSelectorLogo provider="anthropic" />
        <ModelSelectorLogo provider="google" />
      </ModelSelectorLogoGroup>
    </div>
  )
}

export function ModelSelectorCheckedDemo() {
  const [model, setModel] = React.useState("gpt-4o")
  const selected = models.find((item) => item.id === model)!

  return (
    <div className="mx-auto w-full max-w-sm">
      <Command className="rounded-xl border">
        <ModelSelectorList className="max-h-none">
          <ModelSelectorGroup heading={selected.providerLabel}>
            {models
              .filter((item) => item.provider === selected.provider)
              .map((item) => (
                <ModelSelectorItem
                  key={item.id}
                  value={item.name}
                  checked={item.id === model}
                  onSelect={() => setModel(item.id)}
                >
                  <ModelSelectorLogo provider={item.provider} />
                  <ModelSelectorName>{item.name}</ModelSelectorName>
                </ModelSelectorItem>
              ))}
          </ModelSelectorGroup>
        </ModelSelectorList>
      </Command>
    </div>
  )
}

export function ModelSelectorShortcutsDemo() {
  const [model, setModel] = React.useState("gpt-4o")

  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <ModelPicker value={model} onValueChange={setModel} />
    </div>
  )
}

export function ModelSelectorPromptInputDemo() {
  const [model, setModel] = React.useState("claude-sonnet")
  const selected = models.find((item) => item.id === model)!

  return (
    <PromptInput className="mx-auto max-w-xl" onSubmit={() => {}}>
      <PromptInputBody>
        <PromptInputTextarea placeholder="Ask anything…" />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <ModelSelector>
            <ModelSelectorTrigger
              render={
                <ModelSelectorButton
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                />
              }
            >
              <ModelSelectorLogo provider={selected.provider} />
              <ModelSelectorName>{selected.name}</ModelSelectorName>
              <ChevronsUpDownIcon className="size-3.5 opacity-50" />
            </ModelSelectorTrigger>
            <ModelSelectorContent>
              <ModelSelectorInput />
              <ModelSelectorList>
                <ModelSelectorEmpty />
                {groupModels(models).map(([label, items], index) => (
                  <React.Fragment key={label}>
                    {index > 0 ? <ModelSelectorSeparator /> : null}
                    <ModelSelectorGroup heading={label}>
                      {items.map((item) => (
                        <ModelSelectorItem
                          key={item.id}
                          value={`${item.name} ${item.providerLabel}`}
                          checked={item.id === model}
                          disabled={item.disabled}
                          onSelect={() => setModel(item.id)}
                        >
                          <ModelSelectorLogo provider={item.provider} />
                          <ModelSelectorName>{item.name}</ModelSelectorName>
                        </ModelSelectorItem>
                      ))}
                    </ModelSelectorGroup>
                  </React.Fragment>
                ))}
              </ModelSelectorList>
            </ModelSelectorContent>
          </ModelSelector>
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  )
}

export function ModelSelectorControlledDemo() {
  const [model, setModel] = React.useState("grok-2")
  const [open, setOpen] = React.useState(false)

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <Button size="xs" variant="outline" onClick={() => setOpen(true)}>
          Choose model
        </Button>
        <span className="text-xs text-muted-foreground">
          {models.find((item) => item.id === model)?.name}
        </span>
      </div>
      <ModelPicker
        value={model}
        onValueChange={setModel}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}
