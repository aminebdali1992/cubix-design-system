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
  attachmentActionPropRows,
  attachmentColorRows,
  attachmentMediaPropRows,
  attachmentPropRows,
  attachmentTriggerPropRows,
  attachmentTypographyRows,
  classNameOnlyRows,
} from "./attachment-table-data"
import { AttachmentDemo } from "./examples/attachment-demo"
import { AttachmentGroupDemo } from "./examples/attachment-group-demo"
import { AttachmentImageDemo } from "./examples/attachment-image-demo"
import { AttachmentSizesDemo } from "./examples/attachment-sizes-demo"
import { AttachmentStatesDemo } from "./examples/attachment-states-demo"
import { AttachmentTriggerDemo } from "./examples/attachment-trigger-demo"

const description =
  "Displays a file or image attachment with media, metadata, upload state, and actions."

export const metadata: Metadata = {
  title: "Attachment",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/attachment"
const EXAMPLES_DIR = "app/docs/components/attachment/examples"

function loadAttachmentExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Attachment
├── AttachmentMedia
├── AttachmentContent
│   ├── AttachmentTitle
│   └── AttachmentDescription
├── AttachmentActions
│   └── AttachmentAction
└── AttachmentTrigger`

const groupCompositionSnippet = `AttachmentGroup
├── Attachment
└── Attachment`

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

function ApiPart({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <>
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      {children}
    </>
  )
}

export default function AttachmentPage() {
  const demoSource = loadAttachmentExample("attachment-demo.tsx")
  const imageSource = loadAttachmentExample("attachment-image-demo.tsx")
  const statesSource = loadAttachmentExample("attachment-states-demo.tsx")
  const sizesSource = loadAttachmentExample("attachment-sizes-demo.tsx")
  const groupSource = loadAttachmentExample("attachment-group-demo.tsx")
  const triggerSource = loadAttachmentExample("attachment-trigger-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Attachment" description={description} slug="attachment" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <AttachmentDemo />
        </PreviewShell>
      </ComponentPreview>

      <p className="leading-relaxed text-muted-foreground">
        Use Attachment for files and images in chat composers, message threads, and upload lists.
        It is right-to-left by default: the media sits at the inline start and the actions at the
        inline end, so they mirror in RTL without extra classes.
      </p>

      <ComponentInstall name="attachment" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build an attachment:
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
        <p className="leading-relaxed text-muted-foreground">
          Use <Code>AttachmentGroup</Code> to lay out multiple attachments in a scrollable row:
        </p>
        <CodeBlock code={groupCompositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Features</h2>
        <ul className="list-disc space-y-2 ps-5 leading-relaxed text-muted-foreground">
          <li>Icon and image media through AttachmentMedia</li>
          <li>
            Upload states: idle, uploading, processing, error, and done, with a shimmer while in
            progress
          </li>
          <li>Three sizes and horizontal or vertical orientation</li>
          <li>
            A full-card AttachmentTrigger that opens a link or dialog while the actions stay
            independently clickable
          </li>
          <li>Scrollable, snapping AttachmentGroup with an edge fade</li>
          <li>Customizable styling through className on every part</li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Image"
          description={
            <>
              Set <Code>variant=&quot;image&quot;</Code> on AttachmentMedia and render an image
              inside it. Use <Code>orientation=&quot;vertical&quot;</Code> to stack the media above
              the content.
            </>
          }
          code={imageSource}
        >
          <AttachmentImageDemo />
        </ExampleSection>

        <ExampleSection
          title="States"
          description={
            <>
              Set <Code>state</Code> to reflect the upload lifecycle. uploading and processing
              shimmer the title, and error switches to a destructive treatment.
            </>
          }
          code={statesSource}
        >
          <AttachmentStatesDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Use <Code>size</Code> to switch between default, sm, and xs.
            </>
          }
          code={sizesSource}
        >
          <AttachmentSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Group"
          description="AttachmentGroup lays attachments out in a horizontally scrollable row that snaps to each item and fades at both edges."
          code={groupSource}
        >
          <AttachmentGroupDemo />
        </ExampleSection>

        <ExampleSection
          title="Trigger"
          description="Add an AttachmentTrigger to make the whole card open a link or dialog. It fills the card behind the actions, so the actions stay clickable."
          code={triggerSource}
        >
          <AttachmentTriggerDemo />
        </ExampleSection>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          AttachmentAction renders a Button, and AttachmentTrigger renders a real button or your
          element via render. Follow the guidance below so both are operable and announced.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Label icon-only actions</h3>
          <p className="leading-relaxed text-muted-foreground">
            AttachmentAction is usually icon-only, so give each one an aria-label describing the
            action and its target.
          </p>
          <CodeBlock
            code={`<AttachmentAction aria-label="حذف sales-report.pdf">
  <XIcon />
</AttachmentAction>`}
          />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Label the trigger</h3>
          <p className="leading-relaxed text-muted-foreground">
            AttachmentTrigger covers the card with no text of its own, so give it an aria-label for
            what activating it does. It sits behind the actions in the stacking order, so an
            AttachmentAction and the AttachmentTrigger stay separately focusable and clickable.
          </p>
          <CodeBlock
            code={`<AttachmentTrigger
  render={
    <a href={url} target="_blank" rel="noreferrer" aria-label="باز کردن فضای-کار.png" />
  }
/>`}
          />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Keyboard scrolling</h3>
          <p className="leading-relaxed text-muted-foreground">
            An AttachmentGroup scrolls horizontally. When its attachments are interactive, keyboard
            users reach off-screen items by tabbing to them. For a row of presentational
            attachments, make the group itself focusable by adding tabIndex={"{0}"},
            role=&quot;group&quot;, and an aria-label.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Meaning beyond color</h3>
          <p className="leading-relaxed text-muted-foreground">
            The error state uses a destructive color. Keep the failure reason in
            AttachmentDescription so the state is not conveyed by color alone.
          </p>
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <ApiPart title="Attachment" description="The root attachment container.">
          <PropsTable data={attachmentPropRows} />
        </ApiPart>
        <ApiPart title="AttachmentMedia" description="The media slot for an icon or image preview.">
          <PropsTable data={attachmentMediaPropRows} />
        </ApiPart>
        <ApiPart title="AttachmentContent" description="Wraps the title and description.">
          <PropsTable data={classNameOnlyRows} />
        </ApiPart>
        <ApiPart
          title="AttachmentTitle"
          description="The attachment name. Shimmers while the attachment is uploading or processing."
        >
          <PropsTable data={classNameOnlyRows} />
        </ApiPart>
        <ApiPart
          title="AttachmentDescription"
          description="Secondary metadata such as the file type, size, or upload status."
        >
          <PropsTable data={classNameOnlyRows} />
        </ApiPart>
        <ApiPart
          title="AttachmentActions"
          description="A container for one or more actions, aligned to the inline end of the attachment."
        >
          <PropsTable data={classNameOnlyRows} />
        </ApiPart>
        <ApiPart
          title="AttachmentAction"
          description="An action button. Renders a Button and accepts all of its props."
        >
          <PropsTable data={attachmentActionPropRows} />
        </ApiPart>
        <ApiPart
          title="AttachmentTrigger"
          description="A full-card overlay that activates the attachment. Renders a button by default."
        >
          <PropsTable data={attachmentTriggerPropRows} />
        </ApiPart>
        <ApiPart
          title="AttachmentGroup"
          description="Lays out attachments in a horizontally scrollable, snapping row."
        >
          <PropsTable data={classNameOnlyRows} />
        </ApiPart>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={attachmentTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={attachmentColorRows} />
      </section>
    </article>
  )
}
