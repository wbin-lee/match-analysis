"use client";

import type { DetailsResult } from "@/lib/types";

export default function DatingStyle({
  data,
}: {
  data: NonNullable<DetailsResult["datingStyle"]>;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {(["personA", "personB"] as const).map((k, i) => (
          <div key={k} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <h4 className="mb-3 text-sm font-semibold text-slate-700">
              {i === 0 ? "A" : "B"}의 연애 스타일
            </h4>
            <ul className="space-y-2 text-sm text-slate-700">
              {data[k].map((s, j) => (
                <li key={j}>• {s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <section className="space-y-3">
        <Row label="강점" text={data.compatibility.strengths} tone="emerald" />
        <Row label="균형 포인트" text={data.compatibility.balance} tone="sky" />
        <Row label="개선할 점" text={data.compatibility.improvements} tone="amber" />
      </section>
    </div>
  );
}

function Row({
  label,
  text,
  tone,
}: {
  label: string;
  text: string;
  tone: "emerald" | "sky" | "amber";
}) {
  const bg = {
    emerald: "bg-emerald-50 ring-emerald-100 text-emerald-800",
    sky: "bg-sky-50 ring-sky-100 text-sky-800",
    amber: "bg-amber-50 ring-amber-100 text-amber-800",
  }[tone];
  return (
    <div className={`rounded-lg p-4 ring-1 ${bg}`}>
      <div className="mb-1 text-xs font-bold uppercase tracking-wide">{label}</div>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
}
