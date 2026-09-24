import type { Metadata } from "next";
import { CircleAlertIcon } from "lucide-react";

import { Button } from "@/components/cubix/button";
import { Textarea } from "@/components/cubix/textarea";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { textareaPropRows } from "./textarea-table-data";

export const metadata: Metadata = {
  title: "Textarea",
  description: "Displays a multiline text input field for longer form content.",
};

const usageImport = `import { Textarea } from "@/components/cubix/textarea"`;

const usageSnippet = `<Textarea placeholder="Type your message here." />`;

export default function TextareaPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Textarea"
        description="Displays a multiline text input field for longer form content."
        slug="textarea"
      />

      <ComponentPreview code={`<Textarea placeholder="Type your message here." />`}>
        <Textarea placeholder="Type your message here." className="max-w-sm" />
      </ComponentPreview>

      <ComponentInstall name="textarea" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With label and helper text
          </h3>
          <ComponentPreview
            code={`<div className="grid w-full max-w-sm gap-2">
  <label htmlFor="message" className="text-sm font-medium">Message</label>
  <Textarea id="message" placeholder="Type your message here." />
  <p className="text-sm text-muted-foreground">Your message will be copied to the support thread.</p>
</div>`}
          >
            <div className="grid w-full max-w-sm gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" placeholder="Type your message here." />
              <p className="text-sm text-muted-foreground">
                Your message will be copied to the support thread.
              </p>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Custom height
          </h3>
          <ComponentPreview code={`<Textarea className="min-h-32" placeholder="Notes" />`}>
            <Textarea className="max-w-sm min-h-32" placeholder="Notes" />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid state
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">aria-invalid</code> to
            switch to destructive border and ring styles � no extra prop needed:
          </p>
          <ComponentPreview code={`<Textarea placeholder="Bio" aria-invalid />`}>
            <Textarea placeholder="Bio" aria-invalid className="max-w-sm" />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <ComponentPreview code={`<Textarea disabled placeholder="Disabled" />`}>
            <Textarea disabled placeholder="Disabled" className="max-w-sm" />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <ComponentPreview
            code={`<form className="grid w-full max-w-sm gap-3">
  <Textarea placeholder="Tell us what you need help with." />
  <Button type="submit">Send message</Button>
</form>`}
          >
            <form className="grid w-full max-w-sm gap-3">
              <Textarea placeholder="Tell us what you need help with." />
              <Button type="submit">Send message</Button>
            </form>
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The textarea
            renders <code className="font-mono">data-slot=&quot;textarea&quot;</code>{" "}
            for targeting in tests and parent selectors, and switches to
            destructive styles automatically when{" "}
            <code className="font-mono">aria-invalid</code> is set.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={textareaPropRows} />
      </section>
    </article>
  );
}
