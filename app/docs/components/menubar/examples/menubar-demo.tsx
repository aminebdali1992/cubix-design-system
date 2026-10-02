"use client"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../docs-menubar"

export function MenubarDemo() {
  return (
    <Menubar dir="rtl" lang="fa">
      <MenubarMenu>
        <MenubarTrigger>پرونده</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>زبانه جدید</MenubarItem>
          <MenubarItem>پنجره جدید</MenubarItem>
          <MenubarItem disabled>پنجره ناشناس</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>اشتراک‌گذاری</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>لینک ایمیل</MenubarItem>
              <MenubarItem>پیام‌ها</MenubarItem>
              <MenubarItem>یادداشت‌ها</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>چاپ</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>ویرایش</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>واگرد</MenubarItem>
          <MenubarItem>بازگردانی</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>یافتن</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>جستجو در وب</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>یافتن</MenubarItem>
              <MenubarItem>یافتن بعدی</MenubarItem>
              <MenubarItem>یافتن قبلی</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>برش</MenubarItem>
          <MenubarItem>کپی</MenubarItem>
          <MenubarItem>جای‌گذاری</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>نمایش</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>نوار ابزار</MenubarCheckboxItem>
          <MenubarCheckboxItem defaultChecked>نوار وضعیت</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>بارگذاری مجدد</MenubarItem>
          <MenubarItem disabled>بارگذاری اجباری</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>تمام‌صفحه</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>پنهان کردن نوار کناری</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>پروفایل‌ها</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup defaultValue="sara">
            <MenubarRadioItem value="amin">امین</MenubarRadioItem>
            <MenubarRadioItem value="sara">سارا</MenubarRadioItem>
            <MenubarRadioItem value="reza">رضا</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem>ویرایش</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>افزودن پروفایل</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
