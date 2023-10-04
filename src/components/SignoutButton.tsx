"use client";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Tooltip } from "./Tooltip";
import { Button } from "./ui/button";

export function SignoutButton({ className }: { className?: string }) {
  return (
    <Tooltip text="Sign Out">
      <Button
        className={cn(
          "bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
          className,
        )}
        onClick={() => {
          void signOut();
        }}
      >
        <LogOut />
      </Button>
    </Tooltip>
  );
}
