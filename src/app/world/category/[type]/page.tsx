import Link from "next/link";
import { notFound } from "next/navigation";
import { ENTITY_TYPES, ENTITY_TYPE_LABELS, EntityType, KG_ENTITIES } from "@/lib/knowledge-graph";
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

          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "1.75rem" }}>
            {ENTITY_TYPE_LABELS[entityType]}
          </h1>

          {entities.length > 0 ? (
            <PeekList
              variant="grid"
              items={entities.map((e) => ({ label: e.name, target: { kind: "world", slug: e.slug } }))}
            />
          ) : (
            <div className="card" style={{ padding: "1.5rem" }}>
              <p style={{ color: "var(--ink)", fontWeight: 500, marginBottom: "0.5rem" }}>
                Not yet mapped.
              </p>
              <p style={{ color: "var(--ink-2)" }}>
                {`No sourced entities in this category yet — the template for ${ENTITY_TYPE_LABELS[entityType].toLowerCase()} hasn't been built out. Coming in a future pass.`}
              </p>
            </div>
          )}
        </div>
      </main>
    </PeekProvider>
  );
}
