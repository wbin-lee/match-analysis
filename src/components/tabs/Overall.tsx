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
import type { DetailsResult, Names } from "@/lib/types";

export default function Overall({ data, names }: { data: DetailsResult["overall"]; names: Names }) {
  const combined = data.radar.map((r) => ({
    label: r.label,
    score: Math.round((r.personA + r.personB) / 2),
  }));

  return (
    <div className="space-y-8">
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <RadarChart data={combined}>
            <PolarGrid stroke="rgba(255,255,255,0.07)" />
            <PolarAngleAxis
              dataKey="label"
              tick={({ payload, x, y, textAnchor, ...rest }) => {
                const item = combined.find((c) => c.label === payload.value);
                return (
                  <text x={x} y={y} textAnchor={textAnchor} fill="#f4f0ff" fontSize={12} fontWeight={500} {...rest}>
                    {payload.value} <tspan fill="#f5b8cc" fontWeight={600}>{item?.score ?? ""}</tspan>
                  </text>
                );
              }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name={`${names.nameA} × ${names.nameB}`}
              dataKey="score"
              stroke="#e8789a"
              fill="url(#radarGradient)"
              fillOpacity={0.3}
            />
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8789a" />
                <stop offset="100%" stopColor="#9b85e8" />
              </linearGradient>
            </defs>
            <Legend wrapperStyle={{ color: "#c4bdd9" }} />
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
