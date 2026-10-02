export const verifyCodePropRows = [
  {
    prop: "length",
    type: "number",
    default: "6",
    description:
      "Number of digit boxes to render (clamped between 4 and 8). Inherited by VerifyCodeControl when it auto-renders digits.",
  },
  {
    prop: "groups",
    type: "number[]",
    description:
      "Optional digit grouping. Sum must equal length. Inserts a - between groups when VerifyCodeControl auto-renders - for example [3, 3] or [2, 2, 2]. Ignored when invalid or when you pass custom digit children.",
  },
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height for the digit boxes: default 40px, lg 48px. Inherited by VerifyCodeControl unless overridden.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the field and prevents interaction. Forwarded to every digit on every base.",
  },
  {
    prop: "invalid",
    type: "boolean",
    default: "false",
    description: "Marks the field as invalid and applies a destructive border on the digit boxes.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description:
      "Initial code as a digit string (Persian or Latin). Split across the boxes up to length.",
  },
  {
    prop: "value",
    type: "string",
    description: "Controlled code string. Pair with onValueChange when the parent owns the value.",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Called with the combined Persian-digit string whenever a digit changes.",
  },
  {
    prop: "name",
    type: "string",
    description:
      "Writes a hidden input with the combined code (Persian digits, no separators) for form submit.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the root styles (last one wins).",
  },
]

export const verifyCodeControlPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description: "Overrides the size from VerifyCode. Height matches the default and lg sizes.",
  },
  {
    prop: "digitClassName",
    type: "string",
    description:
      "Classes merged onto each auto-rendered VerifyCodeDigit. Ignored when you pass custom digit children.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "Optional. When omitted, VerifyCodeControl renders length digit boxes and inserts VerifyCodeSeparator between groups when groups is set on the root. Pass VerifyCodeDigit and VerifyCodeSeparator nodes to customize composition.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const verifyCodeDigitPropRows = [
  {
    prop: "index",
    type: "number",
    description:
      "Zero-based position of the digit box. Required when composing VerifyCodeDigit manually.",
  },
  {
    prop: "placeholder",
    type: "string",
    default: '""',
    description: "Hint text shown when the digit box is empty. Empty by default.",
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
    description: "Additional Tailwind classes merged with the digit styles (last one wins).",
  },
  {
    prop: "...props",
    type: "Omit<React.ComponentProps<'input'>, 'type' | 'inputMode' | 'spellCheck' | 'maxLength' | 'value' | 'defaultValue'>",
    description:
      "Native input attributes are forwarded. type, inputMode, spellCheck, maxLength, value, and defaultValue stay locked. Use parseVerifyCodeValue / formatVerifyCodeValue for the combined string.",
  },
]

export const verifyCodeSeparatorPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    default: '"-"',
    description: "Separator content between digit groups. Defaults to a hyphen.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the separator styles (last one wins).",
  },
]

export const verifyCodeResendPropRows = [
  {
    prop: "duration",
    type: "number",
    default: "60",
    description:
      "Countdown length in seconds before resend is available. Default is 1 minute (60). Pass 120 for two minutes.",
  },
  {
    prop: "waitingLabel",
    type: "React.ReactNode",
    default: '"زمان باقی‌مانده تا دریافت کد مجدد"',
    description: "Helper text shown beside the muted timer badge while counting down.",
  },
  {
    prop: "expiredLabel",
    type: "React.ReactNode",
    default: '"دریافت مجدد کد تایید"',
    description: "Helper text shown beside the badge after the countdown reaches zero.",
  },
  {
    prop: "resendLabel",
    type: "React.ReactNode",
    default: '"دریافت مجدد"',
    description:
      "Label inside the muted badge after the countdown ends. Clicking the badge restarts the timer.",
  },
  {
    prop: "onResend",
    type: "() => void",
    description:
      "Called when the user clicks the badge to resend. The countdown restarts automatically after the click.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the resend row styles (last one wins).",
  },
]

export const verifyCodePartPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Label text, helper description, or error message content.",
  },
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
