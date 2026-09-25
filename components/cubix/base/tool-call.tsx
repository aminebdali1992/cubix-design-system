"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  ChevronDownIcon,
  CircleAlertIcon,
  CircleDashedIcon,
  ShieldXIcon,
  WrenchIcon,
} from "lucide-react"

import { Badge } from "@/components/cubix/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/cubix/collapsible"
import { Spinner } from "@/components/cubix/spinner"
import { cn } from "@/lib/utils"

export type ToolCallStatus =
  | "input-streaming"
  | "input-available"
  | "approval-requested"
  | "approval-responded"
  | "output-available"
  | "output-error"
  | "output-denied"

const statusLabel: Record<ToolCallStatus, string> = {
  "input-streaming": "Pending",
  "input-available": "Running",
  "approval-requested": "Awaiting Approval",
  "approval-responded": "Responded",
  "output-available": "Completed",
  "output-error": "Error",
  "output-denied": "Denied",
}

const statusBadgeVariant: Record<
  ToolCallStatus,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  "input-streaming": "secondary",
  "input-available": "secondary",
  "approval-requested": "secondary",
  "approval-responded": "outline",
  "output-available": "secondary",
  "output-error": "destructive",
  "output-denied": "outline",
}

type ToolCallContextValue = {
  status: ToolCallStatus
  name: string
  isOpen: boolean
}

const ToolCallContext = React.createContext<ToolCallContextValue | null>(null)

function useToolCall() {
  const context = React.useContext(ToolCallContext)
  if (!context) {
    throw new Error("ToolCall parts must be used within ToolCall.")
  }
  return context
}

