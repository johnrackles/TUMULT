"use client";
import { signOut } from "next-auth/react";
import { Tooltip } from "./Tooltip";
import { Button, type ButtonProps } from "./ui/button";

export function SignoutButton({ children, className, variant }: ButtonProps) {
  return (
    <Tooltip text="Sign Out">
      <Button
        variant={variant}
        className={className}
        onClick={() => {
          void signOut({ callbackUrl: "/" });
        }}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
