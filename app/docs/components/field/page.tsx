import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  FieldCheckboxDemo,
  FieldChoiceCardDemo,
  FieldDemo,
  FieldFieldsetDemo,
  FieldGroupDemo,
  FieldInputDemo,
  FieldRadioDemo,
  FieldResponsiveDemo,
  FieldSelectDemo,
  FieldSwitchDemo,
  FieldTextareaDemo,
} from "@/components/examples/field-examples"

import {
  fieldContentPropRows,
  fieldDescriptionPropRows,
  fieldErrorPropRows,
  fieldGroupPropRows,
  fieldLabelPropRows,
  fieldLegendPropRows,
  fieldPropRows,
  fieldSeparatorPropRows,
  fieldSetPropRows,
  fieldTitlePropRows,
} from "./field-table-data"

const description =
  "Combine labels, controls, and help text to compose accessible form fields and grouped inputs."

export const metadata: Metadata = {
  title: "Field",
  description,
}

const usageImport = `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/cubix/field"`

const usageSnippet = `<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full name</FieldLabel>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" autoComplete="off" aria-invalid />
      <FieldError>Choose another username.</FieldError>
    </Field>
    <Field orientation="horizontal">
      <Switch id="newsletter" />
      <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>`

const fieldCompositionSnippet = `Field
├── FieldLabel
├── Input / Textarea / Switch / Select
├── FieldDescription
└── FieldError`

const fieldGroupCompositionSnippet = `FieldGroup
├── Field
│   ├── FieldLabel
│   ├── Input / Textarea / Switch / Select
│   ├── FieldDescription
│   └── FieldError
├── FieldSeparator
└── Field
    ├── FieldLabel
    └── Input / Textarea / Switch / Select`

const fieldSetCompositionSnippet = `FieldSet
├── FieldLegend
├── FieldDescription
└── FieldGroup
    ├── Field
    │   ├── FieldLabel
    │   ├── Input / Textarea / Switch / Select
    │   ├── FieldDescription
    │   └── FieldError
    └── Field
        ├── FieldLabel
        └── Input / Textarea / Switch / Select`

const anatomySnippet = `<Field>
  <FieldLabel htmlFor="input-id">Label</FieldLabel>
  {/* Input, Select, Switch, etc. */}
  <FieldDescription>Optional helper text.</FieldDescription>
  <FieldError>Validation message.</FieldError>
</Field>`

const inputSnippet = `<FieldSet className="w-full max-w-xs">
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" type="text" placeholder="Max Leiter" />
      <FieldDescription>
        Choose a unique username for your account.
      </FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <FieldDescription>
        Must be at least 8 characters long.
      </FieldDescription>
      <Input id="password" type="password" placeholder="••••••••" />
    </Field>
  </FieldGroup>
</FieldSet>`

const textareaSnippet = `<Field>
  <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
  <Textarea
    id="feedback"
    placeholder="Your feedback helps us improve..."
    rows={4}
  />
  <FieldDescription>
    Share your thoughts about our service.
  </FieldDescription>
</Field>`

const selectSnippet = `<Field className="w-full max-w-xs">
  <FieldLabel>Department</FieldLabel>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Choose department" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="engineering">Engineering</SelectItem>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="marketing">Marketing</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  <FieldDescription>
    Select your department or area of work.
  </FieldDescription>
</Field>`

const fieldsetSnippet = `<FieldSet className="w-full max-w-sm">
  <FieldLegend>Address Information</FieldLegend>
  <FieldDescription>
    We need your address to deliver your order.
  </FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="street">Street Address</FieldLabel>
      <Input id="street" type="text" placeholder="123 Main St" />
    </Field>
    <div className="grid grid-cols-2 gap-4">
      <Field>
        <FieldLabel htmlFor="city">City</FieldLabel>
        <Input id="city" type="text" placeholder="New York" />
      </Field>
      <Field>
        <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
        <Input id="zip" type="text" placeholder="90502" />
      </Field>
    </div>
  </FieldGroup>
</FieldSet>`

