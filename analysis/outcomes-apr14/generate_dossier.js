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

// === LOCATION DATA ===
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
        new TextRun({ text: "Outcomes Appraisal", font: "Helvetica", size: 28, color: PURPLE }),
      ]}),
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: PURPLE, space: 8 } },
        spacing: { before: 200, after: 100 },
        children: [],
      }),
      boldBody("Date: ", "April 15, 2026"),
      boldBody("Period: ", "March 16 (pilot launch) through April 13 (latest data)"),
      boldBody("Data: ", "613 call threads, 10 locations, single-day snapshot"),
      boldBody("Author: ", "Matt Crowson, Head of Product"),
      spacer(),
      body("All numbers pulled directly from raw call transcripts. Every count is verifiable. Nothing estimated.", { color: GRAY }),

      new Paragraph({ children: [new PageBreak()] }),

      // === 1. TOPLINE ===
      heading("1. Where We Are"),
      body("Single-day snapshot from April 13 across all 10 live locations."),
      spacer(),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [4680, 2340, 2340],
        rows: [
          new TableRow({ children: [headerCell("Metric", 4680), headerCell("Value", 2340), headerCell("Context", 2340)] }),
          ...[
            ["Total calls", "613", "Single day, all locations"],
            ["Locations live", "10", "Up from 2 at launch"],
            ["Picked up (spoke to)", "240", "39.2%"],
            ["Left voicemail", "335", "54.6%"],
            ["Pickup rate", "39.2%", "Excellent for warm outbound"],
            ["Real conversations", "65", "27.1% of pickups"],
            ["Median call length", "18s", "Most calls are very short"],
            ["Total connected time", "189 min", "11,331 seconds"],
          ].map(([m, v, d]) => new TableRow({ children: [
            dataCell(m, 4680), dataCell(v, 2340, { align: AlignmentType.CENTER, bold: true }), dataCell(d, 2340, { color: GRAY }),
          ]})),
        ],
      }),

      spacer(),
      heading("Trend", HeadingLevel.HEADING_3),
      body("W1/W2 are week totals from 2 locations. Apr 13 is a single day from 10 locations.", { color: GRAY }),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [2800, 1640, 1640, 1640, 1640],
        rows: [
          new TableRow({ children: [headerCell("", 2800), headerCell("W1 (Mar 16)", 1640), headerCell("W2 (Mar 23)", 1640), headerCell("Apr 13", 1640), headerCell("Trend", 1640)] }),
          ...[
            ["Locations", "2", "2", "10", "5x"],
            ["Pickup rate", "15.0%", "19.5%", "39.2%", "2.6x"],
            ["Calls/location/day", "~3", "~6", "~61", "Batch \u2191"],
            ["System failures", "0", "0", "0", "Clean"],
          ].map(([m, w1, w2, a, t]) => new TableRow({ children: [
            dataCell(m, 2800, { bold: true }), dataCell(w1, 1640, { align: AlignmentType.CENTER }), dataCell(w2, 1640, { align: AlignmentType.CENTER }),
            dataCell(a, 1640, { align: AlignmentType.CENTER, bold: true }), dataCell(t, 1640, { align: AlignmentType.CENTER, color: GREEN }),
          ]})),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // === 2. PER-LOCATION ===
      heading("2. Per-Location Breakdown"),
      body("Ranked by pickup rate. New locations match or beat the original pilots \u2014 the platform generalizes. Note: with only 54\u201367 calls per location, these numbers are directional, not definitive."),
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

      // === 3. THE PROBLEM ===
      heading("3. The Problem: Reach Is Good, Conversations Aren\u2019t"),

      body("We\u2019re reaching members at scale. But most calls don\u2019t turn into real conversations, and almost none produce a booking or next step."),
      spacer(),

      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [4000, 1200, 1560, 2600],
        rows: [
          new TableRow({ children: [headerCell("Metric", 4000), headerCell("Count", 1200), headerCell("% of 240", 1560), headerCell("What It Means", 2600)] }),
          ...[
            ["Real dialog (member spoke 2+ times)", "65", "27.1%", "73% of pickups go nowhere"],
            ["Meaningful calls (>30s)", "56", "23.3%", "Most calls under 20 seconds"],
            ["Member hung up", "235", "97.9%", "Agent almost never closes naturally"],
            ["Agent-initiated close", "5", "2.1%", "Only 5 calls ended on our terms"],
          ].map(([m, c, p, a]) => new TableRow({ children: [
            dataCell(m, 4000), dataCell(c, 1200, { align: AlignmentType.CENTER }), dataCell(p, 1560, { align: AlignmentType.CENTER }),
            dataCell(a, 2600, { color: GRAY }),
          ]})),
        ],
      }),

      spacer(),
      body("For context: industry benchmarks for outbound calling show 60\u201375% of connected calls should produce a real conversation. We\u2019re at 27%. Even cold callers calling strangers do better than this.", { color: GRAY }),

      spacer(),
      heading("Outcome Signals", HeadingLevel.HEADING_3),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [4200, 1200, 1560, 2400],
        rows: [
          new TableRow({ children: [headerCell("Signal", 4200), headerCell("Threads", 1200), headerCell("Rate", 1560), headerCell("", 2400)] }),
          ...[
            ["Recovery services mentioned", "420", "68.5%", "On-message"],
            ["Booking/scheduling language", "4", "1.7%", "Near zero"],
            ["Member asked about pricing or hours", "0", "0.0%", "Nobody was curious enough to ask"],
            ["SMS link sent during call", "4", "1.7%", "We\u2019re barely using this channel"],
            ["Opt-out keywords", "3", "0.5%", "Members aren\u2019t hostile"],
          ].map(([s, t, r, n]) => new TableRow({ children: [
            dataCell(s, 4200), dataCell(t, 1200, { align: AlignmentType.CENTER }), dataCell(r, 1560, { align: AlignmentType.CENTER }),
            dataCell(n, 2400, { color: GRAY }),
          ]})),
        ],
      }),

      spacer(),
      body("The zero on member info requests is the most telling number. Members aren\u2019t engaged enough to even be curious. The agent talks about recovery services; members either briefly acknowledge or hang up."),

      new Paragraph({ children: [new PageBreak()] }),

      // === 4. THE BIGGEST FINDING ===
      heading("4. The Fix: We Already Have Proof It Works"),

      body("We found a natural experiment buried in the data. Some calls pass through carrier call screening (\u201CIf you record your name, I\u2019ll see if this person is available\u201D). Those calls go dramatically better:"),
      spacer(),

      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [4680, 2340, 2340],
        rows: [
          new TableRow({ children: [headerCell("", 4680), headerCell("Screened Calls", 2340), headerCell("Unscreened Calls", 2340)] }),
          new TableRow({ children: [
            dataCell("Success rate (real conversation)", 4680, { bold: true }),
            dataCell("48.7%", 2340, { align: AlignmentType.CENTER, bold: true, color: GREEN }),
            dataCell("7.0%", 2340, { align: AlignmentType.CENTER, bold: true, color: RED }),
          ]}),
          new TableRow({ children: [
            dataCell("Difference", 4680, { bold: true }),
            dataCell("7x better", 2340, { align: AlignmentType.CENTER, bold: true, color: PURPLE }),
            dataCell("", 2340),
          ]}),
          new TableRow({ children: [
            dataCell("Statistical confidence", 4680),
            dataCell("Not a fluke (p < 0.000000001)", 2340, { align: AlignmentType.CENTER, color: GRAY }),
            dataCell("", 2340),
          ]}),
        ],
      }),

      spacer(),
      heading("Why Does Screening Help?", HeadingLevel.HEADING_3),
      body("Call screening forces the agent through a different opening. Instead of jumping straight into the pitch, the agent has to re-introduce itself after the screening prompt. This produces a more natural sequence:"),
      spacer(),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Default (broken): ", font: "Helvetica", size: 18, bold: true, color: RED }),
        new TextRun({ text: "Pitch \u2192 Disclaimer \u2192 Member hangs up", font: "Helvetica", size: 18 }),
      ]}),
      new Paragraph({ spacing: { after: 60 }, children: [
        new TextRun({ text: "Screened (works): ", font: "Helvetica", size: 18, bold: true, color: GREEN }),
        new TextRun({ text: "Greeting \u2192 Disclaimer \u2192 Pitch \u2192 Member engages", font: "Helvetica", size: 18 }),
      ]}),
      spacer(),
      body("The fix is straightforward: restructure the default opening to mimic the screened path. Greeting first, then disclaimer, then pitch. No new technology needed \u2014 just reorder what\u2019s already there.", { bold: true }),

      spacer(),
      heading("Other Root Cause Findings", HeadingLevel.HEADING_3),
      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [500, 3800, 1760, 3300],
        rows: [
          new TableRow({ children: [headerCell("#", 500), headerCell("Finding", 3800), headerCell("Data", 1760), headerCell("So What", 3300)] }),
          ...[
            ["1", "55% of hangups happen during the pitch", "128/231", "Pitch is where we lose people"],
            ["2", "55% of members just say \u201CHello?\u201D to the pitch", "96/173", "Pitch fires before they\u2019re ready to listen"],
            ["3", "After \u201CHello?\u201D, agent plays disclaimer 68% of time", "84/124", "Should greet them first"],
            ["4", "47% of short calls: member says hi, then hangs up", "87/184", "Opening doesn\u2019t hook them fast enough"],
          ].map(([n, f, d, i]) => new TableRow({ children: [
            dataCell(n, 500, { align: AlignmentType.CENTER, bold: true }),
            dataCell(f, 3800), dataCell(d, 1760, { align: AlignmentType.CENTER, bold: true }),
            dataCell(i, 3300, { color: GRAY }),
          ]})),
        ],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // === 5. TECH ISSUES ===
      heading("5. Other Issues"),

      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [2600, 1200, 1560, 1000, 3000],
        rows: [
          new TableRow({ children: [headerCell("Issue", 2600), headerCell("Affected", 1200), headerCell("% of Base", 1560), headerCell("Priority", 1000), headerCell("Description", 3000)] }),
          ...[
            ["VM \u201Cimportant message\u201D", "43", "12.8% of VMs", "MEDIUM", "Carrier screening triggers a spammy-sounding fallback"],
            ["Narrow call window", "561", "91.5% in 1hr", "LOW", "Almost all calls at 12\u20131pm PT. TZ scheduling due Apr 17."],
          ].map(([i, a, p, s, d]) => new TableRow({ children: [
            dataCell(i, 2600, { bold: true }), dataCell(a, 1200, { align: AlignmentType.CENTER }),
            dataCell(p, 1560, { align: AlignmentType.CENTER }), dataCell(s, 1000, { align: AlignmentType.CENTER, color: s === "HIGH" ? RED : GRAY, bold: true }),
            dataCell(d, 3000),
          ]})),
        ],
      }),

      spacer(),
      body("VM fallback: 91% of these are triggered by the same carrier screening prompt (\u201CIf you record your name...\u201D). The agent hears it and plays a generic \u201CI have an important message\u201D line instead of its normal branded greeting."),

      spacer(),
      heading("Correction from v1", HeadingLevel.HEADING_3),
      body("The April 14 draft flagged a \u201Cdouble-pitch bug\u201D affecting 68% of calls. Turned out to be a recording artifact \u2014 the transcript logs the opening twice, but the member only hears it once. Removed from this version. The quality gap is structural (opening sequence), not a specific bug.", { color: GRAY }),

      new Paragraph({ children: [new PageBreak()] }),

      // === 6. WHAT TO DO ===
      heading("6. What to Ship"),
      body("Ordered by expected impact."),
      spacer(),

      new Table({
        width: { size: PAGE_WIDTH, type: WidthType.DXA },
        columnWidths: [500, 4200, 1260, 3400],
        rows: [
          new TableRow({ children: [headerCell("#", 500), headerCell("Change", 4200), headerCell("Impact", 1260), headerCell("Why", 3400)] }),
          ...[
            ["1", "Restructure opening: greeting \u2192 disclaimer \u2192 pitch", "HIGH", "Screened calls are 7x more successful. Just reorder the existing sequence."],
            ["2", "Send SMS booking link on every connected call", "HIGH", "Only 4 of 240 calls sent a link. If member shows any interest, text them immediately."],
            ["3", "After member says \u201CHello?\u201D, greet them first", "MEDIUM", "84 calls went Hello? \u2192 disclaimer. Should be Hello? \u2192 \u201CHey, it\u2019s Jade from UFC Gym\u201D"],
            ["4", "Replace \u201Cimportant message\u201D VM fallback", "MEDIUM", "Swap the generic line for a branded voicemail intro."],
          ].map(([n, f, a, e]) => new TableRow({ children: [
            dataCell(n, 500, { align: AlignmentType.CENTER, bold: true, fill: n === "1" ? "E8F5E9" : n === "2" ? "FFF3E0" : undefined }),
            dataCell(f, 4200, { bold: true }),
            dataCell(a, 1260, { align: AlignmentType.CENTER, bold: true, color: a === "HIGH" ? RED : GRAY }),
            dataCell(e, 3400, { color: GRAY }),
          ]})),
        ],
      }),

      spacer(),
      heading("What\u2019s Working (Keep Doing)", HeadingLevel.HEADING_3),
      body("\u2022  39.2% pickup rate \u2014 top-tier for warm outbound. Platform scales."),
      body("\u2022  10 locations, zero failures. New locations match original pilots without tuning."),
      body("\u2022  0.5% opt-out. Members aren\u2019t hostile to the outreach."),
      body("\u2022  Voicemails are on-brand with recovery services pitch."),
      body("\u2022  Agent handles \u201Cnot interested\u201D gracefully, no pushback."),

      spacer(),
      heading("Open Questions", HeadingLevel.HEADING_3),
      body("\u2022  Apr 12 attrition results \u2014 where are they? We need retention numbers to tell the ROI story."),
      body("\u2022  Are recovery services the right campaign topic? Zero follow-up questions is a bad sign."),
      body("\u2022  We still can\u2019t track called \u2192 booked \u2192 showed. GymSales integration needed."),
      body("\u2022  SMS data missing from Apr 13 export. Need to pull for full picture."),

      spacer(), spacer(),
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: PURPLE, space: 8 } },
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({ text: "How this was built: ", font: "Helvetica", size: 16, bold: true, color: GRAY }),
          new TextRun({ text: "Every message in every call thread was tagged by type (pitch, greeting, disclaimer, question, etc.) and the sequence of tags was compared between successful and failed calls. The call screening finding was tested statistically to confirm it\u2019s real, not a fluke. All counts come from exact pattern matching on raw transcripts \u2014 no AI, no estimation. Reproducible via: ", font: "Helvetica", size: 16, color: GRAY }),
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
