import { H1 } from "@/components/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/db";
import { type Metadata } from "next";
import Link from "next/link";

export async function getArtists() {
  const artists = await db.query.artists.findMany();

  return artists;
}

export const metadata: Metadata = {
  title: "Artists",
};

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div>
      <H1 className="mb-4 md:mb-8">Artists</H1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {artists?.map((artist) => (
          <Link key={artist.id} href={`/admin/Artists/${artist.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{artist.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <pre>{JSON.stringify(artist, undefined, 2)}</pre>
              </CardContent>
            </Card>
          </Link>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>New Location</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
