import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  CreditCardCustomDemo,
  CreditCardDemo,
  CreditCardDescriptionDemo,
  CreditCardDisabledDemo,
  CreditCardFilledDemo,
  CreditCardFormDemo,
  CreditCardInvalidDemo,
  CreditCardSizesDemo,
} from "@/components/examples/credit-card-examples"
import {
  creditCardControlPropRows,
  creditCardPartPropRows,
  creditCardPropRows,
  creditCardSegmentPropRows,
  creditCardSeparatorPropRows,
} from "./credit-card-table-data"

const description =
  "A labeled credit card number field with four separate 4-digit inputs. Values always display as Persian digits. After six digits, the helper text shows the issuer bank name when the BIN is known."

export const metadata: Metadata = {
  title: "Credit Card",
  description,
}

const usageImport = `import {
  CreditCard,
  CreditCardControl,
  CreditCardDescription,
  CreditCardError,
  CreditCardGroup1,
  CreditCardGroup2,
  CreditCardGroup3,
  CreditCardGroup4,
  CreditCardLabel,
  CreditCardSeparator,
  formatCreditCardValue,
  parseCreditCardValue,
  getCreditCardBankName,
} from "@/components/cubix/credit-card"`

const usageSnippet = `<CreditCard>
  <CreditCardLabel>شماره کارت</CreditCardLabel>
  <CreditCardControl>
    <CreditCardGroup1 />
    <CreditCardSeparator />
    <CreditCardGroup2 />
    <CreditCardSeparator />
    <CreditCardGroup3 />
    <CreditCardSeparator />
    <CreditCardGroup4 />
  </CreditCardControl>
  <CreditCardDescription>
    لطفاً شماره کارت را در چهار گروه چهاررقمی وارد کنید.
  </CreditCardDescription>
</CreditCard>`

const compositionSnippet = `CreditCard
├── CreditCardLabel
├── CreditCardControl
│   ├── CreditCardGroup1
│   ├── CreditCardSeparator
│   ├── CreditCardGroup2
│   ├── CreditCardSeparator
│   ├── CreditCardGroup3
│   ├── CreditCardSeparator
│   └── CreditCardGroup4
├── CreditCardDescription
└── CreditCardError`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full min-w-0 justify-center">
      {children}
    </div>
  )
}

