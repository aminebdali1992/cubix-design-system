import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon, PlusIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./docs-avatar"
import {
  avatarPropRows,
  badgePropRows,
  fallbackPropRows,
  groupCountPropRows,
  groupPropRows,
  imagePropRows,
} from "./avatar-table-data"

export const metadata: Metadata = {
  title: "Avatar",
  description:
    "An image element with a fallback for representing the user.",
}

const cnSrc = "/docs/avatar/cn.png"
const lrSrc = "/docs/avatar/lr.png"
const erSrc = "/docs/avatar/girl.jpg"

const usageImport = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/cubix/avatar"`

const usageSnippet = `<Avatar>
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>`

const compositionSnippet = `Avatar
├── AvatarImage
├── AvatarFallback
└── AvatarBadge`

const groupCompositionSnippet = `AvatarGroup
├── Avatar
├── Avatar
└── AvatarGroupCount`

const badgeSnippet = `<Avatar size="sm">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
  <AvatarBadge
    aria-label="آنلاین"
    className="bg-green-600 dark:bg-green-800"
  />
</Avatar>
<Avatar>
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
  <AvatarBadge
    aria-label="آنلاین"
    className="bg-green-600 dark:bg-green-800"
  />
</Avatar>
<Avatar size="lg">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
  <AvatarBadge
    aria-label="آنلاین"
    className="bg-green-600 dark:bg-green-800"
  />
</Avatar>
<Avatar size="xl">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
  <AvatarBadge
    aria-label="آنلاین"
    className="bg-green-600 dark:bg-green-800"
  />
</Avatar>
<Avatar size="2xl">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
  <AvatarBadge
    aria-label="آنلاین"
    className="bg-green-600 dark:bg-green-800"
  />
</Avatar>`

const badgeIconSnippet = `<Avatar>
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
  <AvatarBadge
    aria-label="افزودن هم‌تیمی"
    render={<button type="button" />}
  >
    <PlusIcon />
  </AvatarBadge>
</Avatar>
<Avatar size="lg">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
  <AvatarBadge
    aria-label="افزودن هم‌تیمی"
    render={<button type="button" />}
  >
    <PlusIcon />
  </AvatarBadge>
</Avatar>
<Avatar size="xl">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
  <AvatarBadge
    aria-label="افزودن هم‌تیمی"
    render={<button type="button" />}
  >
    <PlusIcon />
  </AvatarBadge>
</Avatar>
<Avatar size="2xl">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
  <AvatarBadge
    aria-label="افزودن هم‌تیمی"
    render={<button type="button" />}
  >
    <PlusIcon />
  </AvatarBadge>
</Avatar>`

const groupSnippet = `<AvatarGroup aria-label="تیم">
  <Avatar size="sm">
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
  <Avatar size="sm">
    <AvatarImage src="/docs/avatar/lr.png" alt="علی" />
    <AvatarFallback>ع</AvatarFallback>
  </Avatar>
  <Avatar size="sm">
    <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
    <AvatarFallback>م</AvatarFallback>
  </Avatar>
</AvatarGroup>
<AvatarGroup aria-label="تیم">
  <Avatar>
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/lr.png" alt="علی" />
    <AvatarFallback>ع</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
    <AvatarFallback>م</AvatarFallback>
  </Avatar>
</AvatarGroup>
<AvatarGroup aria-label="تیم">
  <Avatar size="lg">
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarImage src="/docs/avatar/lr.png" alt="علی" />
    <AvatarFallback>ع</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
    <AvatarFallback>م</AvatarFallback>
  </Avatar>
</AvatarGroup>`

const groupCountSnippet = `<AvatarGroup aria-label="تیم">
  <Avatar size="sm">
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
  <Avatar size="sm">
    <AvatarImage src="/docs/avatar/lr.png" alt="علی" />
    <AvatarFallback>ع</AvatarFallback>
  </Avatar>
  <Avatar size="sm">
    <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
    <AvatarFallback>م</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+۳</AvatarGroupCount>
</AvatarGroup>
<AvatarGroup aria-label="تیم">
  <Avatar>
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/lr.png" alt="علی" />
    <AvatarFallback>ع</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
    <AvatarFallback>م</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+۳</AvatarGroupCount>
</AvatarGroup>
<AvatarGroup aria-label="تیم">
  <Avatar size="lg">
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarImage src="/docs/avatar/lr.png" alt="علی" />
    <AvatarFallback>ع</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
    <AvatarFallback>م</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+۳</AvatarGroupCount>
</AvatarGroup>`

