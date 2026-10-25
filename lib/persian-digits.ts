import type * as React from "react"

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
const LATIN_DIGIT = /[0-9]/
const SKIP_TYPES = new Set(["email", "url", "password", "number"])

/* Converts Latin digits (0-9) to Persian digits (۰-۹). */
export function toPersianDigits(value: string) {
  return value.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)])
}

function shouldConvert(element: HTMLInputElement | HTMLTextAreaElement) {
  if (element instanceof HTMLInputElement && SKIP_TYPES.has(element.type)) {
    return false
  }
  if (element.dataset.latinDigits !== undefined) return false
  try {
    if (element.matches(":dir(ltr)")) return false
  } catch {
    if (getComputedStyle(element).direction === "ltr") return false
  }
  return true
}

/*
  Windows sends Latin digits from the numpad even with the Persian layout.
  Typed digits in RTL fields are swapped for Persian digits before insert.
  Skipped for email, url, password, number, LTR fields and data-latin-digits.
*/
export function handlePersianDigitsBeforeInput(
  event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const data = (event.nativeEvent as InputEvent).data
  if (!data || !LATIN_DIGIT.test(data)) return
  const element = event.currentTarget
  if (!shouldConvert(element)) return

  event.preventDefault()
  const text = toPersianDigits(data)
  if (document.execCommand("insertText", false, text)) return

  const start = element.selectionStart ?? element.value.length
  const end = element.selectionEnd ?? start
  element.setRangeText(text, start, end, "end")
  element.dispatchEvent(new Event("input", { bubbles: true }))
}