"use client";

import type { DetailsResult, Names } from "@/lib/types";

export default function Mbti({ data, names }: { data: DetailsResult["mbti"]; names: Names }) {
  const labels = [names.nameA, names.nameB];
  const accents = [
    { border: "rgba(232,120,154,0.18)", tagBg: "rgba(232,120,154,0.14)", tagColor: "#f5b8cc", tagBorder: "rgba(232,120,154,0.25)" },
    { border: "rgba(155,133,232,0.18)", tagBg: "rgba(155,133,232,0.14)", tagColor: "#c4b5f8", tagBorder: "rgba(155,133,232,0.25)" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        {(["personA", "personB"] as const).map((key, i) => (
          <div
            key={key}
            className="card-inner"
            style={{ borderColor: accents[i].border }}
          >
            <h4 className="mb-3 text-sm font-medium text-txt-2">
              {labels[i]}의 강점
            </h4>
            <div className="flex flex-wrap gap-2">
              {data[key].strengths.map((s, j) => (
                <span
                  key={j}
                  className="rounded-full px-3 py-1.5 text-[13px] font-medium"
                  style={{
                    background: accents[i].tagBg,
                    color: accents[i].tagColor,
                    border: `1px solid ${accents[i].tagBorder}`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <section>
        <h3 className="section-heading">두 사람이 서로에게 주는 것</h3>
        <p className="body-text">{data.shared}</p>
      </section>
    </div>
  );
}
