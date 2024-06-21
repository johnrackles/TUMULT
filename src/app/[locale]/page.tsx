import Logo from "@/assets/Tumult-wobbly_weiss.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center bg-background p-4 text-primary">
      <Image
        className="w-3/4 max-w-lg"
        src={Logo}
        alt="TUMULT"
        priority
        width={512}
        sizes="(max-width: 512px) 100vw, 512px"
      />
    </main>
  );
}
