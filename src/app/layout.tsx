import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "궁합 분석",
  description: "사주 · 별자리 · MBTI를 한 번에 보는 궁합 서비스",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <div className="mx-auto min-h-screen w-full max-w-[860px] px-4 py-8 md:px-6 md:py-14">
          <header className="mb-10 flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold text-brand-light">
              <a href="/" className="transition hover:opacity-80">궁합 분석</a>
            </h1>
            <span className="text-sm text-txt-3">사주 · 별자리 · MBTI</span>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
