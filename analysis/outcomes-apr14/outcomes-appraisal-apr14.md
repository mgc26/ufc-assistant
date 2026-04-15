# UFC Gym Operate — Outcomes Appraisal (Revised)
**Date**: 2026-04-15 (revision of April 14 analysis)
**Period**: March 16 (pilot launch) through April 13 (latest data)
**Author**: Matt Crowson
**Data Sources**: Call thread export (Apr 13, 613 threads), Week 1-2 summary (Mar 16-29)

---

## 1. Executive Summary

The Operate voice agent has scaled from 2 locations and 48 calls/week to **10 locations and 613 calls in a single day** in four weeks. Pickup rate has more than doubled from 15% to 39.2% — at the top of the "excellent" range for warm outbound calling. Zero critical system failures, zero negative member feedback incidents, and a 0.5% opt-out rate. These are strong infrastructure and reach metrics.

However, **conversation quality is the critical gap**. Only 27% of connected calls produce real dialog — well below the 60-75% connect-to-conversation rate benchmarked even for cold outbound (Auto Interview AI, 2026). Booking/scheduling conversions are near zero. 97.9% of calls end with the member hanging up. The agent is reaching members at scale — the question is whether it's converting reach into outcomes.

A **natural experiment** offers the clearest path forward: calls that pass through carrier call screening have a **48.7% success rate vs 7.0%** for unscreened calls (Fisher's exact test: OR ≈ 12.7, p < 10⁻⁸). Call screening forces the agent through an accidental re-greeting sequence that works better than the current default opening. Deliberately restructuring the opening to mimic this flow is the highest-priority fix.

---

## 2. Scale & Reach (Strong)

| Metric | Week 1 (Mar 16) | Week 2 (Mar 23) | Apr 13 (single day) | Trend |
|--------|-----------------|-----------------|---------------------|-------|
| Locations live | 2 | 2 | 10 | 5x expansion |
| Total calls | 48 | 82 | 613 | See note below |
| Texts sent | 348 | 165 | — | SMS data not in Apr 13 export |
| Pick-up rate | 15.0% | 19.5% | 39.2% | 2.6x improvement |
| Connected calls | 7 | 16 | 240 | 34x |
| Voicemails | 41 | 53 | 335 | 100% include substantive message |
| Per-location daily rate | ~3.4/day | ~5.9/day | ~61/day | Campaign batch size increase |

> **Trend table note:** W1 and W2 are *week totals* from 2 locations. Apr 13 is a *single day* from 10 locations. Volume increase is driven primarily by (a) 5x location expansion and (b) larger daily call batches per location, not organic growth. Per-location daily rate normalizes for this.

**Locations now live** (10 as of Apr 13):
| Location | Calls | Pickup Rate | Avg Connected Duration | 95% CI on Pickup |
|----------|-------|-------------|----------------------|------------------|
| UFC Fit Wayne | 61 | 47.5% | 19s | ±12.5pp |
| UFC GYM Corona | 67 | 46.3% | 23s | ±11.9pp |
| UFC GYM Waikele | 64 | 43.8% | 25s | ±12.2pp |
| UFC GYM Rosemead | 67 | 43.3% | 58s | ±11.9pp |
| UFC GYM New Hyde Park | 66 | 40.9% | 55s | ±11.9pp |
| UFC Fit Centennial | 62 | 40.3% | 24s | ±12.2pp |
| UFC GYM Mililani | 54 | 35.2% | 37s | ±12.7pp |
| UFC GYM Torrance | 54 | 33.3% | 168s | ±12.6pp |
| UFC GYM Honolulu | 63 | 31.7% | 71s | ±11.5pp |
| UFC GYM Sunnyvale | 54 | 25.9% | 33s | ±11.7pp |

> **Sample size caveat:** At 54-67 calls per location, most pickup rate confidence intervals overlap substantially. Do not take location-specific actions based on a single day's data. The top-to-bottom spread (25.9% to 47.5%) is directional, not conclusive.

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

**SOTA benchmark comparison:** The 27.1% real dialog rate is significantly below published benchmarks. Auto Interview AI (2026) reports a 60-75% connect-to-conversation rate for *cold* outbound calls. For warm outbound to existing members, the bar should be higher. This indicates a fundamental issue with the opening sequence or campaign relevance, not just normal attrition.

### 3b. Call Endings

| Ending | Count | % |
|--------|-------|---|
| Member hung up | 235 | 97.9% |
| Clean close (agent-initiated) | 5 | 2.1% |

Almost no calls end with the agent wrapping up naturally. This is partly expected for outbound cold calls, but the 97.9% hangup rate suggests members aren't finding enough value to stay on the line.

### 3c. Outcome Signals

| Signal | Threads | % of All | % of Spoke-To |
|--------|---------|----------|---------------|
| Recovery service mentioned | 420 | 68.5% | — |
| Booking/scheduling language | 4 | 0.7% | 1.7% |
| Member-initiated info requests (pricing, hours) | 0 | 0.0% | 0.0% |
| SMS link sent during call | 4 | 0.7% | 1.7% |
| Opt-out keywords | 3 | 0.5% | — |
| Agent offered transfer/escalation | 1 | 0.2% | — |

**Recovery services are the campaign focus and they dominate the conversation topic.** But actual conversion signals are near zero — and critically, **below even worst-case cold-calling benchmarks** (2.3-2.7% meeting conversion per industry data). Zero members asked follow-up questions about pricing, hours, or logistics — they're not engaged enough to be curious. The agent presents recovery options; members either briefly acknowledge or hang up. This is the core quality gap.

### 3d. Effective Contact Rate

Applying the 27.1% real-dialog rate to the 39.2% pickup yields an **effective contact rate of ~10.6%** — the proportion of all calls that reach a meaningful conversation. This is in line with industry norms for outbound programs, not above them. The story is not "pickup is great, quality is the bottleneck" — it's that the effective reach is normal, and the conversation quality within that reach needs improvement.

---

## 4. Technical Issues Identified

### 4a. Data Artifact: Transcript Threading (Resolved — Not a Real Bug)

Early analysis identified what appeared to be a "double-pitch bug" in 68% of connected calls, where the agent's opening message appeared to repeat after the disclaimer. **This was a transcript threading artifact** — the call recording system logs the opening message twice in the thread data, but the member only hears it once.

This artifact was initially flagged as the #1 critical engineering fix. Removing it from the analysis shifts the root cause diagnosis: the conversation quality gap cannot be attributed to a specific bug and instead points to structural issues with the opening sequence and campaign relevance (see Section 5).

> **Methodology lesson:** This artifact underscores the importance of validating transcript-level findings against actual call audio. The literature confirms this risk: Zelasko et al. (2021) found that transcript quality issues (punctuation, diarization) degrade dialog act classification more than taxonomy choice. Pipeline artifacts can produce convincing but false behavioral findings.

### 4b. "Important Message" Voicemail Fallback (MEDIUM — 12.7%)

In **78 of 613** threads, the agent says "hi, I have an important message for you" — this appears to be a fallback when voicemail detection is uncertain (carrier screening, call screening apps). It sounds spammy and doesn't match the brand voice.

**Root cause:** 90.7% (39/43 in voicemail threads) triggered by the same carrier screening prompt: "Hi. If you record your name and reason for calling, I'll see if this person is available." This is a carrier-level call screener, not a real voicemail.

**Recommendation**: Replace with a branded message or skip the pre-message entirely and go straight to the voicemail script.

### 4c. Narrow Calling Window (LOW but notable)

91% of Apr 13 calls happened in a single hour (19:00 UTC / ~12-1pm Pacific). The "Use Location Time Zone" Asana task (due Apr 17) should address this. Spreading calls across optimal hours per timezone should improve pickup rates further — and would provide data on whether time-of-day affects conversation quality, not just pickup rates.

---

## 5. Call Screening Natural Experiment (Key Finding)

The strongest actionable finding in this analysis is an accidental natural experiment.

**Calls that pass through carrier call screening have dramatically better outcomes:**

| Metric | Screened Calls | Unscreened Calls | Difference |
|--------|---------------|-----------------|------------|
| Success rate (>30s + 2+ turns) | 48.7% | 7.0% | 7x |
| Fisher's exact test | OR ≈ 12.7 | p < 10⁻⁸ | Highly significant |

**Why this happens:** Call screening forces the agent through a different opening path. The screening prompt ("If you record your name...") triggers a re-greeting sequence where the agent identifies itself more naturally before launching into the pitch. The unscreened path goes directly into pitch → disclaimer, which sounds robotic and triggers immediate hangups.

**What this means:** The opening sequence is the primary lever for conversation quality. The difference between the screened and unscreened paths is a ~7x improvement in success rate. Deliberately restructuring the default opening to mimic the screened flow (greeting → disclaimer → pitch, with a natural pause after the member answers) is the highest-impact change available.

This finding is statistically robust (p < 10⁻⁸) and does not depend on the double-pitch artifact, which was a separate issue in the transcript data.

---

## 6. Trend Analysis: Week 1 → Week 2 → Apr 13

| Metric | W1 | W2 | Apr 13 | Trajectory |
|--------|----|----|--------|-----------|
| Pickup rate | 15.0% | 19.5% | 39.2% | Strong upward |
| SMS reply rate | 2.9% | 4.8% | — | Improving (W1-W2) |
| Locations | 2 | 2 | 10 | 5x |
| Per-location daily volume | ~3.4 | ~5.9 | ~61 | Batch size increase |
| System failures | 0 | 0 | 0 | Clean |
| Opt-outs | — | — | 0.5% | Very low |
| Escalations | — | — | 0.3% | Very low |

The pickup rate improvement from 15% to 39% is the standout metric. Possible drivers: agent voice switch (George → Jade), improved greeting flow, better call timing, larger/different member cohorts, or some combination. The volume increase is primarily a campaign scheduling change (larger batches per location), not organic growth.

---

## 7. What's Working

1. **Scale works.** 10 locations, 613 calls/day, zero failures. The platform generalizes.
2. **Pickup rate is strong for warm outbound.** 39.2% is at the top of the "excellent" range (30-40%) for warm outbound to existing customers (JustCall, 2025). This is the right benchmark class — not cold outbound to strangers (where 15-20% is typical).
3. **Opt-out rate is negligible.** 0.5% — members are not hostile to the outreach.
4. **Voicemails are substantive.** 100% of voicemails include a branded message with recovery service pitch.
5. **Agent handles declinations gracefully.** When members say "not interested," the agent responds politely without pushback.
6. **New locations match or beat original pilots.** No location-specific tuning required.
7. **Recovery campaign is on-message.** 68.5% of all conversations correctly center on recovery services.
8. **Call screening correlation reveals the fix.** The natural experiment provides a statistically significant (p < 10⁻⁸) path to improving conversation quality through opening sequence restructuring.

---

## 8. What Needs Attention

### Critical
1. **Restructure the opening sequence based on the call screening finding.** The screened path produces 7x better outcomes. Implement: greeting → disclaimer → pitch (with natural pause after member answers). This is the single highest-impact change and has direct statistical evidence supporting it.

### High
2. **Improve conversation-to-outcome conversion.** Only 1.7% of connected calls show booking signals and zero members asked follow-up questions about pricing or hours. Against SOTA benchmarks (60-75% connect-to-conversation, 8-15% conversation-to-meeting for cold calling), these are below the floor. Hypotheses to test: (a) the opening pitch is too generic — try personalization based on member's visit history; (b) recovery services aren't what these members want — test different campaign topics; (c) the opening sequence fix resolves much of this.
3. **Measure what matters.** Current data doesn't track: actual recovery service bookings, gym visits post-call, membership renewals, or revenue influenced. Without downstream outcome tracking, we can't prove ROI. The Apr 12 Early Attrition Results milestone should have provided some of this — need to capture those numbers.
4. **Send SMS booking link proactively.** Only 4 of 240 connected calls triggered an SMS. If the agent sent a booking link during any call where the member showed even brief engagement, this number should be 50+.

### Medium
5. **Replace the "important message" fallback.** 12.7% of calls use a spammy-sounding fallback. Replace with branded voicemail intro. Root cause is carrier screening prompt misdetection.
6. **Spread calling hours.** Time-zone-aware scheduling (Ashton, due Apr 17) should improve pickup rates at Hawaii locations especially.
7. **Track clean call closings.** 97.9% member hangup rate is partly structural (outbound calls), but aim to increase agent-initiated clean closes to >10%.

### Low
8. **SMS data gap.** Apr 13 export doesn't include SMS threads — need to pull this for a complete picture of the text reply rate trend.

---

## 9. Comparison to Success Criteria

| Criteria (from brain) | Target | Actual | Status |
|----------------------|--------|--------|--------|
| Pilot live at corporate locations | Early March | Mar 16 (2 locations), Apr 13 (10 locations) | Exceeded |
| Pickup rate | TBD | 39.2% (top of "excellent" for warm outbound) | Strong |
| Effective contact rate | TBD | ~10.6% (in line with industry norms) | Normal — room to improve |
| Member retention improvement | Positive signal | 0.58% action vs 1.18% control (Mar 29 directional) | Early positive |
| Eval suite pass rate | High | 93% (81/87) | Strong |
| Zero system failures | Yes | Yes (4 weeks running) | Met |
| Franchise rollout | Pending promo data | Franchise go-live verification in progress (due Apr 17) | Progressing |

---

## 10. Recommendations for Next 2 Weeks

1. **Ship the opening sequence restructure** — implement greeting → disclaimer → pitch based on the call screening natural experiment (7x improvement, p < 10⁻⁸)
2. **Pull Apr 12 attrition results** — this was a planned reporting milestone. We need the retention numbers to tell the ROI story.
3. **Increase proactive SMS link sends** — when member shows any interest, immediately text the booking link. Only 4/240 calls sent an SMS, should be much higher.
4. **Set concrete conversion targets** — e.g., "10% of connected calls result in a recovery service booking link sent" or "5% of called members book within 7 days"
5. **A/B test campaign topics** — recovery services may not be what these members want. Zero follow-up questions suggests low relevance. Test with a different topic (class schedules, personal training promo, membership anniversary check-in).
6. **Get SMS data for Apr 13** — complete the outreach picture
7. **Build the downstream funnel** — connect call data to GymSales to track: called → booked → showed → retained

---

## 11. Methodology & SOTA Validation

### Approach

This analysis uses a deterministic, rule-based pipeline: parse 613 call threads into structured data, classify every turn into a dialog act, extract conversation flow fingerprints, and compare success vs failure paths. No ML, no sampling, no estimation — every count is an exact pattern match on raw transcript data.

### SOTA Alignment

The methodology aligns with published research across three dimensions:

**Dialog act classification:** The simplified taxonomy (~20 act types) is validated by Zelasko et al. (2021, TACL), who demonstrated that label set specificity does not affect dialog act segmentation performance. Qamar et al. (ACL 2025) further showed that LLMs perform worse with fine-grained (50-class) DA taxonomies than simpler ones. A rule-based classifier is appropriate for scripted agent transcripts with constrained vocabulary.

**Turn-level analysis:** TD-EVAL (Acikgoz et al., SIGdial 2025) validated that turn-level evaluation catches errors that call-level metrics miss — directly supporting the approach of analyzing individual dialog acts rather than just overall call outcomes.

**Conversation flow fingerprinting:** The success-vs-failure divergence analysis using dialog act sequences is novel — no published work does this exact comparison. The closest analog is "Turning Conversations into Workflows" (ACL 2025), which extracts procedural flow patterns from conversation logs but does not compare them across outcome classes. OutboundEval (arXiv 2510.21244, Oct 2025) is the only published benchmark specifically for outbound voice agent evaluation.

### Benchmark Sources

Outbound AI calling benchmarks are sourced from vendor reports, not peer-reviewed research:
- **JustCall (2025)**: Warm outbound connect rates — 20-30% good, 30-40% excellent
- **Auto Interview AI (2026)**: AI calling funnel — 4-8% cold connect, 60-75% connect-to-conversation, 8-15% conversation-to-meeting
- **Retell AI / Salesforce**: AI-enhanced outbound — 20-25% connection rate
- **a16z "AI Voice Agents: 2025 Update"**: Qualitative framing of realistic AI agent adoption (most credible source, no funnel metrics)

These are vendor blogs with inherent optimism bias. No rigorous academic research benchmarks outbound AI voice agent conversion rates. Numbers should be treated as directional, not definitive.

### Transcript Quality Risk

The initial analysis contained a false finding (a "double-pitch bug" affecting 68% of calls) that was actually a transcript threading artifact — the recording system logged the opening message twice, but the member only heard it once. This was corrected in this revision.

Zelasko et al. (2021) identified transcript quality as the dominant factor in DA classification accuracy — more impactful than taxonomy choice. This artifact confirms that risk: pipeline issues can produce convincing but false behavioral findings. Future analyses should validate transcript-level findings against actual call audio before making engineering recommendations.

---

## Appendix: Data Methodology

- **Call data**: Full thread export from Apr 13, 2026 — 613 unique call threads, 4,039 message rows across 10 locations. Each thread includes all messages (system, outbound agent, inbound member), verdict, duration, and timestamp.
- **Week 1-2 data**: Summary statistics from second spreadsheet covering Mar 16-29 at Corona and Sunnyvale only.
- **Statistical tests**: Fisher's exact test on call screening × success correlation (2x2 contingency table). Confidence intervals on per-location pickup rates computed as Wald intervals at 95% level.
- **Limitations**: Apr 13 data is a single day snapshot. SMS thread data not included in Apr 13 export. No downstream outcome data (bookings, visits, retention) available in either dataset. Churn data (0.58% action vs 1.18% control) is from Mar 29 status report, not refreshed. Per-location sample sizes (54-67) are too small for reliable location-specific conclusions.
- **Revision note**: Original April 14 analysis identified a "double-pitch bug" (68% of spoke_to calls) that was subsequently determined to be a transcript threading artifact. This revision removes that finding and reframes the root cause analysis around the call screening natural experiment.

### SOTA References

1. Zelasko, P., Pappagari, R., & Dehak, N. (2021). What Helps Transformers Recognize Conversational Structure? Importance of Context, Punctuation, and Labels. *TACL*. arXiv:2107.02294
2. Acikgoz, E. C., et al. (2025). TD-EVAL: Revisiting Task-Oriented Dialogue Evaluation by Combining Turn-Level Precision with Dialogue-Level Comparisons. *SIGdial 2025*. arXiv:2504.19982
3. Terragni, S., et al. (2022). BETOLD: A Task-Oriented Dialog Dataset for Breakdown Detection. *CAI Workshop*. ACL Anthology 2022.cai-1.4
4. Qamar, U., Tong, J., & Huang, R. (2025). Do LLMs Understand Dialogues? A Case Study on Dialogue Acts. *ACL 2025*. ACL Anthology 2025.acl-long.1271
5. OutboundEval / VoiceAgentEval (2025). Dual-dimensional benchmark for outbound voice agent evaluation. arXiv:2510.21244
6. Zhang, Y. & Wang, M. (2025). Act2P: LLM-Driven Online Dialogue Act Classification. *ACL Findings 2025*. ACL Anthology 2025.findings-acl.1052
