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
  WORLD_CATEGORY_SOVEREIGNTY,
  slugifySubsection,
} from "@/lib/knowledge-graph";
import { PeekProvider } from "@/components/PeekProvider";
import { PeekList } from "@/components/PeekList";
import { CommunityPanel } from "@/components/CommunityPanel";

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
  const sovereignty = WORLD_CATEGORY_SOVEREIGNTY[entityType];

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

          <CommunityPanel fixed />

          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: description ? "1rem" : "1.75rem" }}>
            {ENTITY_TYPE_LABELS[entityType]}
          </h1>
          {description && (
            <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: sovereignty ? "2.5rem" : "2rem", background: "var(--amber)" }}>
              <div style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "#1a1005", marginBottom: "0.4rem" }}>
                Definition
              </div>
              <p style={{ fontSize: "var(--size-body)", fontWeight: 400, color: "#1a1005" }}>{description}</p>
            </div>
          )}

          {sovereignty && (
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1.25rem" }}>
                {ENTITY_TYPE_LABELS[entityType]} vs. Sovereignty
              </h2>

              <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem", color: "var(--good)" }}>Pros</h2>
                <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-2)" }}>
                  {sovereignty.pros.map((p) => (
                    <li key={p.label} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>
                      <strong style={{ color: "var(--ink)" }}>{p.label}:</strong> {p.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card" style={{ padding: "1.5rem" }}>
                <h2 style={{ fontSize: "var(--size-h4)", fontWeight: 500, marginBottom: "1rem", color: "var(--danger)" }}>Cons</h2>
                <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-2)" }}>
                  {sovereignty.cons.map((c) => (
                    <li key={c.label} style={{ marginBottom: "0.6rem", lineHeight: 1.6 }}>
                      <strong style={{ color: "var(--ink)" }}>{c.label}:</strong> {c.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {subsections ? (
            <>
              <h2 style={{ fontSize: "var(--size-h3)", fontWeight: 500, marginBottom: "1.25rem" }}>Subsections</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                {subsections.map((sub) => {
                  const subEntities = entities.filter((e) => e.subsection === sub);
                  return (
                    <div key={sub} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1.5rem" }}>
                      <Link
                        href={`/world/category/${entityType}/${slugifySubsection(sub)}`}
                        style={{ fontSize: "var(--size-h4)", fontWeight: 500, color: "var(--amber-strong)", marginBottom: "0.75rem", display: "block", textDecoration: "none" }}
                      >
                        {sub} →
                      </Link>
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
            </>
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
