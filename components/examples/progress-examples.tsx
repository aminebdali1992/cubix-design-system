"use client"

import * as React from "react"
import { FileIcon } from "lucide-react"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/app/docs/components/progress/docs-progress"
import { Slider } from "@/app/docs/components/slider/docs-slider"

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} aria-label="Loading" className="w-[60%]" />
}

export function ProgressValuesDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Progress value={0} aria-label="0 percent" />
      <Progress value={25} aria-label="25 percent" />
      <Progress value={50} aria-label="50 percent" />
      <Progress value={75} aria-label="75 percent" />
      <Progress value={100} aria-label="100 percent" />
    </div>
  )
}

export function ProgressLabelDemo() {
  return (
    <Progress value={56} className="w-full max-w-sm">
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}

export function ProgressControlledDemo() {
  const [value, setValue] = React.useState(50)

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value} aria-label="Progress" className="w-full" />
      <Slider
        value={[value]}
        onValueChange={([next]) => setValue(next ?? 0)}
        max={100}
        step={1}
        aria-label="Progress value"
      />
    </div>
  )
}

export function ProgressFileUploadDemo() {
  const files = React.useMemo(
    () => [
      {
        id: "1",
        name: "document.pdf",
        progress: 45,
        timeRemaining: "2m 30s",
      },
      {
        id: "2",
        name: "presentation.pptx",
        progress: 78,
        timeRemaining: "45s",
      },
      {
        id: "3",
        name: "spreadsheet.xlsx",
        progress: 12,
        timeRemaining: "5m 12s",
      },
      {
        id: "4",
        name: "image.jpg",
        progress: 100,
        timeRemaining: "Complete",
      },
    ],
    []
  )

  return (
    <ul className="flex w-full max-w-md flex-col gap-3">
      {files.map((file) => (
        <li
          key={file.id}
          className="flex items-center gap-3 text-sm"
        >
          <FileIcon className="size-5 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate font-medium">
            {file.name}
          </span>
          <Progress
            value={file.progress}
            aria-label={file.name}
            className="w-32 shrink-0"
          />
          <span className="w-16 shrink-0 text-end text-muted-foreground">
            {file.timeRemaining}
          </span>
        </li>
      ))}
    </ul>
  )
}
