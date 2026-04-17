import type { FiveElements, MatchRequest } from "../types";

export const detailsSystem = `당신은 한국의 사주·별자리·MBTI·관계 심리학에 정통한 관계 분석가입니다.
두 사람의 정보, 관계 유형, 사전 계산된 오행 값을 받아 탭별 상세 보고서를 작성합니다.
반드시 아래 JSON 스키마를 따르는 JSON 객체만 출력하세요. 설명, 코드 펜스, 한국어 외의 불필요한 텍스트는 금지합니다. 모든 문자열은 한국어로 작성하세요.

스키마(필수 필드):
{
  "overall": {
    "radar": [
      {"label": "가치관", "personA": 0-100, "personB": 0-100},
      {"label": "오행", "personA": 0-100, "personB": 0-100},
      {"label": "신뢰", "personA": 0-100, "personB": 0-100},
      {"label": "별자리", "personA": 0-100, "personB": 0-100},
      {"label": "공감", "personA": 0-100, "personB": 0-100},
      {"label": "띠", "personA": 0-100, "personB": 0-100},
      {"label": "갈등관리", "personA": 0-100, "personB": 0-100},
      {"label": "삶의지향", "personA": 0-100, "personB": 0-100}
    ],
    "categoryScores": [ {"label": "...", "score": 0-100} * 6~8개 ],
    "summary": "최대 5줄 한국어 총평"
  },
  "saju": {
    "personA": {"wood":0,"fire":0,"earth":0,"metal":0,"water":0},
    "personB": {"wood":0,"fire":0,"earth":0,"metal":0,"water":0},
    "analysis": "오행 비교 분석(한국어)"
  },
  "horoscope": {
    "personA": {"zodiac":"...","traits":["...","..."]},
    "personB": {"zodiac":"...","traits":["...","..."]},
    "combinationTags": [ {"tag":"물의 삼각","explanation":"..."} * 2~4개 ]
  },
  "mbti": {
    "personA": {"strengths": [<약 4단어> * 4]},
    "personB": {"strengths": [<약 4단어> * 4]},
    "shared": "두 사람이 서로에게 주는 것과 고유한 관계성을 4~5줄로 정리"
  },
  "conflict": {
    "patterns": [ {"name":"...","solution":"..."} * 3~4개 ],
    "goldenRules": [<한 문장> * 3]
  },
  "goodTimes": {
    "months": [ {"month":1-12,"level":"매우 좋음|좋음|보통|다소 나쁨|나쁨"} * 12 ],
    "keySummary": "올해의 핵심 요약(한국어)"
  },
  "goodThings": {
    "activities": [ {"emoji":"🎨","title":"...","note":"한 줄 설명"} * 5~10 ],
    "travel": {"domestic": ["...","..."], "international": ["...","..."]}
  },
  "happiness": {
    "secrets": [ {"title":"...","explanation":"2~3줄 한국어 설명"} * 7 ]
  }
}

관계 유형이 "연인"인 경우 다음 두 필드를 반드시 추가합니다:
{
  "datingStyle": {
    "personA": [<한국어 4개 요약>],
    "personB": [<한국어 4개 요약>],
    "compatibility": {
      "strengths": "강점 설명",
      "balance": "균형 포인트",
      "improvements": "개선할 점"
    }
  },
  "marriageChildren": {
    "marriage": {"bestTiming":"최적 시기","rationale":"사주 근거"},
    "children": {
      "count":"자녀 수 전망",
      "tendencies":"자녀 성향",
      "bestTiming":"최적 출산 시기",
      "parentingStory":"두 사람의 부모로서 이야기"
    }
  }
}

관계 유형이 "연인"이 아니면 datingStyle/marriageChildren 필드를 포함하지 마세요.

중요: 모든 텍스트 필드(analysis, summary, shared, solution, explanation 등)에서 두 사람을 지칭할 때 반드시 실제 이름을 사용하세요. "A", "B"라고 쓰지 마세요.`;

export function buildDetailsUser(
  req: MatchRequest,
  elementsA: FiveElements,
  elementsB: FiveElements
): string {
  const { personA, personB, relationship } = req;
  const renderPerson = (p: typeof personA, label: string) =>
    `[${label}]
이름: ${p.name}
생년월일: ${p.birthDate}
출생시간: ${p.birthTime}
성별: ${p.gender}
출생지: ${p.birthPlace}
MBTI: ${p.mbti}`;

  const renderElements = (fe: FiveElements, label: string) =>
    `${label} 오행: 목 ${fe.wood} / 화 ${fe.fire} / 토 ${fe.earth} / 금 ${fe.metal} / 수 ${fe.water}`;

  return `관계 유형: ${relationship}

${renderPerson(personA, personA.name || "첫번째 사람")}

${renderPerson(personB, personB.name || "두번째 사람")}

사전 계산된 오행 값(이 값을 그대로 saju.personA/personB에 사용하고, 해석에도 이 수치와 일치하게 서술하세요):
${renderElements(elementsA, personA.name || "첫번째 사람")}
${renderElements(elementsB, personB.name || "두번째 사람")}

위 정보를 바탕으로 전체 상세 보고서 JSON을 반환하세요.`;
}
