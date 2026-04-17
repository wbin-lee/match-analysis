"use client";

import type { DetailsResult, FiveElements } from "@/lib/types";

const LABELS: { key: keyof FiveElements; label: string; color: string }[] = [
  { key: "wood", label: "목(木)", color: "bg-emerald-500" },
  { key: "fire", label: "화(火)", color: "bg-rose-500" },
  { key: "earth", label: "토(土)", color: "bg-amber-500" },
  { key: "metal", label: "금(金)", color: "bg-slate-400" },
  { key: "water", label: "수(水)", color: "bg-sky-500" },
];

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-slate-100">
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function ElementsBlock({ title, fe }: { title: string; fe: FiveElements }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <h4 className="mb-3 text-sm font-semibold text-slate-700">{title}</h4>
      <ul className="space-y-2">
        {LABELS.map(({ key, label, color }) => (
          <li key={key} className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>{label}</span>
              <span className="font-mono">{fe[key] ?? 0}</span>
            </div>
            <Bar value={(fe[key] as number) ?? 0} color={color} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Saju({ data }: { data: DetailsResult["saju"] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <ElementsBlock title="A의 오행" fe={data.personA} />
        <ElementsBlock title="B의 오행" fe={data.personB} />
      </div>
      <section>
        <h3 className="mb-2 text-base font-semibold text-slate-700">오행 분석</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {data.analysis}
        </p>
      </section>
    </div>
  );
}
