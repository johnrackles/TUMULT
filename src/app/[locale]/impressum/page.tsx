import { H1, P } from "@/components/Typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <div>
      <Card className="mx-auto my-4 max-w-3xl p-4 md:my-8 md:p-8">
        <CardHeader>
          <H1>Impressum</H1>
        </CardHeader>
        <CardContent>
          <P>
            Rackles & Reinecke Tumult Events GbR
            <br />
            Colbestraße 25
            <br />
            10247 Berlin
          </P>
          <P>
            E-Mail: <a href="mailto:contact@tumult.club">contact@tumult.club</a>
          </P>
          <P>
            <span className="font-bold">Vertreten durch:</span>
            <br />
            Gesellschafter Johannes Rackles und Leonhard Reinecke
          </P>
        </CardContent>
      </Card>
    </div>
  );
}
