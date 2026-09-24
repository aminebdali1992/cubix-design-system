"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  CheckCircle2Icon,
  ListTodoIcon,
  MessageSquareIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/cubix/button"
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/cubix/prompt-input"
import {
  Queue,
  QueueEmpty,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemImage,
  QueueItemIndicator,
  QueueItemRow,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
  type QueueMessage,
  type QueueTodo,
} from "@/components/cubix/queue"
import { cn } from "@/lib/utils"

const initialMessages: QueueMessage[] = [
  {
    id: "m1",
    parts: [
      {
        type: "text",
        text: "Summarize the cutover checklist for production.",
      },
    ],
  },
  {
    id: "m2",
    parts: [
      {
        type: "text",
        text: "Draft a rollback note for the billing migrate.",
      },
      {
        type: "file",
        filename: "rollback.md",
        mediaType: "text/markdown",
        url: "#",
      },
      {
        type: "file",
        filename: "diagram.png",
        mediaType: "image/png",
        url: "/queue-demo-diagram.svg",
      },
    ],
  },
  {
    id: "m3",
    parts: [
      {
        type: "text",
        text: "List monitors to watch for the first hour after deploy.",
      },
    ],
  },
]

const initialTodos: QueueTodo[] = [
  {
    id: "t1",
    title: "Review smoke tests",
    description: "Auth, checkout, and billing paths",
    status: "pending",
  },
  {
    id: "t2",
    title: "Confirm migration window",
    description: "Ops channel + on-call",
    status: "completed",
  },
  {
    id: "t3",
    title: "Prepare status update",
    status: "pending",
  },
]

function messageSummary(message: QueueMessage) {
  const text = message.parts.find((part) => part.type === "text" && part.text)
  return text?.text ?? "Queued message"
}

function messageFiles(message: QueueMessage) {
  return message.parts.filter((part) => part.type === "file")
}

export function QueueDemo() {
  const [messages, setMessages] = React.useState(initialMessages)
  const [todos, setTodos] = React.useState(initialTodos)

  if (messages.length === 0 && todos.length === 0) {
    return (
      <div className="mx-auto w-full max-w-md">
        <Queue>
          <QueueEmpty>Nothing waiting. Queue a prompt to continue.</QueueEmpty>
          <div className="flex justify-center pb-1">
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setMessages(initialMessages)
                setTodos(initialTodos)
              }}
            >
              Restore sample queue
            </Button>
          </div>
        </Queue>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <Queue>
        {messages.length > 0 ? (
          <QueueSection defaultOpen>
            <QueueSectionTrigger>
              <QueueSectionLabel
                count={messages.length}
                label="Queued"
                icon={<MessageSquareIcon />}
              />
            </QueueSectionTrigger>
            <QueueSectionContent>
              <QueueList>
                {messages.map((message) => {
                  const files = messageFiles(message)
                  return (
                    <QueueItem key={message.id}>
                      <QueueItemRow>
                        <QueueItemIndicator />
                        <QueueItemContent>
                          {messageSummary(message)}
                        </QueueItemContent>
                        <QueueItemActions>
                          <QueueItemAction
                            aria-label="Remove from queue"
                            onClick={() =>
                              setMessages((items) =>
                                items.filter((item) => item.id !== message.id)
                              )
                            }
                          >
                            <Trash2Icon className="size-3.5" />
                          </QueueItemAction>
                          <QueueItemAction
                            aria-label="Send now"
                            onClick={() =>
                              setMessages((items) =>
                                items.filter((item) => item.id !== message.id)
                              )
                            }
                          >
                            <ArrowUpIcon className="size-3.5" />
                          </QueueItemAction>
                        </QueueItemActions>
                      </QueueItemRow>
                      {files.length > 0 ? (
                        <QueueItemAttachment>
                          {files.map((file) =>
                            file.mediaType?.startsWith("image/") && file.url ? (
                              <QueueItemImage
                                key={file.filename ?? file.url}
                                src={file.url}
                                alt={file.filename ?? "Attachment"}
                              />
                            ) : (
                              <QueueItemFile key={file.filename ?? file.url}>
                                {file.filename ?? "Attachment"}
                              </QueueItemFile>
                            )
                          )}
                        </QueueItemAttachment>
                      ) : null}
                    </QueueItem>
                  )
                })}
              </QueueList>
            </QueueSectionContent>
          </QueueSection>
        ) : null}

        {todos.length > 0 ? (
          <QueueSection defaultOpen>
            <QueueSectionTrigger>
              <QueueSectionLabel
                count={todos.length}
                label="Todo"
                icon={<ListTodoIcon />}
              />
            </QueueSectionTrigger>
            <QueueSectionContent>
              <QueueList>
                {todos.map((todo) => {
                  const completed = todo.status === "completed"
                  return (
                    <QueueItem key={todo.id}>
                      <QueueItemRow>
                        <QueueItemIndicator completed={completed} />
                        <QueueItemContent completed={completed}>
                          {todo.title}
                        </QueueItemContent>
                        <QueueItemActions>
                          <QueueItemAction
                            aria-label={
                              completed ? "Mark pending" : "Mark completed"
                            }
                            onClick={() =>
                              setTodos((items) =>
                                items.map((item) =>
                                  item.id === todo.id
                                    ? {
                                        ...item,
                                        status:
                                          item.status === "completed"
                                            ? "pending"
                                            : "completed",
                                      }
                                    : item
                                )
                              )
                            }
                          >
                            <CheckCircle2Icon className="size-3.5" />
                          </QueueItemAction>
                          <QueueItemAction
                            aria-label="Remove todo"
                            onClick={() =>
                              setTodos((items) =>
                                items.filter((item) => item.id !== todo.id)
                              )
                            }
                          >
                            <Trash2Icon className="size-3.5" />
                          </QueueItemAction>
                        </QueueItemActions>
                      </QueueItemRow>
                      {todo.description ? (
                        <QueueItemDescription completed={completed}>
                          {todo.description}
                        </QueueItemDescription>
                      ) : null}
                    </QueueItem>
                  )
                })}
              </QueueList>
            </QueueSectionContent>
          </QueueSection>
        ) : null}
      </Queue>
    </div>
  )
}

