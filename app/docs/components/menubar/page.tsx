import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  MenubarBasicDemo,
  MenubarCheckboxDemo,
  MenubarCheckboxIconsDemo,
  MenubarDemo,
  MenubarIconsDemo,
  MenubarIndicatorDemo,
  MenubarRadioDemo,
  MenubarSidesDemo,
  MenubarSubmenuDemo,
} from "@/components/examples/menubar-examples"

import {
  checkboxItemPropRows,
  contentPropRows,
  itemPropRows,
  menubarPropRows,
  radioGroupPropRows,
  radioItemPropRows,
  triggerPropRows,
} from "./menubar-table-data"

const description =
  "A visually persistent menu common in desktop applications."

export const metadata: Metadata = {
  title: "Menubar",
  description,
}

const usageImport = `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/cubix/menubar"`

const usageSnippet = `<Menubar dir="rtl" lang="fa">
  <MenubarMenu>
    <MenubarTrigger>پرونده</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        زبانه جدید
      </MenubarItem>
      <MenubarItem>پنجره جدید</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>اشتراک‌گذاری</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`

const compositionSnippet = `Menubar
├── MenubarMenu
│   ├── MenubarTrigger
│   └── MenubarContent
│       ├── MenubarItem
│       ├── MenubarSeparator
│       ├── MenubarCheckboxItem
│       ├── MenubarRadioGroup
│       │   └── MenubarRadioItem
│       └── MenubarSub
│           ├── MenubarSubTrigger
│           └── MenubarSubContent
└── MenubarMenu
    ├── MenubarTrigger
    └── MenubarContent`

const demoSnippet = `<Menubar dir="rtl" lang="fa">
  <MenubarMenu>
    <MenubarTrigger>پرونده</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        زبانه جدید
      </MenubarItem>
      <MenubarItem>
        پنجره جدید
      </MenubarItem>
      <MenubarItem disabled>پنجره ناشناس</MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>اشتراک‌گذاری</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>لینک ایمیل</MenubarItem>
          <MenubarItem>پیام‌ها</MenubarItem>
          <MenubarItem>یادداشت‌ها</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>
        چاپ...
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>ویرایش</MenubarTrigger>
    <MenubarContent>...</MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>نمایش</MenubarTrigger>
    <MenubarContent>...</MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>پروفایل‌ها</MenubarTrigger>
    <MenubarContent>...</MenubarContent>
  </MenubarMenu>
</Menubar>`

const basicSnippet = `<Menubar dir="rtl" lang="fa">
  <MenubarMenu>
    <MenubarTrigger>پرونده</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        زبانه جدید
      </MenubarItem>
      <MenubarItem>
        پنجره جدید
      </MenubarItem>
      <MenubarItem disabled>پنجره ناشناس</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        چاپ...
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>ویرایش</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        واگرد
      </MenubarItem>
      <MenubarItem>
        بازگردانی
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>برش</MenubarItem>
      <MenubarItem>کپی</MenubarItem>
      <MenubarItem>جای‌گذاری</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`

const iconsSnippet = `import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

<MenubarMenu>
  <MenubarTrigger>پرونده</MenubarTrigger>
  <MenubarContent>
    <MenubarItem>
      <ButtonDemoIcon />
      زبانه جدید
    </MenubarItem>
    <MenubarItem>
      <ButtonDemoIcon />
      پنجره جدید
    </MenubarItem>
    <MenubarSeparator />
    <MenubarSub>
      <MenubarSubTrigger>
        <ButtonDemoIcon />
        اشتراک‌گذاری
      </MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem>
          <ButtonDemoIcon />
          لینک ایمیل
        </MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  </MenubarContent>
</MenubarMenu>`
const submenuSnippet = `<MenubarMenu>
  <MenubarTrigger>پرونده</MenubarTrigger>
  <MenubarContent>
    <MenubarSub>
      <MenubarSubTrigger>اشتراک‌گذاری</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem>لینک ایمیل</MenubarItem>
        <MenubarItem>پیام‌ها</MenubarItem>
        <MenubarItem>یادداشت‌ها</MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  </MenubarContent>
</MenubarMenu>`

const checkboxSnippet = `<MenubarMenu>
  <MenubarTrigger>نمایش</MenubarTrigger>
  <MenubarContent>
    <MenubarCheckboxItem>نوار ابزار</MenubarCheckboxItem>
    <MenubarCheckboxItem defaultChecked>
      نوار وضعیت
    </MenubarCheckboxItem>
    <MenubarSeparator />
    <MenubarItem>
      بارگذاری مجدد
    </MenubarItem>
  </MenubarContent>
</MenubarMenu>`

