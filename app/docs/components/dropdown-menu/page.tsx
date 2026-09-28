import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  DropdownMenuBasicDemo,
  DropdownMenuCheckboxesDemo,
  DropdownMenuCheckboxesIconsDemo,
  DropdownMenuDemo,
  DropdownMenuDestructiveDemo,
  DropdownMenuIconsDemo,
  DropdownMenuIndicatorDemo,
  DropdownMenuRadioGroupDemo,
  DropdownMenuSubmenuDemo,
} from "@/components/examples/dropdown-menu-examples"

import {
  checkboxItemPropRows,
  contentPropRows,
  dropdownMenuPropRows,
  itemPropRows,
  labelPropRows,
  radioGroupPropRows,
  radioItemPropRows,
  subContentPropRows,
  subTriggerPropRows,
  triggerPropRows,
} from "./dropdown-menu-table-data"

const description =
  "Displays a menu of actions or options to the user, triggered by a button."

export const metadata: Metadata = {
  title: "Dropdown Menu",
  description,
}

const usageImport = `import { Button } from "@/components/cubix/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/cubix/dropdown-menu"`

const usageSnippet = `<DropdownMenu dir="rtl" lang="fa">
  <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
    باز کردن
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>زبانه جدید</DropdownMenuItem>
    <DropdownMenuItem>پنجره جدید</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>چاپ</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

const compositionSnippet = `DropdownMenu
├── DropdownMenuTrigger
└── DropdownMenuContent
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   └── DropdownMenuItem
    ├── DropdownMenuItem
    ├── DropdownMenuSeparator
    ├── DropdownMenuCheckboxItem
    ├── DropdownMenuRadioGroup
    │   └── DropdownMenuRadioItem
    └── DropdownMenuSub
        ├── DropdownMenuSubTrigger
        └── DropdownMenuSubContent
            └── DropdownMenuItem`

const demoSnippet = `<DropdownMenu dir="rtl" lang="fa">
  <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
    باز کردن
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>پنجره‌ها</DropdownMenuLabel>
      <DropdownMenuItem>زبانه جدید</DropdownMenuItem>
      <DropdownMenuItem>پنجره جدید</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>اشتراک‌گذاری</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>لینک ایمیل</DropdownMenuItem>
        <DropdownMenuItem>پیام‌ها</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuLabel>نمایش</DropdownMenuLabel>
      <DropdownMenuCheckboxItem>نوار ابزار</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem defaultChecked>
        نوار وضعیت
      </DropdownMenuCheckboxItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`

const basicSnippet = `<DropdownMenu dir="rtl" lang="fa">
  <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
    باز کردن
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>پنجره‌ها</DropdownMenuLabel>
      <DropdownMenuItem>زبانه جدید</DropdownMenuItem>
      <DropdownMenuItem>پنجره جدید</DropdownMenuItem>
      <DropdownMenuItem disabled>پنجره ناشناس</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>چاپ</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

const iconsSnippet = `import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

<DropdownMenuContent>
  <DropdownMenuItem>
    <ButtonDemoIcon />
    زبانه جدید
  </DropdownMenuItem>
  <DropdownMenuItem>
    <ButtonDemoIcon />
    پنجره جدید
  </DropdownMenuItem>
  <DropdownMenuItem disabled>
    <ButtonDemoIcon />
    پنجره ناشناس
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <ButtonDemoIcon />
      اشتراک‌گذاری
    </DropdownMenuSubTrigger>
    <DropdownMenuSubContent>
      <DropdownMenuItem>
        <ButtonDemoIcon />
        لینک ایمیل
      </DropdownMenuItem>
      <DropdownMenuItem>
        <ButtonDemoIcon />
        پیام‌ها
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  </DropdownMenuSub>
  <DropdownMenuSeparator />
  <DropdownMenuItem>
    <ButtonDemoIcon />
    چاپ
  </DropdownMenuItem>
</DropdownMenuContent>`

