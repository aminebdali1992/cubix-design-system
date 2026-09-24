import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  PromptInputAttachmentsDemo,
  PromptInputConversationDemo,
  PromptInputDemo,
  PromptInputDisabledDemo,
  PromptInputEmptyDemo,
  PromptInputErrorStatusDemo,
  PromptInputProviderDemo,
  PromptInputStatusDemo,
  PromptInputStreamingDemo,
  PromptInputSubmittedDemo,
  PromptInputToolsDemo,
  PromptInputTypingDemo,
  PromptInputValidationDemo,
} from "@/components/examples/prompt-input-examples"

import {
  promptInputPropRows,
  promptInputProviderPropRows,
  promptInputSubmitPropRows,
  promptInputTextareaPropRows,
} from "./prompt-input-table-data"

const description =
  "AI prompt composer with actions, file attachments, and submit controls."

export const metadata: Metadata = {
  title: "Prompt Input",
  description,
}

const usageImport = `import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/cubix/prompt-input"`

const usageSnippet = `<PromptInput onSubmit={handleSubmit}>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputTools />
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>`

const compositionSnippet = `PromptInput
├── PromptInputHeader
│   └── PromptInputAttachments → PromptInputAttachment
├── PromptInputBody
│   └── PromptInputTextarea
└── PromptInputFooter
    ├── PromptInputTools
    │   ├── PromptInputActionMenu
    │   ├── PromptInputButton
    │   └── PromptInputSelect
    └── PromptInputSubmit`

const demoSnippet = `<PromptInput multiple onSubmit={handleSubmit}>
  <PromptInputHeader>
    <PromptInputAttachments>
      {(file) => <PromptInputAttachment key={file.id} data={file} />}
    </PromptInputAttachments>
  </PromptInputHeader>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputTools>
      <PromptInputActionMenu>
        <PromptInputActionMenuTrigger />
        <PromptInputActionMenuContent>
          <PromptInputActionAddAttachments />
          <PromptInputActionAddScreenshot />
        </PromptInputActionMenuContent>
      </PromptInputActionMenu>
    </PromptInputTools>
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>`

const emptySnippet = `<PromptInputSubmit disabled />`

const typingSnippet = `<PromptInputProvider initialInput="Summarize the deploy checklist.">
  <PromptInput onSubmit={handleSubmit}>
    ...
  </PromptInput>
</PromptInputProvider>`

const attachmentsSnippet = `<PromptInput accept="image/*,.pdf" multiple maxFiles={4} onSubmit={...}>
  <PromptInputHeader>
    <PromptInputAttachments>
      {(file) => <PromptInputAttachment key={file.id} data={file} />}
    </PromptInputAttachments>
  </PromptInputHeader>
  ...
</PromptInput>`

const statusSnippet = `<PromptInputSubmit status={status} onStop={stop} />
{/* ready | submitted | streaming | error */}`

const toolsSnippet = `<PromptInputTools>
  <PromptInputActionMenu>...</PromptInputActionMenu>
  <PromptInputButton tooltip="Web search">
    <GlobeIcon /> Search
  </PromptInputButton>
  <PromptInputSelect value={model} onValueChange={setModel}>
    <PromptInputSelectTrigger size="sm">
      <PromptInputSelectValue />
    </PromptInputSelectTrigger>
    <PromptInputSelectContent>...</PromptInputSelectContent>
  </PromptInputSelect>
</PromptInputTools>`

const validationSnippet = `<PromptInput
  accept="image/*"
  maxFiles={2}
  maxFileSize={200_000}
  onError={(error) => setError(error.message)}
  onSubmit={handleSubmit}
/>`

const providerSnippet = `<PromptInputProvider initialInput="Lifted text">
  <PromptInput onSubmit={handleSubmit}>...</PromptInput>
</PromptInputProvider>`

const conversationSnippet = `<PromptInput onSubmit={send}>
  ...
  <PromptInputSubmit status={status} onStop={stop} />
</PromptInput>`

