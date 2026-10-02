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
import { SelectControlledDemo } from "./examples/select-controlled-demo"
import { SelectDemo } from "./examples/select-demo"
import { SelectDisabledDemo } from "./examples/select-disabled-demo"
import { SelectGroupsDemo } from "./examples/select-groups-demo"
import { SelectInvalidDemo } from "./examples/select-invalid-demo"
import { SelectLabelDemo } from "./examples/select-label-demo"
import { SelectSizesDemo } from "./examples/select-sizes-demo"
import {
  contentPropRows,
  itemPropRows,
  selectPropRows,
  triggerPropRows,
  valuePropRows,
} from "./select-table-data"

const description = "Displays a list of options for the user to pick from, triggered by a button."

export const metadata: Metadata = {
  title: "Select",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/select"
const EXAMPLES_DIR = "app/docs/components/select/examples"

const compositionSnippet = `Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectItem
    ├── SelectGroup
    │   ├── SelectLabel
    │   └── SelectItem
    └── SelectSeparator`

function loadSelectExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

/*
  Docs chrome only - not part of the paste-ready example source. The select
  reads dir / lang from this wrapper, so the popup opens in RTL.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full items-center justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  children,
}: {
  title: string
  description?: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      {description ? <p className="leading-relaxed text-muted-foreground">{description}</p> : null}
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function SelectPage() {
  const demoSource = loadSelectExample("select-demo.tsx")
  const sizesSource = loadSelectExample("select-sizes-demo.tsx")
  const labelSource = loadSelectExample("select-label-demo.tsx")
  const groupsSource = loadSelectExample("select-groups-demo.tsx")
  const disabledSource = loadSelectExample("select-disabled-demo.tsx")
  const invalidSource = loadSelectExample("select-invalid-demo.tsx")
  const controlledSource = loadSelectExample("select-controlled-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Select" description={description} slug="select" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <SelectDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="select" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a <Code>Select</Code>. Padding, the check indicator
          and the popup alignment use logical start and end, and the popup follows the closest{" "}
          <Code>dir</Code> on the page, so the same markup is correct in RTL and LTR.
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <ul className="list-disc space-y-2 ps-5 leading-relaxed text-muted-foreground">
          <li>
            The trigger opens the list with Enter, Space or the arrow keys. Arrow keys move through
            items, typing jumps to a matching item, and Escape closes the list.
          </li>
          <li>
            Give the trigger a name: link a <Code>Label</Code> with <Code>id</Code> and{" "}
            <Code>htmlFor</Code>, or pass <Code>aria-label</Code>.
          </li>
          <li>
            Link helper and error text with <Code>aria-describedby</Code>, and set{" "}
            <Code>aria-invalid</Code> while the value is invalid.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Set <Code>size</Code> on the trigger: <Code>sm</Code> is 32px for toolbars, default is
              40px like Cubix fields, and <Code>lg</Code> is 48px.
            </>
          }
          code={sizesSource}
        >
          <SelectSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Label and description"
          description={
            <>
              Link a <Code>Label</Code> to the trigger and describe the field with{" "}
              <Code>aria-describedby</Code>.
            </>
          }
          code={labelSource}
        >
          <SelectLabelDemo />
        </ExampleSection>

        <ExampleSection
          title="Groups"
          description={
            <>
              Group related items with <Code>SelectGroup</Code> and <Code>SelectLabel</Code>, and
              split groups with <Code>SelectSeparator</Code>.
            </>
          }
          code={groupsSource}
        >
          <SelectGroupsDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description={
            <>
              Set <Code>disabled</Code> on <Code>Select</Code> to disable the whole control, or on a{" "}
              <Code>SelectItem</Code> to disable one option.
            </>
          }
          code={disabledSource}
        >
          <SelectDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>aria-invalid</Code> on the trigger for the destructive border and link the
              error message.
            </>
          }
          code={invalidSource}
        >
          <SelectInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Pass <Code>value</Code> and <Code>onValueChange</Code> to own the selection. A{" "}
              <Code>null</Code> value shows the placeholder.
            </>
          }
          code={controlledSource}
        >
          <SelectControlledDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The same props work on Base UI, React
            Aria and Radix. The trigger shows the label of the selected item on every base.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Select</h3>
        <PropsTable data={selectPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">SelectTrigger</h3>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">SelectValue</h3>
        <PropsTable data={valuePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">SelectContent</h3>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">SelectItem</h3>
        <PropsTable data={itemPropRows} />
      </section>
    </article>
  )
}
