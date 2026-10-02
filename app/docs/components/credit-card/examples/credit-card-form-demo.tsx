"use client"

import { Button } from "@/app/docs/components/button/docs-button"
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

export function CreditCardFormDemo() {
  return (
    <form
      className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">پرداخت</p>
        <p className="text-caption text-muted-foreground">
          برای ادامه، شماره کارت خود را وارد کنید.
        </p>
      </div>
      <CreditCard name="cardNumber">
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
        <CreditCardDescription>
          لطفاً شماره کارت را در چهار گروه چهاررقمی وارد کنید.
        </CreditCardDescription>
      </CreditCard>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ادامه</Button>
      </div>
    </form>
  )
}
