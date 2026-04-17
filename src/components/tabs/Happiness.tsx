"use client";

import type { DetailsResult } from "@/lib/types";

const NUM_COLORS = [
  { bg: "rgba(232,120,154,0.12)", border: "rgba(232,120,154,0.2)", color: "#f5b8cc" },
  { bg: "rgba(155,133,232,0.12)", border: "rgba(155,133,232,0.2)", color: "#c4b5f8" },
  { bg: "rgba(94,207,176,0.12)", border: "rgba(94,207,176,0.2)", color: "#5ecfb0" },
  { bg: "rgba(240,168,58,0.12)", border: "rgba(240,168,58,0.2)", color: "#f0a83a" },
  { bg: "rgba(94,168,223,0.12)", border: "rgba(94,168,223,0.2)", color: "#7ec5f0" },
];

export default function Happiness({ data }: { data: DetailsResult["happiness"] }) {
  return (
    <ol className="space-y-4">
      {data.secrets.map((s, i) => {
        const c = NUM_COLORS[i % NUM_COLORS.length];
        return (
          <li key={i} className="rounded-xl border border-border bg-surface-2 p-4">
            <div className="mb-1 flex items-center gap-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}
              >
                {i + 1}
              </span>
              <h4 className="text-sm font-bold text-txt">{s.title}</h4>
            </div>
            <p className="whitespace-pre-line pl-9 text-sm leading-relaxed text-txt-2">
              {s.explanation}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
