"use client";

import type { DetailsResult, MonthLevel } from "@/lib/types";

const LEVEL_STYLE: Record<MonthLevel, { bg: string; border: string; color: string }> = {
  "매우 좋음": { bg: "rgba(232,120,154,0.15)", border: "rgba(232,120,154,0.3)", color: "#f5b8cc" },
  "좋음": { bg: "rgba(94,207,176,0.15)", border: "rgba(94,207,176,0.3)", color: "#5ecfb0" },
  "보통": { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", color: "#d5cfe8" },
  "다소 나쁨": { bg: "rgba(240,168,58,0.15)", border: "rgba(240,168,58,0.3)", color: "#f0a83a" },
  "나쁨": { bg: "rgba(232,120,90,0.15)", border: "rgba(232,120,90,0.3)", color: "#e8785a" },
};

export default function GoodTimes({ data }: { data: DetailsResult["goodTimes"] }) {
  const byMonth = new Map<number, MonthLevel>(
    data.months.map((m) => [m.month, m.level])
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
          const level = byMonth.get(m) ?? "보통";
          const style = LEVEL_STYLE[level];
          return (
            <div
              key={m}
              className="rounded-xl border p-3.5 text-center transition hover:-translate-y-0.5"
              style={{ borderColor: style.border, background: style.bg }}
            >
              <div className="text-[13px] font-medium text-txt-2">{m}월</div>
              <div
                className="mt-1 text-[12px] font-semibold"
                style={{ color: style.color }}
              >
                {level}
              </div>
            </div>
          );
        })}
      </div>
      <section>
        <h3 className="section-heading">올해의 핵심 요약</h3>
        <p className="body-text">{data.keySummary}</p>
      </section>
    </div>
  );
}
