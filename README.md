# UFC GYM x Vi — Staff Resource Guide

Internal single-page app for UFC Gym staff using **Vi Engage** (Jade, the AI retention assistant). Covers onboarding, daily workflows, escalation handling, and FAQs.

## Stack

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS 4
- Static export (`next build` outputs to `out/`)

## Getting Started

```bash
npm install
npm run dev
```

## Tabs

| Tab | Content |
|-----|---------|
| Overview | What Vi Engage does, key stats, training links |
| How It Works | Who Jade calls, what she says, voicemails |
| Weekly Rhythm | Daily/weekly cadence, warm transfer steps |
| Escalations | Dashboard metrics, step-by-step resolution guide |
| FAQ | Common staff questions |
| Support | Team contacts |

## Deployment

Static export deployed to Vercel. Run `npm run build` to generate the `out/` directory.
