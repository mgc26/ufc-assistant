# UFC Gym Operate — Outcomes Appraisal (April 14, 2026; revised April 15)

Deterministic analysis of 613 call threads from April 13, 2026 across 10 UFC Gym locations.

## Files

| File | What |
|------|------|
| `analyze_operate_outcomes.py` | Analysis script. Reads raw thread data, produces all metrics, Excel, and console output. Includes Fisher's exact test for call screening correlation. |
| `ufc-operate-outcomes-final.xlsx` | 10-sheet Excel workbook with all tables, per-thread detail, and synthesis. |
| `UFC-Operate-Outcomes-Dossier-Apr14.docx` | 6-page executive dossier with key findings and prioritized fixes. |
| `outcomes-appraisal-apr14.md` | Markdown version of the full appraisal (revised Apr 15). |
| `generate_dossier.js` | Script that generates the .docx dossier (requires `npm install docx`). |

## How to re-run

```bash
pip install openpyxl scipy
python3 analyze_operate_outcomes.py --input <thread_export.tsv> --output results.xlsx
```

The script is fully deterministic — same input produces identical output across runs.

## Key findings

- **39.2% pickup rate** (up from 15% in Week 1) — top of "excellent" range for warm outbound (JustCall 2025 benchmark: 30-40%)
- **Effective contact rate ~10.6%** — in line with industry norms when real dialog rate (27.1%) is applied to pickup
- **Call screening natural experiment**: calls passing through carrier screening have **48.7% success rate vs 7.0%** for unscreened calls (Fisher's exact: OR ≈ 12.7, p < 10⁻⁸). Screening forces a better opening sequence.
- **27.1% real dialog rate** — below SOTA benchmarks (60-75% connect-to-conversation, Auto Interview AI 2026)
- **Zero members** asked follow-up questions about pricing or hours
- **Near-zero conversion** (0.7% booking signals) — below worst-case cold-calling benchmarks (2.3-2.7%)

## Revision note (April 15)

The original April 14 analysis identified a "double-pitch bug" affecting 68% of connected calls. This was subsequently determined to be a **transcript threading artifact** — the recording system logs the opening message twice, but the member hears it once. This revision removes that finding from all recommendations and reframes the root cause analysis around the call screening natural experiment.

## Prioritized fixes

1. **Restructure opening sequence** — mimic the screened call path: greeting → disclaimer → pitch (Fisher's exact: OR ≈ 12.7, p < 10⁻⁸)
2. **Send SMS booking link proactively** — only 4/240 connected calls sent an SMS
3. **After "Hello?", greet first** — not disclaimer (84 calls affected)
4. **Replace "important message" VM fallback** — carrier screening triggers spammy fallback (43+ calls)

## Methodology

Rule-based dialog act classifier (validated by Zelasko et al. 2021, TD-EVAL 2025). Conversation flow fingerprinting with success/failure divergence analysis. Fisher's exact test on call screening × success correlation. All counts are exact pattern matches — no ML, no estimation.
