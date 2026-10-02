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

export function CreditCardDisabledDemo() {
  return (
    <CreditCard className="w-full max-w-sm" disabled>
      <CreditCardLabel>شماره کارت</CreditCardLabel>
      <CreditCardControl>
        <CreditCardGroup1 />
        <CreditCardSeparator />
        <CreditCardGroup2 />
        <CreditCardSeparator />
        <CreditCardGroup3 />
        <CreditCardSeparator />
        <CreditCardGroup4 />
      </CreditCardControl>
      <CreditCardDescription>این فیلد فعلاً قابل ویرایش نیست.</CreditCardDescription>
    </CreditCard>
  )
}