function formatToolValue(value: unknown): string {
  if (value == null) {
    return ""
  }
  if (typeof value === "string") {
    try {
      return JSON.stringify(JSON.parse(value), null, 2)
    } catch {
      return value
    }
  }
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function StatusIcon({ status }: { status: ToolCallStatus }) {
  if (status === "input-streaming") {
    return <CircleDashedIcon className="size-3.5 text-muted-foreground" />
  }
  if (status === "input-available" || status === "approval-requested") {
    return <Spinner className="size-3.5" />
  }
  if (status === "approval-responded" || status === "output-available") {
    return <CheckCircle2Icon className="size-3.5 text-foreground/70" />
  }
  if (status === "output-error") {
    return <CircleAlertIcon className="size-3.5 text-destructive" />
  }
  if (status === "output-denied") {
    return <ShieldXIcon className="size-3.5 text-muted-foreground" />
  }
  return <CircleDashedIcon className="size-3.5 text-muted-foreground" />
}

function shouldDefaultOpen(status: ToolCallStatus) {
  return (
    status === "input-streaming" ||
    status === "approval-requested" ||
    status === "output-error"
  )
}

export type ToolCallProps = Omit<
  React.ComponentProps<typeof Collapsible>,
  "onOpenChange"
> & {
  name: string
  status?: ToolCallStatus
  onOpenChange?: (open: boolean) => void
}

function ToolCall({
  className,
  name,
  status = "input-available",
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: ToolCallProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? shouldDefaultOpen(status)
  )
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const contextValue = React.useMemo(
    () => ({ isOpen, name, status }),
    [isOpen, name, status]
  )

  return (
    <ToolCallContext.Provider value={contextValue}>
      <Collapsible
        data-slot="tool-call"
        data-status={status}
        open={isOpen}
        onOpenChange={handleOpenChange}
        className={cn(
          "not-prose group/tool-call w-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs",
          className
        )}
        {...props}
      >
        {children}
      </Collapsible>
    </ToolCallContext.Provider>
  )
}

export type ToolCallHeaderProps = React.ComponentProps<
  typeof CollapsibleTrigger
> & {
  label?: React.ReactNode
}

function ToolCallHeader({
  className,
  children,
  label,
  ...props
}: ToolCallHeaderProps) {
  const { isOpen, name, status } = useToolCall()

  return (
    <CollapsibleTrigger
      data-slot="tool-call-header"
      className={cn(
        "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-description outline-none transition-colors",
        "hover:bg-muted/50 focus-visible:bg-muted/50",
        "group-data-[status=output-error]/tool-call:hover:bg-destructive/5",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <WrenchIcon className="size-3.5" />
          </span>
          <span className="min-w-0 flex-1">
            {label ? (
              <>
                <span className="block truncate font-medium text-foreground">
                  {label}
                </span>
                <span className="mt-0.5 block truncate font-mono text-xs text-muted-foreground">
                  {name}
                </span>
              </>
            ) : (
              <span className="block truncate font-mono text-sm font-medium text-foreground">
                {name}
              </span>
            )}
          </span>
          <Badge
            variant={statusBadgeVariant[status]}
            className="h-5 gap-1 px-1.5 font-normal"
          >
            <StatusIcon status={status} />
            {statusLabel[status]}
          </Badge>
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </>
      )}
    </CollapsibleTrigger>
  )
}

export type ToolCallContentProps = React.ComponentProps<
  typeof CollapsibleContent
>

function ToolCallContent({ className, ...props }: ToolCallContentProps) {
  return (
    <CollapsibleContent
      data-slot="tool-call-content"
      className={cn(
        "border-t bg-muted/20 outline-none",
        className
      )}
      {...props}
    />
  )
}

export type ToolCallSectionProps = Omit<React.ComponentProps<"div">, "title"> & {
  title?: React.ReactNode
}

function ToolCallSection({
  className,
  title,
  children,
  ...props
}: ToolCallSectionProps) {
  return (
    <div
      data-slot="tool-call-section"
      className={cn("space-y-2 px-3 py-3", className)}
      {...props}
    >
      {title ? (
        <div className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
          {title}
        </div>
      ) : null}
      {children}
    </div>
  )
}

function ToolCallCode({
  className,
  children,
  ...props
}: React.ComponentProps<"pre">) {
  return (
    <pre
      data-slot="tool-call-code"
      className={cn(
        "overflow-x-auto rounded-lg border bg-background p-3 font-mono text-xs leading-relaxed text-foreground shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  )
}

export type ToolCallInputProps = Omit<ToolCallSectionProps, "title"> & {
  title?: React.ReactNode
  /** Tool arguments. Alias of `input`. */
  parameters?: unknown
  /** AI SDK-compatible alias for `parameters`. */
  input?: unknown
}

function ToolCallInput({
  className,
  title = "Parameters",
  parameters,
  input,
  children,
  ...props
}: ToolCallInputProps) {
  const value = parameters ?? input
  const body =
    children ??
    (value !== undefined ? (
      <ToolCallCode>{formatToolValue(value)}</ToolCallCode>
    ) : null)

  if (!body) {
    return null
  }

  return (
    <ToolCallSection
      data-slot="tool-call-input"
      title={title}
      className={cn(className)}
      {...props}
    >
      {body}
    </ToolCallSection>
  )
}

export type ToolCallOutputProps = Omit<ToolCallSectionProps, "title"> & {
  title?: React.ReactNode
  /** Successful tool result. Alias of `output`. */
  result?: unknown
  /** AI SDK-compatible alias for `result`. */
  output?: unknown
  /** Error content. Alias of `errorText`. */
  error?: React.ReactNode
  /** AI SDK-compatible alias for `error`. */
  errorText?: React.ReactNode
}

function ToolCallOutput({
  className,
  title,
  result,
  output,
  error,
  errorText,
  children,
  ...props
}: ToolCallOutputProps) {
  const { status } = useToolCall()
  const resolvedError = error ?? errorText
  const resolvedResult = result ?? output
  const isError = status === "output-error" || resolvedError != null
  const resolvedTitle = title ?? (isError ? "Error" : "Result")

  const body =
    children ??
    (resolvedError != null ? (
      <div
        data-slot="tool-call-error"
        className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-description text-destructive"
      >
        {typeof resolvedError === "string" ? resolvedError : resolvedError}
      </div>
    ) : resolvedResult !== undefined ? (
      typeof resolvedResult === "object" &&
      resolvedResult !== null &&
      !React.isValidElement(resolvedResult) ? (
        <ToolCallCode>{formatToolValue(resolvedResult)}</ToolCallCode>
      ) : typeof resolvedResult === "string" ? (
        <ToolCallCode>{resolvedResult}</ToolCallCode>
      ) : (
        <div className="rounded-lg border bg-background px-3 py-2.5 text-description shadow-xs">
          {resolvedResult as React.ReactNode}
        </div>
      )
    ) : null)

  if (!body) {
    return null
  }

  return (
    <ToolCallSection
      data-slot="tool-call-output"
      title={resolvedTitle}
      className={cn("border-t border-border/60", className)}
      {...props}
    >
      {body}
    </ToolCallSection>
  )
}

export {
  ToolCall,
  ToolCallHeader,
  ToolCallContent,
  ToolCallInput,
  ToolCallOutput,
  ToolCallSection,
  ToolCallCode,
  useToolCall,
  formatToolValue,
  statusLabel,
}
