"use client";
import { useAppState } from "@/app/providers";
import { InspectionHistoryTable } from "@/components/InspectionHistoryTable";

export function HistoryClient({ bunkerId }: { bunkerId: string }) {
  const { getInspectionsForBunker } = useAppState();
  const items = getInspectionsForBunker(bunkerId);
  return (
    <section className="card">
      <div className="card-header">
        <h2 className="text-xl font-semibold">Inspection History</h2>
      </div>
      <div className="card-content">
        <InspectionHistoryTable inspections={items} />
      </div>
    </section>
  );
}

