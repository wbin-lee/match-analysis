"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "@/components/InputForm";
import SummaryCard from "@/components/SummaryCard";
import type { DetailsResult, MatchRequest, SummaryResult } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [request, setRequest] = useState<MatchRequest | null>(null);
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
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
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSummaryLoading(false);
    }
  }

  async function handleDetails() {
    if (!request) return;
    setDetailsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/details", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "요청 실패");
      const data = (await res.json()) as DetailsResult;
      sessionStorage.setItem("matchDetails", JSON.stringify(data));
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
          />
          <button
            onClick={() => {
              setSummary(null);
              setRequest(null);
            }}
            className="text-sm text-txt-3 underline transition hover:text-txt"
          >
            다시 입력하기
          </button>
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
