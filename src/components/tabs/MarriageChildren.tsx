"use client";

import type { DetailsResult } from "@/lib/types";

export default function MarriageChildren({
  data,
}: {
  data: NonNullable<DetailsResult["marriageChildren"]>;
}) {
  return (
    <div className="space-y-6">
      <section
        className="rounded-xl border p-5"
        style={{
          borderColor: "rgba(232,120,154,0.22)",
          background: "linear-gradient(135deg, #141120, rgba(232,120,154,0.04))",
        }}
      >
        <h3 className="mb-2 font-serif text-base font-bold text-brand-light">결혼운</h3>
        <div className="mb-2 text-sm">
          <span className="font-medium text-txt-2">최적 시기: </span>
          <span className="text-txt">{data.marriage.bestTiming}</span>
        </div>
        <p className="whitespace-pre-line text-sm leading-relaxed text-txt-2">
          {data.marriage.rationale}
        </p>
      </section>
      <section
        className="rounded-xl border p-5"
        style={{
          borderColor: "rgba(155,133,232,0.22)",
          background: "linear-gradient(135deg, #141120, rgba(155,133,232,0.04))",
        }}
      >
        <h3 className="mb-3 font-serif text-base font-bold text-purple-light">자녀운</h3>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-txt-3">자녀 수</dt>
            <dd className="text-txt">{data.children.count}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-txt-3">성향</dt>
            <dd className="text-txt">{data.children.tendencies}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-txt-3">최적 출산 시기</dt>
            <dd className="text-txt">{data.children.bestTiming}</dd>
          </div>
        </dl>
        <div className="mt-4">
          <dt className="text-xs font-medium text-txt-3">부모로서의 이야기</dt>
          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-txt-2">
            {data.children.parentingStory}
          </p>
        </div>
      </section>
    </div>
  );
}
