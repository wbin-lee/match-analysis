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
      <div className="mb-4 -mx-4 overflow-x-auto px-4">
        <div className="flex gap-2 whitespace-nowrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                t.id === active
                  ? "bg-brand-600 text-white shadow"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        {current?.render()}
      </div>
    </div>
  );
}