export function QueueMessagesDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Queue>
        <QueueSection defaultOpen>
          <QueueSectionTrigger>
            <QueueSectionLabel count={2} label="Queued" />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              {initialMessages.slice(0, 2).map((message) => (
                <QueueItem key={message.id}>
                  <QueueItemRow>
                    <QueueItemIndicator />
                    <QueueItemContent>{messageSummary(message)}</QueueItemContent>
                    <QueueItemActions>
                      <QueueItemAction aria-label="Remove">
                        <Trash2Icon className="size-3.5" />
                      </QueueItemAction>
                    </QueueItemActions>
                  </QueueItemRow>
                </QueueItem>
              ))}
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      </Queue>
    </div>
  )
}

export function QueueTodosDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Queue>
        <QueueSection defaultOpen>
          <QueueSectionTrigger>
            <QueueSectionLabel count={3} label="Todo" />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              {initialTodos.map((todo) => {
                const completed = todo.status === "completed"
                return (
                  <QueueItem key={todo.id}>
                    <QueueItemRow>
                      <QueueItemIndicator completed={completed} />
                      <QueueItemContent completed={completed}>
                        {todo.title}
                      </QueueItemContent>
                    </QueueItemRow>
                    {todo.description ? (
                      <QueueItemDescription completed={completed}>
                        {todo.description}
                      </QueueItemDescription>
                    ) : null}
                  </QueueItem>
                )
              })}
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      </Queue>
    </div>
  )
}

export function QueueCollapsedDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Queue>
        <QueueSection defaultOpen={false}>
          <QueueSectionTrigger>
            <QueueSectionLabel count={3} label="Queued" />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              {initialMessages.map((message) => (
                <QueueItem key={message.id}>
                  <QueueItemRow>
                    <QueueItemIndicator />
                    <QueueItemContent>{messageSummary(message)}</QueueItemContent>
                  </QueueItemRow>
                </QueueItem>
              ))}
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      </Queue>
    </div>
  )
}

export function QueueAttachmentsDemo() {
  const message = initialMessages[1]!

  return (
    <div className="mx-auto w-full max-w-md">
      <Queue>
        <QueueSection defaultOpen>
          <QueueSectionTrigger>
            <QueueSectionLabel count={1} label="Queued" />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              <QueueItem>
                <QueueItemRow>
                  <QueueItemIndicator />
                  <QueueItemContent>{messageSummary(message)}</QueueItemContent>
                  <QueueItemActions>
                    <QueueItemAction aria-label="Send now">
                      <ArrowUpIcon className="size-3.5" />
                    </QueueItemAction>
                  </QueueItemActions>
                </QueueItemRow>
                <QueueItemAttachment>
                  {messageFiles(message).map((file) =>
                    file.mediaType?.startsWith("image/") && file.url ? (
                      <QueueItemImage
                        key={file.filename ?? file.url}
                        src={file.url}
                        alt={file.filename ?? "Attachment"}
                      />
                    ) : (
                      <QueueItemFile key={file.filename ?? file.url}>
                        {file.filename ?? "Attachment"}
                      </QueueItemFile>
                    )
                  )}
                </QueueItemAttachment>
              </QueueItem>
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      </Queue>
    </div>
  )
}

export function QueueEmptyDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Queue>
        <QueueEmpty>No pending prompts right now.</QueueEmpty>
      </Queue>
    </div>
  )
}

export function QueuePromptInputDemo() {
  const [messages, setMessages] = React.useState(initialMessages.slice(0, 2))

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border bg-card shadow-xs">
      {messages.length > 0 ? (
        <Queue className="rounded-none border-0 border-b bg-transparent shadow-none">
          <QueueSection defaultOpen>
            <QueueSectionTrigger>
              <QueueSectionLabel count={messages.length} label="Queued" />
            </QueueSectionTrigger>
            <QueueSectionContent>
              <QueueList>
                {messages.map((message) => (
                  <QueueItem key={message.id}>
                    <QueueItemRow>
                      <QueueItemIndicator />
                      <QueueItemContent>
                        {messageSummary(message)}
                      </QueueItemContent>
                      <QueueItemActions>
                        <QueueItemAction
                          aria-label="Remove from queue"
                          onClick={() =>
                            setMessages((items) =>
                              items.filter((item) => item.id !== message.id)
                            )
                          }
                        >
                          <Trash2Icon className="size-3.5" />
                        </QueueItemAction>
                      </QueueItemActions>
                    </QueueItemRow>
                  </QueueItem>
                ))}
              </QueueList>
            </QueueSectionContent>
          </QueueSection>
        </Queue>
      ) : null}
      <PromptInput
        className={cn(
          "border-0 shadow-none",
          "[&_[data-slot=input-group]]:rounded-none!",
          "[&_[data-slot=input-group]]:border-0!",
          "[&_[data-slot=input-group]]:bg-transparent!",
          "[&_[data-slot=input-group]]:shadow-none!"
        )}
      >
        <PromptInputBody>
          <PromptInputTextarea placeholder="Queue another follow-up..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>
    </div>
  )
}
