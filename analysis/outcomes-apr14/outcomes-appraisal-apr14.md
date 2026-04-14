# UFC Gym Operate — Outcomes Appraisal
**Date**: 2026-04-14
**Period**: March 16 (pilot launch) through April 13 (latest data)
**Author**: Matt Crowson
**Data Sources**: Call thread export (Apr 13, 613 threads), Week 1-2 summary (Mar 16-29)

---

## 1. Executive Summary

The Operate voice agent has scaled from 2 locations and 48 calls/week to **10 locations and 613 calls in a single day** in four weeks. Pickup rate has more than doubled from 15% to 39.2%. Zero critical system failures, zero negative member feedback incidents, and a 0.5% opt-out rate. These are strong infrastructure and reach metrics.

However, **conversation quality is the bottleneck**. Only 27% of connected calls produce real dialog. 97.5% of calls end with the member hanging up. Booking/scheduling conversions are near zero in the data. A double-pitch bug affects 68% of live conversations. The agent is reaching members at scale — the question is whether it's converting reach into outcomes.

---

## 2. Scale & Reach (Strong)

| Metric | Week 1 (Mar 16) | Week 2 (Mar 23) | Apr 13 (single day) | Trend |
|--------|-----------------|-----------------|---------------------|-------|
| Locations live | 2 | 2 | 10 | 5x expansion |
| Total calls | 48 | 82 | 613 | ~12x daily volume |
| Texts sent | 348 | 165 | — | SMS data not in Apr 13 export |
| Pick-up rate | 15.0% | 19.5% | 39.2% | 2.6x improvement |
| Connected calls | 7 | 16 | 240 | 34x |
| Voicemails | 41 | 53 | 335 | 100% include substantive message |

**Locations now live** (10 as of Apr 13):
| Location | Calls | Pickup Rate | Avg Connected Duration |
|----------|-------|-------------|----------------------|
| UFC Fit Wayne | 61 | 47.5% | 19s |
| UFC GYM Corona | 67 | 46.3% | 23s |
| UFC GYM Waikele | 64 | 43.8% | 25s |
| UFC GYM Rosemead | 67 | 43.3% | 58s |
| UFC GYM New Hyde Park | 66 | 40.9% | 55s |
| UFC Fit Centennial | 62 | 40.3% | 24s |
| UFC GYM Mililani | 54 | 35.2% | 37s |
| UFC GYM Torrance | 54 | 33.3% | 168s |
| UFC GYM Honolulu | 63 | 31.7% | 71s |
| UFC GYM Sunnyvale | 54 | 25.9% | 33s |

New locations (39.7% pickup) actually outperform the original pilot locations (37.2%), which suggests the platform generalizes well and the improvements made during W1-2 carried forward.

---

## 3. Conversation Quality (Needs Work)

### 3a. Engagement Depth

Of the 240 connected calls on Apr 13:

| Category | Count | % | Definition |
|----------|-------|---|-----------|
| Meaningful (>30s) | 56 | 23.3% | Member engaged in actual conversation |
| Medium (10-30s) | 144 | 60.0% | Brief exchange, often just greeting + hangup |
| Brief (<10s) | 40 | 16.7% | Picked up and immediately hung up |
| Real dialog (2+ member turns) | 65 | 27.1% | Member spoke substantively at least twice |

**The median spoke-to call is 18 seconds.** Most connected calls follow a pattern: member says "Hello?", agent delivers disclaimer + pitch, member hangs up. The agent is polite and on-script, but 73% of connected calls don't generate a real conversation.

### 3b. Call Endings

| Ending | Count | % |
|--------|-------|---|
| Member hung up | 235 | 97.9% |
| Clean close (agent-initiated) | 5 | 2.1% |

Almost no calls end with the agent wrapping up naturally. This is partly expected for outbound cold calls, but the 97.5% hangup rate suggests members aren't finding enough value to stay on the line.

### 3c. Outcome Signals

| Signal | Threads | % of All | % of Spoke-To |
|--------|---------|----------|---------------|
| Recovery service mentioned | 420 | 68.5% | — |
| Booking/scheduling language | 4 | 0.7% | 1.7% |
| Member-initiated info requests (pricing, hours) | 0 | 0.0% | 0.0% |
| SMS link sent during call | 4 | 0.7% | 1.7% |
| Opt-out keywords | 3 | 0.5% | — |
| Agent offered transfer/escalation | 1 | 0.2% | — |

**Recovery services are the campaign focus and they dominate the conversation topic.** But actual conversion signals are near zero. Most notably, **zero members asked follow-up questions about pricing, hours, or logistics** — they're not engaged enough to be curious. The agent presents recovery options; members either briefly acknowledge or hang up. This is the core quality gap.

---

## 4. Technical Issues Identified

### 4a. Double-Pitch Bug (HIGH — 68% of spoke-to calls)

In **164 of 240** connected calls, the agent says the opening pitch, then the recording disclaimer, then repeats the exact same opening pitch. Example:

> [JADE] Hi Sydney. Just wanted to check if you've tried any of our recovery services...
> [MEMBER] Hello?
> [JADE] Hey, it's Jade from UFC Gym. Quick heads-up, this call may be recorded.
> [JADE] Hi Sydney. Just wanted to check if you've tried any of our recovery services...

The member hears the same pitch twice. This burns ~10 seconds of attention and likely contributes to early hangups.

**Recommendation**: Fix the message sequencing so the disclaimer plays first, then the pitch plays once. This is likely the single highest-impact fix for conversation quality.

### 4b. "Important Message" Voicemail Fallback (MEDIUM — 12.7%)

