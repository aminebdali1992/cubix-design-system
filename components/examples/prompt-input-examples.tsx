"use client"

import * as React from "react"
import {
  GlobeIcon,
  MicIcon,
  PaperclipIcon,
  SparklesIcon,
} from "lucide-react"

import { Button } from "@/components/cubix/button"
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputProvider,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
  usePromptInputController,
  type PromptInputError,
  type PromptInputMessage,
  type PromptInputStatus,
} from "@/components/cubix/prompt-input"

function formatMessage(message: PromptInputMessage) {
  const files =
    message.files.length > 0
      ? ` · ${message.files.length} file${message.files.length === 1 ? "" : "s"}`
      : ""
  const text = message.text.trim() || "(empty)"
  return `${text}${files}`
}

function PromptInputShell({
  status,
  onStop,
  disabled,
  submitDisabled,
  children,
  tools,
  ...props
}: React.ComponentProps<typeof PromptInput> & {
  status?: PromptInputStatus
  onStop?: () => void
  disabled?: boolean
  submitDisabled?: boolean
  tools?: React.ReactNode
}) {
  return (
    <PromptInput className="mx-auto max-w-xl" {...props}>
      <PromptInputHeader>
        <PromptInputAttachments>
          {(file) => <PromptInputAttachment key={file.id} data={file} />}
        </PromptInputAttachments>
      </PromptInputHeader>
      <PromptInputBody>
        <PromptInputTextarea disabled={disabled} />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          {tools ?? (
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger aria-label="Add" />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
                <PromptInputActionAddScreenshot />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>
          )}
        </PromptInputTools>
        {children}
        <PromptInputSubmit
          status={status}
          onStop={onStop}
          disabled={disabled || submitDisabled}
        />
      </PromptInputFooter>
    </PromptInput>
  )
}

export function PromptInputDemo() {
  const [last, setLast] = React.useState<string | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
      <PromptInputShell
        multiple
        onSubmit={(message) => {
          setLast(formatMessage(message))
        }}
      />
      {last ? (
        <p className="text-center text-xs text-muted-foreground">
          Submitted: {last}
        </p>
      ) : null}
    </div>
  )
}

export function PromptInputEmptyDemo() {
  return (
    <PromptInputShell
      onSubmit={() => {}}
      submitDisabled
      tools={
        <PromptInputButton tooltip="Attach" disabled>
          <PaperclipIcon className="size-4" />
        </PromptInputButton>
      }
    />
  )
}

function PromptInputTypingInner() {
  const controller = usePromptInputController()
  const attachments = usePromptInputAttachments()
  const canSubmit =
    controller.textInput.value.trim().length > 0 ||
    attachments.files.length > 0

  return (
    <PromptInputShell
      multiple
      submitDisabled={!canSubmit}
      onSubmit={() => {}}
    />
  )
}

export function PromptInputTypingDemo() {
  return (
    <PromptInputProvider initialInput="Summarize the deploy checklist for tonight.">
      <PromptInputTypingInner />
    </PromptInputProvider>
  )
}

export function PromptInputAttachmentsDemo() {
  const [last, setLast] = React.useState<string | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
      <PromptInputShell
        accept="image/*,.pdf,.txt"
        multiple
        maxFiles={4}
        onSubmit={(message) => {
          setLast(formatMessage(message))
        }}
        tools={
          <>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger aria-label="Add" />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
                <PromptInputActionAddScreenshot />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>
            <PromptInputButton tooltip="Voice (demo)">
              <MicIcon className="size-4" />
            </PromptInputButton>
          </>
        }
      />
      <p className="text-center text-xs text-muted-foreground">
        Drop, paste, or attach files. Backspace on an empty field removes the
        last attachment.
      </p>
      {last ? (
        <p className="text-center text-xs text-muted-foreground">
          Submitted: {last}
        </p>
      ) : null}
    </div>
  )
}

