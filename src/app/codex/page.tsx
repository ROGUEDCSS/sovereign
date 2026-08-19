import Link from "next/link";
import { CODEX_BRANCHES } from "@/lib/codex";

const JOURNEY_TAG: Record<string, string> = {
  individual: "Where it starts",
  family: "Where it strengthens",
  home: "Where it becomes tangible",
  community: "Where it becomes resilient",
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

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {CODEX_BRANCHES.map((branch, i) => (
            <Link
              key={branch.slug}
              href={`/codex/${branch.slug}`}
              className="card"
              style={{ display: "block", padding: "1.25rem 1.5rem", minHeight: 130, textDecoration: "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "var(--amber)",
                      color: "#1a1005",
                      fontSize: "var(--size-xs)",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>{branch.name}</span>
                  <span style={{ fontSize: "var(--size-sm)", color: "var(--amber-on-light)", fontWeight: 600 }}>
                    — {JOURNEY_TAG[branch.slug]}
                  </span>
                </div>
                {!branch.detailed && (
                  <span className="pill pill-opinion" style={{ fontSize: "var(--size-xs)" }}>
                    Not yet mapped
                  </span>
                )}
              </div>
              <p style={{ fontSize: "var(--size-body)", color: "var(--ink-2)" }}>{branch.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
