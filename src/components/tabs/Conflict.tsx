"use client";

import type { DetailsResult } from "@/lib/types";

export default function Conflict({ data }: { data: DetailsResult["conflict"] }) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-base font-semibold text-slate-700">갈등 패턴과 해법</h3>
        <ul className="space-y-3">
          {data.patterns.map((p, i) => (
            <li key={i} className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="mb-1 text-sm font-bold text-brand-700">{p.name}</div>
              <p className="text-sm leading-relaxed text-slate-700">{p.solution}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold text-slate-700">황금률</h3>
        <ol className="list-decimal space-y-2 pl-6 text-sm text-slate-700">
          {data.goldenRules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
