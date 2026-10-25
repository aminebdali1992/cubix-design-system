"use client"

import { ChevronLeftIcon, FileIcon, FolderIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../docs-collapsible"

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] }

const fileTree: FileTreeItem[] = [
  {
    name: "کامپوننت‌ها",
    items: [
      {
        name: "رابط کاربری",
        items: [{ name: "button.tsx" }, { name: "dialog.tsx" }, { name: "input.tsx" }],
      },
      { name: "login-form.tsx" },
    ],
  },
  {
    name: "کتابخانه",
    items: [{ name: "utils.ts" }, { name: "api.ts" }],
  },
  {
    name: "هوک‌ها",
    items: [{ name: "use-debounce.ts" }, { name: "use-media-query.ts" }],
  },
  { name: "layout.tsx" },
  { name: "package.json" },
]

function FileTreeNode({ item }: { item: FileTreeItem }) {
  if ("items" in item) {
    return (
      <Collapsible>
        <CollapsibleTrigger
          render={<Button variant="ghost" size="sm" className="w-full justify-start" />}
        >
          <ChevronLeftIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4 transition-transform group-data-panel-open/button:-rotate-90" />
          <FolderIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />
          <span>{item.name}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="ms-5 mt-1">
          <div className="flex flex-col gap-1">
            {item.items.map((child) => (
              <FileTreeNode key={child.name} item={child} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Button variant="ghost" size="sm" className="w-full justify-start">
      <FileIcon absoluteStrokeWidth strokeWidth={1.6} className="size-4" />
      <span dir="ltr">{item.name}</span>
    </Button>
  )
}

export function CollapsibleFileTreeDemo() {
  return (
    <div className="flex w-full max-w-[16rem] flex-col gap-1 rounded-lg border p-2">
      {fileTree.map((item) => (
        <FileTreeNode key={item.name} item={item} />
      ))}
    </div>
  )
}