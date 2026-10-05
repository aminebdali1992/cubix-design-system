"use client";

import * as React from "react";

import { Button } from "@/components/cubix/button";
import { Kbd, KbdGroup } from "@/components/cubix/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/cubix/tooltip";

type IconActionProps = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  shortcut?: readonly string[];
  side?: "top" | "bottom" | "left" | "right";
};

export function IconAction({
  label,
  icon,
  onClick,
  disabled,
  shortcut,
  side = "bottom",
}: IconActionProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
          />
        }
      >
        {icon}
      </TooltipTrigger>
      <TooltipContent side={side}>
        {label}
        {shortcut ? (
          <KbdGroup>
            {shortcut.map((key) => (
              <Kbd key={key}>{key}</Kbd>
            ))}
          </KbdGroup>
        ) : null}
      </TooltipContent>
    </Tooltip>
  );
}
