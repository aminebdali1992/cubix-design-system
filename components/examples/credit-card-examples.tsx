"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  CreditCard,
  CreditCardControl,
  CreditCardDescription,
  CreditCardError,
  CreditCardGroup1,
  CreditCardGroup2,
  CreditCardGroup3,
  CreditCardGroup4,
  CreditCardLabel,
  CreditCardSeparator,
} from "@/app/docs/components/credit-card/docs-credit-card"

export function CreditCardDemo() {
  return (
    <CreditCard className="w-full max-w-sm">
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
  )
}

export function CreditCardDescriptionDemo() {
  return (
    <CreditCard className="w-full max-w-sm">
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
  )
}

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
      <CreditCardDescription>
        این فیلد فعلاً قابل ویرایش نیست.
      </CreditCardDescription>
    </CreditCard>
  )
}

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

export function CreditCardFilledDemo() {
  return (
    <CreditCard className="w-full max-w-sm">
      <CreditCardLabel>شماره کارت</CreditCardLabel>
      <CreditCardControl>
        <CreditCardGroup1 defaultValue="۶۱۰۴" />
        <CreditCardSeparator />
        <CreditCardGroup2 defaultValue="۳۳۹۹" />
        <CreditCardSeparator />
        <CreditCardGroup3 defaultValue="۱۲۳۴" />
        <CreditCardSeparator />
        <CreditCardGroup4 defaultValue="۵۶۷۸" />
      </CreditCardControl>
      <CreditCardDescription>
        لطفاً شماره کارت را در چهار گروه چهاررقمی وارد کنید.
      </CreditCardDescription>
    </CreditCard>
  )
}

export function CreditCardFormDemo() {
  return (
    <form
      className="grid w-full max-w-sm gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <p className="text-body leading-none font-medium text-foreground">
          پرداخت
        </p>
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
      <CreditCardDescription>
        با className می‌توانید ظاهر را سفارشی کنید.
      </CreditCardDescription>
    </CreditCard>
  )
}
