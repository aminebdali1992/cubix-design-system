"use client"

import * as React from "react"
import {
  AtSignIcon,
  CheckIcon,
  CopyIcon,
  EllipsisIcon,
  GlobeIcon,
  PlusIcon,
  RefreshCwIcon,
  SquarePenIcon,
} from "lucide-react"

import type { BlockListItem } from "@/components/blocks/block-list"
import { chatAgentSidebarBlock } from "@/components/blocks/templates/chat/chat-agent-sidebar"
import { buildChatInterfaceFiles } from "@/components/blocks/templates/chat/chat-source-deps"
import { Badge } from "@/components/cubix/badge"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/cubix/code-block"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/cubix/conversation"
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@/components/cubix/message"
import {
  PromptInput,
  PromptInputActionAddAttachments,
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
} from "@/components/cubix/prompt-input"
import {
  Thinking,
  ThinkingContent,
  ThinkingTrigger,
} from "@/components/cubix/thinking"
import {
  ToolCall,
  ToolCallContent,
  ToolCallHeader,
  ToolCallInput,
  ToolCallOutput,
} from "@/components/cubix/tool-call"
import { cn } from "@/lib/utils"

const patchSnippet = `export function resolvePostAuthPath(session: Session, callbackUrl?: string) {
  if (callbackUrl && !callbackUrl.startsWith("/login")) {
    return callbackUrl
  }

  return session.user.defaultWorkspace ?? "/dashboard"
}`

function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <Message align="end">
      <MessageContent>
        <Bubble variant="muted" className="max-w-[min(100%,36rem)]">
          <BubbleContent>{children}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}

function AssistantMessage({ children }: { children: React.ReactNode }) {
  return (
    <Message>
      <MessageContent>{children}</MessageContent>
    </Message>
  )
}

function MessageActions() {
  const [copied, setCopied] = React.useState(false)

  return (
    <MessageFooter className="gap-0.5 px-0">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={copied ? "Copied" : "Copy"}
        onClick={() => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1200)
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <Button type="button" variant="ghost" size="icon-xs" aria-label="Retry">
        <RefreshCwIcon />
      </Button>
      <Button type="button" variant="ghost" size="icon-xs" aria-label="More">
        <EllipsisIcon />
      </Button>
    </MessageFooter>
  )
}

