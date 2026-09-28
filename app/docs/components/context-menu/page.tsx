import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ContextMenuBasicDemo,
  ContextMenuCheckboxDemo,
  ContextMenuCheckboxIconsDemo,
  ContextMenuDemo,
  ContextMenuDestructiveDemo,
  ContextMenuIconsDemo,
  ContextMenuIndicatorDemo,
  ContextMenuRadioDemo,
  ContextMenuSubmenuDemo,
} from "@/components/examples/context-menu-examples"

import {
  checkboxItemPropRows,
  contentPropRows,
  contextMenuPropRows,
  itemPropRows,
  radioGroupPropRows,
  radioItemPropRows,
  triggerPropRows,
} from "./context-menu-table-data"

const description =
  "Displays a menu of actions at the pointer, opened with a right click or long press."

export const metadata: Metadata = {
  title: "Context Menu",
  description,
}

const usageImport = `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/cubix/context-menu"`

const usageSnippet = `<ContextMenu dir="rtl" lang="fa">
  <ContextMenuTrigger className="flex h-36 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-4 text-center text-caption text-muted-foreground">
    برای باز کردن منو کلیک راست کنید
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>بازگشت</ContextMenuItem>
    <ContextMenuItem>جلو</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`

const compositionSnippet = `ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuItem
    ├── ContextMenuSeparator
    ├── ContextMenuCheckboxItem
    ├── ContextMenuRadioGroup
    │   └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent
            └── ContextMenuItem`

const demoSnippet = `<ContextMenu dir="rtl" lang="fa">
  <ContextMenuTrigger className="flex h-36 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-4 text-center text-caption text-muted-foreground">
    برای باز کردن منو کلیک راست کنید
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>بازگشت</ContextMenuItem>
    <ContextMenuItem disabled>جلو</ContextMenuItem>
    <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>ابزارهای بیشتر</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>ذخیره صفحه به‌عنوان</ContextMenuItem>
        <ContextMenuItem>ایجاد میان‌بر</ContextMenuItem>
        <ContextMenuItem>نام‌گذاری پنجره</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>ابزارهای توسعه‌دهنده</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem defaultChecked>نوار ابزار</ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>نوار وضعیت</ContextMenuCheckboxItem>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup defaultValue="sara">
      <ContextMenuRadioItem value="amin">امین</ContextMenuRadioItem>
      <ContextMenuRadioItem value="sara">سارا</ContextMenuRadioItem>
      <ContextMenuRadioItem value="reza">رضا</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`

const basicSnippet = `<ContextMenu dir="rtl" lang="fa">
  <ContextMenuTrigger className="...">
    برای باز کردن منو کلیک راست کنید
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>بازگشت</ContextMenuItem>
    <ContextMenuItem disabled>جلو</ContextMenuItem>
    <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>ذخیره صفحه به‌عنوان</ContextMenuItem>
    <ContextMenuItem>چاپ</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`

const iconsSnippet = `import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

<ContextMenuContent>
  <ContextMenuItem>
    <ButtonDemoIcon />
    بازگشت
  </ContextMenuItem>
  <ContextMenuItem>
    <ButtonDemoIcon />
    بارگذاری مجدد
  </ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuSub>
    <ContextMenuSubTrigger>
      <ButtonDemoIcon />
      اشتراک‌گذاری
    </ContextMenuSubTrigger>
    <ContextMenuSubContent>
      <ContextMenuItem>
        <ButtonDemoIcon />
        لینک ایمیل
      </ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>
</ContextMenuContent>`

const submenuSnippet = `<ContextMenuContent>
  <ContextMenuItem>بازگشت</ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuSub>
    <ContextMenuSubTrigger>ابزارهای بیشتر</ContextMenuSubTrigger>
    <ContextMenuSubContent>
      <ContextMenuItem>ذخیره صفحه به‌عنوان</ContextMenuItem>
      <ContextMenuItem>ایجاد میان‌بر</ContextMenuItem>
      <ContextMenuItem>نام‌گذاری پنجره</ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>
</ContextMenuContent>`

const checkboxSnippet = `<ContextMenuContent>
  <ContextMenuCheckboxItem>نوار ابزار</ContextMenuCheckboxItem>
  <ContextMenuCheckboxItem defaultChecked>
    نوار وضعیت
  </ContextMenuCheckboxItem>
  <ContextMenuSeparator />
  <ContextMenuItem>بارگذاری مجدد</ContextMenuItem>
</ContextMenuContent>`

