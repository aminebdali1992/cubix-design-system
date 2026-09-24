import type { Metadata } from "next"
import {
  BluetoothIcon,
  CircleAlertIcon,
  CircleFadingPlusIcon,
  Trash2Icon,
} from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./docs-alert-dialog"
import { Button } from "@/components/cubix/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  actionPropRows,
  alertDialogPropRows,
  cancelPropRows,
  contentPropRows,
  subcomponentRows,
  triggerPropRows,
} from "./alert-dialog-table-data"

export const metadata: Metadata = {
  title: "Alert Dialog",
  description:
    "A modal dialog that interrupts the user with important content and expects a response.",
}

const usageImport = `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/cubix/alert-dialog"`

const usageSnippet = `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`

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

const smallSnippet = `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Small dialog
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogTitle>Share this document?</AlertDialogTitle>
      <AlertDialogDescription>
        Anyone with the link will be able to view this file.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Share</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`

const mediaSnippet = `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    With media
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogMedia>
        <CircleFadingPlusIcon />
      </AlertDialogMedia>
      <AlertDialogTitle>Enable extra features?</AlertDialogTitle>
      <AlertDialogDescription>
        This adds optional tools to your workspace. You can turn them off
        later.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Not now</AlertDialogCancel>
      <AlertDialogAction>Enable</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`

const smallWithMediaSnippet = `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Small with media
  </AlertDialogTrigger>
  <AlertDialogContent size="sm">
    <AlertDialogHeader>
      <AlertDialogMedia>
        <BluetoothIcon />
      </AlertDialogMedia>
      <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
      <AlertDialogDescription>
        Do you want to allow the USB accessory to connect to this device?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Don't allow</AlertDialogCancel>
      <AlertDialogAction>Allow</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`

const rtlSnippet = `<div dir="rtl" lang="fa">
  <AlertDialog>
    <AlertDialogTrigger render={<Button variant="outline" />}>
      نمایش دیالوگ
    </AlertDialogTrigger>
    <AlertDialogContent dir="rtl" lang="fa">
      <AlertDialogHeader>
        <AlertDialogTitle>آیا کاملاً مطمئن هستید؟</AlertDialogTitle>
        <AlertDialogDescription>
          این کار قابل بازگشت نیست. حساب شما برای همیشه از سرورها حذف
          می‌شود.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>انصراف</AlertDialogCancel>
        <AlertDialogAction>ادامه</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>`

const destructiveSnippet = `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Delete account
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogMedia className="bg-destructive/10 text-destructive">
        <Trash2Icon />
      </AlertDialogMedia>
      <AlertDialogTitle>Delete your account?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`

export default function AlertDialogPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Alert Dialog"
        description="A modal dialog that interrupts the user with important content and expects a response."
        slug="alert-dialog"
      />

      <ComponentPreview code={usageSnippet}>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            Show Dialog
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                your account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ComponentPreview>

      <ComponentInstall name="alert-dialog" />

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
          Use the following composition to build an Alert Dialog:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Basic</h3>
          <p className="leading-relaxed text-muted-foreground">
            A basic alert dialog with a title, description, and cancel and
            continue buttons.
          </p>
          <ComponentPreview code={usageSnippet}>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Show Dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Small</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">size=&quot;sm&quot;</code>{" "}
            prop to make the alert dialog smaller.
          </p>
          <ComponentPreview code={smallSnippet}>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Small dialog
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Share this document?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Anyone with the link will be able to view this file.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Share</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Media</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">AlertDialogMedia</code> to
            add an icon or image above the title.
          </p>
          <ComponentPreview code={mediaSnippet}>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                With media
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia>
                    <CircleFadingPlusIcon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Enable extra features?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This adds optional tools to your workspace. You can turn
                    them off later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Not now</AlertDialogCancel>
                  <AlertDialogAction>Enable</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Small with Media
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Combine{" "}
            <code className="font-mono text-sm">size=&quot;sm&quot;</code> with{" "}
            <code className="font-mono text-sm">AlertDialogMedia</code> for a
            compact dialog with an icon.
          </p>
          <ComponentPreview code={smallWithMediaSnippet}>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Small with media
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia>
                    <BluetoothIcon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>
                    Allow accessory to connect?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you want to allow the USB accessory to connect to this
                    device?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Don't allow</AlertDialogCancel>
                  <AlertDialogAction>Allow</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Destructive
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">variant=&quot;destructive&quot;</code>{" "}
            on the action when the confirm step cannot be undone.
          </p>
          <ComponentPreview code={destructiveSnippet}>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Delete account
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <Trash2Icon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Set{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> and{" "}
          <code className="font-mono text-sm">lang=&quot;fa&quot;</code> on the
          trigger wrapper and on{" "}
          <code className="font-mono text-sm">AlertDialogContent</code> so
          layout, actions, and IRANSans XV follow Persian. The panel is portaled,
          so it needs those attributes too.
        </p>
        <ComponentPreview code={rtlSnippet}>
          <div dir="rtl" lang="fa">
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                نمایش دیالوگ
              </AlertDialogTrigger>
              <AlertDialogContent dir="rtl" lang="fa">
                <AlertDialogHeader>
                  <AlertDialogTitle>آیا کاملاً مطمئن هستید؟</AlertDialogTitle>
                  <AlertDialogDescription>
                    این کار قابل بازگشت نیست. حساب شما برای همیشه از سرورها حذف
                    می‌شود.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>انصراف</AlertDialogCancel>
                  <AlertDialogAction>ادامه</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Alert dialogs
            trap focus and require an explicit choice. Prefer this over a
            regular Dialog when the user must confirm or cancel.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AlertDialog
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open
          state.
        </p>
        <PropsTable data={alertDialogPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AlertDialogTrigger
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The element that opens the dialog. Use{" "}
          <code className="font-mono text-sm">render</code> to merge onto a
          Button.
        </p>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AlertDialogContent
        </h3>
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

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AlertDialogAction
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The confirm button. Use a destructive variant for irreversible
          actions.
        </p>
        <PropsTable data={actionPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AlertDialogCancel
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The dismiss button. Closes the dialog without confirming.
        </p>
        <PropsTable data={cancelPropRows} />
      </section>
    </article>
  )
}
