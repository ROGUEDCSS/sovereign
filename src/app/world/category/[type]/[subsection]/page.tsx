import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ENTITY_TYPES,
  ENTITY_TYPE_LABELS,
  EntityType,
  KG_ENTITIES,
  WORLD_SUBSECTIONS,
  slugifySubsection,
} from "@/lib/knowledge-graph";
import { PeekProvider } from "@/components/PeekProvider";
import { PeekList } from "@/components/PeekList";
import { CommunityPanel } from "@/components/CommunityPanel";

export function generateStaticParams() {
  return ENTITY_TYPES.flatMap((type) => {
    const subs = WORLD_SUBSECTIONS[type];
    if (!subs) return [];
    return subs.map((sub) => ({ type, subsection: slugifySubsection(sub) }));
  });
}

export default async function WorldSubsectionPage({
  params,
}: {
  params: Promise<{ type: string; subsection: string }>;
}) {
  const { type, subsection } = await params;
  if (!ENTITY_TYPES.includes(type as EntityType)) notFound();
  const entityType = type as EntityType;

  const subsections = WORLD_SUBSECTIONS[entityType];
  const subName = subsections?.find((s) => slugifySubsection(s) === subsection);
  if (!subName) notFound();

  const entities = KG_ENTITIES.filter((e) => e.type === entityType && e.subsection === subName).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <PeekProvider>
      <main className="container" style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", fontSize: "var(--size-sm)", color: "var(--text-3)", marginBottom: "1.25rem" }}>
            <Link href="/world" style={{ color: "var(--text-3)" }}>
              The World
            </Link>
            <span>/</span>
            <Link href={`/world/category/${entityType}`} style={{ color: "var(--text-3)" }}>
              {ENTITY_TYPE_LABELS[entityType]}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--text-1)" }}>{subName}</span>
          </div>

          <CommunityPanel fixed />

          <h1 style={{ fontSize: "var(--size-h2)", fontWeight: 500, marginBottom: "1.75rem" }}>{subName}</h1>

          {entities.length > 0 ? (
            <PeekList
              variant="grid"
              items={entities.map((e) => ({ label: e.name, target: { kind: "world", slug: e.slug } }))}
            />
          ) : (
            <div className="card" style={{ padding: "1.5rem" }}>
              <p style={{ color: "var(--ink)", fontWeight: 500, marginBottom: "0.5rem" }}>Not yet mapped.</p>
              <p style={{ color: "var(--ink-2)" }}>
                {`No sourced entities under ${subName} yet. Coming in a future pass.`}
              </p>
            </div>
          )}
        </div>
      </main>
    </PeekProvider>
  );
}
