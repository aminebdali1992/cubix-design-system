import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

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
  collapsibleColorRows,
  collapsiblePropRows,
  collapsibleTypographyRows,
  contentPropRows,
  triggerPropRows,
} from "./collapsible-table-data"
import { CollapsibleBasicDemo } from "./examples/collapsible-basic-demo"
import { CollapsibleDemo } from "./examples/collapsible-demo"
import { CollapsibleFileTreeDemo } from "./examples/collapsible-file-tree-demo"
import { CollapsibleSettingsDemo } from "./examples/collapsible-settings-demo"

const description = "An interactive component which expands and collapses a panel."

export const metadata: Metadata = {
  title: "Collapsible",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/collapsible"
const EXAMPLES_DIR = "app/docs/components/collapsible/examples"

function loadCollapsibleExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Collapsible
├── CollapsibleTrigger
└── CollapsibleContent`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
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

export default function CollapsibleDocsPage() {
  const demoSource = loadCollapsibleExample("collapsible-demo.tsx")
  const basicSource = loadCollapsibleExample("collapsible-basic-demo.tsx")
  const settingsSource = loadCollapsibleExample("collapsible-settings-demo.tsx")
  const fileTreeSource = loadCollapsibleExample("collapsible-file-tree-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Collapsible" description={description} slug="collapsible" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <CollapsibleDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="collapsible" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Put the toggle in <Code>CollapsibleTrigger</Code> and the hidden part in{" "}
          <Code>CollapsibleContent</Code>. Use <Code>open</Code> and <Code>onOpenChange</Code> to
          control the state, and <Code>render</Code> to give the trigger the look of a Cubix Button.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The trigger is a button with <Code>aria-expanded</Code> and <Code>aria-controls</Code>{" "}
          pointing at the panel. Enter and Space toggle it. Give icon-only triggers an{" "}
          <Code>aria-label</Code>, for example <Code>نمایش جزئیات سفارش</Code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Basic"
          description="A full-width ghost Button trigger with a chevron that turns when the panel opens."
          code={basicSource}
        >
          <CollapsibleBasicDemo />
        </ExampleSection>

        <ExampleSection
          title="Settings panel"
          description="Use an icon trigger to reveal extra settings fields."
          code={settingsSource}
        >
          <CollapsibleSettingsDemo />
        </ExampleSection>

        <ExampleSection
          title="File tree"
          description="Nest collapsibles to build a file tree."
          code={fileTreeSource}
        >
          <CollapsibleFileTreeDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The same props work on Base UI,
            React Aria and Radix. See each primitive&apos;s docs for the full API.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Collapsible</h3>
        <PropsTable data={collapsiblePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CollapsibleTrigger</h3>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">CollapsibleContent</h3>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={collapsibleTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={collapsibleColorRows} />
      </section>
    </article>
  )
}