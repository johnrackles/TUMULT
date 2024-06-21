import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

const AeonikFono = localFont({
  src: [
    {
      path: "../../fonts/AeonikFono-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/AeonikFono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/AeonikFono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aeonik",
});

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return {
    title: {
      template: "%s | TUMULT",
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
          AeonikFono.variable,
          "grid min-h-screen grid-rows-[auto,1fr,auto] bg-primary",
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
