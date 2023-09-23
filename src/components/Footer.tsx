import { authOptions } from "@/auth/auth";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { Instagram, Mail, Send } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { LanguageSwtich } from "./LanguageSwitch";
import { SigninButton } from "./SigninButton";
import { Tooltip } from "./Tooltip";
import { P } from "./Typography";
import { Button } from "./ui/button";

export async function Footer() {
  const session = await getServerSession(authOptions);
  const locale = getCurrentLocale();
  const t = await getI18n();

  return (
    <footer className="flex flex-col justify-center space-y-2 border-t border-t-primary bg-black p-4 md:py-8">
      <P className="mx-auto">
        © <span className="font-bold">TUMULT</span> {new Date().getFullYear()}
      </P>
      <ul className="mx-auto flex flex-row items-center text-sm">
        {session ? null : (
          <li>
            <SigninButton variant="ghost" className="text-primary-foreground" />
          </li>
        )}
        <li>
          <Link
            href="/about-us"
            className="ml-2 inline-block hover:underline md:ml-4"
          >
            {t("About Us")}
          </Link>
        </li>
        <li>
          <Link
            href="/impressum"
            className="ml-2 inline-block hover:underline md:ml-4"
          >
            {t("Imprint")}
          </Link>
        </li>
      </ul>
      <ul className="mx-auto flex flex-row items-center text-sm">
        <li>
          <Tooltip text="RA.co">
            <Button asChild size="icon">
              <a
                href="https://ra.co/promoters/112866"
                className="bg-transparent !font-bold text-white"
              >
                RA
              </a>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="Telegram">
            <Button asChild size="icon">
              <a
                href="https://t.me/tumultberlin"
                className="bg-transparent text-white"
              >
                <Send size={20} />
              </a>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="Instagram">
            <Button asChild size="icon">
              <a
                href="https://www.instagram.com/tumult.berlin/"
                className="bg-transparent text-white"
              >
                <Instagram size={20} />
              </a>
            </Button>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="Contact us">
            <Button asChild size="icon">
              <a
                href="mailto:rave@tumult.club"
                className="bg-transparent text-white"
              >
                <Mail size={20} />
              </a>
            </Button>
          </Tooltip>
        </li>
      </ul>
      <LanguageSwtich
        locale={locale}
        values={[
          { name: t("German"), value: "de" },
          { name: t("English"), value: "en" },
        ]}
        placeholder={t("Select Language")}
        className="mx-auto"
      />
    </footer>
  );
}
