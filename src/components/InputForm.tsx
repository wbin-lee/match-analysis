"use client";

import { useState } from "react";
import type {
  Gender,
  MatchRequest,
  Person,
  Relationship,
} from "@/lib/types";

const GENDERS: Gender[] = ["남성", "여성", "기타"];
const RELATIONSHIPS: Relationship[] = ["연인", "친구", "직장동료", "가족", "기타"];
const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

function emptyPerson(): Person {
  return {
    name: "",
    birthDate: "",
    birthTime: "",
    gender: "여성",
    birthPlace: "",
    mbti: "INFP",
  };
}

interface Props {
  onSubmit: (req: MatchRequest) => void;
  loading: boolean;
}

export default function InputForm({ onSubmit, loading }: Props) {
  const [personA, setPersonA] = useState<Person>(emptyPerson());
  const [personB, setPersonB] = useState<Person>(emptyPerson());
  const [relationship, setRelationship] = useState<Relationship>("연인");

  function isValid(): boolean {
    const check = (p: Person) =>
      p.name.trim() && p.birthDate && p.birthTime && p.birthPlace.trim();
    return Boolean(check(personA) && check(personB));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid() || loading) return;
    onSubmit({ personA, personB, relationship });
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fadeUp space-y-6">
      <div className="card card-purple">
        <label className="mb-3 block text-sm font-medium text-txt">
          관계 유형
        </label>
        <div className="flex flex-wrap gap-2">
          {RELATIONSHIPS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRelationship(r)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                relationship === r
                  ? "bg-brand-dim font-medium text-brand-light"
                  : "text-txt-3 hover:bg-surface-2 hover:text-txt"
              }`}
              style={
                relationship === r
                  ? { border: "1px solid rgba(232,120,154,0.4)" }
                  : { border: "1px solid rgba(255,255,255,0.06)" }
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PersonFields title="첫번째 사람" value={personA} onChange={setPersonA} accent="pink" />
        <PersonFields title="두번째 사람" value={personB} onChange={setPersonB} accent="purple" />
      </div>

      <button
        type="submit"
        disabled={!isValid() || loading}
        className="w-full rounded-xl py-3.5 text-base font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          background: isValid() && !loading
            ? "linear-gradient(135deg, #e8789a, #9b85e8)"
            : "#262042",
        }}
      >
        {loading ? "분석 중..." : "궁합 분석하기"}
      </button>
    </form>
  );
}

function PersonFields({
  title,
  value,
  onChange,
  accent,
}: {
  title: string;
  value: Person;
  onChange: (p: Person) => void;
  accent: "pink" | "purple";
}) {
  const [unknownTime, setUnknownTime] = useState(value.birthTime === "모름");
  const [unknownPlace, setUnknownPlace] = useState(value.birthPlace === "모름");
  const patch = (p: Partial<Person>) => onChange({ ...value, ...p });
  const cardClass = accent === "pink" ? "card card-pink" : "card card-purple";
  const titleColor = accent === "pink" ? "text-brand-light" : "text-purple-light";
  const iconBg = accent === "pink"
    ? "bg-brand-dim border border-brand-border"
    : "bg-purple-dim border border-purple-border";

  return (
    <div className={cardClass}>
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${iconBg} ${titleColor}`}>
          {accent === "pink" ? "1" : "2"}
        </div>
        <h2 className={`font-serif text-lg font-bold ${titleColor}`}>{title}</h2>
      </div>
      <div className="space-y-4">
        <Field label="이름">
          <input
            className="input-dark"
            value={value.name}
            onChange={(e) => patch({ name: e.target.value })}
            placeholder="홍길동"
          />
        </Field>
        <Field label="생년월일">
          <input
            type="date"
            className="input-dark"
            value={value.birthDate}
            onChange={(e) => patch({ birthDate: e.target.value })}
          />
        </Field>
        <Field label="출생 시간">
          <div className="space-y-2">
            <input
              type="time"
              className="input-dark"
              value={unknownTime ? "" : value.birthTime}
              onChange={(e) => patch({ birthTime: e.target.value })}
              disabled={unknownTime}
              style={unknownTime ? { opacity: 0.4 } : undefined}
            />
            <label className="flex items-center gap-2 text-[13px] text-txt-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={unknownTime}
                onChange={(e) => {
                  setUnknownTime(e.target.checked);
                  patch({ birthTime: e.target.checked ? "모름" : "" });
                }}
                className="accent-brand"
              />
              모름
            </label>
          </div>
        </Field>
        <Field label="성별">
          <select
            className="input-dark"
            value={value.gender}
            onChange={(e) => patch({ gender: e.target.value as Gender })}
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </Field>
        <Field label="출생지">
          <div className="space-y-2">
            <input
              className="input-dark"
              value={unknownPlace ? "" : value.birthPlace}
              onChange={(e) => patch({ birthPlace: e.target.value })}
              placeholder="서울"
              disabled={unknownPlace}
              style={unknownPlace ? { opacity: 0.4 } : undefined}
            />
            <label className="flex items-center gap-2 text-[13px] text-txt-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={unknownPlace}
                onChange={(e) => {
                  setUnknownPlace(e.target.checked);
                  patch({ birthPlace: e.target.checked ? "모름" : "" });
                }}
                className="accent-brand"
              />
              모름
            </label>
          </div>
        </Field>
        <Field label="MBTI">
          <select
            className="input-dark"
            value={value.mbti}
            onChange={(e) => patch({ mbti: e.target.value })}
          >
            {MBTI_TYPES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </Field>
      </div>
      <style jsx>{`
        .input-dark {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.625rem 0.875rem;
          font-size: 0.9375rem;
          background: #1e1a38;
          color: #f8f5ff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-dark:focus {
          outline: none;
          border-color: rgba(232,120,154,0.5);
          box-shadow: 0 0 0 3px rgba(232,120,154,0.12);
        }
        .input-dark::placeholder {
          color: #a49cbd;
        }
        .input-dark option {
          background: #1e1a38;
          color: #f8f5ff;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-txt-2">{label}</span>
      {children}
    </label>
  );
}
