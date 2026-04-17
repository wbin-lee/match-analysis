"use client";

import type { DetailsResult } from "@/lib/types";

export default function MarriageChildren({
  data,
}: {
  data: NonNullable<DetailsResult["marriageChildren"]>;
}) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-brand-50 p-5 ring-1 ring-brand-100">
        <h3 className="mb-2 text-base font-bold text-brand-700">결혼운</h3>
        <div className="mb-2 text-sm">
          <span className="font-semibold text-slate-700">최적 시기: </span>
          <span className="text-slate-800">{data.marriage.bestTiming}</span>
        </div>
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {data.marriage.rationale}
        </p>
      </section>
      <section className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
        <h3 className="mb-3 text-base font-bold text-slate-700">자녀운</h3>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold text-slate-500">자녀 수</dt>
            <dd className="text-slate-800">{data.children.count}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-500">성향</dt>
            <dd className="text-slate-800">{data.children.tendencies}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-500">최적 출산 시기</dt>
            <dd className="text-slate-800">{data.children.bestTiming}</dd>
          </div>
        </dl>
        <div className="mt-4">
          <dt className="text-xs font-semibold text-slate-500">부모로서의 이야기</dt>
          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-700">
            {data.children.parentingStory}
          </p>
        </div>
      </section>
    </div>
  );
}
