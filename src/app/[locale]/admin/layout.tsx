import { authOptions } from "@/auth/auth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NavigationMenuLink } from "./navigation-menu-link";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?error=Not%20Authenticated");
  }

  return (
    <div className="container bg-black p-4 md:p-8">
      <NavigationMenu className="mb-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/admin/locations" legacyBehavior passHref>
              <NavigationMenuLink>Locations</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {children}
    </div>
  );
}
