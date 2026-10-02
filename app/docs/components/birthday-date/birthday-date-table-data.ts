export const birthdayDatePropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height for the control: default 40px, lg 48px. Inherited by BirthdayDateControl unless overridden. Use className for other heights.",
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
    description: "Marks the field as invalid and shows BirthdayDateError when present.",
  },
  {
    prop: "name",
    type: "string",
    description:
      "Writes a hidden input with the combined day/month/year value (Persian digits, slash-separated) for form submit.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the root styles (last one wins).",
  },
]

export const birthdayDateControlPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description: "Overrides the size from BirthdayDate. Height matches the default and lg sizes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "Compose BirthdayDateDay, BirthdayDateSeparator, BirthdayDateMonth, BirthdayDateSeparator, and BirthdayDateYear. The control is a layout row only - each segment has its own input box.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const birthdayDateSegmentPropRows = [
  {
    prop: "part",
    type: '"day" | "month" | "year"',
    description:
      "Fixed by BirthdayDateDay (2 digits), BirthdayDateMonth (2 digits), and BirthdayDateYear (4 digits). Values always display as Persian digits.",
  },
  {
    prop: "placeholder",
    type: "string",
    default: "روز / ماه / سال",
    description: "Hint text shown when the segment is empty.",
  },
  {
    prop: "inputMode",
    type: '"numeric"',
    default: '"numeric"',
    description: "Locked to numeric so mobile keyboards show a number pad.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the segment styles (last one wins).",
  },
  {
    prop: "...props",
    type: "Omit<React.ComponentProps<'input'>, 'type' | 'inputMode' | 'spellCheck' | 'maxLength'>",
    description:
      "Native input attributes (value, onChange, defaultValue, ...) are forwarded. type, inputMode, spellCheck, and maxLength stay locked. Use parseBirthdayDateValue / formatBirthdayDateValue for the combined string.",
  },
]

export const birthdayDateSeparatorPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    default: '"/"',
    description: "Separator between day, month, and year. Defaults to /.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the separator styles (last one wins).",
  },
]

export const birthdayDatePartPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the part styles (last one wins).",
  },
  {
    prop: "...props",
    type: "HTML attributes",
    description: "Native attributes for the rendered element are forwarded.",
  },
]
