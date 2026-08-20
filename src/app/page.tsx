import Link from "next/link";
import { CODEX_BRANCHES } from "@/lib/codex";
import { ENTITY_TYPES, ENTITY_TYPE_LABELS } from "@/lib/knowledge-graph";

const CIVILIZATIONAL_VALUES = [
  { label: "Rule of law", text: "The law applies to everyone, including the people who make it." },
  { label: "Free markets & property rights", text: "You own what you build, and you can trade it freely." },
  { label: "Freedom of speech", text: "Dissent that doesn't require permission." },
  { label: "Freedom of religion", text: "Belief and worship that answer to no government." },
  { label: "Representative government", text: "Power that can be replaced without violence." },
  { label: "Individual rights", text: "The person, not the collective, is the basic unit the system protects." },
];

const PERSONAL_VALUES = [
  { label: "Rugged individualism", text: "The belief that you are capable, responsible, and free to build your own life — not a ward of any system." },
  { label: "Independence", text: "Owning enough of your own means — money, skills, land — that no single institution holds your future." },
  { label: "Faith", text: "A moral compass higher than the state, and a community bound by more than convenience." },
  { label: "Hard work", text: "Outcomes earned, not entitled." },
  { label: "Family", text: "The first and most durable loyalty." },
  { label: "Resilience", text: "The capacity to absorb a setback and keep going." },
];

const PILLARS = [
  {
    step: 1,
    tag: "GET READY",
    title: "Know exactly where you stand.",
    body: "Your Sovereign Score is the starting point — an honest read across all twelve domains, before you try to fix anything. This is you knowing where you actually are, not where you assume you are.",
    links: [
      { label: "Get your Sovereign Score", href: "/assessment" },
      { label: "Build my system", href: "/build-my-system" },
    ],
  },
  {
    step: 2,
    tag: "GET SKILLED",
    title: "The skills only you can carry.",
    body: "Fire. A blade. First aid. Leading people, and saying what you actually mean. Skills live in you, not in a cupboard — nobody can hand them to you in the moment you need them.",
    links: [
      { label: "Family capability", href: "/codex/family/family-capability" },
      { label: "Personal development", href: "/codex/individual/personal-development" },
    ],
  },
  {
    step: 3,
    tag: "GET ORGANISED",
    title: "Everything in its place, before you need it.",
    body: "Fuel in the tank. Food in the store. The animals fed, the water tank full, the tools where you can find them in the dark. This is the physical work — your home and land, actually ready.",
    links: [
      { label: "Home & Land", href: "/codex/home" },
      { label: "Threat map", href: "/threat-map" },
    ],
  },
  {
    step: 4,
    tag: "GET CONNECTED",
    title: "Find your clan.",
    body: "Neighbours, tradespeople, mutual aid — the people who actually show up. Sovereignty isn't done alone. It's done with the people building the same thing you are.",
    links: [
      { label: "Community", href: "/codex/community" },
      { label: "Mutual aid", href: "/codex/community/mutual-aid" },
    ],
  },
];

