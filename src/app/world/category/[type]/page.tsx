import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ENTITY_TYPES,
  ENTITY_TYPE_LABELS,
  EntityType,
  KG_ENTITIES,
  WORLD_SUBSECTIONS,
  WORLD_CATEGORY_CONNECTIONS,
  WORLD_CATEGORY_DESCRIPTIONS,
} from "@/lib/knowledge-graph";
import { PeekProvider } from "@/components/PeekProvider";
import { PeekList } from "@/components/PeekList";

export function generateStaticParams() {
  return ENTITY_TYPES.map((type) => ({ type }));
}

export default async function WorldCategoryPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!ENTITY_TYPES.includes(type as EntityType)) notFound();
  const entityType = type as EntityType;

  const entities = KG_ENTITIES.filter((e) => e.type === entityType).sort((a, b) => a.name.localeCompare(b.name));
  const subsections = WORLD_SUBSECTIONS[entityType];
  const connections = WORLD_CATEGORY_CONNECTIONS[entityType];
  const description = WORLD_CATEGORY_DESCRIPTIONS[entityType];

  return (
    <PeekProvider>
      <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", fontSize: "var(--size-sm)", color: "var(--text-3)", marginBottom: "1.25rem" }}>
            <Link href="/world" style={{ color: "var(--text-3)" }}>
              The World
            </Link>
            <span>/</span>
            <span style={{ color: "var(--text-1)" }}>{ENTITY_TYPE_LABELS[entityType]}</span>
          </div>

          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: description ? "0.5rem" : "1.75rem" }}>
            {ENTITY_TYPE_LABELS[entityType]}
          </h1>
          {description && (
            <p style={{ color: "var(--text-2)", marginBottom: "2rem", maxWidth: 620 }}>{description}</p>
          )}

          {subsections ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
              {subsections.map((sub) => {
                const subEntities = entities.filter((e) => e.subsection === sub);
                return (
                  <div key={sub} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
                    <h3 style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--text-1)", marginBottom: "0.75rem" }}>
                      {sub}
                    </h3>
                    {subEntities.length > 0 ? (
                      <PeekList
                        variant="grid"
                        items={subEntities.map((e) => ({ label: e.name, target: { kind: "world", slug: e.slug } }))}
                      />
                    ) : (
                      <p style={{ color: "var(--text-3)", fontSize: "var(--size-sm)" }}>Not yet mapped.</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : entities.length > 0 ? (
            <PeekList
              variant="grid"
              items={entities.map((e) => ({ label: e.name, target: { kind: "world", slug: e.slug } }))}
            />
          ) : (
            <div className="card" style={{ padding: "1.5rem", marginBottom: "2.5rem" }}>
              <p style={{ color: "var(--ink)", fontWeight: 500, marginBottom: "0.5rem" }}>
                Not yet mapped.
              </p>
              <p style={{ color: "var(--ink-2)" }}>
                {`No sourced entities in this category yet — the template for ${ENTITY_TYPE_LABELS[entityType].toLowerCase()} hasn't been built out. Coming in a future pass.`}
              </p>
            </div>
          )}

          {connections && connections.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontSize: "var(--size-xs)", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
                Connects to
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {connections.map((c) => (
                  <Link
                    key={c}
                    href={`/world/category/${c}`}
                    className="card"
                    style={{ padding: "0.5rem 0.95rem", fontSize: "var(--size-sm)", textDecoration: "none" }}
                  >
                    {ENTITY_TYPE_LABELS[c]}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </PeekProvider>
  );
}
