"use client";

import type { SummaryResult } from "@/lib/types";

interface Props {
  result: SummaryResult;
  onViewDetails: () => void;
  detailsLoading: boolean;
}

export default function SummaryCard({ result, onViewDetails, detailsLoading }: Props) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-slate-700">총평</h2>
        <span className="text-4xl font-extrabold text-brand-600">
          {result.overallScore}
          <span className="ml-1 text-base font-medium text-slate-500">/ 100</span>
        </span>
      </div>
      <ul className="mb-6 space-y-2 text-sm leading-relaxed text-slate-700">
        {result.summary.map((line, i) => (
          <li key={i} className="flex gap-2">
            <span className="select-none text-brand-500">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onViewDetails}
        disabled={detailsLoading}
        className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {detailsLoading ? "상세 분석 생성 중..." : "자세히 보기 (MVP · 결제 비활성화)"}
      </button>
    </section>
  );
}
