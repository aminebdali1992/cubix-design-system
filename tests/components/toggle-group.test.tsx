import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/toggle-group"
import * as base from "@/components/cubix/base/toggle-group"
import * as radix from "@/components/cubix/radix/toggle-group"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"
import { isDisabledControl } from "@/tests/utils/dom"

/*
  Single-selection groups expose their items as toggle buttons on Base UI and
  as radios on Radix and React Aria, so the on state is aria-pressed or
  aria-checked depending on the base.
*/
function isOn(element: HTMLElement) {
  return (
    element.getAttribute("aria-pressed") === "true" ||
    element.getAttribute("aria-checked") === "true"
  )
}

function item(name: string) {
  return screen.getByLabelText(name)
}

describe.each(byBase({ base, aria, radix }))(
  "ToggleGroup (%s)",
  (_base, { ToggleGroup, ToggleGroupItem }) => {
    function Formatting(props: {
      multiple?: boolean
      value?: string[]
      defaultValue?: string[]
      onValueChange?: (value: string[]) => void
      disabled?: boolean
    }) {
      return (
        <div dir="ltr">
          <ToggleGroup variant="outline" spacing={0} {...props}>
            <ToggleGroupItem value="bold" aria-label="Bold">
              B
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              I
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              U
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      )
    }

    it("shares variant and spacing with its items", () => {
      const { container } = render(<Formatting />)
      const group = container.querySelector('[data-slot="toggle-group"]')

      expect(group).toHaveAttribute("data-variant", "outline")
      expect(group).toHaveAttribute("data-spacing", "0")
      expect(item("Bold")).toHaveAttribute("data-slot", "toggle-group-item")
      expect(item("Bold")).toHaveAttribute("data-variant", "outline")
      expect(item("Bold")).toHaveClass("border-input")
    })

    it("selects one item at a time by default", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Formatting onValueChange={onValueChange} />)

      await user.click(item("Bold"))
      expect(isOn(item("Bold"))).toBe(true)
      expect(onValueChange.mock.lastCall?.[0]).toEqual(["bold"])

      await user.click(item("Italic"))
      expect(isOn(item("Bold"))).toBe(false)
      expect(isOn(item("Italic"))).toBe(true)
      expect(onValueChange.mock.lastCall?.[0]).toEqual(["italic"])

      await user.click(item("Italic"))
      expect(isOn(item("Italic"))).toBe(false)
      expect(onValueChange.mock.lastCall?.[0]).toEqual([])
    })

    it("selects several items with multiple", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Formatting multiple defaultValue={["bold"]} onValueChange={onValueChange} />)

      expect(isOn(item("Bold"))).toBe(true)
      await user.click(item("Underline"))

      expect(isOn(item("Bold"))).toBe(true)
      expect(isOn(item("Underline"))).toBe(true)
      expect(onValueChange.mock.lastCall?.[0]).toEqual(["bold", "underline"])
    })

    it("stays controlled by value", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Formatting value={["bold"]} onValueChange={onValueChange} />)

      await user.click(item("Italic"))

      expect(onValueChange.mock.lastCall?.[0]).toEqual(["italic"])
      expect(isOn(item("Bold"))).toBe(true)
      expect(isOn(item("Italic"))).toBe(false)
    })

    it("moves focus between items with the arrow keys", async () => {
      const user = userEvent.setup()
      render(<Formatting multiple />)

      await user.click(item("Bold"))
      expect(item("Bold")).toHaveFocus()
      await user.keyboard("{ArrowRight}")
      expect(item("Italic")).toHaveFocus()
      await user.keyboard("{ArrowLeft}")
      expect(item("Bold")).toHaveFocus()
    })

    it("disables every item from the group", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Formatting disabled onValueChange={onValueChange} />)

      await user.click(item("Bold"))

      expect(isDisabledControl(item("Bold"))).toBe(true)
      expect(isOn(item("Bold"))).toBe(false)
      expect(onValueChange).not.toHaveBeenCalled()
    })

    it("has no accessibility violations", async () => {
      const { container } = render(
        <>
          <Formatting defaultValue={["bold"]} />
          <Formatting multiple defaultValue={["bold", "italic"]} />
        </>
      )

      await expectNoAxeViolations(container)
    })
  }
)
