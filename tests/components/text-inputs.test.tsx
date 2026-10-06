import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import * as ariaInput from "@/components/cubix/aria/input"
import * as ariaTextarea from "@/components/cubix/aria/textarea"
import * as baseInput from "@/components/cubix/base/input"
import * as baseTextarea from "@/components/cubix/base/textarea"
import * as radixInput from "@/components/cubix/radix/input"
import * as radixTextarea from "@/components/cubix/radix/textarea"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"

describe.each(byBase({ base: baseInput, aria: ariaInput, radix: radixInput }))(
  "Input (%s)",
  (_base, { Input }) => {
    it("renders a labelled textbox with the input slot", () => {
      render(
        <>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" />
        </>
      )
      const input = screen.getByRole("textbox", { name: "Email" })

      expect(input).toHaveAttribute("data-slot", "input")
      expect(input).toHaveAttribute("type", "email")
    })

    it("accepts typing", async () => {
      const user = userEvent.setup()
      render(<Input aria-label="Name" />)
      const input = screen.getByRole("textbox", { name: "Name" })

      await user.type(input, "Cubix")

      expect(input).toHaveValue("Cubix")
    })

    it("forwards aria-invalid and disabled", () => {
      render(
        <>
          <Input aria-label="Invalid" aria-invalid />
          <Input aria-label="Disabled" disabled />
        </>
      )

      expect(screen.getByRole("textbox", { name: "Invalid" })).toHaveAttribute(
        "aria-invalid",
        "true"
      )
      expect(screen.getByRole("textbox", { name: "Disabled" })).toBeDisabled()
    })

    it("has no accessibility violations", async () => {
      const { container } = render(
        <>
          <label htmlFor="a">Email</label>
          <Input id="a" type="email" />
          <label htmlFor="b">Invalid</label>
          <Input id="b" aria-invalid />
        </>
      )

      await expectNoAxeViolations(container)
    })
  }
)

describe.each(byBase({ base: baseTextarea, aria: ariaTextarea, radix: radixTextarea }))(
  "Textarea (%s)",
  (_base, { Textarea }) => {
    it("renders a labelled multiline textbox with the textarea slot", () => {
      render(
        <>
          <label htmlFor="bio">Bio</label>
          <Textarea id="bio" />
        </>
      )
      const textarea = screen.getByRole("textbox", { name: "Bio" })

      expect(textarea.tagName).toBe("TEXTAREA")
      expect(textarea).toHaveAttribute("data-slot", "textarea")
    })

    it("accepts multiline typing", async () => {
      const user = userEvent.setup()
      render(<Textarea aria-label="Bio" />)
      const textarea = screen.getByRole("textbox", { name: "Bio" })

      await user.type(textarea, "Line one{Enter}Line two")

      expect(textarea).toHaveValue("Line one\nLine two")
    })

    it("forwards aria-invalid and disabled", () => {
      render(
        <>
          <Textarea aria-label="Invalid" aria-invalid />
          <Textarea aria-label="Disabled" disabled />
        </>
      )

      expect(screen.getByRole("textbox", { name: "Invalid" })).toHaveAttribute(
        "aria-invalid",
        "true"
      )
      expect(screen.getByRole("textbox", { name: "Disabled" })).toBeDisabled()
    })

    it("has no accessibility violations", async () => {
      const { container } = render(
        <>
          <label htmlFor="a">Bio</label>
          <Textarea id="a" />
        </>
      )

      await expectNoAxeViolations(container)
    })
  }
)
