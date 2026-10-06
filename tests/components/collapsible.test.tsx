import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/collapsible"
import * as base from "@/components/cubix/base/collapsible"
import * as radix from "@/components/cubix/radix/collapsible"
import { Button } from "@/components/cubix/button"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"

const CONTENT = "Shipping address"

/* Closed panels are unmounted on Radix and hidden on Base UI and React Aria. */
function isContentShown() {
  const content = screen.queryByText(CONTENT)
  if (!content) return false
  return content.closest("[hidden]") === null
}

describe.each(byBase({ base, aria, radix }))(
  "Collapsible (%s)",
  (_base, { Collapsible, CollapsibleContent, CollapsibleTrigger }) => {
    function Order(props: {
      open?: boolean
      defaultOpen?: boolean
      onOpenChange?: (open: boolean) => void
      disabled?: boolean
    }) {
      return (
        <Collapsible {...props}>
          <CollapsibleTrigger>Order details</CollapsibleTrigger>
          <CollapsibleContent>
            <p>{CONTENT}</p>
          </CollapsibleContent>
        </Collapsible>
      )
    }

    function trigger() {
      return screen.getByRole("button", { name: "Order details" })
    }

    it("starts closed and opens from the trigger", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      const { container } = render(<Order onOpenChange={onOpenChange} />)

      expect(trigger()).toHaveAttribute("aria-expanded", "false")
      expect(isContentShown()).toBe(false)
      expect(container.querySelector('[data-slot="collapsible"]')).toHaveAttribute(
        "data-closed"
      )

      await user.click(trigger())

      expect(trigger()).toHaveAttribute("aria-expanded", "true")
      expect(trigger()).toHaveAttribute("data-panel-open")
      expect(isContentShown()).toBe(true)
      expect(onOpenChange.mock.lastCall?.[0]).toBe(true)
      expect(container.querySelector('[data-slot="collapsible"]')).toHaveAttribute(
        "data-open"
      )
      expect(screen.getByText(CONTENT).closest('[data-slot="collapsible-content"]')).toHaveAttribute(
        "data-open"
      )
    })

    it("links the trigger to the panel it controls", async () => {
      const user = userEvent.setup()
      render(<Order defaultOpen />)

      const panel = screen.getByText(CONTENT).closest('[data-slot="collapsible-content"]')
      expect(panel).not.toBeNull()
      expect(trigger()).toHaveAttribute("aria-controls", panel?.id)

      await user.click(trigger())
      expect(isContentShown()).toBe(false)
    })

    it("toggles with Enter and Space", async () => {
      const user = userEvent.setup()
      render(<Order />)

      await user.tab()
      expect(trigger()).toHaveFocus()
      await user.keyboard("{Enter}")
      expect(isContentShown()).toBe(true)
      await user.keyboard(" ")
      expect(isContentShown()).toBe(false)
    })

    it("stays controlled by open", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<Order open={false} onOpenChange={onOpenChange} />)

      await user.click(trigger())

      expect(onOpenChange.mock.lastCall?.[0]).toBe(true)
      expect(trigger()).toHaveAttribute("aria-expanded", "false")
      expect(isContentShown()).toBe(false)
    })

    it("ignores the trigger when disabled", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<Order disabled onOpenChange={onOpenChange} />)

      await user.click(trigger())

      expect(onOpenChange).not.toHaveBeenCalled()
      expect(isContentShown()).toBe(false)
    })

    it("composes the trigger with a Cubix Button through render", () => {
      render(
        <Collapsible>
          <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
            Order details
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p>{CONTENT}</p>
          </CollapsibleContent>
        </Collapsible>
      )

      expect(trigger()).toHaveClass("h-8")
      expect(trigger()).toHaveAttribute("aria-expanded", "false")
    })

    it("has no accessibility violations", async () => {
      const { container } = render(
        <>
          <Order defaultOpen />
          <Order />
        </>
      )

      await expectNoAxeViolations(container)
    })
  }
)
