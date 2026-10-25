import type { TokenTableRow } from "@/components/docs/token-table"

const node = "React.ReactNode"

export const formItemLayoutRows = [
  { prop: "label", type: node, description: "Label text, rendered in the Cubix Label (data-formlayout-id=\"label\")." },
  { prop: "labelOptional", type: node, description: "Muted hint at the opposite end of the label row, for example «اختیاری»." },
  { prop: "beforeLabel", type: node, description: "Content placed before the label inside the label element." },
  { prop: "afterLabel", type: node, description: "Content placed after the label inside the label element." },
  { prop: "description", type: node, description: "Supporting text. Linked to the control through aria-describedby." },
  { prop: "error", type: node, description: "Validation message in text-destructive. Sets aria-invalid on the control and colours the label." },
  { prop: "hideMessage", type: "boolean", default: "false", description: "Hides the error message, for example on nested items." },
  {
    prop: "layout",
    type: '"vertical" | "horizontal" | "flex" | "flex-row-reverse"',
    default: '"vertical"',
    description:
      "vertical: label row above the control. horizontal: 12-column grid from md, label col-span-4, control col-span-8. flex: control beside label and description. flex-row-reverse: stacked on mobile, label and control on opposite ends from md, control md:w-1/2 xl:w-2/5.",
  },
  { prop: "align", type: '"left" | "right"', default: '"left"', description: "Order of the control and the label in flex layouts; justify-between when right." },
  { prop: "size", type: '"tiny" | "small" | "medium" | "large" | "xlarge"', default: '"medium"', description: "Text scale: text-caption, text-description or text-body." },
  { prop: "labelLayout", type: '"horizontal" | "vertical"', description: "Turns off the default row layout of the label container in vertical and flex layouts." },
  { prop: "nonBoxInput", type: "boolean", default: "!label", description: "Adds vertical margin around controls that are not box inputs, such as checkbox groups." },
  { prop: "isContainerResponsive", type: "boolean", default: "false", description: "horizontal only: switch to the grid at the nearest @container (@xl) instead of the md viewport breakpoint." },
  { prop: "name", type: "string", description: "Used as the label htmlFor when set." },
  { prop: "id", type: "string", description: "Field id. Defaults to useId(); FormControl puts it on the control." },
  { prop: "className / style", type: "string / CSSProperties", description: "className goes on the layout container; style goes on the data container." },
]

export const formControlRows = [
  {
    prop: "children",
    type: "React.ReactElement",
    description: "A single Cubix control. Receives id, aria-describedby and aria-invalid from the surrounding FormItemLayout.",
  },
]

export const formItemLayoutTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-label font-normal", value: "13px / 18px, 400" },
  { element: "Description, optional, before/after", token: "text-description font-normal", value: "description scale, 400" },
  { element: "Error message", token: "text-description font-normal", value: "description scale, 400" },
  { element: "size tiny / large", token: "text-caption / text-body", value: "caption / body scale" },
]

export const formItemLayoutColorRows: TokenTableRow[] = [
  { element: "Label", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Description and hints", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Error and invalid label", token: "text-destructive", value: "--destructive", swatch: "--destructive" },
]
