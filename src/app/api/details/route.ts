import { callClaudeStream } from "@/lib/claude";
import { buildDetailsUser, detailsSystem } from "@/lib/prompts/details";
import { getOrComputeFiveElements } from "@/lib/fiveElements";
import type { FiveElements, MatchRequest } from "@/lib/types";

export const runtime = "nodejs";

interface DetailsBody extends MatchRequest {
  fiveElementsA?: FiveElements;
  fiveElementsB?: FiveElements;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as DetailsBody;
    if (!body?.personA || !body?.personB || !body?.relationship) {
      return Response.json({ error: "필수 입력이 누락되었습니다." }, { status: 400 });
    }

    // Stage 1에서 미리 계산된 오행이 있으면 사용, 없으면 계산
    const [elementsA, elementsB] = await Promise.all([
      body.fiveElementsA
        ? Promise.resolve(body.fiveElementsA)
        : getOrComputeFiveElements(body.personA),
      body.fiveElementsB
        ? Promise.resolve(body.fiveElementsB)
        : getOrComputeFiveElements(body.personB),
    ]);

    const userPrompt = buildDetailsUser(body, elementsA, elementsB);

    // 스트리밍으로 응답
    const messageStream = callClaudeStream({
      model: "claude-haiku-4-5",
      system: detailsSystem,
      user: userPrompt,
      maxTokens: 8000,
    });

    // SSE 스트림으로 텍스트 청크를 전달
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          let fullText = "";
          messageStream.on("text", (text) => {
            fullText += text;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "chunk", text })}\n\n`)
            );
          });

          await messageStream.finalMessage();

          // 최종 JSON 파싱 및 후처리
          const cleaned = fullText.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
          let result = JSON.parse(cleaned);

          // 오행 값 덮어쓰기
          result.saju = {
            ...result.saju,
            personA: { ...elementsA },
            personB: { ...elementsB },
          };

          // 연인이 아닌 경우 커플 전용 필드 제거
          if (body.relationship !== "연인") {
            delete result.datingStyle;
            delete result.marriageChildren;
          }

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "done", result })}\n\n`)
          );
          controller.close();
        } catch (err) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "error", error: "분석 결과 파싱 실패" })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("[/api/details]", err);
    return Response.json(
      { error: "상세 분석 생성 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
