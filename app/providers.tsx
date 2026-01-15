/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { bunkers } from "@/data/bunkers";
import { Bunker, Inspection, ReportRow, Totals } from "@/lib/types";
import { computeInspectionMetrics, round2 } from "@/lib/sandMath";

type AppState = {
  bunkers: Bunker[];
  inspections: Inspection[];
  addInspection: (inspection: Omit<Inspection, "id" | "createdAt">) => Inspection;
  clearInspections: () => void;
  getInspectionsForBunker: (bunkerId: string) => Inspection[];
  getLatestInspectionForBunker: (bunkerId: string) => Inspection | undefined;
  getReportRows: () => ReportRow[];
  getTotals: () => Totals;
  createSampleInspections: () => void;
};

const AppStateContext = React.createContext<AppState | null>(null);

const STORAGE_KEY = "sand-demo-inspections-v1";

function useLocalStorageInspections() {
  const [inspections, setInspections] = React.useState<Inspection[]>([]);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Inspection[];
        setInspections(parsed);
      }
    } catch {
      // ignore
    }
  }, []);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inspections));
    } catch {
      // ignore
    }
  }, [inspections]);
  return { inspections, setInspections };
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const { inspections, setInspections } = useLocalStorageInspections();

  const addInspection = React.useCallback(
    (inspection: Omit<Inspection, "id" | "createdAt">): Inspection => {
      const newInspection: Inspection = {
        ...inspection,
        id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
        createdAt: new Date().toISOString()
      };
      setInspections((prev) => [newInspection, ...prev]);
      return newInspection;
    },
    [setInspections]
  );

  const clearInspections = React.useCallback(() => {
    setInspections([]);
  }, [setInspections]);

  const getInspectionsForBunker = React.useCallback(
    (bunkerId: string) => inspections.filter((i) => i.bunkerId === bunkerId),
    [inspections]
  );

  const getLatestInspectionForBunker = React.useCallback(
    (bunkerId: string) =>
      inspections
        .filter((i) => i.bunkerId === bunkerId)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))[0],
    [inspections]
  );

  const getReportRows = React.useCallback((): ReportRow[] => {
    return bunkers
      .filter((b) => b.isActive)
      .map((b) => ({
        bunker: b,
        latestInspection: getLatestInspectionForBunker(b.id)
      }))
      .sort((a, b) => {
        const ay = a.latestInspection?.neededYd3 ?? 0;
        const by = b.latestInspection?.neededYd3 ?? 0;
        return by - ay;
      });
  }, [inspections]);

  const getTotals = React.useCallback((): Totals => {
    const rows = getReportRows();
    let needsSandCount = 0;
    let watchCount = 0;
    let totalYd3Needed = 0;
    for (const r of rows) {
      const li = r.latestInspection;
      if (!li) continue;
      if (li.status === "NEEDS_SAND") needsSandCount++;
      if (li.status === "WATCH") watchCount++;
      if (li.status !== "OK") totalYd3Needed += li.neededYd3;
    }
    return {
      totalBunkers: bunkers.filter((b) => b.isActive).length,
      needsSandCount,
      watchCount,
      totalYd3Needed: round2(totalYd3Needed)
    };
  }, [inspections]);

  const createSampleInspections = React.useCallback(() => {
    const samples = bunkers.slice(0, 8).map((b, idx) => {
      const tBase = 3 + (idx % 4); // 3..6
      const t1 = tBase + (Math.random() - 0.5);
      const t2 = tBase + (Math.random() - 0.5);
      const t3 = tBase + (Math.random() - 0.5);
      const t4 = tBase + (Math.random() - 0.5);
      const tc = tBase + (Math.random() - 0.5);
      const metrics = computeInspectionMetrics({
        lengthFt: b.lengthFt,
        widthFt: b.widthFt,
        targetDepthIn: b.targetDepthIn,
        minDepthIn: b.minDepthIn,
        t1,
        t2,
        t3,
        t4,
        tc
      });
      const insp: Inspection = {
        id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()) + idx,
        bunkerId: b.id,
        createdAt: new Date(Date.now() - idx * 3600_000).toISOString(),
        t1,
        t2,
        t3,
        t4,
        tc,
        ...metrics
      };
      return insp;
    });
    setInspections((prev) => [...samples, ...prev]);
  }, [setInspections]);

  const value: AppState = {
    bunkers,
    inspections,
    addInspection,
    clearInspections,
    getInspectionsForBunker,
    getLatestInspectionForBunker,
    getReportRows,
    getTotals,
    createSampleInspections
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = React.useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

