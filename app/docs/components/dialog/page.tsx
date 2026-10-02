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
import { DialogDemo } from "./examples/dialog-demo"
import { DialogFormDemo } from "./examples/dialog-form-demo"
import { DialogWithoutCloseDemo } from "./examples/dialog-without-close-demo"
import {
  contentPropRows,
  dialogPropRows,
  footerPropRows,
  subcomponentRows,
  triggerClosePropRows,
} from "./dialog-table-data"

const description =
  "A modal window overlaid on the primary content for focused tasks, forms, and secondary flows."

export const metadata: Metadata = {
  title: "Dialog",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/dialog"
const EXAMPLES_DIR = "app/docs/components/dialog/examples"

function loadDialogExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Dialog
├── DialogTrigger
└── DialogContent
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── DialogDescription
    ├── …content
    └── DialogFooter
        ├── DialogClose
        └── Button`

/*
  Persian trigger buttons need lang="fa" so .group/button:lang(fa)
  picks the "IRANSans Cubix Button D" face (with U+0020 + 103%/47%
  baseline). Without it the trigger falls back to the generic face
  and Geist sets the baseline, so Persian looks unloaded/misaligned.
  Docs chrome only - not part of the paste-ready example source.
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

export default function DialogPage() {
  const dialogDemoSource = loadDialogExample("dialog-demo.tsx")
  const dialogFormSource = loadDialogExample("dialog-form-demo.tsx")
  const dialogWithoutCloseSource = loadDialogExample("dialog-without-close-demo.tsx")
  const usageImport = extractDemoImports(dialogDemoSource)
  const usageSnippet = extractDemoJsx(dialogDemoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Dialog" description={description} slug="dialog" />

      <ComponentPreview code={dialogDemoSource}>
        <PreviewShell>
          <DialogDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="dialog" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a Dialog:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="With form"
          description={
            <>
              Compose Cubix <Code>TextField</Code> and <Code>EmailField</Code> inside the dialog
              when you need focused editing.
            </>
          }
          code={dialogFormSource}
        >
          <DialogFormDemo />
        </ExampleSection>

        <ExampleSection
          title="Without built-in close"
          description={
            <>
              Set <Code>showCloseButton={"{false}"}</Code> on <Code>DialogContent</Code> to hide the
              built-in X button and provide your own.
            </>
          }
          code={dialogWithoutCloseSource}
        >
          <DialogWithoutCloseDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Dialog traps focus and dismisses on
            Escape or backdrop click. Prefer <Code>Alert Dialog</Code> when the user must confirm or
            cancel an irreversible action.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Dialog</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open state.
        </p>
        <PropsTable data={dialogPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DialogTrigger / DialogClose</h3>
        <p className="leading-relaxed text-muted-foreground">
          The elements that open and close the dialog. Compose both with Cubix <Code>Button</Code>{" "}
          via <Code>render</Code>.
        </p>
        <PropsTable data={triggerClosePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DialogContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          The modal panel rendered with a backdrop.
        </p>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DialogHeader / DialogFooter</h3>
        <p className="leading-relaxed text-muted-foreground">
          Layout regions of the dialog content.
        </p>
        <PropsTable data={footerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DialogTitle / DialogDescription
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The title and supporting text of the dialog.
        </p>
        <PropsTable data={subcomponentRows} />
      </section>
    </article>
  )
}
