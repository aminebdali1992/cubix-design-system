"use client"

import * as React from "react"
import {
  AtSignIcon,
  CheckIcon,
  CopyIcon,
  EllipsisIcon,
  GlobeIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PanelLeftIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  SquarePenIcon,
} from "lucide-react"

import type { BlockListItem } from "@/components/blocks/block-list"
import { buildChatInterfaceFiles } from "@/components/blocks/templates/chat/chat-source-deps"
import { Avatar, AvatarFallback } from "@/components/cubix/avatar"
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
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/cubix/conversation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/cubix/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/cubix/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/cubix/input-group"
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
import { ScrollArea } from "@/components/cubix/scroll-area"
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/cubix/tooltip"
import { cn } from "@/lib/utils"

const SIDEBAR_MIN = 200
const SIDEBAR_MAX = 320
const SIDEBAR_DEFAULT = 252
const COLLAPSE_AT = 720

type ChatThread = {
  id: string
  title: string
  group: "Today" | "Yesterday"
  preview: string
}

const initialThreads: ChatThread[] = [
  {
    id: "1",
    title: "رفع حلقهٔ ریدایرکت ورود",
    group: "Today",
    preview: "صفحهٔ لاگین دوباره به خودش برمی‌گردد...",
  },
  {
    id: "2",
    title: "سخت‌تر کردن اعتبارسنجی فرم پرداخت",
    group: "Today",
    preview: "خطاهای کارت باید به متن فیلد برسند.",
  },
  {
    id: "3",
    title: "توضیح استراتژی کش لبه",
    group: "Today",
    preview: "چه چیزی باید در لبه پویا بماند؟",
  },
  {
    id: "4",
    title: "مهاجرت وب‌هوک‌های صورتحساب",
    group: "Yesterday",
    preview: "هندلرهای Stripe را به صف جدید ببر.",
  },
  {
    id: "5",
    title: "بهبود حالت خالی صندوق ورودی",
    group: "Yesterday",
    preview: "حالت خالی باید عمدی و تمیز باشد.",
  },
]

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
        <Bubble variant="muted" className="max-w-[min(100%,34rem)]">
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

function AuthRedirectThread() {
  return (
    <>
      <UserMessage>
        بعد از ورود موفق، صفحهٔ لاگین دوباره به خودش برمی‌گردد. ریدایرکت را
        پیدا کن و یک اصلاح پیشنهاد بده.
      </UserMessage>

      <AssistantMessage>
        <Thinking defaultOpen={false} duration={8}>
          <ThinkingTrigger />
          <ThinkingContent>
            <div className="space-y-2 text-muted-foreground">
              <p>
                نشست نوشته می‌شود، اما middleware در اولین برگشت هنوز کوکی خالی
                می‌بیند.
              </p>
              <p>
                resolution مربوط به callback و اینکه login می‌تواند مقصد بعدی
                شود را بررسی کن.
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

        <ToolCall name="grep" status="output-available" defaultOpen={false}>
          <ToolCallHeader label="جستجوی handlerهای callback احراز هویت" />
          <ToolCallContent>
            <ToolCallInput
              parameters={{ pattern: "callbackUrl", path: "lib/auth" }}
            />
            <ToolCallOutput
              result={{
                hits: 3,
                primary: "lib/auth/resolve-post-auth-path.ts",
              }}
            />
          </ToolCallContent>
        </ToolCall>

        <div className="typeset typeset-chat">
          <p>
            middleware یک نشست تازه‌ساخته را برای یک درخواست هنوز ناشناس می‌بیند.
            بعد از ورود،{" "}
            <span className="rounded bg-muted px-1 py-0.5 font-mono text-caption">
              callbackUrl
            </span>{" "}
            هنوز به{" "}
            <span className="rounded bg-muted px-1 py-0.5 font-mono text-caption">
              /login
            </span>{" "}
            می‌رسد و ناوبری حلقه می‌زند.
          </p>
          <p className="text-muted-foreground">
            مقصد پایدار بعد از احراز هویت بگذارید و هرگز login را به‌عنوان
            callback مجاز نکنید:
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
    </>
  )
}

