import Link from "next/link";
import { entitiesByType, ENTITY_TYPE_LABELS, WORLD_CATEGORY_DESCRIPTIONS } from "@/lib/knowledge-graph";

export default function WorldIndex() {
  const groups = entitiesByType();
  return (
    <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="label" style={{ color: "var(--amber-strong)", marginBottom: "0.5rem" }}>
          Not the Codex — the opposing pillar
        </div>
        <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "0.75rem" }}>
          The World
        </h1>
        <p style={{ color: "var(--text-2)", marginBottom: "2.5rem", maxWidth: 620 }}>
          Everything outside us — the environment you must understand, navigate, and scrutinise,
          but do not control. Thirteen categories. Deliberately small for now: every entity and
          every relationship here is sourced, not asserted. Expanding this means adding sourced
          entities, not speculation about who controls what.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {groups.map(({ type, entities }) => (
            <div
              key={type}
              style={{ border: "1px solid var(--border-strong)", borderRadius: "12px", padding: "1.5rem" }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", marginBottom: "0.6rem" }}>
                <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, color: "var(--amber-strong)" }}>
                  {ENTITY_TYPE_LABELS[type]}
                </h2>
                {entities.length === 0 ? (
                  <span className="pill pill-opinion" style={{ fontSize: "var(--size-xs)", flexShrink: 0 }}>
                    Not yet mapped
                  </span>
                ) : (
                  <span style={{ fontSize: "var(--size-xs)", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {entities.length} {entities.length === 1 ? "entity" : "entities"}
                  </span>
                )}
              </div>
              <p style={{ color: "var(--text-2)", fontSize: "var(--size-body)", marginBottom: "1.25rem", maxWidth: 560 }}>
                {WORLD_CATEGORY_DESCRIPTIONS[type]}
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  href={`/world/category/${type}`}
                  className="btn btn-primary"
                  style={{ padding: "0.65rem 1.25rem", fontSize: "var(--size-sm)" }}
                >
                  Explore {ENTITY_TYPE_LABELS[type]} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
