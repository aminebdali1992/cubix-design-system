export const calendarPropRows = [
  {
    prop: "mode",
    type: '"single" | "multiple" | "range"',
    default: '"single"',
    description: "Selection mode for one date, several dates, or a range.",
  },
  {
    prop: "selected",
    type: "Date | Date[] | DateRange",
    description: "The selected date, dates, or range.",
  },
  {
    prop: "onSelect",
    type: "(date) => void",
    description: "Called when the selection changes.",
  },
  {
    prop: "captionLayout",
    type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
    default: '"label"',
    description: "Month caption as text or month/year dropdowns.",
  },
  {
    prop: "numberOfMonths",
    type: "number",
    default: "1",
    description: "How many months to show side by side.",
  },
  {
    prop: "showWeekNumber",
    type: "boolean",
    default: "false",
    description: "Show ISO week numbers in a leading column.",
  },
  {
    prop: "showOutsideDays",
    type: "boolean",
    default: "true",
    description: "Show days from the previous and next months.",
  },
  {
    prop: "buttonVariant",
    type: '"default" | "secondary" | "gray" | "destructive" | "destructive-secondary" | "outline" | "ghost" | "link"',
    default: '"ghost"',
    description: "Visual style of the previous and next month buttons.",
  },
  {
    prop: "locale",
    type: "Locale",
    description: "Locale from react-day-picker/locale for weekday labels and formatting.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    description: "Reading direction for the grid, captions, and nav chevrons.",
  },
  {
    prop: "numerals",
    type: '"latn" | "arab" | "arabext" | string',
    default: '"latn"',
    description: "Numbering system for day and year digits. Use arabext for Persian digits.",
  },
  {
    prop: "timeZone",
    type: "string",
    description:
      "IANA timezone used to display and select dates. Set this on the client to avoid hydration mismatches.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
