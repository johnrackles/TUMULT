"use client";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Button, type ButtonProps } from "./ui/button";

export function SigninButton({
  variant,
  className,
}: {
  className?: string;
  variant?: ButtonProps["variant"];
}) {
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
      Login
    </Button>
  );
}
