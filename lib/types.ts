export type Bunker = {
  id: string;
  name: string;
  hole?: number;
  locationNote?: string;
  lengthFt: number;
  widthFt: number;
  targetDepthIn: number; // default 5.0
  minDepthIn: number; // default 4.0
  isActive: boolean;
};

export type InspectionStatus = "OK" | "WATCH" | "NEEDS_SAND";

export type Inspection = {
  id: string;
  bunkerId: string;
  createdAt: string; // ISO
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  tc: number;
  // computed:
  areaSqft: number;
  avgDepthIn: number;
  minDepthFoundIn: number;
  deficitIn: number;
  neededYd3: number;
  status: InspectionStatus;
};

export type ReportRow = {
  bunker: Bunker;
  latestInspection?: Inspection;
};

export type Totals = {
  totalBunkers: number;
  needsSandCount: number;
  watchCount: number;
  totalYd3Needed: number;
};

