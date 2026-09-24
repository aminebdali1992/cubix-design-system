"use client"

import * as React from "react"
import {
  CodeIcon,
  FileTextIcon,
  LightbulbIcon,
  RocketIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react"

import { Skeleton } from "@/components/cubix/skeleton"
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputController,
} from "@/components/cubix/prompt-input"
import {
  PromptSuggestion,
  PromptSuggestions,
  PromptSuggestionsEmpty,
} from "@/components/cubix/prompt-suggestion"

const starterPrompts = [
  "Summarize the deploy checklist",
  "Draft a rollback plan",
  "Explain the p95 spike",
  "Write a release note",
]

const iconPrompts = [
  {
    suggestion: "Summarize this doc",
    icon: FileTextIcon,
  },
  {
    suggestion: "Improve this prompt",
    icon: WandSparklesIcon,
  },
  {
    suggestion: "Brainstorm next steps",
    icon: LightbulbIcon,
  },
  {
    suggestion: "Ship a safer cutover",
    icon: RocketIcon,
  },
]

const manyPrompts = [
  "Summarize the deploy checklist",
  "Draft a rollback plan",
  "Explain the p95 spike",
  "Write a release note",
  "List smoke-test steps",
  "Compare canary vs blue-green",
  "Suggest monitor alerts",
  "Outline a postmortem",
  "Tighten the runbook",
  "Flag risky migrations",
]

export function PromptSuggestionDemo() {
  const [active, setActive] = React.useState<string | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
      <PromptSuggestions>
        {starterPrompts.map((prompt) => (
          <PromptSuggestion
            key={prompt}
            suggestion={prompt}
            active={active === prompt}
            onClick={setActive}
          />
        ))}
      </PromptSuggestions>
      {active ? (
        <p className="text-center text-xs text-muted-foreground">
          Selected: {active}
        </p>
      ) : null}
    </div>
  )
}

export function PromptSuggestionIconsDemo() {
  const [active, setActive] = React.useState(iconPrompts[0]?.suggestion ?? "")

  return (
    <div className="mx-auto w-full max-w-xl">
      <PromptSuggestions>
        {iconPrompts.map(({ suggestion, icon: Icon }) => (
          <PromptSuggestion
            key={suggestion}
            suggestion={suggestion}
            active={active === suggestion}
            onClick={setActive}
          >
            <Icon data-icon="inline-start" />
            {suggestion}
          </PromptSuggestion>
        ))}
      </PromptSuggestions>
    </div>
  )
}

export function PromptSuggestionActiveDemo() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <PromptSuggestions>
        <PromptSuggestion suggestion="Selected plan" active />
        <PromptSuggestion suggestion="Another option" />
        <PromptSuggestion suggestion="Third option" />
      </PromptSuggestions>
    </div>
  )
}

export function PromptSuggestionDisabledDemo() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <PromptSuggestions>
        <PromptSuggestion suggestion="Available" />
        <PromptSuggestion suggestion="Unavailable" disabled />
        <PromptSuggestion suggestion="Also available" />
      </PromptSuggestions>
    </div>
  )
}

export function PromptSuggestionEmptyDemo() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <PromptSuggestionsEmpty>
        No starter prompts for this workspace yet.
      </PromptSuggestionsEmpty>
    </div>
  )
}

export function PromptSuggestionScrollDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <PromptSuggestions>
        {manyPrompts.map((prompt) => (
          <PromptSuggestion key={prompt} suggestion={prompt} />
        ))}
      </PromptSuggestions>
    </div>
  )
}

export function PromptSuggestionWrapDemo() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <PromptSuggestions orientation="wrap">
        {manyPrompts.slice(0, 6).map((prompt) => (
          <PromptSuggestion key={prompt} suggestion={prompt} />
        ))}
      </PromptSuggestions>
    </div>
  )
}

export function PromptSuggestionLoadingDemo() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <PromptSuggestions aria-busy="true" aria-label="Loading suggestions">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-8 w-28 shrink-0 rounded-full"
          />
        ))}
      </PromptSuggestions>
    </div>
  )
}

export function PromptSuggestionVariantsDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
      <PromptSuggestions>
        <PromptSuggestion suggestion="Outline" variant="outline" />
        <PromptSuggestion suggestion="Secondary" variant="secondary" />
        <PromptSuggestion suggestion="Ghost" variant="ghost" />
        <PromptSuggestion suggestion="Default" variant="default" />
      </PromptSuggestions>
    </div>
  )
}

function ComposerWithSuggestions() {
  const controller = usePromptInputController()
  const [active, setActive] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col gap-3">
      <PromptSuggestions>
        {starterPrompts.map((prompt) => (
          <PromptSuggestion
            key={prompt}
            suggestion={prompt}
            active={active === prompt}
            onClick={(value) => {
              setActive(value)
              controller.textInput.setInput(value)
            }}
          >
            <SparklesIcon data-icon="inline-start" />
            {prompt}
          </PromptSuggestion>
        ))}
      </PromptSuggestions>
      <PromptInput
        onSubmit={() => {
          setActive(null)
        }}
      >
        <PromptInputBody>
          <PromptInputTextarea placeholder="Pick a suggestion or type your own…" />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit
            disabled={!controller.textInput.value.trim()}
          />
        </PromptInputFooter>
      </PromptInput>
    </div>
  )
}

export function PromptSuggestionInputDemo() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <PromptInputProvider>
        <ComposerWithSuggestions />
      </PromptInputProvider>
    </div>
  )
}

export function PromptSuggestionConversationDemo() {
  const [active, setActive] = React.useState<string | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 py-2">
      <div className="space-y-2 text-center">
        <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted">
          <CodeIcon className="size-4 text-muted-foreground" />
        </div>
        <h3 className="font-medium tracking-tight">How can I help?</h3>
        <p className="text-sm text-muted-foreground">
          Choose a starter prompt to seed the composer.
        </p>
      </div>
      <PromptSuggestions orientation="wrap" className="justify-center">
        {iconPrompts.map(({ suggestion, icon: Icon }) => (
          <PromptSuggestion
            key={suggestion}
            suggestion={suggestion}
            active={active === suggestion}
            onClick={setActive}
          >
            <Icon data-icon="inline-start" />
            {suggestion}
          </PromptSuggestion>
        ))}
      </PromptSuggestions>
      {active ? (
        <p className="text-center text-xs text-muted-foreground">
          Ready to send: {active}
        </p>
      ) : null}
    </div>
  )
}
