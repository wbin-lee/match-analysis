import type { FiveElements, Person } from "./types";
import { personKey } from "./personKey";
import { callClaude } from "./claude";

// In-memory cache (sufficient for serverless — each cold start resets)
const memoryStore = new Map<string, FiveElements>();

export async function getOrComputeFiveElements(
  person: Person
): Promise<FiveElements> {
  const key = personKey(person);
  const cached = memoryStore.get(key);
  if (cached) return cached;

  const computed = await computeFiveElements(person);
  const record: FiveElements = { ...computed, computedAt: new Date().toISOString() };
  memoryStore.set(key, record);
  return record;
}

async function computeFiveElements(person: Person): Promise<FiveElements> {
  const system = `당신은 사주 명리학 전문가입니다. 입력된 사람의 생년월일시와 출생지를 바탕으로 오행(목·화·토·금·수)의 분포를 0에서 100 사이의 정수로 계산합니다. 합계가 정확히 100이 되도록 합니다. 설명 없이 JSON만 반환합니다.`;
  const user = `이름: ${person.name}
생년월일: ${person.birthDate}
출생시간: ${person.birthTime}
출생지: ${person.birthPlace}
성별: ${person.gender}

다음 형식의 JSON만 반환하세요:
{"wood": 0, "fire": 0, "earth": 0, "metal": 0, "water": 0}`;

  const parsed = await callClaude<FiveElements>({
    model: "claude-haiku-4-5",
    system,
    user,
    maxTokens: 200,
  });
  return {
    wood: Math.round(parsed.wood ?? 0),
    fire: Math.round(parsed.fire ?? 0),
    earth: Math.round(parsed.earth ?? 0),
    metal: Math.round(parsed.metal ?? 0),
    water: Math.round(parsed.water ?? 0),
  };
}
