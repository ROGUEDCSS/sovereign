import Link from "next/link";
import { THREAT_SYSTEMS } from "@/lib/threat-map";

export default function ThreatMapPage() {
  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.5rem" }}>
          The threat map
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "2.5rem" }}>
          Not a conspiracy map. A dependency map — the systems your household relies on, and
          the known ways each one can fail.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
          {THREAT_SYSTEMS.map((system) => (
            <div key={system.name} className="card" style={{ padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 500, marginBottom: "0.9rem" }}>
                {system.name}
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {system.vulnerabilities.map((v) => (
                  <span key={v} className="pill" style={{ background: "rgba(194,91,79,0.12)", color: "#e0968a" }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ fontWeight: 500, marginBottom: "0.4rem" }}>
            Every system has failure modes. Build alternatives.
          </p>
          <p style={{ color: "var(--text-2)", fontSize: "0.9rem" }}>
            You don&apos;t need to predict which failure happens, or agree about why the risk
            exists. You need options that hold up regardless of the cause.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/scenario-room" className="btn btn-primary">
            Run a scenario →
          </Link>
          <Link href="/assessment" className="btn btn-outline">
            Measure your household
          </Link>
        </div>
      </div>
    </main>
  );
}
