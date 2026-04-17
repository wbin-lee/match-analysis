import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "궁합 분석",
  description: "사주 · 별자리 · MBTI를 한 번에 보는 궁합 서비스",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans">
        <div className="mx-auto min-h-screen w-full max-w-[860px] px-5 pt-4 pb-10 md:px-8 md:pt-6 md:pb-16">
          <header className="mb-12 flex items-center justify-between">
            <h1 className="font-serif text-[26px] font-bold tracking-wide">
              <a href="/" className="gradient-text transition hover:opacity-80">Chemistry Lab.</a>
            </h1>
            <span className="text-[13px] tracking-wide text-txt-3">궁합 연구소</span>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
