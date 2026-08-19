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
    example: <span style={{ fontSize: "var(--size-h2)", fontWeight: 500 }}>Page title</span>,
    technical: "var(--size-h2), weight 500",
    rule: "One per page. Always the <h1> tag, nothing else uses this size.",
  },
  {
    name: "Section heading",
    example: <span style={{ fontSize: "var(--size-h3)", fontWeight: 700 }}>Section heading</span>,
    technical: "var(--size-h3), weight 700",
    rule: "Every \"Sources\", \"Connections\", \"Related X\" style heading. Always this exact size, never h4.",
  },
  {
    name: "Card / item title",
    example: (
      <WhiteExample>
        <span style={{ fontSize: "var(--size-h4)", fontWeight: 700, color: "var(--ink)" }}>Card title</span>
      </WhiteExample>
    ),
    technical: "var(--size-h4), weight 700, color var(--ink)",
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
    name: "Body paragraph — muted",
    example: <span style={{ fontSize: "var(--size-body)", color: "var(--text-3)" }}>Muted paragraph text</span>,
    technical: "var(--size-body), color var(--text-3) / var(--ink-2)",
    rule: "Colour de-emphasises, not a smaller font-size. Still var(--size-body).",
  },
  {
    name: "Kicker / label",
    example: <span className="label" style={{ color: "var(--amber-strong)" }}>Kicker label</span>,
    technical: 'className="label" — var(--size-label), uppercase, letter-spacing 0.08em',
    rule: "Dark background only. Never used inside a white card as a substitute heading.",
  },
  {
    name: "White block",
    example: <WhiteExample><span style={{ color: "var(--ink)" }}>A card</span></WhiteExample>,
    technical: "background: var(--cream) = #fff",
    rule: "Every .card is solid white, no cream tint. Text inside must be explicit black, never inherited.",
  },
  {
    name: "Callout",
    example: (
      <div style={{ background: "var(--amber)", borderRadius: "8px", padding: "0.75rem 1rem" }}>
        <span style={{ color: "#1a1005", fontWeight: 700 }}>Callout</span>
      </div>
    ),
    technical: "background: var(--amber), color #1a1005",
    rule: "Reserved for the single most important prompt on a page. Not a general card style.",
  },
  {
    name: "Button — primary",
    example: <button className="btn btn-primary" style={{ padding: "0.5rem 1rem" }}>Action</button>,
    technical: 'className="btn btn-primary"',
    rule: "The default action button. Solid gold background, #1a1005 text.",
  },
  {
    name: "Button — secondary",
    example: <button className="btn btn-outline" style={{ padding: "0.5rem 1rem" }}>Action</button>,
    technical: 'className="btn btn-outline"',
    rule: "Same solid gold treatment as primary. There is no ghost/transparent button on this site.",
  },
  {
    name: "Colour — Background",
    example: <Swatch color="var(--bg)" />,
    technical: "var(--bg)",
    rule: "The page background, everywhere.",
  },
  {
    name: "Colour — Background raised",
    example: <Swatch color="var(--bg-raised)" />,
    technical: "var(--bg-raised)",
    rule: "A dark surface one step up from the page background — nav dropdowns, tooltips.",
  },
  {
    name: "Colour — Gold",
    example: <Swatch color="var(--amber)" />,
    technical: "var(--amber)",
    rule: "Buttons, callouts, gold headings, active nav state.",
  },
  {
    name: "Colour — Gold, strong",
    example: <Swatch color="var(--amber-strong)" />,
    technical: "var(--amber-strong)",
    rule: "Hover state on gold, and gold headings on the dark background.",
  },
  {
    name: "Colour — White block",
    example: <Swatch color="var(--cream)" />,
    technical: "var(--cream)",
    rule: "Every .card background. Pure white, not off-white.",
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
    name: "Colour — Text on dark, primary",
    example: <Swatch color="var(--text-1)" />,
    technical: "var(--text-1)",
    rule: "Default body text colour on the dark background.",
  },
  {
    name: "Colour — Text on dark, secondary",
    example: <Swatch color="var(--text-2)" />,
    technical: "var(--text-2)",
    rule: "Muted body text on the dark background.",
  },
  {
    name: "Colour — Text on dark, muted",
    example: <Swatch color="var(--text-3)" />,
    technical: "var(--text-3)",
    rule: "Quietest text on the dark background — captions, meta.",
  },
  {
    name: "Colour — Ink",
    example: <Swatch color="var(--ink)" />,
    technical: "var(--ink)",
    rule: "Text colour on every white block.",
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
