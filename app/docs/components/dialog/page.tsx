import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./docs-dialog"
import {
  EmailField,
  EmailFieldDescription,
  EmailFieldInput,
  EmailFieldLabel,
} from "../email-field/docs-email-field"
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "../text-field/docs-text-field"
import { Button } from "@/components/cubix/button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
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

// Persian trigger buttons need lang="fa" so .group/button:lang(fa)
// picks the "IRANSans Cubix Button D" face (with U+0020 + 103%/47%
// baseline). Without it the trigger falls back to the generic face
// and Geist sets the baseline, so Persian looks unloaded/misaligned.
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex items-center justify-center">
      {children}
    </div>
  )
}

const usageImport = `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog"`

const usageSnippet = `<Dialog>
  <DialogTrigger render={<Button variant="outline" size="sm" />}>
    نمایش دیالوگ
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>آیا کاملاً مطمئن هستید؟</DialogTitle>
      <DialogDescription>
        این کار قابل بازگشت نیست. حساب شما برای همیشه از سرورها حذف می‌شود.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" size="sm" />}>
        انصراف
      </DialogClose>
      <Button variant="destructive" size="sm">
        حذف
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`

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

const formSnippet = `<Dialog>
  <DialogTrigger render={<Button variant="outline" size="sm" />}>
    ویرایش پروفایل
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>ویرایش پروفایل</DialogTitle>
      <DialogDescription>
        تغییرات پروفایل را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.
      </DialogDescription>
    </DialogHeader>
    <div className="mt-2 grid gap-4">
      <TextField>
        <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
        <TextFieldInput placeholder="امین ابدالی" />
      </TextField>
      <EmailField>
        <EmailFieldLabel>ایمیل</EmailFieldLabel>
        <EmailFieldInput placeholder="example@cubix.com" />
        <EmailFieldDescription>
          برای ورود و بازیابی حساب از این ایمیل استفاده می‌شود.
        </EmailFieldDescription>
      </EmailField>
    </div>
    <DialogFooter>
      <DialogClose render={<Button type="submit" size="sm" />}>
        ذخیره تغییرات
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`

const withoutCloseSnippet = `<Dialog>
  <DialogTrigger render={<Button variant="outline" size="sm" />}>
    دیالوگ کوچک
  </DialogTrigger>
  <DialogContent showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>فقط یک دیالوگ کوچک</DialogTitle>
      <DialogDescription>
        می‌توانید دکمه بستن داخلی را مخفی کنید و دکمه خودتان را اضافه کنید.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" size="sm" />}>
        بستن
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`

export default function DialogPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Dialog"
        description={description}
        slug="dialog"
      />

      <ComponentPreview code={usageSnippet}>
        <PreviewShell>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" size="sm" />}>
              نمایش دیالوگ
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>آیا کاملاً مطمئن هستید؟</DialogTitle>
                <DialogDescription>
                  این کار قابل بازگشت نیست. حساب شما برای همیشه از سرورها حذف
                  می‌شود.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" size="sm" />}>
                  انصراف
                </DialogClose>
                <Button variant="destructive" size="sm">
                  حذف
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="dialog" />

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
          Use the following composition to build a Dialog:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Basic</h3>
          <p className="leading-relaxed text-muted-foreground">
            A basic dialog with a title, description, and cancel and confirm
            actions.
          </p>
          <ComponentPreview code={usageSnippet}>
            <PreviewShell>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="sm" />}>
                  نمایش دیالوگ
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>آیا کاملاً مطمئن هستید؟</DialogTitle>
                    <DialogDescription>
                      این کار قابل بازگشت نیست. حساب شما برای همیشه از سرورها
                      حذف می‌شود.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose
                      render={<Button variant="outline" size="sm" />}
                    >
                      انصراف
                    </DialogClose>
                    <Button variant="destructive" size="sm">
                      حذف
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Compose Cubix Text Field and Email Field inside the dialog when you
            need focused editing.
          </p>
          <ComponentPreview code={formSnippet}>
            <PreviewShell>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="sm" />}>
                  ویرایش پروفایل
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>ویرایش پروفایل</DialogTitle>
                    <DialogDescription>
                      تغییرات پروفایل را اینجا اعمال کنید. پس از اتمام، ذخیره
                      را بزنید.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-2 grid gap-4">
                    <TextField>
                      <TextFieldLabel>نام و نام خانوادگی</TextFieldLabel>
                      <TextFieldInput placeholder="امین ابدالی" />
                    </TextField>
                    <EmailField>
                      <EmailFieldLabel>ایمیل</EmailFieldLabel>
                      <EmailFieldInput placeholder="example@cubix.com" />
                      <EmailFieldDescription>
                        برای ورود و بازیابی حساب از این ایمیل استفاده می‌شود.
                      </EmailFieldDescription>
                    </EmailField>
                  </div>
                  <DialogFooter>
                    <DialogClose render={<Button type="submit" size="sm" />}>
                      ذخیره تغییرات
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Without built-in close
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set{" "}
            <code className="font-mono text-sm">showCloseButton={"{false}"}</code>{" "}
            on <code className="font-mono text-sm">DialogContent</code> to hide
            the built-in X button and provide your own.
          </p>
          <ComponentPreview code={withoutCloseSnippet}>
            <PreviewShell>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="sm" />}>
                  دیالوگ کوچک
                </DialogTrigger>
                <DialogContent showCloseButton={false}>
                  <DialogHeader>
                    <DialogTitle>فقط یک دیالوگ کوچک</DialogTitle>
                    <DialogDescription>
                      می‌توانید دکمه بستن داخلی را مخفی کنید و دکمه خودتان را
                      اضافه کنید.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" size="sm" />}>
                      بستن
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </PreviewShell>
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Dialog traps
            focus and dismisses on Escape or backdrop click. Prefer{" "}
            <code className="font-mono text-sm">Alert Dialog</code> when the
            user must confirm or cancel an irreversible action.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Dialog</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open
          state.
        </p>
        <PropsTable data={dialogPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DialogTrigger / DialogClose
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The elements that open and close the dialog. Use{" "}
          <code className="font-mono text-sm">render</code> to merge onto a
          Button.
        </p>
        <PropsTable data={triggerClosePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DialogContent
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The modal panel rendered with a backdrop.
        </p>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DialogHeader / DialogFooter
        </h3>
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
