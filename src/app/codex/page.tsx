import Link from "next/link";
import { CODEX_BRANCHES } from "@/lib/codex";

export default function CodexIndexPage() {
  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="label" style={{ marginBottom: "0.5rem" }}>
          The Sovereign Codex
        </div>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem" }}>
          Four circles, radiating out from the individual
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "2.5rem", maxWidth: 620 }}>
          Sovereignty starts with the individual, strengthens through the family, becomes
          tangible through home and land, and becomes resilient through community. This is
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
                <span style={{ fontWeight: 500 }}>{branch.name}</span>
                {!branch.detailed && (
                  <span className="pill pill-opinion" style={{ fontSize: "0.65rem" }}>
                    Not yet mapped
                  </span>
                )}
              </div>
              <p style={{ color: "var(--text-2)", fontSize: "0.88rem" }}>{branch.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
