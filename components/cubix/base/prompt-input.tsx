"use client"

import * as React from "react"
import {
  CornerDownLeftIcon,
  FileIcon,
  ImageIcon,
  MonitorIcon,
  PlusIcon,
  SquareIcon,
  XIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/cubix/attachment"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/cubix/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/cubix/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/cubix/hover-card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/cubix/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/cubix/select"
import { Spinner } from "@/components/cubix/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/cubix/tooltip"
import { cn } from "@/lib/utils"

export type PromptInputStatus =
  | "ready"
  | "submitted"
  | "streaming"
  | "error"

export type PromptInputFilePart = {
  type: "file"
  url: string
  filename?: string
  mediaType?: string
}

export type PromptInputAttachmentFile = PromptInputFilePart & {
  id: string
}

export type PromptInputSourceDocument = {
  type: "source-document"
  sourceId: string
  mediaType: string
  title: string
  filename?: string
  url?: string
}

export type PromptInputMessage = {
  text: string
  files: PromptInputFilePart[]
}

export type PromptInputError = {
  code: "max_files" | "max_file_size" | "accept"
  message: string
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `pi-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

async function convertBlobUrlToDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

async function captureScreenshot(): Promise<File | null> {
  if (
    typeof navigator === "undefined" ||
    !navigator.mediaDevices?.getDisplayMedia
  ) {
    return null
  }

  let stream: MediaStream | null = null
  const video = document.createElement("video")
  video.muted = true
  video.playsInline = true

  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: true,
    })

    video.srcObject = stream

    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve()
      video.onerror = () => reject(new Error("Failed to load screen stream"))
    })

    await video.play()

    const width = video.videoWidth
    const height = video.videoHeight
    if (!width || !height) {
      return null
    }

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext("2d")
    if (!context) {
      return null
    }

    context.drawImage(video, 0, 0, width, height)

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/png")
    })
    if (!blob) {
      return null
    }

    const timestamp = new Date()
      .toISOString()
      .replaceAll(/[:.]/g, "-")
      .replace("T", "_")
      .replace("Z", "")

    return new File([blob], `screenshot-${timestamp}.png`, {
      lastModified: Date.now(),
      type: "image/png",
    })
  } finally {
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop()
      }
    }
    video.pause()
    video.srcObject = null
  }
}

export type AttachmentsContext = {
  files: PromptInputAttachmentFile[]
  add: (files: File[] | FileList) => void
  remove: (id: string) => void
  clear: () => void
  openFileDialog: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
}

type TextInputContext = {
  value: string
  setInput: (value: string) => void
  clear: () => void
}

type PromptInputControllerProps = {
  textInput: TextInputContext
  attachments: AttachmentsContext
  __registerFileInput: (
    ref: React.RefObject<HTMLInputElement | null>,
    open: () => void
  ) => void
}

const PromptInputController =
  React.createContext<PromptInputControllerProps | null>(null)
const ProviderAttachmentsContext =
  React.createContext<AttachmentsContext | null>(null)

export function usePromptInputController() {
  const context = React.useContext(PromptInputController)
  if (!context) {
    throw new Error(
      "Wrap your component inside <PromptInputProvider> to use usePromptInputController()."
    )
  }
  return context
}

function useOptionalPromptInputController() {
  return React.useContext(PromptInputController)
}

export function useProviderAttachments() {
  const context = React.useContext(ProviderAttachmentsContext)
  if (!context) {
    throw new Error(
      "Wrap your component inside <PromptInputProvider> to use useProviderAttachments()."
    )
  }
  return context
}

function useOptionalProviderAttachments() {
  return React.useContext(ProviderAttachmentsContext)
}

export type PromptInputProviderProps = React.PropsWithChildren<{
  initialInput?: string
}>

export function PromptInputProvider({
  initialInput: initialTextInput = "",
  children,
}: PromptInputProviderProps) {
  const [textInput, setTextInput] = React.useState(initialTextInput)
  const clearInput = React.useCallback(() => setTextInput(""), [])

  const [attachmentFiles, setAttachmentFiles] = React.useState<
    PromptInputAttachmentFile[]
  >([])
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const openRef = React.useRef<() => void>(() => {})

  const add = React.useCallback((files: File[] | FileList) => {
    const incoming = [...files]
    if (incoming.length === 0) {
      return
    }

    setAttachmentFiles((prev) => [
      ...prev,
      ...incoming.map((file) => ({
        filename: file.name,
        id: createId(),
        mediaType: file.type,
        type: "file" as const,
        url: URL.createObjectURL(file),
      })),
    ])
  }, [])

  const remove = React.useCallback((id: string) => {
    setAttachmentFiles((prev) => {
      const found = prev.find((file) => file.id === id)
      if (found?.url) {
        URL.revokeObjectURL(found.url)
      }
      return prev.filter((file) => file.id !== id)
    })
  }, [])

  const clear = React.useCallback(() => {
    setAttachmentFiles((prev) => {
      for (const file of prev) {
        if (file.url) {
          URL.revokeObjectURL(file.url)
        }
      }
      return []
    })
  }, [])

  const attachmentsRef = React.useRef(attachmentFiles)

  React.useEffect(() => {
    attachmentsRef.current = attachmentFiles
  }, [attachmentFiles])

  React.useEffect(
    () => () => {
      for (const file of attachmentsRef.current) {
        if (file.url) {
          URL.revokeObjectURL(file.url)
        }
      }
    },
    []
  )

  const openFileDialog = React.useCallback(() => {
    openRef.current?.()
  }, [])

  const attachments = React.useMemo<AttachmentsContext>(
    () => ({
      add,
      clear,
      fileInputRef,
      files: attachmentFiles,
      openFileDialog,
      remove,
    }),
    [attachmentFiles, add, remove, clear, openFileDialog]
  )

  const __registerFileInput = React.useCallback(
    (ref: React.RefObject<HTMLInputElement | null>, open: () => void) => {
      fileInputRef.current = ref.current
      openRef.current = open
    },
    []
  )

  const controller = React.useMemo<PromptInputControllerProps>(
    () => ({
      __registerFileInput,
      attachments,
      textInput: {
        clear: clearInput,
        setInput: setTextInput,
        value: textInput,
      },
    }),
    [textInput, clearInput, attachments, __registerFileInput]
  )

  return (
    <PromptInputController.Provider value={controller}>
      <ProviderAttachmentsContext.Provider value={attachments}>
        {children}
      </ProviderAttachmentsContext.Provider>
    </PromptInputController.Provider>
  )
}

const LocalAttachmentsContext =
  React.createContext<AttachmentsContext | null>(null)

export function usePromptInputAttachments() {
  const provider = useOptionalProviderAttachments()
  const local = React.useContext(LocalAttachmentsContext)
  const context = local ?? provider
  if (!context) {
    throw new Error(
      "usePromptInputAttachments must be used within a PromptInput or PromptInputProvider"
    )
  }
  return context
}

export type ReferencedSourcesContext = {
  sources: (PromptInputSourceDocument & { id: string })[]
  add: (
    sources: PromptInputSourceDocument[] | PromptInputSourceDocument
  ) => void
  remove: (id: string) => void
  clear: () => void
}

export const LocalReferencedSourcesContext =
  React.createContext<ReferencedSourcesContext | null>(null)

export function usePromptInputReferencedSources() {
  const context = React.useContext(LocalReferencedSourcesContext)
  if (!context) {
    throw new Error(
      "usePromptInputReferencedSources must be used within a PromptInput"
    )
  }
  return context
}

export type PromptInputActionAddAttachmentsProps = React.ComponentProps<
  typeof DropdownMenuItem
> & {
  label?: string
}

export function PromptInputActionAddAttachments({
  label = "Add photos or files",
  className,
  onClick,
  ...props
}: PromptInputActionAddAttachmentsProps) {
  const attachments = usePromptInputAttachments()

  return (
    <DropdownMenuItem
      data-slot="prompt-input-action-add-attachments"
      className={cn(
        "gap-2 px-2 py-1.5 whitespace-nowrap [&_svg]:text-muted-foreground",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) {
          return
        }
        attachments.openFileDialog()
      }}
      {...props}
    >
      <ImageIcon className="size-4" />
      <span>{label}</span>
    </DropdownMenuItem>
  )
}

export type PromptInputActionAddScreenshotProps = React.ComponentProps<
  typeof DropdownMenuItem
> & {
  label?: string
}

export function PromptInputActionAddScreenshot({
  label = "Take screenshot",
  className,
  onClick,
  ...props
}: PromptInputActionAddScreenshotProps) {
  const attachments = usePromptInputAttachments()

  return (
    <DropdownMenuItem
      data-slot="prompt-input-action-add-screenshot"
      className={cn(
        "gap-2 px-2 py-1.5 whitespace-nowrap [&_svg]:text-muted-foreground",
        className
      )}
      onClick={async (event) => {
        onClick?.(event)
        if (event.defaultPrevented) {
          return
        }

        try {
          const screenshot = await captureScreenshot()
          if (screenshot) {
            attachments.add([screenshot])
          }
        } catch (error) {
          if (
            error instanceof DOMException &&
            (error.name === "NotAllowedError" || error.name === "AbortError")
          ) {
            return
          }
          throw error
        }
      }}
      {...props}
    >
      <MonitorIcon className="size-4" />
      <span>{label}</span>
    </DropdownMenuItem>
  )
}

export type PromptInputProps = Omit<
  React.ComponentProps<"form">,
  "onSubmit" | "onError"
> & {
  accept?: string
  multiple?: boolean
  globalDrop?: boolean
  syncHiddenInput?: boolean
  maxFiles?: number
  maxFileSize?: number
  onError?: (error: PromptInputError) => void
  onSubmit: (
    message: PromptInputMessage,
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>
}

export function PromptInput({
  className,
  accept,
  multiple,
  globalDrop,
  syncHiddenInput,
  maxFiles,
  maxFileSize,
  onError,
  onSubmit,
  children,
  ...props
}: PromptInputProps) {
  const controller = useOptionalPromptInputController()
  const usingProvider = !!controller

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const formRef = React.useRef<HTMLFormElement | null>(null)

  const [items, setItems] = React.useState<PromptInputAttachmentFile[]>([])
  const files = usingProvider ? controller.attachments.files : items

  const [referencedSources, setReferencedSources] = React.useState<
    (PromptInputSourceDocument & { id: string })[]
  >([])

  const filesRef = React.useRef(files)

  React.useEffect(() => {
    filesRef.current = files
  }, [files])

  const openFileDialogLocal = React.useCallback(() => {
    inputRef.current?.click()
  }, [])

  const matchesAccept = React.useCallback(
    (file: File) => {
      if (!accept || accept.trim() === "") {
        return true
      }

      const patterns = accept
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)

      return patterns.some((pattern) => {
        if (pattern.endsWith("/*")) {
          const prefix = pattern.slice(0, -1)
          return file.type.startsWith(prefix)
        }
        return file.type === pattern
      })
    },
    [accept]
  )

  const addLocal = React.useCallback(
    (fileList: File[] | FileList) => {
      const incoming = [...fileList]
      const accepted = incoming.filter((file) => matchesAccept(file))
      if (incoming.length && accepted.length === 0) {
        onError?.({
          code: "accept",
          message: "No files match the accepted types.",
        })
        return
      }

      const withinSize = (file: File) =>
        maxFileSize ? file.size <= maxFileSize : true
      const sized = accepted.filter(withinSize)
      if (accepted.length > 0 && sized.length === 0) {
        onError?.({
          code: "max_file_size",
          message: "All files exceed the maximum size.",
        })
        return
      }

      setItems((prev) => {
        const capacity =
          typeof maxFiles === "number"
            ? Math.max(0, maxFiles - prev.length)
            : undefined
        const capped =
          typeof capacity === "number" ? sized.slice(0, capacity) : sized
        if (typeof capacity === "number" && sized.length > capacity) {
          onError?.({
            code: "max_files",
            message: "Too many files. Some were not added.",
          })
        }

        const next: PromptInputAttachmentFile[] = []
        for (const file of capped) {
          next.push({
            filename: file.name,
            id: createId(),
            mediaType: file.type,
            type: "file",
            url: URL.createObjectURL(file),
          })
        }
        return [...prev, ...next]
      })
    },
    [matchesAccept, maxFiles, maxFileSize, onError]
  )

  const removeLocal = React.useCallback((id: string) => {
    setItems((prev) => {
      const found = prev.find((file) => file.id === id)
      if (found?.url) {
        URL.revokeObjectURL(found.url)
      }
      return prev.filter((file) => file.id !== id)
    })
  }, [])

  const addWithProviderValidation = React.useCallback(
    (fileList: File[] | FileList) => {
      const incoming = [...fileList]
      const accepted = incoming.filter((file) => matchesAccept(file))
      if (incoming.length && accepted.length === 0) {
        onError?.({
          code: "accept",
          message: "No files match the accepted types.",
        })
        return
      }

      const withinSize = (file: File) =>
        maxFileSize ? file.size <= maxFileSize : true
      const sized = accepted.filter(withinSize)
      if (accepted.length > 0 && sized.length === 0) {
        onError?.({
          code: "max_file_size",
          message: "All files exceed the maximum size.",
        })
        return
      }

      const currentCount = files.length
      const capacity =
        typeof maxFiles === "number"
          ? Math.max(0, maxFiles - currentCount)
          : undefined
      const capped =
        typeof capacity === "number" ? sized.slice(0, capacity) : sized
      if (typeof capacity === "number" && sized.length > capacity) {
        onError?.({
          code: "max_files",
          message: "Too many files. Some were not added.",
        })
      }

      if (capped.length > 0) {
        controller?.attachments.add(capped)
      }
    },
    [matchesAccept, maxFileSize, maxFiles, onError, files.length, controller]
  )

  const clearAttachments = React.useCallback(() => {
    if (usingProvider) {
      controller?.attachments.clear()
      return
    }

    setItems((prev) => {
      for (const file of prev) {
        if (file.url) {
          URL.revokeObjectURL(file.url)
        }
      }
      return []
    })
  }, [usingProvider, controller])

  const clearReferencedSources = React.useCallback(
    () => setReferencedSources([]),
    []
  )

  const add = usingProvider ? addWithProviderValidation : addLocal
  const remove = usingProvider ? controller.attachments.remove : removeLocal
  const openFileDialog = usingProvider
    ? controller.attachments.openFileDialog
    : openFileDialogLocal

  const clear = React.useCallback(() => {
    clearAttachments()
    clearReferencedSources()
  }, [clearAttachments, clearReferencedSources])

  React.useEffect(() => {
    if (!usingProvider) {
      return
    }
    controller.__registerFileInput(inputRef, () => inputRef.current?.click())
  }, [usingProvider, controller])

  React.useEffect(() => {
    if (syncHiddenInput && inputRef.current && files.length === 0) {
      inputRef.current.value = ""
    }
  }, [files, syncHiddenInput])

  React.useEffect(() => {
    const form = formRef.current
    if (!form || globalDrop) {
      return
    }

    const onDragOver = (event: DragEvent) => {
      if (event.dataTransfer?.types?.includes("Files")) {
        event.preventDefault()
      }
    }
    const onDrop = (event: DragEvent) => {
      if (event.dataTransfer?.types?.includes("Files")) {
        event.preventDefault()
      }
      if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        add(event.dataTransfer.files)
      }
    }

    form.addEventListener("dragover", onDragOver)
    form.addEventListener("drop", onDrop)
    return () => {
      form.removeEventListener("dragover", onDragOver)
      form.removeEventListener("drop", onDrop)
    }
  }, [add, globalDrop])

  React.useEffect(() => {
    if (!globalDrop) {
      return
    }

    const onDragOver = (event: DragEvent) => {
      if (event.dataTransfer?.types?.includes("Files")) {
        event.preventDefault()
      }
    }
    const onDrop = (event: DragEvent) => {
      if (event.dataTransfer?.types?.includes("Files")) {
        event.preventDefault()
      }
      if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        add(event.dataTransfer.files)
      }
    }

    document.addEventListener("dragover", onDragOver)
    document.addEventListener("drop", onDrop)
    return () => {
      document.removeEventListener("dragover", onDragOver)
      document.removeEventListener("drop", onDrop)
    }
  }, [add, globalDrop])

  React.useEffect(
    () => () => {
      if (!usingProvider) {
        for (const file of filesRef.current) {
          if (file.url) {
            URL.revokeObjectURL(file.url)
          }
        }
      }
    },
    [usingProvider]
  )

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        if (event.currentTarget.files) {
          add(event.currentTarget.files)
        }
        event.currentTarget.value = ""
      },
      [add]
    )

  const attachmentsCtx = React.useMemo<AttachmentsContext>(
    () => ({
      add,
      clear: clearAttachments,
      fileInputRef: inputRef,
      files: files.map((item) => ({ ...item, id: item.id })),
      openFileDialog,
      remove,
    }),
    [files, add, remove, clearAttachments, openFileDialog]
  )

  const refsCtx = React.useMemo<ReferencedSourcesContext>(
    () => ({
      add: (incoming) => {
        const array = Array.isArray(incoming) ? incoming : [incoming]
        setReferencedSources((prev) => [
          ...prev,
          ...array.map((source) => ({ ...source, id: createId() })),
        ])
      },
      clear: clearReferencedSources,
      remove: (id) => {
        setReferencedSources((prev) =>
          prev.filter((source) => source.id !== id)
        )
      },
      sources: referencedSources,
    }),
    [referencedSources, clearReferencedSources]
  )

  const handleSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      async (event) => {
        event.preventDefault()

        const form = event.currentTarget
        const text = usingProvider
          ? controller.textInput.value
          : (() => {
              const formData = new FormData(form)
              return (formData.get("message") as string) || ""
            })()

        if (!usingProvider) {
          form.reset()
        }

        try {
          const convertedFiles: PromptInputFilePart[] = await Promise.all(
            files.map(async ({ id: _id, ...item }) => {
              if (item.url?.startsWith("blob:")) {
                const dataUrl = await convertBlobUrlToDataUrl(item.url)
                return {
                  ...item,
                  url: dataUrl ?? item.url,
                }
              }
              return item
            })
          )

          const result = onSubmit({ files: convertedFiles, text }, event)

          if (result instanceof Promise) {
            try {
              await result
              clear()
              if (usingProvider) {
                controller.textInput.clear()
              }
            } catch {
              // Keep input on error so the user can retry.
            }
          } else {
            clear()
            if (usingProvider) {
              controller.textInput.clear()
            }
          }
        } catch {
          // Keep input on error so the user can retry.
        }
      },
      [usingProvider, controller, files, onSubmit, clear]
    )

  return (
    <LocalAttachmentsContext.Provider value={attachmentsCtx}>
      <LocalReferencedSourcesContext.Provider value={refsCtx}>
        <input
          accept={accept}
          aria-label="Upload files"
          className="hidden"
          multiple={multiple}
          onChange={handleChange}
          ref={inputRef}
          title="Upload files"
          type="file"
        />
        <form
          data-slot="prompt-input"
          className={cn("w-full", className)}
          onSubmit={handleSubmit}
          ref={formRef}
          {...props}
        >
          <InputGroup className="overflow-hidden rounded-xl bg-background shadow-xs dark:bg-input/20">
            {children}
          </InputGroup>
        </form>
      </LocalReferencedSourcesContext.Provider>
    </LocalAttachmentsContext.Provider>
  )
}

export type PromptInputBodyProps = React.ComponentProps<"div">

export function PromptInputBody({
  className,
  ...props
}: PromptInputBodyProps) {
  return (
    <div
      data-slot="prompt-input-body"
      className={cn("contents", className)}
      {...props}
    />
  )
}

export type PromptInputTextareaProps = React.ComponentProps<
  typeof InputGroupTextarea
>

export function PromptInputTextarea({
  onChange,
  onKeyDown,
  className,
  placeholder = "What would you like to know?",
  ...props
}: PromptInputTextareaProps) {
  const controller = useOptionalPromptInputController()
  const attachments = usePromptInputAttachments()
  const [isComposing, setIsComposing] = React.useState(false)

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> =
    React.useCallback(
      (event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) {
          return
        }

        if (event.key === "Enter") {
          if (isComposing || event.nativeEvent.isComposing) {
            return
          }
          if (event.shiftKey) {
            return
          }
          event.preventDefault()

          const { form } = event.currentTarget
          const submitButton = form?.querySelector(
            'button[type="submit"]'
          ) as HTMLButtonElement | null
          if (submitButton?.disabled) {
            return
          }

          form?.requestSubmit()
        }

        if (
          event.key === "Backspace" &&
          event.currentTarget.value === "" &&
          attachments.files.length > 0
        ) {
          event.preventDefault()
          const lastAttachment = attachments.files.at(-1)
          if (lastAttachment) {
            attachments.remove(lastAttachment.id)
          }
        }
      },
      [onKeyDown, isComposing, attachments]
    )

  const handlePaste: React.ClipboardEventHandler<HTMLTextAreaElement> =
    React.useCallback(
      (event) => {
        const items = event.clipboardData?.items
        if (!items) {
          return
        }

        const pastedFiles: File[] = []
        for (const item of items) {
          if (item.kind === "file") {
            const file = item.getAsFile()
            if (file) {
              pastedFiles.push(file)
            }
          }
        }

        if (pastedFiles.length > 0) {
          event.preventDefault()
          attachments.add(pastedFiles)
        }
      },
      [attachments]
    )

  const controlledProps = controller
    ? {
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          controller.textInput.setInput(event.currentTarget.value)
          onChange?.(event)
        },
        value: controller.textInput.value,
      }
    : {
        onChange,
      }

  return (
    <InputGroupTextarea
      data-slot="prompt-input-textarea"
      className={cn(
        "field-sizing-content max-h-48 min-h-[4.5rem] px-3 py-2.5 leading-relaxed",
        className
      )}
      name="message"
      onCompositionEnd={() => setIsComposing(false)}
      onCompositionStart={() => setIsComposing(true)}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      placeholder={placeholder}
      {...props}
      {...controlledProps}
    />
  )
}

export type PromptInputHeaderProps = Omit<
  React.ComponentProps<typeof InputGroupAddon>,
  "align"
>

export function PromptInputHeader({
  className,
  ...props
}: PromptInputHeaderProps) {
  return (
    <InputGroupAddon
      data-slot="prompt-input-header"
      align="block-end"
      className={cn(
        "order-first flex-wrap gap-2 px-3 pt-2.5 pb-2",
        "not-has-[*]:hidden",
        "has-[[data-slot=prompt-input-attachments]]:border-b has-[[data-slot=prompt-input-attachments]]:border-border/50",
        className
      )}
      {...props}
    />
  )
}

export type PromptInputFooterProps = Omit<
  React.ComponentProps<typeof InputGroupAddon>,
  "align"
>

export function PromptInputFooter({
  className,
  ...props
}: PromptInputFooterProps) {
  return (
    <InputGroupAddon
      data-slot="prompt-input-footer"
      align="block-end"
      className={cn("justify-between gap-2 px-2.5 pb-2.5", className)}
      {...props}
    />
  )
}

export type PromptInputToolsProps = React.ComponentProps<"div">

export function PromptInputTools({
  className,
  ...props
}: PromptInputToolsProps) {
  return (
    <div
      data-slot="prompt-input-tools"
      className={cn("flex min-w-0 items-center gap-1", className)}
      {...props}
    />
  )
}

export type PromptInputAttachmentsProps = Omit<
  React.ComponentProps<typeof AttachmentGroup>,
  "children"
> & {
  children: (file: PromptInputAttachmentFile) => React.ReactNode
}

export function PromptInputAttachments({
  className,
  children,
  ...props
}: PromptInputAttachmentsProps) {
  const { files } = usePromptInputAttachments()

  if (files.length === 0) {
    return null
  }

  return (
    <AttachmentGroup
      data-slot="prompt-input-attachments"
      className={cn("w-full gap-2", className)}
      {...props}
    >
      {files.map((file) => (
        <React.Fragment key={file.id}>{children(file)}</React.Fragment>
      ))}
    </AttachmentGroup>
  )
}

export type PromptInputAttachmentProps = React.ComponentProps<
  typeof Attachment
> & {
  data: PromptInputAttachmentFile
}

export function PromptInputAttachment({
  data,
  className,
  ...props
}: PromptInputAttachmentProps) {
  const attachments = usePromptInputAttachments()
  const isImage = data.mediaType?.startsWith("image/")

  return (
    <Attachment
      data-slot="prompt-input-attachment"
      size="xs"
      orientation="horizontal"
      state="done"
      className={cn("min-w-0 max-w-52", className)}
      {...props}
    >
      <AttachmentMedia variant={isImage ? "image" : "icon"}>
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.url} alt={data.filename ?? "Attachment"} />
        ) : (
          <FileIcon />
        )}
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{data.filename ?? "Untitled"}</AttachmentTitle>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          aria-label={`Remove ${data.filename ?? "attachment"}`}
          onClick={() => attachments.remove(data.id)}
        >
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}

export type PromptInputButtonTooltip =
  | string
  | {
      content: React.ReactNode
      shortcut?: string
      side?: React.ComponentProps<typeof TooltipContent>["side"]
    }

export type PromptInputButtonProps = React.ComponentProps<
  typeof InputGroupButton
> & {
  tooltip?: PromptInputButtonTooltip
}

function getPromptInputButtonSize(children: React.ReactNode) {
  const items = React.Children.toArray(children).filter((child) => {
    if (child == null || typeof child === "boolean") {
      return false
    }
    if (typeof child === "string") {
      return child.trim().length > 0
    }
    return true
  })

  if (items.length === 0) {
    return "icon-xs" as const
  }

  if (items.length > 1) {
    return "sm" as const
  }

  const only = items[0]
  if (typeof only === "string" || typeof only === "number") {
    return "xs" as const
  }

  return "icon-xs" as const
}

export function PromptInputButton({
  variant = "ghost",
  className,
  size,
  tooltip,
  children,
  ...props
}: PromptInputButtonProps) {
  const newSize = size ?? getPromptInputButtonSize(children)
  const toneClass =
    variant === "ghost"
      ? "text-muted-foreground hover:text-foreground"
      : undefined

  if (!tooltip) {
    return (
      <InputGroupButton
        data-slot="prompt-input-button"
        className={cn(toneClass, className)}
        size={newSize}
        type="button"
        variant={variant}
        {...props}
      >
        {children}
      </InputGroupButton>
    )
  }

  const tooltipContent =
    typeof tooltip === "string" ? tooltip : tooltip.content
  const shortcut = typeof tooltip === "string" ? undefined : tooltip.shortcut
  const side = typeof tooltip === "string" ? "top" : (tooltip.side ?? "top")

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <InputGroupButton
            data-slot="prompt-input-button"
            className={cn(toneClass, className)}
            size={newSize}
            type="button"
            variant={variant}
            {...props}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent side={side}>
        {tooltipContent}
        {shortcut ? (
          <span className="ml-2 text-muted-foreground">{shortcut}</span>
        ) : null}
      </TooltipContent>
    </Tooltip>
  )
}

export type PromptInputActionMenuProps = React.ComponentProps<
  typeof DropdownMenu
>

export function PromptInputActionMenu(props: PromptInputActionMenuProps) {
  return <DropdownMenu data-slot="prompt-input-action-menu" {...props} />
}

export type PromptInputActionMenuTriggerProps = PromptInputButtonProps

export function PromptInputActionMenuTrigger({
  className,
  children,
  tooltip: _tooltip,
  ...props
}: PromptInputActionMenuTriggerProps) {
  return (
    <DropdownMenuTrigger
      data-slot="prompt-input-action-menu-trigger"
      render={
        <PromptInputButton
          className={className}
          aria-label={props["aria-label"] ?? "Add"}
          {...props}
        />
      }
    >
      {children ?? <PlusIcon className="size-4" />}
    </DropdownMenuTrigger>
  )
}

export type PromptInputActionMenuContentProps = React.ComponentProps<
  typeof DropdownMenuContent
>

export function PromptInputActionMenuContent({
  className,
  sideOffset = 6,
  ...props
}: PromptInputActionMenuContentProps) {
  return (
    <DropdownMenuContent
      data-slot="prompt-input-action-menu-content"
      align="start"
      sideOffset={sideOffset}
      className={cn(
        "w-max! min-w-52 max-w-72 p-1.5 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export type PromptInputActionMenuItemProps = React.ComponentProps<
  typeof DropdownMenuItem
>

export function PromptInputActionMenuItem({
  className,
  ...props
}: PromptInputActionMenuItemProps) {
  return (
    <DropdownMenuItem
      data-slot="prompt-input-action-menu-item"
      className={cn(
        "gap-2 px-2 py-1.5 whitespace-nowrap [&_svg]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export type PromptInputSubmitProps = React.ComponentProps<
  typeof InputGroupButton
> & {
  status?: PromptInputStatus
  onStop?: () => void
}

export function PromptInputSubmit({
  className,
  variant = "default",
  size = "icon-sm",
  status,
  onStop,
  onClick,
  children,
  ...props
}: PromptInputSubmitProps) {
  const isGenerating = status === "submitted" || status === "streaming"

  let icon = <CornerDownLeftIcon className="size-4" />

  if (status === "submitted") {
    icon = <Spinner className="size-3.5" />
  } else if (status === "streaming") {
    icon = <SquareIcon className="size-3.5 fill-current" />
  } else if (status === "error") {
    icon = <XIcon className="size-4" />
  }

  return (
    <InputGroupButton
      data-slot="prompt-input-submit"
      data-status={status ?? "ready"}
      aria-label={isGenerating ? "Stop" : "Submit"}
      className={cn("shrink-0 rounded-lg", className)}
      onClick={(event) => {
        if (isGenerating && onStop) {
          event.preventDefault()
          onStop()
          return
        }
        onClick?.(event)
      }}
      size={size}
      type={isGenerating && onStop ? "button" : "submit"}
      variant={variant}
      {...props}
    >
      {children ?? icon}
    </InputGroupButton>
  )
}

export type PromptInputSelectProps = React.ComponentProps<typeof Select>

export function PromptInputSelect(props: PromptInputSelectProps) {
  return <Select data-slot="prompt-input-select" {...props} />
}

export type PromptInputSelectTriggerProps = React.ComponentProps<
  typeof SelectTrigger
>

export function PromptInputSelectTrigger({
  className,
  size = "sm",
  ...props
}: PromptInputSelectTriggerProps) {
  return (
    <SelectTrigger
      data-slot="prompt-input-select-trigger"
      size={size}
      className={cn(
        "h-7 border-none bg-transparent px-2 font-medium text-muted-foreground shadow-none transition-colors",
        "hover:bg-accent hover:text-foreground aria-expanded:bg-accent aria-expanded:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export type PromptInputSelectContentProps = React.ComponentProps<
  typeof SelectContent
>

export function PromptInputSelectContent({
  className,
  ...props
}: PromptInputSelectContentProps) {
  return (
    <SelectContent
      data-slot="prompt-input-select-content"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputSelectItemProps = React.ComponentProps<typeof SelectItem>

export function PromptInputSelectItem({
  className,
  ...props
}: PromptInputSelectItemProps) {
  return (
    <SelectItem
      data-slot="prompt-input-select-item"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputSelectValueProps = React.ComponentProps<
  typeof SelectValue
>

export function PromptInputSelectValue({
  className,
  ...props
}: PromptInputSelectValueProps) {
  return (
    <SelectValue
      data-slot="prompt-input-select-value"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputHoverCardProps = React.ComponentProps<typeof HoverCard>

export function PromptInputHoverCard({
  ...props
}: PromptInputHoverCardProps) {
  return <HoverCard data-slot="prompt-input-hover-card" {...props} />
}

export type PromptInputHoverCardTriggerProps = React.ComponentProps<
  typeof HoverCardTrigger
>

export function PromptInputHoverCardTrigger(
  props: PromptInputHoverCardTriggerProps
) {
  return (
    <HoverCardTrigger data-slot="prompt-input-hover-card-trigger" {...props} />
  )
}

export type PromptInputHoverCardContentProps = React.ComponentProps<
  typeof HoverCardContent
>

export function PromptInputHoverCardContent({
  align = "start",
  ...props
}: PromptInputHoverCardContentProps) {
  return (
    <HoverCardContent
      data-slot="prompt-input-hover-card-content"
      align={align}
      {...props}
    />
  )
}

export type PromptInputTabsListProps = React.ComponentProps<"div">

export function PromptInputTabsList({
  className,
  ...props
}: PromptInputTabsListProps) {
  return (
    <div
      data-slot="prompt-input-tabs-list"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputTabProps = React.ComponentProps<"div">

export function PromptInputTab({ className, ...props }: PromptInputTabProps) {
  return (
    <div data-slot="prompt-input-tab" className={cn(className)} {...props} />
  )
}

export type PromptInputTabLabelProps = React.ComponentProps<"h3">

export function PromptInputTabLabel({
  className,
  ...props
}: PromptInputTabLabelProps) {
  return (
    <h3
      data-slot="prompt-input-tab-label"
      className={cn(
        "mb-2 px-3 font-medium text-muted-foreground text-caption",
        className
      )}
      {...props}
    />
  )
}

export type PromptInputTabBodyProps = React.ComponentProps<"div">

export function PromptInputTabBody({
  className,
  ...props
}: PromptInputTabBodyProps) {
  return (
    <div
      data-slot="prompt-input-tab-body"
      className={cn("space-y-1", className)}
      {...props}
    />
  )
}

export type PromptInputTabItemProps = React.ComponentProps<"div">

export function PromptInputTabItem({
  className,
  ...props
}: PromptInputTabItemProps) {
  return (
    <div
      data-slot="prompt-input-tab-item"
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-caption hover:bg-accent",
        className
      )}
      {...props}
    />
  )
}

export type PromptInputCommandProps = React.ComponentProps<typeof Command>

export function PromptInputCommand({
  className,
  ...props
}: PromptInputCommandProps) {
  return (
    <Command
      data-slot="prompt-input-command"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputCommandInputProps = React.ComponentProps<
  typeof CommandInput
>

export function PromptInputCommandInput({
  className,
  ...props
}: PromptInputCommandInputProps) {
  return (
    <CommandInput
      data-slot="prompt-input-command-input"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputCommandListProps = React.ComponentProps<
  typeof CommandList
>

export function PromptInputCommandList({
  className,
  ...props
}: PromptInputCommandListProps) {
  return (
    <CommandList
      data-slot="prompt-input-command-list"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputCommandEmptyProps = React.ComponentProps<
  typeof CommandEmpty
>

export function PromptInputCommandEmpty({
  className,
  ...props
}: PromptInputCommandEmptyProps) {
  return (
    <CommandEmpty
      data-slot="prompt-input-command-empty"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputCommandGroupProps = React.ComponentProps<
  typeof CommandGroup
>

export function PromptInputCommandGroup({
  className,
  ...props
}: PromptInputCommandGroupProps) {
  return (
    <CommandGroup
      data-slot="prompt-input-command-group"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputCommandItemProps = React.ComponentProps<
  typeof CommandItem
>

export function PromptInputCommandItem({
  className,
  ...props
}: PromptInputCommandItemProps) {
  return (
    <CommandItem
      data-slot="prompt-input-command-item"
      className={cn(className)}
      {...props}
    />
  )
}

export type PromptInputCommandSeparatorProps = React.ComponentProps<
  typeof CommandSeparator
>

export function PromptInputCommandSeparator({
  className,
  ...props
}: PromptInputCommandSeparatorProps) {
  return (
    <CommandSeparator
      data-slot="prompt-input-command-separator"
      className={cn(className)}
      {...props}
    />
  )
}
