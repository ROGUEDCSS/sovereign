import Link from "next/link";
import { CODEX_BRANCHES } from "@/lib/codex";

const JOURNEY_TAG: Record<string, string> = {
  individual: "Where it starts",
  family: "Where it strengthens",
  home: "Where it becomes tangible",
  community: "Where it becomes resilient",
};

const CODEX_PROMISE: Record<string, string> = {
  individual:
    "Codex gives you a clear map of what you actually know, own, and can do — and a way to close the gaps, one skill and one document at a time.",
  family:
    "Codex turns “we should really sort that out” into an actual plan — one every member of the household can see and contribute to.",
  home: "Codex shows you exactly what your home and land already provide, and what's missing before you need it.",
  community:
    "Codex helps you find and build the relationships that actually show up — before you're relying on strangers.",
};

export default function CodexIndexPage() {
  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>The Path to Freedom</div>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, color: "var(--amber-strong)", marginBottom: "0.75rem" }}>
          A Journey Across Four Dimensions
        </h1>
        <p style={{ fontSize: "var(--size-body)", color: "var(--text-2)", marginBottom: "1rem", maxWidth: 620 }}>
          Sovereignty starts with the Individual, strengthens through the Family, becomes
          tangible through Home and Land, and becomes resilient through Community. This is
          what you build.
        </p>
        <p style={{ fontSize: "var(--size-body)", color: "var(--text-2)", marginBottom: "1rem", maxWidth: 620 }}>
          It&apos;s deliberately juxtaposed against{" "}
          <Link href="/world" style={{ color: "var(--amber-strong)" }}>
            the world
          </Link>{" "}
          outside it — the part you don&apos;t control, only navigate. The world is loud, fast-moving,
          and largely indifferent to what you&apos;d prefer — you can study it, prepare for it, and
          respond to it, but you can&apos;t steer it.
        </p>
        <p style={{ fontSize: "var(--size-body)", color: "var(--text-2)", marginBottom: "2.5rem", maxWidth: 620 }}>
          The Codex is the opposite: everything here is something you can actually build,
          strengthen, or fix, starting today.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {CODEX_BRANCHES.map((branch, i) => (
            <div
              key={branch.slug}
              style={
                i === 0
                  ? { border: "1px solid var(--border-strong)", borderRadius: "12px", padding: "1.5rem" }
                  : undefined
              }
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "0.3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--amber)",
                      color: "#1a1005",
                      fontSize: "var(--size-sm)",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--amber-strong)" }}>{branch.name}</h2>
                  <span style={{ fontSize: "var(--size-xs)", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {JOURNEY_TAG[branch.slug]}
                  </span>
                </div>
                {!branch.detailed && (
                  <span className="pill pill-opinion" style={{ fontSize: "var(--size-xs)", flexShrink: 0 }}>
                    Not yet mapped
                  </span>
                )}
              </div>

              <p style={{ fontSize: "var(--size-body)", color: "#fff", marginBottom: "0.75rem" }}>{branch.tagline}</p>
              <p style={{ fontSize: "var(--size-body)", color: "#fff", marginBottom: "1rem" }}>{CODEX_PROMISE[branch.slug]}</p>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link href={`/codex/${branch.slug}`} className="btn btn-primary" style={{ padding: "0.65rem 1.25rem", fontSize: "var(--size-sm)" }}>
                  Explore {branch.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
