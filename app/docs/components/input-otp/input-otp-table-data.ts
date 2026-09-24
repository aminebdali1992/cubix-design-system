export const inputOTPPropRows = [
  {
    prop: "maxLength",
    type: "number",
    description: "Maximum number of characters the OTP input accepts.",
  },
  {
    prop: "value",
    type: "string",
    description: "Controlled value of the OTP input.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Initial value when uncontrolled.",
  },
  {
    prop: "onChange",
    type: "(value: string) => void",
    description: "Called when the OTP value changes.",
  },
  {
    prop: "pattern",
    type: "string",
    description:
      "Regular expression pattern for allowed characters. Use REGEXP_ONLY_DIGITS or REGEXP_ONLY_DIGITS_AND_CHARS from input-otp.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the OTP input.",
  },
  {
    prop: "containerClassName",
    type: "string",
    description: "Classes applied to the OTP container element.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Groups, slots, and separators that compose the OTP input.",
  },
]

export const inputOTPGroupPropRows = [
  {
    prop: "variant",
    type: '"default" | "separated"',
    default: '"default"',
    description:
      "Layout of the slots. Use separated to add space between individual inputs.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "One or more InputOTPSlot elements.",
  },
]

export const inputOTPSlotPropRows = [
  {
    prop: "index",
    type: "number",
    description: "Zero-based index of this slot within the OTP input.",
  },
  {
    prop: "variant",
    type: '"default" | "separated"',
    default: '"default"',
    description:
      "Visual style of the slot. Use separated for standalone bordered inputs.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    description: "Marks the slot as invalid and applies destructive styles.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const inputOTPSeparatorPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
