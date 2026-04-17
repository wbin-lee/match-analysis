"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Tabs, { type TabDef } from "@/components/Tabs";
import Overall from "@/components/tabs/Overall";
import Saju from "@/components/tabs/Saju";
import Horoscope from "@/components/tabs/Horoscope";
import Mbti from "@/components/tabs/Mbti";
import Conflict from "@/components/tabs/Conflict";
import GoodTimes from "@/components/tabs/GoodTimes";
import GoodThings from "@/components/tabs/GoodThings";
import Happiness from "@/components/tabs/Happiness";
import DatingStyle from "@/components/tabs/DatingStyle";
import MarriageChildren from "@/components/tabs/MarriageChildren";
import type { DetailsResult, MatchRequest } from "@/lib/types";

export default function DetailsPage() {
  const router = useRouter();
  const [details, setDetails] = useState<DetailsResult | null>(null);
  const [request, setRequest] = useState<MatchRequest | null>(null);

  useEffect(() => {
    const d = sessionStorage.getItem("matchDetails");
    const r = sessionStorage.getItem("matchRequest");
    if (!d || !r) {
      router.replace("/");
      return;
    }
    setDetails(JSON.parse(d) as DetailsResult);
    setRequest(JSON.parse(r) as MatchRequest);
  }, [router]);

  const tabs = useMemo<TabDef[]>(() => {
    if (!details || !request) return [];
    const nameA = request.personA.name || "첫번째 사람";
    const nameB = request.personB.name || "두번째 사람";
    const names = { nameA, nameB };
    const base: TabDef[] = [
      { id: "overall", label: "총평", render: () => <Overall data={details.overall} names={names} /> },
      { id: "saju", label: "사주(오행)", render: () => <Saju data={details.saju} names={names} /> },
      { id: "horoscope", label: "별자리", render: () => <Horoscope data={details.horoscope} names={names} /> },
      { id: "mbti", label: "MBTI", render: () => <Mbti data={details.mbti} names={names} /> },
      { id: "goodTimes", label: "올해 함께하기 좋은 때", render: () => <GoodTimes data={details.goodTimes} /> },
      { id: "conflict", label: "갈등 해결", render: () => <Conflict data={details.conflict} /> },
      { id: "goodThings", label: "함께 하면 좋은 것", render: () => <GoodThings data={details.goodThings} /> },
      { id: "happiness", label: "행복의 비결", render: () => <Happiness data={details.happiness} /> },
    ];
    if (request.relationship === "연인") {
      if (details.datingStyle) {
        base.push({
          id: "datingStyle",
          label: "연애 스타일",
          render: () => <DatingStyle data={details.datingStyle!} names={names} />,
        });
      }
      if (details.marriageChildren) {
        base.push({
          id: "marriageChildren",
          label: "결혼 · 자녀운",
          render: () => <MarriageChildren data={details.marriageChildren!} />,
        });
      }
    }
    return base;
  }, [details, request]);

  if (!details || !request) {
    return <p className="text-center text-sm text-txt-3">불러오는 중...</p>;
  }

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-bold text-txt">
          상세 분석
          <span className="ml-2 text-sm font-normal text-txt-3">
            ({request.personA.name || "첫번째 사람"} × {request.personB.name || "두번째 사람"} · {request.relationship})
          </span>
        </h2>
        <button
          onClick={() => router.push("/")}
          className="text-sm text-txt-3 underline transition hover:text-txt-2"
        >
          처음으로
        </button>
      </div>
      <Tabs tabs={tabs} />
    </main>
  );
}
