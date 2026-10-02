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

export function CreditCardSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <CreditCard size="default">
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
        <CreditCardDescription>ارتفاع ۴۰ پیکسل</CreditCardDescription>
      </CreditCard>
      <CreditCard size="lg">
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
        <CreditCardDescription>ارتفاع ۴۸ پیکسل</CreditCardDescription>
      </CreditCard>
    </div>
  )
}