export default function PromptInputDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Prompt Input"
        description={description}
        slug="prompt-input"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">PromptInput</code> is the chat
        composer: auto-growing textarea, attachment chips, action menu, tool
        buttons, model select, and a submit control that tracks ready,
        submitted, streaming, and error. Pair it with Conversation above the
        fold.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-48">
        <PromptInputDemo />
      </ComponentPreview>

      <ComponentInstall name="prompt-input" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Enter submits,
            Shift+Enter inserts a newline. Paste or drop files onto the form.
            Backspace on an empty field removes the last attachment.
          </p>
        </div>
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
          <li>Input Group shell with header attachments and footer tools</li>
          <li>Submit statuses: ready, submitted, streaming (stop), error</li>
          <li>File attach, paste, drop, screenshot, and accept / size limits</li>
          <li>Optional PromptInputProvider for lifted text and files</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Empty</h2>
        <p className="text-muted-foreground">
          Disable submit until there is text or at least one attachment.
        </p>
        <ComponentPreview code={emptySnippet} previewClassName="min-h-40">
          <PromptInputEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Typing</h2>
        <p className="text-muted-foreground">
          Use PromptInputProvider when text should live outside the form.
        </p>
        <ComponentPreview code={typingSnippet} previewClassName="min-h-40">
          <PromptInputTypingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Attachments
        </h2>
        <p className="text-muted-foreground">
          Header chips render via Attachment. Remove from the chip or with
          Backspace when the field is empty.
        </p>
        <ComponentPreview
          code={attachmentsSnippet}
          previewClassName="min-h-48"
        >
          <PromptInputAttachmentsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Submit status
        </h2>
        <p className="text-muted-foreground">
          Drive the button from your chat transport. Streaming with onStop turns
          the control into a stop action.
        </p>
        <ComponentPreview code={statusSnippet} previewClassName="min-h-52">
          <PromptInputStatusDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Submitted</h2>
        <ComponentPreview
          code={`<PromptInputSubmit status="submitted" />`}
          previewClassName="min-h-40"
        >
          <PromptInputSubmittedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Streaming</h2>
        <ComponentPreview
          code={`<PromptInputSubmit status="streaming" onStop={stop} />`}
          previewClassName="min-h-40"
        >
          <PromptInputStreamingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Error</h2>
        <ComponentPreview
          code={`<PromptInputSubmit status="error" />`}
          previewClassName="min-h-40"
        >
          <PromptInputErrorStatusDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Tools</h2>
        <p className="text-muted-foreground">
          Footer tools hold the action menu, toggles, and a compact model
          select. A dedicated Model Selector component can replace the select
          later.
        </p>
        <ComponentPreview code={toolsSnippet} previewClassName="min-h-48">
          <PromptInputToolsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Disabled</h2>
        <ComponentPreview
          code={`<PromptInputTextarea disabled />`}
          previewClassName="min-h-40"
        >
          <PromptInputDisabledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Validation
        </h2>
        <ComponentPreview
          code={validationSnippet}
          previewClassName="min-h-48"
        >
          <PromptInputValidationDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Provider</h2>
        <ComponentPreview code={providerSnippet} previewClassName="min-h-48">
          <PromptInputProviderDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With conversation
        </h2>
        <p className="text-muted-foreground">
          Typical chat layout: transcript above, composer below, status tied to
          the active turn.
        </p>
        <ComponentPreview
          code={conversationSnippet}
          previewClassName="min-h-64"
        >
          <PromptInputConversationDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="font-medium">PromptInput</h3>
        <PropsTable data={promptInputPropRows} />
        <h3 className="font-medium">PromptInputProvider</h3>
        <PropsTable data={promptInputProviderPropRows} />
        <h3 className="font-medium">PromptInputTextarea</h3>
        <PropsTable data={promptInputTextareaPropRows} />
        <h3 className="font-medium">PromptInputSubmit</h3>
        <PropsTable data={promptInputSubmitPropRows} />
      </section>
    </article>
  )
}
