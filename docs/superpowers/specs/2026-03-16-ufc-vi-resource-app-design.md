# UFC Gym + Vi Staff Resource App — Design Spec

## Summary

A single-page Next.js + Tailwind CSS web app deployed on Vercel. Serves as the operational reference guide for UFC Gym General Managers and front-desk staff using Vi Engage (George, the AI retention agent). Tabbed interface with 6 content sections mirroring Vi's onboarding collateral.

## Audience

UFC Gym GMs and staff who use Vi day-to-day. Not for prospects or corporate decision-makers.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (static export, `output: 'export'`)
- **Content**: Hardcoded in components (no CMS, no database)
- **State**: React `useState` for tab switching (no URL routing). Default tab: Overview. Page refresh resets to Overview (accepted behavior).
- **Fonts**: Use `next/font/google` for Inter
- **Images**: Use standard `<img>` tags (no `next/image` — incompatible with static export without custom loader). No API routes or server-side features.
- **Metadata**: Page title: "UFC GYM x Vi — Staff Resource Guide". Basic meta description for link previews.

## Assets

| Asset | Format | Source |
|-------|--------|--------|
| UFC GYM wordmark | SVG in `/public` | Recreated as styled text (bold italic "UFC" + condensed "GYM") if official SVG unavailable |
| Vi branding | Styled text | Rendered as "Vi" in Inter bold with gold accent |
| Training material links | URLs | `[TBD before deploy]` — placeholder href="#" during development |

## Project Structure

```
ufc-assistant/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page with tab controller
│   └── globals.css         # Tailwind + UFC brand tokens
├── components/
│   ├── Header.tsx          # UFC GYM + Vi co-brand logo bar
│   ├── TabNav.tsx          # Tab navigation bar
│   ├── tabs/
│   │   ├── Overview.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WeeklyRhythm.tsx
│   │   ├── Escalations.tsx
│   │   ├── FAQ.tsx
│   │   └── Support.tsx
│   └── ui/                 # Shared components (Card, Badge, etc.)
├── tailwind.config.ts
├── package.json
└── next.config.ts
```

## Visual Design

### Brand Tokens

| Token         | Value     | Usage                          |
|---------------|-----------|--------------------------------|
| Black         | #000000   | Header background              |
| Near-black    | #111111   | Page background                |
| Charcoal      | #1A1A1A   | Tab bar background             |
| Card          | #1E1E1E   | Content card backgrounds       |
| Card border   | #2A2A2A   | Subtle card borders            |
| White         | #FFFFFF   | Headings, active tab text      |
| Light gray    | #D1D5DB   | Body text                      |
| Muted gray    | #9CA3AF   | Inactive tab text              |
| Red           | #E40521   | CTAs, accent line, highlights  |
| Gold          | #C4A95A   | Secondary accent               |

### Typography

- **Headings**: Inter, bold/black weight, uppercase, wide tracking
- **Body**: Inter, regular weight
- **Stats/callouts**: Inter, bold, larger size

### Layout

- Max content width: `max-w-6xl` (1152px), centered
- Section padding: `py-10 px-6`
- Card padding: `p-6`, border-radius: `rounded-lg`, gap between cards: `gap-6`
- Header height: ~64px
- Footer height: ~48px

### UI Components

