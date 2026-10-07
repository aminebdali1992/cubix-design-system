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
import { SheetDemo } from "./examples/sheet-demo"
import { SheetNoCloseDemo } from "./examples/sheet-no-close-demo"
import { SheetCustomDemo } from "./examples/sheet-custom-demo"
import { SheetSideDemo } from "./examples/sheet-side-demo"
import {
  contentPropRows,
  headerFooterPropRows,
  sheetPropRows,
  titleDescriptionPropRows,
  triggerClosePropRows,
} from "./sheet-table-data"

const description =
  "Extends the Dialog to display content that complements the main content of the screen."

export const metadata: Metadata = {
  title: "Sheet",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/sheet"
const EXAMPLES_DIR = "app/docs/components/sheet/examples"

function loadSheetExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Sheet
├── SheetTrigger
└── SheetContent
    ├── SheetHeader
    │   ├── SheetTitle
    │   └── SheetDescription
    ├── …content
    └── SheetFooter
        ├── Button
        └── SheetClose`

/*
  Persian trigger buttons need lang="fa" so .group/button:lang(fa)
  picks the "IRANSans Cubix Button D" face. Docs chrome only - not part
  of the paste-ready example source.
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
      <ComponentPreview code={code} previewClassName="min-h-40">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function SheetPage() {
  const sheetDemoSource = loadSheetExample("sheet-demo.tsx")
  const sheetSideSource = loadSheetExample("sheet-side-demo.tsx")
  const sheetNoCloseSource = loadSheetExample("sheet-no-close-demo.tsx")
  const sheetCustomSource = loadSheetExample("sheet-custom-demo.tsx")
  const usageImport = extractDemoImports(sheetDemoSource)
  const usageSnippet = extractDemoJsx(sheetDemoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Sheet" description={description} slug="sheet" />

      <ComponentPreview code={sheetDemoSource} previewClassName="min-h-40">
        <PreviewShell>
          <SheetDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="sheet" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a Sheet:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Side"
          description={
            <>
              Use the <Code>side</Code> prop on <Code>SheetContent</Code> to set the edge of the
              screen where the sheet appears. Values are <Code>top</Code>, <Code>right</Code>,{" "}
              <Code>bottom</Code>, or <Code>left</Code>.
            </>
          }
          code={sheetSideSource}
        >
          <SheetSideDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Pass <Code>className</Code> on <Code>SheetHeader</Code> and{" "}
              <Code>SheetFooter</Code> to drop the divider lines and muted footer
              background.
            </>
          }
          code={sheetCustomSource}
        >
          <SheetCustomDemo />
        </ExampleSection>

        <ExampleSection
          title="Without built-in close"
          description={
            <>
              Set <Code>showCloseButton={"{false}"}</Code> on <Code>SheetContent</Code> to hide the
              built-in X button and provide your own.
            </>
          }
          code={sheetNoCloseSource}
        >
          <SheetNoCloseDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Sheet is built on the Dialog
            primitive. It moves focus to its panel when it opens, traps focus, and dismisses on
            Escape or backdrop click. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Sheet</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open state.
        </p>
        <PropsTable data={sheetPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">SheetTrigger / SheetClose</h3>
        <p className="leading-relaxed text-muted-foreground">
          The elements that open and close the sheet. Compose both with Cubix <Code>Button</Code>{" "}
          via <Code>render</Code>.
        </p>
        <PropsTable data={triggerClosePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">SheetContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          The sliding panel rendered with a backdrop.
        </p>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">SheetHeader / SheetFooter</h3>
        <p className="leading-relaxed text-muted-foreground">
          Layout regions of the sheet content.
        </p>
        <PropsTable data={headerFooterPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">SheetTitle / SheetDescription</h3>
        <p className="leading-relaxed text-muted-foreground">
          The title and supporting text of the sheet.
        </p>
        <PropsTable data={titleDescriptionPropRows} />
      </section>
    </article>
  )
}
