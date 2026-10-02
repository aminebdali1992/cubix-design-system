"use client"

import {
  CreditCard,
  CreditCardControl,
  CreditCardDescription,
  CreditCardGroup1,
  CreditCardGroup2,
  CreditCardGroup3,
  CreditCardGroup4,
  CreditCardLabel,
  CreditCardSeparator,
} from "../docs-credit-card"

export function CreditCardCustomDemo() {
  return (
    <CreditCard className="w-full max-w-sm">
      <CreditCardLabel>شماره کارت</CreditCardLabel>
      <CreditCardControl>
        <CreditCardGroup1 className="border-border bg-muted dark:bg-muted" />
        <CreditCardSeparator />
        <CreditCardGroup2 className="border-border bg-muted dark:bg-muted" />
        <CreditCardSeparator />
        <CreditCardGroup3 className="border-border bg-muted dark:bg-muted" />
        <CreditCardSeparator />
        <CreditCardGroup4 className="border-border bg-muted dark:bg-muted" />
      </CreditCardControl>
      <CreditCardDescription>با className می‌توانید ظاهر را سفارشی کنید.</CreditCardDescription>
    </CreditCard>
  )
}