const groupIconSnippet = `<AvatarGroup aria-label="تیم">
  <Avatar size="sm">
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
  <Avatar size="sm">
    <AvatarImage src="/docs/avatar/lr.png" alt="علی" />
    <AvatarFallback>ع</AvatarFallback>
  </Avatar>
  <Avatar size="sm">
    <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
    <AvatarFallback>م</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>
    <PlusIcon />
  </AvatarGroupCount>
</AvatarGroup>
<AvatarGroup aria-label="تیم">
  <Avatar>
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/lr.png" alt="علی" />
    <AvatarFallback>ع</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
    <AvatarFallback>م</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>
    <PlusIcon />
  </AvatarGroupCount>
</AvatarGroup>
<AvatarGroup aria-label="تیم">
  <Avatar size="lg">
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarImage src="/docs/avatar/lr.png" alt="علی" />
    <AvatarFallback>ع</AvatarFallback>
  </Avatar>
  <Avatar size="lg">
    <AvatarImage src="/docs/avatar/girl.jpg" alt="مریم" />
    <AvatarFallback>م</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>
    <PlusIcon />
  </AvatarGroupCount>
</AvatarGroup>`

const sizesSnippet = `<Avatar size="sm">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>
<Avatar size="xl">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>
<Avatar size="2xl">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>`

