"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import { SandNeededReportTable } from "@/components/SandNeededReportTable";
import { useAppState } from "./providers";

export default function Page() {
  return (
    <div className="space-y-6">
      <HeaderActions />
      <Summary />
      <section className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">Sand Needed Report</h2>
        </div>
        <div className="card-content">
          <SandNeededReportTable />
        </div>
      </section>
    </div>
  );
}

function HeaderActions() {
  const { createSampleInspections, clearInspections } = useAppState();
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
      <div className="flex gap-3">
        <Link href="/bunkers">
          <Button>Inspect a bunker</Button>
        </Link>
        <Button variant="secondary" onClick={createSampleInspections}>
          Create sample inspections
        </Button>
        <Button variant="ghost" onClick={clearInspections}>
          Clear demo data
        </Button>
      </div>
    </div>
  );
}

function Summary() {
  const { getTotals } = useAppState();
  const totals = getTotals();
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard title="Total bunkers" value={totals.totalBunkers} />
      <MetricCard title="Needs Sand" value={totals.needsSandCount} />
      <MetricCard title="Watch" value={totals.watchCount} />
      <MetricCard title="Total yd³ needed" value={totals.totalYd3Needed.toFixed(2)} />
    </section>
  );
}

