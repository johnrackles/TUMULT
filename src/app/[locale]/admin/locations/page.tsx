import { H1, P } from "@/components/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/db";
import { type Metadata } from "next";
import Link from "next/link";
import { AddLocationForm } from "./add-location-form";

export async function getLocations() {
  const locations = await db.query.locations.findMany();

  return locations;
}

export const metadata: Metadata = {
  title: "Locations",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div>
      <H1 className="mb-4 md:mb-8">Locations</H1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {locations?.map((location) => (
          <Link key={location.id} href={`/admin/locations/${location.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{location.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <P>
                  {location.street} <br /> {location.zip} {location.city}
                </P>
              </CardContent>
            </Card>
          </Link>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>New Location</CardTitle>
          </CardHeader>
          <CardContent>
            <AddLocationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
