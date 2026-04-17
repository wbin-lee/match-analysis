export type Gender = "남성" | "여성" | "기타";

export type Relationship =
  | "연인"
  | "친구"
  | "직장동료"
  | "가족"
  | "기타";

export interface Person {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: Gender;
  birthPlace: string;
  mbti: string;
}

export interface MatchRequest {
  personA: Person;
  personB: Person;
  relationship: Relationship;
}

export interface SummaryResult {
  overallScore: number;
  summary: string[];
}

export interface FiveElements {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
  computedAt?: string;
}

export interface RadarAxis {
  label: string;
  personA: number;
  personB: number;
}

export interface ZodiacBlock {
  zodiac: string;
  traits: string[];
}

export type MonthLevel = "나쁨" | "다소 나쁨" | "보통" | "좋음" | "매우 좋음";

export interface DetailsResult {
  overall: {
    radar: RadarAxis[];
    categoryScores: { label: string; score: number }[];
    summary: string;
  };
  saju: {
    personA: FiveElements;
    personB: FiveElements;
    analysis: string;
  };
  horoscope: {
    personA: ZodiacBlock;
    personB: ZodiacBlock;
    combinationTags: { tag: string; explanation: string }[];
  };
  mbti: {
    personA: { strengths: string[] };
    personB: { strengths: string[] };
    shared: string;
  };
  conflict: {
    patterns: { name: string; solution: string }[];
    goldenRules: string[];
  };
  goodTimes: {
    months: { month: number; level: MonthLevel }[];
    keySummary: string;
  };
  goodThings: {
    activities: { emoji: string; title: string; note: string }[];
    travel: { domestic: string[]; international: string[] };
  };
  happiness: {
    secrets: { title: string; explanation: string }[];
  };
  datingStyle?: {
    personA: string[];
    personB: string[];
    compatibility: {
      strengths: string;
      balance: string;
      improvements: string;
    };
  };
  marriageChildren?: {
    marriage: { bestTiming: string; rationale: string };
    children: {
      count: string;
      tendencies: string;
      bestTiming: string;
      parentingStory: string;
    };
  };
}
