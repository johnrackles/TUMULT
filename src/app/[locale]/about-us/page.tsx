"use client";
import AboutUsDE from "./about-us-de.mdx";
import AboutUsEN from "./about-us-en.mdx";

export default function AboutUsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (locale === "en") {
    return <AboutUsEN />;
  }
  return <AboutUsDE />;
}
