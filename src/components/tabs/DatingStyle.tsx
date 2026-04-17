"use client";

import type { DetailsResult, Names } from "@/lib/types";

export default function DatingStyle({
  data,
  names,
}: {
  data: NonNullable<DetailsResult["datingStyle"]>;
  names: Names;
}) {
  const labels = [names.nameA, names.nameB];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        {(["personA", "personB"] as const).map((k, i) => {
          const border = i === 0 ? "rgba(232,120,154,0.18)" : "rgba(155,133,232,0.18)";
          const bulletColor = i === 0 ? "#f5b8cc" : "#c4b5f8";
          return (
            <div
              key={k}
              className="card-inner"
              style={{ borderColor: border }}
            >
              <h4 className="mb-3 text-sm font-medium text-txt-2">
                {labels[i]}의 연애 스타일
              </h4>
              <ul className="space-y-2 text-[14px] leading-relaxed text-txt-2">
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
    teal: { bg: "rgba(94,207,176,0.08)", border: "rgba(94,207,176,0.2)", color: "#5ecfb0" },
    purple: { bg: "rgba(155,133,232,0.08)", border: "rgba(155,133,232,0.2)", color: "#c4b5f8" },
    amber: { bg: "rgba(240,168,58,0.08)", border: "rgba(240,168,58,0.2)", color: "#f0a83a" },
  }[tone];

  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: styles.bg, borderColor: styles.border }}
    >
      <div className="mb-2 text-[13px] font-bold uppercase tracking-wider" style={{ color: styles.color }}>
        {label}
      </div>
      <p className="text-[14px] leading-[1.85] text-txt-2">{text}</p>
    </div>
  );
}