const checkboxIconsSnippet = `import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

<MenubarMenu>
  <MenubarTrigger>نمایش</MenubarTrigger>
  <MenubarContent>
    <MenubarCheckboxItem>
      <ButtonDemoIcon />
      نوار ابزار
    </MenubarCheckboxItem>
    <MenubarCheckboxItem defaultChecked>
      <ButtonDemoIcon />
      نوار وضعیت
    </MenubarCheckboxItem>
  </MenubarContent>
</MenubarMenu>`

const radioSnippet = `const [user, setUser] = React.useState("sara")

<MenubarMenu>
  <MenubarTrigger>پروفایل‌ها</MenubarTrigger>
  <MenubarContent>
    <MenubarRadioGroup value={user} onValueChange={setUser}>
      <MenubarRadioItem value="amin">امین</MenubarRadioItem>
      <MenubarRadioItem value="sara">سارا</MenubarRadioItem>
      <MenubarRadioItem value="reza">رضا</MenubarRadioItem>
    </MenubarRadioGroup>
  </MenubarContent>
</MenubarMenu>`

const indicatorSnippet = `<MenubarMenu>
  <MenubarTrigger>نمایش</MenubarTrigger>
  <MenubarContent>
    <MenubarCheckboxItem indicator="check">نوار ابزار</MenubarCheckboxItem>
    <MenubarCheckboxItem indicator="check" defaultChecked>
      نوار وضعیت
    </MenubarCheckboxItem>
  </MenubarContent>
</MenubarMenu>

<MenubarMenu>
  <MenubarTrigger>پروفایل‌ها</MenubarTrigger>
  <MenubarContent>
    <MenubarRadioGroup indicator="check" value={user} onValueChange={setUser}>
      <MenubarRadioItem value="amin">امین</MenubarRadioItem>
      <MenubarRadioItem value="sara">سارا</MenubarRadioItem>
      <MenubarRadioItem value="reza">رضا</MenubarRadioItem>
    </MenubarRadioGroup>
  </MenubarContent>
</MenubarMenu>`

const sidesSnippet = `<Menubar dir="rtl" lang="fa">
  <MenubarMenu>
    <MenubarTrigger>بالا</MenubarTrigger>
    <MenubarContent side="top">
      <MenubarItem>زبانه جدید</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

export default function MenubarDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Menubar"
        description={description}
        slug="menubar"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-48">
        <PreviewShell>
          <MenubarDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="menubar" />

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
          <code className="font-mono text-sm">Menubar</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Basic</h2>
        <ComponentPreview code={basicSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <MenubarBasicDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Icons</h2>
        <p className="leading-relaxed text-muted-foreground">
          Place an icon before the label inside{" "}
          <code className="font-mono text-sm">MenubarItem</code> or{" "}
          <code className="font-mono text-sm">MenubarSubTrigger</code>. It sits
          at the start of the item (the right side in RTL).
        </p>
        <ComponentPreview code={iconsSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <MenubarIconsDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>
      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Submenu</h2>
        <p className="leading-relaxed text-muted-foreground">
          Nest menus with{" "}
          <code className="font-mono text-sm">MenubarSub</code>,{" "}
          <code className="font-mono text-sm">MenubarSubTrigger</code>, and{" "}
          <code className="font-mono text-sm">MenubarSubContent</code>.
        </p>
        <ComponentPreview code={submenuSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <MenubarSubmenuDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Checkboxes
        </h2>
        <ComponentPreview code={checkboxSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <MenubarCheckboxDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Checkboxes with icons
        </h2>
        <ComponentPreview code={checkboxIconsSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <MenubarCheckboxIconsDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Radio</h2>
        <ComponentPreview code={radioSnippet} previewClassName="min-h-40">
          <PreviewShell>
            <MenubarRadioDemo />
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
            <MenubarIndicatorDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Sides</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">side</code> prop on{" "}
          <code className="font-mono text-sm">MenubarContent</code> to control
          placement.
        </p>
        <ComponentPreview code={sidesSnippet} previewClassName="min-h-48">
          <PreviewShell>
            <MenubarSidesDemo />
          </PreviewShell>
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Menubar</h3>
          <PropsTable data={menubarPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MenubarTrigger
          </h3>
          <PropsTable data={triggerPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MenubarContent
          </h3>
          <PropsTable data={contentPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MenubarItem
          </h3>
          <PropsTable data={itemPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MenubarCheckboxItem
          </h3>
          <PropsTable data={checkboxItemPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MenubarRadioGroup
          </h3>
          <PropsTable data={radioGroupPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MenubarRadioItem
          </h3>
          <PropsTable data={radioItemPropRows} />
        </div>
      </section>
    </article>
  )
}
