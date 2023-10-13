import { authOptions } from "@/auth/auth";
import { H1, H4 } from "@/components/Typography";
import { db } from "@/db/db";
import { parties } from "@/db/party/schema";
import dayjs from "dayjs";
import { asc } from "drizzle-orm";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AddPartyForm } from "./add-party-form";

async function getParties() {
  return await db.query.parties.findMany({ orderBy: [asc(parties.begin)] });
}

export const metadata: Metadata = {
  title: "Parties",
};

export default async function PartiesPage() {
  const session = await getServerSession(authOptions);
  const parties = await getParties();

  if (!session?.user.id) {
    redirect("/api/auth/signin");
  }

  // get the party that's closest to now in the future
  const nextParty = parties.find((party) => dayjs(party.begin).isAfter(dayjs()));

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
      <AddPartyForm userId={session?.user.id} />
    </div>
  );
}