- **Card**: `bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6`. Used for feature cards, Q&A cards, step cards, contact cards.
- **NumberBadge**: Red circle (#E40521) with white bold number centered. Size: `w-8 h-8`. Used for numbered steps and Q&A items.
- **AccordionItem**: `<button>` with chevron icon, `aria-expanded` attribute. Clicking toggles content visibility. Multiple items can be open simultaneously. All start collapsed. Subtle slide-down animation (150ms ease).

### Accessibility

- Tab navigation uses `role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-selected`. Keyboard: left/right arrow to move focus between tabs, Home/End for first/last, Enter/Space to activate.
- Accordion uses `<button>` elements with `aria-expanded`
- All interactive elements use a visible focus ring
- Semantic HTML throughout

### Header

- Full-width black bar
- Left: UFC GYM logo (white) + "x Vi" co-brand text
- Right: "Staff Resource Guide" label (muted white)
- Thin red (#E40521) accent line along the bottom edge

### Tab Bar

- Dark charcoal (#1A1A1A) background, sits below header
- 6 tabs: Overview | How It Works | Weekly Rhythm | Escalations | FAQ | Support
- Active: white text, red underline indicator
- Inactive: muted gray (#9CA3AF), hover brightens to white
- Uppercase, semi-bold, tight tracking (`tracking-tight`)

### Content Area

- Near-black (#111111) background
- Content in dark charcoal cards (#1E1E1E) with subtle borders
- White uppercase headings, light gray body text
- Red for important callouts, gold for secondary emphasis
- Numbered steps use red number badges

### Footer

- Minimal black bar
- "Powered by Vi Engage" + support email link

### Responsive Behavior

- Tabs: horizontal scroll on mobile with a subtle fade/gradient on the trailing edge to indicate more tabs off-screen
- Cards: stack single-column below `md` breakpoint

## Tab Content

### 1. Overview

- Hero stat: "28.6% of fitness members churn every year"
- What is Vi Engage: 2-3 sentence intro paragraph
- Three feature cards (row on desktop, stacked on mobile):
  - Proactive Outreach
  - Personalized Conversations
  - Smart Handoff
- Training materials: outbound links to call demo, overview pages, dashboard walkthrough

### 2. How It Works

- 4 numbered Q&A cards:
  1. Who does George call? — active members with early churn signals, ~300/week
  2. What does George talk about? — amenities, programs/offerings, recovery services (location-tailored)
  3. Will George leave voicemails? — yes, ~1 in 3 calls, professional on-topic messages
  4. What happens after a call? — re-engaged members removed from workflow, escalations appear in dashboard next morning

### 3. Weekly Rhythm

- Three cards in a horizontal row (stacked on mobile), each with a time-based heading badge and description. Connected visually by a subtle horizontal line/rail between them on desktop:
  - **Daily (2 min)**: check overnight escalations, call back pending members, glance at results
  - **1-4pm Central**: live feed of calls in real time, handle up to 20 escalations/week
  - **End of Week**: check Scorecard, celebrate saved members, send feedback to Vi team
- Warm Transfers callout box:
  - Member put on hold with music
  - GM answers, presses 1 to initiate
  - Call summary begins
  - Press 1 to join the conference

### 4. Escalations

- Step-by-step numbered guide:
  1. Log into dashboard
  2. Check "Today's Calls" — how many calls George has made
  3. Click "Take Action" on any escalation
  4. Click "Resolve in GymSales" — opens member's GymSales profile
  5. Select the member's phone number and call
  6. Choose an outcome: Spoke to / No answer / Left message
  7. If spoke to member, leave notes
- Dashboard metrics callout: "Today's Calls" count + "Ops Efficiency" (hours saved)
- Escalation triggers: request to speak to human, billing/cancellation mention, detected frustration, unanswered warm transfers

### 5. FAQ

- Accordion-style expand/collapse Q&A:
  1. **Can members tell George is AI?** — Yes, full disclosure at start of every call
  2. **What if a member asks to cancel?** — George never processes cancellations; listens, empathizes, escalates with full context
  3. **Can I change George's scripts?** — Not directly, but flag feedback to engage@viengage.co for same-day changes
  4. **Will George replace my staff?** — No; handles routine retention outreach so staff focus on tours, sales, and high-value interactions

### 6. Support

- Contact cards:
  - Ashton — `[TBD: role and contact before deploy]`
  - Katie Sutherland — `[TBD: role and contact before deploy]`
- Email: engage@viengage.co
- Feedback prompt: "Flag anything — tone, topics, or location-specific details"

## Out of Scope

- Authentication / login
- CMS or database
- Video embedding (links out only)
- Multi-page routing
- Analytics / tracking (can be added later)
