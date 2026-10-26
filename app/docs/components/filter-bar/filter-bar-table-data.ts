import type { TokenTableRow } from "@/components/docs/token-table"

export const filterBarRows = [
  { prop: "filterProperties", type: "FilterProperty[]", description: "Array of properties that can be filtered." },
  { prop: "filters", type: "FilterGroup", description: "Current filter state." },
  { prop: "onFilterChange", type: "(filters: FilterGroup) => void", description: "Callback when filters change." },
  { prop: "freeformText", type: "string", description: "Current free-form search text." },
  { prop: "onFreeformTextChange", type: "(text: string) => void", description: "Callback when free-form text changes." },
  { prop: "onApply", type: "(filters: FilterGroup) => void", description: "Fires only on commit boundaries, such as selecting a menu item or removing a condition." },
  { prop: "actions", type: "FilterBarAction[]", description: "Optional custom actions to show in the menu." },
  { prop: "isLoading", type: "boolean", default: "false", description: "If true, dims the bar while work is in progress." },
  { prop: "supportsOperators", type: "boolean", default: "false", description: "Shows a clickable logical operator between conditions and the New group menu item." },
  { prop: "freeformDefaultProperty", type: "string", description: "Property used when committing free text from the root input." },
  { prop: "variant", type: "'default' | 'pill'", default: "'default'", description: "Filter appearance." },
  { prop: "size", type: "'sm' | 'md'", default: "'md'", description: "Bar height: sm is h-8 (32px), md is h-10 (40px)." },
  { prop: "icon", type: "React.ReactNode", description: "Replaces the search icon, e.g. with a spinner." },
  { prop: "placeholder", type: "string", description: "Placeholder of the empty free-form input." },
  { prop: "className", type: "string", description: "Classes for the bar container." },
]

export const filterBarTypographyRows: TokenTableRow[] = [
  { element: "Free-form input", token: "text-xs font-normal", value: "12px / 16px, 400" },
  { element: "Condition property, operator and value", token: "text-xs font-normal", value: "12px / 16px, 400" },
  { element: "Operator symbol", token: "font-mono text-xs font-normal", value: "12px / 16px, 400" },
  { element: "Logical operator", token: "text-xs font-medium", value: "12px / 16px, 500" },
  { element: "Menu item (Command)", token: "text-xs font-normal", value: "12px / 16px, 400" },
  { element: "New group button", token: "text-xs font-medium", value: "12px / 16px, 500" },
]

export const filterBarColorRows: TokenTableRow[] = [
  { element: "Bar border and condition dividers", token: "border-border", value: "--border", swatch: "--border" },
  { element: "Bar background", token: "bg-foreground/[.026]", value: "--foreground / 2.6%", swatch: "--foreground" },
  { element: "Search icon segment and condition", token: "bg-muted", value: "--muted", swatch: "--muted" },
  { element: "Search icon, property label and placeholder", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Operator and value", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Menu (Popover + Command)", token: "bg-popover / text-popover-foreground", value: "--popover", swatch: "--popover" },
  { element: "Menu ring", token: "ring-foreground/10", value: "--foreground / 10%", swatch: "--foreground" },
  { element: "Bar background, both sizes", token: "bg-foreground/[.026]", value: "same tokens at sm and md", swatch: "--foreground" },
  { element: "Overflowing conditions", token: "overflow-auto flex-nowrap", value: "scroll horizontally", swatch: "--border" },
  { element: "Highlighted menu item", token: "data-[selected=true]:bg-muted", value: "--muted", swatch: "--muted" },
  { element: "Nested group parentheses and new group button", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Focus ring", token: "ring-ring", value: "--ring", swatch: "--ring" },
]
