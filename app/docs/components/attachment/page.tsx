import type { Metadata } from "next"
import {
  CheckIcon,
  ClockIcon,
  CopyIcon,
  FileCodeIcon,
  FileSearchIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileWarningIcon,
  RefreshCwIcon,
  XIcon,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog"
import { Spinner } from "@/components/cubix/spinner"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "./docs-attachment"
import {
  attachmentActionPropRows,
  attachmentMediaPropRows,
  attachmentPropRows,
  attachmentTriggerPropRows,
  classNameOnlyRows,
} from "./attachment-table-data"

export const metadata: Metadata = {
  title: "Attachment",
  description:
    "Displays a file or image attachment with media, metadata, upload state, and actions.",
}

const imageItems = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "/docs/attachment/workspace.svg",
    alt: "Workspace",
  },
  {
    name: "desk-reference.jpg",
    meta: "JPG · 1.1 MB",
    src: "/docs/attachment/desk.svg",
    alt: "Desk",
  },
  {
    name: "office-reference.jpg",
    meta: "JPG · 940 KB",
    src: "/docs/attachment/office.svg",
    alt: "Office",
  },
] as const

const usageImport = `import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/cubix/attachment"`

const usageSnippet = `<Attachment>
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remove sales-dashboard.pdf">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`

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

const imageSnippet = `<Attachment orientation="vertical">
  <AttachmentMedia variant="image">
    <img src="..." alt="Workspace" />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>workspace.png</AttachmentTitle>
    <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remove workspace.png">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`

const statesSnippet = `<Attachment state="uploading" className="w-full">
  <AttachmentMedia>
    <Spinner />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>design-system.zip</AttachmentTitle>
    <AttachmentDescription>Uploading · 64%</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Cancel upload">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`

const sizesSnippet = `<Attachment size="sm" className="w-full">
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>Small attachment</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
</Attachment>`

const groupSnippet = `<AttachmentGroup className="w-full">
  <Attachment className="w-64">
    <AttachmentMedia>
      <FileTextIcon />
    </AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>briefing-notes.pdf</AttachmentTitle>
      <AttachmentDescription>PDF · 1.4 MB</AttachmentDescription>
    </AttachmentContent>
  </Attachment>
</AttachmentGroup>`

const triggerSnippet = `<Dialog>
  <Attachment className="w-full">
    <AttachmentMedia>
      <FileSearchIcon />
    </AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>research-summary.pdf</AttachmentTitle>
      <AttachmentDescription>Open preview dialog</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="Copy link">
        <CopyIcon />
      </AttachmentAction>
      <AttachmentAction aria-label="Remove research-summary.pdf">
        <XIcon />
      </AttachmentAction>
    </AttachmentActions>
    <DialogTrigger
      render={<AttachmentTrigger aria-label="Preview research-summary.pdf" />}
    />
  </Attachment>
  <DialogContent>{/* ... */}</DialogContent>
</Dialog>`

const rtlSnippet = `<div dir="rtl" lang="fa">
  <Attachment className="w-full">
    <AttachmentMedia>
      <FileTextIcon />
    </AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>گزارش-فروش.pdf</AttachmentTitle>
      <AttachmentDescription>PDF · ۲٫۴ مگابایت</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="حذف گزارش-فروش.pdf">
        <XIcon />
      </AttachmentAction>
    </AttachmentActions>
  </Attachment>
</div>`

function ImageAttachments() {
  return (
    <AttachmentGroup className="w-full">
      {imageItems.map((item) => (
        <Attachment key={item.name} orientation="vertical">
          <AttachmentMedia variant="image">
            <img src={item.src} alt={item.alt} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{item.name}</AttachmentTitle>
            <AttachmentDescription>{item.meta}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${item.name}`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger
            render={
              <a
                href={item.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${item.name}`}
              />
            }
          />
        </Attachment>
      ))}
    </AttachmentGroup>
  )
}

