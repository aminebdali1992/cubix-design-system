import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  LabelCheckboxDemo,
  LabelDemo,
  LabelDisabledDemo,
  LabelInputDemo,
  LabelTextareaDemo,
} from "@/components/examples/label-examples"

import { labelPropRows } from "./label-table-data"

const description = "Renders an accessible label associated with controls."

export const metadata: Metadata = {
  title: "Label",
  description,
}

const usageImport = `import { Label } from "@/components/cubix/label"`

const usageSnippet = `<Label htmlFor="email">Your email address</Label>`

const demoSnippet = `<Field orientation="horizontal">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</Field>`

const checkboxSnippet = `<Field orientation="horizontal">
  <Checkbox id="label-demo-terms" />
  <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
</Field>`

const inputSnippet = `<Field className="w-full max-w-xs">
  <Label htmlFor="label-demo-username">Username</Label>
  <Input id="label-demo-username" placeholder="Username" />
</Field>`

const disabledSnippet = `<Field className="w-full max-w-xs" data-disabled={true}>
  <Label htmlFor="label-demo-disabled">Disabled</Label>
  <Input id="label-demo-disabled" placeholder="Disabled" disabled />
</Field>`

const textareaSnippet = `<Field className="w-full max-w-xs">
  <Label htmlFor="label-demo-message">Message</Label>
  <Textarea id="label-demo-message" placeholder="Message" />
</Field>`

export default function LabelDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Label"
        description={description}
        slug="label"
      />

      <ComponentPreview code={demoSnippet}>
        <LabelDemo />
      </ComponentPreview>

      <ComponentInstall name="label" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With Checkbox
        </h2>
        <ComponentPreview code={checkboxSnippet}>
          <LabelCheckboxDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With Input
        </h2>
        <ComponentPreview code={inputSnippet}>
          <LabelInputDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Disabled</h2>
        <p className="leading-relaxed text-muted-foreground">
          Set <code className="font-mono text-sm">data-disabled</code> on a
          parent group such as{" "}
          <code className="font-mono text-sm">Field</code> to dim the label with
          a disabled control.
        </p>
        <ComponentPreview code={disabledSnippet}>
          <LabelDisabledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With Textarea
        </h2>
        <ComponentPreview code={textareaSnippet}>
          <LabelTextareaDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Label</h3>
          <PropsTable data={labelPropRows} />
        </div>
      </section>
    </article>
  )
}
