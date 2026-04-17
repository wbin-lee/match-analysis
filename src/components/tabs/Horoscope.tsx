"use client";

import type { DetailsResult, ZodiacBlock } from "@/lib/types";

function Person({ title, block }: { title: string; block: ZodiacBlock }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <h4 className="mb-1 text-sm font-semibold text-slate-700">{title}</h4>
      <p className="mb-3 text-lg font-bold text-brand-600">{block.zodiac}</p>
      <ul className="space-y-1 text-sm text-slate-700">
        {block.traits.map((t, i) => (
          <li key={i}>• {t}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Horoscope({ data }: { data: DetailsResult["horoscope"] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Person title="A" block={data.personA} />
        <Person title="B" block={data.personB} />
      </div>
      <section>
        <h3 className="mb-3 text-base font-semibold text-slate-700">조합 태그</h3>
        <div className="space-y-3">
          {data.combinationTags.map((c, i) => (
            <div key={i} className="rounded-lg bg-brand-50 p-3 ring-1 ring-brand-100">
              <div className="mb-1 text-sm font-bold text-brand-700">#{c.tag}</div>
              <p className="text-sm leading-relaxed text-slate-700">{c.explanation}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