export default function AttachmentPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Attachment"
        description="Displays a file or image attachment with media, metadata, upload state, and actions."
        slug="attachment"
      />

      <ComponentPreview
        code={`<AttachmentGroup>
  <Attachment orientation="vertical">{/* image */}</Attachment>
</AttachmentGroup>
<Attachment state="uploading" className="w-full">{/* ... */}</Attachment>
<Attachment className="w-full">{/* ... */}</Attachment>`}
      >
        <div className="flex w-full max-w-sm flex-col gap-3">
          <ImageAttachments />
          <Attachment state="uploading" className="w-full">
            <AttachmentMedia>
              <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>Uploading · 64%</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Cancel upload">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment className="w-full">
            <AttachmentMedia>
              <FileCodeIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
              <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove message-renderer.tsx">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </ComponentPreview>

      <p className="leading-relaxed text-muted-foreground">
        Use Attachment for files and images in chat composers, message threads,
        and upload lists.
      </p>

      <ComponentInstall name="attachment" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build an attachment:
        </p>
        <CodeBlock code={compositionSnippet} />
        <p className="leading-relaxed text-muted-foreground">
          Use AttachmentGroup to lay out multiple attachments in a scrollable
          row:
        </p>
        <CodeBlock code={groupCompositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Features</h2>
        <ul className="list-disc space-y-2 ps-5 leading-relaxed text-muted-foreground">
          <li>Icon and image media through AttachmentMedia</li>
          <li>
            Upload states: idle, uploading, processing, error, and done, with a
            shimmer while in progress
          </li>
          <li>Three sizes and horizontal or vertical orientation</li>
          <li>
            A full-card AttachmentTrigger that opens a link or dialog while the
            actions stay independently clickable
          </li>
          <li>Scrollable, snapping AttachmentGroup with an edge fade</li>
          <li>Customizable styling through className on every part</li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Image</h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">variant=&quot;image&quot;</code>{" "}
            on AttachmentMedia and render an image inside it. Use{" "}
            <code className="font-mono text-sm">orientation=&quot;vertical&quot;</code>{" "}
            to stack the media above the content.
          </p>
          <ComponentPreview code={imageSnippet}>
            <div className="w-full max-w-sm">
              <ImageAttachments />
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">States</h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">state</code> to reflect the
            upload lifecycle. uploading and processing shimmer the title, and
            error switches to a destructive treatment.
          </p>
          <ComponentPreview code={statesSnippet}>
            <div className="flex w-full max-w-sm flex-col gap-2">
              <Attachment state="idle" className="w-full">
                <AttachmentMedia>
                  <ClockIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>selected-file.pdf</AttachmentTitle>
                  <AttachmentDescription>Ready to upload</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove selected-file.pdf">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
              <Attachment state="uploading" className="w-full">
                <AttachmentMedia>
                  <Spinner />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>design-system.zip</AttachmentTitle>
                  <AttachmentDescription>Uploading · 64%</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Cancel upload">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
              <Attachment state="processing" className="w-full">
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>market-research.pdf</AttachmentTitle>
                  <AttachmentDescription>
                    Processing document
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove market-research.pdf">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
              <Attachment state="error" className="w-full">
                <AttachmentMedia>
                  <FileWarningIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
                  <AttachmentDescription>
                    Upload failed. Try again.
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Retry upload">
                    <RefreshCwIcon />
                  </AttachmentAction>
                  <AttachmentAction aria-label="Remove financial-model.xlsx">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
              <Attachment state="done" className="w-full">
                <AttachmentMedia>
                  <CheckIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
                  <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove uploaded-report.pdf">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">size</code> to switch
            between default, sm, and xs.
          </p>
          <ComponentPreview code={sizesSnippet}>
            <div className="flex w-full max-w-sm flex-col gap-3">
              <Attachment size="default" className="w-full">
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>Default attachment</AttachmentTitle>
                  <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
              <Attachment size="sm" className="w-full">
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>Small attachment</AttachmentTitle>
                  <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
              <Attachment size="xs" className="w-full">
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>Extra small attachment</AttachmentTitle>
                </AttachmentContent>
              </Attachment>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Group</h3>
          <p className="leading-relaxed text-muted-foreground">
            Wrap attachments in AttachmentGroup to lay them out in a
            horizontally scrollable, snapping row with an edge fade.
          </p>
          <ComponentPreview code={groupSnippet}>
            <div className="w-full max-w-sm">
              <AttachmentGroup className="w-full">
                <Attachment className="w-64">
                  <AttachmentMedia>
                    <FileTextIcon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>briefing-notes.pdf</AttachmentTitle>
                    <AttachmentDescription>PDF · 1.4 MB</AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction aria-label="Remove briefing-notes.pdf">
                      <XIcon />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
                <Attachment className="w-64">
                  <AttachmentMedia variant="image">
                    <img src={imageItems[0].src} alt={imageItems[0].alt} />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>workspace.png</AttachmentTitle>
                    <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction aria-label="Remove workspace.png">
                      <XIcon />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
                <Attachment className="w-64">
                  <AttachmentMedia>
                    <FileSpreadsheetIcon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>customers.csv</AttachmentTitle>
                    <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction aria-label="Remove customers.csv">
                      <XIcon />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
                <Attachment className="w-64">
                  <AttachmentMedia>
                    <FileCodeIcon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>renderer.tsx</AttachmentTitle>
                    <AttachmentDescription>
                      TypeScript · 12 KB
                    </AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction aria-label="Remove renderer.tsx">
                      <XIcon />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
              </AttachmentGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Trigger</h3>
          <p className="leading-relaxed text-muted-foreground">
            Add an AttachmentTrigger to make the whole card open a link or
            dialog. It fills the card behind the actions, so the actions stay
            clickable.
          </p>
          <ComponentPreview code={triggerSnippet}>
            <div className="w-full max-w-sm">
              <Dialog>
                <Attachment className="w-full">
                  <AttachmentMedia>
                    <FileSearchIcon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>research-summary.pdf</AttachmentTitle>
                    <AttachmentDescription>
                      Open preview dialog
                    </AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction aria-label="Copy link">
                      <CopyIcon />
                    </AttachmentAction>
                    <AttachmentAction aria-label="Remove research-summary.pdf">
                      <XIcon />
                    </AttachmentAction>
                  </AttachmentActions>
                  <DialogTrigger
                    render={
                      <AttachmentTrigger aria-label="Preview research-summary.pdf" />
                    }
                  />
                </Attachment>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>research-summary.pdf</DialogTitle>
                    <DialogDescription>
                      The attachment trigger fills the card and opens the
                      dialog, while the actions stay independently clickable
                      above it.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Accessibility
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          AttachmentAction renders a Button, and AttachmentTrigger renders a
          real button or your element via render. Follow the guidance below so
          both are operable and announced.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Label icon-only actions
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            AttachmentAction is usually icon-only, so give each one an
            aria-label describing the action and its target.
          </p>
          <CodeBlock
            code={`<AttachmentAction aria-label="Remove sales-dashboard.pdf">
  <XIcon />
</AttachmentAction>`}
          />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Label the trigger
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            AttachmentTrigger covers the card with no text of its own, so give
            it an aria-label for what activating it does.
          </p>
          <CodeBlock
            code={`<AttachmentTrigger
  render={
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Open workspace.png"
    />
  }
/>`}
          />
          <p className="leading-relaxed text-muted-foreground">
            The trigger sits behind the actions in the stacking order, so an
            AttachmentAction and the AttachmentTrigger never trap each other.
            Both remain separately focusable and clickable.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Keyboard scrolling
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            An AttachmentGroup scrolls horizontally. When its attachments are
            interactive, keyboard users reach off-screen items by tabbing to
            them. For a row of presentational attachments, make the group
            itself focusable and scrollable by adding tabIndex={"{0}"},
            role=&quot;group&quot;, and an aria-label.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Meaning beyond color
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            The error state uses a destructive color. Keep the failure reason
            in AttachmentDescription so the state is not conveyed by color
            alone.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap the attachment in{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> and{" "}
          <code className="font-mono text-sm">lang=&quot;fa&quot;</code> so
          layout, actions, and IRANSans XV follow Persian.
        </p>
        <ComponentPreview code={rtlSnippet}>
          <div dir="rtl" lang="fa" className="w-full max-w-sm">
            <Attachment className="w-full">
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>گزارش-فروش.pdf</AttachmentTitle>
                <AttachmentDescription>
                  PDF · ۲٫۴ مگابایت
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="حذف گزارش-فروش.pdf">
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </div>
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Attachment</h3>
        <p className="leading-relaxed text-muted-foreground">
          The root attachment container.
        </p>
        <PropsTable data={attachmentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AttachmentMedia
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The media slot for an icon or image preview.
        </p>
        <PropsTable data={attachmentMediaPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AttachmentContent
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Wraps the title and description.
        </p>
        <PropsTable data={classNameOnlyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AttachmentTitle
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The attachment name. Shimmers while the attachment is uploading or
          processing.
        </p>
        <PropsTable data={classNameOnlyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AttachmentDescription
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Secondary metadata such as the file type, size, or upload status.
        </p>
        <PropsTable data={classNameOnlyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AttachmentActions
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          A container for one or more actions, aligned to the end of the
          attachment.
        </p>
        <PropsTable data={classNameOnlyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AttachmentAction
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          An action button. Renders a Button and accepts all of its props.
        </p>
        <PropsTable data={attachmentActionPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AttachmentTrigger
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          A full-card overlay that activates the attachment. Renders a button
          by default.
        </p>
        <PropsTable data={attachmentTriggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AttachmentGroup
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Lays out attachments in a horizontally scrollable, snapping row.
        </p>
        <PropsTable data={classNameOnlyRows} />
      </section>
    </article>
  )
}
