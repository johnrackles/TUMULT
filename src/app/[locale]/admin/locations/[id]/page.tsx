import { P } from "@/components/Typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { EditLocationForm } from "./edit-location-form";

export async function getLocation(id: number) {
  const location = await db.query.locations.findFirst({
    where: (locations) => eq(locations.id, id),
  });

  return location;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const location = await getLocation(parseInt(params.id));

  if (!location) {
    notFound();
  }

  return { title: location.name };
}

export default async function LocationPage({
  params,
}: {
  params: { id: string };
}) {
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
      </CardContent>
      <CardFooter>
        <EditLocationForm initialValues={location} />
      </CardFooter>
    </Card>
  );
}
