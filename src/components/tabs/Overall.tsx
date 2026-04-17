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
    <div className="space-y-10">
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <RadarChart data={combined}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis
              dataKey="label"
              tick={({ payload, x, y, textAnchor, ...rest }) => {
                const item = combined.find((c) => c.label === payload.value);
                return (
                  <text x={x} y={y} textAnchor={textAnchor} fill="#f5b8cc" fontSize={13} fontWeight={500} {...rest}>
                     <tspan fill="#f5b8cc" fontWeight={600}>{payload.value} {item?.score ?? ""}</tspan>
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
            <Legend wrapperStyle={{ color: "#d5cfe8", fontSize: 13 }} />
            <Tooltip
              contentStyle={{
                background: "#1e1a38",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 10,
                color: "#f8f5ff",
                fontSize: 13,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={data.categoryScores.filter((c) => !/신뢰|trust|bond/i.test(c.label))}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="label" tick={{ fontSize: 13, fill: "#d5cfe8" }} />
            <YAxis domain={[0, 100]} tick={{ fill: "#a49cbd", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "#1e1a38",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 10,
                color: "#f8f5ff",
                fontSize: 13,
              }}
            />
            <Bar dataKey="score" fill="#e8789a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <section>
        <h3 className="section-heading">핵심 요약</h3>
        <p className="body-text">{data.summary}</p>
      </section>
    </div>
  );
}
