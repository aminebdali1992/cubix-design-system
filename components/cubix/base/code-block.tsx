"use client"

import * as React from "react"
import { CheckIcon, CopyIcon, FileIcon } from "lucide-react"
import { highlight, type LanguageName } from "sugar-high"
import { lang as resolveLang } from "sugar-high/lang"

import { Button } from "@/components/cubix/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/cubix/select"
import { cn } from "@/lib/utils"

type CodeBlockContextValue = {
  code: string
  language: string
  showLineNumbers: boolean
}

const CodeBlockContext = React.createContext<CodeBlockContextValue | null>(
  null
)

function useCodeBlock() {
  const context = React.useContext(CodeBlockContext)
  if (!context) {
    throw new Error("CodeBlock parts must be used within CodeBlock.")
  }
  return context
}

function resolveLanguage(language?: string): LanguageName {
  if (!language) {
    return "plaintext"
  }
  return resolveLang(language) ?? "plaintext"
}

const sugarHighVars =
  "[--sh-class:#953800] [--sh-identifier:#1f2328] [--sh-sign:#656d76] [--sh-property:#0550ae] [--sh-entity:#8250df] [--sh-jsxliterals:#116329] [--sh-string:#0a3069] [--sh-keyword:#cf222e] [--sh-comment:#6e7781] dark:[--sh-class:#ffa657] dark:[--sh-identifier:#e6edf3] dark:[--sh-sign:#8b949e] dark:[--sh-property:#79c0ff] dark:[--sh-entity:#d2a8ff] dark:[--sh-jsxliterals:#7ee787] dark:[--sh-string:#a5d6ff] dark:[--sh-keyword:#ff7b72] dark:[--sh-comment:#8b949e]"

export type CodeBlockProps = React.ComponentProps<"div"> & {
  code: string
  language?: string
  showLineNumbers?: boolean
}

function CodeBlock({
  className,
  code,
  language = "plaintext",
  showLineNumbers = false,
  children,
  style,
  ...props
}: CodeBlockProps) {
  const contextValue = React.useMemo(
    () => ({ code, language, showLineNumbers }),
    [code, language, showLineNumbers]
  )

  return (
    <CodeBlockContext.Provider value={contextValue}>
      <div
        data-slot="code-block"
        data-language={language}
        className={cn(
          "not-prose group/code-block relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs",
          className
        )}
        style={{ contentVisibility: "auto", ...style }}
        {...props}
      >
        {children}
        <CodeBlockContent
          code={code}
          language={language}
          showLineNumbers={showLineNumbers}
        />
      </div>
    </CodeBlockContext.Provider>
  )
}

export type CodeBlockHeaderProps = React.ComponentProps<"div">

function CodeBlockHeader({
  className,
  children,
  ...props
}: CodeBlockHeaderProps) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "flex min-h-9 items-center gap-2 border-b bg-muted/50 px-2.5 py-1.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type CodeBlockTitleProps = React.ComponentProps<"div">

