"use client";

import type { DetailsResult } from "@/lib/types";

export default function GoodThings({ data }: { data: DetailsResult["goodThings"] }) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-base font-semibold text-slate-700">함께 하면 좋은 것들</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {data.activities.map((a, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200"
            >
              <span className="text-2xl">{a.emoji}</span>
              <div>
                <div className="text-sm font-semibold text-slate-700">{a.title}</div>
                <p className="text-xs text-slate-600">{a.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <TravelList title="국내" items={data.travel.domestic} />
        <TravelList title="해외" items={data.travel.international} />
      </section>
    </div>
  );
}

function TravelList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl bg-brand-50 p-4 ring-1 ring-brand-100">
      <h4 className="mb-2 text-sm font-semibold text-brand-700">추천 여행지 · {title}</h4>
      <ul className="space-y-1 text-sm text-slate-700">
        {items.map((t, i) => (
          <li key={i}>📍 {t}</li>
        ))}
      </ul>
    </div>
  );
}