export function AgentChatInterface({ className }: { className?: string }) {
  const [model, setModel] = React.useState("composer")

  return (
    <div
      className={cn(
        "absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-background",
        className
      )}
    >
      <header className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-border/70 px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-caption font-medium tracking-tight">
            Fix auth redirect loop
          </span>
          <Badge variant="outline" className="hidden font-mono sm:inline">
            Agent
          </Badge>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="New chat"
          >
            <SquarePenIcon />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="Add">
            <PlusIcon />
          </Button>
        </div>
      </header>

      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6 sm:px-6">
          <UserMessage>
            The login page keeps bouncing back to itself after a successful
            sign-in. Trace the redirect and propose a fix.
          </UserMessage>

          <AssistantMessage>
            <Thinking defaultOpen={false} duration={6}>
              <ThinkingTrigger />
              <ThinkingContent>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    Redirect likely happens after the session cookie is written,
                    before middleware observes it.
                  </p>
                  <p>
                    Inspect the auth callback, middleware matcher, and the
                    post-login destination next.
                  </p>
                </div>
              </ThinkingContent>
            </Thinking>

            <ToolCall
              name="read_file"
              status="output-available"
              defaultOpen={false}
            >
              <ToolCallHeader label="Read middleware.ts" />
              <ToolCallContent>
                <ToolCallInput
                  parameters={{ path: "middleware.ts", lines: "1-84" }}
                />
                <ToolCallOutput
                  result={{
                    matched: true,
                    issue: "callbackUrl still points at /login",
                  }}
                />
              </ToolCallContent>
            </ToolCall>

            <div className="typeset typeset-chat">
              <p>
                The loop comes from middleware treating a brand-new session as
                anonymous for one request. After sign-in,{" "}
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-label">
                  callbackUrl
                </span>{" "}
                still resolves to{" "}
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-label">
                  /login
                </span>
                , so the next navigation bounces.
              </p>
              <p className="text-muted-foreground">
                Prefer a stable post-auth destination and ignore login as a
                callback target:
              </p>
            </div>

            <CodeBlock code={patchSnippet} language="tsx" showLineNumbers>
              <CodeBlockHeader>
                <CodeBlockTitle>
                  <CodeBlockFilename>
                    lib/auth/resolve-post-auth-path.ts
                  </CodeBlockFilename>
                </CodeBlockTitle>
                <CodeBlockActions>
                  <CodeBlockCopyButton />
                </CodeBlockActions>
              </CodeBlockHeader>
            </CodeBlock>

            <div className="typeset typeset-chat">
              <p>
                Clear stale callback values on successful auth so login can never
                become the next hop.
              </p>
            </div>

            <MessageActions />
          </AssistantMessage>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="shrink-0 bg-background/95 px-3 pt-3 pb-3 backdrop-blur-sm sm:px-4 sm:pb-4">
        <PromptInputProvider>
          <PromptInput
            className="mx-auto w-full max-w-3xl"
            multiple
            onSubmit={() => {}}
          >
            <PromptInputHeader>
              <PromptInputAttachments>
                {(file) => (
                  <PromptInputAttachment key={file.id} data={file} />
                )}
              </PromptInputAttachments>
            </PromptInputHeader>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Plan, search, build anything..." />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger aria-label="Add context" />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                <PromptInputButton tooltip="Mention">
                  <AtSignIcon className="size-4" />
                </PromptInputButton>
                <PromptInputButton tooltip="Browser">
                  <GlobeIcon className="size-4" />
                </PromptInputButton>
                <PromptInputSelect
                  value={model}
                  onValueChange={(value) => {
                    if (typeof value === "string") {
                      setModel(value)
                    }
                  }}
                >
                  <PromptInputSelectTrigger
                    aria-label="Model"
                    className="w-auto"
                  >
                    <PromptInputSelectValue />
                  </PromptInputSelectTrigger>
                  <PromptInputSelectContent>
                    <PromptInputSelectItem value="composer">
                      Composer
                    </PromptInputSelectItem>
                    <PromptInputSelectItem value="sonnet">
                      Sonnet
                    </PromptInputSelectItem>
                    <PromptInputSelectItem value="gpt">GPT</PromptInputSelectItem>
                  </PromptInputSelectContent>
                </PromptInputSelect>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </div>
  )
}

