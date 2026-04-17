import { NextResponse } from "next/server";
import { callClaude } from "@/lib/claude";
import { buildSummaryUser, summarySystem } from "@/lib/prompts/summary";
import type { MatchRequest, SummaryResult } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as MatchRequest;
    if (!body?.personA || !body?.personB || !body?.relationship) {
      return NextResponse.json({ error: "필수 입력이 누락되었습니다." }, { status: 400 });
    }

    const result = await callClaude<SummaryResult>({
      model: "claude-haiku-4-5",
      system: summarySystem,
      user: buildSummaryUser(body),
      maxTokens: 600,
    });

    const summary = (result.summary ?? []).slice(0, 5);
    const overallScore = Math.max(0, Math.min(100, Math.round(result.overallScore ?? 0)));

    return NextResponse.json({ overallScore, summary } satisfies SummaryResult);
  } catch (err) {
    console.error("[/api/summary]", err);
    return NextResponse.json(
      { error: "총평 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