const submenuSnippet = `<DropdownMenuContent>
  <DropdownMenuItem>واگرد</DropdownMenuItem>
  <DropdownMenuItem>بازگردانی</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>یافتن</DropdownMenuSubTrigger>
    <DropdownMenuSubContent>
      <DropdownMenuItem>یافتن</DropdownMenuItem>
      <DropdownMenuItem>یافتن بعدی</DropdownMenuItem>
      <DropdownMenuItem>یافتن قبلی</DropdownMenuItem>
    </DropdownMenuSubContent>
  </DropdownMenuSub>
  <DropdownMenuSeparator />
  <DropdownMenuItem>برش</DropdownMenuItem>
  <DropdownMenuItem>کپی</DropdownMenuItem>
  <DropdownMenuItem>جای‌گذاری</DropdownMenuItem>
</DropdownMenuContent>`

const checkboxesSnippet = `<DropdownMenuContent>
  <DropdownMenuGroup>
    <DropdownMenuLabel>نمایش</DropdownMenuLabel>
    <DropdownMenuCheckboxItem>نوار ابزار</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem defaultChecked>
      نوار وضعیت
    </DropdownMenuCheckboxItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem>بارگذاری مجدد</DropdownMenuItem>
  <DropdownMenuItem disabled>بارگذاری اجباری</DropdownMenuItem>
</DropdownMenuContent>`

const checkboxesIconsSnippet = `import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

<DropdownMenuContent>
  <DropdownMenuGroup>
    <DropdownMenuLabel>نمایش</DropdownMenuLabel>
    <DropdownMenuCheckboxItem>
      <ButtonDemoIcon />
      نوار ابزار
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem defaultChecked>
      <ButtonDemoIcon />
      نوار وضعیت
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem disabled>
      <ButtonDemoIcon />
      نوار کناری
    </DropdownMenuCheckboxItem>
  </DropdownMenuGroup>
</DropdownMenuContent>`

const radioSnippet = `const [user, setUser] = React.useState("sara")

<DropdownMenuContent>
  <DropdownMenuRadioGroup value={user} onValueChange={setUser}>
    <DropdownMenuLabel>کاربر</DropdownMenuLabel>
    <DropdownMenuRadioItem value="amin">امین</DropdownMenuRadioItem>
    <DropdownMenuRadioItem value="sara">سارا</DropdownMenuRadioItem>
    <DropdownMenuRadioItem value="reza">رضا</DropdownMenuRadioItem>
  </DropdownMenuRadioGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem>ویرایش</DropdownMenuItem>
  <DropdownMenuItem>افزودن پروفایل</DropdownMenuItem>
</DropdownMenuContent>`

const indicatorSnippet = `const [user, setUser] = React.useState("sara")

<DropdownMenuContent>
  <DropdownMenuGroup>
    <DropdownMenuLabel>نمایش</DropdownMenuLabel>
    <DropdownMenuCheckboxItem indicator="check">
      نوار ابزار
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem indicator="check" defaultChecked>
      نوار وضعیت
    </DropdownMenuCheckboxItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuRadioGroup
    indicator="check"
    value={user}
    onValueChange={setUser}
  >
    <DropdownMenuLabel>کاربر</DropdownMenuLabel>
    <DropdownMenuRadioItem value="amin">امین</DropdownMenuRadioItem>
    <DropdownMenuRadioItem value="sara">سارا</DropdownMenuRadioItem>
    <DropdownMenuRadioItem value="reza">رضا</DropdownMenuRadioItem>
  </DropdownMenuRadioGroup>
</DropdownMenuContent>`

const destructiveSnippet = `import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

<DropdownMenuContent>
  <DropdownMenuItem>
    <ButtonDemoIcon />
    ویرایش
  </DropdownMenuItem>
  <DropdownMenuItem>
    <ButtonDemoIcon />
    تکثیر
  </DropdownMenuItem>
  <DropdownMenuItem>
    <ButtonDemoIcon />
    اشتراک‌گذاری
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem variant="destructive">
    <ButtonDemoIcon />
    حذف
  </DropdownMenuItem>
</DropdownMenuContent>`

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

function PropsSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="space-y-3">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      {children}
    </div>
  )
}

