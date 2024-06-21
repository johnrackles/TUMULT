"use client";
import { signOut } from "next-auth/react";
import { type ReactNode } from "react";
import { Tooltip } from "./Tooltip";
import { Button, type ButtonProps } from "./ui/button";

type Props = {
  className?: string;
  children: ReactNode;
  variant?: ButtonProps["variant"];
};

export function SignoutButton({ className, children, variant }: Props) {
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
