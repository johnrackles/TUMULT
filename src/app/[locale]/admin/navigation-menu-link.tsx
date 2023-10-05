"use client";
import {
  NavigationMenuLink as RadixNavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { forwardRef } from "react";

export const NavigationMenuLink = forwardRef<
  HTMLAnchorElement,
  {
    children: React.ReactNode;
  }
>(function NavigationMenuLink({ children, ...rest }, ref) {
  return (
    <RadixNavigationMenuLink
      className={navigationMenuTriggerStyle()}
      {...rest}
      ref={ref}
    >
      {children}
    </RadixNavigationMenuLink>
  );
});