const checkboxSnippet = `<FieldGroup className="w-full max-w-xs">
  <FieldSet>
    <FieldLegend variant="label">
      Show these items on the desktop
    </FieldLegend>
    <FieldDescription>
      Select the items you want to show on the desktop.
    </FieldDescription>
    <FieldGroup className="gap-3">
      <Field orientation="horizontal">
        <Checkbox id="finder-hard-disks" defaultChecked />
        <FieldLabel htmlFor="finder-hard-disks" className="font-normal">
          Hard disks
        </FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
  <FieldSeparator />
  <Field orientation="horizontal">
    <Checkbox id="finder-sync-folders" defaultChecked />
    <FieldContent>
      <FieldLabel htmlFor="finder-sync-folders">
        Sync Desktop & Documents folders
      </FieldLabel>
      <FieldDescription>
        Your Desktop & Documents folders are being synced with iCloud Drive.
      </FieldDescription>
    </FieldContent>
  </Field>
</FieldGroup>`

const radioSnippet = `<FieldSet className="w-full max-w-xs">
  <FieldLegend variant="label">Subscription Plan</FieldLegend>
  <FieldDescription>
    Yearly and lifetime plans offer significant savings.
  </FieldDescription>
  <RadioGroup defaultValue="monthly">
    <Field orientation="horizontal">
      <RadioGroupItem value="monthly" id="plan-monthly" />
      <FieldLabel htmlFor="plan-monthly" className="font-normal">
        Monthly ($9.99/month)
      </FieldLabel>
    </Field>
    <Field orientation="horizontal">
      <RadioGroupItem value="yearly" id="plan-yearly" />
      <FieldLabel htmlFor="plan-yearly" className="font-normal">
        Yearly ($99.99/year)
      </FieldLabel>
    </Field>
  </RadioGroup>
</FieldSet>`

const switchSnippet = `<Field orientation="horizontal" className="w-fit">
  <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
  <Switch id="2fa" />
</Field>`

const choiceCardSnippet = `<FieldGroup className="w-full max-w-xs">
  <FieldSet>
    <FieldLegend variant="label">Compute Environment</FieldLegend>
    <FieldDescription>
      Select the compute environment for your cluster.
    </FieldDescription>
    <RadioGroup defaultValue="kubernetes">
      <FieldLabel htmlFor="kubernetes-r2h">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Kubernetes</FieldTitle>
            <FieldDescription>
              Run GPU workloads on a K8s cluster.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  </FieldSet>
</FieldGroup>`

const groupSnippet = `<FieldGroup className="w-full max-w-xs">
  <FieldSet>
    <FieldLabel>Responses</FieldLabel>
    <FieldDescription>
      Get notified when requests take time.
    </FieldDescription>
    <FieldGroup data-slot="checkbox-group">
      <Field orientation="horizontal">
        <Checkbox id="push" defaultChecked disabled />
        <FieldLabel htmlFor="push" className="font-normal">
          Push notifications
        </FieldLabel>
      </Field>
    </FieldGroup>
  </FieldSet>
  <FieldSeparator />
  <FieldSet>
    <FieldLabel>Tasks</FieldLabel>
    <FieldDescription>
      Get notified when tasks you&apos;ve created have updates.{" "}
      <a href="#">Manage tasks</a>
    </FieldDescription>
  </FieldSet>
</FieldGroup>`

const responsiveSnippet = `<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>Fill in your profile information.</FieldDescription>
  <FieldGroup>
    <Field orientation="responsive">
      <FieldContent>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <FieldDescription>
          Provide your full name for identification
        </FieldDescription>
      </FieldContent>
      <Input id="name" placeholder="Evil Rabbit" required />
    </Field>
    <Field orientation="responsive">
      <Button type="submit">Submit</Button>
      <Button type="button" variant="outline">Cancel</Button>
    </Field>
  </FieldGroup>
</FieldSet>`

const validationSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-invalid />
  <FieldError>Enter a valid email address.</FieldError>
</Field>`

export default function FieldDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Field"
        description={description}
        slug="field"
      />

      <ComponentPreview
        code={usageSnippet}
        previewClassName="min-h-[800px] md:min-h-[850px]"
      >
        <FieldDemo />
      </ComponentPreview>

      <ComponentInstall name="field" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Field</h3>
          <p className="leading-relaxed text-muted-foreground">
            A single control with label, helper text, and validation.
          </p>
          <CodeBlock code={fieldCompositionSnippet} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldGroup
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Related fields in one group. Use{" "}
            <code className="font-mono text-sm">FieldSeparator</code> between
            sections when needed.
          </p>
          <CodeBlock code={fieldGroupCompositionSnippet} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">FieldSet</h3>
          <p className="leading-relaxed text-muted-foreground">
            Semantic grouping with a legend and description, usually containing
            a <code className="font-mono text-sm">FieldGroup</code>.
          </p>
          <CodeBlock code={fieldSetCompositionSnippet} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Anatomy</h2>
        <p className="leading-relaxed text-muted-foreground">
          The <code className="font-mono text-sm">Field</code> family is designed
          for composing accessible forms. A typical field is structured as
          follows:
        </p>
        <CodeBlock code={anatomySnippet} />
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <code className="font-mono text-sm">Field</code> is the core wrapper
            for a single field.
          </li>
          <li>
            <code className="font-mono text-sm">FieldContent</code> is a flex
            column that groups label and description. Not required if you have
            no description.
          </li>
          <li>
            Wrap related fields with{" "}
            <code className="font-mono text-sm">FieldGroup</code>, and use{" "}
            <code className="font-mono text-sm">FieldSet</code> with{" "}
            <code className="font-mono text-sm">FieldLegend</code> for semantic
            grouping.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Input</h2>
        <ComponentPreview code={inputSnippet}>
          <FieldInputDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Textarea</h2>
        <ComponentPreview code={textareaSnippet}>
          <FieldTextareaDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Select</h2>
        <ComponentPreview code={selectSnippet}>
          <FieldSelectDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Fieldset</h2>
        <ComponentPreview code={fieldsetSnippet}>
          <FieldFieldsetDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Checkbox</h2>
        <ComponentPreview
          code={checkboxSnippet}
          previewClassName="min-h-[32rem]"
        >
          <FieldCheckboxDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Radio</h2>
        <ComponentPreview code={radioSnippet}>
          <FieldRadioDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Switch</h2>
        <ComponentPreview code={switchSnippet}>
          <FieldSwitchDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Choice Card
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap <code className="font-mono text-sm">Field</code> components
          inside <code className="font-mono text-sm">FieldLabel</code> to create
          selectable field groups. This works with radio, checkbox, and switch
          controls.
        </p>
        <ComponentPreview code={choiceCardSnippet}>
          <FieldChoiceCardDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Field Group
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Stack <code className="font-mono text-sm">Field</code> components with{" "}
          <code className="font-mono text-sm">FieldGroup</code>. Add{" "}
          <code className="font-mono text-sm">FieldSeparator</code> to divide
          them.
        </p>
        <ComponentPreview code={groupSnippet} previewClassName="min-h-96">
          <FieldGroupDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Responsive Layout
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <strong className="font-medium text-foreground">
              Vertical fields:
            </strong>{" "}
            Default orientation stacks label, control, and helper text - ideal
            for mobile-first layouts.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              Horizontal fields:
            </strong>{" "}
            Set{" "}
            <code className="font-mono text-sm">orientation=&quot;horizontal&quot;</code>{" "}
            on <code className="font-mono text-sm">Field</code> to align the
            label and control side-by-side. Pair with{" "}
            <code className="font-mono text-sm">FieldContent</code> to keep
            descriptions aligned.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              Responsive fields:
            </strong>{" "}
            Set{" "}
            <code className="font-mono text-sm">orientation=&quot;responsive&quot;</code>{" "}
            for automatic column layouts inside container-aware parents. Apply{" "}
            <code className="font-mono text-sm">@container/field-group</code>{" "}
            classes on <code className="font-mono text-sm">FieldGroup</code> to
            switch orientations at specific breakpoints.
          </li>
        </ul>
        <ComponentPreview
          code={responsiveSnippet}
          previewClassName="min-h-[650px] md:min-h-[500px]"
        >
          <FieldResponsiveDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Validation and Errors
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            Add <code className="font-mono text-sm">data-invalid</code> to{" "}
            <code className="font-mono text-sm">Field</code> to switch the entire
            block into an error state.
          </li>
          <li>
            Add <code className="font-mono text-sm">aria-invalid</code> on the
            input itself for assistive technologies.
          </li>
          <li>
            Render <code className="font-mono text-sm">FieldError</code>{" "}
            immediately after the control or inside{" "}
            <code className="font-mono text-sm">FieldContent</code> to keep
            error messages aligned with the field.
          </li>
        </ul>
        <CodeBlock code={validationSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <code className="font-mono text-sm">FieldSet</code> and{" "}
            <code className="font-mono text-sm">FieldLegend</code> keep related
            controls grouped for keyboard and assistive tech users.
          </li>
          <li>
            <code className="font-mono text-sm">Field</code> outputs{" "}
            <code className="font-mono text-sm">role=&quot;group&quot;</code> so
            nested controls inherit labeling from{" "}
            <code className="font-mono text-sm">FieldLabel</code> and{" "}
            <code className="font-mono text-sm">FieldLegend</code> when
            combined.
          </li>
          <li>
            Apply <code className="font-mono text-sm">FieldSeparator</code>{" "}
            sparingly to ensure screen readers encounter clear section
            boundaries.
          </li>
        </ul>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldSet
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Container that renders a semantic{" "}
            <code className="font-mono text-sm">fieldset</code> with spacing
            presets.
          </p>
          <PropsTable data={fieldSetPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldLegend
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Legend element for a{" "}
            <code className="font-mono text-sm">FieldSet</code>. Switch to the{" "}
            <code className="font-mono text-sm">label</code> variant to align
            with label sizing.
          </p>
          <PropsTable data={fieldLegendPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldGroup
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Layout wrapper that stacks{" "}
            <code className="font-mono text-sm">Field</code> components and
            enables container queries for responsive orientations.
          </p>
          <PropsTable data={fieldGroupPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Field</h3>
          <p className="leading-relaxed text-muted-foreground">
            The core wrapper for a single field. Provides orientation control,
            invalid state styling, and spacing.
          </p>
          <PropsTable data={fieldPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldContent
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Flex column that groups control and descriptions when the label sits
            beside the control. Not required if you have no description.
          </p>
          <PropsTable data={fieldContentPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldLabel
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Label styled for both direct inputs and nested{" "}
            <code className="font-mono text-sm">Field</code> children.
          </p>
          <PropsTable data={fieldLabelPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldTitle
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Renders a title with label styling inside{" "}
            <code className="font-mono text-sm">FieldContent</code>.
          </p>
          <PropsTable data={fieldTitlePropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldDescription
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Helper text slot that automatically balances long lines in
            horizontal layouts.
          </p>
          <PropsTable data={fieldDescriptionPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldSeparator
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Visual divider to separate sections inside a{" "}
            <code className="font-mono text-sm">FieldGroup</code>. Accepts
            optional inline content.
          </p>
          <PropsTable data={fieldSeparatorPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            FieldError
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Accessible error container that accepts children or an{" "}
            <code className="font-mono text-sm">errors</code> array.
          </p>
          <PropsTable data={fieldErrorPropRows} />
        </div>
      </section>
    </article>
  )
}
