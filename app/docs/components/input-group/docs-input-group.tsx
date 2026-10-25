"use client"

/*
  Docs-only adapter: renders the Base UI, Radix or React Aria input group
  depending on the docs URL. Example sources import from here and are
  rewritten to "@/components/cubix/input-group" in the copyable code.
*/
import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaInputGroup from "@/components/cubix/aria/input-group"
import * as BaseInputGroup from "@/components/cubix/base/input-group"
import * as RadixInputGroup from "@/components/cubix/radix/input-group"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function useInputGroupBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

type InputGroupProps = ComponentProps<typeof BaseInputGroup.InputGroup>
type AddonProps = ComponentProps<typeof BaseInputGroup.InputGroupAddon>
type ButtonProps = ComponentProps<typeof BaseInputGroup.InputGroupButton>
type TextProps = ComponentProps<typeof BaseInputGroup.InputGroupText>
type InputProps = ComponentProps<typeof BaseInputGroup.InputGroupInput>
type TextareaProps = ComponentProps<typeof BaseInputGroup.InputGroupTextarea>

function InputGroup(props: InputGroupProps) {
  const base = useInputGroupBase()
  if (base === "radix") return <RadixInputGroup.InputGroup {...props} />
  if (base === "aria") {
    return (
      <AriaInputGroup.InputGroup
        {...(props as unknown as ComponentProps<typeof AriaInputGroup.InputGroup>)}
      />
    )
  }
  return <BaseInputGroup.InputGroup {...props} />
}

function InputGroupAddon(props: AddonProps) {
  const base = useInputGroupBase()
  if (base === "radix") return <RadixInputGroup.InputGroupAddon {...props} />
  if (base === "aria") return <AriaInputGroup.InputGroupAddon {...props} />
  return <BaseInputGroup.InputGroupAddon {...props} />
}

function InputGroupButton({ onClick, ...props }: ButtonProps) {
  const base = useInputGroupBase()
  if (base === "radix") {
    return (
      <RadixInputGroup.InputGroupButton
        onClick={onClick}
        {...(props as ComponentProps<typeof RadixInputGroup.InputGroupButton>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaInputGroup.InputGroupButton
        onPress={
          onClick
            ? () => onClick({} as Parameters<NonNullable<typeof onClick>>[0])
            : undefined
        }
        {...(props as unknown as ComponentProps<typeof AriaInputGroup.InputGroupButton>)}
      />
    )
  }
  return <BaseInputGroup.InputGroupButton onClick={onClick} {...props} />
}

function InputGroupText(props: TextProps) {
  const base = useInputGroupBase()
  if (base === "radix") return <RadixInputGroup.InputGroupText {...props} />
  if (base === "aria") return <AriaInputGroup.InputGroupText {...props} />
  return <BaseInputGroup.InputGroupText {...props} />
}

function InputGroupInput(props: InputProps) {
  const base = useInputGroupBase()
  if (base === "radix") return <RadixInputGroup.InputGroupInput {...props} />
  if (base === "aria") {
    return (
      <AriaInputGroup.InputGroupInput
        {...(props as unknown as ComponentProps<typeof AriaInputGroup.InputGroupInput>)}
      />
    )
  }
  return <BaseInputGroup.InputGroupInput {...props} />
}

function InputGroupTextarea(props: TextareaProps) {
  const base = useInputGroupBase()
  if (base === "radix") return <RadixInputGroup.InputGroupTextarea {...props} />
  if (base === "aria") {
    return (
      <AriaInputGroup.InputGroupTextarea
        {...(props as unknown as ComponentProps<typeof AriaInputGroup.InputGroupTextarea>)}
      />
    )
  }
  return <BaseInputGroup.InputGroupTextarea {...props} />
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}