import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Karla as KarlaFont } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

const NeueHaasDisplay = localFont({
  src: [
    {
      path: "../../fonts/NeueHaasDisplay/NeueHaasDisplay-XThin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../fonts/NeueHaasDisplay/NeueHaasDisplay-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../fonts/NeueHaasDisplay/NeueHaasDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/NeueHaasDisplay/NeueHaasDisplay-Roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/NeueHaasDisplay/NeueHaasDisplay-Mediu.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/NeueHaasDisplay/NeueHaasDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/NeueHaasDisplay/NeueHaasDisplay-Black.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-neue-haas",
});
const Karla = KarlaFont({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return {
    title: {
      template: "TUMULT | %s ",
      default: "TUMULT",
    },
    alternates: {
      languages: {
        en: "https://www.tumult.club/en",
        de: "https://www.tumult.club/de",
      },
    },
    description:
      params.locale === "en"
        ? "Tumult is a friendship-based collective hosting inclusive events. They champion community, diversity, local talent, and conscious pricing."
        : "Tumult ist ein auf Freundschaft basierendes Kollektiv, das inklusive Veranstaltungen organisiert. Sie setzen sich für Gemeinschaft, Vielfalt, lokale Talente und bewusste Preisgestaltung ein.",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body
        className={cn(
          NeueHaasDisplay.variable,
          Karla.variable,
          "grid min-h-screen grid-rows-[auto,1fr,auto]",
        )}
      >
        <Header />
        {children}
        <Analytics />
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
