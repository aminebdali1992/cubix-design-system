import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"

import * as aria from "@/components/cubix/aria/tabs"
import * as base from "@/components/cubix/base/tabs"
import * as radix from "@/components/cubix/radix/tabs"
import { expectNoAxeViolations } from "@/tests/utils/axe"
import { byBase } from "@/tests/utils/bases"

describe.each(byBase({ base, aria, radix }))(
  "Tabs (%s)",
  (_base, { Tabs, TabsContent, TabsList, TabsTrigger }) => {
    function Settings(props: { dir?: "ltr" | "rtl"; onValueChange?: (value: string) => void }) {
      return (
        <Tabs defaultValue="account" {...props}>
          <TabsList aria-label="Settings">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team" disabled>
              Team
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account panel</TabsContent>
          <TabsContent value="billing">Billing panel</TabsContent>
          <TabsContent value="team">Team panel</TabsContent>
        </Tabs>
      )
    }

    it("links the selected tab to its panel", () => {
      render(<Settings dir="ltr" />)

      expect(screen.getByRole("tablist", { name: "Settings" })).toBeInTheDocument()
      expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true")
      expect(screen.getByRole("tabpanel", { name: "Account" })).toHaveTextContent("Account panel")
      expect(screen.queryByText("Billing panel")).not.toBeInTheDocument()
    })

    it("selects a tab on click and reports the value", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<Settings dir="ltr" onValueChange={onValueChange} />)

      await user.click(screen.getByRole("tab", { name: "Billing" }))

      expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute("aria-selected", "true")
      expect(screen.getByRole("tabpanel", { name: "Billing" })).toHaveTextContent("Billing panel")
      expect(onValueChange.mock.lastCall?.[0]).toBe("billing")
    })

    it("moves and activates with ArrowRight in ltr", async () => {
      const user = userEvent.setup()
      render(<Settings dir="ltr" />)

      await user.tab()
      expect(screen.getByRole("tab", { name: "Account" })).toHaveFocus()
      await user.keyboard("{ArrowRight}")

      const billing = screen.getByRole("tab", { name: "Billing" })
      expect(billing).toHaveFocus()
      expect(billing).toHaveAttribute("aria-selected", "true")
    })

    it("moves with ArrowLeft in rtl", async () => {
      const user = userEvent.setup()
      render(<Settings dir="rtl" />)

      await user.tab()
      await user.keyboard("{ArrowLeft}")

      expect(screen.getByRole("tab", { name: "Billing" })).toHaveFocus()
    })

    it("skips a disabled tab", async () => {
      const user = userEvent.setup()
      render(<Settings dir="ltr" />)

      await user.click(screen.getByRole("tab", { name: "Team" }))

      expect(screen.getByRole("tab", { name: "Team" })).not.toHaveAttribute("aria-selected", "true")
      expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("aria-selected", "true")
    })

    it("removes the focused tab with Delete and keeps focus in the list", async () => {
      const user = userEvent.setup()

      function Removable() {
        const [tabs, setTabs] = useState(["one", "two", "three"])
        const [value, setValue] = useState("one")
        return (
          <Tabs dir="ltr" value={value} onValueChange={(next: string) => setValue(next)}>
            <TabsList aria-label="Files">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  onRemove={() => setTabs((current) => current.filter((item) => item !== tab))}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )
      }

      render(<Removable />)
      await user.tab()
      expect(screen.getByRole("tab", { name: "one" })).toHaveFocus()
      await user.keyboard("{Delete}")

      expect(screen.queryByRole("tab", { name: "one" })).not.toBeInTheDocument()
      expect(screen.getByRole("tab", { name: "two" })).toHaveFocus()
    })

    it("has no accessibility violations", async () => {
      const { container } = render(<Settings dir="ltr" />)

      await expectNoAxeViolations(container)
    })
  }
)
