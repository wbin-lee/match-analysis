"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DetailsResult } from "@/lib/types";

export default function Overall({ data }: { data: DetailsResult["overall"] }) {
  return (
    <div className="space-y-8">
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <RadarChart data={data.radar}>
            <PolarGrid />
            <PolarAngleAxis dataKey="label" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="A" dataKey="personA" stroke="#ec4899" fill="#ec4899" fillOpacity={0.35} />
            <Radar name="B" dataKey="personB" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={data.categoryScores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#ec4899" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <section>
        <h3 className="mb-2 text-base font-semibold text-slate-700">핵심 요약</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {data.summary}
        </p>
      </section>
    </div>
  );
}
