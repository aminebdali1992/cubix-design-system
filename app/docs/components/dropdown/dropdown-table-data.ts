import type { TokenTableRow } from "@/components/docs/token-table"

export {
  textFieldPartPropRows as dropdownFieldPartPropRows,
} from "../text-field/text-field-table-data"

export const dropdownFieldPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Field size: default 40px, lg 48px. Pass the same value to textFieldInputVariants on the trigger so the heights match.",
  },
  {
    prop: "invalid",
    type: "boolean",
    default: "false",
    description:
      'Marks the field as invalid and shows TextFieldError. Also set aria-invalid="true" on the trigger for the destructive border.',
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Dims the field (data-disabled:opacity-70). Also set disabled on the trigger button so the menu cannot open.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the root styles (last one wins). The examples use w-full max-w-sm.",
  },
]

export const dropdownTriggerPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      'A <button type="button"> styled with textFieldInputVariants({ size }) plus "flex items-center justify-between gap-2 text-start".',
  },
  {
    prop: "aria-invalid",
    type: '"true"',
    description: "Set on the render button in the error state. Applies border-destructive.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Set on the render button in the disabled state. Applies bg-muted and blocks opening.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "The selected option label followed by ChevronDownIcon (size-4 shrink-0 text-muted-foreground), which sits at the inline end (the left in RTL).",
  },
]

export const dropdownContentPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "The examples use w-[var(--anchor-width,var(--radix-dropdown-menu-trigger-width,var(--trigger-width)))] so the menu matches the trigger width on Base UI, Radix, and React Aria.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    description: "Alignment against the trigger. Opens at the start edge (the right in RTL) by default.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "One DropdownMenuItem per option. No radio or check indicator is shown.",
  },
]

export const dropdownItemPropRows = [
  {
    prop: "onClick",
    type: "() => void",
    description:
      "Runs when the option is chosen with a click, Enter or Space. The examples set the field value here; the menu then closes on every base.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the option.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The option label.",
  },
]

export const dropdownKeyboardRows = [
  { key: "Tab", action: "Moves focus to the trigger." },
  {
    key: "Enter / Space / ArrowDown",
    action: "On the trigger, opens the menu and focuses the first option.",
  },
  { key: "ArrowDown / ArrowUp", action: "Moves focus to the next or previous option." },
  { key: "Home / End", action: "Moves focus to the first or last option." },
  { key: "Enter / Space", action: "Selects the focused option, updates the trigger label and closes the menu." },
  { key: "Escape", action: "Closes the menu and returns focus to the trigger." },
  {
    key: "Character keys",
    action: "Moves focus to the next option whose label starts with the typed character.",
  },
]

export const dropdownTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-label", value: "13px, 400" },
  { element: "Trigger value", token: "text-label", value: "13px, 400" },
  { element: "Option", token: "text-label", value: "13px, 400" },
  { element: "Description", token: "text-caption", value: "12px, 400" },
  { element: "Error", token: "text-caption", value: "12px, 400" },
]

export const dropdownColorRows: TokenTableRow[] = [
  { element: "Trigger border", token: "border-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Label / value text", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Chevron / description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Focus border", token: "border-primary", value: "--primary", swatch: "--primary" },
  { element: "Focus ring", token: "ring-primary/20", value: "--primary, 20%", swatch: "--primary" },
  { element: "Invalid border / error", token: "destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Disabled background", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Menu background", token: "bg-popover", value: "--popover", swatch: "--popover", swatchOutline: true },
  { element: "Menu ring", token: "ring-foreground/[0.06]", value: "--foreground / 6%", swatch: "--foreground" },
  { element: "Option (focus)", token: "bg-accent text-accent-foreground", value: "--accent", swatch: "--accent", swatchOutline: true },
]
