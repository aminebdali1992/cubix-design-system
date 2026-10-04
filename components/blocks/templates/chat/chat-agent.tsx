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
        aria-label={copied ? "کپی شد" : "کپی"}
        onClick={() => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1200)
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <Button type="button" variant="ghost" size="icon-xs" aria-label="تلاش دوباره">
        <RefreshCwIcon />
      </Button>
      <Button type="button" variant="ghost" size="icon-xs" aria-label="بیشتر">
        <EllipsisIcon />
      </Button>
    </MessageFooter>
  )
}

export function AgentChatInterface({ className }: { className?: string }) {
  const [model, setModel] = React.useState("composer")

  return (
    <div
      lang="fa"
      dir="rtl"
      className={cn(
        "absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-background",
        className
      )}
    >
      <header className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-border/70 px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-description font-medium tracking-tight">
            رفع حلقهٔ ریدایرکت ورود
          </span>
          <Badge variant="outline" className="hidden font-mono sm:inline">
            عامل
          </Badge>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="گفتگوی جدید"
          >
            <SquarePenIcon />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="افزودن">
            <PlusIcon />
          </Button>
        </div>
      </header>

      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6 sm:px-6">
          <UserMessage>
            بعد از ورود موفق، صفحهٔ لاگین دوباره به خودش برمی‌گردد. ریدایرکت را
            پیدا کن و یک اصلاح پیشنهاد بده.
          </UserMessage>

          <AssistantMessage>
            <Thinking defaultOpen={false} duration={6}>
              <ThinkingTrigger />
              <ThinkingContent>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    احتمالاً ریدایرکت بعد از نوشتن کوکی نشست رخ می‌دهد، قبل از
                    اینکه middleware آن را ببیند.
                  </p>
                  <p>
                    بعدی: callback احراز هویت، matcher میدلور، و مقصد بعد از ورود
                    را بررسی می‌کنم.
                  </p>
                </div>
              </ThinkingContent>
            </Thinking>

            <ToolCall
              name="read_file"
              status="output-available"
              defaultOpen={false}
            >
              <ToolCallHeader label="خواندن middleware.ts" />
              <ToolCallContent>
                <ToolCallInput
                  parameters={{ path: "middleware.ts", lines: "1-84" }}
                />
                <ToolCallOutput
                  result={{
                    matched: true,
                    issue: "callbackUrl هنوز به /login اشاره می‌کند",
                  }}
                />
              </ToolCallContent>
            </ToolCall>

            <div className="typeset typeset-chat">
              <p>
                حلقه از اینجا می‌آید که middleware یک نشست تازه‌ساخته را برای یک
                درخواست هنوز ناشناس می‌بیند. بعد از ورود،{" "}
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-caption">
                  callbackUrl
                </span>{" "}
                هنوز به{" "}
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-caption">
                  /login
                </span>
                {" "}می‌رسد و ناوبری بعدی برمی‌گردد.
              </p>
              <p className="text-muted-foreground">
                مقصد پایدار بعد از احراز هویت بگذارید و login را به‌عنوان callback
                نادیده بگیرید:
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
                بعد از احراز هویت موفق، مقادیر کهنهٔ callback را پاک کنید تا login
                دیگر مقصد بعدی نشود.
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
              <PromptInputTextarea placeholder="برنامه‌ریزی، جستجو، یا ساخت هر چیزی..." />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger aria-label="افزودن زمینه" />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                <PromptInputButton tooltip="منشن">
                  <AtSignIcon className="size-4" />
                </PromptInputButton>
                <PromptInputButton tooltip="مرورگر">
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
                    aria-label="مدل"
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
        aria-label={copied ? "کپی شد" : "کپی"}
        onClick={() => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1200)
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <Button type="button" variant="ghost" size="icon-xs" aria-label="تلاش دوباره">
        <RefreshCwIcon />
      </Button>
      <Button type="button" variant="ghost" size="icon-xs" aria-label="بیشتر">
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
          <span className="truncate text-description font-medium tracking-tight">
            رفع حلقهٔ ریدایرکت ورود
          </span>
          <Badge variant="outline" className="hidden font-mono sm:inline">
            عامل
          </Badge>
        </div>
        <div className="flex items-center gap-0.5">
          <Button type="button" variant="ghost" size="icon-sm" aria-label="گفتگوی جدید">
            <SquarePenIcon />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="افزودن">
            <PlusIcon />
          </Button>
        </div>
      </header>

      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6 sm:px-6">
          <UserMessage>
            بعد از ورود موفق، صفحهٔ لاگین دوباره به خودش برمی‌گردد. ریدایرکت را
            پیدا کن و یک اصلاح پیشنهاد بده.
          </UserMessage>

          <AssistantMessage>
            <Thinking defaultOpen={false} duration={6}>
              <ThinkingTrigger />
              <ThinkingContent>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    احتمالاً ریدایرکت بعد از نوشتن کوکی نشست رخ می‌دهد، قبل از
                    اینکه middleware آن را ببیند.
                  </p>
                  <p>
                    بعدی: callback احراز هویت، matcher میدلور، و مقصد بعد از ورود
                    را بررسی می‌کنم.
                  </p>
                </div>
              </ThinkingContent>
            </Thinking>

            <ToolCall name="read_file" status="output-available" defaultOpen={false}>
              <ToolCallHeader label="خواندن middleware.ts" />
              <ToolCallContent>
                <ToolCallInput parameters={{ path: "middleware.ts", lines: "1-84" }} />
                <ToolCallOutput
                  result={{
                    matched: true,
                    issue: "callbackUrl هنوز به /login اشاره می‌کند",
                  }}
                />
              </ToolCallContent>
            </ToolCall>

            <div className="typeset typeset-chat">
              <p>
                حلقه از اینجا می‌آید که middleware یک نشست تازه‌ساخته را برای یک
                درخواست هنوز ناشناس می‌بیند. بعد از ورود،{" "}
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-caption">
                  callbackUrl
                </span>{" "}
                هنوز به{" "}
                <span className="rounded bg-muted px-1 py-0.5 font-mono text-caption">
                  /login
                </span>
                {" "}می‌رسد و ناوبری بعدی برمی‌گردد.
              </p>
              <p className="text-muted-foreground">
                مقصد پایدار بعد از احراز هویت بگذارید و login را به‌عنوان callback
                نادیده بگیرید:
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
                بعد از احراز هویت موفق، مقادیر کهنهٔ callback را پاک کنید تا login
                دیگر مقصد بعدی نشود.
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
              <PromptInputTextarea placeholder="برنامه‌ریزی، جستجو، یا ساخت هر چیزی..." />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger aria-label="افزودن زمینه" />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                <PromptInputButton tooltip="منشن">
                  <AtSignIcon className="size-4" />
                </PromptInputButton>
                <PromptInputButton tooltip="مرورگر">
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
                  <PromptInputSelectTrigger aria-label="مدل" className="w-auto">
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
    title: "فضای کار چت عامل",
    description:
      "پوستهٔ عامل با thinking، tool call، کد، اکشن‌ها و Prompt Input.",
    preview: <AgentChatInterface />,
    files: buildChatInterfaceFiles(agentChatPageSource),
  },
  chatAgentSidebarBlock,
]
