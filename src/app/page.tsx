import Link from "next/link";
import { CODEX_BRANCHES } from "@/lib/codex";
import { entitiesByType } from "@/lib/knowledge-graph";

const PILLARS = [
  {
    tag: "GET READY",
    title: "See what breaks. Find out if you'd survive it.",
    body: "Power. Banking. Internet. Food. Water. Most people don't know how exposed they are until one of these stops. Run the scenarios before one runs on you.",
    links: [
      { label: "Scenario room", href: "/scenario-room" },
      { label: "Threat map", href: "/threat-map" },
    ],
  },
  {
    tag: "GET ORGANISED",
    title: "Score your household. Get a plan, not a panic list.",
    body: "Twelve domains, one number, five actions to start this week — prioritised by what's actually weakest, not what's loudest.",
    links: [
      { label: "Get your Sovereign Score", href: "/assessment" },
      { label: "Build my system", href: "/build-my-system" },
    ],
  },
  {
    tag: "GET SKILLED",
    title: "Real knowledge, sourced and sorted.",
    body: "Digital ID. CBDCs. The 2030 Agenda. Every claim labelled fact, scenario, or opinion — evidence outranks ideology, always.",
    links: [
      { label: "Explore the Codex", href: "/codex" },
      { label: "Knowledge base", href: "/knowledge-base" },
    ],
  },
  {
    tag: "GET CONNECTED",
    title: "The one thing you can't stockpile.",
    body: "Neighbours, tradespeople, mutual aid. Build the network before the day you actually need to call someone.",
    links: [
      { label: "Community", href: "/codex/community" },
      { label: "Mutual aid", href: "/codex/community/mutual-aid" },
    ],
  },
];

export default function Home() {
  const worldTeaser = entitiesByType()
    .flatMap((g) => g.entities)
    .slice(0, 6);

  return (
    <main>
      <section className="container" style={{ paddingTop: "6rem", paddingBottom: "5rem", maxWidth: 760 }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "1rem" }}>
          This is your warning
        </div>
        <h1 style={{ fontSize: "var(--size-h1)", fontWeight: 500, lineHeight: 1.15, marginBottom: "1.5rem" }}>
          The storm is coming.
        </h1>
        <p style={{ fontSize: "var(--size-h4)", color: "var(--text-2)", marginBottom: "2.5rem", maxWidth: 560 }}>
          Get your affairs in order before the system fails. Power outages. Bank freezes. Supply
          shocks. Most households find out how exposed they are the hard way.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/assessment" className="btn btn-primary" style={{ fontSize: "var(--size-body)" }}>
            Get your Sovereign Score →
          </Link>
          <Link href="/codex" className="btn btn-outline" style={{ fontSize: "var(--size-body)" }}>
            Explore the Codex
          </Link>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border)", background: "#fff" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <h2 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem", maxWidth: 560, color: "var(--ink)" }}>
            4 STEPS: Start TODAY
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {PILLARS.map((p) => (
              <div key={p.tag} style={{ padding: "1.5rem", borderRadius: "10px", background: "var(--ink)" }}>
                <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "1rem" }}>
                  {p.tag}
                </div>
                <h3 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "0.6rem", lineHeight: 1.35, color: "var(--amber-strong)" }}>
                  {p.title}
                </h3>
                <p style={{ color: "#fff", fontSize: "var(--size-h4)", marginBottom: "1.25rem", lineHeight: 1.55 }}>
                  {p.body}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {p.links.map((l) => (
                    <Link key={l.href} href={l.href} style={{ color: "#fff", fontSize: "var(--size-body)", textDecoration: "none", fontWeight: 600 }}>
                      {l.label} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <h2 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem", maxWidth: 560 }}>
            The Sovereign Codex
          </h2>
          <p style={{ color: "var(--text-2)", marginBottom: "1.5rem", maxWidth: 560 }}>
            Four circles, radiating out from the individual — the human-centred map of what you
            actually build. This is what you control.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "0.6rem",
              marginBottom: "1.75rem",
            }}
          >
            {CODEX_BRANCHES.map((b) => (
              <Link
                key={b.slug}
                href={`/codex/${b.slug}`}
                className="card"
                style={{ padding: "0.9rem 1.1rem", fontSize: "var(--size-sm)", textDecoration: "none" }}
              >
                {b.name}
              </Link>
            ))}
          </div>
          <Link href="/codex" className="btn btn-outline">
            Open the Codex
          </Link>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-raised)" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="label" style={{ color: "var(--text-3)", marginBottom: "0.5rem" }}>
            Not the Codex — the opposing pillar
          </div>
          <h2 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem", maxWidth: 560 }}>
            The World
          </h2>
          <p style={{ color: "var(--text-2)", marginBottom: "1.5rem", maxWidth: 560 }}>
            Everything outside you — the environment you have to understand and navigate, but
            don&apos;t control. Governments, institutions, policy. Sourced, not speculated.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
            {worldTeaser.map((e) => (
              <Link
                key={e.slug}
                href={`/world/${e.slug}`}
                className="card"
                style={{ padding: "0.5rem 0.95rem", fontSize: "var(--size-sm)", textDecoration: "none" }}
              >
                {e.name}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/world" className="btn btn-outline">
              Open the World
            </Link>
            <Link href="/threat-map" style={{ color: "var(--amber-strong)", fontSize: "var(--size-sm)", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              Threat map →
            </Link>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ paddingTop: "2rem", paddingBottom: "2rem", color: "var(--text-3)", fontSize: "var(--size-sm)" }}>
          You can&apos;t control the direction of the world. You can control how dependent you
          are on any single part of it.
        </div>
      </footer>
    </main>
  );
}
