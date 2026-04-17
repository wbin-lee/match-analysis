"use client";

import type { DetailsResult } from "@/lib/types";

export default function Conflict({ data }: { data: DetailsResult["conflict"] }) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 font-serif text-base font-bold text-txt">갈등 패턴과 해법</h3>
        <ul className="space-y-3">
          {data.patterns.map((p, i) => (
            <li
              key={i}
              className="rounded-lg border border-border bg-surface-2 p-4"
            >
              <div className="mb-1 text-sm font-bold text-brand-light">{p.name}</div>
              <p className="text-sm leading-relaxed text-txt-2">{p.solution}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="mb-3 font-serif text-base font-bold text-txt">황금률</h3>
        <ol className="list-decimal space-y-2 pl-6 text-sm text-txt-2">
          {data.goldenRules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
