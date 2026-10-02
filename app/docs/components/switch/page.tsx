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
import { SwitchControlledDemo } from "./examples/switch-controlled-demo"
import { SwitchCustomDemo } from "./examples/switch-custom-demo"
import { SwitchDemo } from "./examples/switch-demo"
import { SwitchDescriptionDemo } from "./examples/switch-description-demo"
import { SwitchInvalidDemo } from "./examples/switch-invalid-demo"
import { SwitchSizesDemo } from "./examples/switch-sizes-demo"
import { SwitchStatesDemo } from "./examples/switch-states-demo"
import { propRows, stateRows } from "./switch-table-data"

const description = "A control that allows the user to toggle between checked and not checked."

export const metadata: Metadata = {
  title: "Switch",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/switch"
const EXAMPLES_DIR = "app/docs/components/switch/examples"

function loadSwitchExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Switch
Label (htmlFor → Switch id)`

/*
  Persian labels need lang="fa" so Cubix button/label faces pick the
  IRANSans Cubix face. Docs chrome only - not part of the paste-ready
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
  description: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function SwitchPage() {
  const switchDemoSource = loadSwitchExample("switch-demo.tsx")
  const switchStatesSource = loadSwitchExample("switch-states-demo.tsx")
  const switchSizesSource = loadSwitchExample("switch-sizes-demo.tsx")
  const switchDescriptionSource = loadSwitchExample("switch-description-demo.tsx")
  const switchControlledSource = loadSwitchExample("switch-controlled-demo.tsx")
  const switchInvalidSource = loadSwitchExample("switch-invalid-demo.tsx")
  const switchCustomSource = loadSwitchExample("switch-custom-demo.tsx")
  const usageImport = extractDemoImports(switchDemoSource)
  const usageSnippet = extractDemoJsx(switchDemoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Switch" description={description} slug="switch" />

      <ComponentPreview code={switchDemoSource}>
        <PreviewShell>
          <SwitchDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="switch" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Switch is the control only. Pair it with <Code>Label</Code> using matching <Code>id</Code>{" "}
          and <Code>htmlFor</Code>. The thumb moves toward the inline end when on, so it follows the
          page direction.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="States"
          description="On, off, and disabled cover the common conditions."
          code={switchStatesSource}
        >
          <SwitchStatesDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Use <Code>size</Code> to pick <Code>sm</Code> or <Code>default</Code>.
            </>
          }
          code={switchSizesSource}
        >
          <SwitchSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="With description"
          description="Pair a switch with a title and helper line for settings rows."
          code={switchDescriptionSource}
        >
          <SwitchDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Pass <Code>checked</Code> and <Code>onCheckedChange</Code> to own the state from
              outside.
            </>
          }
          code={switchControlledSource}
        >
          <SwitchControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Invalid"
          description={
            <>
              Set <Code>aria-invalid</Code> when the choice is required and missing. The switch
              itself stays visually unchanged; show the error in helper text.
            </>
          }
          code={switchInvalidSource}
        >
          <SwitchInvalidDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Switch accepts a <Code>className</Code> merged with the shipped <Code>cn</Code>{" "}
              helper. Target both <Code>data-checked</Code> / <Code>data-unchecked</Code> (Base UI
              and React Aria) and <Code>data-[state=checked]</Code> /{" "}
              <Code>data-[state=unchecked]</Code> (Radix) so one class list works on every base.
            </>
          }
          code={switchCustomSource}
        >
          <SwitchCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>switch</Code>, <Code>switch-thumb</Code>) for targeting in tests and
            parent selectors. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Switch</h3>
        <p className="leading-relaxed text-muted-foreground">
          The toggle control. Pair it with Cubix <Code>Label</Code> via matching <Code>id</Code> and{" "}
          <Code>htmlFor</Code>.
        </p>
        <PropsTable data={propRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">States</h3>
        <PropsTable data={stateRows} />
      </section>
    </article>
  )
}
