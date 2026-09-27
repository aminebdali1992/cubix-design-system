export const creditCardPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height for the control: default 40px, lg 48px. Inherited by CreditCardControl unless overridden. Use className for other heights.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the field and prevents interaction. Forwarded to the segments on every base.",
  },
  {
    prop: "invalid",
    type: "boolean",
    default: "false",
    description:
      "Marks the field as invalid and shows CreditCardError when present.",
  },
  {
    prop: "name",
    type: "string",
    description:
      "Writes a hidden input with the combined four-group value (Persian digits, hyphen-separated) for form submit.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the root styles (last one wins).",
  },
]

export const creditCardControlPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from CreditCard. Height matches the default and lg sizes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "Compose CreditCardGroup1-4 with CreditCardSeparator between them. The control is a layout row only (dir=ltr) - each group has its own input box.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const creditCardSegmentPropRows = [
  {
    prop: "part",
    type: '"group1" | "group2" | "group3" | "group4"',
    description:
      "Fixed by CreditCardGroup1-4. Each group accepts 4 digits and always displays Persian digits.",
  },
  {
    prop: "placeholder",
    type: "string",
    default: "-",
    description: "Hint text shown when the segment is empty. Empty by default.",
  },
  {
    prop: "inputMode",
    type: '"numeric"',
    default: '"numeric"',
    description:
      "Locked to numeric so mobile keyboards show a number pad.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the segment styles (last one wins).",
  },
  {
    prop: "...props",
    type: "Omit<React.ComponentProps<'input'>, 'type' | 'inputMode' | 'spellCheck' | 'maxLength'>",
    description:
      "Native input attributes (value, onChange, defaultValue, ...) are forwarded. type, inputMode, spellCheck, and maxLength stay locked. Use parseCreditCardValue / formatCreditCardValue for the combined string.",
  },
]

export const creditCardSeparatorPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    default: '"-"',
    description: "Separator between card number groups. Defaults to -.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the separator styles (last one wins).",
  },
]

export const creditCardPartPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "For CreditCardDescription: shown as helper text until six digits match a known Iranian bank BIN, then replaced by the bank name (for example بانک ملت).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the part styles (last one wins).",
  },
  {
    prop: "...props",
    type: "HTML attributes",
    description: "Native attributes for the rendered element are forwarded.",
  },
]
