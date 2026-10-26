"use client"

import * as React from "react"
import { PlusIcon, Trash2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { EmailField, EmailFieldError, EmailFieldInput, EmailFieldLabel } from "./email-field"
import { TextField, TextFieldError, TextFieldInput, TextFieldLabel } from "./text-field"

/*
  Cubix Single Value Field Array - React Aria version. A form fragment for
  repeated single values: one TextField (or EmailField) per row, a remove Button per row and
  an add Button under the rows. Controlled with a string[] value, so it works
  with any form state. The API is identical across Base UI, Radix and React Aria.
*/

type ButtonProps = React.ComponentProps<typeof Button>

type SingleValueFieldArrayProps = {
  /** Current row values. */
  value: string[]
  /** Called with the next row values after typing, adding, removing or pasting. */
  onValueChange: (value: string[]) => void
  placeholder?: string
  /** Label of the add button. */
  addLabel: React.ReactNode
  /** Accessible label of each remove button. */
  removeLabel?: string
  /** Per-row error messages, by index. An error marks the row input invalid. */
  errors?: (React.ReactNode | undefined)[]
  disabled?: boolean
  /** Splits pasted text into several rows, e.g. /[\s,]+/. */
  pasteSeparator?: RegExp
  /** Remove buttons are disabled while the row count is at or below this number. */
  minimumRows?: number
  /** "email" renders EmailField rows; "text" renders TextField rows. */
  fieldType?: "text" | "email"
  /** Field height: default 40px, lg 48px. The remove button follows it. */
  fieldSize?: "default" | "lg"
  /** Native type of text rows, e.g. url. Kept for compatibility; inputType="email" maps to fieldType="email". */
  inputType?: React.HTMLInputTypeAttribute
  /** Accessible name of each row field (visually hidden label). */
  rowLabel?: (index: number) => string
  inputAutoComplete?: string
  className?: string
  rowsClassName?: string
  rowClassName?: string
  inputClassName?: string
  addButtonClassName?: string
  addButtonVariant?: ButtonProps["variant"]
  addButtonSize?: ButtonProps["size"]
  removeButtonClassName?: string
  removeButtonVariant?: ButtonProps["variant"]
  /** Defaults to icon (40px) for fieldSize default and icon-lg (48px) for lg. */
  removeButtonSize?: ButtonProps["size"]
}

const defaultRowLabel = (index: number) =>
  `\u0645\u0642\u062f\u0627\u0631 ${(index + 1).toLocaleString("fa-IR")}`

let rowSeed = 0
const nextRowId = () => `row-${++rowSeed}`

function SingleValueFieldArray({
  value,
  onValueChange,
  placeholder,
  addLabel,
  removeLabel = "\u062d\u0630\u0641 \u0631\u062f\u06cc\u0641",
  errors,
  disabled = false,
  pasteSeparator,
  minimumRows = 0,
  fieldType: fieldTypeProp,
  fieldSize = "default",
  inputType = "text",
  rowLabel = defaultRowLabel,
  inputAutoComplete,
  className,
  rowsClassName,
  rowClassName,
  inputClassName,
  addButtonClassName,
  addButtonVariant = "outline",
  addButtonSize = "sm",
  removeButtonClassName,
  removeButtonVariant = "outline",
  removeButtonSize: removeButtonSizeProp,
}: SingleValueFieldArrayProps) {
  // Stable keys per row so focus and caret survive inserts and removals.
  const idsRef = React.useRef<string[]>([])
  while (idsRef.current.length < value.length) idsRef.current.push(nextRowId())
  if (idsRef.current.length > value.length) idsRef.current = idsRef.current.slice(0, value.length)
  const ids = idsRef.current

  const disableRemove = disabled || value.length <= minimumRows
  const fieldType = fieldTypeProp ?? (inputType === "email" ? "email" : "text")
  const removeButtonSize = removeButtonSizeProp ?? (fieldSize === "lg" ? "icon-lg" : "icon")

  const update = (index: number, next: string) => {
    onValueChange(value.map((v, i) => (i === index ? next : v)))
  }

  const remove = (index: number) => {
    idsRef.current = ids.filter((_, i) => i !== index)
    onValueChange(value.filter((_, i) => i !== index))
  }

  const append = () => {
    idsRef.current = [...ids, nextRowId()]
    onValueChange([...value, ""])
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    if (!pasteSeparator) return
    const values = event.clipboardData
      .getData("text")
      .split(pasteSeparator)
      .map((v) => v.trim())
      .filter(Boolean)
    if (values.length <= 1) return
    event.preventDefault()
    const added = values.slice(1)
    idsRef.current = [...ids.slice(0, index + 1), ...added.map(nextRowId), ...ids.slice(index + 1)]
    onValueChange([...value.slice(0, index), values[0], ...added, ...value.slice(index + 1)])
  }

  return (
    <div data-slot="single-value-field-array" className={cn("flex flex-col gap-2", className)}>
      {value.length > 0 && (
        <div data-slot="single-value-field-array-rows" className={cn("flex flex-col gap-2", rowsClassName)}>
          {value.map((rowValue, index) => {
            const error = errors?.[index]
            return (
              <div
                key={ids[index]}
                data-slot="single-value-field-array-row"
                className={cn("flex items-start gap-2", rowClassName)}
              >
                {fieldType === "email" ? (
                  <EmailField
                    size={fieldSize}
                    invalid={Boolean(error)}
                    disabled={disabled}
                    value={rowValue}
                    onChange={(next: string) => update(index, next)}
                    className="min-w-0 flex-1 gap-1"
                  >
                    <EmailFieldLabel className="sr-only">{rowLabel(index)}</EmailFieldLabel>
                    <EmailFieldInput
                      placeholder={placeholder}
                      autoComplete={inputAutoComplete}
                      onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => handlePaste(event, index)}
                      className={inputClassName}
                    />
                    {error ? <EmailFieldError>{error}</EmailFieldError> : null}
                  </EmailField>
                ) : (
                  <TextField
                    size={fieldSize}
                    invalid={Boolean(error)}
                    disabled={disabled}
                    value={rowValue}
                    onChange={(next: string) => update(index, next)}
                    className="min-w-0 flex-1 gap-1"
                  >
                    <TextFieldLabel className="sr-only">{rowLabel(index)}</TextFieldLabel>
                    <TextFieldInput
                      type={inputType}
                      placeholder={placeholder}
                      autoComplete={inputAutoComplete}
                      onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => handlePaste(event, index)}
                      className={inputClassName}
                    />
                    {error ? <TextFieldError>{error}</TextFieldError> : null}
                  </TextField>
                )}
                <Button
                  type="button"
                  variant={removeButtonVariant}
                  size={removeButtonSize}
                  aria-label={removeLabel}
                  disabled={disableRemove}
                  onClick={() => remove(index)}
                  className={cn("shrink-0 disabled:opacity-100 disabled:text-muted-foreground", removeButtonClassName)}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            )
          })}
        </div>
      )}

      <div className="flex items-center">
        <Button
          type="button"
          variant={addButtonVariant}
          size={addButtonSize}
          disabled={disabled}
          onClick={append}
          className={addButtonClassName}
        >
          <PlusIcon data-icon="inline-start" />
          {addLabel}
        </Button>
      </div>
    </div>
  )
}

export { SingleValueFieldArray }
export type { SingleValueFieldArrayProps }
