"use client";

import { cn } from "@/lib/utils";
import { LogOut, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetPortal,
  SheetTrigger,
} from "./ui/sheet";

export function Navigation() {
  return (
    <>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetPortal>
          <SheetOverlay />
          <SheetContent side="right">
            <div className="flex h-full flex-col">
              <div className="flex flex-col space-y-3">
                <Link href="/admin" className="text-muted-foreground">
                  Admin
                </Link>
              </div>
              <div className="mt-auto flex flex-col space-y-3">
                <Button className={cn("text-muted-foreground")} variant="link">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </SheetPortal>
      </Sheet>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/admin" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <MenuIcon />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
