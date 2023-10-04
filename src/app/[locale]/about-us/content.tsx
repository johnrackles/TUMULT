"use client";
import { Card, CardContent } from "@/components/ui/card";
import AboutUsDE from "./about-us-de.mdx";
import AboutUsEN from "./about-us-en.mdx";

export function Content({ locale }: { locale: string }) {
  if (locale === "en") {
    return (
      <Card className="mx-auto my-4 max-w-3xl p-4 md:my-8 md:p-8">
        <CardContent>
          <AboutUsEN />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="mx-auto my-4 max-w-3xl p-4 md:my-8 md:p-8">
      <CardContent>
        <AboutUsDE />
      </CardContent>
    </Card>
  );
}
