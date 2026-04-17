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
      <div className="mb-6 flex flex-col items-center">
        <h2 className="mb-3 font-serif text-lg font-bold text-txt-2">총평</h2>
        <div
          className="inline-flex flex-col items-center rounded-3xl px-12 py-5"
          style={{
            background: "linear-gradient(135deg, rgba(232,120,154,0.12), rgba(155,133,232,0.12))",
            border: "1px solid rgba(232,120,154,0.3)",
          }}
        >
          <span className="gradient-text font-serif text-5xl font-extrabold">
            {result.overallScore}
          </span>
          <span className="mt-1 text-sm text-txt-3">/ 100</span>
        </div>
      </div>
      <ul className="mb-6 space-y-2 text-sm leading-relaxed text-txt">
        {result.summary.map((line, i) => (
          <li key={i} className="flex gap-2">
            <span className="select-none text-brand">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onViewDetails}
        disabled={detailsLoading}
        className="w-full rounded-xl py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          background: detailsLoading
            ? "#221e38"
            : "linear-gradient(135deg, #e8789a, #9b85e8)",
        }}
      >
        {detailsLoading ? "상세 분석 생성 중..." : "자세히 보기 (MVP · 결제 비활성화)"}
      </button>
    </section>
  );
}
