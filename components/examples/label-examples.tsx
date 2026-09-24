import { Checkbox } from "@/components/cubix/checkbox"
import { Field } from "@/components/cubix/field"
import { Input } from "@/components/cubix/input"
import { Label } from "@/components/cubix/label"
import { Textarea } from "@/components/cubix/textarea"

export function LabelDemo() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </Field>
  )
}

export function LabelCheckboxDemo() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <Checkbox id="label-demo-terms" />
      <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
    </Field>
  )
}

export function LabelInputDemo() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-demo-username">Username</Label>
      <Input id="label-demo-username" placeholder="Username" />
    </Field>
  )
}

export function LabelDisabledDemo() {
  return (
    <Field className="w-full max-w-xs" data-disabled={true}>
      <Label htmlFor="label-demo-disabled">Disabled</Label>
      <Input id="label-demo-disabled" placeholder="Disabled" disabled />
    </Field>
  )
}

export function LabelTextareaDemo() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-demo-message">Message</Label>
      <Textarea id="label-demo-message" placeholder="Message" />
    </Field>
  )
}
