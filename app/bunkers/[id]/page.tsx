import { notFound } from "next/navigation";
import Link from "next/link";
import { bunkers } from "@/data/bunkers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { computeEllipseAreaSqft, round2 } from "@/lib/sandMath";
import { InspectionForm } from "@/components/InspectionForm";
import { BunkerInfoClient } from "@/components/bunker/BunkerInfoClient";
import { LatestInspectionClient } from "@/components/bunker/LatestInspectionClient";
import { HistoryClient } from "@/components/bunker/HistoryClient";
import { Button } from "@/components/ui/button";

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const bunker = bunkers.find((b) => b.id === params.id);
  if (!bunker) return notFound();
  const area = round2(computeEllipseAreaSqft(bunker.lengthFt, bunker.widthFt));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">{bunker.name}</h1>
        <Link href="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </div>
      <BunkerInfoClient bunkerId={bunker.id} name={bunker.name} hole={bunker.hole} area={area} />
      <LatestInspectionClient bunkerId={bunker.id} />
      <section className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">New Inspection</h2>
        </div>
        <div className="card-content">
          <InspectionForm bunker={bunker} />
        </div>
      </section>
      <HistoryClient bunkerId={bunker.id} />
    </div>
  );
}
 

