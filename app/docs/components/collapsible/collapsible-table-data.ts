import type { TokenTableRow } from "@/components/docs/token-table"

export const collapsiblePropRows = [
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state of the panel.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    description: "Initial open state when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const triggerPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Compose the trigger onto a Cubix Button (Base UI and React Aria).",
  },
  {
    prop: "asChild",
    type: "boolean",
    description:
      "Compose the trigger onto a child element such as Button (Radix UI).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const contentPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Content revealed when the panel is open.",
  },
]

export const collapsibleTypographyRows: TokenTableRow[] = [
  { element: "Content", token: "text-description font-normal", value: "13px, 400" },
  { element: "Trigger (Button)", token: "text-label leading-none font-normal", value: "13px / 1, 400" },
]

export const collapsibleColorRows: TokenTableRow[] = [
  { element: "Content text", token: "text-foreground (inherited)", value: "--foreground", swatch: "--foreground" },
  { element: "Trigger hover (ghost)", token: "hover:bg-muted", value: "--muted", swatch: "--muted" },
  { element: "Trigger border (outline)", token: "border-border", value: "--border", swatch: "--border" },
  { element: "Open root (example)", token: "data-open:bg-muted", value: "--muted", swatch: "--muted" },
  { element: "Secondary text (examples)", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
]