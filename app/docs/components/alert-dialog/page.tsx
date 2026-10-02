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
import { AlertDialogDemo } from "./examples/alert-dialog-demo"
import { AlertDialogDestructiveDemo } from "./examples/alert-dialog-destructive-demo"
import { AlertDialogMediaDemo } from "./examples/alert-dialog-media-demo"
import { AlertDialogSmallDemo } from "./examples/alert-dialog-small-demo"
import { AlertDialogSmallMediaDemo } from "./examples/alert-dialog-small-media-demo"
import {
  actionPropRows,
  alertDialogPropRows,
  cancelPropRows,
  contentPropRows,
  subcomponentRows,
  triggerPropRows,
} from "./alert-dialog-table-data"

const description =
  "A modal dialog that interrupts the user with important content and expects a response."

export const metadata: Metadata = {
  title: "Alert Dialog",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/alert-dialog"
const EXAMPLES_DIR = "app/docs/components/alert-dialog/examples"

function loadAlertDialogExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `AlertDialog
├── AlertDialogTrigger
└── AlertDialogContent
    ├── AlertDialogHeader
    │   ├── AlertDialogMedia
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction`

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

export default function AlertDialogPage() {
  const demoSource = loadAlertDialogExample("alert-dialog-demo.tsx")
  const smallSource = loadAlertDialogExample("alert-dialog-small-demo.tsx")
  const mediaSource = loadAlertDialogExample("alert-dialog-media-demo.tsx")
  const smallMediaSource = loadAlertDialogExample("alert-dialog-small-media-demo.tsx")
  const destructiveSource = loadAlertDialogExample("alert-dialog-destructive-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Alert Dialog" description={description} slug="alert-dialog" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <AlertDialogDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="alert-dialog" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build an Alert Dialog:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Small"
          description={
            <>
              Use the <Code>size=&quot;sm&quot;</Code> prop to make the alert dialog smaller.
            </>
          }
          code={smallSource}
        >
          <AlertDialogSmallDemo />
        </ExampleSection>

        <ExampleSection
          title="Media"
          description={
            <>
              Use <Code>AlertDialogMedia</Code> to add an icon or image above the title.
            </>
          }
          code={mediaSource}
        >
          <AlertDialogMediaDemo />
        </ExampleSection>

        <ExampleSection
          title="Small with Media"
          description={
            <>
              Combine <Code>size=&quot;sm&quot;</Code> with <Code>AlertDialogMedia</Code> for a
              compact dialog with an icon.
            </>
          }
          code={smallMediaSource}
        >
          <AlertDialogSmallMediaDemo />
        </ExampleSection>

        <ExampleSection
          title="Destructive"
          description={
            <>
              Use <Code>variant=&quot;destructive&quot;</Code> on the action when the confirm step
              cannot be undone.
            </>
          }
          code={destructiveSource}
        >
          <AlertDialogDestructiveDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Alert dialogs trap focus and require
            an explicit choice. Prefer this over a regular Dialog when the user must confirm or
            cancel.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertDialog</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open state.
        </p>
        <PropsTable data={alertDialogPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertDialogTrigger</h3>
        <p className="leading-relaxed text-muted-foreground">
          The element that opens the dialog. Compose with Cubix <Code>Button</Code> via{" "}
          <Code>render</Code>.
        </p>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertDialogContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          The modal panel rendered with a backdrop.
        </p>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AlertDialogHeader / AlertDialogMedia / AlertDialogFooter
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Layout regions of the dialog content.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AlertDialogTitle / AlertDialogDescription
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The title and supporting text of the dialog.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertDialogAction</h3>
        <p className="leading-relaxed text-muted-foreground">
          The confirm button. Use a destructive variant for irreversible actions.
        </p>
        <PropsTable data={actionPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertDialogCancel</h3>
        <p className="leading-relaxed text-muted-foreground">
          The dismiss button. Closes the dialog without confirming.
        </p>
        <PropsTable data={cancelPropRows} />
      </section>
    </article>
  )
}
