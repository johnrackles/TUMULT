import { H1 } from "@/components/Typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/db";
import { artists as dbArtists } from "@/db/party/schema";
import { asc } from "drizzle-orm";
import { type Metadata } from "next";
import { AddArtistForm } from "./add-artist-form";
import { DeleteArtistForm } from "./delete-artist-form";
import { EditArtistForm } from "./edit-artist-form";

export async function getArtists() {
  const artists = await db.query.artists.findMany({
    orderBy: [asc(dbArtists.name)],
  });

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
          <Card key={artist.id}>
            <CardHeader>
              <CardTitle>{artist.name}</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="space-x-2">
              <EditArtistForm initialValues={artist} />{" "}
              <DeleteArtistForm id={artist.id} />
            </CardFooter>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>New Artist</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <AddArtistForm />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
