"use client";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { type ReactNode } from "react";
import { Button, type ButtonProps } from "./ui/button";

type Props = {
  className?: string;
  children: ReactNode;
  variant?: ButtonProps["variant"];
};

export function SigninButton({ variant, className, children }: Props) {
  return (
    <Button
      className={cn(
        "ml-auto bg-transparent text-primary hover:bg-primary hover:text-primary-foreground hover:underline",
        className,
      )}
      onClick={() => {
        void signIn("auth0", { callbackUrl: "/admin" });
      }}
      variant={variant}
    >
      {children}
    </Button>
  );
}
