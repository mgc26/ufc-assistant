# UFC Gym Operate — Outcomes Appraisal (April 14, 2026)

Deterministic analysis of 613 call threads from April 13, 2026 across 10 UFC Gym locations.

## Files

| File | What |
|------|------|
| `analyze_operate_outcomes.py` | Analysis script. Reads raw thread data, produces all metrics, Excel, and console output. |
| `ufc-operate-outcomes-final.xlsx` | 10-sheet Excel workbook with all tables, per-thread detail, and synthesis. |
| `UFC-Operate-Outcomes-Dossier-Apr14.docx` | 6-page executive dossier with key findings and prioritized fixes. |
| `outcomes-appraisal-apr14.md` | Markdown version of the full appraisal. |
| `generate_dossier.js` | Script that generates the .docx dossier (requires `npm install docx`). |

## How to re-run

```bash
pip install openpyxl
python3 analyze_operate_outcomes.py --input <thread_export.tsv> --output results.xlsx
```

The script is fully deterministic — same input produces identical output across runs.

## Key findings

- **39.2% pickup rate** (up from 15% in Week 1) across 10 locations
- **Dominant failure pattern**: agent pitches before member is ready, then repeats after disclaimer (41x, 20.4% of failures)
- **55.4% of hangups** occur during the agent's pitch
- **Zero members** asked follow-up questions about pricing or hours
- **Call screening accidentally fixes the opening sequence** — 48.7% of successful calls went through screening vs 7.0% of failures
- **Double-pitch bug** affects 68.3% of connected calls

## Prioritized fixes

1. Send SMS booking link proactively (236 calls affected)
2. Restructure opening: disclaimer → greeting → pitch (91 calls)
3. After "Hello?", greet first — not disclaimer (84 calls)
4. Replace "important message" VM fallback (43+78 calls)
