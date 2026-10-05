"use client";

import * as React from "react";

import { Button } from "@/components/cubix/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/cubix/tooltip";

export function ResetDot({ label, onReset }: { label: string; onReset: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={label}
            onClick={onReset}
            className="size-5 rounded-full"
          />
        }
      >
        <span aria-hidden className="size-1.5 rounded-full bg-primary" />
      </TooltipTrigger>
      <TooltipContent side="left">{label}</TooltipContent>
    </Tooltip>
  );
}