export function PromptInputStatusDemo() {
  const [status, setStatus] = React.useState<PromptInputStatus>("ready")
  const [log, setLog] = React.useState("Idle")
  const timerRef = React.useRef<number | null>(null)

  React.useEffect(
    () => () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    },
    []
  )

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const runCycle = async (message: PromptInputMessage) => {
    clearTimer()
    setLog(`Queued: ${formatMessage(message)}`)
    setStatus("submitted")

    await new Promise<void>((resolve) => {
      timerRef.current = window.setTimeout(() => {
        setStatus("streaming")
        setLog("Streaming reply…")
        resolve()
      }, 700)
    })

    await new Promise<void>((resolve) => {
      timerRef.current = window.setTimeout(() => {
        setStatus("ready")
        setLog("Reply finished")
        resolve()
      }, 1800)
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
      <PromptInputShell
        status={status}
        onStop={() => {
          clearTimer()
          setStatus("ready")
          setLog("Stopped by user")
        }}
        onSubmit={runCycle}
      />
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(
          [
            ["ready", "Ready"],
            ["submitted", "Submitted"],
            ["streaming", "Streaming"],
            ["error", "Error"],
          ] as const
        ).map(([value, label]) => (
          <Button
            key={value}
            size="xs"
            variant={status === value ? "default" : "outline"}
            onClick={() => {
              clearTimer()
              setStatus(value)
              setLog(`Forced status: ${label}`)
            }}
          >
            {label}
          </Button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">{log}</p>
    </div>
  )
}

export function PromptInputSubmittedDemo() {
  return (
    <PromptInputShell status="submitted" onSubmit={() => {}} submitDisabled />
  )
}

export function PromptInputStreamingDemo() {
  return (
    <PromptInputShell
      status="streaming"
      onStop={() => {}}
      onSubmit={() => {}}
    />
  )
}

export function PromptInputErrorStatusDemo() {
  return <PromptInputShell status="error" onSubmit={() => {}} />
}

export function PromptInputToolsDemo() {
  const [model, setModel] = React.useState("flash")
  const [web, setWeb] = React.useState(false)

  return (
    <PromptInput
      className="mx-auto max-w-xl"
      multiple
      onSubmit={() => {}}
    >
      <PromptInputHeader>
        <PromptInputAttachments>
          {(file) => <PromptInputAttachment key={file.id} data={file} />}
        </PromptInputAttachments>
      </PromptInputHeader>
      <PromptInputBody>
        <PromptInputTextarea placeholder="Ask with tools enabled…" />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger aria-label="Add" />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
              <PromptInputActionAddScreenshot />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
          <PromptInputButton
            tooltip={web ? "Web search on" : "Web search off"}
            variant={web ? "default" : "ghost"}
            onClick={() => setWeb((value) => !value)}
          >
            <GlobeIcon className="size-4" />
            Search
          </PromptInputButton>
          <PromptInputButton tooltip="Improve prompt">
            <SparklesIcon className="size-4" />
          </PromptInputButton>
          <PromptInputSelect
            value={model}
            onValueChange={(value) => {
              if (typeof value === "string") {
                setModel(value)
              }
            }}
          >
            <PromptInputSelectTrigger>
              <PromptInputSelectValue />
            </PromptInputSelectTrigger>
            <PromptInputSelectContent>
              <PromptInputSelectItem value="flash">Flash</PromptInputSelectItem>
              <PromptInputSelectItem value="pro">Pro</PromptInputSelectItem>
              <PromptInputSelectItem value="reasoning">
                Reasoning
              </PromptInputSelectItem>
            </PromptInputSelectContent>
          </PromptInputSelect>
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  )
}

export function PromptInputDisabledDemo() {
  return (
    <PromptInputShell
      disabled
      submitDisabled
      onSubmit={() => {}}
      tools={
        <PromptInputButton tooltip="Attach" disabled>
          <PaperclipIcon className="size-4" />
        </PromptInputButton>
      }
    />
  )
}

export function PromptInputValidationDemo() {
  const [error, setError] = React.useState<string | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
      <PromptInputShell
        accept="image/*"
        multiple
        maxFiles={2}
        maxFileSize={200_000}
        onError={(err: PromptInputError) => {
          setError(`${err.code}: ${err.message}`)
        }}
        onSubmit={() => {
          setError(null)
        }}
      />
      <p className="text-center text-xs text-muted-foreground">
        Accepts images only, max 2 files, 200KB each.
      </p>
      {error ? (
        <p className="text-center text-xs text-destructive">{error}</p>
      ) : null}
    </div>
  )
}

function ProviderFooter() {
  const controller = usePromptInputController()
  const attachments = usePromptInputAttachments()
  const canSubmit =
    controller.textInput.value.trim().length > 0 ||
    attachments.files.length > 0

  return (
    <>
      <PromptInputTools>
        <PromptInputActionMenu>
          <PromptInputActionMenuTrigger aria-label="Add" />
          <PromptInputActionMenuContent>
            <PromptInputActionAddAttachments />
          </PromptInputActionMenuContent>
        </PromptInputActionMenu>
        <PromptInputButton
          tooltip="Clear"
          onClick={() => {
            controller.textInput.clear()
            attachments.clear()
          }}
        >
          Clear
        </PromptInputButton>
      </PromptInputTools>
      <PromptInputSubmit disabled={!canSubmit} />
    </>
  )
}

export function PromptInputProviderDemo() {
  const [last, setLast] = React.useState<string | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3">
      <PromptInputProvider initialInput="Lifted state lives outside the form.">
        <PromptInput
          className="mx-auto max-w-xl"
          multiple
          onSubmit={(message) => {
            setLast(formatMessage(message))
          }}
        >
          <PromptInputHeader>
            <PromptInputAttachments>
              {(file) => <PromptInputAttachment key={file.id} data={file} />}
            </PromptInputAttachments>
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea />
          </PromptInputBody>
          <PromptInputFooter>
            <ProviderFooter />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
      {last ? (
        <p className="text-center text-xs text-muted-foreground">
          Submitted: {last}
        </p>
      ) : null}
    </div>
  )
}

export function PromptInputConversationDemo() {
  const [status, setStatus] = React.useState<PromptInputStatus>("ready")
  const [turns, setTurns] = React.useState<string[]>([
    "You: Outline a safe cutover plan.",
    "Assistant: Start with changelog, smoke tests, then migrations.",
  ])

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <div className="space-y-2 rounded-lg border bg-muted/20 p-3 text-sm">
        {turns.map((turn) => (
          <p key={turn} className="text-muted-foreground">
            {turn}
          </p>
        ))}
      </div>
      <PromptInputShell
        status={status}
        onStop={() => {
          setStatus("ready")
          setTurns((prev) => [...prev, "Assistant: (stopped)"])
        }}
        onSubmit={async (message) => {
          const label = formatMessage(message)
          setTurns((prev) => [...prev, `You: ${label}`])
          setStatus("submitted")
          await new Promise((resolve) => window.setTimeout(resolve, 500))
          setStatus("streaming")
          await new Promise((resolve) => window.setTimeout(resolve, 1200))
          setTurns((prev) => [
            ...prev,
            "Assistant: Keep rollback ready and watch p95 for the first hour.",
          ])
          setStatus("ready")
        }}
      />
    </div>
  )
}
