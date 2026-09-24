"use client"

import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

import * as AriaBreadcrumb from "@/components/cubix/aria/breadcrumb"
import * as BaseBreadcrumb from "@/components/cubix/base/breadcrumb"
import * as RadixBreadcrumb from "@/components/cubix/radix/breadcrumb"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function useBreadcrumbBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Breadcrumb(props: ComponentProps<"nav">) {
  const base = useBreadcrumbBase()
  if (base === "radix") return <RadixBreadcrumb.Breadcrumb {...props} />
  if (base === "aria") return <AriaBreadcrumb.Breadcrumb {...props} />
  return <BaseBreadcrumb.Breadcrumb {...props} />
}

function BreadcrumbList(props: ComponentProps<"ol">) {
  const base = useBreadcrumbBase()
  if (base === "radix") return <RadixBreadcrumb.BreadcrumbList {...props} />
  if (base === "aria") return <AriaBreadcrumb.BreadcrumbList {...props} />
  return <BaseBreadcrumb.BreadcrumbList {...props} />
}

function BreadcrumbItem(props: ComponentProps<"li">) {
  const base = useBreadcrumbBase()
  if (base === "radix") return <RadixBreadcrumb.BreadcrumbItem {...props} />
  if (base === "aria") return <AriaBreadcrumb.BreadcrumbItem {...props} />
  return <BaseBreadcrumb.BreadcrumbItem {...props} />
}

function BreadcrumbLink({
  render,
  className,
  children,
  ...props
}: ComponentProps<"a"> & {
  render?: ReactElement<{ className?: string; children?: ReactNode }>
}) {
  const base = useBreadcrumbBase()

  if (base === "radix") {
    if (isValidElement(render)) {
      return (
        <RadixBreadcrumb.BreadcrumbLink asChild className={className} {...props}>
          {cloneElement(render, undefined, children ?? render.props.children)}
        </RadixBreadcrumb.BreadcrumbLink>
      )
    }
    return (
      <RadixBreadcrumb.BreadcrumbLink className={className} {...props}>
        {children}
      </RadixBreadcrumb.BreadcrumbLink>
    )
  }

  if (base === "aria") {
    return (
      <AriaBreadcrumb.BreadcrumbLink
        className={className}
        render={render}
        {...props}
      >
        {children}
      </AriaBreadcrumb.BreadcrumbLink>
    )
  }

  return (
    <BaseBreadcrumb.BreadcrumbLink
      className={className}
      render={render}
      {...props}
    >
      {children}
    </BaseBreadcrumb.BreadcrumbLink>
  )
}

function BreadcrumbPage(props: ComponentProps<"span">) {
  const base = useBreadcrumbBase()
  if (base === "radix") return <RadixBreadcrumb.BreadcrumbPage {...props} />
  if (base === "aria") return <AriaBreadcrumb.BreadcrumbPage {...props} />
  return <BaseBreadcrumb.BreadcrumbPage {...props} />
}

function BreadcrumbSeparator(props: ComponentProps<"li">) {
  const base = useBreadcrumbBase()
  if (base === "radix") return <RadixBreadcrumb.BreadcrumbSeparator {...props} />
  if (base === "aria") return <AriaBreadcrumb.BreadcrumbSeparator {...props} />
  return <BaseBreadcrumb.BreadcrumbSeparator {...props} />
}

function BreadcrumbEllipsis(props: ComponentProps<"span">) {
  const base = useBreadcrumbBase()
  if (base === "radix") return <RadixBreadcrumb.BreadcrumbEllipsis {...props} />
  if (base === "aria") return <AriaBreadcrumb.BreadcrumbEllipsis {...props} />
  return <BaseBreadcrumb.BreadcrumbEllipsis {...props} />
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
