import { NextResponse } from "next/server";
import { callClaude } from "@/lib/claude";
import { buildSummaryUser, summarySystem } from "@/lib/prompts/summary";
import { getOrComputeFiveElements } from "@/lib/fiveElements";
import type { MatchRequest, SummaryResult } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as MatchRequest;
    if (!body?.personA || !body?.personB || !body?.relationship) {
      return NextResponse.json({ error: "필수 입력이 누락되었습니다." }, { status: 400 });
    }

    // 오행 계산과 총평을 동시에 실행
    const [summaryResult, fiveElementsA, fiveElementsB] = await Promise.all([
      callClaude<SummaryResult>({
        model: "claude-haiku-4-5",
        system: summarySystem,
        user: buildSummaryUser(body),
        maxTokens: 600,
      }),
      getOrComputeFiveElements(body.personA),
      getOrComputeFiveElements(body.personB),
    ]);

    const summary = (summaryResult.summary ?? []).slice(0, 5);
    const overallScore = Math.max(0, Math.min(100, Math.round(summaryResult.overallScore ?? 0)));

    return NextResponse.json({
      overallScore,
      summary,
      fiveElementsA,
      fiveElementsB,
    } satisfies SummaryResult);
  } catch (err) {
    console.error("[/api/summary]", err);
    return NextResponse.json(
      { error: "총평 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
