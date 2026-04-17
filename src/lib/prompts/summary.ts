import type { MatchRequest } from "../types";

export const summarySystem = `당신은 한국의 궁합·사주·MBTI·별자리에 능통한 관계 분석 전문가입니다.
두 사람의 정보와 관계 유형을 받고, 간결한 **총평만** 반환합니다.
반드시 다음 스키마를 따르는 JSON만 출력하세요. 설명, 문자열 외 텍스트, 코드 펜스를 절대 포함하지 마세요.

스키마:
{
  "overallScore": <0~100 사이 정수>,
  "summary": [<한 문장(한국어)> * 최대 5개]
}

규칙:
- summary 배열은 정확히 3~5개의 간결한 한국어 문장.
- overallScore는 두 사람의 전반적 궁합을 나타내는 정수.
- 관계 유형(연인/친구/직장동료/가족/기타)에 맞는 어조로 작성.`;

export function buildSummaryUser(req: MatchRequest): string {
  const { personA, personB, relationship } = req;
  const renderPerson = (p: typeof personA, label: string) =>
    `[${label}]
이름: ${p.name}
생년월일: ${p.birthDate}
출생시간: ${p.birthTime}
성별: ${p.gender}
출생지: ${p.birthPlace}
MBTI: ${p.mbti}`;

  return `관계 유형: ${relationship}

${renderPerson(personA, "A")}

${renderPerson(personB, "B")}

위 두 사람에 대해 총평 JSON을 반환하세요.`;
}
