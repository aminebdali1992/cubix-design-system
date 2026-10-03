"use client"

import * as React from "react"

type TextDirection = "ltr" | "rtl"

type DirectionContextValue = {
  dir: TextDirection
}

const DirectionContext = React.createContext<DirectionContextValue>({
  dir: "ltr",
})

function DirectionProvider({
  dir = "ltr",
  direction,
  children,
}: {
  dir?: TextDirection
  direction?: TextDirection
  children?: React.ReactNode
}) {
  const value = React.useMemo(
    () => ({ dir: direction ?? dir }),
    [direction, dir]
  )

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  )
}

function useDirection() {
  return React.useContext(DirectionContext).dir
}

export { DirectionProvider, useDirection }
