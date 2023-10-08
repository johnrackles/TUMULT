"use client";

import {
  NavigationMenuLink as RadixNavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

export const NavigationMenuLink = forwardRef<
  HTMLAnchorElement,
  {
    children: React.ReactNode;
    className?: string;
    href?: string;
  }
>(function NavigationMenuLink({ children, className, href, ...rest }, ref) {
  const pathname = usePathname();
  return (
    <RadixNavigationMenuLink
      className={cn(
        navigationMenuTriggerStyle(),
        "border-primary",
        className,
        pathname === href && "border-b font-bold",
      )}
      href={href}
      {...rest}
      ref={ref}
    >
      {children}
    </RadixNavigationMenuLink>
  );
});