const ringSnippet = `<Avatar ring size="sm">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>
<Avatar ring>
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>
<Avatar ring size="lg">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>
<Avatar ring size="xl">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>
<Avatar ring size="2xl">
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="flex min-h-32 w-full flex-wrap items-center justify-center gap-4"
    >
      {children}
    </div>
  )
}

export default function AvatarPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Avatar"
        description="An image element with a fallback for representing the user."
        slug="avatar"
      />

      <ComponentPreview code={usageSnippet}>
            <PreviewShell>
        <Avatar>
          <AvatarImage src={cnSrc} alt="نیلوفر" />
          <AvatarFallback>ن</AvatarFallback>
        </Avatar>
      </PreviewShell>
</ComponentPreview>

      <ComponentInstall name="avatar" />

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
          Use the following composition to build an Avatar:
        </p>
        <CodeBlock code={compositionSnippet} />
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build an Avatar Group:
        </p>
        <CodeBlock code={groupCompositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Badge</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">AvatarBadge</code> for a
            status dot. Override the color with{" "}
            <code className="font-mono text-sm">className</code>. Give the
            badge an aria-label so the status is announced.
          </p>
          <ComponentPreview code={badgeSnippet}>
            <PreviewShell>
              <Avatar size="sm">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
                <AvatarBadge
                  aria-label="آنلاین"
                  className="bg-green-600 dark:bg-green-800"
                />
              </Avatar>
              <Avatar>
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
                <AvatarBadge
                  aria-label="آنلاین"
                  className="bg-green-600 dark:bg-green-800"
                />
              </Avatar>
              <Avatar size="lg">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
                <AvatarBadge
                  aria-label="آنلاین"
                  className="bg-green-600 dark:bg-green-800"
                />
              </Avatar>
              <Avatar size="xl">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
                <AvatarBadge
                  aria-label="آنلاین"
                  className="bg-green-600 dark:bg-green-800"
                />
              </Avatar>
              <Avatar size="2xl">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
                <AvatarBadge
                  aria-label="آنلاین"
                  className="bg-green-600 dark:bg-green-800"
                />
              </Avatar>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Badge with icon
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            For real actions, compose{" "}
            <code className="font-mono text-sm">AvatarBadge</code> onto a{" "}
            <code className="font-mono text-sm">button</code> with{" "}
            <code className="font-mono text-sm">render</code> (Base UI / React
            Aria) or <code className="font-mono text-sm">asChild</code> (Radix),
            and give it an aria-label.
          </p>
          <ComponentPreview code={badgeIconSnippet}>
            <PreviewShell>
              <Avatar>
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
                <AvatarBadge
                  aria-label="افزودن هم‌تیمی"
                  render={<button type="button" />}
                >
                  <PlusIcon />
                </AvatarBadge>
              </Avatar>
              <Avatar size="lg">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
                <AvatarBadge
                  aria-label="افزودن هم‌تیمی"
                  render={<button type="button" />}
                >
                  <PlusIcon />
                </AvatarBadge>
              </Avatar>
              <Avatar size="xl">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
                <AvatarBadge
                  aria-label="افزودن هم‌تیمی"
                  render={<button type="button" />}
                >
                  <PlusIcon />
                </AvatarBadge>
              </Avatar>
              <Avatar size="2xl">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
                <AvatarBadge
                  aria-label="افزودن هم‌تیمی"
                  render={<button type="button" />}
                >
                  <PlusIcon />
                </AvatarBadge>
              </Avatar>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Avatar Group
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Stack avatars with{" "}
            <code className="font-mono text-sm">AvatarGroup</code>. Label the
            group so the set of people is announced.
          </p>
          <ComponentPreview code={groupSnippet}>
            <PreviewShell>
              <AvatarGroup aria-label="تیم">
                <Avatar size="sm">
                  <AvatarImage src={cnSrc} alt="نیلوفر" />
                  <AvatarFallback>ن</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarImage src={lrSrc} alt="علی" />
                  <AvatarFallback>ع</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarImage src={erSrc} alt="مریم" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <AvatarGroup aria-label="تیم">
                <Avatar>
                  <AvatarImage src={cnSrc} alt="نیلوفر" />
                  <AvatarFallback>ن</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src={lrSrc} alt="علی" />
                  <AvatarFallback>ع</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src={erSrc} alt="مریم" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <AvatarGroup aria-label="تیم">
                <Avatar size="lg">
                  <AvatarImage src={cnSrc} alt="نیلوفر" />
                  <AvatarFallback>ن</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src={lrSrc} alt="علی" />
                  <AvatarFallback>ع</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src={erSrc} alt="مریم" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Group count
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">AvatarGroupCount</code> to
            show remaining people.
          </p>
          <ComponentPreview code={groupCountSnippet}>
            <PreviewShell>
              <AvatarGroup aria-label="تیم">
                <Avatar size="sm">
                  <AvatarImage src={cnSrc} alt="نیلوفر" />
                  <AvatarFallback>ن</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarImage src={lrSrc} alt="علی" />
                  <AvatarFallback>ع</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarImage src={erSrc} alt="مریم" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+۳</AvatarGroupCount>
              </AvatarGroup>
              <AvatarGroup aria-label="تیم">
                <Avatar>
                  <AvatarImage src={cnSrc} alt="نیلوفر" />
                  <AvatarFallback>ن</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src={lrSrc} alt="علی" />
                  <AvatarFallback>ع</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src={erSrc} alt="مریم" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+۳</AvatarGroupCount>
              </AvatarGroup>
              <AvatarGroup aria-label="تیم">
                <Avatar size="lg">
                  <AvatarImage src={cnSrc} alt="نیلوفر" />
                  <AvatarFallback>ن</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src={lrSrc} alt="علی" />
                  <AvatarFallback>ع</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src={erSrc} alt="مریم" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+۳</AvatarGroupCount>
              </AvatarGroup>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Group with icon
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            You can also pass an icon as the{" "}
            <code className="font-mono text-sm">AvatarGroupCount</code> child.
          </p>
          <ComponentPreview code={groupIconSnippet}>
            <PreviewShell>
              <AvatarGroup aria-label="تیم">
                <Avatar size="sm">
                  <AvatarImage src={cnSrc} alt="نیلوفر" />
                  <AvatarFallback>ن</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarImage src={lrSrc} alt="علی" />
                  <AvatarFallback>ع</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarImage src={erSrc} alt="مریم" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>
                  <PlusIcon />
                </AvatarGroupCount>
              </AvatarGroup>
              <AvatarGroup aria-label="تیم">
                <Avatar>
                  <AvatarImage src={cnSrc} alt="نیلوفر" />
                  <AvatarFallback>ن</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src={lrSrc} alt="علی" />
                  <AvatarFallback>ع</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src={erSrc} alt="مریم" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>
                  <PlusIcon />
                </AvatarGroupCount>
              </AvatarGroup>
              <AvatarGroup aria-label="تیم">
                <Avatar size="lg">
                  <AvatarImage src={cnSrc} alt="نیلوفر" />
                  <AvatarFallback>ن</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src={lrSrc} alt="علی" />
                  <AvatarFallback>ع</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src={erSrc} alt="مریم" />
                  <AvatarFallback>م</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>
                  <PlusIcon />
                </AvatarGroupCount>
              </AvatarGroup>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">size</code> prop on the
            root avatar: <code className="font-mono text-sm">sm</code> (24px), default (32px), <code className="font-mono text-sm">lg</code> (40px), <code className="font-mono text-sm">xl</code> (48px) and <code className="font-mono text-sm">2xl</code> (64px).
          </p>
          <ComponentPreview code={sizesSnippet}>
            <PreviewShell>
              <Avatar size="sm">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
              <Avatar size="xl">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
              <Avatar size="2xl">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Ring</h3>
          <p className="leading-relaxed text-muted-foreground">
            Add the <code className="font-mono text-sm">ring</code> prop to draw
            a 1px gray ring around the avatar, with a 2px gap between the ring
            and the circle.
          </p>
          <ComponentPreview code={ringSnippet}>
            <PreviewShell>
              <Avatar ring size="sm">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
              <Avatar ring>
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
              <Avatar ring size="lg">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
              <Avatar ring size="xl">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
              <Avatar ring size="2xl">
                <AvatarImage src={cnSrc} alt="نیلوفر" />
                <AvatarFallback>ن</AvatarFallback>
              </Avatar>
            </PreviewShell>
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Accessibility
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Avatar is presentational. The image, fallback, badge, and group need
          names so the control stays readable without the photo.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Name the image
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Give <code className="font-mono text-sm">AvatarImage</code> an{" "}
            <code className="font-mono text-sm">alt</code> that names the
            person. Always keep{" "}
            <code className="font-mono text-sm">AvatarFallback</code> so
            initials remain if the image fails.
          </p>
          <CodeBlock
            code={`<Avatar>
  <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
  <AvatarFallback>ن</AvatarFallback>
