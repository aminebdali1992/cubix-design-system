"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/cubix/alert";
import { Button } from "@/components/cubix/button";

export function DismissibleAlertDemo() {
  const [open, setOpen] = React.useState(true);

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Show alert again
      </Button>
    );
  }

  return (
    <Alert className="w-full max-w-md">
      <AlertTitle>Saved successfully</AlertTitle>
      <AlertDescription>
        Your changes have been saved to the server.
      </AlertDescription>
      <AlertAction>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Dismiss"
          onClick={() => setOpen(false)}
        >
          <XIcon />
        </Button>
      </AlertAction>
    </Alert>
  );
}
