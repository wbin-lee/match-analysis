"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "@/components/InputForm";
import SummaryCard from "@/components/SummaryCard";
import type { DetailsResult, FiveElements, MatchRequest, SummaryResult } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [request, setRequest] = useState<MatchRequest | null>(null);
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [fiveElements, setFiveElements] = useState<{ a?: FiveElements; b?: FiveElements }>({});
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleSummary(req: MatchRequest) {
    setSummaryLoading(true);
    setError(null);
    setSummary(null);
    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "요청 실패");
      const data = (await res.json()) as SummaryResult;
      setRequest(req);
      setSummary(data);
      setFiveElements({ a: data.fiveElementsA, b: data.fiveElementsB });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSummaryLoading(false);
    }
  }

  async function handleDetails() {
    if (!request) return;
    setDetailsLoading(true);
    setStreamProgress(0);
    setError(null);
    try {
      const res = await fetch("/api/details", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...request,
          fiveElementsA: fiveElements.a,
          fiveElementsB: fiveElements.b,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "요청 실패");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("스트림을 읽을 수 없습니다.");

      const decoder = new TextDecoder();
      let buffer = "";
      let result: DetailsResult | null = null;
      let charCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = JSON.parse(line.slice(6));

          if (payload.type === "chunk") {
            charCount += payload.text.length;
            // 대략적인 진행률 (예상 5000자 기준)
            setStreamProgress(Math.min(95, Math.round((charCount / 5000) * 100)));
          } else if (payload.type === "done") {
            result = payload.result as DetailsResult;
            setStreamProgress(100);
          } else if (payload.type === "error") {
            throw new Error(payload.error);
          }
        }
      }

      if (!result) throw new Error("분석 결과를 받지 못했습니다.");

      sessionStorage.setItem("matchDetails", JSON.stringify(result));
      sessionStorage.setItem("matchRequest", JSON.stringify(request));
      router.push("/details");
    } catch (e) {
      setError((e as Error).message);
      setDetailsLoading(false);
    }
  }

  return (
    <main className="space-y-6">
      {!summary && (
        <InputForm onSubmit={handleSummary} loading={summaryLoading} />
      )}
      {summary && (
        <>
          <SummaryCard
            result={summary}
            onViewDetails={handleDetails}
            detailsLoading={detailsLoading}
            streamProgress={streamProgress}
          />
          {!detailsLoading && (
            <button
              onClick={() => {
                setSummary(null);
                setRequest(null);
                setFiveElements({});
              }}
              className="text-sm text-txt-3 underline transition hover:text-txt"
            >
              다시 입력하기
            </button>
          )}
        </>
      )}
      {error && (
        <div
          className="rounded-xl p-4 text-[14px]"
          style={{
            background: "rgba(232,120,90,0.12)",
            border: "1px solid rgba(232,120,90,0.25)",
            color: "#f5b09a",
          }}
        >
          {error}
        </div>
      )}
    </main>
  );
}