export default function Home() {
  return (
    <main>
      <section className="container" style={{ paddingTop: "6rem", paddingBottom: "5rem", maxWidth: 760 }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "1rem" }}>
          This is your warning
        </div>
        <h1 style={{ fontSize: "var(--size-h1)", fontWeight: 500, lineHeight: 1.15, marginBottom: "1.5rem" }}>
          The storm is coming.
        </h1>
        <p style={{ fontSize: "var(--size-h4)", color: "var(--text-2)", marginBottom: "1.25rem", maxWidth: 560 }}>
          If you don&apos;t have a plan for the world — know that the world has a plan for you, and
          it is a plan without thought or care for your wellbeing.
        </p>
        <p style={{ fontSize: "var(--size-h4)", color: "#fff", fontWeight: 700, marginBottom: "1.25rem", maxWidth: 560 }}>
          Get your affairs in order before the New World begins...
        </p>
        <p style={{ fontSize: "var(--size-h4)", color: "var(--text-2)", marginBottom: "2.5rem", maxWidth: 560 }}>
          The Sovereign Codex is a complete blueprint for you and your family — to get ready,
          skilled, organised, and connected with your kin and clan.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/sovereignty" className="btn btn-primary" style={{ fontSize: "var(--size-body)" }}>
            What does it mean to be Sovereign?
          </Link>
          <Link href="/codex" className="btn btn-primary" style={{ fontSize: "var(--size-body)" }}>
            Explore the Codex
          </Link>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border)", background: "#fff" }}>
        <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem", textAlign: "center" }}>
          <p style={{ color: "var(--ink-2)", fontSize: "var(--size-body)", marginBottom: "1.25rem" }}>
            Twelve domains, three questions each — know exactly where you stand before you try to fix anything.
          </p>
          <Link href="/assessment" className="btn btn-primary" style={{ fontSize: "var(--size-body)" }}>
            Get your Sovereign Score →
          </Link>
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

          <div style={{ marginTop: "2.75rem" }}>
            <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>
              The Foundations of Sovereignty
            </div>
            <h2 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem", maxWidth: 560 }}>
              Western values
            </h2>
            <p style={{ color: "var(--text-2)", marginBottom: "2rem", maxWidth: 620 }}>
              None of this arrived by accident. Rome gave the world codified law and the idea that
              even rulers answer to it. The Anglo-Saxons gave it trial by jury, the rights of the
              freeman, and the common law that grew into Magna Carta and parliament. What's below is
              the compressed result of two thousand years of war, revolution, and hard-won reform —
              civilisation's toil, not nostalgia for it. Two layers: what that struggle built for the
              society you live in, and what it demands of you personally if you want to keep it.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ border: "1px solid var(--border-strong)", borderRadius: "12px", padding: "1.5rem" }}>
                <h3
                  className="card"
                  style={{ display: "inline-block", fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)", padding: "0.5rem 1rem", borderRadius: "8px", marginBottom: "1.1rem" }}
                >
                  Core civilizational values
                </h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {CIVILIZATIONAL_VALUES.map((v) => (
                    <li key={v.label} style={{ fontSize: "var(--size-body)", color: "var(--text-2)" }}>
                      <strong style={{ color: "var(--amber-strong)" }}>{v.label}:</strong> {v.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ border: "1px solid var(--border-strong)", borderRadius: "12px", padding: "1.5rem" }}>
                <h3
                  className="card"
                  style={{ display: "inline-block", fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)", padding: "0.5rem 1rem", borderRadius: "8px", marginBottom: "1.1rem" }}
                >
                  Personal life values
                </h3>
                <ul style={{ listStyleType: "disc", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {PERSONAL_VALUES.map((v) => (
                    <li key={v.label} style={{ fontSize: "var(--size-body)", color: "var(--text-2)" }}>
                      <strong style={{ color: "var(--amber-strong)" }}>{v.label}:</strong> {v.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border)", background: "#fff" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            {PILLARS.map((p) => (
              <div key={p.tag} style={{ padding: "1.5rem", borderRadius: "10px", background: "var(--amber)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "1.1rem" }}>
                  <span style={{ fontSize: "2.1rem", fontWeight: 800, color: "var(--ink)", lineHeight: 1 }}>
                    {String(p.step).padStart(2, "0")}
                  </span>
                  <span className="label" style={{ color: "var(--ink)", opacity: 0.65 }}>
                    {p.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: "var(--size-h3)", fontWeight: 700, marginBottom: "0.6rem", lineHeight: 1.35, color: "var(--ink)" }}>
                  {p.title}
                </h3>
                <p style={{ color: "var(--ink-2)", fontSize: "var(--size-h4)", marginBottom: "1.25rem", lineHeight: 1.55 }}>
                  {p.body}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {p.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        background: "var(--ink)",
                        color: "var(--amber-strong)",
                        fontSize: "var(--size-sm)",
                        fontWeight: 700,
                        textDecoration: "none",
                        padding: "0.45rem 0.9rem",
                        borderRadius: "8px",
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-raised)" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>
            Not the Codex — the opposing pillar
          </div>
          <h2 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem", maxWidth: 560 }}>
            The World
          </h2>
          <p style={{ color: "var(--text-2)", marginBottom: "1.5rem", maxWidth: 560 }}>
            Everything outside you — the environment you have to understand and navigate, but
            don&apos;t control. Thirteen categories. Sourced, not speculated.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
            {ENTITY_TYPES.map((type) => (
              <Link
                key={type}
                href={`/world/category/${type}`}
                className="card"
                style={{ padding: "0.5rem 0.95rem", fontSize: "var(--size-sm)", textDecoration: "none" }}
              >
                {ENTITY_TYPE_LABELS[type]}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/threat-map" className="btn btn-primary">
              Threat map
            </Link>
            <Link href="/world" className="btn btn-primary">
              Open the World
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
