"use client"

import * as React from "react"
import { BotIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/cubix/avatar"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFileIcon,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
  CodeBlockTitle,
} from "@/components/cubix/code-block"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/cubix/message"

const tsSnippet = `export function greet(name: string) {
  return \`Hello, \${name}!\`
}

console.log(greet("Cubix"))`

const jsSnippet = `export function greet(name) {
  return \`Hello, \${name}!\`
}

console.log(greet("Cubix"))`

const pySnippet = `def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("Cubix"))`

const jsonSnippet = `{
  "name": "cubix",
  "version": "0.1.0",
  "private": true
}`

const longSnippet = `import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
}

export default nextConfig

async function loadSources(query: string) {
  const response = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`)
  if (!response.ok) {
    throw new Error("Failed to load sources")
  }
  return response.json()
}`

const shellSnippet = `npx cubix@latest add code-block
npm run dev`

const languages = [
  { value: "typescript", label: "TypeScript", code: tsSnippet },
  { value: "javascript", label: "JavaScript", code: jsSnippet },
  { value: "python", label: "Python", code: pySnippet },
  { value: "json", label: "JSON", code: jsonSnippet },
] as const

export function CodeBlockDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <CodeBlock code={tsSnippet} language="typescript">
        <CodeBlockHeader>
          <CodeBlockTitle>
            <CodeBlockFileIcon />
            <CodeBlockFilename>greet.ts</CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton />
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  )
}

export function CodeBlockMinimalDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <CodeBlock code={jsonSnippet} language="json" />
    </div>
  )
}

export function CodeBlockLineNumbersDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <CodeBlock code={tsSnippet} language="typescript" showLineNumbers>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <CodeBlockFileIcon />
            <CodeBlockFilename>greet.ts</CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton />
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  )
}

export function CodeBlockLanguageDemo() {
  const [language, setLanguage] =
    React.useState<(typeof languages)[number]["value"]>("typescript")
  const active = languages.find((item) => item.value === language) ?? languages[0]

  return (
    <div className="mx-auto w-full max-w-lg">
      <CodeBlock code={active.code} language={language}>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <CodeBlockFileIcon />
            <CodeBlockFilename>
              {language === "typescript"
                ? "greet.ts"
                : language === "javascript"
                  ? "greet.js"
                  : language === "python"
                    ? "greet.py"
                    : "package.json"}
            </CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockLanguageSelector
              value={language}
              onValueChange={(value) => {
                if (typeof value === "string") {
                  setLanguage(value as (typeof languages)[number]["value"])
                }
              }}
            >
              <CodeBlockLanguageSelectorTrigger>
                <CodeBlockLanguageSelectorValue />
              </CodeBlockLanguageSelectorTrigger>
              <CodeBlockLanguageSelectorContent>
                {languages.map((item) => (
                  <CodeBlockLanguageSelectorItem
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </CodeBlockLanguageSelectorItem>
                ))}
              </CodeBlockLanguageSelectorContent>
            </CodeBlockLanguageSelector>
            <CodeBlockCopyButton />
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  )
}

export function CodeBlockShellDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <CodeBlock code={shellSnippet} language="shell">
        <CodeBlockHeader>
          <CodeBlockTitle>
            <CodeBlockFilename>Terminal</CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton />
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  )
}

export function CodeBlockLongDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <CodeBlock code={longSnippet} language="typescript" showLineNumbers>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <CodeBlockFileIcon />
            <CodeBlockFilename>next.config.ts</CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton />
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  )
}

export function CodeBlockStreamingDemo() {
  const full = tsSnippet
  const [text, setText] = React.useState("")
  const [running, setRunning] = React.useState(true)

  React.useEffect(() => {
    if (!running) {
      return
    }

    if (text.length >= full.length) {
      const pause = window.setTimeout(() => {
        setText("")
      }, 1200)
      return () => window.clearTimeout(pause)
    }

    const id = window.setTimeout(() => {
      setText(full.slice(0, text.length + 3))
    }, 40)

    return () => window.clearTimeout(id)
  }, [full, running, text])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3">
      <button
        type="button"
        className="self-start text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        onClick={() => {
          setRunning((value) => !value)
          if (!running) {
            setText("")
          }
        }}
      >
        {running ? "Pause stream" : "Resume stream"}
      </button>
      <CodeBlock code={text} language="typescript" showLineNumbers>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <CodeBlockFileIcon />
            <CodeBlockFilename>greet.ts</CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton />
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  )
}

export function CodeBlockEmptyDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <CodeBlock code="" language="typescript">
        <CodeBlockHeader>
          <CodeBlockTitle>
            <CodeBlockFileIcon />
            <CodeBlockFilename>untitled.ts</CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton />
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  )
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

export function CodeBlockMessageDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              Drop this helper into your project, then call it from the
              composer.
            </BubbleContent>
          </Bubble>
          <CodeBlock code={tsSnippet} language="typescript">
            <CodeBlockHeader>
              <CodeBlockTitle>
                <CodeBlockFileIcon />
                <CodeBlockFilename>greet.ts</CodeBlockFilename>
              </CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton />
              </CodeBlockActions>
            </CodeBlockHeader>
          </CodeBlock>
        </MessageContent>
      </Message>
    </div>
  )
}
