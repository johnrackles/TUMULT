import Logo from "@/assets/Tumult-wobbly_weiss.png";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignoutButton } from "./SignoutButton";

export async function Header() {
  const session = await auth();

  return (
    <header className="flex items-center border-b border-b-primary bg-black p-4">
      <Link href="/" className={cn("mx-auto font-bold text-primary md:text-xl")}>
        <Image src={Logo} alt="TUMULT" height={40} priority />
      </Link>
      {session ? (
        <SignoutButton className="absolute right-0 md:right-4">
          <LogOut />
        </SignoutButton>
      ) : null}
    </header>
  );
}
