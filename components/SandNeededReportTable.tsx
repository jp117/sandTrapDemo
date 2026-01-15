"use client";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { useAppState } from "@/app/providers";
import Link from "next/link";
import { round2 } from "@/lib/sandMath";
import { StatusBadge } from "./StatusBadge";

export function SandNeededReportTable() {
  const { getReportRows } = useAppState();
  const rows = getReportRows();
  return (
    <div className="scroll-container">
      <Table>
        <THead>
          <TR>
            <TH>Bunker</TH>
            <TH>Hole</TH>
            <TH>Area (sqft)</TH>
            <TH>Avg Depth (in)</TH>
            <TH>Min Point (in)</TH>
            <TH>Needed (yd³)</TH>
            <TH>Status</TH>
            <TH>Last Inspected</TH>
          </TR>
        </THead>
        <TBody>
          {rows.map(({ bunker, latestInspection }) => (
            <TR key={bunker.id}>
              <TD>
                <Link href={`/bunkers/${bunker.id}`} className="text-blue-700 underline">
                  {bunker.name}
                </Link>
              </TD>
              <TD>{bunker.hole ?? "-"}</TD>
              <TD>{round2(Math.PI * bunker.lengthFt * bunker.widthFt / 4)}</TD>
              <TD>
                {latestInspection ? round2(latestInspection.avgDepthIn).toFixed(2) : "—"}
              </TD>
              <TD>
                {latestInspection ? round2(latestInspection.minDepthFoundIn).toFixed(2) : "—"}
              </TD>
              <TD>
                {latestInspection ? round2(latestInspection.neededYd3).toFixed(2) : "—"}
              </TD>
              <TD>
                {latestInspection ? <StatusBadge status={latestInspection.status} /> : "No data"}
              </TD>
              <TD>
                {latestInspection ? new Date(latestInspection.createdAt).toLocaleString() : "—"}
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}