</Avatar>`}
          />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Label status badges
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            An empty badge is only a color. Add{" "}
            <code className="font-mono text-sm">aria-label</code> for the
            status it represents. For clickable actions, compose the badge onto
            a button with{" "}
            <code className="font-mono text-sm">render</code> or{" "}
            <code className="font-mono text-sm">asChild</code> so keyboard and
            focus work.
          </p>
          <CodeBlock
            code={`<AvatarBadge aria-label="آنلاین" />
<AvatarBadge
  aria-label="افزودن هم‌تیمی"
  render={<button type="button" />}
>
  <PlusIcon />
</AvatarBadge>`}
          />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Label the group
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            AvatarGroup renders{" "}
            <code className="font-mono text-sm">role=&quot;group&quot;</code>.
            Give it an aria-label that describes the set of people.
          </p>
          <CodeBlock
            code={`<AvatarGroup aria-label="تیم">
  <Avatar>
    <AvatarImage src="/docs/avatar/cn.png" alt="نیلوفر" />
    <AvatarFallback>ن</AvatarFallback>
  </Avatar>
</AvatarGroup>`}
          />
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Always provide{" "}
            <code className="font-mono">AvatarFallback</code> so the control
            stays readable when the image is missing.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Avatar</h3>
        <p className="leading-relaxed text-muted-foreground">
          The root that wraps the image, fallback, and optional badge.
        </p>
        <PropsTable data={avatarPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AvatarImage
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The photo. Hidden automatically when it fails to load.
        </p>
        <PropsTable data={imagePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AvatarFallback
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Initials or an icon shown while the image loads or after it fails.
        </p>
        <PropsTable data={fallbackPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AvatarBadge
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          A status indicator at the end of the avatar. Compose onto a button
          when the badge is an action.
        </p>
        <PropsTable data={badgePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AvatarGroup
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Overlapping avatars for a set of people.
        </p>
        <PropsTable data={groupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AvatarGroupCount
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Overflow count or icon after the stacked avatars.
        </p>
        <PropsTable data={groupCountPropRows} />
      </section>
    </article>
  )
}
