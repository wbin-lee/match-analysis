# 궁합 분석

사주 · 별자리 · MBTI를 한 번에 보는 궁합 서비스

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom dark cosmic theme
- **Charts**: Recharts
- **AI**: Anthropic Claude API (`@anthropic-ai/sdk`)
- **Fonts**: Nanum Myeongjo (serif), Noto Sans KR (sans)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (TS + ESLint) |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## How It Works

Two-stage API flow for token control:

1. **Stage 1** (`POST /api/summary`) — Claude Haiku returns overall score + short summary. Fires on form submit.
2. **Stage 2** (`POST /api/details`) — Claude Sonnet returns full analysis for all tabs. Fires when user clicks "자세히 보기".

## Tabs

| Tab | Description |
|-----|-------------|
| 총평 | Radar chart, bar chart, overall summary |
| 사주(오행) | Five elements analysis with animated bars |
| 별자리 | Zodiac signs and combination tags |
| MBTI | Strengths and shared traits |
| 올해 함께하기 좋은 때 | Monthly compatibility calendar |
| 갈등 해결 | Conflict patterns and golden rules |
| 함께 하면 좋은 것 | Activities and travel recommendations |
| 행복의 비결 | Secrets to happiness |
| 연애 스타일 | Dating style (couples only) |
| 결혼 · 자녀운 | Marriage and children fortune (couples only) |

## Design

Dark cosmic theme with starfield background, pink/purple dual-accent system, frosted-glass tab bar, and gradient text effects. Inspired by [woobin-yeoul](https://github.com/wbin-lee/woobin-yeoul).
