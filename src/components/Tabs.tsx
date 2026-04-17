"use client";

import { useState } from "react";

export interface TabDef {
  id: string;
  label: string;
  render: () => React.ReactNode;
}

export default function Tabs({ tabs }: { tabs: TabDef[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div
        className="sticky top-0 z-10 -mx-5 mb-5 px-5 py-3 md:-mx-8 md:px-8"
        style={{
          background: "rgba(10,9,16,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full px-4 py-2 text-[13px] transition ${
                t.id === active
                  ? "font-medium text-brand-light"
                  : "text-txt-3 hover:bg-surface-2 hover:text-txt"
              }`}
              style={
                t.id === active
                  ? {
                      background: "rgba(232,120,154,0.14)",
                      border: "1px solid rgba(232,120,154,0.35)",
                      boxShadow: "0 0 8px rgba(232,120,154,0.1)",
                    }
                  : { border: "1px solid rgba(255,255,255,0.05)" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="animate-fadeUp card">
        {current?.render()}
      </div>
    </div>
  );
}