In **78 of 613** threads, the agent says "hi, I have an important message for you" — this appears to be a fallback when voicemail detection is uncertain (carrier screening, call screening apps). It sounds spammy and doesn't match the brand voice.

**Recommendation**: Replace with a branded message or skip the pre-message entirely and go straight to the voicemail script.

### 4c. Narrow Calling Window (LOW but notable)

91% of Apr 13 calls happened in a single hour (19:00 UTC / ~12-1pm Pacific). The "Use Location Time Zone" Asana task (due Apr 17) should address this. Spreading calls across optimal hours per timezone should improve pickup rates further.

---

## 5. Trend Analysis: Week 1 → Week 2 → Apr 13

| Metric | W1 | W2 | Apr 13 | Trajectory |
|--------|----|----|--------|-----------|
| Pickup rate | 15.0% | 19.5% | 39.2% | Strong upward |
| SMS reply rate | 2.9% | 4.8% | — | Improving (W1-W2) |
| Locations | 2 | 2 | 10 | 5x |
| Daily call volume | ~10/day | ~16/day | 613/day | ~40x |
| System failures | 0 | 0 | 0 | Clean |
| Opt-outs | — | — | 0.5% | Very low |
| Escalations | — | — | 0.3% | Very low |

The pickup rate improvement from 15% to 39% is the standout metric. Possible drivers: agent voice switch (George → Jade), improved greeting flow, better call timing, larger/different member cohorts, or some combination.

---

## 6. What's Working

1. **Scale works.** 10 locations, 613 calls/day, zero failures. The platform generalizes.
2. **Pickup rate is strong.** 39.2% for outbound AI cold calls is well above industry benchmarks (~15-20% for human dialers).
3. **Opt-out rate is negligible.** 0.5% — members are not hostile to the outreach.
4. **Voicemails are substantive.** 100% of voicemails include a branded message with recovery service pitch.
5. **Agent handles declinations gracefully.** When members say "not interested," the agent responds politely without pushback.
6. **New locations match or beat original pilots.** No location-specific tuning required.
7. **Recovery campaign is on-message.** 68.5% of all conversations correctly center on recovery services.

---

## 7. What Needs Attention

### Critical
1. **Fix the double-pitch bug.** 68% of connected calls repeat the opening. This is likely the single biggest driver of early hangups and should be the #1 engineering priority.

### High
2. **Improve conversation-to-outcome conversion.** Only 1.7% of connected calls show booking signals and zero members asked follow-up questions about pricing or hours. The agent presents recovery options but members aren't curious enough to engage further. Hypotheses to test: (a) the opening pitch is too generic — try personalization based on member's visit history; (b) recovery services aren't what these members want — test different campaign topics; (c) the double-pitch bug is killing attention before the real conversation starts.
3. **Measure what matters.** Current data doesn't track: actual recovery service bookings, gym visits post-call, membership renewals, or revenue influenced. Without downstream outcome tracking, we can't prove ROI. The Apr 12 Early Attrition Results milestone should have provided some of this — need to capture those numbers.

### Medium
4. **Replace the "important message" fallback.** 12.7% of calls use a spammy-sounding fallback. Replace with branded voicemail intro.
5. **Spread calling hours.** Time-zone-aware scheduling (Ashton, due Apr 17) should improve pickup rates at Hawaii locations especially.
6. **Track clean call closings.** 97.9% member hangup rate is partly structural (outbound calls), but aim to increase agent-initiated clean closes to >10%.

### Low
7. **SMS data gap.** Apr 13 export doesn't include SMS threads — need to pull this for a complete picture of the text reply rate trend.

---

## 8. Comparison to Success Criteria

| Criteria (from brain) | Target | Actual | Status |
|----------------------|--------|--------|--------|
| Pilot live at corporate locations | Early March | Mar 16 (2 locations), Apr 13 (10 locations) | Exceeded |
| Call completion rate | TBD | 39.2% pickup (Apr 13) | Strong, no target set |
| Member retention improvement | Positive signal | 0.58% action vs 1.18% control (Mar 29 directional) | Early positive |
| Eval suite pass rate | High | 93% (81/87) | Strong |
| Zero system failures | Yes | Yes (4 weeks running) | Met |
| Franchise rollout | Pending promo data | Franchise go-live verification in progress (due Apr 17) | Progressing |

---

## 9. Recommendations for Next 2 Weeks

1. **Ship the double-pitch fix** — estimated largest single impact on conversation quality
2. **Pull Apr 12 attrition results** — this was a planned reporting milestone. We need the retention numbers to tell the ROI story.
3. **Add proactive SMS link during calls** — when member shows any interest, immediately text the booking link. Only 4/240 calls sent an SMS, should be much higher.
4. **Set concrete conversion targets** — e.g., "10% of connected calls result in a recovery service booking link sent" or "5% of called members book within 7 days"
5. **Get SMS data for Apr 13** — complete the outreach picture
6. **Build the downstream funnel** — connect call data to GymSales to track: called → booked → showed → retained

---

## Appendix: Data Methodology

- **Call data**: Full thread export from Apr 13, 2026 — 613 unique call threads, 4,039 message rows across 10 locations. Each thread includes all messages (system, outbound agent, inbound member), verdict, duration, and timestamp.
- **Week 1-2 data**: Summary statistics from second spreadsheet covering Mar 16-29 at Corona and Sunnyvale only.
- **Limitations**: Apr 13 data is a single day snapshot. SMS thread data not included in Apr 13 export. No downstream outcome data (bookings, visits, retention) available in either dataset. Churn data (0.58% action vs 1.18% control) is from Mar 29 status report, not refreshed.
