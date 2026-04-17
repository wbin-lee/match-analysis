import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "궁합 분석",
  description: "사주 · 별자리 · MBTI를 한 번에 보는 궁합 서비스",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8 md:py-12">
          <header className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-700">
              <a href="/">궁합 분석</a>
            </h1>
            <span className="text-sm text-slate-500">사주 · 별자리 · MBTI</span>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
