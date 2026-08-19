interface Row {
  name: string;
  example: React.ReactNode;
  technical: string;
  rule: string;
}

function Swatch({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "6px",
        background: color,
        border: "1px solid var(--border-strong)",
      }}
    />
  );
}

function WhiteExample({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: "8px", padding: "0.75rem 1rem" }}>
      {children}
    </div>
  );
}

const ROWS: Row[] = [
  {
    name: "Page title",
    example: <span style={{ fontSize: "var(--size-h2)", fontWeight: 500, color: "var(--amber-strong)" }}>Page title</span>,
    technical: "var(--size-h2), weight 500, color var(--amber-strong)",
    rule: "One per page, applied to the <h1> tag. Note: the variable is named --size-h2 (a size-scale label, not an HTML tag reference) — it still styles <h1>. Gold by default unless a page explicitly overrides it white.",
  },
  {
    name: "Section heading",
    example: <span style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--amber-strong)" }}>Section heading</span>,
    technical: "var(--size-h3), weight 500, color var(--amber-strong)",
    rule: "Every \"Sources\", \"Connections\", \"Related X\" style heading. Always this exact size, never h4.",
  },
  {
    name: "Card / item title",
    example: (
      <WhiteExample>
        <span style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>Card title</span>
      </WhiteExample>
    ),
    technical: "var(--size-h4), weight 500, color var(--ink)",
    rule: "Titles one card or item, not a whole section. Explicit black — never relies on inherited gold.",
  },
  {
    name: "Body paragraph",
    example: <span style={{ fontSize: "var(--size-body)" }}>Normal paragraph text</span>,
    technical: "var(--size-body), weight 400",
    rule: "One size, everywhere — description, explanation, answer, caption, list item. No separate small/secondary size.",
  },
  {
    name: "Body paragraph — bold",
    example: <span style={{ fontSize: "var(--size-body)", fontWeight: 700 }}>Bold paragraph text</span>,
    technical: "var(--size-body), weight 700",
    rule: "Exact same size as normal. Weight is the only lever for making a paragraph stand out.",
  },
  {
    name: "Kicker / label",
    example: <span className="label" style={{ color: "var(--amber-strong)" }}>Kicker label</span>,
    technical: 'className="label" — var(--size-label), uppercase, letter-spacing 0.08em',
    rule: "Dark background only. Never used inside a white card as a substitute heading.",
  },
  {
    name: "Card",
    example: (
      <WhiteExample>
        <span style={{ fontSize: "var(--size-body)", fontWeight: 400, color: "var(--ink)" }}>
          Normal paragraph text inside a card
        </span>
      </WhiteExample>
    ),
    technical: "className=\"card\" — background: var(--white-block) = #fff; text var(--size-body), weight 400, color var(--ink)",
    rule: "Every .card is solid white, no tint. Text inside must be explicit black, never inherited.",
  },
  {
    name: "Callout",
    example: (
      <div style={{ background: "var(--amber)", borderRadius: "8px", padding: "0.75rem 1rem" }}>
        <span style={{ fontSize: "var(--size-body)", fontWeight: 700, color: "#1a1005" }}>
          Bold paragraph text inside a callout
        </span>
      </div>
    ),
    technical: "var(--size-body), weight 700, background var(--amber), color #1a1005",
    rule: "Reserved for the single most important prompt on a page. Text is just bold paragraph text (row 5) on a gold background — not a separate size.",
  },
  {
    name: "Button",
    example: <button className="btn btn-primary" style={{ padding: "0.5rem 1rem" }}>Action</button>,
    technical: 'className="btn btn-primary"',
    rule: "The only button style on this site. Solid gold background, #1a1005 text — no secondary/ghost variant.",
  },
  {
    name: "Colour — Background",
    example: (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Swatch color="var(--bg)" />
        <Swatch color="#fff" />
      </div>
    ),
    technical: "var(--bg) or #fff",
    rule: "Two options only: black (var(--bg), the default) or white. No other page-level background colour is used.",
  },
  {
    name: "Colour — Gold",
    example: <Swatch color="var(--amber)" />,
    technical: "var(--amber)",
    rule: "Buttons, callouts, gold headings, active nav state.",
  },
  {
    name: "Colour — Danger",
    example: <Swatch color="var(--danger)" />,
    technical: "var(--danger)",
    rule: "Red-tier score, warnings, cost/time flags.",
  },
  {
    name: "Colour — Good",
    example: <Swatch color="var(--good)" />,
    technical: "var(--good)",
    rule: "Green-tier score, positive state.",
  },
  {
    name: "Colour — Text",
    example: (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <div style={{ background: "var(--bg)", borderRadius: "6px", padding: "0.5rem 0.75rem" }}>
          <span style={{ color: "#fff" }}>White on black</span>
        </div>
        <div style={{ background: "#fff", borderRadius: "6px", padding: "0.5rem 0.75rem" }}>
          <span style={{ color: "var(--ink)" }}>Black on white</span>
        </div>
      </div>
    ),
    technical: "#fff on var(--bg); var(--ink) on white",
    rule: "Black background -> pure white text. White background -> pure black text. That's the whole rule, unless a specific row above says otherwise.",
  },
];

export default function StyleGuidePage() {
  return (
    <main className="container" style={{ paddingTop: "2.5rem", paddingBottom: "6rem" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100, tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: 50 }} />
            <col style={{ width: 180 }} />
            <col style={{ width: 420 }} />
            <col style={{ width: 220 }} />
            <col style={{ width: 230 }} />
          </colgroup>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-strong)" }}>
              {["#", "Element", "Example", "Technical", "Rule"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "0.75rem 1rem",
                    fontSize: "var(--size-label)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--text-3)",
                    fontWeight: 500,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.name} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "1rem", color: "var(--text-3)", verticalAlign: "middle" }}>{i + 1}</td>
                <td style={{ padding: "1rem", verticalAlign: "middle" }}>{row.name}</td>
                <td style={{ padding: "1rem", verticalAlign: "middle" }}>{row.example}</td>
                <td
                  style={{
                    padding: "1rem",
                    verticalAlign: "middle",
                    fontFamily: "monospace",
                    fontSize: "var(--size-sm)",
                    color: "var(--text-2)",
                  }}
                >
                  {row.technical}
                </td>
                <td style={{ padding: "1rem", verticalAlign: "middle", color: "var(--text-2)", fontSize: "var(--size-sm)" }}>
                  {row.rule}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
