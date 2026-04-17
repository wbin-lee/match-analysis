"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SummaryCard from "@/components/SummaryCard";
import { mockDetails, mockRequest, mockSummary } from "@/lib/mock-data";

export default function TestPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"summary" | "loading">("summary");

  function handleViewDetails() {
    setPhase("loading");
    // simulate network delay then navigate
    setTimeout(() => {
      sessionStorage.setItem("matchDetails", JSON.stringify(mockDetails));
      sessionStorage.setItem("matchRequest", JSON.stringify(mockRequest));
      router.push("/details");
    }, 800);
  }

  return (
    <main className="space-y-6">
      <div
        className="rounded-lg border p-3 text-center text-xs text-txt-3"
        style={{ borderColor: "rgba(240,168,58,0.3)", background: "rgba(240,168,58,0.08)" }}
      >
        테스트 모드 — API 호출 없이 예시 데이터로 표시됩니다
      </div>

      <div className="card card-purple">
        <h3 className="mb-2 text-sm font-medium text-txt-2">입력 정보</h3>
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <PersonInfo label="A" person={mockRequest.personA} accent="pink" />
          <PersonInfo label="B" person={mockRequest.personB} accent="purple" />
        </div>
        <div className="mt-3 text-xs text-txt-3">
          관계: <span className="tag-pink tag">{mockRequest.relationship}</span>
        </div>
      </div>

      <SummaryCard
        result={mockSummary}
        onViewDetails={handleViewDetails}
        detailsLoading={phase === "loading"}
      />
    </main>
  );
}

function PersonInfo({
  label,
  person,
  accent,
}: {
  label: string;
  person: typeof mockRequest.personA;
  accent: "pink" | "purple";
}) {
  const color = accent === "pink" ? "#f5b8cc" : "#c4b5f8";
  return (
    <div>
      <span className="font-serif font-bold" style={{ color }}>{label}</span>
      <span className="ml-2 text-txt">{person.name}</span>
      <div className="mt-1 space-y-0.5 text-xs text-txt-3">
        <div>{person.birthDate} · {person.birthTime} · {person.birthPlace}</div>
        <div>{person.gender} · {person.mbti}</div>
      </div>
    </div>
  );
}
