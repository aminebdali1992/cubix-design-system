import type { Metadata } from "next";
import { CircleAlertIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog";
import { Button } from "@/components/cubix/button";
import { Input } from "@/components/cubix/input";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import {
  contentPropRows,
  dialogPropRows,
  subcomponentRows,
  triggerClosePropRows,
} from "./dialog-table-data";

export const metadata: Metadata = {
  title: "Dialog",
  description: "A modal window that overlays the page.",
};

const usageImport = `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog"`;

const usageSnippet = `<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
Open
</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>
Cancel
</DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

export default function DialogPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Dialog"
        description="A modal window that overlays the page."
        slug="dialog"
      />

      {/* Hero preview */}
      <ComponentPreview code={usageSnippet}>
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
Open
</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
Cancel
</DialogClose>
              <Button variant="destructive">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentPreview>

      <ComponentInstall name="dialog" />

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      {/* Examples */}
      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Dialogs work well with form fields when you need a confirmation:
          </p>
          <ComponentPreview
            code={`<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
Edit profile
</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you are done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
      <Input placeholder="Name" />
      <Input placeholder="Email" type="email" />
    </div>
    <DialogFooter>
      <DialogClose render={<Button type="submit" />}>
Save changes
</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          >
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
Edit profile
</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you are
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <Input placeholder="Name" />
                  <Input placeholder="Email" type="email" />
                </div>
                <DialogFooter>
                  <DialogClose render={<Button type="submit" />}>
Save changes
</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Without built-in close
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">showCloseButton={false}</code> on{" "}
            <code className="font-mono text-sm">DialogContent</code> to hide the
            built-in X button and provide your own:
          </p>
          <ComponentPreview
            code={`<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
Open small modal
</DialogTrigger>
  <DialogContent showCloseButton={false} className="max-w-sm">
    <DialogHeader>
      <DialogTitle>Look, just a small modal</DialogTitle>
      <DialogDescription>
        You can hide the built-in close button and add your own.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost" />}>
Close
</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          >
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
Open small modal
</DialogTrigger>
              <DialogContent showCloseButton={false} className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Look, just a small modal</DialogTitle>
                  <DialogDescription>
                    You can hide the built-in close button and add your own.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="ghost" />}>
Close
</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The dialog is
            built on the native{" "}
            <code className="font-mono">&lt;dialog&gt;</code> element - Escape
            closes it, focus is trapped, and clicking the backdrop dismisses
            it. State is uncontrolled by default.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Dialog</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and the content and manages
          open state.
        </p>
        <PropsTable data={dialogPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DialogTrigger / DialogClose</h3>
        <p className="leading-relaxed text-muted-foreground">
          The elements that open and close the dialog. Use{" "}
          <code className="font-mono text-sm">render</code> to merge the
          behavior onto a Button.
        </p>
        <PropsTable data={triggerClosePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DialogContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          The content panel rendered as a native modal dialog with backdrop.
        </p>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DialogHeader / DialogFooter</h3>
        <p className="leading-relaxed text-muted-foreground">
          Layout regions of the dialog content.
        </p>
        <PropsTable data={subcomponentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">DialogTitle / DialogDescription</h3>
        <p className="leading-relaxed text-muted-foreground">
          The title and description text of the dialog.
        </p>
        <PropsTable data={subcomponentRows} />
      </section>
    </article>
  );
}
