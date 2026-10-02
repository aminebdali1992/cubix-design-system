import {
  Children,
  cloneElement,
  isValidElement,
  type ChangeEvent,
  type ChangeEventHandler,
  type ReactElement,
  type ReactNode,
} from "react"

export const CUBIX_FIELD_INPUT_MARK = "__cubixFieldInput"

type FieldInputValueProps = {
  value?: string | number | readonly string[]
  defaultValue?: string | number | readonly string[]
  onChange?: ChangeEventHandler<HTMLInputElement>
  name?: string
}

type LiftedAriaFieldValue = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name?: string
}

function isMarkedFieldInput(type: unknown): boolean {
  return (
    (typeof type === "function" || (typeof type === "object" && type !== null)) &&
    (type as Record<string, unknown>)[CUBIX_FIELD_INPUT_MARK] === true
  )
}

function toAriaStringValue(
  value: string | number | readonly string[] | undefined
): string | undefined {
  if (value == null) return undefined
  return typeof value === "string" ? value : String(value)
}

function adaptInputOnChange(
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
): ((value: string) => void) | undefined {
  if (!onChange) return undefined
  return (value: string) => {
    const target = { value } as HTMLInputElement
    onChange({
      target,
      currentTarget: target,
    } as ChangeEvent<HTMLInputElement>)
  }
}

/*
  React Aria TextField owns value on the root and always injects a controlled
  value into InputContext. defaultValue on a nested Input is ignored. Walk the
  tree, lift value ownership onto the root, and strip it from the marked input
  so Base / Aria / Radix keep the same composition API.
*/
export function liftAriaFieldInputValue(children: ReactNode): {
  children: ReactNode
  lifted: LiftedAriaFieldValue
} {
  const lifted: LiftedAriaFieldValue = {}
  let captured = false

  const walk = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (!isValidElement(child)) return child

      const element = child as ReactElement<{ children?: ReactNode } & FieldInputValueProps>
      if (isMarkedFieldInput(element.type)) {
        if (!captured) {
          captured = true
          const nextValue = toAriaStringValue(element.props.value)
          const nextDefault = toAriaStringValue(element.props.defaultValue)
          if (element.props.value !== undefined) lifted.value = nextValue
          if (element.props.defaultValue !== undefined) lifted.defaultValue = nextDefault
          if (element.props.name !== undefined) lifted.name = element.props.name
          if (element.props.onChange !== undefined) {
            lifted.onChange = adaptInputOnChange(element.props.onChange)
          }
        }

        const {
          value: _value,
          defaultValue: _defaultValue,
          onChange: _onChange,
          name: _name,
          ...rest
        } = element.props
        return cloneElement(element, rest as never)
      }

      if (element.props.children == null) return child
      return cloneElement(element, {
        ...element.props,
        children: walk(element.props.children),
      } as never)
    })

  return { children: walk(children), lifted }
}

export function markCubixFieldInput<T>(component: T): T {
  Object.defineProperty(component as object, CUBIX_FIELD_INPUT_MARK, {
    value: true,
    enumerable: false,
  })
  return component
}

export function mergeAriaFieldValueProps<T extends Record<string, unknown>>(
  props: T,
  lifted: LiftedAriaFieldValue
): T & LiftedAriaFieldValue {
  return {
    ...props,
    value: (props.value as string | undefined) ?? lifted.value,
    defaultValue: (props.defaultValue as string | undefined) ?? lifted.defaultValue,
    onChange: (props.onChange as ((value: string) => void) | undefined) ?? lifted.onChange,
    name: (props.name as string | undefined) ?? lifted.name,
  }
}