function CodeBlockTitle({
  className,
  children,
  ...props
}: CodeBlockTitleProps) {
  return (
    <div
      data-slot="code-block-title"
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2 text-caption text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type CodeBlockFilenameProps = React.ComponentProps<"span">

function CodeBlockFilename({
  className,
  children,
  ...props
}: CodeBlockFilenameProps) {
  return (
    <span
      data-slot="code-block-filename"
      className={cn(
        "min-w-0 truncate font-mono text-xs leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export type CodeBlockActionsProps = React.ComponentProps<"div">

function CodeBlockActions({
  className,
  children,
  ...props
}: CodeBlockActionsProps) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn("ms-auto flex shrink-0 items-center gap-1", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export type CodeBlockContentProps = {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

function CodeBlockContent({
  code,
  language = "plaintext",
  showLineNumbers = false,
  className,
}: CodeBlockContentProps) {
  const resolved = resolveLanguage(language)
  const html = React.useMemo(() => {
    if (!code) {
      return ""
    }
    return highlight(code, { lang: resolved })
  }, [code, resolved])

  return (
    <pre
      data-slot="code-block-body"
      data-line-numbers={showLineNumbers ? "true" : undefined}
      className={cn(
        "cubix-scrollbar cubix-code-block max-h-[28rem] overflow-auto p-3.5 text-xs leading-[1.55]",
        sugarHighVars,
        showLineNumbers && "cubix-code-block-lines ps-0",
        !code && "min-h-16",
        className
      )}
    >
      <code
        data-slot="code-block-code"
        className="font-mono text-xs leading-[1.55] text-foreground"
        dangerouslySetInnerHTML={{
          __html: code ? html : "&nbsp;",
        }}
      />
    </pre>
  )
}

export type CodeBlockCopyButtonProps = React.ComponentProps<typeof Button> & {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
}

function CodeBlockCopyButton({
  className,
  onCopy,
  onError,
  timeout = 2000,
  children,
  ...props
}: CodeBlockCopyButtonProps) {
  const { code } = useCodeBlock()
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<number>(0)

  React.useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current)
    },
    []
  )

  const copyToClipboard = React.useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"))
      return
    }

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      onCopy?.()
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), timeout)
    } catch (error) {
      onError?.(error as Error)
    }
  }, [code, onCopy, onError, timeout])

  return (
    <Button
      type="button"
      data-slot="code-block-copy-button"
      variant="ghost"
      size="icon-xs"
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "text-muted-foreground hover:text-foreground",
        className
      )}
      onClick={copyToClipboard}
      {...props}
    >
      {children ??
        (copied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        ))}
    </Button>
  )
}

export type CodeBlockLanguageSelectorProps = React.ComponentProps<typeof Select>

function CodeBlockLanguageSelector(props: CodeBlockLanguageSelectorProps) {
  return <Select data-slot="code-block-language-selector" {...props} />
}

export type CodeBlockLanguageSelectorTriggerProps = React.ComponentProps<
  typeof SelectTrigger
>

function CodeBlockLanguageSelectorTrigger({
  className,
  ...props
}: CodeBlockLanguageSelectorTriggerProps) {
  return (
    <SelectTrigger
      data-slot="code-block-language-selector-trigger"
      size="sm"
      className={cn(
        "h-6 gap-1 border-transparent bg-transparent px-1.5 text-caption text-muted-foreground shadow-none hover:bg-muted hover:text-foreground dark:bg-transparent dark:hover:bg-muted",
        className
      )}
      {...props}
    />
  )
}

export type CodeBlockLanguageSelectorValueProps = React.ComponentProps<
  typeof SelectValue
>

function CodeBlockLanguageSelectorValue(
  props: CodeBlockLanguageSelectorValueProps
) {
  return (
    <SelectValue data-slot="code-block-language-selector-value" {...props} />
  )
}

export type CodeBlockLanguageSelectorContentProps = React.ComponentProps<
  typeof SelectContent
>

function CodeBlockLanguageSelectorContent({
  align = "end",
  className,
  ...props
}: CodeBlockLanguageSelectorContentProps) {
  return (
    <SelectContent
      data-slot="code-block-language-selector-content"
      align={align}
      className={cn("min-w-36", className)}
      {...props}
    />
  )
}

export type CodeBlockLanguageSelectorItemProps = React.ComponentProps<
  typeof SelectItem
>

function CodeBlockLanguageSelectorItem(
  props: CodeBlockLanguageSelectorItemProps
) {
  return (
    <SelectItem data-slot="code-block-language-selector-item" {...props} />
  )
}

function CodeBlockFileIcon({
  className,
  ...props
}: React.ComponentProps<typeof FileIcon>) {
  return (
    <FileIcon
      data-slot="code-block-file-icon"
      className={cn("size-3.5 shrink-0 opacity-70", className)}
      {...props}
    />
  )
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockFilename,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  CodeBlockFileIcon,
  useCodeBlock,
  resolveLanguage,
}
