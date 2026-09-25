"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/components/cubix/button-group"
import { cn } from "@/lib/utils"

type BranchContextValue = {
  currentBranch: number
  totalBranches: number
  goToPrevious: () => void
  goToNext: () => void
  setTotalBranches: (total: number) => void
}

const BranchContext = React.createContext<BranchContextValue | null>(null)

function useBranch() {
  const context = React.useContext(BranchContext)
  if (!context) {
    throw new Error("Branch parts must be used within Branch.")
  }
  return context
}

export type BranchProps = React.ComponentProps<"div"> & {
  branch?: number
  defaultBranch?: number
  onBranchChange?: (branchIndex: number) => void
}

function Branch({
  className,
  branch,
  defaultBranch = 0,
  onBranchChange,
  children,
  ...props
}: BranchProps) {
  const [uncontrolledBranch, setUncontrolledBranch] =
    React.useState(defaultBranch)
  const [totalBranches, setTotalBranches] = React.useState(0)
  const isControlled = branch !== undefined
  const currentBranch = isControlled ? branch : uncontrolledBranch

  const handleBranchChange = React.useCallback(
    (next: number) => {
      if (!isControlled) {
        setUncontrolledBranch(next)
      }
      onBranchChange?.(next)
    },
    [isControlled, onBranchChange]
  )

  React.useEffect(() => {
    if (totalBranches <= 0) {
      return
    }
    if (currentBranch > totalBranches - 1) {
      handleBranchChange(Math.max(totalBranches - 1, 0))
    }
  }, [currentBranch, totalBranches, handleBranchChange])

  const goToPrevious = React.useCallback(() => {
    if (totalBranches <= 0) {
      return
    }
    const next =
      currentBranch > 0 ? currentBranch - 1 : totalBranches - 1
    handleBranchChange(next)
  }, [currentBranch, totalBranches, handleBranchChange])

  const goToNext = React.useCallback(() => {
    if (totalBranches <= 0) {
      return
    }
    const next =
      currentBranch < totalBranches - 1 ? currentBranch + 1 : 0
    handleBranchChange(next)
  }, [currentBranch, totalBranches, handleBranchChange])

  const contextValue = React.useMemo(
    () => ({
      currentBranch,
      totalBranches,
      goToPrevious,
      goToNext,
      setTotalBranches,
    }),
    [currentBranch, totalBranches, goToPrevious, goToNext]
  )

  return (
    <BranchContext.Provider value={contextValue}>
      <div
        data-slot="branch"
        className={cn(
          "not-prose group/branch flex w-full flex-col gap-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </BranchContext.Provider>
  )
}

export type BranchContentProps = React.ComponentProps<"div">

function BranchContent({
  className,
  children,
  ...props
}: BranchContentProps) {
  const { currentBranch, setTotalBranches } = useBranch()
  const items = React.Children.toArray(children).filter(React.isValidElement)

  React.useLayoutEffect(() => {
    setTotalBranches(items.length)
  }, [items.length, setTotalBranches])

  return (
    <div
      data-slot="branch-content"
      className={cn("relative w-full", className)}
      {...props}
    >
      {items.map((child, index) => (
        <div
          key={child.key ?? index}
          data-slot="branch-item"
          data-active={index === currentBranch ? "true" : undefined}
          hidden={index !== currentBranch}
          className={cn(
            "w-full outline-none",
            index === currentBranch ? "block" : "hidden"
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export type BranchSelectorProps = React.ComponentProps<typeof ButtonGroup> & {
  force?: boolean
}

function BranchSelector({
  className,
  force = false,
  children,
  ...props
}: BranchSelectorProps) {
  const { totalBranches } = useBranch()

  if (!force && totalBranches <= 1) {
    return null
  }

  return (
    <ButtonGroup
      data-slot="branch-selector"
      orientation="horizontal"
      aria-label="Reply branches"
      className={cn(
        "h-8 items-center overflow-hidden rounded-lg border bg-muted/40 p-0.5 shadow-none",
        "*:data-slot:rounded-md! *:data-slot:border-0 *:data-slot:shadow-none",
        "[&>[data-slot]~[data-slot]]:border-s-0",
        className
      )}
      {...props}
    >
      {children}
    </ButtonGroup>
  )
}

export type BranchPreviousProps = React.ComponentProps<typeof Button>

function BranchPrevious({
  className,
  children,
  onClick,
  ...props
}: BranchPreviousProps) {
  const { goToPrevious, totalBranches } = useBranch()

  return (
    <Button
      type="button"
      data-slot="branch-previous"
      variant="ghost"
      size="icon-xs"
      aria-label="Previous branch"
      disabled={totalBranches <= 1}
      className={cn(
        "text-muted-foreground hover:bg-background hover:text-foreground disabled:opacity-40",
        className
      )}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          goToPrevious()
        }
      }}
    >
      {children ?? <ChevronLeftIcon className="size-3.5 rtl:rotate-180" />}
    </Button>
  )
}

export type BranchNextProps = React.ComponentProps<typeof Button>

function BranchNext({
  className,
  children,
  onClick,
  ...props
}: BranchNextProps) {
  const { goToNext, totalBranches } = useBranch()

  return (
    <Button
      type="button"
      data-slot="branch-next"
      variant="ghost"
      size="icon-xs"
      aria-label="Next branch"
      disabled={totalBranches <= 1}
      className={cn(
        "text-muted-foreground hover:bg-background hover:text-foreground disabled:opacity-40",
        className
      )}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          goToNext()
        }
      }}
    >
      {children ?? <ChevronRightIcon className="size-3.5 rtl:rotate-180" />}
    </Button>
  )
}

export type BranchPageProps = React.ComponentProps<typeof ButtonGroupText>

function BranchPage({ className, children, ...props }: BranchPageProps) {
  const { currentBranch, totalBranches } = useBranch()
  const current = Math.min(currentBranch + 1, Math.max(totalBranches, 1))
  const total = Math.max(totalBranches, 1)

  return (
    <ButtonGroupText
      data-slot="branch-page"
      role="status"
      aria-atomic="true"
      className={cn(
        "min-w-14 justify-center border-0 bg-transparent px-1.5 text-caption font-medium tabular-nums text-muted-foreground shadow-none",
        className
      )}
      {...props}
    >
      {children ?? (
        <span dir="ltr">
          {current}
          <span className="mx-0.5 text-muted-foreground/70">/</span>
          {total}
        </span>
      )}
    </ButtonGroupText>
  )
}

export {
  Branch,
  BranchContent,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
  useBranch,
}
