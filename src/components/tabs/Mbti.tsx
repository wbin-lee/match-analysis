"use client";

import type { DetailsResult } from "@/lib/types";

export default function Mbti({ data }: { data: DetailsResult["mbti"] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {(["personA", "personB"] as const).map((key, i) => (
          <div key={key} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <h4 className="mb-3 text-sm font-semibold text-slate-700">
              {i === 0 ? "A" : "B"}의 강점
            </h4>
            <div className="flex flex-wrap gap-2">
              {data[key].strengths.map((s, j) => (
                <span
                  key={j}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <section>
        <h3 className="mb-2 text-base font-semibold text-slate-700">
          두 사람이 서로에게 주는 것
        </h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {data.shared}
        </p>
      </section>
    </div>
  );
}
