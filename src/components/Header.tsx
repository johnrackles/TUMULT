import { authOptions } from "@/auth/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SignoutButton } from "./SignoutButton";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex items-center border-b border-b-primary bg-black p-4">
      <Link
        href="/"
        className={cn("mx-auto font-bold text-primary md:text-xl")}
      >
        TUMULT
      </Link>
      {session ? (
        <SignoutButton className="absolute right-0 md:right-4" />
      ) : null}
    </header>
  );
}
