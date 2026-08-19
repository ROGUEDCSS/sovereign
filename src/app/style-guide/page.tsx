const swatches: { name: string; token: string; note?: string }[] = [
  { name: "Background", token: "--bg" },
  { name: "Background (raised)", token: "--bg-raised" },
  { name: "Gold", token: "--amber", note: "buttons, headings, active state" },
  { name: "Gold (strong / hover)", token: "--amber-strong" },
  { name: "White block", token: "--cream", note: "every .card is this — pure white, not cream" },
  { name: "Danger / red", token: "--danger" },
  { name: "Good / green", token: "--good" },
  { name: "Text on dark (primary)", token: "--text-1" },
  { name: "Text on dark (secondary)", token: "--text-2" },
  { name: "Text on dark (muted)", token: "--text-3" },
  { name: "Ink (text on white)", token: "--ink" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 700, marginBottom: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", padding: "1rem 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ width: 170, flexShrink: 0, color: "var(--text-3)", fontSize: "var(--size-sm)" }}>{label}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.75rem" }}>
          Internal reference — not linked in navigation
        </div>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
          Sovereign style guide
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "3rem", maxWidth: 620 }}>
          The agreed scale, applied consistently everywhere from here on. When a page looks
          inconsistent, it&apos;s drifted from this — fix it back to match this page, not the
          other way around.
        </p>

        <Section title="Type scale — five levels, no others">
          <Row label="1. Page title (h1)">
            <div style={{ fontSize: "var(--size-h2)", fontWeight: 500 }}>The name of this page</div>
            <div style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginTop: "0.35rem" }}>
              var(--size-h2), weight 500. One per page, always the h1.
            </div>
          </Row>
          <Row label="2. Section heading">
            <div style={{ fontSize: "var(--size-h3)", fontWeight: 700 }}>A section of this page</div>
            <div style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginTop: "0.35rem" }}>
              var(--size-h3), weight 700. Every "Sources", "Connections", "Related X" heading —
              always this exact size, never h4.
            </div>
          </Row>
          <Row label="3. Card / item title">
            <div style={{ fontSize: "var(--size-h4)", fontWeight: 700 }}>Title of one card or item</div>
            <div style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginTop: "0.35rem" }}>
              var(--size-h4), weight 700. Item names, kicker-titles like "Definition"/"Facts",
              plan-step titles — anything that titles one card, not a whole section.
            </div>
          </Row>
          <Row label="4. Body paragraph">
            <div style={{ fontSize: "var(--size-body)" }}>
              The actual sentence-level content — descriptions, explanations, answers.
            </div>
            <div style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginTop: "0.35rem" }}>
              var(--size-body) for primary copy, var(--size-sm) for secondary/supporting copy.
              Never bold unless it&apos;s truly emphasis.
            </div>
          </Row>
          <Row label="5. Kicker / label">
            <div className="label" style={{ color: "var(--amber-strong)" }}>A small uppercase kicker</div>
            <div style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginTop: "0.35rem" }}>
              className=&quot;label&quot; (var(--size-label), uppercase, letter-spaced). Dark
              background only — breadcrumb-style context, never a heading substitute inside a
              white card.
            </div>
          </Row>
        </Section>

        <Section title="Color on white blocks — the one rule that keeps breaking">
          <p style={{ color: "var(--text-2)", marginBottom: "1.25rem" }}>
            Every <code>.card</code> is pure white (<code>#fff</code>). Inside one, text must be
            explicit black — the global heading rule (h1–h4, strong = gold) is written for the
            dark page background and will silently turn card titles into muddy gold-on-white if
            not overridden.
          </p>
          <div className="card" style={{ padding: "1.25rem 1.5rem" }}>
            <div style={{ fontSize: "var(--size-h4)", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem" }}>
              Correct: title is var(--ink)
            </div>
            <p style={{ color: "var(--ink-2)" }}>
              Body copy inside a card is var(--ink-2), not var(--text-2) — the card locally
              redefines that token, but always set color explicitly on headings/strong tags
              rather than relying on it.
            </p>
          </div>
        </Section>

        <Section title="Callout — the one deliberate exception">
          <p style={{ color: "var(--text-2)", marginBottom: "1.25rem" }}>
            A single, deliberately-loud pattern for the one most important prompt on a page (e.g.
            the Codex &quot;practical question&quot;). Solid gold, black text, larger than a
            normal card title so it doesn&apos;t get confused with one.
          </p>
          <div className="card" style={{ padding: "1.25rem 1.5rem", background: "var(--amber)" }}>
            <div style={{ fontSize: "var(--size-h3)", fontWeight: 700, color: "#1a1005", marginBottom: "0.5rem" }}>
              The callout title
            </div>
            <p style={{ fontSize: "var(--size-body)", fontWeight: 500, color: "#1a1005" }}>
              The callout body text — still readable at a glance, still clearly a step down from
              the title above it.
            </p>
          </div>
        </Section>

        <Section title="Buttons">
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button className="btn btn-primary">Primary action</button>
            <button className="btn btn-outline">Secondary action</button>
          </div>
          <div style={{ color: "var(--text-3)", fontSize: "var(--size-sm)", marginTop: "0.75rem" }}>
            Both render solid gold (#1a1005 text) — there is no ghost/transparent button style on
            this site.
          </div>
        </Section>

        <Section title="Colour tokens">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {swatches.map((s) => (
              <div key={s.token} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "8px",
                    background: `var(${s.token})`,
                    border: "1px solid var(--border-strong)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 500 }}>
                    {s.name} <span style={{ color: "var(--text-3)", fontSize: "var(--size-sm)" }}>{s.token}</span>
                  </div>
                  {s.note && <div style={{ color: "var(--text-3)", fontSize: "var(--size-sm)" }}>{s.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
