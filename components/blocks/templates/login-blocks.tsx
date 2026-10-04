import type { BlockListItem } from "@/components/blocks/block-list"
import { Login01, login01Files } from "@/components/blocks/templates/login-01"
import { Login02, login02Files } from "@/components/blocks/templates/login-02"
import { Login03, login03Files } from "@/components/blocks/templates/login-03"
import { Login04, login04Files } from "@/components/blocks/templates/login-04"
import { Login05, login05Files } from "@/components/blocks/templates/login-05"

export const loginBlocks: BlockListItem[] = [
  {
    id: "login-01",
    title: "Split login with media panel",
    description:
      "Social and email sign-in, password visibility toggle, remember me, and a placeholder media panel. Posts to /api/auth/login.",
    files: login01Files,
    preview: <Login01 />,
  },
  {
    id: "login-02",
    title: "Centered card with sign-in method tabs",
    description:
      "Phone number with a one-time code or email and password, switched with tabs inside a single card. Posts to /api/auth/otp or /api/auth/login.",
    files: login02Files,
    preview: <Login02 />,
  },
  {
    id: "login-03",
    title: "Social-first login with site header",
    description:
      "Full-width Google and GitHub buttons, passwordless email link, a site header with sign-up, and terms footer. Posts to /api/auth/login.",
    files: login03Files,
    preview: <Login03 />,
  },
  {
    id: "login-04",
    title: "Card with cover image",
    description:
      "Centered card with a full-bleed cover image, email and password, remember me, and a sign-up link. Posts to /api/auth/login.",
    files: login04Files,
    preview: <Login04 />,
  },
  {
    id: "login-05",
    title: "Two-step login with account confirmation",
    description:
      "Email first, then password for the confirmed account with a change option, remember me, and footer links. Posts to /api/auth/login.",
    files: login05Files,
    preview: <Login05 />,
  },
]
