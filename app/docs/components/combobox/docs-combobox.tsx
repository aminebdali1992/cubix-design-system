"use client"

import { useRef, type ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaCombobox from "@/components/cubix/aria/combobox"
import * as BaseCombobox from "@/components/cubix/base/combobox"
import * as RadixCombobox from "@/components/cubix/radix/combobox"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

/*
  The demos use the Base UI API. The Radix and React Aria parts take the same
  part names and props, so their props are passed through with a cast where
  the Base UI types (render props, state callbacks) are wider than what those
  wrappers read.
*/

function useComboboxBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Combobox<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
>(props: BaseCombobox.ComboboxProps<Value, Multiple, Item>) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.Combobox<Value, Multiple, Item>
        {...(props as unknown as RadixCombobox.ComboboxProps<
          Value,
          Multiple,
          Item
        >)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.Combobox<Value, Multiple, Item>
        {...(props as unknown as AriaCombobox.ComboboxProps<
          Value,
          Multiple,
          Item
        >)}
      />
    )
  }
  return <BaseCombobox.Combobox<Value, Multiple, Item> {...props} />
}

function ComboboxInput(
  props: ComponentProps<typeof BaseCombobox.ComboboxInput>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxInput
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxInput>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxInput
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxInput>)}
      />
    )
  }
  return <BaseCombobox.ComboboxInput {...props} />
}

function ComboboxTrigger(
  props: ComponentProps<typeof BaseCombobox.ComboboxTrigger>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxTrigger
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxTrigger>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxTrigger
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxTrigger>)}
      />
    )
  }
  return <BaseCombobox.ComboboxTrigger {...props} />
}

/* The React Aria root looks for a standalone trigger by this name. */
ComboboxTrigger.displayName = "ComboboxTrigger"

function ComboboxValue(
  props: ComponentProps<typeof BaseCombobox.ComboboxValue>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxValue
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxValue>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxValue
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxValue>)}
      />
    )
  }
  return <BaseCombobox.ComboboxValue {...props} />
}

function ComboboxContent(
  props: ComponentProps<typeof BaseCombobox.ComboboxContent>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxContent
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxContent>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxContent
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxContent>)}
      />
    )
  }
  return <BaseCombobox.ComboboxContent {...props} />
}

function ComboboxEmpty(
  props: ComponentProps<typeof BaseCombobox.ComboboxEmpty>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxEmpty
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxEmpty>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxEmpty
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxEmpty>)}
      />
    )
  }
  return <BaseCombobox.ComboboxEmpty {...props} />
}

function ComboboxList(props: ComponentProps<typeof BaseCombobox.ComboboxList>) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxList
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxList>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxList
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxList>)}
      />
    )
  }
  return <BaseCombobox.ComboboxList {...props} />
}

function ComboboxItem(props: ComponentProps<typeof BaseCombobox.ComboboxItem>) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxItem
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxItem>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxItem
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxItem>)}
      />
    )
  }
  return <BaseCombobox.ComboboxItem {...props} />
}

function ComboboxGroup(
  props: ComponentProps<typeof BaseCombobox.ComboboxGroup>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxGroup
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxGroup>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxGroup
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxGroup>)}
      />
    )
  }
  return <BaseCombobox.ComboboxGroup {...props} />
}

function ComboboxLabel(
  props: ComponentProps<typeof BaseCombobox.ComboboxLabel>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxLabel
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxLabel>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxLabel
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxLabel>)}
      />
    )
  }
  return <BaseCombobox.ComboboxLabel {...props} />
}

function ComboboxCollection(
  props: ComponentProps<typeof BaseCombobox.ComboboxCollection>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxCollection
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxCollection>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxCollection
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxCollection>)}
      />
    )
  }
  return <BaseCombobox.ComboboxCollection {...props} />
}

function ComboboxSeparator(
  props: ComponentProps<typeof BaseCombobox.ComboboxSeparator>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxSeparator
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxSeparator>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxSeparator
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxSeparator>)}
      />
    )
  }
  return <BaseCombobox.ComboboxSeparator {...props} />
}

function ComboboxChips(
  props: ComponentProps<typeof BaseCombobox.ComboboxChips>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxChips
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxChips>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxChips
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxChips>)}
      />
    )
  }
  return <BaseCombobox.ComboboxChips {...props} />
}

function ComboboxChip(props: ComponentProps<typeof BaseCombobox.ComboboxChip>) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxChip
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxChip>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxChip
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxChip>)}
      />
    )
  }
  return <BaseCombobox.ComboboxChip {...props} />
}

function ComboboxChipsInput(
  props: ComponentProps<typeof BaseCombobox.ComboboxChipsInput>
) {
  const base = useComboboxBase()
  if (base === "radix") {
    return (
      <RadixCombobox.ComboboxChipsInput
        {...(props as unknown as ComponentProps<typeof RadixCombobox.ComboboxChipsInput>)}
      />
    )
  }
  if (base === "aria") {
    return (
      <AriaCombobox.ComboboxChipsInput
        {...(props as unknown as ComponentProps<typeof AriaCombobox.ComboboxChipsInput>)}
      />
    )
  }
  return <BaseCombobox.ComboboxChipsInput {...props} />
}

function useComboboxAnchor() {
  return useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
}
