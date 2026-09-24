import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ModelSelectorCheckedDemo,
  ModelSelectorControlledDemo,
  ModelSelectorDemo,
  ModelSelectorDisabledDemo,
  ModelSelectorEmptyDemo,
  ModelSelectorLogosDemo,
  ModelSelectorPromptInputDemo,
  ModelSelectorSearchDemo,
  ModelSelectorShortcutsDemo,
} from "@/components/examples/model-selector-examples"

import {
  modelSelectorContentPropRows,
  modelSelectorItemPropRows,
  modelSelectorLogoPropRows,
  modelSelectorPropRows,
} from "./model-selector-table-data"

const description =
  "Select models and providers from the chat header or composer toolbar."

export const metadata: Metadata = {
  title: "Model Selector",
  description,
}

const usageImport = `import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorTrigger,
} from "@/components/cubix/model-selector"`

const usageSnippet = `<ModelSelector>
  <ModelSelectorTrigger render={<ModelSelectorButton />}>
    <ModelSelectorLogo provider="openai" />
    <ModelSelectorName>GPT-4o</ModelSelectorName>
  </ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput />
    <ModelSelectorList>
      <ModelSelectorEmpty />
      <ModelSelectorGroup heading="OpenAI">
        <ModelSelectorItem value="GPT-4o" checked onSelect={...}>
          <ModelSelectorLogo provider="openai" />
          <ModelSelectorName>GPT-4o</ModelSelectorName>
        </ModelSelectorItem>
      </ModelSelectorGroup>
    </ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>`

const compositionSnippet = `ModelSelector
├── ModelSelectorTrigger
└── ModelSelectorContent
    ├── ModelSelectorInput
    └── ModelSelectorList
        ├── ModelSelectorEmpty
        ├── ModelSelectorGroup
        │   └── ModelSelectorItem
        │       ├── ModelSelectorLogo
        │       ├── ModelSelectorName
        │       └── ModelSelectorShortcut
        └── ModelSelectorSeparator`

const demoSnippet = `<ModelSelector>
  <ModelSelectorTrigger render={<ModelSelectorButton />}>
    ...
  </ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput />
    <ModelSelectorList>...</ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>`

const searchSnippet = `<ModelSelectorInput placeholder="Search models…" />`

const emptySnippet = `<ModelSelectorEmpty>
  No models match that query.
</ModelSelectorEmpty>`

const checkedSnippet = `<ModelSelectorItem value="GPT-4o" checked onSelect={setModel}>
  ...
</ModelSelectorItem>`

const disabledSnippet = `<ModelSelectorItem value="Gemini Legacy" disabled>
  ...
</ModelSelectorItem>`

const logosSnippet = `<ModelSelectorLogo provider="openai" />
<ModelSelectorLogoGroup>
  <ModelSelectorLogo provider="openai" />
  <ModelSelectorLogo provider="anthropic" />
</ModelSelectorLogoGroup>`

const shortcutsSnippet = `<ModelSelectorItem value="GPT-4o">
  <ModelSelectorName>GPT-4o</ModelSelectorName>
  <ModelSelectorShortcut>⌘1</ModelSelectorShortcut>
</ModelSelectorItem>`

const promptSnippet = `<PromptInputTools>
  <ModelSelector>...</ModelSelector>
</PromptInputTools>`

const controlledSnippet = `<ModelSelector open={open} onOpenChange={setOpen}>
  ...
</ModelSelector>`

export default function ModelSelectorDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Model Selector"
        description={description}
        slug="model-selector"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">ModelSelector</code> is a searchable
        dialog for picking chat models by provider. Pair it with the composer
        toolbar or open it from the chat header.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-40">
        <ModelSelectorDemo />
      </ComponentPreview>

      <ComponentInstall name="model-selector" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Features</h2>
        <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
          <li>Searchable command dialog with keyboard navigation</li>
          <li>Provider groups, logos, shortcuts, and checked state</li>
          <li>Works in the Prompt Input toolbar or as a standalone picker</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Search</h2>
        <ComponentPreview code={searchSnippet} previewClassName="min-h-40">
          <ModelSelectorSearchDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Empty</h2>
        <ComponentPreview code={emptySnippet} previewClassName="min-h-40">
          <ModelSelectorEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Checked</h2>
        <ComponentPreview code={checkedSnippet} previewClassName="min-h-48">
          <ModelSelectorCheckedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Disabled</h2>
        <p className="text-muted-foreground">
          Unavailable models stay visible but cannot be selected. Open the
          picker and look for Gemini Legacy.
        </p>
        <ComponentPreview code={disabledSnippet} previewClassName="min-h-40">
          <ModelSelectorDisabledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Logos</h2>
        <ComponentPreview code={logosSnippet} previewClassName="min-h-36">
          <ModelSelectorLogosDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Shortcuts</h2>
        <ComponentPreview code={shortcutsSnippet} previewClassName="min-h-40">
          <ModelSelectorShortcutsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With Prompt Input
        </h2>
        <ComponentPreview code={promptSnippet} previewClassName="min-h-48">
          <ModelSelectorPromptInputDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Controlled</h2>
        <ComponentPreview code={controlledSnippet} previewClassName="min-h-40">
          <ModelSelectorControlledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="font-medium">ModelSelector</h3>
        <PropsTable data={modelSelectorPropRows} />
        <h3 className="font-medium">ModelSelectorContent</h3>
        <PropsTable data={modelSelectorContentPropRows} />
        <h3 className="font-medium">ModelSelectorItem</h3>
        <PropsTable data={modelSelectorItemPropRows} />
        <h3 className="font-medium">ModelSelectorLogo</h3>
        <PropsTable data={modelSelectorLogoPropRows} />
      </section>
    </article>
  )
}
