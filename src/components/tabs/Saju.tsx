"use client";

import type { DetailsResult, FiveElements } from "@/lib/types";

const LABELS: { key: keyof FiveElements; label: string; color: string; bg: string }[] = [
  { key: "wood", label: "목(木)", color: "#a8d470", bg: "rgba(168,212,112,0.25)" },
  { key: "fire", label: "화(火)", color: "#f5b09a", bg: "rgba(232,120,90,0.25)" },
  { key: "earth", label: "토(土)", color: "#f0c878", bg: "rgba(240,200,120,0.25)" },
  { key: "metal", label: "금(金)", color: "#d3d1c7", bg: "rgba(211,209,199,0.25)" },
  { key: "water", label: "수(水)", color: "#7ec5f0", bg: "rgba(94,168,223,0.25)" },
];

function Bar({ value, color, bg }: { value: number; color: string; bg: string }) {
  return (
    <div className="bar-track">
      <div
        className="bar-fill"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: `linear-gradient(90deg, ${bg}, ${color})`,
        }}
      />
    </div>
  );
}

function ElementsBlock({ title, fe }: { title: string; fe: FiveElements }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-4">
      <h4 className="mb-3 font-serif text-sm font-bold text-txt">{title}</h4>
      <ul className="space-y-2">
        {LABELS.map(({ key, label, color, bg }) => (
          <li key={key} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span style={{ color }}>{label}</span>
              <span className="font-mono text-txt-3">{fe[key] ?? 0}</span>
            </div>
            <Bar value={(fe[key] as number) ?? 0} color={color} bg={bg} />
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
        <ElementsBlock title="첫번째 사람의 오행" fe={data.personA} />
        <ElementsBlock title="두번째 사람의 오행" fe={data.personB} />
      </div>
      <section>
        <h3 className="mb-2 font-serif text-base font-bold text-txt">오행 분석</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-txt-2">
          {data.analysis}
        </p>
      </section>
    </div>
  );
}
