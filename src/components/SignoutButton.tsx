"use client";
import { cn } from "@/lib/utils";
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
        className={cn(
          "ml-auto bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
          className,
        )}
        onClick={() => {
          void signOut();
        }}
        variant={variant}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
