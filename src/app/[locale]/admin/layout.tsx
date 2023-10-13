import { ourFileRouter } from "@/app/api/uploadthing/core";
import { authOptions } from "@/auth/auth";
import { NavigationMenuLink } from "@/components/navigation-menu-link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { extractRouterConfig } from "uploadthing/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?error=Not%20Authenticated");
  }

  return (
    <div className="container bg-black p-4 md:p-8">
      <NavigationMenu className="mb-4 pb-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/admin/parties" legacyBehavior passHref>
              <NavigationMenuLink>Parties</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/admin/artists" legacyBehavior passHref>
              <NavigationMenuLink>Artists</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/admin/locations" legacyBehavior passHref>
              <NavigationMenuLink>Locations</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      {children}
    </div>
  );
}
