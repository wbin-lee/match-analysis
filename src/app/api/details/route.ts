import { NextResponse } from "next/server";
import { callClaude } from "@/lib/claude";
import { buildDetailsUser, detailsSystem } from "@/lib/prompts/details";
import { getOrComputeFiveElements } from "@/lib/fiveElements";
import type { DetailsResult, MatchRequest } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as MatchRequest;
    if (!body?.personA || !body?.personB || !body?.relationship) {
      return NextResponse.json({ error: "필수 입력이 누락되었습니다." }, { status: 400 });
    }

    const [elementsA, elementsB] = await Promise.all([
      getOrComputeFiveElements(body.personA),
      getOrComputeFiveElements(body.personB),
    ]);

    const result = await callClaude<DetailsResult>({
      model: "claude-sonnet-4-6",
      system: detailsSystem,
      user: buildDetailsUser(body, elementsA, elementsB),
      maxTokens: 8000,
    });

    result.saju = {
      ...result.saju,
      personA: { ...elementsA },
      personB: { ...elementsB },
    };

    if (body.relationship !== "연인") {
      delete result.datingStyle;
      delete result.marriageChildren;
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/details]", err);
    return NextResponse.json(
      { error: "상세 분석 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
