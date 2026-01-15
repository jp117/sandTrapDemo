"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppState } from "@/app/providers";
import { round2 } from "@/lib/sandMath";

export function LatestInspectionClient({ bunkerId }: { bunkerId: string }) {
  const { getLatestInspectionForBunker } = useAppState();
  const latest = getLatestInspectionForBunker(bunkerId);
  if (!latest) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Inspection</CardTitle>
        </CardHeader>
        <CardContent>No data yet.</CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Inspection</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <InfoItem label="Date" value={new Date(latest.createdAt).toLocaleString()} />
        <InfoItem label="Avg Depth (in)" value={round2(latest.avgDepthIn).toFixed(2)} />
        <InfoItem label="Min Point (in)" value={round2(latest.minDepthFoundIn).toFixed(2)} />
        <InfoItem label="Deficit (in)" value={round2(latest.deficitIn).toFixed(2)} />
        <InfoItem label="Needed (yd³)" value={round2(latest.neededYd3).toFixed(2)} />
        <InfoItem label="Status" value={latest.status} />
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

