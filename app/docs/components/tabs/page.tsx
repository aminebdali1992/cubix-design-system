import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  TabsControlledDemo,
  TabsCustomDemo,
  TabsDemo,
  TabsDisabledDemo,
  TabsIconsDemo,
  TabsRemovableDemo,
  TabsVerticalDemo,
} from "@/components/examples/tabs-examples"
import {
  tabsContentPropRows,
  tabsListPropRows,
  tabsPropRows,
  tabsTriggerPropRows,
} from "./tabs-table-data"

const description =
  "A set of layered sections of content, known as tab panels, displayed one at a time."

export const metadata: Metadata = {
  title: "Tabs",
  description,
}

const usageImport = `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cubix/tabs"`

const usageSnippet = `<Tabs defaultValue="account" className="w-full max-w-md">
  <TabsList>
    <TabsTrigger value="account">
      <Icon data-icon="inline-start" />
      حساب کاربری
    </TabsTrigger>
    <TabsTrigger value="password">
      <Icon data-icon="inline-start" />
      گذرواژه
    </TabsTrigger>
  </TabsList>
  <TabsContent value="account">تغییرات حساب کاربری خود را اینجا انجام دهید.</TabsContent>
  <TabsContent value="password">گذرواژه‌ی خود را اینجا تغییر دهید.</TabsContent>
</Tabs>`

const compositionSnippet = `Tabs
├── TabsList
│   └── TabsTrigger (value)
└── TabsContent (value)`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
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

export default function TabsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Tabs" description={description} slug="tabs" />

      <ComponentPreview code={usageSnippet}>
        <PreviewShell>
          <TabsDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="tabs" />

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
          Every <Code>TabsTrigger</Code> is paired with a{" "}
          <Code>TabsContent</Code> that has the same <Code>value</Code>. Tabs
          start right-to-left and follow the closest <Code>dir</Code> on the
          page; pass <Code>dir</Code> to override it. Arrow keys move focus in
          the reading direction, so they are mirrored in RTL.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="With icons"
          description={
            <>
              Put an icon inside the trigger and mark it with{" "}
              <Code>data-icon=&quot;inline-start&quot;</Code> so spacing follows
              the reading direction.
            </>
          }
          code={`<Tabs defaultValue="profile" className="w-full max-w-md">
  <TabsList>
    <TabsTrigger value="profile">
      <ButtonDemoIcon data-icon="inline-start" />
      نمایه
    </TabsTrigger>
    <TabsTrigger value="notifications">
      <ButtonDemoIcon data-icon="inline-start" />
      اعلان‌ها
    </TabsTrigger>
  </TabsList>
  <TabsContent value="profile">تنظیمات نمایه.</TabsContent>
  <TabsContent value="notifications">تنظیمات اعلان‌ها.</TabsContent>
</Tabs>`}
        >
          <TabsIconsDemo />
        </ExampleSection>

        <ExampleSection
          title="Removable"
          description={
            <>
              Pass <Code>onRemove</Code> to a trigger to add a × button at its
              end. The focused tab can also be removed with Delete or Backspace.
            </>
          }
          code={`<TabsTrigger value="inbox" onRemove={() => remove("inbox")}>
  ورودی
</TabsTrigger>`}
        >
          <PreviewShell>
            <TabsRemovableDemo />
          </PreviewShell>
        </ExampleSection>
        <ExampleSection
          title="Vertical"
          description={
            <>
              Use <Code>orientation=&quot;vertical&quot;</Code> to stack the
              triggers. The list is placed at the inline start.
            </>
          }
          code={`<Tabs defaultValue="general" orientation="vertical" className="w-full max-w-lg">
  <TabsList>
    <TabsTrigger value="general">عمومی</TabsTrigger>
    <TabsTrigger value="security">امنیت</TabsTrigger>
    <TabsTrigger value="billing">صورتحساب</TabsTrigger>
  </TabsList>
  <TabsContent value="general">تنظیمات عمومی.</TabsContent>
  <TabsContent value="security">تنظیمات امنیت.</TabsContent>
  <TabsContent value="billing">تنظیمات صورتحساب.</TabsContent>
</Tabs>`}
        >
          <TabsVerticalDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled tab"
          description="A disabled trigger cannot be selected or focused with the arrow keys."
          code={`<Tabs defaultValue="active" className="w-full max-w-md">
  <TabsList>
    <TabsTrigger value="active">فعال</TabsTrigger>
    <TabsTrigger value="disabled" disabled>غیرفعال</TabsTrigger>
  </TabsList>
  <TabsContent value="active">پنل تب فعال.</TabsContent>
  <TabsContent value="disabled">این پنل قابل انتخاب نیست.</TabsContent>
</Tabs>`}
        >
          <TabsDisabledDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Pass <Code>value</Code> and <Code>onValueChange</Code> to own the
              active tab from outside.
            </>
          }
          code={`const [value, setValue] = React.useState("one")

<Tabs value={value} onValueChange={setValue}>
  <TabsList>
    <TabsTrigger value="one">مرحله‌ی ۱</TabsTrigger>
    <TabsTrigger value="two">مرحله‌ی ۲</TabsTrigger>
  </TabsList>
  <TabsContent value="one">محتوای مرحله‌ی ۱.</TabsContent>
  <TabsContent value="two">محتوای مرحله‌ی ۲.</TabsContent>
</Tabs>`}
        >
          <TabsControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Each part accepts a <Code>className</Code> merged with the shipped{" "}
              <Code>cn</Code> helper. The active trigger is marked with{" "}
              <Code>data-active</Code> on Base UI,{" "}
              <Code>data-[state=active]</Code> on Radix and{" "}
              <Code>data-selected</Code> on React Aria, so target the attribute
              your version renders.
            </>
          }
          code={`<TabsList className="h-auto w-full justify-start gap-0 rounded-none bg-transparent bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border),var(--foreground)_10%)_50%,transparent_50%)] bg-[length:6px_1px] bg-repeat-x bg-bottom p-0">
  <TabsTrigger
    value="a"
    className="h-auto w-fit flex-none justify-start rounded-none border-0 border-b border-transparent bg-transparent px-3 pb-3 text-muted-foreground shadow-none after:hidden hover:text-foreground data-active:border-foreground! data-active:text-foreground!"
  >
    نمای کلی
  </TabsTrigger>
</TabsList>`}
        >
          <TabsCustomDemo />
        </ExampleSection>
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
            <code className="font-mono">tabs</code>,{" "}
            <code className="font-mono">tabs-list</code>,{" "}
            <code className="font-mono">tabs-trigger</code>,{" "}
            <code className="font-mono">tabs-content</code>) for targeting.
            Base UI, Radix and React Aria share the same props.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Tabs</h3>
        <PropsTable data={tabsPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TabsList</h3>
        <PropsTable data={tabsListPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TabsTrigger</h3>
        <PropsTable data={tabsTriggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TabsContent</h3>
        <PropsTable data={tabsContentPropRows} />
      </section>
    </article>
  )
}