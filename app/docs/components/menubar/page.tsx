import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  MenubarBasicDemo,
  MenubarCheckboxDemo,
  MenubarDemo,
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
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/cubix/menubar"`

const usageSnippet = `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
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

const demoSnippet = `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        New Window <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarItem disabled>New Incognito Window</MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Share</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Email link</MenubarItem>
          <MenubarItem>Messages</MenubarItem>
          <MenubarItem>Notes</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>
        Print... <MenubarShortcut>⌘P</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>...</MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>...</MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Profiles</MenubarTrigger>
    <MenubarContent>...</MenubarContent>
  </MenubarMenu>
</Menubar>`

const basicSnippet = `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        New Window <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarItem disabled>New Incognito Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>
        Print... <MenubarShortcut>⌘P</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Cut</MenubarItem>
      <MenubarItem>Copy</MenubarItem>
      <MenubarItem>Paste</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`

const submenuSnippet = `<MenubarMenu>
  <MenubarTrigger>File</MenubarTrigger>
  <MenubarContent>
    <MenubarSub>
      <MenubarSubTrigger>Share</MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem>Email link</MenubarItem>
        <MenubarItem>Messages</MenubarItem>
        <MenubarItem>Notes</MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
  </MenubarContent>
</MenubarMenu>`

const checkboxSnippet = `<MenubarMenu>
  <MenubarTrigger>View</MenubarTrigger>
  <MenubarContent className="w-64">
    <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
    <MenubarCheckboxItem checked>
      Always Show Full URLs
    </MenubarCheckboxItem>
    <MenubarSeparator />
    <MenubarItem inset>
      Reload <MenubarShortcut>⌘R</MenubarShortcut>
    </MenubarItem>
  </MenubarContent>
</MenubarMenu>`

const radioSnippet = `const [user, setUser] = React.useState("benoit")

<MenubarMenu>
  <MenubarTrigger>Profiles</MenubarTrigger>
  <MenubarContent>
    <MenubarRadioGroup value={user} onValueChange={setUser}>
      <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
      <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
      <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
    </MenubarRadioGroup>
  </MenubarContent>
</MenubarMenu>`

const sidesSnippet = `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>top</MenubarTrigger>
    <MenubarContent side="top">
      <MenubarItem>New Tab</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`

export default function MenubarDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Menubar"
        description={description}
        slug="menubar"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-48">
        <MenubarDemo />
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
          <MenubarBasicDemo />
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
          <MenubarSubmenuDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Checkboxes
        </h2>
        <ComponentPreview code={checkboxSnippet} previewClassName="min-h-40">
          <MenubarCheckboxDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Radio</h2>
        <ComponentPreview code={radioSnippet} previewClassName="min-h-40">
          <MenubarRadioDemo />
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
          <MenubarSidesDemo />
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
      </section>
    </article>
  )
}
