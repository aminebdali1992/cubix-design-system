/** True when a control is disabled natively or through ARIA, whichever its base renders. */
export function isDisabledControl(element: HTMLElement): boolean {
  return element.matches(":disabled") || element.getAttribute("aria-disabled") === "true"
}