function GenericThread({ title, preview }: { title: string; preview: string }) {
  return (
    <>
      <UserMessage>{preview}</UserMessage>
      <AssistantMessage>
        <Thinking defaultOpen={false} duration={4}>
          <ThinkingTrigger />
          <ThinkingContent>
            <p className="text-muted-foreground">
              Sketch the smallest change that matches &ldquo;{title}&rdquo;
              without widening scope.
            </p>
          </ThinkingContent>
        </Thinking>
        <div className="typeset typeset-chat">
          <p>
            I would start by isolating the user-visible path for{" "}
            <span className="font-medium">{title}</span>, then land a focused
            patch with a short verification checklist.
          </p>
        </div>
        <MessageActions />
      </AssistantMessage>
    </>
  )
}

type SidebarPanelProps = {
  narrow: boolean
  width: number
  query: string
  onQueryChange: (value: string) => void
  groups: Array<{
    group: "Today" | "Yesterday"
    items: ChatThread[]
  }>
  activeId: string
  onSelect: (id: string) => void
  onRename: (id: string) => void
  onDelete: (id: string) => void
  onResizePointerDown: (event: React.PointerEvent<HTMLDivElement>) => void
  onResizePointerMove: (event: React.PointerEvent<HTMLDivElement>) => void
  onResizePointerUp: (event: React.PointerEvent<HTMLDivElement>) => void
  onResizeKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  className?: string
  style?: React.CSSProperties
}

