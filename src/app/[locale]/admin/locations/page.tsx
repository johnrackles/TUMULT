import { H1 } from "@/components/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddLocationForm } from "./add-location-form";

export default function LocationsPage() {
  return (
    <div>
      <H1 className="mb-4 md:mb-8">Locations</H1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
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
