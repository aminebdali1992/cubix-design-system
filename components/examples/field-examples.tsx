import { Button } from "@/components/cubix/button"
import { Checkbox } from "@/components/cubix/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/cubix/field"
import { Input } from "@/components/cubix/input"
import { RadioGroup, RadioGroupItem } from "@/components/cubix/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/cubix/select"
import { Switch } from "@/components/cubix/switch"
import { Textarea } from "@/components/cubix/textarea"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

function PreviewFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className="w-full">
      <div className={cn("mx-auto w-full", className)}>{children}</div>
    </div>
  )
}

export function FieldDemo() {
  return (
    <PreviewFrame className="max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>All transactions are secure and encrypted</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-card-name">Name on Card</FieldLabel>
                <Input id="checkout-card-name" placeholder="Evil Rabbit" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-card-number">Card Number</FieldLabel>
                <Input id="checkout-card-number" placeholder="1234 5678 9012 3456" required />
                <FieldDescription>Enter your 16-digit card number</FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month">Month</FieldLabel>
                  <Select>
                    <SelectTrigger size="sm" id="checkout-exp-month">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[
                          "01",
                          "02",
                          "03",
                          "04",
                          "05",
                          "06",
                          "07",
                          "08",
                          "09",
                          "10",
                          "11",
                          "12",
                        ].map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-exp-year">Year</FieldLabel>
                  <Select>
                    <SelectTrigger size="sm" id="checkout-exp-year">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["2024", "2025", "2026", "2027", "2028", "2029"].map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-cvv">CVV</FieldLabel>
                  <Input id="checkout-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox id="checkout-same-as-shipping" defaultChecked />
                <FieldLabel htmlFor="checkout-same-as-shipping" className="font-normal">
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-comments">Comments</FieldLabel>
                <Textarea
                  id="checkout-comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </PreviewFrame>
  )
}

export function FieldInputDemo() {
  return (
    <PreviewFrame className="max-w-xs">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input id="username" type="text" placeholder="Max Leiter" />
            <FieldDescription>Choose a unique username for your account.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            <Input id="password" type="password" placeholder="••••••••" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </PreviewFrame>
  )
}

export function FieldTextareaDemo() {
  return (
    <PreviewFrame className="max-w-xs">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
            <Textarea id="feedback" placeholder="Your feedback helps us improve..." rows={4} />
            <FieldDescription>Share your thoughts about our service.</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </PreviewFrame>
  )
}

export function FieldSelectDemo() {
  return (
    <PreviewFrame className="max-w-xs">
      <Field>
        <FieldLabel>Department</FieldLabel>
        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Choose department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="support">Customer Support</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription>Select your department or area of work.</FieldDescription>
      </Field>
    </PreviewFrame>
  )
}

export function FieldFieldsetDemo() {
  return (
    <PreviewFrame className="max-w-sm">
      <FieldSet>
        <FieldLegend>Address Information</FieldLegend>
        <FieldDescription>We need your address to deliver your order.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="street">Street Address</FieldLabel>
            <Input id="street" type="text" placeholder="123 Main St" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" type="text" placeholder="New York" />
            </Field>
            <Field>
              <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
              <Input id="zip" type="text" placeholder="90502" />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </PreviewFrame>
  )
}

export function FieldCheckboxDemo() {
  return (
    <PreviewFrame className="max-w-xs">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
          <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
          <FieldGroup className="gap-3">
            <Field orientation="horizontal">
              <Checkbox id="finder-hard-disks" defaultChecked />
              <FieldLabel htmlFor="finder-hard-disks" className="font-normal">
                Hard disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-external-disks" />
              <FieldLabel htmlFor="finder-external-disks" className="font-normal">
                External disks
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-cds-dvds" />
              <FieldLabel htmlFor="finder-cds-dvds" className="font-normal">
                CDs, DVDs, and iPods
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="finder-connected-servers" />
              <FieldLabel htmlFor="finder-connected-servers" className="font-normal">
                Connected servers
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Checkbox id="finder-sync-folders" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="finder-sync-folders">Sync Desktop & Documents folders</FieldLabel>
            <FieldDescription>
              Your Desktop & Documents folders are being synced with iCloud Drive. You can access
              them from other devices.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </PreviewFrame>
  )
}

export function FieldRadioDemo() {
  return (
    <PreviewFrame className="max-w-xs">
      <FieldSet>
        <FieldLegend variant="label">Subscription Plan</FieldLegend>
        <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
        <RadioGroup defaultValue="monthly">
          <Field orientation="horizontal">
            <RadioGroupItem value="monthly" id="plan-monthly" />
            <FieldLabel htmlFor="plan-monthly" className="font-normal">
              Monthly ($9.99/month)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="yearly" id="plan-yearly" />
            <FieldLabel htmlFor="plan-yearly" className="font-normal">
              Yearly ($99.99/year)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="lifetime" id="plan-lifetime" />
            <FieldLabel htmlFor="plan-lifetime" className="font-normal">
              Lifetime ($299.99)
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </PreviewFrame>
  )
}

export function FieldSwitchDemo() {
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" />
    </Field>
  )
}

export function FieldChoiceCardDemo() {
  return (
    <PreviewFrame className="max-w-xs">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Compute Environment</FieldLegend>
          <FieldDescription>Select the compute environment for your cluster.</FieldDescription>
          <RadioGroup defaultValue="kubernetes">
            <FieldLabel htmlFor="kubernetes-r2h">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Kubernetes</FieldTitle>
                  <FieldDescription>Run GPU workloads on a K8s cluster.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="vm-z4k">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Virtual Machine</FieldTitle>
                  <FieldDescription>Access a cluster to run GPU workloads.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="vm" id="vm-z4k" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </PreviewFrame>
  )
}

export function FieldGroupDemo() {
  return (
    <PreviewFrame className="max-w-xs">
      <FieldGroup>
        <FieldSet>
          <FieldLabel>Responses</FieldLabel>
          <FieldDescription>
            Get notified when an assistant responds to requests that take time, like research or
            image generation.
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox id="push" defaultChecked disabled />
              <FieldLabel htmlFor="push" className="font-normal">
                Push notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLabel>Tasks</FieldLabel>
          <FieldDescription>
            Get notified when tasks you&apos;ve created have updates. <a href="#">Manage tasks</a>
          </FieldDescription>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox id="push-tasks" />
              <FieldLabel htmlFor="push-tasks" className="font-normal">
                Push notifications
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="email-tasks" />
              <FieldLabel htmlFor="email-tasks" className="font-normal">
                Email notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </PreviewFrame>
  )
}

export function FieldResponsiveDemo() {
  return (
    <PreviewFrame className="max-w-lg">
      <form>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>Fill in your profile information.</FieldDescription>
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="profile-name">Name</FieldLabel>
                <FieldDescription>Provide your full name for identification</FieldDescription>
              </FieldContent>
              <Input id="profile-name" placeholder="Evil Rabbit" required />
            </Field>
            <Field orientation="responsive">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </PreviewFrame>
  )
}
