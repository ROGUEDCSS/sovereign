import { entitiesByType, ENTITY_TYPE_LABELS } from "@/lib/knowledge-graph";
import { PeekProvider } from "@/components/PeekProvider";
import { PeekList } from "@/components/PeekList";

export default function WorldIndex() {
  const groups = entitiesByType();
  return (
    <PeekProvider>
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
            but do not control. People, organisations, governments, and the policies between them.
            Deliberately small for now: every entity and every relationship here is sourced, not
            asserted. Expanding this means adding sourced entities, not speculation about who
            controls what.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {groups.map(({ type, entities }) => (
              <div key={type}>
                <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "0.9rem" }}>
                  {ENTITY_TYPE_LABELS[type]}
                </h2>
                <PeekList
                  variant="grid"
                  items={[...entities]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((e) => ({ label: e.name, target: { kind: "world", slug: e.slug } }))}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </PeekProvider>
  );
}
