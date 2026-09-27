import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  VerifyCodeCustomDemo,
  VerifyCodeDemo,
  VerifyCodeDisabledDemo,
  VerifyCodeFilledDemo,
  VerifyCodeFormDemo,
  VerifyCodeGroupsDemo,
  VerifyCodeInvalidDemo,
  VerifyCodeLengthDemo,
  VerifyCodeResendDemo,
  VerifyCodeSizesDemo,
} from "@/components/examples/verify-code-examples"
import {
  verifyCodeControlPropRows,
  verifyCodeDigitPropRows,
  verifyCodePartPropRows,
  verifyCodePropRows,
  verifyCodeResendPropRows,
  verifyCodeSeparatorPropRows,
} from "./verify-code-table-data"

const description =
  "A labeled one-time verify code field with separate digit boxes. Set length for box count and groups to insert - separators between digit groups. Values always display as Persian digits."

export const metadata: Metadata = {
  title: "Verify Code",
  description,
}

const usageImport = `import {
  VerifyCode,
  VerifyCodeControl,
  VerifyCodeLabel,
  VerifyCodeResend,
  formatVerifyCodeValue,
  parseVerifyCodeValue,
} from "@/components/cubix/verify-code"`

const usageSnippet = `<VerifyCode length={6}>
  <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
</VerifyCode>`

const compositionSnippet = `VerifyCode
├── VerifyCodeLabel
├── VerifyCodeControl
│   ├── VerifyCodeDigit × group
│   ├── VerifyCodeSeparator (when groups is set)
│   └── VerifyCodeDigit × group
├── VerifyCodeResend
├── VerifyCodeDescription (optional)
└── VerifyCodeError (optional)`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full min-w-0 justify-center">
      {children}
    </div>
  )
}

