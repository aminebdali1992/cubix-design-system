"use client"

import * as React from "react"
import { BotIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/cubix/avatar"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/cubix/message"
import {
  ToolCall,
  ToolCallContent,
  ToolCallHeader,
  ToolCallInput,
  ToolCallOutput,
  type ToolCallStatus,
} from "@/components/cubix/tool-call"

const weatherParams = {
  city: "Tehran",
  units: "metric",
}

const weatherResult = {
  temperature: 28,
  condition: "Clear",
  humidity: 22,
}

function AssistantAvatar() {
  return (
    <Avatar>
      <AvatarFallback className="bg-foreground text-background">
        <BotIcon className="size-4" />
      </AvatarFallback>
    </Avatar>
  )
}

export function ToolCallDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ToolCall name="get_weather" status="output-available" defaultOpen>
        <ToolCallHeader label="Get weather" />
        <ToolCallContent>
          <ToolCallInput parameters={weatherParams} />
          <ToolCallOutput result={weatherResult} />
        </ToolCallContent>
      </ToolCall>
    </div>
  )
}

export function ToolCallPendingDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ToolCall name="search_docs" status="input-streaming" defaultOpen>
        <ToolCallHeader label="Search docs" />
        <ToolCallContent>
          <ToolCallInput parameters={{ query: "rollback plan" }} />
        </ToolCallContent>
      </ToolCall>
    </div>
  )
}

export function ToolCallReadyDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ToolCall name="list_monitors" status="input-available" defaultOpen>
        <ToolCallHeader />
        <ToolCallContent>
          <ToolCallInput
            parameters={{ service: "checkout", window: "1h" }}
          />
        </ToolCallContent>
      </ToolCall>
    </div>
  )
}

export function ToolCallRunningDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ToolCall name="run_migration" status="approval-requested" defaultOpen>
        <ToolCallHeader label="Run migration" />
        <ToolCallContent>
          <ToolCallInput
            parameters={{ name: "add_workspace_invites", dryRun: false }}
          />
        </ToolCallContent>
      </ToolCall>
    </div>
  )
}

export function ToolCallCompletedDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ToolCall name="get_weather" status="output-available" defaultOpen>
        <ToolCallHeader label="Get weather" />
        <ToolCallContent>
          <ToolCallInput parameters={weatherParams} />
          <ToolCallOutput result={weatherResult} />
        </ToolCallContent>
      </ToolCall>
    </div>
  )
}

export function ToolCallErrorDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ToolCall name="fetch_invoice" status="output-error" defaultOpen>
        <ToolCallHeader label="Fetch invoice" />
        <ToolCallContent>
          <ToolCallInput parameters={{ invoiceId: "inv_98421" }} />
          <ToolCallOutput error="Upstream billing API timed out after 10s." />
        </ToolCallContent>
      </ToolCall>
    </div>
  )
}

export function ToolCallDeniedDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ToolCall name="delete_workspace" status="output-denied" defaultOpen>
        <ToolCallHeader label="Delete workspace" />
        <ToolCallContent>
          <ToolCallInput parameters={{ workspaceId: "ws_104" }} />
          <ToolCallOutput error="User denied this tool call." />
        </ToolCallContent>
      </ToolCall>
    </div>
  )
}

export function ToolCallClosedDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ToolCall name="get_weather" status="output-available" defaultOpen={false}>
        <ToolCallHeader label="Get weather" />
        <ToolCallContent>
          <ToolCallInput parameters={weatherParams} />
          <ToolCallOutput result={weatherResult} />
        </ToolCallContent>
      </ToolCall>
    </div>
  )
}

export function ToolCallStatusCycleDemo() {
  const statuses: ToolCallStatus[] = [
    "input-streaming",
    "input-available",
    "approval-requested",
    "output-available",
    "output-error",
  ]
  const [index, setIndex] = React.useState(0)
  const status = statuses[index]!

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <ToolCall name="sync_metrics" status={status} defaultOpen>
        <ToolCallHeader label="Sync metrics" />
        <ToolCallContent>
          <ToolCallInput parameters={{ source: "prometheus", range: "15m" }} />
          {status === "output-available" ? (
            <ToolCallOutput result={{ points: 128, lagMs: 40 }} />
          ) : null}
          {status === "output-error" ? (
            <ToolCallOutput error="Metric store returned 503." />
          ) : null}
        </ToolCallContent>
      </ToolCall>
      <Button
        size="xs"
        variant="outline"
        className="self-center"
        onClick={() => setIndex((value) => (value + 1) % statuses.length)}
      >
        Next status
      </Button>
    </div>
  )
}

export function ToolCallStackDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2">
      <ToolCall name="search_docs" status="output-available" defaultOpen={false}>
        <ToolCallHeader label="Search docs" />
        <ToolCallContent>
          <ToolCallInput parameters={{ query: "cutover" }} />
          <ToolCallOutput result={{ hits: 3 }} />
        </ToolCallContent>
      </ToolCall>
      <ToolCall name="get_weather" status="output-available" defaultOpen={false}>
        <ToolCallHeader label="Get weather" />
        <ToolCallContent>
          <ToolCallInput parameters={weatherParams} />
          <ToolCallOutput result={weatherResult} />
        </ToolCallContent>
      </ToolCall>
      <ToolCall name="notify_oncall" status="output-error" defaultOpen={false}>
        <ToolCallHeader label="Notify on-call" />
        <ToolCallContent>
          <ToolCallInput parameters={{ channel: "#deploy" }} />
          <ToolCallOutput error="Slack webhook rejected the payload." />
        </ToolCallContent>
      </ToolCall>
    </div>
  )
}

export function ToolCallMessageDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent className="min-w-0 flex-1 gap-2">
          <ToolCall name="get_weather" status="output-available" defaultOpen>
            <ToolCallHeader label="Get weather" />
            <ToolCallContent>
              <ToolCallInput parameters={weatherParams} />
              <ToolCallOutput result={weatherResult} />
            </ToolCallContent>
          </ToolCall>
          <Bubble variant="muted">
            <BubbleContent>
              Tehran is clear at 28°C with low humidity. Good window for the
              outdoor cutover checklist.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}
