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
            <PolarGrid stroke="rgba(255,255,255,0.07)" />
            <PolarAngleAxis dataKey="label" tick={{ fontSize: 12, fill: "#c4bdd9" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#8a82a6" }} />
            <Radar name="첫번째 사람" dataKey="personA" stroke="#e8789a" fill="#e8789a" fillOpacity={0.25} />
            <Radar name="두번째 사람" dataKey="personB" stroke="#9b85e8" fill="#9b85e8" fillOpacity={0.2} />
            <Legend wrapperStyle={{ color: "#9b94b8" }} />
            <Tooltip
              contentStyle={{
                background: "#1c1830",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "#f4f0ff",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={data.categoryScores}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#c4bdd9" }} />
            <YAxis domain={[0, 100]} tick={{ fill: "#8a82a6" }} />
            <Tooltip
              contentStyle={{
                background: "#1c1830",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "#f4f0ff",
              }}
            />
            <Bar dataKey="score" fill="#e8789a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <section>
        <h3 className="mb-2 font-serif text-base font-bold text-txt">핵심 요약</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-txt-2">
          {data.summary}
        </p>
      </section>
    </div>
  );
}
