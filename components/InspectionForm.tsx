/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bunker, Inspection } from "@/lib/types";
import { computeInspectionMetrics, round2 } from "@/lib/sandMath";
import { useAppState } from "@/app/providers";

const schema = z.object({
  t1: z.number().min(0).max(12),
  t2: z.number().min(0).max(12),
  t3: z.number().min(0).max(12),
  t4: z.number().min(0).max(12),
  tc: z.number().min(0).max(12)
});

export function InspectionForm({ bunker }: { bunker: Bunker }) {
  const { addInspection } = useAppState();
  const [values, setValues] = React.useState({
    t1: 0,
    t2: 0,
    t3: 0,
    t4: 0,
    tc: 0
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState<Inspection | null>(null);

  const parsed = schema.safeParse(values);
  const metrics = computeInspectionMetrics({
    lengthFt: bunker.lengthFt,
    widthFt: bunker.widthFt,
    targetDepthIn: bunker.targetDepthIn,
    minDepthIn: bunker.minDepthIn,
    ...values
  });

  function handleChange(field: keyof typeof values, raw: string) {
    const num = Number(raw);
    setValues((v) => ({ ...v, [field]: isNaN(num) ? 0 : num }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = schema.safeParse(values);
    if (!res.success) {
      const errs: Record<string, string> = {};
      for (const issue of res.error.issues) {
        const path = issue.path.join(".");
        errs[path] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    const created = addInspection({
      bunkerId: bunker.id,
      t1: values.t1,
      t2: values.t2,
      t3: values.t3,
      t4: values.t4,
      tc: values.tc,
      ...metrics
    });
    setSubmitted(created);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <LabeledNumber
            label="T1"
            value={values.t1}
            onChange={(v) => handleChange("t1", v)}
            error={errors.t1}
          />
          <LabeledNumber
            label="T2"
            value={values.t2}
            onChange={(v) => handleChange("t2", v)}
            error={errors.t2}
          />
          <LabeledNumber
            label="T3"
            value={values.t3}
            onChange={(v) => handleChange("t3", v)}
            error={errors.t3}
          />
          <LabeledNumber
            label="T4"
            value={values.t4}
            onChange={(v) => handleChange("t4", v)}
            error={errors.t4}
          />
          <LabeledNumber
            label="C"
            value={values.tc}
            onChange={(v) => handleChange("tc", v)}
            error={errors.tc}
          />
        </div>

        <EllipseDiagram />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <PreviewItem label="Avg Depth (in)" value={round2(metrics.avgDepthIn).toFixed(2)} />
          <PreviewItem label="Min Point (in)" value={round2(metrics.minDepthFoundIn).toFixed(2)} />
          <PreviewItem label="Deficit (in)" value={round2(metrics.deficitIn).toFixed(2)} />
          <PreviewItem label="Needed (yd³)" value={round2(metrics.neededYd3).toFixed(2)} />
          <PreviewItem label="Status" value={metrics.status} />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={!parsed.success} className="w-full md:w-auto">
            Submit Inspection
          </Button>
        </div>
      </form>

      {submitted ? (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Submission Preview</h3>
          </div>
          <div className="card-content space-y-3">
            <div className="text-gray-800 font-medium">
              {submitted.status} — Trap needs {round2(submitted.neededYd3).toFixed(2)} yd³
            </div>
            <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
{JSON.stringify(
  {
    id: submitted.id,
    bunkerId: submitted.bunkerId,
    createdAt: submitted.createdAt,
    t1: submitted.t1,
    t2: submitted.t2,
    t3: submitted.t3,
    t4: submitted.t4,
    tc: submitted.tc,
    areaSqft: round2(submitted.areaSqft),
    avgDepthIn: round2(submitted.avgDepthIn),
    minDepthFoundIn: round2(submitted.minDepthFoundIn),
    deficitIn: round2(submitted.deficitIn),
    neededYd3: round2(submitted.neededYd3),
    status: submitted.status
  },
  null,
  2
)}
            </pre>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function LabeledNumber({
  label,
  value,
  onChange,
  error
}: {
  label: string;
  value: number;
  onChange: (val: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Input
        inputMode="decimal"
        type="number"
        step="0.1"
        min={0}
        max={12}
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? <div className="text-sm text-red-600 mt-1">{error}</div> : null}
    </div>
  );
}

function PreviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function EllipseDiagram() {
  return (
    <div className="flex items-center justify-center">
      <svg width="300" height="160" viewBox="0 0 300 160" className="max-w-full">
        <ellipse cx="150" cy="80" rx="130" ry="60" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
        {/* Center */}
        <circle cx="150" cy="80" r="4" fill="#2563eb" />
        <text x="158" y="84" fontSize="12" fill="#2563eb">
          C
        </text>
        {/* T1 top */}
        <circle cx="150" cy="20" r="4" fill="#111827" />
        <text x="158" y="24" fontSize="12" fill="#111827">
          T1
        </text>
        {/* T2 right */}
        <circle cx="280" cy="80" r="4" fill="#111827" />
        <text x="286" y="84" fontSize="12" fill="#111827">
          T2
        </text>
        {/* T3 bottom */}
        <circle cx="150" cy="140" r="4" fill="#111827" />
        <text x="158" y="144" fontSize="12" fill="#111827">
          T3
        </text>
        {/* T4 left */}
        <circle cx="20" cy="80" r="4" fill="#111827" />
        <text x="2" y="84" fontSize="12" fill="#111827">
          T4
        </text>
      </svg>
    </div>
  );
}

