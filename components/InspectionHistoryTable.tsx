import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Inspection } from "@/lib/types";
import { round2 } from "@/lib/sandMath";

export function InspectionHistoryTable({ inspections }: { inspections: Inspection[] }) {
  if (!inspections.length) {
    return <div className="text-gray-600">No inspections yet.</div>;
  }
  return (
    <div className="scroll-container">
      <Table>
        <THead>
          <TR>
            <TH>Date</TH>
            <TH>Avg Depth (in)</TH>
            <TH>Min Point (in)</TH>
            <TH>Deficit (in)</TH>
            <TH>Needed (yd³)</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <TBody>
          {inspections.map((i) => (
            <TR key={i.id}>
              <TD>{new Date(i.createdAt).toLocaleString()}</TD>
              <TD>{round2(i.avgDepthIn).toFixed(2)}</TD>
              <TD>{round2(i.minDepthFoundIn).toFixed(2)}</TD>
              <TD>{round2(i.deficitIn).toFixed(2)}</TD>
              <TD>{round2(i.neededYd3).toFixed(2)}</TD>
              <TD>{i.status}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}

