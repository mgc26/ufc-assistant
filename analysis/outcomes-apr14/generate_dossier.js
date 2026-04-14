const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak, LevelFormat,
} = require("docx");

// === STYLES ===
const INK = "1A1A2E";
const PURPLE = "4A3F8F";
const RED = "CC0000";
const GREEN = "006600";
const GRAY = "666666";
const LIGHT_BG = "F0F0F5";
const HEADER_BG = "1A1A2E";
const TABLE_BORDER = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const BORDERS = { top: TABLE_BORDER, bottom: TABLE_BORDER, left: TABLE_BORDER, right: TABLE_BORDER };
const CELL_MARGINS = { top: 60, bottom: 60, left: 100, right: 100 };
const PAGE_WIDTH = 9360; // US Letter with 1" margins

function headerCell(text, width) {
  return new TableCell({
    borders: BORDERS,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
    margins: CELL_MARGINS,
    verticalAlign: "center",
    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text, bold: true, font: "Helvetica", size: 16, color: "FFFFFF" }),
    ]})],
  });
}

function dataCell(text, width, opts = {}) {
  const align = opts.align || AlignmentType.LEFT;
  const color = opts.color || "000000";
  const bold = opts.bold || false;
  const fill = opts.fill || undefined;
  return new TableCell({
    borders: BORDERS,
    width: { size: width, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR } : undefined,
    margins: CELL_MARGINS,
    children: [new Paragraph({ alignment: align, children: [
      new TextRun({ text: String(text), font: "Helvetica", size: 16, color, bold }),
    ]})],
  });
}

function spacer() {
  return new Paragraph({ spacing: { before: 80, after: 80 }, children: [] });
}

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ heading: level, children: [
    new TextRun({ text, font: "Helvetica", bold: true, color: INK }),
  ]});
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after || 100 },
    children: [new TextRun({ text, font: "Helvetica", size: 18, color: opts.color || "000000", bold: opts.bold || false })],
  });
}

function boldBody(label, value) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: label, font: "Helvetica", size: 18, bold: true, color: INK }),
      new TextRun({ text: value, font: "Helvetica", size: 18, color: "000000" }),
    ],
  });
}

// === LOCATION DATA (verified, deterministic) ===
const locations = [
  ["UFC Fit Wayne", 61, 29, "47.5%", "19s"],
  ["UFC GYM Corona", 67, 31, "46.3%", "23s"],
  ["UFC GYM Waikele", 64, 28, "43.8%", "25s"],
  ["UFC GYM Rosemead", 67, 29, "43.3%", "58s"],
  ["UFC GYM New Hyde Park", 66, 27, "40.9%", "55s"],
  ["UFC Fit Centennial", 62, 25, "40.3%", "24s"],
  ["UFC GYM Mililani", 54, 19, "35.2%", "37s"],
  ["UFC GYM Torrance", 54, 18, "33.3%", "168s"],
  ["UFC GYM Honolulu", 63, 20, "31.7%", "71s"],
  ["UFC GYM Sunnyvale", 54, 14, "25.9%", "33s"],
];

