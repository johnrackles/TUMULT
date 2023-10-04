import { authOptions } from "@/auth/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SignoutButton } from "./SignoutButton";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex flex-row items-center justify-between border-b border-b-primary bg-black p-4">
      <Link href="/" className="mx-auto font-bold text-primary md:text-xl">
        TUMULT
      </Link>
      {session ? (
        <ul className="absolute right-0 flex flex-row items-center md:right-4">
          <li>
            <Link href="/admin">Admin</Link>{" "}
          </li>
          <li>
            <SignoutButton />
          </li>
        </ul>
      ) : null}
    </header>
  );
}
