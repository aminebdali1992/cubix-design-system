import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import * as ariaButton from "@/components/cubix/aria/button"
import * as aria from "@/components/cubix/aria/dialog"
import * as baseButton from "@/components/cubix/base/button"
import * as base from "@/components/cubix/base/dialog"
import * as radixButton from "@/components/cubix/radix/button"
import * as radix from "@/components/cubix/radix/dialog"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"

const suites = byBase({
  base: { ...base, ...baseButton },
  aria: { ...aria, ...ariaButton },
  radix: { ...radix, ...radixButton },
})

describe.each(suites)(
  "Dialog (%s)",
  (
    _base,
    {
      Button,
      Dialog,
      DialogClose,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
    }
  ) => {
    function DeleteDialog(props: {
      open?: boolean
      onOpenChange?: (open: boolean) => void
      dir?: "ltr" | "rtl"
    }) {
      const { dir, ...rootProps } = props
      return (
        <Dialog {...rootProps}>
          <DialogTrigger render={<Button variant="outline" />}>Delete account</DialogTrigger>
          <DialogContent dir={dir}>
            <DialogHeader>
              <DialogTitle>Delete your account?</DialogTitle>
              <DialogDescription>This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }

    async function openDialog() {
      const user = userEvent.setup()
      render(<DeleteDialog />)
      const trigger = screen.getByRole("button", { name: "Delete account" })
      await user.click(trigger)
      const dialog = await screen.findByRole("dialog")
      return { user, trigger, dialog }
    }

    it("is closed until the trigger is pressed", () => {
      render(<DeleteDialog />)

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })

    it("opens a dialog named by its title and described by its description", async () => {
      const { dialog } = await openDialog()

      expect(dialog).toHaveAccessibleName("Delete your account?")
      expect(dialog).toHaveAccessibleDescription("This cannot be undone.")
    })

    it("moves focus into the dialog", async () => {
      const { dialog } = await openDialog()

      await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement))
    })

    it("closes on Escape and returns focus to the trigger", async () => {
      const { user, trigger } = await openDialog()

      await user.keyboard("{Escape}")

      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
      await waitFor(() => expect(trigger).toHaveFocus())
    })

    it("closes from DialogClose", async () => {
      const { user } = await openDialog()

      await user.click(screen.getByRole("button", { name: "Cancel" }))

      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    })

    it("closes from the built-in close button", async () => {
      const { user } = await openDialog()

      await user.click(screen.getByRole("button", { name: "Close" }))

      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    })

    it("reports close requests when controlled", async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<DeleteDialog open onOpenChange={onOpenChange} />)
      await screen.findByRole("dialog")

      await user.keyboard("{Escape}")

      expect(onOpenChange.mock.lastCall?.[0]).toBe(false)
    })

    it("defaults the panel to Persian right-to-left", async () => {
      await openDialog()
      const content = document.querySelector('[data-slot="dialog-content"]')

      expect(content).toHaveAttribute("dir", "rtl")
      expect(content).toHaveAttribute("lang", "fa")
    })

    it("switches the panel to left-to-right without a Persian lang", async () => {
      const user = userEvent.setup()
      render(<DeleteDialog dir="ltr" />)
      await user.click(screen.getByRole("button", { name: "Delete account" }))
      await screen.findByRole("dialog")
      const content = document.querySelector('[data-slot="dialog-content"]')

      expect(content).toHaveAttribute("dir", "ltr")
      expect(content).not.toHaveAttribute("lang")
    })

    it("has no accessibility violations when open", async () => {
      await openDialog()

      await expectNoAxeViolations(document.body)
    })
  }
)
