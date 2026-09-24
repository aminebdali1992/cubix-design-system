import type { Metadata } from "next"
import Link from "next/link"
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
const erSrc = "/docs/avatar/er.png"

const usageImport = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/cubix/avatar"`

const usageSnippet = `<Avatar>
  <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`

const compositionSnippet = `Avatar
├── AvatarImage
├── AvatarFallback
└── AvatarBadge`

const groupCompositionSnippet = `AvatarGroup
├── Avatar
├── Avatar
└── AvatarGroupCount`

const badgeSnippet = `<Avatar>
  <AvatarImage src="/docs/avatar/er.png" alt="ER" />
  <AvatarFallback>ER</AvatarFallback>
  <AvatarBadge aria-label="Online" className="bg-green-600 dark:bg-green-800" />
</Avatar>`

const badgeIconSnippet = `<Avatar>
  <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge
    aria-label="Add teammate"
    render={<button type="button" />}
  >
    <PlusIcon />
  </AvatarBadge>
</Avatar>`

const groupSnippet = `<AvatarGroup aria-label="Team">
  <Avatar>
    <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/lr.png" alt="LR" />
    <AvatarFallback>LR</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/er.png" alt="ER" />
    <AvatarFallback>ER</AvatarFallback>
  </Avatar>
</AvatarGroup>`

const groupCountSnippet = `<AvatarGroup aria-label="Team">
  <Avatar>
    <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/lr.png" alt="LR" />
    <AvatarFallback>LR</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/er.png" alt="ER" />
    <AvatarFallback>ER</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`

const groupIconSnippet = `<AvatarGroup aria-label="Team">
  <Avatar>
    <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/lr.png" alt="LR" />
    <AvatarFallback>LR</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarImage src="/docs/avatar/er.png" alt="ER" />
    <AvatarFallback>ER</AvatarFallback>
  </Avatar>
  <AvatarGroupCount>
    <PlusIcon />
  </AvatarGroupCount>
</AvatarGroup>`

const sizesSnippet = `<Avatar size="sm">
  <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`

const rtlSnippet = `<div
  dir="rtl"
  className="flex flex-row flex-wrap items-center gap-6 md:gap-12"
>
  <Avatar>
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>ER</AvatarFallback>
    <AvatarBadge
      aria-label="Online"
      className="bg-green-600 dark:bg-green-800"
    />
  </Avatar>
  <AvatarGroup aria-label="Team">
    <Avatar>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>LR</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
  </AvatarGroup>
</div>`

export default function AvatarPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Avatar"
        description="An image element with a fallback for representing the user."
        slug="avatar"
      />

      <ComponentPreview code={usageSnippet}>
        <Avatar>
          <AvatarImage src={cnSrc} alt="CN" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
            <Avatar>
              <AvatarImage src={erSrc} alt="ER" />
              <AvatarFallback>ER</AvatarFallback>
              <AvatarBadge
                aria-label="Online"
                className="bg-green-600 dark:bg-green-800"
              />
            </Avatar>
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
            <Avatar>
              <AvatarImage src={cnSrc} alt="CN" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge
                aria-label="Add teammate"
                render={<button type="button" />}
              >
                <PlusIcon />
              </AvatarBadge>
            </Avatar>
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
            <AvatarGroup aria-label="Team">
              <Avatar>
                <AvatarImage src={cnSrc} alt="CN" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src={lrSrc} alt="LR" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src={erSrc} alt="ER" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </AvatarGroup>
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
            <AvatarGroup aria-label="Team">
              <Avatar>
                <AvatarImage src={cnSrc} alt="CN" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src={lrSrc} alt="LR" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src={erSrc} alt="ER" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+3</AvatarGroupCount>
            </AvatarGroup>
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
            <AvatarGroup aria-label="Team">
              <Avatar>
                <AvatarImage src={cnSrc} alt="CN" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src={lrSrc} alt="LR" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src={erSrc} alt="ER" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>
                <PlusIcon />
              </AvatarGroupCount>
            </AvatarGroup>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">size</code> prop on the
            root avatar.
          </p>
          <ComponentPreview code={sizesSnippet}>
            <Avatar size="sm">
              <AvatarImage src={cnSrc} alt="CN" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={cnSrc} alt="CN" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src={cnSrc} alt="CN" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
  <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
  <AvatarFallback>CN</AvatarFallback>
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
            code={`<AvatarBadge aria-label="Online" />
<AvatarBadge
  aria-label="Add teammate"
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
            code={`<AvatarGroup aria-label="Team">
  <Avatar>
    <AvatarImage src="/docs/avatar/cn.png" alt="CN" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</AvatarGroup>`}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          To enable RTL support, see the{" "}
          <Link
            href="/docs/components/direction"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80"
          >
            Direction
          </Link>{" "}
          guide.
        </p>
        <ComponentPreview code={rtlSnippet} previewClassName="h-72">
          <div
            dir="rtl"
            className="flex flex-row flex-wrap items-center gap-6 md:gap-12"
          >
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>ER</AvatarFallback>
              <AvatarBadge
                aria-label="Online"
                className="bg-green-600 dark:bg-green-800"
              />
            </Avatar>
            <AvatarGroup aria-label="Team">
              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>
        </ComponentPreview>
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
