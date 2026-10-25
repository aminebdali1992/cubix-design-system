import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import {
  addonPropRows,
  buttonPropRows,
  controlPropRows,
  inputGroupColorRows,
  inputGroupPropRows,
  inputGroupTypographyRows,
} from "./input-group-table-data"
import { InputGroupBlockEndDemo } from "./examples/input-group-block-end-demo"
import { InputGroupBlockStartDemo } from "./examples/input-group-block-start-demo"
import { InputGroupButtonDemo } from "./examples/input-group-button-demo"
import { InputGroupDemo } from "./examples/input-group-demo"
import { InputGroupDropdownDemo } from "./examples/input-group-dropdown-demo"
import { InputGroupIconDemo } from "./examples/input-group-icon-demo"
import { InputGroupInlineEndDemo } from "./examples/input-group-inline-end-demo"
import { InputGroupInlineStartDemo } from "./examples/input-group-inline-start-demo"
import { InputGroupSpinnerDemo } from "./examples/input-group-spinner-demo"
import { InputGroupTextDemo } from "./examples/input-group-text-demo"
import { InputGroupTextareaDemo } from "./examples/input-group-textarea-demo"
import { InputGroupVariantDemo } from "./examples/input-group-variant-demo"

const description = "Display additional information or actions inside an input."

export const metadata: Metadata = {
  title: "Input Group",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/input-group"
const EXAMPLES_DIR = "app/docs/components/input-group/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `InputGroup
├── InputGroupInput or InputGroupTextarea
├── InputGroupAddon
├── InputGroupButton
└── InputGroupText`

/* Persian content needs dir="rtl" and lang="fa" so the IRANSans Cubix faces apply. */
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
      {description ? (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function InputGroupDocsPage() {
  const demoSource = loadExample("input-group-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Input Group" description={description} slug="input-group" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <InputGroupDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="input-group" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build an <Code>InputGroup</Code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Align</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <Code>align</Code> prop on <Code>InputGroupAddon</Code> to position
          the addon. Place the addon after the control in the DOM for focus
          management. Inline values are logical, so in RTL <Code>inline-start</Code>{" "}
          sits on the right.
        </p>
        <ExampleSection
          title="inline-start"
          description="Positions the addon at the start of the input (right in RTL). This is the default. The example shows a search field with a search icon."
          code={loadExample("input-group-inline-start-demo.tsx")}
        >
          <InputGroupInlineStartDemo />
        </ExampleSection>
        <ExampleSection
          title="inline-end"
          description="Positions the addon at the end of the input (left in RTL). The example shows a password field with a lock icon."
          code={loadExample("input-group-inline-end-demo.tsx")}
        >
          <InputGroupInlineEndDemo />
        </ExampleSection>
        <ExampleSection
          title="block-start"
          description="Positions the addon above the input. The examples show a full-name input with a header text, and a code textarea with a header bar and copy button."
          code={loadExample("input-group-block-start-demo.tsx")}
        >
          <InputGroupBlockStartDemo />
        </ExampleSection>
        <ExampleSection
          title="block-end"
          description="Positions the addon below the input. The examples show an amount input with a currency footer, and a comment textarea with a character counter and send button."
          code={loadExample("input-group-block-end-demo.tsx")}
        >
          <InputGroupBlockEndDemo />
        </ExampleSection>
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>
        <ExampleSection
          title="Variant"
          description={
            <>
              Use <Code>variant=&quot;filled&quot;</Code> for a borderless muted surface in
              toolbars, sidebars and search fields.
            </>
          }
          code={loadExample("input-group-variant-demo.tsx")}
        >
          <InputGroupVariantDemo />
        </ExampleSection>
        <ExampleSection
          title="Icon"
          description="Iconly icons keep a 24px box with a scaled glyph so they sit evenly in the 40px field."
          code={loadExample("input-group-icon-demo.tsx")}
        >
          <InputGroupIconDemo />
        </ExampleSection>
        <ExampleSection title="Text" code={loadExample("input-group-text-demo.tsx")}>
          <InputGroupTextDemo />
        </ExampleSection>
        <ExampleSection title="Button" code={loadExample("input-group-button-demo.tsx")}>
          <InputGroupButtonDemo />
        </ExampleSection>
        <ExampleSection title="Dropdown" code={loadExample("input-group-dropdown-demo.tsx")}>
          <InputGroupDropdownDemo />
        </ExampleSection>
        <ExampleSection title="Spinner" code={loadExample("input-group-spinner-demo.tsx")}>
          <InputGroupSpinnerDemo />
        </ExampleSection>
        <ExampleSection title="Textarea" code={loadExample("input-group-textarea-demo.tsx")}>
          <InputGroupTextareaDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <h3 className="scroll-m-20 font-semibold tracking-tight">InputGroup</h3>
        <PropsTable data={inputGroupPropRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">InputGroupAddon</h3>
        <PropsTable data={addonPropRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">InputGroupButton</h3>
        <PropsTable data={buttonPropRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">
          InputGroupInput, InputGroupTextarea, InputGroupText
        </h3>
        <PropsTable data={controlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={inputGroupTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={inputGroupColorRows} />
      </section>
    </article>
  )
}