import { H1, H4 } from "@/components/Typography";
import { db } from "@/db/db";
import { parties } from "@/db/party/schema";
import dayjs from "dayjs";
import { asc } from "drizzle-orm";
import { type Metadata } from "next";
import Link from "next/link";
import { AddPartyForm } from "./add-party-form";

export async function getParties() {
  return await db.query.parties.findMany({ orderBy: [asc(parties.begin)] });
}

export const metadata: Metadata = {
  title: "Parties",
};

export default async function PartiesPage() {
  const parties = await getParties();

  // get the party that's closest to now in the future
  const nextParty = parties.find((party) =>
    dayjs(party.begin).isAfter(dayjs()),
  );

  return (
    <div>
      <H1 className="mb-4 md:mb-8">Parties</H1>
      {nextParty ? (
        <>
          <H4>Next Party:</H4>
          <Link href={`/admin/parties/${nextParty.id}`}>{nextParty.name}</Link>
        </>
      ) : null}
      <ul>{}</ul>
      <AddPartyForm />
    </div>
  );
}
