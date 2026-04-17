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
        {(["personA", "personB"] as const).map((k, i) => {
          const border = i === 0 ? "rgba(232,120,154,0.22)" : "rgba(155,133,232,0.22)";
          const bulletColor = i === 0 ? "#f5b8cc" : "#c4b5f8";
          return (
            <div
              key={k}
              className="rounded-xl border bg-surface-2 p-4"
              style={{ borderColor: border }}
            >
              <h4 className="mb-3 text-sm font-medium text-txt-2">
                {i === 0 ? "A" : "B"}의 연애 스타일
              </h4>
              <ul className="space-y-2 text-sm text-txt-2">
                {data[k].map((s, j) => (
                  <li key={j} className="flex gap-2">
                    <span style={{ color: bulletColor }}>•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <section className="space-y-3">
        <Row label="강점" text={data.compatibility.strengths} tone="teal" />
        <Row label="균형 포인트" text={data.compatibility.balance} tone="purple" />
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
  tone: "teal" | "purple" | "amber";
}) {
  const styles = {
    teal: { bg: "rgba(94,207,176,0.08)", border: "rgba(94,207,176,0.22)", color: "#5ecfb0" },
    purple: { bg: "rgba(155,133,232,0.08)", border: "rgba(155,133,232,0.22)", color: "#c4b5f8" },
    amber: { bg: "rgba(240,168,58,0.08)", border: "rgba(240,168,58,0.22)", color: "#f0a83a" },
  }[tone];

  return (
    <div
      className="rounded-lg border p-4"
      style={{ background: styles.bg, borderColor: styles.border }}
    >
      <div className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: styles.color }}>
        {label}
      </div>
      <p className="text-sm leading-relaxed text-txt-2">{text}</p>
    </div>
  );
}
