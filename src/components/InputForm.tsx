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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-slate-200">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          관계 유형
        </label>
        <div className="flex flex-wrap gap-2">
          {RELATIONSHIPS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRelationship(r)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                relationship === r
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PersonFields title="A" value={personA} onChange={setPersonA} />
        <PersonFields title="B" value={personB} onChange={setPersonB} />
      </div>

      <button
        type="submit"
        disabled={!isValid() || loading}
        className="w-full rounded-xl bg-brand-600 py-3 text-base font-semibold text-white shadow-md transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
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
}: {
  title: string;
  value: Person;
  onChange: (p: Person) => void;
}) {
  const patch = (p: Partial<Person>) => onChange({ ...value, ...p });
  return (
    <div className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 text-lg font-bold text-brand-700">{title}</h2>
      <div className="space-y-3">
        <Field label="이름">
          <input
            className="input"
            value={value.name}
            onChange={(e) => patch({ name: e.target.value })}
            placeholder="홍길동"
          />
        </Field>
        <Field label="생년월일">
          <input
            type="date"
            className="input"
            value={value.birthDate}
            onChange={(e) => patch({ birthDate: e.target.value })}
          />
        </Field>
        <Field label="출생 시간">
          <input
            type="time"
            className="input"
            value={value.birthTime}
            onChange={(e) => patch({ birthTime: e.target.value })}
          />
        </Field>
        <Field label="성별">
          <select
            className="input"
            value={value.gender}
            onChange={(e) => patch({ gender: e.target.value as Gender })}
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </Field>
        <Field label="출생지">
          <input
            className="input"
            value={value.birthPlace}
            onChange={(e) => patch({ birthPlace: e.target.value })}
            placeholder="서울"
          />
        </Field>
        <Field label="MBTI">
          <select
            className="input"
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
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(226 232 240);
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          background: white;
        }
        .input:focus {
          outline: 2px solid rgb(236 72 153);
          outline-offset: 1px;
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
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}
