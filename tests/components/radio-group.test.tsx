import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/radio-group"
import * as base from "@/components/cubix/base/radio-group"
import * as radix from "@/components/cubix/radix/radio-group"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"
import { isDisabledControl } from "@/tests/utils/dom"

describe.each(byBase({ base, aria, radix }))(
  "RadioGroup (%s)",
  (_base, { RadioGroup, RadioGroupItem }) => {
    function Plans(props: {
      defaultValue?: string
      value?: string
      disabled?: boolean
      onValueChange?: (value: string) => void
    }) {
      return (
        <RadioGroup aria-label="Plan" {...props}>
          <RadioGroupItem value="free" aria-label="Free" />
          <RadioGroupItem value="pro" aria-label="Pro" />
          <RadioGroupItem value="team" aria-label="Team" />
        </RadioGroup>
      )
    }

    it("exposes a labelled radiogroup with slots", () => {
      const { container } = render(<Plans defaultValue="free" />)

      expect(screen.getByRole("radiogroup", { name: "Plan" })).toBeInTheDocument()
      expect(container.querySelectorAll('[data-slot="radio-group-item"]')).toHaveLength(3)
      expect(screen.getByRole("radio", { name: "Free" })).toBeChecked()
    })

    it("selects on click and reports the value", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Plans defaultValue="free" onValueChange={onValueChange} />)

      await user.click(screen.getByRole("radio", { name: "Pro" }))

      expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked()
      expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked()
      expect(onValueChange.mock.lastCall?.[0]).toBe("pro")
    })

    it("moves selection with the arrow keys", async () => {
      const user = userEvent.setup()
      render(<Plans defaultValue="free" />)

      await user.tab()
      expect(screen.getByRole("radio", { name: "Free" })).toHaveFocus()
      // Hold the key like a real press: Radix selects on focus only while an arrow is down.
      await user.keyboard("{ArrowDown>}")

      const pro = screen.getByRole("radio", { name: "Pro" })
      await waitFor(() => expect(pro).toHaveFocus())
      expect(pro).toBeChecked()
      await user.keyboard("{/ArrowDown}")
    })

    it("stays controlled by value", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Plans value="free" onValueChange={onValueChange} />)

      await user.click(screen.getByRole("radio", { name: "Team" }))

      expect(onValueChange.mock.lastCall?.[0]).toBe("team")
      expect(screen.getByRole("radio", { name: "Free" })).toBeChecked()
    })

    it("ignores interaction when disabled", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Plans defaultValue="free" disabled onValueChange={onValueChange} />)
      const pro = screen.getByRole("radio", { name: "Pro" })

      await user.click(pro)

      expect(isDisabledControl(pro)).toBe(true)
      expect(pro).not.toBeChecked()
      expect(onValueChange).not.toHaveBeenCalled()
    })

    it("has no accessibility violations", async () => {
      const { container } = render(<Plans defaultValue="pro" />)

      await expectNoAxeViolations(container)
    })
  }
)
