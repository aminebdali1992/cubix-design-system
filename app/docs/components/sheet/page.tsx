import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  SheetDemo,
  SheetNoCloseButtonDemo,
  SheetSideDemo,
} from "@/components/examples/sheet-examples"

import {
  contentPropRows,
  headerFooterPropRows,
  sheetPropRows,
  titleDescriptionPropRows,
  triggerPropRows,
} from "./sheet-table-data"

const description =
  "Extends the Dialog to display content that complements the main content of the screen."

export const metadata: Metadata = {
  title: "Sheet",
  description,
}

const usageImport = `import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/cubix/sheet"`

const usageSnippet = `<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`

const compositionSnippet = `Sheet
├── SheetTrigger
└── SheetContent
    ├── SheetHeader
    │   ├── SheetTitle
    │   └── SheetDescription
    └── SheetFooter`

const demoSnippet = `<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="px-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="sheet-demo-name">Name</FieldLabel>
          <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
        </Field>
        <Field>
          <FieldLabel htmlFor="sheet-demo-username">Username</FieldLabel>
          <Input id="sheet-demo-username" defaultValue="@peduarte" />
        </Field>
      </FieldGroup>
    </div>
    <SheetFooter>
      <Button type="submit">Save changes</Button>
      <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`

const sideSnippet = `{SHEET_SIDES.map((side) => (
  <Sheet key={side}>
    <SheetTrigger render={<Button variant="outline" className="capitalize" />}>
      {side}
    </SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <Button type="submit">Save changes</Button>
        <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
))}`

const noCloseSnippet = `<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>
    No Close Button
  </SheetTrigger>
  <SheetContent showCloseButton={false}>
    <SheetHeader>
      <SheetTitle>No Close Button</SheetTitle>
      <SheetDescription>
        This sheet doesn't have a close button in the top-right corner.
      </SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`

export default function SheetDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Sheet"
        description={description}
        slug="sheet"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-40">
        <SheetDemo />
      </ComponentPreview>

      <ComponentInstall name="sheet" />

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
          Use the following composition to build a{" "}
          <code className="font-mono text-sm">Sheet</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Side</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="font-mono text-sm">side</code> prop on{" "}
          <code className="font-mono text-sm">SheetContent</code> to set the
          edge of the screen where the sheet appears. Values are{" "}
          <code className="font-mono text-sm">top</code>,{" "}
          <code className="font-mono text-sm">right</code>,{" "}
          <code className="font-mono text-sm">bottom</code>, or{" "}
          <code className="font-mono text-sm">left</code>.
        </p>
        <ComponentPreview code={sideSnippet} previewClassName="min-h-40">
          <SheetSideDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          No Close Button
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">showCloseButton={"{false}"}</code>{" "}
          on{" "}
          <code className="font-mono text-sm">SheetContent</code> to hide the
          close button.
        </p>
        <ComponentPreview code={noCloseSnippet} previewClassName="min-h-40">
          <SheetNoCloseButtonDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Sheet is built on the Dialog primitive. See also the Base UI Dialog
          documentation for additional props.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sheet</h3>
          <PropsTable data={sheetPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            SheetTrigger
          </h3>
          <PropsTable data={triggerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            SheetContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            SheetHeader / SheetFooter
          </h3>
          <PropsTable data={headerFooterPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            SheetTitle / SheetDescription
          </h3>
          <PropsTable data={titleDescriptionPropRows} />
        </div>
      </section>
    </article>
  )
}
