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
import { buttonGroupPropRows, separatorPropRows, textPropRows } from "./button-group-table-data"
import { ButtonGroupDemo } from "./examples/button-group-demo"
import { ButtonGroupInputDemo } from "./examples/button-group-input-demo"
import { ButtonGroupNestedDemo } from "./examples/button-group-nested-demo"
import { ButtonGroupOrientationDemo } from "./examples/button-group-orientation-demo"
import { ButtonGroupSelectDemo } from "./examples/button-group-select-demo"
import { ButtonGroupSeparatorDemo } from "./examples/button-group-separator-demo"
import { ButtonGroupSizeDemo } from "./examples/button-group-size-demo"
import { ButtonGroupSplitDemo } from "./examples/button-group-split-demo"
import { ButtonGroupTextDemo } from "./examples/button-group-text-demo"

const description = "A container that groups related buttons together with consistent styling."

export const metadata: Metadata = {
  title: "Button Group",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/button-group"
const EXAMPLES_DIR = "app/docs/components/button-group/examples"

const compositionSnippet = `ButtonGroup
├── Button, TextFieldInput or Select
├── ButtonGroupSeparator
├── ButtonGroupText
└── ButtonGroup (nested)`

function loadButtonGroupExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

/*
  Persian button labels need lang="fa" so .group/button:lang(fa) picks the
  IRANSans Cubix Button D face. Docs chrome only - not part of the paste-ready
  example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex items-center justify-center">
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

export default function ButtonGroupPage() {
  const demoSource = loadButtonGroupExample("button-group-demo.tsx")
  const orientationSource = loadButtonGroupExample("button-group-orientation-demo.tsx")
  const sizeSource = loadButtonGroupExample("button-group-size-demo.tsx")
  const nestedSource = loadButtonGroupExample("button-group-nested-demo.tsx")
  const separatorSource = loadButtonGroupExample("button-group-separator-demo.tsx")
  const splitSource = loadButtonGroupExample("button-group-split-demo.tsx")
  const inputSource = loadButtonGroupExample("button-group-input-demo.tsx")
  const textSource = loadButtonGroupExample("button-group-text-demo.tsx")
  const selectSource = loadButtonGroupExample("button-group-select-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Button Group" description={description} slug="button-group" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <ButtonGroupDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="button-group" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a <Code>ButtonGroup</Code>. Joined corners and
          borders use logical start and end, so the same markup is correct in RTL and LTR.
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <ul className="list-disc space-y-2 ps-5 leading-relaxed text-muted-foreground">
          <li>
            The group has <Code>role=&quot;group&quot;</Code>.
          </li>
          <li>Use Tab to move between the controls in the group.</li>
          <li>
            Label the group with <Code>aria-label</Code> or <Code>aria-labelledby</Code>.
          </li>
          <li>
            Icon-only buttons inside the group need their own <Code>aria-label</Code>.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Orientation"
          description={
            <>
              Set the <Code>orientation</Code> prop to stack the controls vertically.
            </>
          }
          code={orientationSource}
        >
          <ButtonGroupOrientationDemo />
        </ExampleSection>

        <ExampleSection
          title="Size"
          description={
            <>
              Control size with the <Code>size</Code> prop on each button. Keep every control in a
              group at the same size - <Code>sm</Code> is 32px, default is 40px, and <Code>lg</Code>{" "}
              is 48px.
            </>
          }
          code={sizeSource}
        >
          <ButtonGroupSizeDemo />
        </ExampleSection>

        <ExampleSection
          title="Nested"
          description={
            <>
              Nest <Code>ButtonGroup</Code> components to create spaced clusters of related actions.
            </>
          }
          code={nestedSource}
        >
          <ButtonGroupNestedDemo />
        </ExampleSection>

        <ExampleSection
          title="Separator"
          description={
            <>
              Outline buttons already have a border. For other variants, add{" "}
              <Code>ButtonGroupSeparator</Code> to split the group.
            </>
          }
          code={separatorSource}
        >
          <ButtonGroupSeparatorDemo />
        </ExampleSection>

        <ExampleSection
          title="Split"
          description={
            <>
              Pair a main action with a <Code>DropdownMenu</Code> trigger for a split button.
            </>
          }
          code={splitSource}
        >
          <ButtonGroupSplitDemo />
        </ExampleSection>

        <ExampleSection
          title="Input"
          description={
            <>
              Join a Cubix <Code>TextFieldInput</Code> with a button. Default field height is 40px,
              so it lines up with the default button size.
            </>
          }
          code={inputSource}
        >
          <ButtonGroupInputDemo />
        </ExampleSection>

        <ExampleSection
          title="Text"
          description={
            <>
              Use <Code>ButtonGroupText</Code> for a prefix or label next to{" "}
              <Code>TextFieldInput</Code>. Pass <Code>render=&#123;&lt;label /&gt;&#125;</Code> to
              label the field. URLs read left to right, so this group sets{" "}
              <Code>dir=&quot;ltr&quot;</Code>.
            </>
          }
          code={textSource}
        >
          <ButtonGroupTextDemo />
        </ExampleSection>

        <ExampleSection
          title="Select"
          description={
            <>
              Pair a <Code>Select</Code> with a <Code>TextFieldInput</Code> and a button. All three
              default to 40px, so the joined edges line up.
            </>
          }
          code={selectSource}
        >
          <ButtonGroupSelectDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Use <Code>ButtonGroup</Code> for
            related actions. Use a toggle group when the controls represent a selected state.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">ButtonGroup</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that groups related buttons with consistent styling.
        </p>
        <PropsTable data={buttonGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ButtonGroupSeparator</h3>
        <p className="leading-relaxed text-muted-foreground">
          A visual divider between buttons in the group.
        </p>
        <PropsTable data={separatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ButtonGroupText</h3>
        <p className="leading-relaxed text-muted-foreground">
          Text shown inside the group, such as a prefix or label.
        </p>
        <PropsTable data={textPropRows} />
      </section>
    </article>
  )
}
