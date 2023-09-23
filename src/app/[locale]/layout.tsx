import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    template: "TUMULT | %s ",
    default: "TUMULT",
  },
  description: "Was dein Körper braucht",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={cn(
          AeonikFono.variable,
          "grid min-h-screen grid-rows-[auto,1fr,auto]",
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
