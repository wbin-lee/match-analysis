"use client";

import type { DetailsResult, MonthLevel } from "@/lib/types";

const LEVEL_COLOR: Record<MonthLevel, string> = {
  "매우 좋음": "bg-emerald-500 text-white",
  "좋음": "bg-emerald-300 text-emerald-900",
  "보통": "bg-slate-200 text-slate-700",
  "다소 나쁨": "bg-amber-300 text-amber-900",
  "나쁨": "bg-rose-400 text-white",
};

export default function GoodTimes({ data }: { data: DetailsResult["goodTimes"] }) {
  const byMonth = new Map<number, MonthLevel>(
    data.months.map((m) => [m.month, m.level])
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
          const level = byMonth.get(m) ?? "보통";
          return (
            <div
              key={m}
              className="rounded-lg p-3 text-center shadow-sm ring-1 ring-slate-200"
            >
              <div className="text-xs text-slate-500">{m}월</div>
              <div
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_COLOR[level]}`}
              >
                {level}
              </div>
            </div>
          );
        })}
      </div>
      <section>
        <h3 className="mb-2 text-base font-semibold text-slate-700">올해의 핵심 요약</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {data.keySummary}
        </p>
      </section>
    </div>
  );
}
