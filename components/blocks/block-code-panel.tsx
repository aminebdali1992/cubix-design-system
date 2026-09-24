"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  FileIcon,
  FolderIcon,
} from "lucide-react"
import { highlight } from "sugar-high"
import { lang as resolveLang } from "sugar-high/lang"

import { cn } from "@/lib/utils"

export type BlockSourceFile = {
  path: string
  content: string
}

type TreeNode = {
  name: string
  path: string
  type: "file" | "folder"
  children?: TreeNode[]
}

function languageFromPath(path: string) {
  const fileName = path.split("/").pop() ?? path
  const extension = fileName.includes(".")
    ? fileName.split(".").pop()
    : undefined
  return resolveLang(extension ?? "") ?? "typescript"
}

function buildFileTree(files: BlockSourceFile[]): TreeNode[] {
  type MutableNode = {
    name: string
    path: string
    type: "file" | "folder"
    children?: Map<string, MutableNode>
  }

  const root = new Map<string, MutableNode>()

  for (const file of files) {
    const parts = file.path.split("/").filter(Boolean)
    let current = root
    let currentPath = ""

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part
      const isFile = index === parts.length - 1

      if (!current.has(part)) {
        current.set(part, {
          name: part,
          path: currentPath,
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : new Map(),
        })
      }

      const node = current.get(part)!
      if (!isFile) {
        if (!node.children) {
          node.children = new Map()
        }
        current = node.children
      }
    })
  }

  function toTree(map: Map<string, MutableNode>): TreeNode[] {
    return Array.from(map.values())
      .sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "folder" ? -1 : 1
        }
        return a.name.localeCompare(b.name)
      })
      .map((node) => ({
        name: node.name,
        path: node.path,
        type: node.type,
        children: node.children ? toTree(node.children) : undefined,
      }))
  }

  return toTree(root)
}

function collectFolderPaths(nodes: TreeNode[]): string[] {
  const paths: string[] = []
  for (const node of nodes) {
    if (node.type === "folder") {
      paths.push(node.path)
      if (node.children) {
        paths.push(...collectFolderPaths(node.children))
      }
    }
  }
  return paths
}

function FileTreeItem({
  node,
  depth,
  activePath,
  expanded,
  onToggle,
  onSelect,
}: {
  node: TreeNode
  depth: number
  activePath: string
  expanded: Set<string>
  onToggle: (path: string) => void
  onSelect: (path: string) => void
}) {
  const isFolder = node.type === "folder"
  const isOpen = expanded.has(node.path)
  const isActive = !isFolder && node.path === activePath

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (isFolder) {
            onToggle(node.path)
            return
          }
          onSelect(node.path)
        }}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md py-1 text-left text-xs outline-none transition-colors",
          "hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring/40",
          isActive
            ? "bg-muted font-medium text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingInlineStart: `${0.5 + depth * 0.75}rem` }}
        aria-expanded={isFolder ? isOpen : undefined}
        aria-current={isActive ? "page" : undefined}
      >
        {isFolder ? (
          <ChevronRightIcon
            className={cn(
              "size-3.5 shrink-0 transition-transform duration-200",
              isOpen && "rotate-90"
            )}
          />
        ) : (
          <span className="size-3.5 shrink-0" aria-hidden />
        )}
        {isFolder ? (
          <FolderIcon className="size-3.5 shrink-0 opacity-70" />
        ) : (
          <FileIcon className="size-3.5 shrink-0 opacity-70" />
        )}
        <span className="truncate">{node.name}</span>
      </button>

      {isFolder && isOpen && node.children ? (
        <div>
          {node.children.map((child) => (
            <FileTreeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              activePath={activePath}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function CopyFileButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors",
        "hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
      )}
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-foreground" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
    </button>
  )
}

function BlockCodeHighlight({
  code,
  path,
}: {
  code: string
  path: string
}) {
  const html = React.useMemo(
    () => highlight(code, { lang: languageFromPath(path) }),
    [code, path]
  )

  return (
    <pre className="cubix-code-block cubix-code-block-lines max-h-none overflow-visible p-4 text-xs leading-[1.55]">
      <code
        className="font-mono text-xs leading-[1.55] text-foreground"
        dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }}
      />
    </pre>
  )
}

export function BlockCodePanel({
  files,
  className,
}: {
  files: BlockSourceFile[]
  className?: string
}) {
  const tree = React.useMemo(() => buildFileTree(files), [files])
  const fileMap = React.useMemo(
    () => new Map(files.map((file) => [file.path, file])),
    [files]
  )

  const defaultPath = files[0]?.path ?? ""
  const [activePath, setActivePath] = React.useState(defaultPath)
  const [expanded, setExpanded] = React.useState(
    () => new Set(collectFolderPaths(tree))
  )
  const fileSelectId = React.useId()

  React.useEffect(() => {
    setActivePath(files[0]?.path ?? "")
    setExpanded(new Set(collectFolderPaths(buildFileTree(files))))
  }, [files])

  const activeFile = fileMap.get(activePath) ?? files[0]

  function toggleFolder(path: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  if (!files.length || !activeFile) {
    return (
      <div
        className={cn(
          "flex h-full items-center justify-center rounded-xl border border-border/80 bg-background text-sm text-muted-foreground",
          className
        )}
      >
        No source files yet.
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex h-full min-h-0 overflow-hidden rounded-xl border border-border/80 bg-background shadow-xs",
        className
      )}
    >
      <aside className="hidden w-56 shrink-0 flex-col border-e border-border/80 bg-muted/30 md:flex">
        <div className="flex h-10 items-center border-b border-border/80 px-3">
          <span className="text-xs font-medium text-muted-foreground">
            Files
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-1.5">
          {tree.map((node) => (
            <FileTreeItem
              key={node.path}
              node={node}
              depth={0}
              activePath={activePath}
              expanded={expanded}
              onToggle={toggleFolder}
              onSelect={setActivePath}
            />
          ))}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-10 items-center gap-2 border-b border-border/80 bg-muted/20 px-3">
          <FileIcon className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
            {activeFile.path}
          </span>
          <div className="md:hidden">
            <label className="sr-only" htmlFor={fileSelectId}>
              Select file
            </label>
            <select
              id={fileSelectId}
              value={activePath}
              onChange={(event) => setActivePath(event.target.value)}
              className="me-1 max-w-36 truncate rounded-md border border-border/80 bg-background px-2 py-1 font-mono text-xs text-foreground outline-none"
            >
              {files.map((file) => (
                <option key={file.path} value={file.path}>
                  {file.path}
                </option>
              ))}
            </select>
          </div>
          <CopyFileButton code={activeFile.content} />
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
          <BlockCodeHighlight
            code={activeFile.content}
            path={activeFile.path}
          />
        </div>
      </div>
    </div>
  )
}
