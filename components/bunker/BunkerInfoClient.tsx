"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppState } from "@/app/providers";

export function BunkerInfoClient({
  bunkerId,
  name,
  hole,
  area
}: {
  bunkerId: string;
  name: string;
  hole?: number;
  area: number;
}) {
  const { bunkers } = useAppState();
  const b = bunkers.find((x) => x.id === bunkerId)!;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Info</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <InfoItem label="Name" value={name} />
        <InfoItem label="Hole" value={hole ?? "-"} />
        <InfoItem label="Dimensions" value={`${b.lengthFt}ft × ${b.widthFt}ft`} />
        <InfoItem label="Area" value={`${area} sqft`} />
        <InfoItem label="Targets" value={`Min ${b.minDepthIn}" / Target ${b.targetDepthIn}"`} />
      </CardContent>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

