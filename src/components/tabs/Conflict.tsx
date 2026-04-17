"use client";

import type { DetailsResult } from "@/lib/types";

export default function Conflict({ data }: { data: DetailsResult["conflict"] }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="section-heading">갈등 패턴과 해법</h3>
        <ul className="space-y-3">
          {data.patterns.map((p, i) => (
            <li key={i} className="card-inner">
              <div className="mb-2 text-[15px] font-bold text-brand-light">{p.name}</div>
              <p className="text-[14px] leading-[1.85] text-txt-2">{p.solution}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="section-heading">황금률</h3>
        <ol className="list-decimal space-y-2.5 pl-6 text-[15px] leading-[1.85] text-txt-2">
          {data.goldenRules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