function SidebarPanel({
  narrow,
  width,
  query,
  onQueryChange,
  groups,
  activeId,
  onSelect,
  onRename,
  onDelete,
  onResizePointerDown,
  onResizePointerMove,
  onResizePointerUp,
  onResizeKeyDown,
  className,
  style,
}: SidebarPanelProps) {
  return (
    <aside
      className={cn(
        "relative flex h-full shrink-0 flex-col border-r border-border/70 bg-muted/15",
        className
      )}
      style={style ?? (narrow ? undefined : { width })}
    >
      <div className="px-2 pt-3">
        <InputGroup className="bg-background">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="جستجوی گفتگوها..."
            aria-label="جستجوی گفتگوها"
          />
        </InputGroup>
      </div>

      <ScrollArea className="min-h-0 flex-1 px-2 py-3">
        <div className="flex flex-col gap-4">
          {groups.length === 0 ? (
            <Empty className="border-0 py-8">
              <EmptyHeader>
                <EmptyTitle>گفتگویی نیست</EmptyTitle>
                <EmptyDescription>
                  گفتگویی با «{query}» پیدا نشد.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            groups.map(({ group, items }) => (
              <div key={group} className="flex flex-col gap-1">
                <p className="px-2 text-caption font-medium tracking-wider text-muted-foreground">
                  {group === "Today" ? "امروز" : "دیروز"}
                </p>
                <div className="flex flex-col gap-0.5">
                  {items.map((thread) => {
                    const selected = thread.id === activeId
                    return (
                      <div
                        key={thread.id}
                        className={cn(
                          "group/thread relative flex h-8 w-full items-center rounded-md pr-0.5 transition-colors",
                          "hover:bg-muted/80",
                          selected && "bg-muted"
                        )}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => onSelect(thread.id)}
                          className={cn(
                            "h-8 min-w-0 flex-1 justify-start gap-2 px-2 text-left",
                            selected ? "bg-muted font-medium" : "font-normal"
                          )}
                        >
                          <MessageSquareIcon className="size-3.5 shrink-0 text-muted-foreground" />
                          <span className="min-w-0 flex-1 truncate">
                            {thread.title}
                          </span>
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                aria-label={`گزینه‌های بیشتر برای ${thread.title}`}
                                className="mr-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/thread:opacity-100 data-popup-open:opacity-100"
                              />
                            }
                          >
                            <MoreHorizontalIcon />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" side="bottom">
                            <DropdownMenuItem
                              onClick={() => onSelect(thread.id)}
                            >
                              Open
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onRename(thread.id)}
                            >
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => onDelete(thread.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border/70 p-2">
        <div className="flex items-center gap-2 rounded-lg px-1.5 py-1.5">
          <Avatar className="size-8 rounded-lg">
            <AvatarFallback className="rounded-lg bg-foreground text-caption font-medium text-background">
              AM
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-description font-medium leading-tight">Amin</p>
            <p className="truncate text-caption text-muted-foreground">
              Pro workspace
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="منوی حساب"
          >
            <EllipsisIcon />
          </Button>
        </div>
      </div>

      {!narrow ? (
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="تغییر اندازه نوار کناری"
          aria-valuemin={SIDEBAR_MIN}
          aria-valuemax={SIDEBAR_MAX}
          aria-valuenow={Math.round(width)}
          tabIndex={0}
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          onPointerCancel={onResizePointerUp}
          onKeyDown={onResizeKeyDown}
          className="absolute inset-y-0 right-0 z-10 w-1.5 translate-x-1/2 cursor-ew-resize touch-none outline-none focus-visible:bg-ring/30"
        />
      ) : null}
    </aside>
  )
}

export function AgentChatWithSidebar({ className }: { className?: string }) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [threads, setThreads] = React.useState(initialThreads)
  const [activeId, setActiveId] = React.useState(initialThreads[0]?.id ?? "")
  const [query, setQuery] = React.useState("")
  const [model, setModel] = React.useState("composer")
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [sidebarWidth, setSidebarWidth] = React.useState(SIDEBAR_DEFAULT)
  const [narrow, setNarrow] = React.useState(false)
  const dragRef = React.useRef<{ startX: number; startWidth: number } | null>(
    null
  )

  const active = threads.find((thread) => thread.id === activeId) ?? threads[0]

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return threads
    return threads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(q) ||
        thread.preview.toLowerCase().includes(q)
    )
  }, [query, threads])

  const groups = React.useMemo(() => {
    const order: Array<"Today" | "Yesterday"> = ["Today", "Yesterday"]
    return order
      .map((group) => ({
        group,
        items: filtered.filter((thread) => thread.group === group),
      }))
      .filter((entry) => entry.items.length > 0)
  }, [filtered])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const sync = (width: number) => {
      const isNarrow = width < COLLAPSE_AT
      setNarrow((prev) => {
        if (prev !== isNarrow && isNarrow) {
          setSidebarOpen(false)
        }
        if (prev !== isNarrow && !isNarrow) {
          setSidebarOpen(true)
        }
        return isNarrow
      })
    }

    sync(root.getBoundingClientRect().width)

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      sync(entry.contentRect.width)
    })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  function createChat() {
    const id = `new-${Date.now()}`
    const next: ChatThread = {
      id,
      title: "گفتگوی بدون عنوان",
      group: "Today",
      preview: "یک وظیفهٔ جدید برای عامل شروع کنید...",
    }
    setThreads((prev) => [next, ...prev])
    setActiveId(id)
    setQuery("")
    if (narrow) setSidebarOpen(false)
  }

  function selectThread(id: string) {
    setActiveId(id)
    if (narrow) setSidebarOpen(false)
  }

  function renameThread(id: string) {
    const current = threads.find((thread) => thread.id === id)
    if (!current) return
    const nextTitle = window.prompt("Rename chat", current.title)?.trim()
    if (!nextTitle) return
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === id ? { ...thread, title: nextTitle } : thread
      )
    )
  }

  function deleteThread(id: string) {
    setThreads((prev) => {
      const next = prev.filter((thread) => thread.id !== id)
      if (id === activeId) {
        setActiveId(next[0]?.id ?? "")
      }
      return next
    })
  }

  function onResizePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault()
    dragRef.current = {
      startX: event.clientX,
      startWidth: sidebarWidth,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onResizePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return
    const delta = event.clientX - dragRef.current.startX
    setSidebarWidth(
      Math.min(
        SIDEBAR_MAX,
        Math.max(SIDEBAR_MIN, dragRef.current.startWidth + delta)
      )
    )
  }

  function onResizePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function onResizeKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 24 : 8
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      setSidebarWidth((w) => Math.max(SIDEBAR_MIN, w - step))
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      setSidebarWidth((w) => Math.min(SIDEBAR_MAX, w + step))
    }
  }

  const sidebarProps: Omit<SidebarPanelProps, "className" | "style"> = {
    narrow,
    width: sidebarWidth,
    query,
    onQueryChange: setQuery,
    groups,
    activeId,
    onSelect: selectThread,
    onRename: renameThread,
    onDelete: deleteThread,
    onResizePointerDown,
    onResizePointerMove,
    onResizePointerUp,
    onResizeKeyDown,
  }

  const isBlank = active?.title === "گفتگوی بدون عنوان"

  return (
    <div
      ref={rootRef}
      lang="fa"
      dir="rtl"
      className={cn(
        "absolute inset-0 flex min-h-0 overflow-hidden bg-background",
        className
      )}
    >
      {sidebarOpen && !narrow ? <SidebarPanel {...sidebarProps} /> : null}

      {sidebarOpen && narrow ? (
        <>
          <button
            type="button"
            aria-label="بستن نوار کناری"
            className="absolute inset-0 z-20 bg-overlay"
            onClick={() => setSidebarOpen(false)}
          />
          <SidebarPanel
            {...sidebarProps}
            className="absolute inset-y-0 start-0 z-30 w-[min(85%,280px)] bg-background shadow-xl"
          />
        </>
      ) : null}

      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-background">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/70 px-3 sm:px-4">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={sidebarOpen ? "جمع کردن نوار کناری" : "باز کردن نوار کناری"}
                  className="-ms-0.5"
                  onClick={() => setSidebarOpen((open) => !open)}
                />
              }
            >
              <PanelLeftIcon />
            </TooltipTrigger>
            <TooltipContent>
              {sidebarOpen ? "Collapse sidebar" : "Open sidebar"}
            </TooltipContent>
          </Tooltip>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate text-description font-medium tracking-tight">
              {active?.title ?? "Agent chat"}
            </span>
            <Badge variant="outline" className="hidden font-mono sm:inline">
              Agent
            </Badge>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="گفتگوی جدید"
            onClick={createChat}
          >
            <PlusIcon />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="بیشتر"
          >
            <EllipsisIcon />
          </Button>
        </header>

        <Conversation className="min-h-0 flex-1">
          <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6 sm:px-6">
            {isBlank ? (
              <ConversationEmptyState
                title="What should we build?"
                description="Ask for a fix, a plan, or a refactor. Tool calls and code land here."
                icon={<SquarePenIcon />}
              />
            ) : active?.id === "1" ? (
              <AuthRedirectThread />
            ) : active ? (
              <GenericThread title={active.title} preview={active.preview} />
            ) : null}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="shrink-0 bg-background px-3 pt-3 pb-3 sm:px-4 sm:pb-4">
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
                  <PromptInputButton tooltip="Mention">
                    <AtSignIcon className="size-4" />
                  </PromptInputButton>
                  <PromptInputButton tooltip="Browser">
                    <GlobeIcon className="size-4" />
                  </PromptInputButton>
                  <PromptInputSelect
                    value={model}
                    onValueChange={(value) => {
                      if (typeof value === "string") setModel(value)
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
                      <PromptInputSelectItem value="gpt">
                        GPT
                      </PromptInputSelectItem>
                    </PromptInputSelectContent>
                  </PromptInputSelect>
                </PromptInputTools>
                <PromptInputSubmit />
              </PromptInputFooter>
            </PromptInput>
          </PromptInputProvider>
        </div>
      </main>
    </div>
  )
}

export const chatAgentSidebarBlock: BlockListItem = {
  id: "chat-agent-02",
  title: "چت عامل با نوار کناری",
  description:
    "فضای کار عامل با نوار تاریخچهٔ قابل‌تغییر اندازه، جستجو، تعویض گفتگو، و overlay واکنش‌گرا.",
  preview: <AgentChatWithSidebar />,
  files: buildChatInterfaceFiles(
    `export { AgentChatWithSidebar as default } from "@/components/blocks/templates/chat/chat-agent-sidebar"
`,
    { includeSidebar: true }
  ),
}
