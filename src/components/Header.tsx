import Link from "next/link";

export function Header() {
  return (
    <header className="flex flex-row items-center justify-between border-b border-b-primary bg-black p-4">
      <Link href="/" className="mx-auto font-bold text-primary md:text-xl">
        TUMULT
      </Link>
    </header>
  );
}
