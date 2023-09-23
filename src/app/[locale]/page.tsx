import Logo from "@/components/Logo.svg";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function Home() {
  return (
    <main className="top-6ext-primary-foreground flex items-center justify-center bg-primary p-4">
      <Image
        src={Logo as StaticImport}
        alt="TUMULT"
        className="w-3/4 max-w-lg"
        priority
      />
    </main>
  );
}
