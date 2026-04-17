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
        className="sticky top-0 z-10 -mx-4 mb-4 px-4 py-2"
        style={{
          background: "rgba(10,9,16,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                t.id === active
                  ? "font-medium text-brand-light"
                  : "text-txt-3 hover:bg-surface hover:text-txt-2"
              }`}
              style={
                t.id === active
                  ? {
                      background: "rgba(232,120,154,0.12)",
                      border: "1px solid rgba(232,120,154,0.4)",
                    }
                  : { border: "1px solid transparent" }
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
