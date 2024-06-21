import { auth } from "@/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SignoutButton } from "./SignoutButton";

export async function Header() {
  const session = await auth();
  return (
    <header className="flex flex-row items-center justify-between border-b border-b-primary bg-black p-4">
      <Link href="/" className="mx-auto font-bold text-primary md:text-xl">
        TUMULT
      </Link>
      {session ? (
        <SignoutButton className="absolute right-0 md:right-4">
          <LogOut />
        </SignoutButton>
      ) : null}
    </header>
  );
}
