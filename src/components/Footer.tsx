import { authOptions } from "@/auth/auth";
import { Instagram, Mail, Send } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SigninButton } from "./SigninButton";
import { Tooltip } from "./Tooltip";
import { P } from "./Typography";
import { Button } from "./ui/button";

export async function Footer() {
  const session = await getServerSession(authOptions);

  return (
    <footer className="space-y-2 bg-primary p-4 text-right text-primary-foreground">
      <P>
        © <span className="font-bold">TUMULT</span> {new Date().getFullYear()}
      </P>
      <ul className="flex flex-row items-center justify-end text-sm">
        {session ? null : (
          <li>
            <SigninButton variant="ghost" className="text-primary-foreground" />
          </li>
        )}
        <li>
          <Link href="/impressum" className="ml-2 inline-block hover:underline">
            Imprint
          </Link>
        </li>
      </ul>
      <ul className="flex flex-row items-center justify-end text-sm">
        <li>
          <Tooltip text="RA.co">
            <Button asChild size="icon">
              <a href="https://ra.co/promoters/112866" className="!font-bold">
                RA
              </a>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="Telegram">
            <Button asChild size="icon">
              <a href="https://t.me/tumultberlin">
                <Send size={20} />
              </a>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="Instagram">
            <Button asChild size="icon">
              <a href="https://www.instagram.com/tumult.berlin/">
                <Instagram size={20} />
              </a>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="Contact us">
            <Button asChild size="icon">
              <a href="mailto:rave@tumult.club">
                <Mail size={20} />
              </a>
            </Button>
          </Tooltip>
        </li>
      </ul>
    </footer>
  );
}
