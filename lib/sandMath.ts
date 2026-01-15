import { InspectionStatus } from "./types";

export function computeEllipseAreaSqft(lengthFt: number, widthFt: number): number {
  return Math.PI * lengthFt * widthFt / 4;
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function computeInspectionMetrics(params: {
  lengthFt: number;
  widthFt: number;
  targetDepthIn: number;
  minDepthIn: number;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  tc: number;
}) {
  const { lengthFt, widthFt, targetDepthIn, minDepthIn, t1, t2, t3, t4, tc } = params;
  const areaSqft = computeEllipseAreaSqft(lengthFt, widthFt);
  const avgDepthIn = (t1 + t2 + t3 + t4 + 2 * tc) / 6;
  const minDepthFoundIn = Math.min(t1, t2, t3, t4, tc);
  const deficitIn = Math.max(0, targetDepthIn - avgDepthIn);
  const neededYd3 = (areaSqft * deficitIn) / 324; // 12*27 = 324
  const status = determineStatus({ avgDepthIn, minDepthFoundIn, minDepthIn, targetDepthIn });
  return {
    areaSqft,
    avgDepthIn,
    minDepthFoundIn,
    deficitIn,
    neededYd3,
    status
  };
}

export function determineStatus(params: {
  avgDepthIn: number;
  minDepthFoundIn: number;
  minDepthIn: number;
  targetDepthIn: number;
}): InspectionStatus {
  const { avgDepthIn, minDepthFoundIn, minDepthIn, targetDepthIn } = params;
  const anyBelowMin = minDepthFoundIn < minDepthIn;
  const avgBelowMin = avgDepthIn < minDepthIn;
  const avgBelowTarget = avgDepthIn < targetDepthIn;
  if (anyBelowMin || avgBelowMin) return "NEEDS_SAND";
  if (avgBelowTarget) return "WATCH";
  return "OK";
}

