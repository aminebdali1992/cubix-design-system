import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { TextareaCustomDemo } from "./examples/textarea-custom-demo"
import { TextareaDemo } from "./examples/textarea-demo"
import { TextareaDisabledDemo } from "./examples/textarea-disabled-demo"
import { TextareaFormDemo } from "./examples/textarea-form-demo"
import { TextareaHeightDemo } from "./examples/textarea-height-demo"
import { TextareaIconsDemo } from "./examples/textarea-icons-demo"
import { TextareaInvalidDemo } from "./examples/textarea-invalid-demo"
import { TextareaLabelDemo } from "./examples/textarea-label-demo"
import { textareaControlPropRows, textareaPropRows } from "./textarea-table-data"

const description =
  "A multi-line text control with optional leading icons. Resize from the corner; pair with your own label and help text."

export const metadata: Metadata = {
  title: "Textarea",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/textarea"
const EXAMPLES_DIR = "app/docs/components/textarea/examples"

function loadTextareaExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `TextareaControl
├── Icon data-icon="inline-start" | "inline-end"
└── Textarea`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  previewClassName,
  children,
}: {
  title: string
  description: ReactNode
  code: string
  previewClassName?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code} previewClassName={previewClassName}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function TextareaPage() {
  const demoSource = loadTextareaExample("textarea-demo.tsx")
  const labelSource = loadTextareaExample("textarea-label-demo.tsx")
  const iconsSource = loadTextareaExample("textarea-icons-demo.tsx")
  const heightSource = loadTextareaExample("textarea-height-demo.tsx")
  const invalidSource = loadTextareaExample("textarea-invalid-demo.tsx")
  const disabledSource = loadTextareaExample("textarea-disabled-demo.tsx")
  const formSource = loadTextareaExample("textarea-form-demo.tsx")
  const customSource = loadTextareaExample("textarea-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Textarea" description={description} slug="textarea" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <TextareaDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="textarea" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap <Code>Textarea</Code> in <Code>TextareaControl</Code> when you need a bordered
          surface, icons, or the resize grip. Label and help text stay outside the control so you
          can wire <Code>htmlFor</Code> and live regions yourself.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Associate a visible <Code>label</Code> with the textarea via <Code>htmlFor</Code> and{" "}
          <Code>id</Code>. Pass <Code>aria-invalid</Code> for error styles, and keep helper or error
          copy in a sibling element that you can wire with <Code>aria-describedby</Code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Label and description"
          description="Pair the control with a native label and caption for a complete field."
          code={labelSource}
        >
          <TextareaLabelDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons"
          description={
            <>
              Place icons inside <Code>TextareaControl</Code> with <Code>data-icon</Code> like
              Button so spacing follows the reading direction.
            </>
          }
          code={iconsSource}
        >
          <TextareaIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Height"
          description={
            <>
              Override the minimum height with <Code>className</Code> on <Code>Textarea</Code>. The
              corner grip still resizes within the control.
            </>
          }
          code={heightSource}
        >
          <TextareaHeightDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>aria-invalid</Code> on the textarea to apply destructive styles, and show
              your own error copy below.
            </>
          }
          code={invalidSource}
        >
          <TextareaInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description="Disable the textarea to block editing. The control uses a muted fill; label and description stay readable."
          code={disabledSource}
        >
          <TextareaDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="In a form"
          description={
            <>
              Set <Code>name</Code> on <Code>Textarea</Code> so the value is submitted with the
              form, and pair it with Cubix Button.
            </>
          }
          code={formSource}
          previewClassName="bg-muted"
        >
          <TextareaFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Every part accepts a <Code>className</Code> merged with the shipped <Code>cn</Code>{" "}
              helper. Here the control uses a filled surface instead of the default outline.
            </>
          }
          code={customSource}
        >
          <TextareaCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>textarea</Code>, <Code>textarea-control</Code>) for targeting in tests
            and parent selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Textarea</h3>
        <PropsTable data={textareaPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TextareaControl</h3>
        <PropsTable data={textareaControlPropRows} />
      </section>
    </article>
  )
}