// === BUILD DOCUMENT ===
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Helvetica", size: 18, color: "000000" } } },
    paragraphStyles: [
      { id: "Normal", name: "Normal",
        paragraph: { spacing: { line: 260, before: 0, after: 100 } },
        run: { font: "Helvetica", size: 18, color: "000000" } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Helvetica", color: INK },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Helvetica", color: PURPLE },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 20, bold: true, font: "Helvetica", color: INK },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
      ]},
      { reference: "numbers", levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 540, hanging: 360 } } } },
      ]},
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({ children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: PURPLE, space: 4 } },
          children: [
            new TextRun({ text: "UFC Gym Operate \u2014 Outcomes Dossier", font: "Helvetica", size: 14, color: GRAY, italics: true }),
          ],
        }),
      ]}),
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: "D0D0D0", space: 4 } },
          children: [
            new TextRun({ text: "Vi Confidential \u2014 Page ", font: "Helvetica", size: 14, color: GRAY }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Helvetica", size: 14, color: GRAY }),
          ],
        }),
      ]}),
    },
    children: [

      // === COVER ===
      spacer(), spacer(), spacer(),
      new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 40 }, children: [
        new TextRun({ text: "UFC GYM \u00D7 VI OPERATE", font: "Helvetica", size: 36, bold: true, color: INK }),
      ]}),
      new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 200 }, children: [
        new TextRun({ text: "Outcomes Appraisal Dossier", font: "Helvetica", size: 28, color: PURPLE }),
      ]}),
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: PURPLE, space: 8 } },
        spacing: { before: 200, after: 100 },
        children: [],
      }),
      boldBody("Date: ", "April 14, 2026"),
      boldBody("Period: ", "March 16 (pilot launch) through April 13 (latest data)"),
      boldBody("Data: ", "613 call threads, 10 locations, single-day snapshot"),
      boldBody("Method: ", "Deterministic rule-based analysis \u2014 dialog act classification, flow pattern extraction"),
      boldBody("Author: ", "Matt Crowson, Head of Product"),
      spacer(),
      body("All numbers verified: 3 runs produce identical MD5 hash (eb705e73ab35df195b0c13f2dcc17623). No estimation, sampling, or LLM inference.", { color: GRAY }),

      new Paragraph({ children: [new PageBreak()] }),

      // === 1. TOPLINE ===
      heading("1. Topline Metrics"),
      body("Single-day snapshot from April 13, 2026 \u2014 the most recent full production day across all 10 live locations."),
      spacer(),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [4680, 2340, 2340],
        rows: [
          new TableRow({ children: [headerCell("Metric", 4680), headerCell("Value", 2340), headerCell("Detail", 2340)] }),
          ...[
            ["Total call threads", "613", ""],
            ["Locations", "11", "10 production + 1 test"],
            ["Spoke to (connected)", "240", "39.2% of total"],
            ["Left message (voicemail)", "335", "54.6% of total"],
            ["Pickup rate", "39.2%", "spoke_to / total"],
            ["Total call time", "65,817s", "18.3 hours"],
            ["Connected time", "11,331s", "188.8 minutes"],
            ["Median spoke_to duration", "18s", ""],
            ["Mean spoke_to duration", "47.2s", "Skewed by 4 calls >300s"],
          ].map(([m, v, d]) => new TableRow({ children: [
            dataCell(m, 4680), dataCell(v, 2340, { align: AlignmentType.CENTER }), dataCell(d, 2340, { color: GRAY }),
          ]})),
        ],
      }),

      spacer(),
      heading("Week-over-Week Trend", HeadingLevel.HEADING_3),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [2800, 1640, 1640, 1640, 1640],
        rows: [
          new TableRow({ children: [headerCell("Metric", 2800), headerCell("W1 (Mar 16)", 1640), headerCell("W2 (Mar 23)", 1640), headerCell("Apr 13", 1640), headerCell("Trend", 1640)] }),
          ...[
            ["Locations", "2", "2", "10", "5x"],
            ["Total calls", "48", "82", "613", "~12x/day"],
            ["Pickup rate", "15.0%", "19.5%", "39.2%", "2.6x"],
            ["System failures", "0", "0", "0", "Clean"],
          ].map(([m, w1, w2, a, t]) => new TableRow({ children: [
            dataCell(m, 2800), dataCell(w1, 1640, { align: AlignmentType.CENTER }), dataCell(w2, 1640, { align: AlignmentType.CENTER }),
            dataCell(a, 1640, { align: AlignmentType.CENTER, bold: true }), dataCell(t, 1640, { align: AlignmentType.CENTER, color: GREEN }),
          ]})),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // === 2. PER-LOCATION ===
      heading("2. Per-Location Performance"),
      body("Ranked by pickup rate. New locations (39.7%) outperform original pilot locations (37.2%)."),
      spacer(),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [3200, 1200, 1200, 1560, 2200],
        rows: [
          new TableRow({ children: [headerCell("Location", 3200), headerCell("Calls", 1200), headerCell("Spoke", 1200), headerCell("Pickup", 1560), headerCell("Avg Duration", 2200)] }),
          ...locations.map(([loc, calls, spoke, rate, dur]) => new TableRow({ children: [
            dataCell(loc, 3200), dataCell(calls, 1200, { align: AlignmentType.CENTER }),
            dataCell(spoke, 1200, { align: AlignmentType.CENTER }), dataCell(rate, 1560, { align: AlignmentType.CENTER, bold: true }),
            dataCell(dur, 2200, { align: AlignmentType.CENTER }),
          ]})),
          new TableRow({ children: [
            dataCell("TOTAL", 3200, { bold: true, fill: LIGHT_BG }), dataCell("613", 1200, { align: AlignmentType.CENTER, bold: true, fill: LIGHT_BG }),
            dataCell("240", 1200, { align: AlignmentType.CENTER, bold: true, fill: LIGHT_BG }),
            dataCell("39.2%", 1560, { align: AlignmentType.CENTER, bold: true, fill: LIGHT_BG }),
            dataCell("47s (mean)", 2200, { align: AlignmentType.CENTER, bold: true, fill: LIGHT_BG }),
          ]}),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // === 3. CONVERSATION QUALITY ===
      heading("3. Conversation Quality"),
      body("73% of connected calls do not produce real dialog. The median call is 18 seconds. 97.9% end with the member hanging up."),
      spacer(),

      heading("Engagement Depth", HeadingLevel.HEADING_3),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [4000, 1200, 1560, 2600],
        rows: [
          new TableRow({ children: [headerCell("Metric", 4000), headerCell("Count", 1200), headerCell("% of 240", 1560), headerCell("Assessment", 2600)] }),
          ...[
            ["Real dialog (2+ member turns)", "65", "27.1%", "Low"],
            ["Meaningful calls (>30s)", "56", "23.3%", "Low"],
            ["Member hung up", "235", "97.9%", "Structural but high"],
            ["Clean close (agent-initiated)", "5", "2.1%", "Very low"],
          ].map(([m, c, p, a]) => new TableRow({ children: [
            dataCell(m, 4000), dataCell(c, 1200, { align: AlignmentType.CENTER }), dataCell(p, 1560, { align: AlignmentType.CENTER }),
            dataCell(a, 2600, { color: a === "Low" || a === "Very low" ? RED : GRAY }),
          ]})),
        ],
      }),

      spacer(),
      heading("Outcome Signals", HeadingLevel.HEADING_3),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [4200, 1200, 1560, 2400],
        rows: [
          new TableRow({ children: [headerCell("Signal", 4200), headerCell("Threads", 1200), headerCell("Rate", 1560), headerCell("Note", 2400)] }),
          ...[
            ["Recovery services mentioned", "420", "68.5%", "Campaign topic"],
            ["Booking/scheduling language", "4", "1.7%", "Very low conversion"],
            ["Member info requests (pricing, hours)", "0", "0.0%", "Zero members asked"],
            ["SMS link sent during call", "4", "1.7%", "Massively underused"],
            ["Opt-out keywords", "3", "0.5%", "Very low \u2014 good"],
            ["Agent offered transfer", "1", "0.2%", ""],
          ].map(([s, t, r, n]) => new TableRow({ children: [
            dataCell(s, 4200), dataCell(t, 1200, { align: AlignmentType.CENTER }), dataCell(r, 1560, { align: AlignmentType.CENTER }),
            dataCell(n, 2400, { color: GRAY }),
          ]})),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // === 4. ROOT CAUSE ANALYSIS ===
      heading("4. Root Cause Analysis"),
      body("Dialog act classification applied to every turn in every spoke_to call. Each turn tagged as a specific act (pitch, greeting, disclaimer, question, etc.) and the sequence analyzed for structural failure patterns."),
      spacer(),

      heading("Dominant Failure Flow", HeadingLevel.HEADING_3),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "AGT:pitch \u2192 MBR:greeting \u2192 AGT:disclaimer \u2192 AGT:pitch", font: "Helvetica", size: 20, bold: true, color: RED }),
      ]}),
      body("Frequency: 41x (20.4% of all failures). Agent leads with pitch before member is ready, member says \u201CHello?\u201D, agent plays disclaimer, then repeats the same pitch. Member hangs up after hearing the pitch twice."),
      spacer(),

      heading("Key Findings", HeadingLevel.HEADING_3),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [500, 3200, 2260, 3400],
        rows: [
          new TableRow({ children: [headerCell("#", 500), headerCell("Finding", 3200), headerCell("Data", 2260), headerCell("Implication", 3400)] }),
          ...[
            ["1", "55.4% of hangups occur during AGT:pitch", "128/231", "The pitch is the dropout trigger"],
            ["2", "55.5% of members respond \u201CHello?\u201D to pitch", "96/173", "Pitch fires before member is ready"],
            ["3", "After \u201CHello?\u201D, agent plays disclaimer 67.7%", "84/124", "Should greet first, then disclaimer"],
            ["4", "Call screening correlates with success", "48.7% vs 7.0%", "Screening accidentally fixes the flow"],
            ["5", "Zero members asked follow-up questions", "0/240", "Agent talks; members don\u2019t engage"],
            ["6", "Double-pitch bug in 68.3% of spoke_to", "164/240", "Top engineering fix"],
          ].map(([n, f, d, i]) => new TableRow({ children: [
            dataCell(n, 500, { align: AlignmentType.CENTER, bold: true }),
            dataCell(f, 3200), dataCell(d, 2260, { align: AlignmentType.CENTER, bold: true }),
            dataCell(i, 3400, { color: GRAY }),
          ]})),
        ],
      }),

      spacer(),
      heading("Why Call Screening Helps", HeadingLevel.HEADING_3),
      body("48.7% of successful conversations went through call screening (the \u201CIf you record your name...\u201D prompt). Only 7.0% of failures did. Call screening forces the agent through the fallback path, which accidentally produces the correct sequence: re-greeting \u2192 disclaimer \u2192 pitch. The failure path skips this and opens with pitch \u2192 disclaimer \u2192 repeated pitch."),

      spacer(),
      heading("Failure Taxonomy (<30s calls)", HeadingLevel.HEADING_3),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [3500, 1200, 1660, 3000],
        rows: [
          new TableRow({ children: [headerCell("Failure Mode", 3500), headerCell("Count", 1200), headerCell("% of 184", 1660), headerCell("Fix Category", 3000)] }),
          ...[
            ["greeting_then_hangup", "87", "47.3%", "Agent opening needs faster hook"],
            ["brief_exchange_unclear", "58", "31.5%", "Needs transcript review"],
            ["no_member_speech", "39", "21.2%", "Pickup detection or instant hangup"],
          ].map(([m, c, p, f]) => new TableRow({ children: [
            dataCell(m, 3500), dataCell(c, 1200, { align: AlignmentType.CENTER }), dataCell(p, 1660, { align: AlignmentType.CENTER }),
            dataCell(f, 3000, { color: GRAY }),
          ]})),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // === 5. TECHNICAL ISSUES ===
      heading("5. Technical Issues"),

      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [2600, 1200, 1560, 1000, 3000],
        rows: [
          new TableRow({ children: [headerCell("Issue", 2600), headerCell("Affected", 1200), headerCell("% of Base", 1560), headerCell("Severity", 1000), headerCell("Description", 3000)] }),
          ...[
            ["Double-pitch bug", "164", "68.3% spoke", "HIGH", "Opening pitch repeated after disclaimer"],
            ["VM fallback", "43", "12.8% VM", "MEDIUM", "Carrier screening triggers \u201Cimportant message\u201D"],
            ["Narrow call window", "561", "91.5% in 1hr", "LOW", "91.5% of calls in 19:00 UTC hour"],
          ].map(([i, a, p, s, d]) => new TableRow({ children: [
            dataCell(i, 2600, { bold: true }), dataCell(a, 1200, { align: AlignmentType.CENTER }),
            dataCell(p, 1560, { align: AlignmentType.CENTER }), dataCell(s, 1000, { align: AlignmentType.CENTER, color: s === "HIGH" ? RED : GRAY, bold: true }),
            dataCell(d, 3000),
          ]})),
        ],
      }),

      spacer(),
      body("VM fallback root cause: 39/43 (90.7%) triggered by the same carrier screening prompt: \u201CHi. If you record your name and reason for calling, I\u2019ll see if this person is available.\u201D This is a carrier-level call screener, not a voicemail. The agent hears it and plays the \u201Cimportant message\u201D fallback instead of a branded greeting."),

      new Paragraph({ children: [new PageBreak()] }),

      // === 6. PRIORITIZED FIXES ===
      heading("6. Prioritized Fixes"),
      body("Ranked by number of calls affected. All counts derived from the analysis pipeline."),
      spacer(),

      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [500, 3800, 1260, 3800],
        rows: [
          new TableRow({ children: [headerCell("#", 500), headerCell("Fix", 3800), headerCell("Affected", 1260), headerCell("Evidence", 3800)] }),
          ...[
            ["1", "Send SMS booking link proactively during spoke_to calls", "236", "Only 4/240 calls sent an SMS link"],
            ["2", "Restructure opening: disclaimer \u2192 greeting \u2192 pitch", "91", "91 calls where pitch plays twice"],
            ["3", "After \u201CHello?\u201D, greet first \u2014 not disclaimer", "84", "84 calls go Hello? \u2192 disclaimer"],
            ["4", "Replace \u201Cimportant message\u201D fallback", "43+78", "43 VMs + 78 spoke_to calls affected"],
          ].map(([n, f, a, e]) => new TableRow({ children: [
            dataCell(n, 500, { align: AlignmentType.CENTER, bold: true, fill: n === "1" ? "E8F5E9" : n === "2" ? "FFF3E0" : undefined }),
            dataCell(f, 3800, { bold: true }),
            dataCell(a, 1260, { align: AlignmentType.CENTER, bold: true, color: RED }),
            dataCell(e, 3800, { color: GRAY }),
          ]})),
        ],
      }),

      spacer(), spacer(),
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: PURPLE, space: 8 } },
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({ text: "Methodology: ", font: "Helvetica", size: 16, bold: true, color: GRAY }),
          new TextRun({ text: "Rule-based dialog act classifier (DAMSL/ISO 24617-2 inspired) applied to 4,039 message rows across 613 threads. Approach draws on TD-EVAL (Acikgoz et al. 2025) for turn-level error detection and BETOLD (Terragni et al. 2022) for breakdown classification. Every count is exact string matching on raw transcript data. Full analysis reproducible via: ", font: "Helvetica", size: 16, color: GRAY }),
          new TextRun({ text: "python3 analyze_operate_outcomes.py", font: "Helvetica", size: 16, color: GRAY, italics: true }),
        ],
      }),

    ],
  }],
});

// === WRITE ===
const outPath = "/Users/mgc50/Dropbox/1. Worked On FILES/(34) Vi/ufc-info/background/analysis/UFC-Operate-Outcomes-Dossier-Apr14.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("Written to: " + outPath);
  console.log("Size: " + (buffer.length / 1024).toFixed(1) + " KB");
});
