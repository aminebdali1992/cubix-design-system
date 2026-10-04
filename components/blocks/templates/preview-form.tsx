"use client"

import type { ComponentProps } from "react"

/* Block previews render inside the docs site, so a submit must not navigate away from it. */
export function PreviewForm(props: Omit<ComponentProps<"form">, "onSubmit">) {
  return <form {...props} onSubmit={(event) => event.preventDefault()} />
}
