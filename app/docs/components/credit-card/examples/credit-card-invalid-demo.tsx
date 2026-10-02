"use client"

import {
  CreditCard,
  CreditCardControl,
  CreditCardError,
  CreditCardGroup1,
  CreditCardGroup2,
  CreditCardGroup3,
  CreditCardGroup4,
  CreditCardLabel,
  CreditCardSeparator,
} from "../docs-credit-card"

export function CreditCardInvalidDemo() {
  return (
    <CreditCard className="w-full max-w-sm" invalid>
      <CreditCardLabel>شماره کارت</CreditCardLabel>
      <CreditCardControl>
        <CreditCardGroup1 defaultValue="۶۰۳۷" />
        <CreditCardSeparator />
        <CreditCardGroup2 defaultValue="۹۹۷۷" />
        <CreditCardSeparator />
        <CreditCardGroup3 defaultValue="۱۲۳۴" />
        <CreditCardSeparator />
        <CreditCardGroup4 defaultValue="۰۰" />
      </CreditCardControl>
      <CreditCardError>یک شماره کارت معتبر وارد کنید.</CreditCardError>
    </CreditCard>
  )
}
