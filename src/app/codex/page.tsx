import Link from "next/link";
import { CODEX_BRANCHES } from "@/lib/codex";

export default function CodexIndexPage() {
  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>The Path to Freedom</div>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, color: "var(--amber-strong)", marginBottom: "0.75rem" }}>
          A Journey Across Four Dimensions
        </h1>
        <p style={{ fontSize: "var(--size-body)", color: "var(--text-2)", marginBottom: "2.5rem", maxWidth: 620 }}>
          Sovereignty starts with the Individual, strengthens through the Family, becomes
          tangible through Home and Land, and becomes resilient through Community. This is
          what you build. It&apos;s deliberately juxtaposed against{" "}
          <Link href="/world" style={{ color: "var(--amber-strong)" }}>
            the world
          </Link>{" "}
          outside it — the part you don&apos;t control, only navigate.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "0.75rem",
            alignItems: "start",
          }}
        >
          {CODEX_BRANCHES.map((branch) => (
            <Link
              key={branch.slug}
              href={`/codex/${branch.slug}`}
              className="card"
              style={{ display: "block", padding: "1.25rem 1.5rem", textDecoration: "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--ink)" }}>{branch.name}</span>
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