export default function DropdownMenuDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Dropdown Menu"
        description={description}
        slug="dropdown-menu"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-48">
        <PreviewShell>
          <DropdownMenuDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="dropdown-menu" />

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
          Use the following composition to build a <Code>DropdownMenu</Code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Basic</h2>
        <p className="leading-relaxed text-muted-foreground">
          Click the trigger, or focus it and press Enter, Space or ArrowDown.
          The menu opens under the trigger, aligned to its start edge (the
          right edge in RTL).
        </p>
        <ComponentPreview code={basicSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <DropdownMenuBasicDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Icons</h2>
        <p className="leading-relaxed text-muted-foreground">
          Place an icon before the label inside <Code>DropdownMenuItem</Code>{" "}
          or <Code>DropdownMenuSubTrigger</Code>. It sits at the start of the
          item (the right side in RTL).
        </p>
        <ComponentPreview code={iconsSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <DropdownMenuIconsDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Submenu</h2>
        <p className="leading-relaxed text-muted-foreground">
          Nest menus with <Code>DropdownMenuSub</Code>,{" "}
          <Code>DropdownMenuSubTrigger</Code>, and{" "}
          <Code>DropdownMenuSubContent</Code>. In RTL the submenu opens to the
          left and ArrowLeft opens it from the keyboard.
        </p>
        <ComponentPreview code={submenuSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <DropdownMenuSubmenuDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Checkboxes
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <Code>DropdownMenuCheckboxItem</Code> for options that can be
          turned on and off. Without <Code>checked</Code>, the state is kept
          when the menu closes and opens again.
        </p>
        <ComponentPreview code={checkboxesSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <DropdownMenuCheckboxesDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Checkboxes with icons
        </h2>
        <ComponentPreview
          code={checkboxesIconsSnippet}
          previewClassName="min-h-40"
        >
          <PreviewShell>
            <DropdownMenuCheckboxesIconsDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Radio</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <Code>DropdownMenuRadioGroup</Code> with{" "}
          <Code>DropdownMenuRadioItem</Code> when only one option can be
          selected.
        </p>
        <ComponentPreview code={radioSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <DropdownMenuRadioGroupDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Tick indicator
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Set indicator=&quot;check&quot; to show a plain tick instead of the
          Cubix Checkbox or Radio. The default is &quot;control&quot;. On a
          radio group it applies to every item in the group.
        </p>
        <ComponentPreview code={indicatorSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <DropdownMenuIndicatorDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Destructive
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <Code>variant=&quot;destructive&quot;</Code> on{" "}
          <Code>DropdownMenuItem</Code> for irreversible actions such as
          delete.
        </p>
        <ComponentPreview code={destructiveSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <DropdownMenuDestructiveDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <PropsSection title="DropdownMenu">
          <PropsTable data={dropdownMenuPropRows} />
        </PropsSection>

        <PropsSection title="DropdownMenuTrigger">
          <PropsTable data={triggerPropRows} />
        </PropsSection>

        <PropsSection title="DropdownMenuContent">
          <PropsTable data={contentPropRows} />
        </PropsSection>

        <PropsSection title="DropdownMenuItem">
          <PropsTable data={itemPropRows} />
        </PropsSection>

        <PropsSection title="DropdownMenuLabel">
          <PropsTable data={labelPropRows} />
        </PropsSection>

        <PropsSection title="DropdownMenuCheckboxItem">
          <PropsTable data={checkboxItemPropRows} />
        </PropsSection>

        <PropsSection title="DropdownMenuRadioGroup">
          <PropsTable data={radioGroupPropRows} />
        </PropsSection>

        <PropsSection title="DropdownMenuRadioItem">
          <PropsTable data={radioItemPropRows} />
        </PropsSection>

        <PropsSection title="DropdownMenuSubTrigger">
          <PropsTable data={subTriggerPropRows} />
        </PropsSection>

        <PropsSection title="DropdownMenuSubContent">
          <PropsTable data={subContentPropRows} />
        </PropsSection>

        <p className="leading-relaxed text-muted-foreground">
          <Code>DropdownMenuGroup</Code>, <Code>DropdownMenuSeparator</Code>{" "}
          and <Code>DropdownMenuSub</Code> take <Code>className</Code> and{" "}
          <Code>children</Code> only (<Code>DropdownMenuSeparator</Code> has
          no children).
        </p>
      </section>
    </article>
  )
}