const agentChatPageSource = `"use client"

import * as React from "react"
import {
  AtSignIcon,
  CheckIcon,
  CopyIcon,
  EllipsisIcon,
  GlobeIcon,
  PlusIcon,
  RefreshCwIcon,
  SquarePenIcon,
} from "lucide-react"

import { Badge } from "@/components/cubix/badge"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/cubix/code-block"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/cubix/conversation"
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@/components/cubix/message"
import {
  PromptInput,
  PromptInputActionAddAttachments,
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
} from "@/components/cubix/prompt-input"
import {
  Thinking,
  ThinkingContent,
  ThinkingTrigger,
} from "@/components/cubix/thinking"
import {
  ToolCall,
  ToolCallContent,
  ToolCallHeader,
  ToolCallInput,
  ToolCallOutput,
} from "@/components/cubix/tool-call"

const patchSnippet = \`export function resolvePostAuthPath(session: Session, callbackUrl?: string) {
  if (callbackUrl && !callbackUrl.startsWith("/login")) {
    return callbackUrl
  }

  return session.user.defaultWorkspace ?? "/dashboard"
}\`

function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <Message align="end">
      <MessageContent>
        <Bubble variant="muted" className="max-w-[min(100%,36rem)]">
          <BubbleContent>{children}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}

function AssistantMessage({ children }: { children: React.ReactNode }) {
  return (
    <Message>
      <MessageContent>{children}</MessageContent>
    </Message>
  )
}

function MessageActions() {
  const [copied, setCopied] = React.useState(false)

  return (
    <MessageFooter className="gap-0.5 px-0">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={copied ? "Copied" : "Copy"}
        onClick={() => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1200)
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <Button type="button" variant="ghost" size="icon-xs" aria-label="Retry">
        <RefreshCwIcon />
      </Button>
      <Button type="button" variant="ghost" size="icon-xs" aria-label="More">
        <EllipsisIcon />
      </Button>
    </MessageFooter>
  )
}

export default function AgentChatPage() {
  const [model, setModel] = React.useState("composer")

  return (
    <div className="flex h-svh min-h-0 flex-col overflow-hidden bg-background">
      <header className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-border/70 px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-caption font-medium tracking-tight">
            Fix auth redirect loop
          </span>
          <Badge variant="outline" className="hidden font-mono sm:inline">
            Agent
          </Badge>
        </div>
        <div className="flex items-center gap-0.5">
          <Button type="button" variant="ghost" size="icon-sm" aria-label="New chat">
            <SquarePenIcon />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="Add">
            <PlusIcon />
          </Button>
        </div>
      </header>

      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6 sm:px-6">
          <UserMessage>
            The login page keeps bouncing back to itself after a successful
            sign-in. Trace the redirect and propose a fix.
          </UserMessage>

          <AssistantMessage>
            <Thinking defaultOpen={false} duration={6}>
              <ThinkingTrigger />
              <ThinkingContent>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    Redirect likely happens after the session cookie is written,
                    before middleware observes it.
                  </p>
                  <p>
                    Inspect the auth callback, middleware matcher, and the
                    post-login destination next.
                  </p>
                </div>
              </ThinkingContent>
            </Thinking>

            <ToolCall name="read_file" status="output-available" defaultOpen={false}>
              <ToolCallHeader label="Read middleware.ts" />
              <ToolCallContent>
                <ToolCallInput parameters={{ path: "middleware.ts", lines: "1-84" }} />
                <ToolCallOutput
                  result={{
                    matched: true,
                    issue: "callbackUrl still points at /login",
                  }}
                />
              </ToolCallContent>
            </ToolCall>

            <div className="typeset typeset-chat">
              <p>
                The loop comes from middleware treating a brand-new session as
                anonymous for one request. After sign-in,{" "}
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-label">
                  callbackUrl
                </span>{" "}
                still resolves to{" "}
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-label">
                  /login
                </span>
                , so the next navigation bounces.
              </p>
              <p className="text-muted-foreground">
                Prefer a stable post-auth destination and ignore login as a
                callback target:
              </p>
            </div>

            <CodeBlock code={patchSnippet} language="tsx" showLineNumbers>
              <CodeBlockHeader>
                <CodeBlockTitle>
                  <CodeBlockFilename>
                    lib/auth/resolve-post-auth-path.ts
                  </CodeBlockFilename>
                </CodeBlockTitle>
                <CodeBlockActions>
                  <CodeBlockCopyButton />
                </CodeBlockActions>
              </CodeBlockHeader>
            </CodeBlock>

            <div className="typeset typeset-chat">
              <p>
                Clear stale callback values on successful auth so login can never
                become the next hop.
              </p>
            </div>

            <MessageActions />
          </AssistantMessage>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="shrink-0 bg-background/95 px-3 pt-3 pb-3 backdrop-blur-sm sm:px-4 sm:pb-4">
        <PromptInputProvider>
          <PromptInput className="mx-auto w-full max-w-3xl" multiple onSubmit={() => {}}>
            <PromptInputHeader>
              <PromptInputAttachments>
                {(file) => <PromptInputAttachment key={file.id} data={file} />}
              </PromptInputAttachments>
            </PromptInputHeader>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Plan, search, build anything..." />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger aria-label="Add context" />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                <PromptInputButton tooltip="Mention">
                  <AtSignIcon className="size-4" />
                </PromptInputButton>
                <PromptInputButton tooltip="Browser">
                  <GlobeIcon className="size-4" />
                </PromptInputButton>
                <PromptInputSelect
                  value={model}
                  onValueChange={(value) => {
                    if (typeof value === "string") {
                      setModel(value)
                    }
                  }}
                >
                  <PromptInputSelectTrigger aria-label="Model" className="w-auto">
                    <PromptInputSelectValue />
                  </PromptInputSelectTrigger>
                  <PromptInputSelectContent>
                    <PromptInputSelectItem value="composer">Composer</PromptInputSelectItem>
                    <PromptInputSelectItem value="sonnet">Sonnet</PromptInputSelectItem>
                    <PromptInputSelectItem value="gpt">GPT</PromptInputSelectItem>
                  </PromptInputSelectContent>
                </PromptInputSelect>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </div>
  )
}
`

export const chatInterfaceBlocks: BlockListItem[] = [
  {
    id: "chat-agent-01",
    title: "Agent chat workspace",
    description:
      "Cursor-style agent shell with thinking, tool calls, code, actions, and Prompt Input.",
    preview: <AgentChatInterface />,
    files: buildChatInterfaceFiles(agentChatPageSource),
  },
  chatAgentSidebarBlock,
]
