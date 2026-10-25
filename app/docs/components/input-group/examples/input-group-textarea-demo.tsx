"use client"

import { useState, type SyntheticEvent } from "react"

import { CopyIcon, DocumentIcon, RefreshIcon, TickIcon } from "@/components/docs/empty-icons"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "../docs-input-group"

const toFa = (value: number) => value.toLocaleString("fa-IR")

export function InputGroupTextareaDemo() {
  const [code, setCode] = useState("")
  const [position, setPosition] = useState({ line: 1, column: 1 })
  const [copied, setCopied] = useState(false)

  function updatePosition(event: SyntheticEvent<HTMLTextAreaElement>) {
    const { value, selectionStart } = event.currentTarget
    const lines = value.slice(0, selectionStart).split("\n")
    setCode(value)
    setPosition({ line: lines.length, column: lines[lines.length - 1].length + 1 })
  }

  function copyCode() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          dir="ltr"
          placeholder="console.log('سلام دنیا');"
          className="min-h-[200px] font-mono"
          onInput={updatePosition}
          onSelect={updatePosition}
          onClick={updatePosition}
          onKeyUp={updatePosition}
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>
            خط {toFa(position.line)}، ستون {toFa(position.column)}
          </InputGroupText>
          <InputGroupButton size="sm" variant="default" className="ms-auto">
            اجرا
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b">
          <DocumentIcon />
          <InputGroupText className="font-mono">script.js</InputGroupText>
          <InputGroupButton size="icon-xs" className="ms-auto" aria-label="بارگذاری دوباره">
            <RefreshIcon />
          </InputGroupButton>
          <InputGroupButton size="icon-xs" aria-label="کپی" onClick={copyCode}>
            {copied ? <TickIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}