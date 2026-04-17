"use client";

import type { DetailsResult } from "@/lib/types";

export default function GoodThings({ data }: { data: DetailsResult["goodThings"] }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="section-heading">함께 하면 좋은 것들</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {data.activities.map((a, i) => (
            <li
              key={i}
              className="card-inner flex items-start gap-3 transition hover:-translate-y-0.5"
            >
              <span className="text-2xl">{a.emoji}</span>
              <div>
                <div className="text-[15px] font-medium text-txt">{a.title}</div>
                <p className="mt-0.5 text-[13px] leading-relaxed text-txt-3">{a.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <TravelList title="국내" items={data.travel.domestic} accent="pink" />
        <TravelList title="해외" items={data.travel.international} accent="purple" />
      </section>
    </div>
  );
}

function TravelList({ title, items, accent }: { title: string; items: string[]; accent: "pink" | "purple" }) {
  const styles = accent === "pink"
    ? { borderColor: "rgba(232,120,154,0.18)", background: "linear-gradient(145deg, #15122a, rgba(232,120,154,0.06))", titleColor: "#f5b8cc" }
    : { borderColor: "rgba(155,133,232,0.18)", background: "linear-gradient(145deg, #15122a, rgba(155,133,232,0.06))", titleColor: "#c4b5f8" };

  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: styles.borderColor, background: styles.background }}
    >
      <h4 className="mb-3 text-sm font-bold" style={{ color: styles.titleColor }}>추천 여행지 · {title}</h4>
      <ul className="space-y-1.5 text-[14px] text-txt-2">
        {items.map((t, i) => (
          <li key={i}>📍 {t}</li>
        ))}
      </ul>
    </div>
  );
}
