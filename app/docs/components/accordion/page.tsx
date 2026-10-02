import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { KeyboardTable } from "@/components/docs/keyboard-table"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import {
  accordionContentPropRows,
  accordionItemPropRows,
  accordionKeyboardRows,
  accordionPropRows,
  accordionTriggerPropRows,
} from "./accordion-table-data"
import { AccordionControlledDemo } from "./examples/accordion-controlled-demo"
import { AccordionCustomDemo } from "./examples/accordion-custom-demo"
import { AccordionDemo } from "./examples/accordion-demo"
import { AccordionDisabledDemo } from "./examples/accordion-disabled-demo"
import { AccordionDisabledItemDemo } from "./examples/accordion-disabled-item-demo"
import { AccordionIconDemo } from "./examples/accordion-icon-demo"
import { AccordionMultipleDemo } from "./examples/accordion-multiple-demo"

const description =
  "A vertically stacked set of interactive headings that each reveal a section of content."

export const metadata: Metadata = {
  title: "Accordion",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/accordion"
const EXAMPLES_DIR = "app/docs/components/accordion/examples"

function loadAccordionExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Accordion
└── AccordionItem (value)
    ├── AccordionTrigger
    └── AccordionContent`

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

export default function AccordionPage() {
  const demoSource = loadAccordionExample("accordion-demo.tsx")
  const multipleSource = loadAccordionExample("accordion-multiple-demo.tsx")
  const controlledSource = loadAccordionExample("accordion-controlled-demo.tsx")
  const disabledItemSource = loadAccordionExample("accordion-disabled-item-demo.tsx")
  const disabledSource = loadAccordionExample("accordion-disabled-demo.tsx")
  const iconSource = loadAccordionExample("accordion-icon-demo.tsx")
  const customSource = loadAccordionExample("accordion-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Accordion" description={description} slug="accordion" />

      <ComponentPreview code={demoSource} previewClassName="min-h-72">
        <PreviewShell>
          <AccordionDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="accordion" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each <Code>AccordionItem</Code> holds one trigger and one content panel and is identified
          by its <Code>value</Code>. The chevron sits at the inline end, so it moves to the left in
          RTL without a flip.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Every trigger is a button inside an <Code>h3</Code>, so the section titles stay in the
          page outline. The trigger exposes <Code>aria-expanded</Code> and{" "}
          <Code>aria-controls</Code>, and each panel is a region labelled by its trigger. Panel
          height animates and the animation is removed when reduced motion is on.
        </p>
        <KeyboardTable data={accordionKeyboardRows} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Multiple"
          description={
            <>
              Set <Code>multiple</Code> to keep any number of items open and pass every open item to{" "}
              <Code>defaultValue</Code>.
            </>
          }
          code={multipleSource}
          previewClassName="min-h-72"
        >
          <AccordionMultipleDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Pass <Code>value</Code> and <Code>onValueChange</Code> to own the open items, for
              example to open or close every item from outside. Both modes use a{" "}
              <Code>string[]</Code>; in single mode it holds at most one value.
            </>
          }
          code={controlledSource}
          previewClassName="min-h-72"
        >
          <AccordionControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled item"
          description={
            <>
              Set <Code>disabled</Code> on an <Code>AccordionItem</Code> to keep it visible but
              locked. Arrow key navigation skips it.
            </>
          }
          code={disabledItemSource}
          previewClassName="min-h-72"
        >
          <AccordionDisabledItemDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description={
            <>
              Set <Code>disabled</Code> on <Code>Accordion</Code> to lock every item in its current
              state, for example a finished order timeline.
            </>
          }
          code={disabledSource}
          previewClassName="min-h-72"
        >
          <AccordionDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="With icon"
          description={
            <>
              Pass <Code>icon</Code> to <Code>AccordionTrigger</Code> to show an icon at the inline
              start, before the heading text. The icon is hidden from assistive technology and SVGs
              default to 24px.
            </>
          }
          code={iconSource}
          previewClassName="min-h-72"
        >
          <AccordionIconDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Every part accepts a <Code>className</Code> merged with <Code>cn</Code>. Here each
              item is a separate card with a muted surface, and the root adds a gap between them.
            </>
          }
          code={customSource}
          previewClassName="min-h-72"
        >
          <AccordionCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>accordion</Code>, <Code>accordion-item</Code>,{" "}
            <Code>accordion-header</Code>, <Code>accordion-trigger</Code>,{" "}
            <Code>accordion-trigger-title</Code>, <Code>accordion-trigger-icon-start</Code>,{" "}
            <Code>accordion-trigger-icon</Code>, <Code>accordion-content</Code>) for targeting in
            tests and parent selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Accordion</h3>
        <PropsTable data={accordionPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AccordionItem</h3>
        <PropsTable data={accordionItemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AccordionTrigger</h3>
        <PropsTable data={accordionTriggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AccordionContent</h3>
        <PropsTable data={accordionContentPropRows} />
      </section>
    </article>
  )
}
