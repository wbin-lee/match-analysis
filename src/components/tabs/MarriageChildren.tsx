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
        className="rounded-xl border p-6"
        style={{
          borderColor: "rgba(232,120,154,0.18)",
          background: "linear-gradient(145deg, #15122a, rgba(232,120,154,0.06))",
        }}
      >
        <h3 className="mb-3 font-serif text-base font-bold text-brand-light">결혼운</h3>
        <div className="mb-3 text-[15px]">
          <span className="font-medium text-txt-2">최적 시기: </span>
          <span className="font-semibold text-txt">{data.marriage.bestTiming}</span>
        </div>
        <p className="body-text">{data.marriage.rationale}</p>
      </section>
      <section
        className="rounded-xl border p-6"
        style={{
          borderColor: "rgba(155,133,232,0.18)",
          background: "linear-gradient(145deg, #15122a, rgba(155,133,232,0.06))",
        }}
      >
        <h3 className="mb-4 font-serif text-base font-bold text-purple-light">자녀운</h3>
        <dl className="grid gap-4 text-[15px] sm:grid-cols-2">
          <div>
            <dt className="text-[13px] font-medium text-txt-3">자녀 수</dt>
            <dd className="mt-0.5 text-txt">{data.children.count}</dd>
          </div>
          <div>
            <dt className="text-[13px] font-medium text-txt-3">성향</dt>
            <dd className="mt-0.5 text-txt">{data.children.tendencies}</dd>
          </div>
          <div>
            <dt className="text-[13px] font-medium text-txt-3">최적 출산 시기</dt>
            <dd className="mt-0.5 text-txt">{data.children.bestTiming}</dd>
          </div>
        </dl>
        <div className="mt-5 border-t border-border pt-4">
          <dt className="mb-1.5 text-[13px] font-medium text-txt-3">부모로서의 이야기</dt>
          <p className="body-text">{data.children.parentingStory}</p>
        </div>
      </section>
    </div>
  );
}
