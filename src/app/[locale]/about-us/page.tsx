import { type Metadata } from "next";
import { Content } from "./content";

type Props = {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export function generateMetadata({ params }: Props): Metadata {
  return { title: params.locale === "en" ? "About Us" : "Über Uns" };
}

export default function AboutUsPage({ params: { locale } }: { params: { locale: string } }) {
  return <Content locale={locale} />;
}
