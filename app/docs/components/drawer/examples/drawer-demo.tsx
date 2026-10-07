"use client"

import { Button } from "@/components/cubix/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../docs-drawer"

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" size="sm" />}>
        باز کردن
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>کاملاً مطمئن هستید؟</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 text-description text-muted-foreground">
          پس از تأیید، تغییرات اعمال می‌شود.
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>انصراف</DrawerClose>
          <Button type="submit">تأیید</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
