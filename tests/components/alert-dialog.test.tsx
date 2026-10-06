import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/alert-dialog"
import * as ariaButton from "@/components/cubix/aria/button"
import * as base from "@/components/cubix/base/alert-dialog"
import * as baseButton from "@/components/cubix/base/button"
import * as radix from "@/components/cubix/radix/alert-dialog"
import * as radixButton from "@/components/cubix/radix/button"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"

const suites = byBase({
  base: { ...base, ...baseButton },
  aria: { ...aria, ...ariaButton },
  radix: { ...radix, ...radixButton },
})

describe.each(suites)(
  "AlertDialog (%s)",
  (
    _base,
    {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
      Button,
    }
  ) => {
    function ConfirmDelete({ onConfirm }: { onConfirm?: () => void }) {
      return (
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            Delete project
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this project?</AlertDialogTitle>
              <AlertDialogDescription>All files will be removed.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={onConfirm}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }

    async function openAlert(onConfirm?: () => void) {
      const user = userEvent.setup()
      render(<ConfirmDelete onConfirm={onConfirm} />)
      const trigger = screen.getByRole("button", { name: "Delete project" })
      await user.click(trigger)
      const dialog = await screen.findByRole("alertdialog")
      return { user, trigger, dialog }
    }

    it("opens an alertdialog named by its title and described by its description", async () => {
      const { dialog } = await openAlert()

      expect(dialog).toHaveAccessibleName("Delete this project?")
      expect(dialog).toHaveAccessibleDescription("All files will be removed.")
    })

    it("moves focus into the alertdialog", async () => {
      const { dialog } = await openAlert()

      await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement))
    })

    it("closes from Cancel without confirming", async () => {
      const onConfirm = vi.fn()
      const { user } = await openAlert(onConfirm)

      await user.click(screen.getByRole("button", { name: "Cancel" }))

      await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument())
      expect(onConfirm).not.toHaveBeenCalled()
    })

    it("confirms and closes from Action", async () => {
      const onConfirm = vi.fn()
      const { user } = await openAlert(onConfirm)

      await user.click(screen.getByRole("button", { name: "Delete" }))

      await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument())
      expect(onConfirm).toHaveBeenCalledTimes(1)
    })

    it("closes on Escape and returns focus to the trigger", async () => {
      const { user, trigger } = await openAlert()

      await user.keyboard("{Escape}")

      await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument())
      await waitFor(() => expect(trigger).toHaveFocus())
    })

    it("stays open on an outside press", async () => {
      const { user } = await openAlert()
      const overlay = document.querySelector('[data-slot="alert-dialog-overlay"]')
      if (!(overlay instanceof HTMLElement)) throw new Error("AlertDialog overlay is not rendered")

      await user.click(overlay)

      expect(screen.getByRole("alertdialog")).toBeInTheDocument()
    })

    it("has no accessibility violations when open", async () => {
      await openAlert()

      await expectNoAxeViolations(document.body)
    })
  }
)
