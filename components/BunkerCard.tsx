"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bunker } from "@/lib/types";
import { computeEllipseAreaSqft, round2 } from "@/lib/sandMath";
import { useAppState } from "@/app/providers";
import { StatusBadge } from "./StatusBadge";

export function BunkerCard({ bunker }: { bunker: Bunker }) {
  const { getLatestInspectionForBunker } = useAppState();
  const latest = getLatestInspectionForBunker(bunker.id);
  const area = round2(computeEllipseAreaSqft(bunker.lengthFt, bunker.widthFt));
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-3">
          <span className="text-xl">{bunker.name}</span>
          {typeof bunker.hole === "number" ? (
            <span className="text-gray-500">Hole {bunker.hole}</span>
          ) : null}
        </CardTitle>
        {latest ? <StatusBadge status={latest.status} /> : null}
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-gray-700">
          <div>
            Dimensions:{" "}
            <span className="font-medium">
              {bunker.lengthFt}ft × {bunker.widthFt}ft
            </span>
          </div>
          <div>
            Area: <span className="font-medium">{area} sqft</span>
          </div>
        </div>
        <Link href={`/bunkers/${bunker.id}`} className="w-full md:w-auto">
          <Button className="w-full">Inspect</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