export default function VerifyCodePage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Verify Code"
        description={description}
        slug="verify-code"
      />

      <ComponentPreview code={usageSnippet}>
        <PreviewShell>
          <VerifyCodeDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="verify-code" />

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
          Compose label, control, and resend timer under{" "}
          <code className="font-mono text-sm">VerifyCode</code>.{" "}
          <code className="font-mono text-sm">VerifyCodeControl</code> renders{" "}
          <code className="font-mono text-sm">length</code> digit boxes
          (default 6, clamped 4-8). Pass{" "}
          <code className="font-mono text-sm">groups</code> on the root - for
          example{" "}
          <code className="font-mono text-sm">groups=&#123;[3, 3]&#125;</code> -
          to insert a{" "}
          <code className="font-mono text-sm">-</code> between digit groups.
          Digits always display in Persian. Filling a box moves focus to the
          next; Backspace on an empty box clears the previous digit and moves
          back. Arrow keys move between boxes. Paste a full code to fill all
          parts. The label focuses the first digit box.{" "}
          <code className="font-mono text-sm">VerifyCodeDescription</code> and{" "}
          <code className="font-mono text-sm">VerifyCodeError</code> are
          optional helper parts wired through{" "}
          <code className="font-mono text-sm">aria-describedby</code>.{" "}
          <code className="font-mono text-sm">VerifyCodeResend</code> is the
          fixed helper row under the boxes: a countdown (default 1 minute) in a
          muted badge; when it ends, the helper text becomes دریافت مجدد کد
          تایید and the same badge shows دریافت مجدد. Clicking the badge
          restarts the countdown and calls{" "}
          <code className="font-mono text-sm">onResend</code>. Set{" "}
          <code className="font-mono text-sm">invalid</code> to mark the digit
          boxes with a destructive border. The control uses{" "}
          <code className="font-mono text-sm">dir=&quot;ltr&quot;</code> so
          digits follow left-to-right order on RTL pages. Use{" "}
          <code className="font-mono text-sm">parseVerifyCodeValue</code> and{" "}
          <code className="font-mono text-sm">formatVerifyCodeValue</code> for
          the combined string.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Resend</h3>
          <p className="leading-relaxed text-muted-foreground">
            <code className="font-mono text-sm">VerifyCodeResend</code> is
            included under the control in every example. Pass{" "}
            <code className="font-mono text-sm">duration</code> in seconds to
            customize - for example{" "}
            <code className="font-mono text-sm">duration=&#123;120&#125;</code>{" "}
            for two minutes (default is 60). When the timer ends, the helper
            text becomes دریافت مجدد کد تایید and the same badge shows دریافت
            مجدد; clicking it restarts the countdown and calls{" "}
            <code className="font-mono text-sm">onResend</code>.
          </p>
          <ComponentPreview
            code={`<VerifyCode>
  <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend duration={120} />
</VerifyCode>`}
          >
            <PreviewShell>
              <VerifyCodeResendDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Length</h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">length</code> on the root
            to change how many digit boxes render (4 to 8).
          </p>
          <ComponentPreview
            code={`<VerifyCode length={4}>
  <VerifyCodeLabel>کد ۴ رقمی</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
</VerifyCode>

<VerifyCode length={6}>
  <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
</VerifyCode>`}
          >
            <PreviewShell>
              <VerifyCodeLengthDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Groups</h3>
          <p className="leading-relaxed text-muted-foreground">
            Pass <code className="font-mono text-sm">groups</code> on the root
            to insert a <code className="font-mono text-sm">-</code> between
            digit groups. The numbers must sum to{" "}
            <code className="font-mono text-sm">length</code> - for example{" "}
            <code className="font-mono text-sm">
              groups=&#123;[3, 3]&#125;
            </code>{" "}
            or{" "}
            <code className="font-mono text-sm">
              groups=&#123;[2, 2, 2]&#125;
            </code>
            .
          </p>
          <ComponentPreview
            code={`<VerifyCode length={6} groups={[3, 3]}>
  <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
</VerifyCode>

<VerifyCode length={6} groups={[2, 2, 2]}>
  <VerifyCodeLabel>کد ۶ رقمی</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
</VerifyCode>`}
          >
            <PreviewShell>
              <VerifyCodeGroupsDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Filled</h3>
          <p className="leading-relaxed text-muted-foreground">
            Pass <code className="font-mono text-sm">defaultValue</code> on the
            root to show a completed code.
          </p>
          <ComponentPreview
            code={`<VerifyCode defaultValue="۱۲۳۴۵۶">
  <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
</VerifyCode>`}
          >
            <PreviewShell>
              <VerifyCodeFilledDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">invalid</code> on the root
            to apply destructive border styles on the digit boxes. Compose{" "}
            <code className="font-mono text-sm">VerifyCodeError</code> for an
            error message linked to the digit inputs.
          </p>
          <ComponentPreview
            code={`<VerifyCode invalid defaultValue="۱۲۳۴">
  <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
  <VerifyCodeError>کد تایید معتبر نیست.</VerifyCodeError>
</VerifyCode>`}
          >
            <PreviewShell>
              <VerifyCodeInvalidDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">disabled</code> on the root
            to prevent editing and pause the resend countdown.
          </p>
          <ComponentPreview
            code={`<VerifyCode disabled>
  <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
</VerifyCode>`}
          >
            <PreviewShell>
              <VerifyCodeDisabledDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">size=&quot;lg&quot;</code>{" "}
            for taller digit boxes.
          </p>
          <ComponentPreview
            code={`<VerifyCode size="default">
  <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
</VerifyCode>

<VerifyCode size="lg">
  <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
  <VerifyCodeControl />
  <VerifyCodeResend />
</VerifyCode>`}
          >
            <PreviewShell>
              <VerifyCodeSizesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">name</code> on the root to
            submit a combined code value. Compose with Button for a complete
            block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6">
  <VerifyCode name="verifyCode">
    <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
    <VerifyCodeControl />
    <VerifyCodeResend />
  </VerifyCode>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">تایید</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <VerifyCodeFormDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Custom styling
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Pass{" "}
            <code className="font-mono text-sm">digitClassName</code> on{" "}
            <code className="font-mono text-sm">VerifyCodeControl</code> to
            style every auto-rendered digit box:
          </p>
          <ComponentPreview
            code={`<VerifyCode>
  <VerifyCodeLabel>کد تایید</VerifyCodeLabel>
  <VerifyCodeControl digitClassName="border-border bg-muted dark:bg-muted" />
  <VerifyCodeResend />
</VerifyCode>`}
          >
            <PreviewShell>
              <VerifyCodeCustomDemo />
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
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <code className="font-mono">data-slot</code> attributes (
            <code className="font-mono">verify-code</code>,{" "}
            <code className="font-mono">verify-code-label</code>,{" "}
            <code className="font-mono">verify-code-control</code>,{" "}
            <code className="font-mono">verify-code-digit</code>,{" "}
            <code className="font-mono">verify-code-separator</code>,{" "}
            <code className="font-mono">verify-code-resend</code>,{" "}
            <code className="font-mono">verify-code-timer</code>,{" "}
            <code className="font-mono">verify-code-description</code>,{" "}
            <code className="font-mono">verify-code-error</code>) for targeting
            in tests and parent selectors. Helpers{" "}
            <code className="font-mono">formatVerifyCodeValue</code>,{" "}
            <code className="font-mono">parseVerifyCodeValue</code>, and{" "}
            <code className="font-mono">formatVerifyCodeTimer</code> convert
            between display strings, the digit array, and the countdown label.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          VerifyCode
        </h3>
        <PropsTable data={verifyCodePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          VerifyCodeControl
        </h3>
        <PropsTable data={verifyCodeControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          VerifyCodeDigit
        </h3>
        <PropsTable data={verifyCodeDigitPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          VerifyCodeSeparator
        </h3>
        <PropsTable data={verifyCodeSeparatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          VerifyCodeResend
        </h3>
        <PropsTable data={verifyCodeResendPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          VerifyCodeLabel / Description / Error
        </h3>
        <PropsTable data={verifyCodePartPropRows} />
      </section>
    </article>
  )
}