export default function CreditCardPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Credit Card"
        description={description}
        slug="credit-card"
      />

      <ComponentPreview code={usageSnippet}>
        <PreviewShell>
          <CreditCardDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="credit-card" />

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
          Compose label, control, help text, and error under{" "}
          <code className="font-mono text-sm">CreditCard</code>. Inside the
          control, four groups each render as a separate input box with{" "}
          <code className="font-mono text-sm">CreditCardSeparator</code>{" "}
          between them (default <code className="font-mono text-sm">-</code>).
          Digits always display in Persian. Filling a group moves focus to the
          next; Backspace on an empty group moves back. Paste a full card
          number to fill all parts. After six digits,{" "}
          <code className="font-mono text-sm">CreditCardDescription</code>{" "}
          shows the issuer bank name (for example بانک ملت) when the BIN is
          known; otherwise it keeps your helper text. The control uses{" "}
          <code className="font-mono text-sm">dir=&quot;ltr&quot;</code> so
          groups follow international card order on RTL pages. Use{" "}
          <code className="font-mono text-sm">parseCreditCardValue</code>,{" "}
          <code className="font-mono text-sm">formatCreditCardValue</code>, and{" "}
          <code className="font-mono text-sm">getCreditCardBankName</code> for
          the combined string and bank lookup.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Description
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            <code className="font-mono text-sm">CreditCardDescription</code>{" "}
            sits under the control for helper copy.
          </p>
          <ComponentPreview
            code={`<CreditCard>
  <CreditCardLabel>شماره کارت</CreditCardLabel>
  <CreditCardControl>
    <CreditCardGroup1 />
    <CreditCardSeparator />
    <CreditCardGroup2 />
    <CreditCardSeparator />
    <CreditCardGroup3 />
    <CreditCardSeparator />
    <CreditCardGroup4 />
  </CreditCardControl>
  <CreditCardDescription>
    لطفاً شماره کارت را در چهار گروه چهاررقمی وارد کنید.
  </CreditCardDescription>
</CreditCard>`}
          >
            <PreviewShell>
              <CreditCardDescriptionDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Filled</h3>
          <p className="leading-relaxed text-muted-foreground">
            Pass <code className="font-mono text-sm">defaultValue</code> on
            each group to show a completed card number.
          </p>
          <ComponentPreview
            code={`<CreditCard>
  <CreditCardLabel>شماره کارت</CreditCardLabel>
  <CreditCardControl>
    <CreditCardGroup1 defaultValue="۶۱۰۴" />
    <CreditCardSeparator />
    <CreditCardGroup2 defaultValue="۳۳۹۹" />
    <CreditCardSeparator />
    <CreditCardGroup3 defaultValue="۱۲۳۴" />
    <CreditCardSeparator />
    <CreditCardGroup4 defaultValue="۵۶۷۸" />
  </CreditCardControl>
</CreditCard>`}
          >
            <PreviewShell>
              <CreditCardFilledDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">invalid</code> on the root
            to apply destructive styles and show the error message.
          </p>
          <ComponentPreview
            code={`<CreditCard invalid>
  <CreditCardLabel>شماره کارت</CreditCardLabel>
  <CreditCardControl>
    <CreditCardGroup1 defaultValue="۶۰۳۷" />
    <CreditCardSeparator />
    <CreditCardGroup2 defaultValue="۹۹۷۷" />
    <CreditCardSeparator />
    <CreditCardGroup3 defaultValue="۱۲۳۴" />
    <CreditCardSeparator />
    <CreditCardGroup4 defaultValue="۰۰" />
  </CreditCardControl>
  <CreditCardError>یک شماره کارت معتبر وارد کنید.</CreditCardError>
</CreditCard>`}
          >
            <PreviewShell>
              <CreditCardInvalidDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable the field to block interaction. Segments use a muted fill;
            label and description stay readable.
          </p>
          <ComponentPreview
            code={`<CreditCard disabled>
  <CreditCardLabel>شماره کارت</CreditCardLabel>
  <CreditCardControl>
    <CreditCardGroup1 />
    <CreditCardSeparator />
    <CreditCardGroup2 />
    <CreditCardSeparator />
    <CreditCardGroup3 />
    <CreditCardSeparator />
    <CreditCardGroup4 />
  </CreditCardControl>
</CreditCard>`}
          >
            <PreviewShell>
              <CreditCardDisabledDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
          <p className="leading-relaxed text-muted-foreground">
            Two heights ship by default:{" "}
            <code className="font-mono text-sm">default</code> (40px) and{" "}
            <code className="font-mono text-sm">lg</code> (48px). Use{" "}
            <code className="font-mono text-sm">className</code> for any other
            size.
          </p>
          <ComponentPreview
            code={`<CreditCard size="default">
  <CreditCardLabel>شماره کارت</CreditCardLabel>
  <CreditCardControl>
    <CreditCardGroup1 />
    <CreditCardSeparator />
    <CreditCardGroup2 />
    <CreditCardSeparator />
    <CreditCardGroup3 />
    <CreditCardSeparator />
    <CreditCardGroup4 />
  </CreditCardControl>
  <CreditCardDescription>ارتفاع ۴۰ پیکسل</CreditCardDescription>
</CreditCard>
<CreditCard size="lg">
  <CreditCardLabel>شماره کارت</CreditCardLabel>
  <CreditCardControl>
    <CreditCardGroup1 />
    <CreditCardSeparator />
    <CreditCardGroup2 />
    <CreditCardSeparator />
    <CreditCardGroup3 />
    <CreditCardSeparator />
    <CreditCardGroup4 />
  </CreditCardControl>
  <CreditCardDescription>ارتفاع ۴۸ پیکسل</CreditCardDescription>
</CreditCard>`}
          >
            <PreviewShell>
              <CreditCardSizesDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            In a form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">name</code> on the root to
            submit a combined group value. Compose with Button for a complete
            block.
          </p>
          <ComponentPreview
            previewClassName="bg-muted"
            code={`<form className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6">
  <CreditCard name="cardNumber">
    <CreditCardLabel>شماره کارت</CreditCardLabel>
    <CreditCardControl>
      <CreditCardGroup1 />
      <CreditCardSeparator />
      <CreditCardGroup2 />
      <CreditCardSeparator />
      <CreditCardGroup3 />
      <CreditCardSeparator />
      <CreditCardGroup4 />
    </CreditCardControl>
    <CreditCardDescription>
      لطفاً شماره کارت را در چهار گروه چهاررقمی وارد کنید.
    </CreditCardDescription>
  </CreditCard>
  <div className="grid grid-cols-2 gap-2">
    <Button type="button" variant="outline">انصراف</Button>
    <Button type="submit">ادامه</Button>
  </div>
</form>`}
          >
            <PreviewShell>
              <CreditCardFormDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Custom styling
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Every part accepts a{" "}
            <code className="font-mono text-sm">className</code> merged with
            the shipped <code className="font-mono text-sm">cn</code> helper.
            Here each group uses a filled surface instead of the default
            outline:
          </p>
          <ComponentPreview
            code={`<CreditCard>
  <CreditCardLabel>شماره کارت</CreditCardLabel>
  <CreditCardControl>
    <CreditCardGroup1 className="border-border bg-muted dark:bg-muted" />
    <CreditCardSeparator />
    <CreditCardGroup2 className="border-border bg-muted dark:bg-muted" />
    <CreditCardSeparator />
    <CreditCardGroup3 className="border-border bg-muted dark:bg-muted" />
    <CreditCardSeparator />
    <CreditCardGroup4 className="border-border bg-muted dark:bg-muted" />
  </CreditCardControl>
</CreditCard>`}
          >
            <PreviewShell>
              <CreditCardCustomDemo />
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
            <code className="font-mono">credit-card</code>,{" "}
            <code className="font-mono">credit-card-label</code>,{" "}
            <code className="font-mono">credit-card-control</code>,{" "}
            <code className="font-mono">credit-card-group-1</code> through{" "}
            <code className="font-mono">credit-card-group-4</code>,{" "}
            <code className="font-mono">credit-card-separator</code>,{" "}
            <code className="font-mono">credit-card-description</code>,{" "}
            <code className="font-mono">credit-card-error</code>) for targeting
            in tests and parent selectors. Helpers{" "}
            <code className="font-mono">formatCreditCardValue</code>,{" "}
            <code className="font-mono">parseCreditCardValue</code>, and{" "}
            <code className="font-mono">getCreditCardBankName</code> convert
            between display strings, the four groups, and the issuer bank name.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CreditCard
        </h3>
        <PropsTable data={creditCardPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CreditCardControl
        </h3>
        <PropsTable data={creditCardControlPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CreditCardGroup1 / Group2 / Group3 / Group4
        </h3>
        <PropsTable data={creditCardSegmentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CreditCardSeparator
        </h3>
        <PropsTable data={creditCardSeparatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          CreditCardLabel / Description / Error
        </h3>
        <PropsTable data={creditCardPartPropRows} />
      </section>
    </article>
  )
}
