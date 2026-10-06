// @vitest-environment node
import { renderToString } from "react-dom/server"
import { describe, expect, it } from "vitest"

import * as ariaAlertDialog from "@/components/cubix/aria/alert-dialog"
import * as ariaButton from "@/components/cubix/aria/button"
import * as ariaCheckbox from "@/components/cubix/aria/checkbox"
import * as ariaDialog from "@/components/cubix/aria/dialog"
import * as ariaInput from "@/components/cubix/aria/input"
import * as ariaRadioGroup from "@/components/cubix/aria/radio-group"
import * as ariaSwitch from "@/components/cubix/aria/switch"
import * as ariaTabs from "@/components/cubix/aria/tabs"
import * as ariaTextarea from "@/components/cubix/aria/textarea"
import * as baseAlertDialog from "@/components/cubix/base/alert-dialog"
import * as baseButton from "@/components/cubix/base/button"
import * as baseCheckbox from "@/components/cubix/base/checkbox"
import * as baseDialog from "@/components/cubix/base/dialog"
import * as baseInput from "@/components/cubix/base/input"
import * as baseRadioGroup from "@/components/cubix/base/radio-group"
import * as baseSwitch from "@/components/cubix/base/switch"
import * as baseTabs from "@/components/cubix/base/tabs"
import * as baseTextarea from "@/components/cubix/base/textarea"
import * as radixAlertDialog from "@/components/cubix/radix/alert-dialog"
import * as radixButton from "@/components/cubix/radix/button"
import * as radixCheckbox from "@/components/cubix/radix/checkbox"
import * as radixDialog from "@/components/cubix/radix/dialog"
import * as radixInput from "@/components/cubix/radix/input"
import * as radixRadioGroup from "@/components/cubix/radix/radio-group"
import * as radixSwitch from "@/components/cubix/radix/switch"
import * as radixTabs from "@/components/cubix/radix/tabs"
import * as radixTextarea from "@/components/cubix/radix/textarea"
import { byBase } from "@/tests/utils/bases"

const suites = byBase({
  base: {
    ...baseAlertDialog,
    ...baseButton,
    ...baseCheckbox,
    ...baseDialog,
    ...baseInput,
    ...baseRadioGroup,
    ...baseSwitch,
    ...baseTabs,
    ...baseTextarea,
  },
  aria: {
    ...ariaAlertDialog,
    ...ariaButton,
    ...ariaCheckbox,
    ...ariaDialog,
    ...ariaInput,
    ...ariaRadioGroup,
    ...ariaSwitch,
    ...ariaTabs,
    ...ariaTextarea,
  },
  radix: {
    ...radixAlertDialog,
    ...radixButton,
    ...radixCheckbox,
    ...radixDialog,
    ...radixInput,
    ...radixRadioGroup,
    ...radixSwitch,
    ...radixTabs,
    ...radixTextarea,
  },
})

describe.each(suites)("server rendering (%s)", (_base, ui) => {
  it("runs without browser globals", () => {
    expect(typeof window).toBe("undefined")
    expect(typeof document).toBe("undefined")
  })

  it("renders form controls with their slots", () => {
    const html = renderToString(
      <form>
        <ui.Button>Save</ui.Button>
        <ui.Checkbox aria-label="Accept" defaultChecked />
        <ui.Switch aria-label="Notify" />
        <ui.RadioGroup aria-label="Plan" defaultValue="free">
          <ui.RadioGroupItem value="free" aria-label="Free" />
        </ui.RadioGroup>
        <ui.Input aria-label="Email" />
        <ui.Textarea aria-label="Bio" />
      </form>
    )

    for (const slot of [
      "button",
      "checkbox",
      "switch",
      "radio-group-item",
      "input",
      "textarea",
    ]) {
      expect(html).toContain(`data-slot="${slot}"`)
    }
  })

  it("renders tabs with the selected panel", () => {
    const html = renderToString(
      <ui.Tabs defaultValue="account">
        <ui.TabsList aria-label="Settings">
          <ui.TabsTrigger value="account">Account</ui.TabsTrigger>
          <ui.TabsTrigger value="billing">Billing</ui.TabsTrigger>
        </ui.TabsList>
        <ui.TabsContent value="account">Account panel</ui.TabsContent>
        <ui.TabsContent value="billing">Billing panel</ui.TabsContent>
      </ui.Tabs>
    )

    expect(html).toContain('data-slot="tabs-list"')
    expect(html).toContain("Account panel")
  })

  it("renders closed dialogs as their triggers only", () => {
    const html = renderToString(
      <>
        <ui.Dialog>
          <ui.DialogTrigger render={<ui.Button variant="outline" />}>Open dialog</ui.DialogTrigger>
          <ui.DialogContent>
            <ui.DialogTitle>Dialog title</ui.DialogTitle>
            <ui.DialogDescription>Dialog description</ui.DialogDescription>
          </ui.DialogContent>
        </ui.Dialog>
        <ui.AlertDialog>
          <ui.AlertDialogTrigger render={<ui.Button variant="destructive" />}>
            Open alert
          </ui.AlertDialogTrigger>
          <ui.AlertDialogContent>
            <ui.AlertDialogTitle>Alert title</ui.AlertDialogTitle>
            <ui.AlertDialogDescription>Alert description</ui.AlertDialogDescription>
          </ui.AlertDialogContent>
        </ui.AlertDialog>
      </>
    )

    expect(html).toContain("Open dialog")
    expect(html).toContain("Open alert")
    expect(html).not.toContain("Dialog description")
    expect(html).not.toContain("Alert description")
  })
})
