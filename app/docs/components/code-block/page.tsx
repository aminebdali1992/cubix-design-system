import type { Metadata } from "next"

import { CodeBlock as DocsCodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  CodeBlockDemo,
  CodeBlockEmptyDemo,
  CodeBlockLanguageDemo,
  CodeBlockLineNumbersDemo,
  CodeBlockLongDemo,
  CodeBlockMessageDemo,
  CodeBlockMinimalDemo,
  CodeBlockShellDemo,
  CodeBlockStreamingDemo,
} from "@/components/examples/code-block-examples"

import {
  codeBlockCopyButtonPropRows,
  codeBlockLanguageSelectorPropRows,
  codeBlockPropRows,
} from "./code-block-table-data"

const description =
  "Syntax-highlighted code surface for assistant replies with copy actions."

export const metadata: Metadata = {
  title: "Code Block",
  description,
}

const usageImport = `import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFileIcon,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/cubix/code-block"`

const usageSnippet = `<CodeBlock code={code} language="typescript">
  <CodeBlockHeader>
    <CodeBlockTitle>
      <CodeBlockFileIcon />
      <CodeBlockFilename>greet.ts</CodeBlockFilename>
    </CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton />
    </CodeBlockActions>
  </CodeBlockHeader>
</CodeBlock>`

const compositionSnippet = `CodeBlock
├── CodeBlockHeader
│   ├── CodeBlockTitle
│   │   ├── CodeBlockFileIcon
│   │   └── CodeBlockFilename
│   └── CodeBlockActions
│       ├── CodeBlockLanguageSelector
│       └── CodeBlockCopyButton
└── CodeBlockContent (rendered automatically)`

const demoSnippet = usageSnippet

const minimalSnippet = `<CodeBlock code={code} language="json" />`

const linesSnippet = `<CodeBlock code={code} language="typescript" showLineNumbers>
  ...
</CodeBlock>`

const languageSnippet = `<CodeBlock code={code} language={language}>
  <CodeBlockHeader>
    ...
    <CodeBlockActions>
      <CodeBlockLanguageSelector value={language} onValueChange={setLanguage}>
        <CodeBlockLanguageSelectorTrigger>
          <CodeBlockLanguageSelectorValue />
        </CodeBlockLanguageSelectorTrigger>
        <CodeBlockLanguageSelectorContent>
          <CodeBlockLanguageSelectorItem value="typescript">
            TypeScript
          </CodeBlockLanguageSelectorItem>
        </CodeBlockLanguageSelectorContent>
      </CodeBlockLanguageSelector>
      <CodeBlockCopyButton />
    </CodeBlockActions>
  </CodeBlockHeader>
</CodeBlock>`

const shellSnippet = `<CodeBlock code={commands} language="shell">
  <CodeBlockHeader>
    <CodeBlockTitle>
      <CodeBlockFilename>Terminal</CodeBlockFilename>
    </CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton />
    </CodeBlockActions>
  </CodeBlockHeader>
</CodeBlock>`

const streamingSnippet = `<CodeBlock code={partialCode} language="typescript" showLineNumbers>
  ...
</CodeBlock>`

const messageSnippet = `<Message>
  <MessageContent>
    <Bubble>...</Bubble>
    <CodeBlock code={code} language="typescript">...</CodeBlock>
  </MessageContent>
</Message>`

export default function CodeBlockDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Code Block"
        description={description}
        slug="code-block"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">CodeBlock</code> renders assistant
        code with sugar-high highlighting, an optional filename header, copy
        action, language switcher, and line numbers.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-56">
        <CodeBlockDemo />
      </ComponentPreview>

      <ComponentInstall name="code-block" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <DocsCodeBlock code={usageImport} title="Import" />
        <DocsCodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <DocsCodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Features</h2>
        <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
          <li>Filename header with copy button</li>
          <li>Lightweight sugar-high highlighting that stays fast while streaming</li>
          <li>Optional line numbers and language selector</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Minimal</h2>
        <ComponentPreview code={minimalSnippet} previewClassName="min-h-40">
          <CodeBlockMinimalDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Line numbers
        </h2>
        <ComponentPreview code={linesSnippet} previewClassName="min-h-56">
          <CodeBlockLineNumbersDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Language selector
        </h2>
        <ComponentPreview code={languageSnippet} previewClassName="min-h-56">
          <CodeBlockLanguageDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Shell</h2>
        <ComponentPreview code={shellSnippet} previewClassName="min-h-40">
          <CodeBlockShellDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Long content
        </h2>
        <ComponentPreview
          code={`<CodeBlock code={longCode} showLineNumbers />`}
          previewClassName="min-h-64"
        >
          <CodeBlockLongDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Streaming</h2>
        <ComponentPreview code={streamingSnippet} previewClassName="min-h-56">
          <CodeBlockStreamingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Empty</h2>
        <ComponentPreview
          code={`<CodeBlock code="" language="typescript" />`}
          previewClassName="min-h-36"
        >
          <CodeBlockEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          In a message
        </h2>
        <ComponentPreview code={messageSnippet} previewClassName="min-h-72">
          <CodeBlockMessageDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="font-medium">CodeBlock</h3>
        <PropsTable data={codeBlockPropRows} />
        <h3 className="font-medium">CodeBlockCopyButton</h3>
        <PropsTable data={codeBlockCopyButtonPropRows} />
        <h3 className="font-medium">CodeBlockLanguageSelector</h3>
        <PropsTable data={codeBlockLanguageSelectorPropRows} />
      </section>
    </article>
  )
}
