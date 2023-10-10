import { H4, P } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { EditLocationForm } from "./edit-location-form";

async function getLocation(id: number) {
  const location = await db.query.locations.findFirst({
    where: (locations) => eq(locations.id, id),
    with: { floors: { columns: { id: true, name: true } } },
  });
  return location;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const location = await getLocation(parseInt(params.id));

  if (!location) {
    notFound();
  }

  return { title: location.name };
}

export default async function LocationPage({ params }: { params: { id: string } }) {
  const location = await getLocation(parseInt(params.id));

  if (!location) {
    notFound();
  }

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>{location.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <P>
          {location.street} <br />
          {location.zip} {location.city}
          <br />
          {location.country}
        </P>
        {location.floors.length > 0 ? (
          <>
            <H4 className="mb-4">Floors:</H4>
            <ul className="flex space-x-2">
              {location.floors.map((floor) => (
                <li key={floor.id}>
                  <Badge variant="secondary">{floor.name}</Badge>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </CardContent>
      <CardFooter className="space-x-4">
        <EditLocationForm initialValues={location} floors={location.floors} />
      </CardFooter>
    </Card>
  );
}
