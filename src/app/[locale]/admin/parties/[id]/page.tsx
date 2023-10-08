import { H1, H2, H3, H4, P } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/db";
import { parties } from "@/db/party/schema";
import dayjs from "dayjs";
import "dayjs/locale/de";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { eq } from "drizzle-orm";
import { Edit, Music, Pin, Text } from "lucide-react";

dayjs.locale("de");
dayjs.extend(localizedFormat);

export async function getParty(id: number) {
  return await db.query.parties.findFirst({ where: eq(parties.id, id) });
}

export default function PartyPage({ params }: { params: { id: string } }) {
  const party = getParty(parseInt(params.id));

  return (
    <div>
      <H1 className="mb-4 md:mb-8">Admin</H1>
      <H2 className="mb-4 md:mb-8">Next Party</H2>
      <Card>
        <CardHeader>
          <CardTitle>TUMULT local heroes edition</CardTitle>
          <CardDescription>
            {dayjs(new Date("2023-10-20 23:00")).format("LLLL")} -{" "}
            {dayjs(new Date("2023-10-21 10:00")).format("LT")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 md:grid-rows-1">
          {/* <Image src={Flyer} alt="" className="md:col-start-2" />*/}
          <div className="space-y-4 md:col-start-1 md:row-start-1">
            <H3 className="flex flex-row items-center">
              <Pin className="mr-2 h-4 w-4" />
              Location
            </H3>
            <P className="text-muted-foreground">
              ://about blank Markgrafendamm 24c, 10245 Berlin, Germany
            </P>
            <H3 className="flex flex-row items-center">
              <Music className="mr-2 h-4 w-4" /> Lineup
            </H3>
            <H4>Lobby:</H4>
            <ul className="">
              <li>Art</li>
              <li>XYZ</li>
            </ul>
            <H4>MDF:</H4>
            <ul>
              <li>Artist 3</li>
              <li>asdasdZ</li>
            </ul>
            <H3 className="flex flex-row items-center">
              <Text className="mr-2 h-4 w-4" /> Description
            </H3>
            <div>
              <P>
                After our journey into the Trance worlds, we would like to dare
                a new experiment for this Tumult: This time we put special focus
                on local DJs, proving that great music doesn&apos;t have to
                travel far. A dark yet diverse soundscape awaits you at MDF,
                featuring artists like Dexy&apos;s Midnight, Josh Reid,
                MAGDALENA MAY and Neovex, ranging from hard groove to hard
                techno. In the lobby, you can tune in for infectious, driving
                beats, from minimal techhouse to Chicago house, presented by our
                talented DJs: Günther Lowrider, Niki K, Reflex Blue, Sandix and
                Loriket.
              </P>
              <P>
                Nach unserer Reise in die Trance-Welten, möchten wir für dieses
                Tumult ein neues Experiment wagen: Diesmal legen wir besonderen
                Fokus auf lokale DJs und beweisen damit, dass großartige Musik
                keine weiten Wege zurücklegen muss. Auf dem MDF erwartet euch
                eine düstere und dennoch vielfältige Klanglandschaft, die von
                Künstlern wie Dexy&apos;s Midnight, Josh Reid, MAGDALENA MAY und
                Neovex gestaltet wird, reichend von Hardgroove bis zu Hard
                Techno. In der Lobby könnt ihr euch auf mitreißende, treibende
                Beats einstellen, von Minimal Techhouse bis hin zu Chicago
                House, präsentiert von unseren talentierten DJs: Günther
                Lowrider, Niki K, Reflex Blue, Sandix und Loriket.
              </P>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto">
            <Edit className="mr-2 h-4 w-4" /> Edit Party
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