const checkboxIconsSnippet = `import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

<ContextMenuContent>
  <ContextMenuCheckboxItem>
    <ButtonDemoIcon />
    نوار ابزار
  </ContextMenuCheckboxItem>
  <ContextMenuCheckboxItem defaultChecked>
    <ButtonDemoIcon />
    نوار وضعیت
  </ContextMenuCheckboxItem>
</ContextMenuContent>`

const radioSnippet = `const [user, setUser] = React.useState("sara")

<ContextMenuContent>
  <ContextMenuRadioGroup value={user} onValueChange={setUser}>
    <ContextMenuRadioItem value="amin">امین</ContextMenuRadioItem>
    <ContextMenuRadioItem value="sara">سارا</ContextMenuRadioItem>
    <ContextMenuRadioItem value="reza">رضا</ContextMenuRadioItem>
  </ContextMenuRadioGroup>
</ContextMenuContent>`

const indicatorSnippet = `<ContextMenuContent>
  <ContextMenuCheckboxItem indicator="check">نوار ابزار</ContextMenuCheckboxItem>
  <ContextMenuCheckboxItem indicator="check" defaultChecked>
    نوار وضعیت
  </ContextMenuCheckboxItem>
  <ContextMenuSeparator />
  <ContextMenuRadioGroup indicator="check" value={user} onValueChange={setUser}>
    <ContextMenuRadioItem value="amin">امین</ContextMenuRadioItem>
    <ContextMenuRadioItem value="sara">سارا</ContextMenuRadioItem>
    <ContextMenuRadioItem value="reza">رضا</ContextMenuRadioItem>
  </ContextMenuRadioGroup>
</ContextMenuContent>`

const destructiveSnippet = `import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

<ContextMenuContent>
  <ContextMenuItem>
    <ButtonDemoIcon />
    ویرایش
  </ContextMenuItem>
  <ContextMenuItem>
    <ButtonDemoIcon />
    تکثیر
  </ContextMenuItem>
  <ContextMenuSeparator />
  <ContextMenuItem variant="destructive">
    <ButtonDemoIcon />
    حذف
  </ContextMenuItem>
</ContextMenuContent>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function ContextMenuDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Context Menu"
        description={description}
        slug="context-menu"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-48">
        <PreviewShell>
          <ContextMenuDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="context-menu" />

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
          <code className="font-mono text-sm">ContextMenu</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Basic</h2>
        <p className="leading-relaxed text-muted-foreground">
          Right click the trigger area, long press it on touch screens, or
          focus it and press Shift+F10 or the menu key. The menu opens at the
          pointer.
        </p>
        <ComponentPreview code={basicSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <ContextMenuBasicDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Icons</h2>
        <p className="leading-relaxed text-muted-foreground">
          Place an icon before the label inside{" "}
          <code className="font-mono text-sm">ContextMenuItem</code> or{" "}
          <code className="font-mono text-sm">ContextMenuSubTrigger</code>. It
          sits at the start of the item (the right side in RTL).
        </p>
        <ComponentPreview code={iconsSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <ContextMenuIconsDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Submenu</h2>
        <p className="leading-relaxed text-muted-foreground">
          Nest menus with{" "}
          <code className="font-mono text-sm">ContextMenuSub</code>,{" "}
          <code className="font-mono text-sm">ContextMenuSubTrigger</code>, and{" "}
          <code className="font-mono text-sm">ContextMenuSubContent</code>.
        </p>
        <ComponentPreview code={submenuSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <ContextMenuSubmenuDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Checkboxes
        </h2>
        <ComponentPreview code={checkboxSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <ContextMenuCheckboxDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Checkboxes with icons
        </h2>
        <ComponentPreview code={checkboxIconsSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <ContextMenuCheckboxIconsDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Radio</h2>
        <ComponentPreview code={radioSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <ContextMenuRadioDemo />
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
            <ContextMenuIndicatorDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Destructive
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">variant=&quot;destructive&quot;</code>{" "}
          on <code className="font-mono text-sm">ContextMenuItem</code> for
          irreversible actions such as delete.
        </p>
        <ComponentPreview code={destructiveSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <ContextMenuDestructiveDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenu
          </h3>
          <PropsTable data={contextMenuPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuTrigger
          </h3>
          <PropsTable data={triggerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuItem
          </h3>
          <PropsTable data={itemPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuCheckboxItem
          </h3>
          <PropsTable data={checkboxItemPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuRadioGroup
          </h3>
          <PropsTable data={radioGroupPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuRadioItem
          </h3>
          <PropsTable data={radioItemPropRows} />
        </div>
      </section>
    </article>
  )
}
