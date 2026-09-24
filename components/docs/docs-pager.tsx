"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { canonicalComponentHref } from "@/lib/bases";
import { cn } from "@/lib/utils";

const order = [
  { title: "Introduction", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Theming", href: "/docs/theming" },
  { title: "CLI", href: "/docs/cli" },
  { title: "Typeset", href: "/docs/typeset" },
  { title: "Skills", href: "/docs/skills" },
  { title: "Registry", href: "/docs/registry" },
  { title: "Changelog", href: "/docs/changelog" },
  { title: "Accordion", href: "/docs/components/accordion" },
  { title: "Alert", href: "/docs/components/alert" },
  { title: "Alert Dialog", href: "/docs/components/alert-dialog" },
  { title: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
  { title: "Attachment", href: "/docs/components/attachment" },
  { title: "Avatar", href: "/docs/components/avatar" },
  { title: "Badge", href: "/docs/components/badge" },
  { title: "Branch", href: "/docs/components/branch" },
  { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
  { title: "Button", href: "/docs/components/button" },
  { title: "Button Group", href: "/docs/components/button-group" },
  { title: "Calendar", href: "/docs/components/calendar" },
  { title: "Card", href: "/docs/components/card" },
  { title: "Carousel", href: "/docs/components/carousel" },
  { title: "Chart", href: "/docs/components/chart" },
  { title: "Checkbox", href: "/docs/components/checkbox" },
  { title: "Code Block", href: "/docs/components/code-block" },
  { title: "Collapsible", href: "/docs/components/collapsible" },
  { title: "Combobox", href: "/docs/components/combobox" },
  { title: "Command", href: "/docs/components/command" },
  { title: "Context Menu", href: "/docs/components/context-menu" },
  { title: "Conversation", href: "/docs/components/conversation" },
  { title: "Data Table", href: "/docs/components/data-table" },
  { title: "Date Picker", href: "/docs/components/date-picker" },
  { title: "Dialog", href: "/docs/components/dialog" },
  { title: "Direction", href: "/docs/components/direction" },
  { title: "Drawer", href: "/docs/components/drawer" },
  { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
  { title: "Empty", href: "/docs/components/empty" },
  { title: "Field", href: "/docs/components/field" },
  { title: "Hover Card", href: "/docs/components/hover-card" },
  { title: "Input", href: "/docs/components/input" },
  { title: "Input Group", href: "/docs/components/input-group" },
  { title: "Input OTP", href: "/docs/components/input-otp" },
  { title: "Kbd", href: "/docs/components/kbd" },
  { title: "Label", href: "/docs/components/label" },
  { title: "Menubar", href: "/docs/components/menubar" },
  { title: "Message", href: "/docs/components/message" },
  { title: "Message Scroller", href: "/docs/components/message-scroller" },
  { title: "Model Selector", href: "/docs/components/model-selector" },
  { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
  { title: "Pagination", href: "/docs/components/pagination" },
  { title: "Popover", href: "/docs/components/popover" },
  { title: "Progress", href: "/docs/components/progress" },
  { title: "Prompt Input", href: "/docs/components/prompt-input" },
  { title: "Prompt Suggestion", href: "/docs/components/prompt-suggestion" },
  { title: "Queue", href: "/docs/components/queue" },
  { title: "Radio Group", href: "/docs/components/radio-group" },
  { title: "Resizable", href: "/docs/components/resizable" },
  { title: "Scroll Area", href: "/docs/components/scroll-area" },
  { title: "Select", href: "/docs/components/select" },
  { title: "Separator", href: "/docs/components/separator" },
  { title: "Sheet", href: "/docs/components/sheet" },
  { title: "Sidebar", href: "/docs/components/sidebar" },
  { title: "Skeleton", href: "/docs/components/skeleton" },
  { title: "Slider", href: "/docs/components/slider" },
  { title: "Sonner", href: "/docs/components/sonner" },
  { title: "Sources", href: "/docs/components/sources" },
  { title: "Spinner", href: "/docs/components/spinner" },
  { title: "Streaming Text", href: "/docs/components/streaming-text" },
  { title: "Switch", href: "/docs/components/switch" },
  { title: "Table", href: "/docs/components/table" },
  { title: "Tabs", href: "/docs/components/tabs" },
  { title: "Textarea", href: "/docs/components/textarea" },
  { title: "Thinking", href: "/docs/components/thinking" },
  { title: "Toast", href: "/docs/components/toast" },
  { title: "Toggle", href: "/docs/components/toggle" },
  { title: "Toggle Group", href: "/docs/components/toggle-group" },
  { title: "Tool Call", href: "/docs/components/tool-call" },
  { title: "Tooltip", href: "/docs/components/tooltip" },
];

export function DocsPager() {
  const pathname = usePathname();
  const index = order.findIndex(
    (item) => item.href === canonicalComponentHref(pathname)
  );

  if (index === -1) return null;

  const prev = index > 0 ? order[index - 1] : null;
  const next = index < order.length - 1 ? order[index + 1] : null;

  return (
    <nav aria-label="Pagination" className="mt-12 grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            "group rounded-lg border p-4 transition-colors hover:bg-accent/50"
          )}
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="mt-1 block font-medium">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className={cn(
            "group rounded-lg border p-4 text-right transition-colors hover:bg-accent/50"
          )}
        >
          <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
            Next
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1 block font-medium">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
