"use client";

import type { DetailsResult } from "@/lib/types";

export default function Happiness({ data }: { data: DetailsResult["happiness"] }) {
  return (
    <ol className="space-y-4">
      {data.secrets.map((s, i) => (
        <li key={i} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="mb-1 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
              {i + 1}
            </span>
            <h4 className="text-sm font-bold text-slate-800">{s.title}</h4>
          </div>
          <p className="whitespace-pre-line pl-9 text-sm leading-relaxed text-slate-700">
            {s.explanation}
          </p>
        </li>
      ))}
    </ol>
  );
}
