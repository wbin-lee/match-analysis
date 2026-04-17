"use client";

import type { SummaryResult } from "@/lib/types";

interface Props {
  result: SummaryResult;
  onViewDetails: () => void;
  detailsLoading: boolean;
}

export default function SummaryCard({ result, onViewDetails, detailsLoading }: Props) {
  return (
    <section className="animate-fadeUp card card-pink">
      <div className="mb-8 flex flex-col items-center">
        <h2 className="mb-4 font-serif text-lg font-bold text-txt">총평</h2>
        <div
          className="inline-flex flex-col items-center rounded-3xl px-14 py-6"
          style={{
            background: "linear-gradient(135deg, rgba(232,120,154,0.14), rgba(155,133,232,0.14))",
            border: "1px solid rgba(232,120,154,0.3)",
            boxShadow: "0 4px 24px rgba(232,120,154,0.1)",
          }}
        >
          <span className="gradient-text font-serif text-6xl font-extrabold">
            {result.overallScore}
          </span>
          <span className="mt-1.5 text-sm text-txt-3">/ 100</span>
        </div>
      </div>
      <ul className="mb-8 space-y-3 text-[15px] leading-[1.85] text-txt">
        {result.summary.map((line, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-0.5 select-none text-brand">•</span>
            <span className="text-txt-2">{line}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onViewDetails}
        disabled={detailsLoading}
        className="w-full rounded-xl py-3.5 font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          background: detailsLoading
            ? "#262042"
            : "linear-gradient(135deg, #e8789a, #9b85e8)",
        }}
      >
        {detailsLoading ? "상세 분석 생성 중..." : "자세히 보기 (MVP · 결제 비활성화)"}
      </button>
    </section>
  );
}
