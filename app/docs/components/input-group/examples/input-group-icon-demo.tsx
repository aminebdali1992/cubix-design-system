"use client"

import {
  InfoCircleIcon,
  MessageIcon,
  SearchIcon,
  StarIcon,
  TickIcon,
  WalletIcon,
} from "@/components/docs/empty-icons"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../docs-input-group"

export function InputGroupIconDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="جستجو" />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="email" placeholder="ایمیل خود را وارد کنید" />
        <InputGroupAddon>
          <MessageIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="شماره کارت" />
        <InputGroupAddon>
          <WalletIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <TickIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="شماره کارت" />
        <InputGroupAddon align="inline-end">
          <StarIcon />
          <InfoCircleIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}