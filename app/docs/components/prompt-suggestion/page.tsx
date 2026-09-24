import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  PromptSuggestionActiveDemo,
  PromptSuggestionConversationDemo,
  PromptSuggestionDemo,
  PromptSuggestionDisabledDemo,
  PromptSuggestionEmptyDemo,
  PromptSuggestionIconsDemo,
  PromptSuggestionInputDemo,
  PromptSuggestionLoadingDemo,
  PromptSuggestionScrollDemo,
  PromptSuggestionVariantsDemo,
  PromptSuggestionWrapDemo,
} from "@/components/examples/prompt-suggestion-examples"

import {
  promptSuggestionPropRows,
  promptSuggestionsEmptyPropRows,
  promptSuggestionsPropRows,
} from "./prompt-suggestion-table-data"

const description =
  "One-tap suggestion chips that seed the prompt composer with starter prompts."

export const metadata: Metadata = {
  title: "Prompt Suggestion",
  description,
}

const usageImport = `import {
  PromptSuggestion,
  PromptSuggestions,
} from "@/components/cubix/prompt-suggestion"`

const usageSnippet = `<PromptSuggestions>
  <PromptSuggestion
    suggestion="Summarize the deploy checklist"
    onClick={setPrompt}
  />
</PromptSuggestions>`

const compositionSnippet = `PromptSuggestions
├── PromptSuggestion
└── PromptSuggestionsEmpty`

const demoSnippet = `<PromptSuggestions>
  {prompts.map((prompt) => (
    <PromptSuggestion
      key={prompt}
      suggestion={prompt}
      active={active === prompt}
      onClick={setActive}
    />
  ))}
</PromptSuggestions>`

const iconsSnippet = `<PromptSuggestion suggestion="Improve this prompt" onClick={setPrompt}>
  <WandSparklesIcon data-icon="inline-start" />
  Improve this prompt
</PromptSuggestion>`

const activeSnippet = `<PromptSuggestion suggestion="Selected plan" active />`

const disabledSnippet = `<PromptSuggestion suggestion="Unavailable" disabled />`

const emptySnippet = `<PromptSuggestionsEmpty>
  No starter prompts for this workspace yet.
</PromptSuggestionsEmpty>`

const scrollSnippet = `<PromptSuggestions>
  {manyPrompts.map((prompt) => (
    <PromptSuggestion key={prompt} suggestion={prompt} />
  ))}
</PromptSuggestions>`

const wrapSnippet = `<PromptSuggestions orientation="wrap">
  ...
</PromptSuggestions>`

const loadingSnippet = `<PromptSuggestions aria-busy="true">
  <Skeleton className="h-8 w-28 rounded-full" />
  ...
</PromptSuggestions>`

const inputSnippet = `<PromptSuggestion
  suggestion={prompt}
  onClick={(value) => controller.textInput.setInput(value)}
/>`

const conversationSnippet = `<PromptSuggestions orientation="wrap" className="justify-center">
  ...
</PromptSuggestions>`

export default function PromptSuggestionDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Prompt Suggestion"
        description={description}
        slug="prompt-suggestion"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">PromptSuggestion</code> chips sit
        above or beside the composer and insert a starter prompt on click. Use{" "}
        <code className="font-mono text-sm">PromptSuggestions</code> for a
        scrolling row or a wrapping grid.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-40">
        <PromptSuggestionDemo />
      </ComponentPreview>

      <ComponentInstall name="prompt-suggestion" />

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
          <li>Horizontal scroll or wrap layouts for starter prompts</li>
          <li>Active, disabled, icon, and loading chip states</li>
          <li>Works with PromptInputProvider to seed the composer</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">With icons</h2>
        <ComponentPreview code={iconsSnippet} previewClassName="min-h-36">
          <PromptSuggestionIconsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Active</h2>
        <ComponentPreview code={activeSnippet} previewClassName="min-h-36">
          <PromptSuggestionActiveDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Disabled</h2>
        <ComponentPreview code={disabledSnippet} previewClassName="min-h-36">
          <PromptSuggestionDisabledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Empty</h2>
        <ComponentPreview code={emptySnippet} previewClassName="min-h-40">
          <PromptSuggestionEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Horizontal scroll
        </h2>
        <p className="text-muted-foreground">
          Overflowing chips scroll sideways without a visible scrollbar.
        </p>
        <ComponentPreview code={scrollSnippet} previewClassName="min-h-36">
          <PromptSuggestionScrollDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Wrap</h2>
        <ComponentPreview code={wrapSnippet} previewClassName="min-h-40">
          <PromptSuggestionWrapDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Loading</h2>
        <ComponentPreview code={loadingSnippet} previewClassName="min-h-36">
          <PromptSuggestionLoadingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Variants</h2>
        <ComponentPreview
          code={`<PromptSuggestion variant="outline" />`}
          previewClassName="min-h-36"
        >
          <PromptSuggestionVariantsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With Prompt Input
        </h2>
        <p className="text-muted-foreground">
          Pair with PromptInputProvider so a chip can fill the textarea.
        </p>
        <ComponentPreview code={inputSnippet} previewClassName="min-h-56">
          <PromptSuggestionInputDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Empty conversation
        </h2>
        <ComponentPreview
          code={conversationSnippet}
          previewClassName="min-h-64"
        >
          <PromptSuggestionConversationDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="font-medium">PromptSuggestions</h3>
        <PropsTable data={promptSuggestionsPropRows} />
        <h3 className="font-medium">PromptSuggestion</h3>
        <PropsTable data={promptSuggestionPropRows} />
        <h3 className="font-medium">PromptSuggestionsEmpty</h3>
        <PropsTable data={promptSuggestionsEmptyPropRows} />
      </section>
    </article>
  )
}
