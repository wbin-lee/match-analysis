"use client";

import type { DetailsResult, ZodiacBlock } from "@/lib/types";

function Person({ title, block, accent }: { title: string; block: ZodiacBlock; accent: "pink" | "purple" }) {
  const borderColor = accent === "pink" ? "rgba(232,120,154,0.22)" : "rgba(155,133,232,0.22)";
  const zodiacColor = accent === "pink" ? "#f5b8cc" : "#c4b5f8";

  return (
    <div
      className="rounded-xl border bg-surface-2 p-4"
      style={{ borderColor }}
    >
      <h4 className="mb-1 text-sm font-medium text-txt-2">{title}</h4>
      <p className="mb-3 font-serif text-lg font-bold" style={{ color: zodiacColor }}>{block.zodiac}</p>
      <ul className="space-y-1 text-sm text-txt-2">
        {block.traits.map((t, i) => (
          <li key={i} className="flex gap-2">
            <span style={{ color: zodiacColor }}>•</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Horoscope({ data }: { data: DetailsResult["horoscope"] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Person title="첫번째 사람" block={data.personA} accent="pink" />
        <Person title="두번째 사람" block={data.personB} accent="purple" />
      </div>
      <section>
        <h3 className="mb-3 font-serif text-base font-bold text-txt">조합 태그</h3>
        <div className="space-y-3">
          {data.combinationTags.map((c, i) => (
            <div
              key={i}
              className="rounded-lg border p-3"
              style={{
                background: "rgba(232,120,154,0.06)",
                borderColor: "rgba(232,120,154,0.2)",
              }}
            >
              <div className="mb-1 text-sm font-bold text-brand-light">#{c.tag}</div>
              <p className="text-sm leading-relaxed text-txt-2">{c.explanation}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
